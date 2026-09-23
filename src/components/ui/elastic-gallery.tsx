"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export interface ElasticItemProps {
  id: string;
  title: string;
  category: string;
  src: string;
  alt: string;
  description?: string;
  link?: string;
}

export interface ElasticGalleryProps {
  items?: ElasticItemProps[];
  defaultActiveId?: string;
  className?: string;
  onSelectProject?: (item: ElasticItemProps) => void;
}

const DEFAULT_PROJECT_ITEMS: ElasticItemProps[] = [
  {
    id: "01",
    title: "Neon Cyber Telemetry",
    category: "Distributed Systems",
    src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop",
    alt: "Neon Cyber Telemetry",
    description: "High-frequency streaming engine handling 120k+ concurrent WebSocket connections with sub-15ms latency.",
  },
  {
    id: "02",
    title: "Neural Agent Matrix",
    category: "AI & Agents",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    alt: "Neural Agent Matrix",
    description: "Self-orchestrating autonomous LLM pipelines and vector grounding microservices.",
  },
  {
    id: "03",
    title: "Enterprise Core OS",
    category: "Cloud Architecture",
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    alt: "Enterprise Core Architecture",
    description: "End-to-end migration of legacy monolithic architectures to modern event-driven Kubernetes clusters.",
  },
  {
    id: "04",
    title: "Predictive Intelligence",
    category: "Data Analytics",
    src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    alt: "Predictive Intelligence Dashboard",
    description: "Machine learning behavioral analytics and central data mart surfacing actionable revenue metrics.",
  },
  {
    id: "05",
    title: "Radical UI Design System",
    category: "Frontend Craft",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    alt: "Radical UI Design System",
    description: "Strict Swiss typography scale, zero-runtime tokens, and physics-driven micro-interactions.",
  },
];

export function ElasticGallery({
  items = DEFAULT_PROJECT_ITEMS,
  defaultActiveId = "03",
  className,
  onSelectProject,
}: ElasticGalleryProps) {
  const [activeId, setActiveId] = useState<string | null>(defaultActiveId);

  return (
    <div className={cn("w-full py-6 sm:py-8", className)}>
      {/* Container: Fixed height on mobile/desktop to ensure animation stability */}
      <div className="mx-auto flex h-[480px] sm:h-[520px] md:h-[580px] w-full max-w-7xl flex-col gap-2 px-2 sm:px-4 md:flex-row md:gap-3.5">
        {items.map((item) => {
          const isActive = activeId === item.id;

          return (
            <div
              key={item.id}
              onMouseEnter={() => setActiveId(item.id)}
              onClick={() => {
                setActiveId(item.id);
                onSelectProject?.(item);
              }}
              className={cn(
                "group relative cursor-pointer overflow-hidden rounded-[24px] sm:rounded-[28px] border border-neutral-200/80 bg-white dark:border-neutral-800 dark:bg-neutral-950 shadow-md",
                // Layout & Flex Transition
                "transition-[flex,filter,transform] duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]",
                // Flex Logic: Active card expands
                isActive ? "flex-[4]" : "flex-[1]",
                // Brightness logic for focus
                isActive
                  ? "brightness-100 ring-1 ring-purple-500/40 shadow-[0_20px_50px_-10px_rgba(124,58,237,0.3)]"
                  : "brightness-60 hover:brightness-85"
              )}
            >
              {/* Background Image Layer */}
              <div className="relative inset-0 h-full w-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 60vw"
                  className={cn(
                    "object-cover transition-transform duration-1000",
                    isActive ? "scale-105" : "scale-115"
                  )}
                  priority={item.id === "01" || item.id === "03"}
                />
                {/* Dark Vignette Gradient Overlay for Readability */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/10 transition-opacity duration-500",
                    isActive ? "opacity-100" : "opacity-75"
                  )}
                />
              </div>

              {/* Top Card Header: ID Badge */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10 pointer-events-none">
                <span
                  className={cn(
                    "font-mono text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-md transition-all duration-300",
                    isActive
                      ? "bg-purple-500/80 text-white border border-purple-300/40 shadow-sm"
                      : "bg-black/50 text-zinc-300 border border-white/10"
                  )}
                >
                  {item.id}
                </span>

                <div
                  className={cn(
                    "w-8 h-8 rounded-full bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white transition-all duration-300",
                    isActive ? "opacity-100 scale-100" : "opacity-0 scale-75"
                  )}
                >
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* --- Content Container --- */}
              <div className="absolute bottom-0 left-0 right-0 flex h-full flex-col justify-end p-5 sm:p-7 md:p-8 z-10">
                {/* Active Content: Title, Description & Action Button */}
                <div
                  className={cn(
                    "flex flex-col gap-2.5 transition-all duration-500",
                    isActive
                      ? "translate-y-0 opacity-100 delay-150"
                      : "translate-y-10 opacity-0 pointer-events-none"
                  )}
                >
                  {/* Category Tag */}
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-purple-400/40 bg-purple-950/60 px-3 py-1 text-[10px] sm:text-xs font-bold font-mono uppercase tracking-wider text-purple-200 backdrop-blur-md shadow-xs">
                      {item.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black uppercase leading-tight tracking-tight text-white font-sans">
                    {item.title}
                  </h3>

                  {/* Description */}
                  {item.description && (
                    <p className="text-xs sm:text-sm text-zinc-300 max-w-xl line-clamp-2 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  )}

                  {/* Call to Action */}
                  <div className="mt-2 inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-purple-300 hover:text-white transition-colors cursor-pointer w-fit">
                    <span>Explore System Architecture</span>
                    <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Inactive Content: Vertical Title (Desktop) / Label (Mobile) */}
                <div
                  className={cn(
                    "absolute transition-all duration-500",
                    "bottom-5 left-1/2 -translate-x-1/2 md:bottom-8",
                    isActive
                      ? "opacity-0 scale-50 pointer-events-none"
                      : "opacity-100 delay-300"
                  )}
                >
                  {/* Desktop: Vertical Text */}
                  <span className="hidden whitespace-nowrap text-lg sm:text-xl font-bold uppercase tracking-wider text-white/90 [writing-mode:vertical-rl] rotate-180 md:block drop-shadow-md">
                    {item.title}
                  </span>

                  {/* Mobile: Horizontal Label */}
                  <span className="block text-xs font-bold uppercase tracking-widest text-white/90 md:hidden drop-shadow-sm">
                    {item.title}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ElasticGallery;
