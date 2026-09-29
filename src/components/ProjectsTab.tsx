"use client";

import React, { useState } from "react";
import { CyberProjectsHero } from "./CyberProjectsHero";
import { WorksShowcaseSection, DomainKey } from "./WorksShowcaseSection";
import { ContactSection } from "./ContactSection";

interface ProjectsTabProps {
  onOpenTerminal?: () => void;
  onNavigateJourney?: () => void;
  onNavigateHome?: () => void;
}

export const ProjectsTab: React.FC<ProjectsTabProps> = ({
  onOpenTerminal,
  onNavigateJourney,
  onNavigateHome,
}) => {
  const [activeShowcaseDomain, setActiveShowcaseDomain] = useState<DomainKey>("all");

  const handleSelectDomainFromHero = (domainId: string) => {
    let mappedDomain: DomainKey = "all";
    if (domainId === "dev" || domainId === "software") mappedDomain = "software";
    else if (domainId === "pm" || domainId === "management") mappedDomain = "management";
    else if (domainId === "ai") mappedDomain = "ai";
    else if (domainId === "data") mappedDomain = "data";
    else if (domainId === "hr") mappedDomain = "hr";

    setActiveShowcaseDomain(mappedDomain);

    const showcaseElement = document.getElementById("works-showcase");
    if (showcaseElement) {
      showcaseElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full min-h-screen -mt-16 pt-16 bg-[#dce4e6] dark:bg-[#0c1015] overflow-y-auto overflow-x-hidden select-none scroll-smooth">
      {/* 1. Hero Section (Full Viewport) */}
      <div className="w-full h-[calc(100vh-4rem)] min-h-[640px] relative">
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
        <ContactSection onOpenTerminal={onOpenTerminal} />
      </div>
    </div>
  );
};

export default ProjectsTab;
