"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Compass, Sparkles, FolderGit2, UserCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface LiquidPoint {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  maxAge: number;
  size: number;
  color: string;
}

interface TrailNode {
  x: number;
  y: number;
  age: number;
}

interface LiquidCanvasProps {
  className?: string;
}

export const LiquidTrailCanvas: React.FC<LiquidCanvasProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointsRef = useRef<LiquidPoint[]>([]);
  const trailRef = useRef<TrailNode[]>([]);
  const mouseRef = useRef<{ x: number; y: number; prevX: number; prevY: number; speed: number; isInside: boolean }>({
    x: -100,
    y: -100,
    prevX: -100,
    prevY: -100,
    speed: 0,
    isInside: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    if (!ctx) return;

    let animationFrameId: number;
    const parent = canvas.parentElement;

    let width = (canvas.width = parent?.clientWidth || 800);
    let height = (canvas.height = parent?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener("resize", handleResize);

    // Sleek electric royal blue & vivid purple palette matching reference image
    const colors = [
      "rgba(30, 64, 255, ",  // Vivid Electric Blue
      "rgba(37, 99, 235, ",  // Deep Royal Blue
      "rgba(59, 130, 246, ", // Bright Cobalt
      "rgba(99, 102, 241, ", // Indigo
      "rgba(124, 58, 237, ", // Violet
    ];

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if cursor is anywhere within the section bounds
      if (
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom
      ) {
        const dx = x - (mouseRef.current.x < 0 ? x : mouseRef.current.x);
        const dy = y - (mouseRef.current.y < 0 ? y : mouseRef.current.y);
        const speed = Math.min(Math.sqrt(dx * dx + dy * dy), 35);

        mouseRef.current = {
          x,
          y,
          prevX: mouseRef.current.x < 0 ? x : mouseRef.current.x,
          prevY: mouseRef.current.y < 0 ? y : mouseRef.current.y,
          speed,
          isInside: true,
        };

        // Add to continuous ribbon trail
        trailRef.current.push({ x, y, age: 0 });
        if (trailRef.current.length > 35) {
          trailRef.current.shift();
        }

        // Spawn sleeker, reduced-width fluid droplets
        const spawnCount = Math.min(Math.floor(speed / 4) + 1, 4);
        for (let i = 0; i < spawnCount; i++) {
          const interp = i / spawnCount;
          const px = mouseRef.current.prevX + dx * interp + (Math.random() - 0.5) * 6;
          const py = mouseRef.current.prevY + dy * interp + (Math.random() - 0.5) * 6;
          const colorBase = colors[Math.floor(Math.random() * colors.length)];

          pointsRef.current.push({
            x: px,
            y: py,
            vx: dx * 0.08 + (Math.random() - 0.5) * 1.2,
            vy: dy * 0.08 + (Math.random() - 0.5) * 1.2,
            age: 0,
            maxAge: 45 + Math.random() * 25,
            size: 10 + Math.random() * 7 + speed * 0.25, // Sleek, reduced brush width
            color: colorBase,
          });
        }
      } else {
        mouseRef.current.isInside = false;
      }
    };

    window.addEventListener("mousemove", handleGlobalMouseMove, { passive: true });

    // Render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Draw smooth fluid ribbon connecting recent trail nodes
      const trail = trailRef.current;
      for (let i = trail.length - 1; i >= 0; i--) {
        trail[i].age += 1;
        if (trail[i].age > 30) {
          trail.splice(i, 1);
        }
      }

      if (trail.length > 2) {
        ctx.save();
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        for (let i = 1; i < trail.length; i++) {
          const p1 = trail[i - 1];
          const p2 = trail[i];
          const progress = i / trail.length;
          const alpha = progress * 0.85;

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(37, 99, 235, ${alpha})`;
          ctx.lineWidth = 10 + progress * 6; // Reduced ribbon width
          ctx.stroke();
        }
        ctx.restore();
      }

      // 2. Draw trailing fluid ink droplets & particle blobs
      const points = pointsRef.current;
      for (let i = points.length - 1; i >= 0; i--) {
        const p = points[i];
        p.age += 1;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.95;
        p.vy *= 0.95;

        const progress = p.age / p.maxAge;
        if (progress >= 1) {
          points.splice(i, 1);
          continue;
        }

        const alpha = Math.sin(progress * Math.PI) * 0.85;
        const currentSize = p.size * (1 - progress * 0.3);

        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          currentSize
        );
        gradient.addColorStop(0, `${p.color}${alpha})`);
        gradient.addColorStop(0.6, `${p.color}${alpha * 0.7})`);
        gradient.addColorStop(1, `${p.color}0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Draw active cursor lead glow if inside
      if (mouseRef.current.isInside) {
        const mx = mouseRef.current.x;
        const my = mouseRef.current.y;
        const leadGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 16);
        leadGrad.addColorStop(0, "rgba(30, 64, 255, 0.95)");
        leadGrad.addColorStop(0.5, "rgba(124, 58, 237, 0.6)");
        leadGrad.addColorStop(1, "rgba(30, 64, 255, 0)");

        ctx.fillStyle = leadGrad;
        ctx.beginPath();
        ctx.arc(mx, my, 16, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "absolute inset-0 w-full h-full pointer-events-none filter blur-[3.5px] opacity-95 transition-opacity duration-300",
        className
      )}
    />
  );
};

export interface LiquidGlassButtonProps {
  label: string;
  sublabel?: string;
  icon?: React.ElementType;
  onClick?: () => void;
  className?: string;
}

export const LiquidGlassButton: React.FC<LiquidGlassButtonProps> = ({
  label,
  sublabel,
  icon: Icon = ArrowUpRight,
  onClick,
  className,
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.button
      whileHover={{ scale: 1.05, y: -4 }}
      whileTap={{ scale: 0.96 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      className={cn(
        "group relative flex items-center justify-between gap-4 px-6 sm:px-8 py-4 sm:py-4.5 rounded-full cursor-pointer select-none",
        // Liquid Glass Refraction & Frosted Glass Specular styling matching the prompt image
        "bg-white/65 dark:bg-white/[0.08] backdrop-blur-2xl",
        "border border-white/80 dark:border-white/20",
        "shadow-[0_12px_28px_-5px_rgba(0,0,0,0.1),inset_0_1px_2px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.1)] dark:shadow-[0_15px_35px_-5px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.3),inset_0_-2px_4px_rgba(0,0,0,0.4)]",
        "transition-all duration-300",
        hovered && "shadow-[0_20px_40px_-5px_rgba(59,130,246,0.35),inset_0_1px_3px_rgba(255,255,255,1)] border-blue-400/60 dark:border-purple-400/60",
        className
      )}
    >
      {/* Specular Top Reflection Highlight */}
      <div className="absolute top-1 inset-x-6 h-[35%] rounded-full bg-gradient-to-b from-white/70 to-transparent pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity" />

      {/* Left Content */}
      <div className="relative z-10 flex items-center gap-3 text-left">
        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-black/5 dark:bg-white/10 flex items-center justify-center text-zinc-900 dark:text-white group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-purple-500 transition-all duration-300 shadow-2xs">
          <Icon className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-[2.2] transition-transform duration-300 group-hover:rotate-12" />
        </div>
        <div className="flex flex-col">
          <span className="text-sm sm:text-base font-bold text-zinc-950 dark:text-white tracking-tight font-sans">
            {label}
          </span>
          {sublabel && (
            <span className="text-[10px] sm:text-[11px] font-mono text-zinc-600 dark:text-zinc-400 font-medium">
              {sublabel}
            </span>
          )}
        </div>
      </div>

      {/* Right Arrow */}
      <div className="relative z-10 w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-zinc-900/5 dark:bg-white/5 border border-zinc-900/10 dark:border-white/10 flex items-center justify-center text-zinc-900 dark:text-white group-hover:bg-zinc-950 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0">
        <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
      </div>
    </motion.button>
  );
};
