"use client";

import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

import { cn } from "@/lib/utils";

export interface SkiperImageItem {
  src: string;
  alt: string;
  title?: string;
  category?: string;
}

interface Carousel003Props {
  images: SkiperImageItem[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
}

const Carousel_003 = ({
  images,
  className,
  showPagination = true,
  showNavigation = true,
  loop = true,
  autoplay = true,
  spaceBetween = 0,
}: Carousel003Props) => {
  const css = `
  .Carousal_003 {
    width: 100%;
    height: 440px;
    padding-top: 20px !important;
    padding-bottom: 55px !important;
  }
  
  .Carousal_003 .swiper-slide {
    background-position: center;
    background-size: cover;
    width: 250px;
    height: 320px;
    border-radius: 1.25rem;
    overflow: hidden;
    box-shadow: 0 20px 45px -10px rgba(0, 0, 0, 0.25);
  }
  @media (min-width: 640px) {
    .Carousal_003 .swiper-slide {
      width: 300px;
      height: 360px;
    }
  }

  .Carousal_003 .swiper-pagination {
    bottom: 8px !important;
  }

  .Carousal_003 .swiper-pagination-bullet {
    background-color: #71717A !important;
    opacity: 0.35;
    width: 8px;
    height: 8px;
    transition: all 0.3s ease;
  }

  .Carousal_003 .swiper-pagination-bullet-active {
    background-color: #000000 !important;
    opacity: 1;
    width: 24px !important;
    border-radius: 9999px !important;
  }

  :root.dark .Carousal_003 .swiper-pagination-bullet-active {
    background-color: #FFEE00 !important;
  }

  .Carousal_003 .swiper-button-prev,
  .Carousal_003 .swiper-button-next {
    width: 44px;
    height: 44px;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.95);
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
    color: #000;
    transition: all 0.2s ease;
    cursor: pointer;
  }

  .Carousal_003 .swiper-button-prev:hover,
  .Carousal_003 .swiper-button-next:hover {
    background: #000;
    color: #FFEE00;
    transform: scale(1.08);
  }

  :root.dark .Carousal_003 .swiper-button-prev,
  :root.dark .Carousal_003 .swiper-button-next {
    background: rgba(24, 24, 27, 0.9);
    border-color: rgba(255, 255, 255, 0.15);
    color: #fff;
  }

  :root.dark .Carousal_003 .swiper-button-prev:hover,
  :root.dark .Carousal_003 .swiper-button-next:hover {
    background: #FFEE00;
    color: #000;
  }
`;

  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.2,
      }}
      className={cn("relative w-full max-w-5xl mx-auto px-4 sm:px-6", className)}
    >
      <style>{css}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full relative"
      >
        <Swiper
          spaceBetween={spaceBetween}
          autoplay={
            autoplay
              ? {
                  delay: 2800,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }
              : false
          }
          effect="coverflow"
          grabCursor={true}
          slidesPerView="auto"
          centeredSlides={true}
          loop={loop}
          coverflowEffect={{
            rotate: 35,
            stretch: 0,
            depth: 120,
            modifier: 1,
            slideShadows: true,
          }}
          pagination={
            showPagination
              ? {
                  clickable: true,
                }
              : false
          }
          navigation={
            showNavigation
              ? {
                  nextEl: ".swiper-button-next-custom",
                  prevEl: ".swiper-button-prev-custom",
                }
              : false
          }
          className="Carousal_003"
          modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="group relative">
              <img
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                src={image.src}
                alt={image.alt}
              />
              
              {/* Information pill overlay with title and category */}
              {(image.title || image.category) && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-5 select-none pointer-events-none">
                  {image.category && (
                    <span className="text-[10px] font-mono font-bold tracking-widest text-[#FFEE00] uppercase mb-1 drop-shadow-xs">
                      {image.category}
                    </span>
                  )}
                  {image.title && (
                    <h4 className="text-lg font-bold text-white tracking-tight leading-snug drop-shadow-sm">
                      {image.title}
                    </h4>
                  )}
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {showNavigation && (
          <>
            <button
              type="button"
              className="swiper-button-prev-custom absolute -left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-700/80 shadow-lg flex items-center justify-center text-zinc-900 dark:text-white hover:bg-black hover:text-[#FFEE00] dark:hover:bg-[#FFEE00] dark:hover:text-black transition-all cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Previous slide"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="swiper-button-next-custom absolute -right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/95 dark:bg-zinc-900/90 border border-zinc-200 dark:border-zinc-700/80 shadow-lg flex items-center justify-center text-zinc-900 dark:text-white hover:bg-black hover:text-[#FFEE00] dark:hover:bg-[#FFEE00] dark:hover:text-black transition-all cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Next slide"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

const Skiper49 = () => {
  const images: SkiperImageItem[] = [
    {
      src: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop",
      alt: "Movies & Cinema Screen",
      title: "Movies & Cinema",
      category: "Entertainment",
    },
    {
      src: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1200&auto=format&fit=crop",
      alt: "Anime & Manga Culture",
      title: "Anime",
      category: "Entertainment",
    },
    {
      src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop",
      alt: "Fitness & Gym Training",
      title: "Fitness & Gym",
      category: "Lifestyle",
    },
    {
      src: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop",
      alt: "Travel & Scenic Exploration",
      title: "Travel & Exploration",
      category: "Adventure",
    },
    {
      src: "https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop",
      alt: "Story Writing & Journaling",
      title: "Story Writing",
      category: "Creative",
    },
    {
      src: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1200&auto=format&fit=crop",
      alt: "Art & Pencil Drawing",
      title: "Drawing",
      category: "Creative",
    },
    {
      src: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop",
      alt: "Music, Headphones & Playlists",
      title: "Music & Playlists",
      category: "Entertainment",
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-transparent">
      <Carousel_003 images={images} showPagination showNavigation loop autoplay />
    </div>
  );
};

export { Skiper49, Carousel_003 };
export default Skiper49;
