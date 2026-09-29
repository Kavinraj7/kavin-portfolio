"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X } from "lucide-react";

export interface NavItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  onClick?: () => void;
}

export interface CircularNavigationProps {
  navItems: NavItem[];
  isOpen: boolean;
  toggleMenu: () => void;
}

export default function CircularNavigation({
  navItems,
  isOpen,
  toggleMenu,
}: CircularNavigationProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 h-screen w-full flex items-center justify-center bg-black/80 backdrop-blur-md z-[10000]"
          onClick={toggleMenu}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="relative aspect-square w-[340px] sm:w-[420px] max-w-[92vw] rounded-full flex items-center justify-center"
            style={{
              background: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
              boxShadow:
                "inset 2px 2px 2px rgba(255,255,255,0.5), inset -1px -1px 1px rgba(255,255,255,0.3)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={toggleMenu}
              aria-label="Close navigation"
              className="absolute aspect-square flex items-center justify-center w-12 h-12 rounded-full bg-white text-black z-10 hover:scale-110 active:scale-95 transition-transform cursor-pointer shadow-lg"
            >
              <X className="w-6 h-6" />
            </button>

            {navItems.map((item, index) => {
              const Icon = item.icon;
              const angle = (360 / navItems.length) * index;

              const handleClick = (e: React.MouseEvent) => {
                if (item.onClick) {
                  item.onClick();
                }
                toggleMenu();
              };

              const content = (
                <div
                  className={`flex flex-col items-center justify-center w-16 h-16 sm:w-20 sm:h-20 aspect-square rounded-full transition-all duration-200 cursor-pointer ${
                    hoveredItem === item.name
                      ? "bg-white text-black scale-110 shadow-lg"
                      : "text-white hover:text-white"
                  }`}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  onClick={handleClick}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 mb-1" />
                  <span
                    className="text-[10px] sm:text-xs font-medium select-none"
                    style={{ textDecoration: "none" }}
                  >
                    {item.name}
                  </span>
                </div>
              );

              return (
                <div
                  key={item.name}
                  className="absolute"
                  style={{
                    transform: `rotate(${angle}deg) translate(125px) rotate(-${angle}deg)`,
                  }}
                >
                  {item.href && item.href !== "#" && !item.onClick ? (
                    <Link
                      href={item.href}
                      style={{ textDecoration: "none" }}
                      onClick={handleClick}
                    >
                      {content}
                    </Link>
                  ) : (
                    content
                  )}
                </div>
              );
            })}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
