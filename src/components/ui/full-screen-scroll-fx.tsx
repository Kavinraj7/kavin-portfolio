'use client';

import React, {
  CSSProperties,
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type FullScreenSection = {
  id?: string;
  background: string;
  leftLabel?: ReactNode;
  title: string | ReactNode;
  rightLabel?: ReactNode;
  renderBackground?: (active: boolean, previous: boolean) => ReactNode;
};

type Colors = Partial<{
  text: string;
  overlay: string;
  pageBg: string;
  stageBg: string;
}>;

type Durations = Partial<{
  change: number;
  snap: number;
}>;

export type FullScreenFXAPI = {
  next: () => void;
  prev: () => void;
  goTo: (index: number) => void;
  getIndex: () => number;
  refresh: () => void;
};

export type FullScreenFXProps = {
  sections: FullScreenSection[];
  className?: string;
  style?: CSSProperties;

  fontFamily?: string;
  header?: ReactNode;
  footer?: ReactNode;
  gap?: number;
  gridPaddingX?: number;

  showProgress?: boolean;
  debug?: boolean;

  durations?: Durations;
  reduceMotion?: boolean;
  smoothScroll?: boolean;

  bgTransition?: "fade" | "wipe";
  parallaxAmount?: number;

  currentIndex?: number;
  onIndexChange?: (index: number) => void;
  initialIndex?: number;

  colors?: Colors;
  apiRef?: React.Ref<FullScreenFXAPI>;
  ariaLabel?: string;
};

const clamp = (n: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, n));

export const FullScreenScrollFX = forwardRef<HTMLDivElement, FullScreenFXProps>(
  (
    {
      sections,
      className,
      style,

      fontFamily = 'system-ui, -apple-system, "Segoe UI", Roboto, Arial, sans-serif',
      header,
      footer,
      gap = 1,
      gridPaddingX = 2,

      showProgress = true,
      debug = false,

      durations = { change: 0.45, snap: 500 },
      reduceMotion,

      bgTransition = "fade",
      parallaxAmount = 4,

      currentIndex,
      onIndexChange,
      initialIndex = 0,

      colors = {
        text: "#0F172A",
        overlay: "rgba(255,255,255,0.72)",
        pageBg: "#FFFFFF",
        stageBg: "#F8FAFC",
      },

      apiRef,
      ariaLabel = "Full screen scroll slideshow",
    },
    ref
  ) => {
    const total = sections.length;
    const [localIndex, setLocalIndex] = useState(clamp(initialIndex, 0, Math.max(0, total - 1)));
    const isControlled = typeof currentIndex === "number";
    const index = isControlled ? clamp(currentIndex!, 0, Math.max(0, total - 1)) : localIndex;

    const rootRef = useRef<HTMLDivElement | null>(null);
    const fixedRef = useRef<HTMLDivElement | null>(null);
    const fixedSectionRef = useRef<HTMLDivElement | null>(null);

    const bgRefs = useRef<HTMLImageElement[]>([]);
    const leftTrackRef = useRef<HTMLDivElement | null>(null);
    const rightTrackRef = useRef<HTMLDivElement | null>(null);
    const leftItemRefs = useRef<HTMLDivElement[]>([]);
    const rightItemRefs = useRef<HTMLDivElement[]>([]);

    const progressFillRef = useRef<HTMLDivElement | null>(null);
    const currentNumberRef = useRef<HTMLSpanElement | null>(null);

    const stRef = useRef<ScrollTrigger | null>(null);
    const lastIndexRef = useRef(index);
    const isAnimatingRef = useRef(false);
    const isSnappingRef = useRef(false);
    const sectionTopRef = useRef<number[]>([]);

    // Compute absolute page scroll positions for accurate navigation
    const computePositions = () => {
      const el = fixedSectionRef.current;
      if (!el || typeof window === "undefined") return;
      const rect = el.getBoundingClientRect();
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      const absoluteTop = rect.top + scrollY;
      const scrollableDistance = Math.max(0, el.offsetHeight - window.innerHeight);

      const arr: number[] = [];
      for (let i = 0; i < total; i++) {
        const step = total > 1 ? (scrollableDistance * i) / (total - 1) : 0;
        arr.push(absoluteTop + step);
      }
      sectionTopRef.current = arr;
    };

    // Align active rows in left/right columns
    const measureAndCenterLists = (toIndex = index, animate = true) => {
      const centerTrack = (
        container: HTMLDivElement | null,
        items: HTMLDivElement[],
        isRight: boolean
      ) => {
        if (!container || items.length === 0) return;
        const first = items[0];
        const second = items[1];
        const contRect = container.getBoundingClientRect();
        let rowH = first ? first.getBoundingClientRect().height : 42;
        if (second && first) {
          rowH = second.getBoundingClientRect().top - first.getBoundingClientRect().top;
        }
        const targetY = contRect.height / 2 - rowH / 2 - toIndex * rowH;
        const prop = isRight ? rightTrackRef : leftTrackRef;
        if (!prop.current) return;
        if (animate) {
          gsap.to(prop.current, {
            y: targetY,
            duration: (durations.change ?? 0.45) * 0.9,
            ease: "power3.out",
          });
        } else {
          gsap.set(prop.current, { y: targetY });
        }
      };

      requestAnimationFrame(() => {
        centerTrack(leftTrackRef.current, leftItemRefs.current, false);
        centerTrack(rightTrackRef.current, rightItemRefs.current, true);
      });
    };

    // Standard smooth ScrollTrigger setup with medium scroll pacing
    useLayoutEffect(() => {
      if (typeof window === "undefined") return;
      const fixed = fixedRef.current;
      const fs = fixedSectionRef.current;
      if (!fixed || !fs || total === 0) return;

      // Initial backgrounds
      gsap.set(bgRefs.current, { opacity: 0, scale: 1.04 });
      if (bgRefs.current[0]) gsap.set(bgRefs.current[0], { opacity: 1, scale: 1 });

      computePositions();
      measureAndCenterLists(index, false);

      const st = ScrollTrigger.create({
        trigger: fs,
        start: "top top",
        end: "bottom bottom",
        pin: fixed,
        pinSpacing: true,
        onUpdate: (self) => {
          if (isSnappingRef.current) return;
          const prog = self.progress;
          const target = Math.min(total - 1, Math.floor(prog * total * 0.999));
          if (target !== lastIndexRef.current && !isAnimatingRef.current) {
            changeSection(target);
          }
          if (progressFillRef.current) {
            progressFillRef.current.style.width = `${prog * 100}%`;
          }
        },
      });

      stRef.current = st;

      const handleResize = () => {
        computePositions();
        measureAndCenterLists(lastIndexRef.current, false);
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", handleResize);
      const ro = new ResizeObserver(handleResize);
      ro.observe(fs);

      return () => {
        window.removeEventListener("resize", handleResize);
        ro.disconnect();
        st.kill();
        stRef.current = null;
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [total, bgTransition, parallaxAmount]);

    // Section change transitions
    const changeSection = (to: number) => {
      if (to === lastIndexRef.current) return;
      const from = lastIndexRef.current;
      const down = to > from;
      isAnimatingRef.current = true;

      if (!isControlled) setLocalIndex(to);
      onIndexChange?.(to);

      if (currentNumberRef.current) {
        currentNumberRef.current.textContent = String(to + 1).padStart(2, "0");
      }
      if (progressFillRef.current) {
        const p = (to / (total - 1 || 1)) * 100;
        progressFillRef.current.style.width = `${p}%`;
      }

      const D = durations.change ?? 0.6;

      // Background fade transition
      const prevBg = bgRefs.current[from];
      const newBg = bgRefs.current[to];
      if (newBg) {
        gsap.set(newBg, { opacity: 0, scale: 1.04, yPercent: down ? 1 : -1 });
        gsap.to(newBg, { opacity: 1, scale: 1, yPercent: 0, duration: D, ease: "power2.out" });
      }
      if (prevBg) {
        gsap.to(prevBg, {
          opacity: 0,
          yPercent: down ? -parallaxAmount : parallaxAmount,
          duration: D,
          ease: "power2.out",
        });
      }

      // List highlights and offset
      measureAndCenterLists(to, true);

      leftItemRefs.current.forEach((el, i) => {
        if (!el) return;
        el.classList.toggle("active", i === to);
        gsap.to(el, {
          opacity: i === to ? 1 : 0.35,
          x: i === to ? 12 : 0,
          duration: D * 0.6,
          ease: "power3.out",
        });
      });

      rightItemRefs.current.forEach((el, i) => {
        if (!el) return;
        el.classList.toggle("active", i === to);
        gsap.to(el, {
          opacity: i === to ? 1 : 0.35,
          x: i === to ? -12 : 0,
          duration: D * 0.6,
          ease: "power3.out",
        });
      });

      lastIndexRef.current = to;
      setTimeout(() => {
        isAnimatingRef.current = false;
      }, D * 1000);
    };

    // Smooth programmatic navigation to exact page position
    const goTo = (to: number, withScroll = true) => {
      const clamped = clamp(to, 0, total - 1);
      computePositions();
      changeSection(clamped);

      const pos = sectionTopRef.current[clamped];
      const snapMs = durations.snap ?? 700;

      if (withScroll && typeof window !== "undefined" && typeof pos === "number") {
        isSnappingRef.current = true;
        window.scrollTo({ top: pos, behavior: "smooth" });
        setTimeout(() => {
          isSnappingRef.current = false;
        }, snapMs);
      }
    };

    const next = () => goTo(index + 1);
    const prev = () => goTo(index - 1);

    useImperativeHandle(apiRef, () => ({
      next,
      prev,
      goTo,
      getIndex: () => index,
      refresh: () => ScrollTrigger.refresh(),
    }));

    // CSS variables
    const cssVars: CSSProperties = {
      ["--fx-font" as any]: fontFamily,
      ["--fx-text" as any]: colors.text ?? "#0F172A",
      ["--fx-overlay" as any]: colors.overlay ?? "rgba(255,255,255,0.85)",
      ["--fx-page-bg" as any]: colors.pageBg ?? "#FFFFFF",
      ["--fx-stage-bg" as any]: colors.stageBg ?? "#F8FAFC",
      ["--fx-gap" as any]: `${gap}rem`,
      ["--fx-grid-px" as any]: `${gridPaddingX}rem`,
      ["--fx-row-gap" as any]: "12px",
    };

    return (
      <div
        ref={(node) => {
          (rootRef as any).current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        className={["fx", className].filter(Boolean).join(" ")}
        style={{ ...cssVars, ...style }}
        aria-label={ariaLabel}
      >
        <div className="fx-scroll">
          <div className="fx-fixed-section" ref={fixedSectionRef}>
            <div className="fx-fixed" ref={fixedRef}>
              {/* Backgrounds */}
              <div className="fx-bgs" aria-hidden="true">
                {sections.map((s, i) => (
                  <div className="fx-bg" key={s.id ?? i}>
                    {s.renderBackground ? (
                      s.renderBackground(index === i, lastIndexRef.current === i)
                    ) : (
                      <img
                        ref={(el) => {
                          if (el) bgRefs.current[i] = el;
                        }}
                        src={s.background}
                        alt=""
                        className="fx-bg-img"
                      />
                    )}
                  </div>
                ))}
                <div className="fx-bg-overlay" />
              </div>

              {/* Grid Layout */}
              <div className="fx-grid">
                {/* Header */}
                {header && <div className="fx-header">{header}</div>}

                {/* Content */}
                <div className="fx-content">
                  {/* Left list */}
                  <div className="fx-left" role="list">
                    <div className="fx-track" ref={leftTrackRef}>
                      {sections.map((s, i) => (
                        <div
                          key={`L-${s.id ?? i}`}
                          className={`fx-item fx-left-item ${i === index ? "active" : ""}`}
                          ref={(el) => {
                            if (el) leftItemRefs.current[i] = el;
                          }}
                          onClick={() => goTo(i)}
                          role="button"
                          tabIndex={0}
                          aria-pressed={i === index}
                        >
                          {s.leftLabel}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Center Title (Always reliably rendered via React state & AnimatePresence) */}
                  <div className="fx-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={`center-title-${index}`}
                        initial={{ opacity: 0, y: 24, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -24, scale: 0.98 }}
                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        className="fx-featured active w-full flex flex-col items-center justify-center text-center px-4"
                      >
                        <h3 className="fx-featured-title">
                          {sections[index]?.title}
                        </h3>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Right list */}
                  <div className="fx-right" role="list">
                    <div className="fx-track" ref={rightTrackRef}>
                      {sections.map((s, i) => (
                        <div
                          key={`R-${s.id ?? i}`}
                          className={`fx-item fx-right-item ${i === index ? "active" : ""}`}
                          ref={(el) => {
                            if (el) rightItemRefs.current[i] = el;
                          }}
                          onClick={() => goTo(i)}
                          role="button"
                          tabIndex={0}
                          aria-pressed={i === index}
                        >
                          {s.rightLabel}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer + Minimalist Numeric Progress Bar */}
                <div className="fx-footer">
                  {footer && <div className="fx-footer-title">{footer}</div>}
                  {showProgress && (
                    <div className="fx-progress-row">
                      <span className="fx-num" ref={currentNumberRef}>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="fx-progress-track">
                        <div className="fx-progress-bar-fill" ref={progressFillRef} />
                      </div>
                      <span className="fx-num">
                        {String(total).padStart(2, "0")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .fx {
            width: 100%;
            overflow: hidden;
            background: var(--fx-page-bg);
            color: var(--fx-text);
            font-family: var(--fx-font);
            text-transform: uppercase;
          }

          /* Balanced medium scroll track */
          .fx-fixed-section { height: ${Math.max(1, total * 90)}vh; position: relative; }
          .fx-fixed { position: sticky; top: 0; height: 100vh; width: 100%; overflow: hidden; background: var(--fx-page-bg); }

          .fx-grid {
            display: grid;
            grid-template-columns: repeat(12, 1fr);
            gap: var(--fx-gap);
            padding: 0 var(--fx-grid-px);
            position: relative;
            height: 100%;
            z-index: 2;
          }

          .fx-bgs { position: absolute; inset: 0; background: var(--fx-stage-bg); z-index: 1; }
          .fx-bg { position: absolute; inset: 0; }
          .fx-bg-img {
            position: absolute; inset: -10% 0 -10% 0;
            width: 100%; height: 120%; object-fit: cover;
            filter: brightness(0.96) contrast(1.02);
            opacity: 0;
            will-change: transform, opacity;
          }
          .fx-bg-overlay { position: absolute; inset: 0; background: var(--fx-overlay); }

          .fx-header {
            grid-column: 1 / 13; align-self: start; padding-top: 10vh;
            text-align: center; color: var(--fx-text); width: 100%;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
          }

          .fx-content {
            grid-column: 1 / 13;
            position: absolute; inset: 0;
            display: grid; grid-template-columns: 1fr 1.6fr 1fr;
            align-items: center;
            height: 100%;
            padding: 0 clamp(1.5rem, 4vw, 4.5rem);
          }

          .fx-left, .fx-right {
            height: 55vh;
            overflow: hidden;
            display: grid; align-content: center;
          }
          .fx-left { justify-items: start; text-align: left; }
          .fx-right { justify-items: end; text-align: right; }
          .fx-track { will-change: transform; }

          .fx-item {
            color: var(--fx-text);
            font-weight: 800;
            letter-spacing: 0.04em;
            line-height: 1.35;
            margin: 10px 0;
            opacity: 0.32;
            transition: opacity 0.3s ease, transform 0.3s ease, color 0.3s ease;
            position: relative;
            font-size: clamp(1.1rem, 2.1vw, 1.85rem);
            user-select: none;
            cursor: pointer;
            white-space: nowrap;
          }
          .fx-left-item.active, .fx-right-item.active {
            opacity: 1;
            font-weight: 900;
          }
          .fx-left-item.active { transform: translateX(18px); padding-left: 20px; }
          .fx-right-item.active { transform: translateX(-18px); padding-right: 20px; }

          .fx-left-item.active::before {
            content: "•";
            position: absolute; left: 0; top: 50%;
            transform: translateY(-50%);
            font-size: 1.4em; line-height: 0;
            color: var(--fx-text);
          }
          .fx-right-item.active::after {
            content: "•";
            position: absolute; right: 0; top: 50%;
            transform: translateY(-50%);
            font-size: 1.4em; line-height: 0;
            color: var(--fx-text);
          }

          .fx-center {
            display: flex; justify-content: center; align-items: center; text-align: center; height: 55vh; overflow: hidden;
          }
          .fx-featured-title {
            margin: 0; color: var(--fx-text);
            font-weight: 900; letter-spacing: -0.02em;
            font-size: clamp(2.4rem, 5.5vw, 5.2rem);
            line-height: 1;
            text-align: center;
          }

          .fx-footer {
            grid-column: 1 / 13; align-self: end; padding-bottom: 4vh; text-align: center; width: 100%;
            display: flex; flex-direction: column; align-items: center; justify-content: center;
          }
          .fx-footer-title { color: var(--fx-text); font-size: 0.85rem; font-weight: 700; letter-spacing: 0.18em; opacity: 0.65; margin-bottom: 6px; }

          .fx-progress-row {
            display: flex; align-items: center; justify-content: center; gap: 14px;
          }
          .fx-num {
            font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
            font-size: 0.82rem;
            font-weight: 800;
            color: var(--fx-text);
            opacity: 0.85;
            letter-spacing: 0.08em;
          }
          .fx-progress-track {
            width: clamp(120px, 20vw, 220px);
            height: 2px;
            background: rgba(0,0,0,0.18);
            position: relative;
            overflow: hidden;
            border-radius: 999px;
          }
          .fx-progress-bar-fill {
            position: absolute; inset: 0 auto 0 0; width: 0%;
            background: var(--fx-text);
            height: 100%;
            transition: width 0.25s ease-out;
          }

          @media (max-width: 900px) {
            .fx-content {
              grid-template-columns: 1fr; row-gap: 2vh;
              place-items: center;
            }
            .fx-left, .fx-right, .fx-center { height: auto; }
            .fx-left, .fx-right { justify-items: center; text-align: center; }
            .fx-track { transform: none !important; }
            .fx-left-item.active, .fx-right-item.active { transform: none; padding: 0; }
            .fx-left-item.active::before, .fx-right-item.active::after { display: none; }
          }
        `}} />
      </div>
    );
  }
);

FullScreenScrollFX.displayName = "FullScreenScrollFX";
