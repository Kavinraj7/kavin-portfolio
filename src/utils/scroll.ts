/**
 * Utility to reliably reset viewport scroll to top (0, 0),
 * taking Lenis smooth scroll and Next.js tab re-renders into account.
 */
export const scrollToTop = () => {
  if (typeof window === 'undefined') return;

  const reset = () => {
    try {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    } catch {
      window.scrollTo(0, 0);
    }
  };

  reset();
  requestAnimationFrame(reset);
  setTimeout(reset, 20);
  setTimeout(reset, 80);
  setTimeout(reset, 200);
};

/**
 * Utility to smoothly scroll to a specific DOM section by ID or known aliases,
 * fully integrated with Lenis smooth scrolling and DOM readiness checks.
 */
export const scrollToTarget = (targetId: string) => {
  if (typeof window === 'undefined') return;

  const findElement = (): HTMLElement | null => {
    // Direct match
    let el = document.getElementById(targetId);
    if (el) return el;

    // Fallbacks and aliases
    const aliases: Record<string, string[]> = {
      'experience': ['experience', 'experience-section'],
      'experience-section': ['experience-section', 'experience'],
      'works-showcase': ['works-showcase', 'projects-section'],
      'projects': ['works-showcase', 'projects-section'],
      'my-skills': ['about-details', 'my-skills'],
      'about-details': ['about-details', 'my-skills'],
      'my-education': ['my-education'],
      'achievements-section': ['achievements-section', 'achievements'],
      'achievements': ['achievements-section', 'achievements'],
    };

    const candidates = aliases[targetId] || [targetId];
    for (const id of candidates) {
      el = document.getElementById(id);
      if (el) return el;
    }
    return null;
  };

  const executeScroll = (): boolean => {
    const el = findElement();
    if (!el) return false;

    try {
      if ((window as any).__lenis) {
        (window as any).__lenis.scrollTo(el, { offset: 0, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return true;
    } catch {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return true;
    }
  };

  // Immediate attempt
  if (!executeScroll()) {
    // Retry with escalating timeouts as layout and animations mount
    requestAnimationFrame(() => {
      if (!executeScroll()) {
        setTimeout(() => {
          if (!executeScroll()) {
            setTimeout(executeScroll, 200);
          }
        }, 100);
      }
    });
  }
};
