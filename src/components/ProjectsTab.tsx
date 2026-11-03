"use client";

import React, { useState } from "react";
import { CyberProjectsHero } from "./CyberProjectsHero";
import { WorksShowcaseSection, DomainKey } from "./WorksShowcaseSection";
import { ContactSection } from "./ContactSection";
import { NavTab } from "./Header";
import { scrollToTarget } from "@/utils/scroll";

interface ProjectsTabProps {
  onOpenTerminal?: () => void;
  onNavigateJourney?: () => void;
  onNavigateHome?: () => void;
  onNavigate?: (tab: NavTab, sectionId?: string) => void;
}

export const ProjectsTab: React.FC<ProjectsTabProps> = ({
  onOpenTerminal,
  onNavigateJourney,
  onNavigateHome,
  onNavigate,
}) => {
  const [activeShowcaseDomain, setActiveShowcaseDomain] = useState<DomainKey>("all");

  const handleSelectDomainFromHero = (domainId: string) => {
    let mappedDomain: DomainKey = "all";
    if (domainId === "dev" || domainId === "software") mappedDomain = "software";
    else if (domainId === "pm" || domainId === "management") mappedDomain = "management";
    else if (domainId === "ai") mappedDomain = "ai";
    else if (domainId === "data") mappedDomain = "data";

    setActiveShowcaseDomain(mappedDomain);

    scrollToTarget("works-showcase");
  };

  return (
    <div className="relative w-full min-h-screen bg-[#dce4e6] dark:bg-[#0c1015] overflow-x-hidden select-none scroll-smooth">
      {/* 1. Hero Section (Full Viewport) */}
      <div className="w-full h-screen min-h-[700px] relative">
        <CyberProjectsHero
          onSelectDomain={handleSelectDomainFromHero}
          onOpenTerminal={onOpenTerminal}
          onNavigateHome={onNavigateHome}
          onNavigateJourney={onNavigateJourney}
        />
      </div>

      {/* 2. Works Showcase Grid Section with 5 Domain Filter */}
      <WorksShowcaseSection
        initialDomain={activeShowcaseDomain}
        onOpenTerminal={onOpenTerminal}
      />

      {/* 3. Contact Footer */}
      <div className="w-full">
        <ContactSection
          onOpenTerminal={onOpenTerminal}
          onNavigate={onNavigate || ((tab, sectionId) => {
            if (typeof window !== 'undefined') {
              window.dispatchEvent(
                new CustomEvent('app-navigate', { detail: { tab, sectionId } })
              );
            }
          })}
        />
      </div>
    </div>
  );
};

export default ProjectsTab;
