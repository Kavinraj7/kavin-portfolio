'use client';

import React from "react";
import { FullScreenScrollFX, FullScreenSection } from "@/components/ui/full-screen-scroll-fx";

const sections: FullScreenSection[] = [
  {
    leftLabel: "Silence",
    title: "Absence",
    rightLabel: "Silence",
    background: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2000&auto=format&fit=crop",
  },
  {
    leftLabel: "Essence",
    title: "Stillness",
    rightLabel: "Essence",
    background: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
  },
  {
    leftLabel: "Rebirth",
    title: "Growth",
    rightLabel: "Rebirth",
    background: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2000&auto=format&fit=crop",
  },
  {
    leftLabel: "Change",
    title: "Opportunity",
    rightLabel: "Change",
    background: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop",
  },
];

export default function DemoOne() {
  return (
    <FullScreenScrollFX
      sections={sections}
      header={<><div>The Creative</div><div>Process</div></>}
      footer={<div>METHODOLOGY</div>}
      showProgress
      durations={{ change: 0.7, snap: 800 }}
    />
  );
}
