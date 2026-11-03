"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ExternalLink,
  ArrowUpRight,
  X,
  Code2,
  Briefcase,
  Cpu,
  Database,
  Sparkles,
  Layers,
  CheckCircle2,
} from "lucide-react";

export type DomainKey = "all" | "software" | "management" | "ai" | "data";

export interface ProjectShowcaseItem {
  id: string;
  title: string;
  domainKey: "software" | "management" | "ai" | "data";
  domainLabel: string;
  summary: string;
  technologies: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  role: string;
  caseStudy: {
    problem: string;
    approach: string;
    result: string;
    metrics: { label: string; value: string }[];
  };
}

export const SHOWCASE_DOMAINS: { key: DomainKey; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { key: "all", label: "ALL WORKS", icon: Layers },
  { key: "software", label: "SOFTWARE DEV", icon: Code2 },
  { key: "management", label: "PROJECT MANAGEMENT", icon: Briefcase },
  { key: "ai", label: "AI / ML", icon: Cpu },
  { key: "data", label: "DATA ANALYTICS", icon: Database },
];

export const SHOWCASE_PROJECTS: ProjectShowcaseItem[] = [
  // 1. SOFTWARE DEVELOPMENT
  {
    id: "event-management",
    title: "Event Management System",
    domainKey: "software",
    domainLabel: "Software Development",
    summary:
      "A full-stack event management platform where clients share their event requirements and budgets, managers assign teams, and team members track and update tasks through completion.",
    technologies: ["SPRING BOOT", "REACT.JS", "MYSQL"],
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop",
    role: "Full-Stack Developer",
    caseStudy: {
      problem:
        "Managing events involves coordinating client expectations, budgets, multiple teams, and numerous tasks. Without a centralized workflow, tracking progress and ensuring every requirement is completed becomes difficult.",
      approach:
        "Developed a full-stack application using Spring Boot, React.js, and MySQL. Clients can submit event requirements and budgets, event managers can review requests and assign teams, and team members can update individual task statuses as work progresses.",
      result:
        "Created a centralized workflow for managing event requirements, coordinating teams, and tracking task completion from initial planning through event execution.",
      metrics: [
        { label: "Core Workflow", value: "End-to-End" },
        { label: "User Roles", value: "3" },
        { label: "Task Tracking", value: "Centralized" }
      ]
    }
  },
  {
    id: "visitflow",
    title: "VisitFlow",
    domainKey: "software",
    domainLabel: "Software Development",
    summary:
      "A hospital appointment management system that connects patients, receptionists, and doctors through an organized workflow for doctor availability, appointment requests, and scheduling.",
    technologies: ["SPRING BOOT", "REACT.JS", "MYSQL"],
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    role: "Full-Stack Developer",
    caseStudy: {
      problem:
        "Hospital appointment scheduling requires coordination between patient requests, doctor availability, and receptionist-managed time slots. Poor coordination can lead to scheduling conflicts and unnecessary waiting.",
      approach:
        "Built a full-stack appointment management application using Spring Boot, React.js, and MySQL. Doctors can define their availability, patients can request appointment slots, and receptionists can coordinate requests with available schedules and assign appointments.",
      result:
        "Established a structured appointment workflow that helps receptionists coordinate patient requests with doctor availability and manage scheduled visits in one system.",
      metrics: [
        { label: "Primary Workflow", value: "Appointments" },
        { label: "User Roles", value: "3" },
        { label: "Scheduling", value: "Availability-Based" }
      ]
    }
  },
  {
    id: "erp-system",
    title: "ERP System",
    domainKey: "software",
    domainLabel: "Software Development",
    summary:
      "A startup-focused ERP platform for team onboarding, task assignment, daily progress tracking, leave management, notifications, and project status monitoring.",
    technologies: ["NEXT.JS", "REACT", "FIREBASE", "FIRESTORE"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    role: "Full-Stack Developer",
    caseStudy: {
      problem:
        "Managing team members, task assignments, daily updates, leave requests, and project progress across separate tools makes it difficult for project managers to maintain visibility into ongoing work and pending tasks.",
      approach:
        "Developed a centralized ERP platform using Next.js, React, Firebase, and Firestore. Project managers can onboard team leads and members, team leads can assign tasks, and team members can post daily updates, change task statuses, and discuss questions through task comments. The platform also supports leave management and notifications.",
      result:
        "Brought team coordination, task discussions, progress updates, leave requests, and project monitoring into a unified workspace for startup operations.",
      metrics: [
        { label: "Core Modules", value: "5+" },
        { label: "Progress Updates", value: "Daily" },
        { label: "Task Collaboration", value: "Integrated" }
      ]
    }
  },
  {
    id: "sibling-shoes",
    title: "Sibling Shoes",
    domainKey: "software",
    domainLabel: "Software Development",
    summary:
      "An online shoe shopping platform where customers can explore footwear, manage their cart, and move through a streamlined e-commerce shopping experience.",
    technologies: ["NEXT.JS", "REACT", "AWS", "DYNAMODB", "CLOUDFLARE"],
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop",
    role: "Full-Stack Developer",
    caseStudy: {
      problem:
        "Customers need a convenient way to discover available footwear, review their selections, and manage items before purchasing, while the business needs an online storefront supported by suitable backend infrastructure.",
      approach:
        "Developed an e-commerce website using Next.js and React, with AWS and DynamoDB supporting the backend data layer and Cloudflare supporting the web infrastructure. The shopping experience includes product browsing and cart management.",
      result:
        "Created an online storefront that brings footwear discovery and cart-based shopping together, supported by a modern web stack and cloud technologies.",
      metrics: [
        { label: "Product Domain", value: "Footwear" },
        { label: "Shopping Feature", value: "Cart Management" },
        { label: "Infrastructure", value: "AWS + Cloudflare" }
      ]
    }
  },
  {
    id: "government-schemes",
    title: "Government Schemes",
    domainKey: "software",
    domainLabel: "Software Development",
    summary:
      "A personalized government scheme discovery platform that allows users to sign in, provide their details, and explore schemes for which they may be eligible.",
    technologies: ["NEXT.JS", "FIREBASE"],
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200&auto=format&fit=crop",
    role: "Web Developer",
    caseStudy: {
      problem:
        "People may struggle to discover relevant government schemes because eligibility criteria and application information can be spread across different sources. Finding schemes that match their circumstances can take time.",
      approach:
        "Developed a web platform using Next.js and Firebase that allows users to sign in, submit relevant personal details, and explore government schemes matching the eligibility criteria implemented in the application.",
      result:
        "Created a more personalized way for users to discover potentially relevant government schemes through a single web interface.",
      metrics: [
        { label: "Access", value: "User Sign-In" },
        { label: "Discovery", value: "Eligibility-Based" },
        { label: "Platform", value: "Web Application" }
      ]
    }
  },
  {
    id: "archaelix",
    title: "Archaelix",
    domainKey: "software",
    domainLabel: "Software Development",
    summary:
      "A business website for a digital marketing, IT services, and consulting company, presenting its services and helping businesses explore its digital growth solutions.",
    technologies: ["REACT.JS"],
    image:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?q=80&w=1200&auto=format&fit=crop",
    role: "Frontend Developer",
    caseStudy: {
      problem:
        "A digital services company needs a clear online presence to communicate its expertise, explain its offerings, and help potential clients understand how its services can support their business goals.",
      approach:
        "Developed the website frontend using React.js to present Archaelix's digital marketing, IT services, and business consulting offerings in a structured, accessible format aligned with the company's professional identity.",
      result:
        "Created a dedicated web presence for presenting the company's services, communicating its value proposition, and giving prospective clients a starting point to explore its offerings.",
      metrics: [
        { label: "Primary Focus", value: "Business Website" },
        { label: "Service Areas", value: "3" },
        { label: "Frontend", value: "React.js" }
      ]
    }
  },

  // 2. PROJECT MANAGEMENT
  {
    id: "hospital-nurse-shift-management",
    title: "Hospital Nurse Shift Management",
    domainKey: "management",
    domainLabel: "Project Management",
    summary:
      "A German-market SaaS platform for hospital nurse scheduling, shift swapping, leave requests, and workforce coordination, supported by mobile and web dashboard experiences.",
    technologies: [
      "FLUTTER",
      "AWS",
      "DYNAMODB",
      "SAAS",
      "WEB DASHBOARDS"
    ],
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    role: "Technical Project Manager",
    caseStudy: {
      problem:
        "Hospitals need to coordinate nurse shifts around staffing requirements, availability, leave requests, and shift swaps. Managing these moving parts while following hospital-specific organizational structures requires a clear and reliable workflow.",
      approach:
        "Owned sprint planning and coordinated project execution, serving as the primary connection between the client and the development team. Organized requirements into actionable sprints, tracked progress, aligned development with client expectations, and coordinated delivery across the mobile application and web dashboards.",
      result:
        "Delivered the project on time, coordinating client requirements and development activities across a platform designed to support hospital shift scheduling, nurse leave requests, shift swaps, and management oversight.",
      metrics: [
        { label: "Delivery", value: "On Time" },
        { label: "Platforms", value: "Mobile + Web" },
        { label: "Core Workflow", value: "Shift Management" }
      ]
    }
  },
  {
    id: "investment-platform",
    title: "Investment Platform",
    domainKey: "management",
    domainLabel: "Project Management",
    summary:
      "An investment platform for wood-based investment packages, with investor submissions, administrator approval workflows, and email-based delivery of investment proofs.",
    technologies: [
      "NEXT.JS",
      "AWS",
      "DYNAMODB",
      "INVESTMENT WORKFLOWS",
      "EMAIL NOTIFICATIONS"
    ],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    role: "Project Manager",
    caseStudy: {
      problem:
        "Managing package-based investments requires a structured process for collecting investor submissions, reviewing requests, recording approval decisions, and communicating supporting proofs to investors.",
      approach:
        "Coordinated project requirements and development workflows for a platform built with Next.js, AWS, and DynamoDB. The product workflow allows investors to select investment packages and submit investments, while administrators review and approve submissions and proofs are sent through email.",
      result:
        "Structured the investment process around investor submissions, administrator approvals, and email communication, helping bring the platform's core investment workflow into one digital experience.",
      metrics: [
        { label: "Investment Model", value: "Package-Based" },
        { label: "Approval Flow", value: "Admin Review" },
        { label: "Communication", value: "Email-Based" }
      ]
    }
  },
  {
    id: "fabric-production-management",
    title: "Fabric Production Management",
    domainKey: "management",
    domainLabel: "Project Management",
    summary:
      "A desktop production management system covering fabric design, dyeing, weaving, wrapping, order tracking, client management, and delivery invoicing.",
    technologies: [
      "ELECTRON",
      "DESKTOP APPLICATION",
      "PRODUCTION WORKFLOWS",
      "ORDER MANAGEMENT",
      "INVOICE MANAGEMENT"
    ],
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=1200&auto=format&fit=crop",
    role: "Project Manager",
    caseStudy: {
      problem:
        "Fabric production involves multiple connected stages, from initial design through dyeing, weaving, wrapping, and final delivery. Managing production activities, customer orders, and invoicing across these stages requires coordinated workflows and clear operational visibility.",
      approach:
        "Worked on coordinating the product requirements and project workflow for an Electron-based desktop application. The system brings production stages together with order management, client information, and delivery invoice workflows to support the operational lifecycle.",
      result:
        "Organized the production lifecycle into a centralized desktop application, connecting manufacturing stages with client, order, and invoicing processes.",
      metrics: [
        { label: "Platform", value: "Desktop App" },
        { label: "Production Flow", value: "End-to-End" },
        { label: "Business Areas", value: "Production + Orders" }
      ]
    }
  },

  // 3. AI / MACHINE LEARNING
  {
    id: "face-anonymization",
    title: "Face Anonymization System",
    domainKey: "ai",
    domainLabel: "AI / Machine Learning",
    summary:
      "A computer vision system that detects and anonymizes faces across images, videos, and real-time webcam feeds to support privacy-conscious visual data processing.",
    technologies: [
      "PYTHON",
      "OPENCV",
      "MEDIAPIPE",
      "NUMPY",
      "PANDAS",
      "SCIKIT-LEARN"
    ],
    image:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=1200&auto=format&fit=crop",
    role: "AI/ML Developer",
    caseStudy: {
      problem:
        "Visual data can contain identifiable faces, creating privacy concerns when images and videos are used, shared, or analyzed. Manually anonymizing faces across different media types can be time-consuming.",
      approach:
        "Developed a Python-based solution using MediaPipe for face detection and OpenCV for image processing and anonymization. Supported image uploads, video processing, and live webcam input, with NumPy and Pandas for data handling.",
      result:
        "Built a face anonymization tool capable of processing multiple visual input types and masking detected faces to help protect personal identity in visual data.",
      metrics: [
        { label: "Input Types", value: "3" },
        { label: "Processing Modes", value: "Image + Video + Live" },
        { label: "Core Function", value: "Face Anonymization" }
      ]
    }
  },
  {
    id: "sign-language-detection",
    title: "Sign Language Detection System",
    domainKey: "ai",
    domainLabel: "AI / Machine Learning",
    summary:
      "A real-time gesture recognition system combining webcam input, MediaPipe hand tracking, and machine learning to identify supported sign language gestures.",
    technologies: [
      "PYTHON",
      "OPENCV",
      "MEDIAPIPE",
      "NUMPY",
      "PANDAS",
      "SCIKIT-LEARN"
    ],
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    role: "AI/ML Developer",
    caseStudy: {
      problem:
        "Recognizing hand gestures in real time requires reliable hand tracking and classification. A system that identifies supported signs from camera input can serve as a foundation for more accessible gesture-based communication.",
      approach:
        "Built a Python-based pipeline using OpenCV to capture webcam frames, MediaPipe to track hand landmarks, and a trained scikit-learn model to classify supported gestures.",
      result:
        "Developed a real-time sign language gesture recognition prototype that connects camera-based hand tracking with machine learning classification.",
      metrics: [
        { label: "Input Mode", value: "Real-Time Webcam" },
        { label: "Recognition Type", value: "Hand Gestures" },
        { label: "ML Framework", value: "Scikit-learn" }
      ]
    }
  },

  // 4. DATA ANALYTICS
  {
    id: "zomato-bi",
    title: "Zomato Restaurant Analytics",
    domainKey: "data",
    domainLabel: "Data Analytics",
    summary:
      "Interactive business intelligence dashboard exploring restaurant performance, customer ratings, pricing patterns, and geographic distribution to uncover meaningful trends in restaurant data.",
    technologies: ["EXCEL", "PYTHON", "MYSQL", "POWER BI"],
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1200&auto=format&fit=crop",
    role: "Data Analyst",
    caseStudy: {
      problem:
        "Restaurant datasets contain multiple dimensions, including ratings, pricing, locations, and restaurant categories. Comparing these attributes across regions can be difficult without a consolidated analytical view.",
      approach:
        "Prepared and analyzed restaurant data using the tools applied in the project, then designed an interactive Power BI dashboard with visualizations and key metrics to explore restaurant performance and regional patterns.",
      result:
        "Created an interactive dashboard that makes restaurant data easier to filter, compare, and interpret, supporting exploratory analysis of restaurant and customer trends.",
      metrics: [
        { label: "Primary Tool", value: "Power BI" },
        { label: "Analysis Focus", value: "Restaurant Trends" },
        { label: "Interaction", value: "Interactive Filters" }
      ]
    }
  },
  {
    id: "netflix-bi",
    title: "Netflix Global Catalog BI",
    domainKey: "data",
    domainLabel: "Data Analytics",
    summary:
      "Interactive business intelligence dashboard exploring Netflix's content catalog, genre distribution, release patterns, and international content coverage.",
    technologies: ["EXCEL", "PYTHON", "MYSQL", "POWER BI"],
    image:
      "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1200&auto=format&fit=crop",
    role: "BI & Data Analyst",
    caseStudy: {
      problem:
        "A large streaming catalog can be difficult to analyze without a structured view of titles, genres, release years, and regional content distribution. Understanding these patterns requires interactive filtering and clear visual summaries.",
      approach:
        "Prepared and analyzed Netflix catalog data using Excel, Python, and MySQL as applicable to the workflow, then built an interactive Power BI dashboard to explore genre distribution, release trends, and content categories.",
      result:
        "Developed a visual analytics dashboard that helps users explore Netflix catalog composition and compare content trends through interactive reports.",
      metrics: [
        { label: "Primary Tool", value: "Power BI" },
        { label: "Analysis Focus", value: "Content Catalog" },
        { label: "Exploration", value: "Interactive Reports" }
      ]
    }
  },
  {
    id: "road-accident-bi",
    title: "Road Accident Analytics",
    domainKey: "data",
    domainLabel: "Data Analytics",
    summary:
      "Interactive road safety dashboard examining accident severity, location patterns, contributing factors, and time-based trends to support data-driven exploration.",
    technologies: ["EXCEL", "PYTHON", "MYSQL", "POWER BI"],
    image:
      "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=1200&auto=format&fit=crop",
    role: "Data Analyst",
    caseStudy: {
      problem:
        "Road accident datasets can contain extensive records about accident locations, severity, and contributing factors. Identifying recurring patterns and high-risk areas requires clear visual analysis.",
      approach:
        "Organized and analyzed road accident data using the tools applied in the project, then developed a Power BI dashboard with interactive charts and location-based visualizations to explore severity and time patterns.",
      result:
        "Created an interactive dashboard that helps users investigate road accident patterns and compare trends across relevant locations, periods, and accident categories.",
      metrics: [
        { label: "Primary Tool", value: "Power BI" },
        { label: "Analysis Focus", value: "Road Safety" },
        { label: "Key Dimensions", value: "Location + Time" }
      ]
    }
  },
  {
    id: "hr-analytics-bi",
    title: "HR Workforce Analytics",
    domainKey: "data",
    domainLabel: "Data Analytics",
    summary:
      "A workforce analytics dashboard presenting employee demographics, attendance, performance indicators, and turnover patterns through interactive Power BI visualizations.",
    technologies: ["EXCEL", "PYTHON", "MYSQL", "POWER BI"],
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1200&auto=format&fit=crop",
    role: "Data Analyst",
    caseStudy: {
      problem:
        "Workforce data can be spread across employee records, attendance information, performance indicators, and turnover reports. A consolidated dashboard can make these metrics easier to monitor and compare.",
      approach:
        "Prepared and analyzed HR data using the tools applied in the project, then created a Power BI dashboard to present employee demographics, attendance, performance indicators, and turnover patterns in an interactive format.",
      result:
        "Built a centralized workforce analytics dashboard that helps users explore HR indicators, compare workforce patterns, and identify areas for further analysis.",
      metrics: [
        { label: "Primary Tool", value: "Power BI" },
        { label: "Analysis Focus", value: "Workforce Metrics" },
        { label: "Reporting", value: "Interactive Dashboard" }
      ]
    }
  },


];

interface WorksShowcaseSectionProps {
  initialDomain?: DomainKey;
  onOpenTerminal?: () => void;
}

export const WorksShowcaseSection: React.FC<WorksShowcaseSectionProps> = ({
  initialDomain = "all",
}) => {
  const [selectedDomain, setSelectedDomain] = useState<DomainKey>(initialDomain);
  const [activeProject, setActiveProject] = useState<ProjectShowcaseItem | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Keyboard Escape listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeProject) {
        setActiveProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeProject]);

  // Sync initial domain when prop changes
  useEffect(() => {
    if (initialDomain) {
      setSelectedDomain(initialDomain);
    }
  }, [initialDomain]);

  // Filter projects based on selected domain
  const filteredProjects =
    selectedDomain === "all"
      ? SHOWCASE_PROJECTS
      : SHOWCASE_PROJECTS.filter((p) => p.domainKey === selectedDomain);

  // Prevent background scrolling and lock Lenis when modal is open
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.stop();
      }
    } else {
      document.body.style.overflow = "";
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = "";
      if (typeof window !== "undefined" && (window as any).__lenis) {
        (window as any).__lenis.start();
      }
    };
  }, [activeProject]);

  return (
    <section
      id="works-showcase"
      className="relative w-full min-h-screen bg-white dark:bg-[#0c1015] text-[#111417] dark:text-[#f2f6f9] border-t border-black/10 dark:border-white/10 select-none py-14 sm:py-20 md:py-24 px-4 sm:px-8 md:px-12 lg:px-16 flex flex-col justify-center items-center"
    >
      {/* 1. SECTION HEADER & CENTER FLOATING DOMAIN SWITCHER */}
      <div className="max-w-[1700px] mx-auto mb-12 sm:mb-16 flex flex-col items-center my-auto w-full">

        {/* Subtle Section Tag */}
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-4 h-4 text-[#ff6200]" />
          <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.25em] text-black/60 dark:text-white/60 font-bold">
            Selected Works & Case Studies
          </span>
        </div>

        {/* Section Main Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-center mb-8 uppercase">
          Multidisciplinary Portfolio
        </h2>

        {/* Center Floating Pill Domain Segment Switcher (All 5 Domains) */}
        <div className="bg-[#f0f3f5] dark:bg-[#161c24] p-1.5 rounded-full inline-flex items-center gap-1 sm:gap-1.5 shadow-inner border border-black/5 dark:border-white/10 max-w-full overflow-x-auto scrollbar-none">
          {SHOWCASE_DOMAINS.map((domain) => {
            const isActive = selectedDomain === domain.key;
            const Icon = domain.icon;
            return (
              <button
                key={domain.key}
                onClick={() => setSelectedDomain(domain.key)}
                className={`relative flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-bold tracking-tight uppercase whitespace-nowrap transition-all duration-300 z-10 ${isActive
                  ? "text-white dark:text-black"
                  : "text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
                  }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeDomainPill"
                    transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    className="absolute inset-0 bg-black dark:bg-white rounded-full shadow-md -z-10"
                  />
                )}
                <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2]" />
                <span>{domain.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. SHOWCASE PROJECTS GRID (Exact Clean Editorial Grid with Border Lines) */}
      <div className="max-w-[1700px] mx-auto border-t border-l border-black/10 dark:border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => {
              return (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.05,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={() => setActiveProject(project)}
                  className="group relative p-6 sm:p-8 border-r border-b border-black/10 dark:border-white/10 flex flex-col justify-between hover:bg-black/[0.015] dark:hover:bg-white/[0.015] transition-all duration-300 cursor-pointer"
                >
                  <div>
                    {/* Top Device Mockup Container */}
                    <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-[#e6ecee] dark:bg-[#12171e] mb-6 shadow-sm border border-black/5 dark:border-white/5">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover object-center group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                      />

                      {/* Floating VIEW Button on Hover */}
                      <div className="absolute top-3.5 right-3.5 opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 bg-black dark:bg-white text-white dark:text-black px-3.5 py-1.5 rounded-full text-[11px] font-bold tracking-wider uppercase flex items-center gap-1 shadow-lg">
                        <span>VIEW</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* Project Title */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-black dark:text-white group-hover:text-[#ff6200] transition-colors">
                        {project.title}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-black/40 dark:text-white/40 group-hover:text-black dark:group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>

                    {/* Project Summary */}
                    <p className="text-xs sm:text-sm text-black/65 dark:text-white/65 line-clamp-3 leading-relaxed mb-6 font-normal">
                      {project.summary}
                    </p>
                  </div>

                  {/* Tech Stack Pills at Bottom */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-black/5 dark:border-white/5">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 rounded-md bg-black/[0.04] dark:bg-white/[0.06] text-[10.5px] font-mono font-semibold uppercase tracking-wider text-black/60 dark:text-white/60 border border-black/5 dark:border-white/5"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* 3. COMPACT SPLIT 2-COLUMN CASE STUDY DETAIL MODAL (Rendered to body via Portal for true Viewport Centering) */}
      {mounted && typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {activeProject && (
            <div
              className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-5 md:p-8 overflow-y-auto"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                width: "100vw",
                height: "100vh",
                zIndex: 99999,
              }}
              onWheel={(e) => {
                e.stopPropagation();
              }}
              onTouchMove={(e) => {
                e.stopPropagation();
              }}
            >
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveProject(null)}
                className="fixed inset-0 bg-black/75 backdrop-blur-md"
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              />

              {/* Split Modal Card (Left Compact Image + Tech Stack | Right Content Only) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl xl:max-w-5xl max-h-[90vh] max-h-[90dvh] bg-white dark:bg-[#10141a] text-black dark:text-white rounded-[26px] sm:rounded-[30px] shadow-2xl overflow-hidden border border-black/10 dark:border-white/10 z-10 flex flex-col md:flex-row my-auto"
              >
                {/* Close Button */}
                <button
                  onClick={() => setActiveProject(null)}
                  aria-label="Close Project Details"
                  className="absolute top-4 right-4 sm:top-5 sm:right-5 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 flex items-center justify-center transition-colors shadow-sm cursor-pointer"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* LEFT SIDE: Shorter Device Image + Tech Stack Below */}
                <div className="relative w-full md:w-[42%] bg-[#edf2f4] dark:bg-[#151a22] p-5 sm:p-6 md:p-7 flex flex-col justify-between border-b md:border-b-0 md:border-r border-black/10 dark:border-white/10 shrink-0 overflow-y-auto max-h-full">
                  <div>
                    {/* Reduced Vertical Image Container */}
                    <div className="relative w-full h-[180px] sm:h-[210px] md:h-[225px] rounded-2xl overflow-hidden shadow-sm border border-black/5 dark:border-white/10 bg-black/5 dark:bg-black/30">
                      <Image
                        src={activeProject.image}
                        alt={activeProject.title}
                        fill
                        priority
                        className="object-cover object-center"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#ff6200] text-white font-mono font-bold text-[10px] uppercase tracking-wider shadow-sm">
                          {activeProject.domainLabel}
                        </span>
                        <h3 className="text-white text-base sm:text-lg font-bold mt-1 drop-shadow-md line-clamp-1">
                          {activeProject.title}
                        </h3>
                      </div>
                    </div>

                    {/* Technologies Used Placed Below The Image */}
                    <div className="mt-4 sm:mt-5">
                      <h4 className="font-mono text-[10.5px] font-bold uppercase tracking-wider text-black/55 dark:text-white/55 mb-2 flex items-center gap-1.5">
                        <Code2 className="w-3.5 h-3.5 text-[#ff6200]" />
                        Technologies & Tools
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {activeProject.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-white dark:bg-[#1f2630] text-[10.5px] font-mono font-bold uppercase tracking-wider text-black/80 dark:text-white/80 border border-black/10 dark:border-white/10 shadow-xs"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Role Badge on Left Footer */}
                  <div className="mt-4 pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between text-[11px] font-mono text-black/60 dark:text-white/60">
                    <span className="font-bold text-black dark:text-white">Role</span>
                    <span>{activeProject.role}</span>
                  </div>
                </div>

                {/* RIGHT SIDE: Clean Content Only (Fits Naturally, Scrollable If Needed) */}
                <div className="w-full md:w-[58%] p-5 sm:p-6 md:p-8 flex flex-col justify-between space-y-3.5 sm:space-y-4 overflow-y-auto max-h-full">
                  {/* Header Info */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#ff6200]">
                        Case Study
                      </span>
                      <span className="text-xs text-black/30 dark:text-white/30">•</span>
                      <span className="text-[11px] font-semibold text-black/60 dark:text-white/60">
                        {activeProject.domainLabel}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight mb-2 text-black dark:text-white">
                      {activeProject.title}
                    </h2>

                    <p className="text-xs sm:text-[13px] text-black/70 dark:text-white/70 leading-relaxed font-normal">
                      {activeProject.summary}
                    </p>
                  </div>

                  {/* Detailed Content Cards */}
                  <div className="space-y-2.5 sm:space-y-3 flex-1">
                    <div className="p-3 sm:p-3.5 rounded-xl bg-black/[0.025] dark:bg-white/[0.035] border border-black/5 dark:border-white/5">
                      <h4 className="font-bold text-[11px] font-mono uppercase tracking-wider text-black/75 dark:text-white/75 mb-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#ff6200]" />
                        Problem & Challenge
                      </h4>
                      <p className="text-xs text-black/80 dark:text-white/80 leading-relaxed">
                        {activeProject.caseStudy.problem}
                      </p>
                    </div>

                    <div className="p-3 sm:p-3.5 rounded-xl bg-black/[0.025] dark:bg-white/[0.035] border border-black/5 dark:border-white/5">
                      <h4 className="font-bold text-[11px] font-mono uppercase tracking-wider text-black/75 dark:text-white/75 mb-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                        Engineering & Strategic Approach
                      </h4>
                      <p className="text-xs text-black/80 dark:text-white/80 leading-relaxed">
                        {activeProject.caseStudy.approach}
                      </p>
                    </div>

                    <div className="p-3 sm:p-3.5 rounded-xl bg-black/[0.025] dark:bg-white/[0.035] border border-black/5 dark:border-white/5">
                      <h4 className="font-bold text-[11px] font-mono uppercase tracking-wider text-black/75 dark:text-white/75 mb-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        Impact & Results
                      </h4>
                      <p className="text-xs text-black/80 dark:text-white/80 leading-relaxed">
                        {activeProject.caseStudy.result}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};

export default WorksShowcaseSection;
