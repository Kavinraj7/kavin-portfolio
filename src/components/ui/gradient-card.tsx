// components/ui/gradient-card.tsx
'use client';

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

// Define variants for the card's overall style using cva
const cardVariants = cva(
  "relative flex flex-col justify-between h-full w-full overflow-hidden rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-7 border border-zinc-200/80 shadow-xs transition-all duration-300 hover:shadow-lg hover:border-zinc-300",
  {
    variants: {
      gradient: {
        orange: "bg-gradient-to-br from-amber-50/90 via-orange-50/70 to-amber-100/50 text-zinc-900",
        gray: "bg-gradient-to-br from-slate-50 via-zinc-50 to-slate-100/70 text-zinc-900",
        purple: "bg-gradient-to-br from-purple-50/90 via-indigo-50/70 to-purple-100/50 text-zinc-900",
        green: "bg-gradient-to-br from-emerald-50/90 via-teal-50/70 to-emerald-100/50 text-zinc-900",
        blue: "bg-gradient-to-br from-sky-50/90 via-blue-50/70 to-indigo-100/50 text-zinc-900",
      },
    },
    defaultVariants: {
      gradient: "gray",
    },
  }
);

export interface GradientCardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  badgeText?: string;
  badgeColor?: string;
  institution: string;     // College / School Name
  standard: string;        // Education Standard / Degree
  year: string;            // Year studied
  score?: string;          // CGPA / %
  description: string;     // Small description
  icon?: React.ReactNode;
  imageUrl?: string;
  imageWrapperClassName?: string;
}

const GradientCard = React.forwardRef<HTMLDivElement, GradientCardProps>(
  (
    {
      className,
      gradient,
      badgeText,
      badgeColor = "#F59E0B",
      institution,
      standard,
      year,
      score,
      description,
      icon,
      imageUrl,
      imageWrapperClassName,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        whileHover={{ y: -3, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 24 }}
        className="h-full w-full group"
        ref={ref}
      >
        <div className={cn(cardVariants({ gradient }), className)} {...props}>
          {/* Subtle Decorative Graphic */}
          {imageUrl && (
            <div
              className={cn(
                "absolute right-0 bottom-0 top-0 w-2/5 sm:w-1/2 md:w-3/5 pointer-events-none select-none overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_40%)]",
                imageWrapperClassName
              )}
            >
              <img
                src={imageUrl}
                alt={`${institution} photo`}
                className="w-full h-full object-cover object-center opacity-30 sm:opacity-40 group-hover:opacity-60 transition-opacity duration-300"
              />
            </div>
          )}

          {/* Card Content */}
          <div className="z-10 flex flex-col justify-between h-full w-full relative">
            <div>
              {/* Header: Standard Badge, Year & Score Pill */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 mb-3">
                <div className="flex items-center gap-2">
                  {badgeText && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/90 border border-zinc-200/70 px-2.5 py-0.5 text-[11px] sm:text-xs font-semibold text-zinc-800 shadow-2xs">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{ backgroundColor: badgeColor }}
                      />
                      {badgeText}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Year Studied */}
                  <span className="text-[11px] sm:text-xs font-mono font-bold tracking-wider text-zinc-600 bg-white/75 border border-zinc-200/60 px-2 py-0.5 rounded-md shadow-2xs">
                    {year}
                  </span>
                  {/* CGPA / % Badge */}
                  {score && (
                    <span className="text-[11px] sm:text-xs font-mono font-bold text-emerald-800 bg-emerald-100/90 border border-emerald-300/80 px-2 py-0.5 rounded-md shadow-2xs">
                      {score}
                    </span>
                  )}
                </div>
              </div>

              {/* Institution / College / School Name */}
              <div className="flex items-start gap-2.5 mt-1">
                {icon && <div className="mt-0.5 flex-shrink-0 text-zinc-800">{icon}</div>}
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl font-black text-zinc-950 tracking-tight leading-snug">
                    {institution}
                  </h3>
                  {/* Education Standard / Degree */}
                  <p className="text-xs sm:text-sm font-bold text-zinc-700 mt-0.5">
                    {standard}
                  </p>
                </div>
              </div>

              {/* Small Concise Description */}
              <p className="mt-2.5 text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-2xl">
                {description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }
);

GradientCard.displayName = "GradientCard";

export { GradientCard, cardVariants };
