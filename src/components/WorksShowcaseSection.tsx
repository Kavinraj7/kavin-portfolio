"use client";

import React, { useState, useEffect } from "react";
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
  Users,
  Sparkles,
  Layers,
  CheckCircle2,
} from "lucide-react";

export type DomainKey = "all" | "software" | "management" | "ai" | "data" | "hr";

export interface ProjectShowcaseItem {
  id: string;
  title: string;
  domainKey: "software" | "management" | "ai" | "data" | "hr";
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
  { key: "hr", label: "HR / PEOPLE", icon: Users },
];

export const SHOWCASE_PROJECTS: ProjectShowcaseItem[] = [
  // 1. SOFTWARE DEVELOPMENT
  {
    id: "pickmycareer",
    title: "PickMyCareer",
    domainKey: "software",
    domainLabel: "Software Development",
    summary:
      "An AI-powered career guidance platform that helps students discover the right path through behavioral assessments, interactive reports, and personalized career roadmaps.",
    technologies: ["NEXT.JS", "TAILWIND CSS", "MAGIC UI", "RAZORPAY", "TYPESCRIPT"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1200&auto=format&fit=crop",
    role: "Lead Full-Stack Engineer",
    caseStudy: {
      problem: "Students faced fragmented career advice with zero data-backed clarity on market demands and skill alignment.",
      approach: "Engineered a reactive Next.js 14 application with real-time assessment processing, dynamic PDF generation, and Razorpay subscription pipelines.",
      result: "Onboarded 12,000+ active student users with 94% reported career clarity and 4.8/5 user satisfaction.",
      metrics: [
        { label: "Active Users", value: "12,000+" },
        { label: "Assessment Completion", value: "88%" },
        { label: "Avg Session", value: "18 mins" },
      ],
    },
  },
  {
    id: "summit-awards",
    title: "Summit Awards 2026",
    domainKey: "software",
    domainLabel: "Software Development",
    summary:
      "The official event platform for a premium networking summit, bringing registrations, ticket bookings, interactive speaker agendas, and live event telemetry together in one seamless experience.",
    technologies: ["NEXT.JS", "TAILWIND CSS", "GSAP", "RAZORPAY", "FRAMER MOTION"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    role: "Frontend Architect",
    caseStudy: {
      problem: "High-traffic summit required zero-latency ticketing and fluid 60fps editorial animations for executive attendee onboarding.",
      approach: "Built ultra-smooth scroll orchestrations with GSAP & Framer Motion, integrated webhook-verified payment gateways, and configured edge caching.",
      result: "Handled 45,000+ peak concurrent ticketing requests without downtime, generating $420K+ in presale transactions.",
      metrics: [
        { label: "Peak Concurrent", value: "45K" },
        { label: "Ticket Sales", value: "$420K+" },
        { label: "Uptime", value: "99.99%" },
      ],
    },
  },
  {
    id: "novix-studios",
    title: "Novix Studios",
    domainKey: "software",
    domainLabel: "Software Development",
    summary:
      "A modern portfolio and digital ecosystem for a premier creative agency, designed to showcase high-impact motion work, 3D interactive canvases, and convert high-tier enterprise clients.",
    technologies: ["NEXT.JS", "TAILWIND CSS", "REACT BITS", "LENIS SCROLL", "THREE.JS"],
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    role: "Creative Technologist",
    caseStudy: {
      problem: "Agency needed a marquee portfolio that proved their creative depth while retaining sub-second Google Lighthouse performance.",
      approach: "Crafted interactive WebGL shader canvases blended with Lenis smooth momentum scrolling and dynamic asset streaming.",
      result: "Landed 8 Fortune 500 agency client pitches within the first 60 days of launch.",
      metrics: [
        { label: "Client Inquiries", value: "+180%" },
        { label: "Lighthouse Score", value: "98/100" },
        { label: "Avg Engagement", value: "3.4 mins" },
      ],
    },
  },

  // 2. PROJECT MANAGEMENT
  {
    id: "smart-inventory-pm",
    title: "Supply Chain ERP Migration",
    domainKey: "management",
    domainLabel: "Project Management",
    summary:
      "End-to-end agile orchestration of a multi-warehouse enterprise resource planning system transition across 4 international logistics hubs.",
    technologies: ["JIRA", "CONFLUENCE", "SCRUM", "ROADMAPS", "RISK MATRIX"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=1200&auto=format&fit=crop",
    role: "Agile Project Manager",
    caseStudy: {
      problem: "Legacy inventory tracking caused frequent stockout delays and cross-border customs bottlenecks across 4 facilities.",
      approach: "Architected 2-week dual-track sprint cadences, established cross-functional stakeholder syncs, and automated burn-up reporting.",
      result: "Delivered migration 3 weeks ahead of schedule and 12% under budget with zero critical shipment interruptions.",
      metrics: [
        { label: "Timeline", value: "-3 Weeks" },
        { label: "Budget Variance", value: "-12%" },
        { label: "Warehouse Sync", value: "100%" },
      ],
    },
  },
  {
    id: "fintech-compliance-pm",
    title: "Global FinTech Regulatory Gate",
    domainKey: "management",
    domainLabel: "Project Management",
    summary:
      "Cross-border compliance and SOC-2 Type II audit readiness program managing 6 engineering teams and external cybersecurity auditors.",
    technologies: ["AGILE SDLC", "LINEAR", "NOTION", "MILESTONE TRACKING"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    role: "Technical Program Manager",
    caseStudy: {
      problem: "Rapid fintech scaling required strict PCI-DSS & SOC-2 compliance approvals prior to North American banking integration.",
      approach: "Constructed comprehensive traceability matrices, dependency graphs, and weekly executive steerco risk heatmaps.",
      result: "Achieved 100% audit compliance approval in first review with zero high-severity remediation findings.",
      metrics: [
        { label: "Compliance Pass", value: "100%" },
        { label: "Remediations", value: "0" },
        { label: "Audit Timeline", value: "4 Months" },
      ],
    },
  },
  {
    id: "telehealth-launch-pm",
    title: "TeleHealth 2.0 Patient Portal",
    domainKey: "management",
    domainLabel: "Project Management",
    summary:
      "Agile product delivery management for an enterprise telehealth video consultations and electronic health record integration system.",
    technologies: ["SCRUM", "ASANA", "HIPAA COMPLIANCE", "SPRINT PLANNING"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1200&auto=format&fit=crop",
    role: "Lead Project Manager",
    caseStudy: {
      problem: "High patient abandonment rates due to clunky pre-consultation medical intake forms.",
      approach: "Conducted sprint retrospective process overhauls, decoupled patient intake into progressive micro-steps, and unified doctor workflows.",
      result: "Boosted completed patient appointments by 42% and reduced clinic admin overtime by 28 hours/week.",
      metrics: [
        { label: "Consultations", value: "+42%" },
        { label: "Drop-off Rate", value: "-60%" },
        { label: "Sprint Velocity", value: "+28%" },
      ],
    },
  },

  // 3. AI / MACHINE LEARNING
  {
    id: "deep-vision-qa",
    title: "DeepVision Automated QA",
    domainKey: "ai",
    domainLabel: "AI / Machine Learning",
    summary:
      "Computer vision pipeline utilizing YOLOv8 and convolutional neural networks to detect manufacturing micro-defects on assembly lines in real-time.",
    technologies: ["PYTHON", "PYTORCH", "YOLOV8", "OPENCV", "FASTAPI"],
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1200&auto=format&fit=crop",
    role: "Computer Vision Engineer",
    caseStudy: {
      problem: "Manual visual inspection on high-speed manufacturing lines missed 4.2% of microscopic hairline fracture defects.",
      approach: "Trained edge-optimized YOLOv8 object detection models on 85,000 augmented industrial imaging frames with TensorRT inference.",
      result: "Attained 99.4% precision at 60 FPS continuous real-time video stream processing.",
      metrics: [
        { label: "Accuracy", value: "99.4%" },
        { label: "Inference Latency", value: "14ms" },
        { label: "Defect Catch Rate", value: "+38%" },
      ],
    },
  },
  {
    id: "neural-doc-rag",
    title: "NeuralDoc Enterprise RAG",
    domainKey: "ai",
    domainLabel: "AI / Machine Learning",
    summary:
      "Retrieval-Augmented Generation system index analyzing 500k+ enterprise legal contracts and technical documentation with grounded citations.",
    technologies: ["LANGCHAIN", "QDRANT", "LLAMA-3", "FASTAPI", "DOCKER"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
    role: "AI / LLM Engineer",
    caseStudy: {
      problem: "Legal teams spent 20+ hours per contract audit manually tracing clause precedents across thousands of legacy PDFs.",
      approach: "Built semantic chunking pipelines with hybrid dense/sparse vector retrieval in Qdrant and LLM reranking models.",
      result: "Reduced research turnaround time from 20 hours to 45 seconds with 98% factual grounding score.",
      metrics: [
        { label: "Search Speedup", value: "96%" },
        { label: "Docs Indexed", value: "500K+" },
        { label: "Hallucination Rate", value: "<0.8%" },
      ],
    },
  },
  {
    id: "audio-synth-ai",
    title: "VocalSense Emotion Audio AI",
    domainKey: "ai",
    domainLabel: "AI / Machine Learning",
    summary:
      "Deep learning acoustic model classifying sentiment, stress, and intent in customer support voice calls for automated sentiment routing.",
    technologies: ["PYTORCH", "LIBROSA", "TRANSFORMERS", "WHISPER", "DOCKER"],
    image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
    role: "ML Researcher",
    caseStudy: {
      problem: "Customer service escalations occurred too late due to delayed text-only transcript keyword tagging.",
      approach: "Engineered spectrogram transformer models extracting pitch, cadence, and vocal jitter features alongside real-time Whisper transcripts.",
      result: "Identified customer distress 3.5 minutes earlier than human supervisors, lowering customer churn by 22%.",
      metrics: [
        { label: "Emotion F1-Score", value: "92.6%" },
        { label: "Early Warning", value: "3.5 mins" },
        { label: "Churn Reduction", value: "22%" },
      ],
    },
  },

  // 4. DATA ANALYTICS
  {
    id: "netflix-bi",
    title: "Netflix Global Catalog BI",
    domainKey: "data",
    domainLabel: "Data Analytics",
    summary:
      "Interactive business intelligence telemetry exploring Netflix content strategy, genre distribution dynamics, and international licensing shift.",
    technologies: ["POWER BI", "SQL", "PYTHON", "DAX", "TABLEAU"],
    image: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1200&auto=format&fit=crop",
    role: "BI & Data Analyst",
    caseStudy: {
      problem: "Catalog strategy required multi-dimensional slicing to reveal licensing trends, original production surges, and regional coverage.",
      approach: "Engineered automated SQL transformation pipelines, calculated complex DAX metrics, and designed an executive dark-mode dashboard.",
      result: "Revealed original content distribution scaling by 4.2x in APAC regions with instant query drill-down.",
      metrics: [
        { label: "Titles Analyzed", value: "8,800+" },
        { label: "Query Speedup", value: "65%" },
        { label: "Countries Mapped", value: "40+" },
      ],
    },
  },
  {
    id: "zomato-restaurant-analytics",
    title: "Zomato DineOut Predictive Engine",
    domainKey: "data",
    domainLabel: "Data Analytics",
    summary:
      "Market density and customer sentiment analysis analyzing 9,500+ restaurants across Indian metros to optimize cuisine pricing tiers.",
    technologies: ["PYTHON", "SEABORN", "SCIKIT-LEARN", "PANDAS", "EXCEL"],
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop",
    role: "Data Analyst",
    caseStudy: {
      problem: "New restaurant ventures experienced high failure rates due to poorly matched pricing brackets and local cuisine saturation.",
      approach: "Applied k-means spatial clustering and sentiment NLP on 250k+ user reviews to construct a predictive success index.",
      result: "Delivered pricing recommendations adopted by 35+ partner kitchens resulting in 18% higher margin capture.",
      metrics: [
        { label: "Restaurants Evaluated", value: "9,500+" },
        { label: "Reviews Modeled", value: "250K+" },
        { label: "Margin Growth", value: "+18%" },
      ],
    },
  },
  {
    id: "ecommerce-cohort-analytics",
    title: "E-Commerce LTV & Retention Matrix",
    domainKey: "data",
    domainLabel: "Data Analytics",
    summary:
      "Customer lifetime value, cohort churn matrix, and purchase frequency forecasting analyzing over $14M in annual gross merchandise volume.",
    technologies: ["SQL", "BIGQUERY", "METABASE", "PYTHON", "STATSMODELS"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop",
    role: "Analytics Engineer",
    caseStudy: {
      problem: "Paid acquisition costs rose while 60-day repeat purchase attribution remained untracked.",
      approach: "Built multi-touch attribution models and monthly retention cohort tables in BigQuery with automated Metabase sync.",
      result: "Pinpointed top 5% repeat buyer persona drivers, enabling marketing to reduce CAC by 31%.",
      metrics: [
        { label: "GMV Analyzed", value: "$14M+" },
        { label: "CAC Reduction", value: "31%" },
        { label: "Cohort Retention", value: "+19%" },
      ],
    },
  },

  // 5. HR / PEOPLE OPERATIONS
  {
    id: "talent-pulse-hr",
    title: "TalentPulse People Telemetry",
    domainKey: "hr",
    domainLabel: "HR / People Operations",
    summary:
      "Organizational health & predictive attrition modeling system tracking employee engagement, sentiment pulses, and internal growth pathways.",
    technologies: ["PEOPLE ANALYTICS", "SURVEY DESIGN", "POWER BI", "EXCEL", "PYTHON"],
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop",
    role: "People Analytics Lead",
    caseStudy: {
      problem: "Rapid remote expansion triggered unexpected key engineer departures and declining satisfaction scores.",
      approach: "Designed bi-weekly micro-pulse sentiment surveys, mapped flight risk indicators, and instituted transparent manager feedback loops.",
      result: "Reduced voluntary tech turnover by 34% and improved company-wide eNPS score from +18 to +52.",
      metrics: [
        { label: "Turnover Reduction", value: "34%" },
        { label: "eNPS Score", value: "+52" },
        { label: "Survey Participation", value: "91%" },
      ],
    },
  },
  {
    id: "skills-matrix-hr",
    title: "Engineering Competency Grid",
    domainKey: "hr",
    domainLabel: "HR / People Operations",
    summary:
      "Structured career leveling, compensation benchmark, and performance calibration framework adopted across 250+ engineering personnel.",
    technologies: ["COMPENSATION MODELING", "NOTION", "LEVELING FRAMEWORK", "HRIS"],
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=1200&auto=format&fit=crop",
    role: "Strategic HR Consultant",
    caseStudy: {
      problem: "Ambiguous promotion criteria created review friction, salary disparities, and retention anxiety across senior developers.",
      approach: "Created dual-track IC & Management ladders with clear measurable behavioral rubrics and market-indexed salary bands.",
      result: "Shortened promotion review cycles by 50% with 96% employee approval on appraisal fairness.",
      metrics: [
        { label: "Review Speedup", value: "50%" },
        { label: "Fairness Score", value: "96%" },
        { label: "Staff Leveled", value: "250+" },
      ],
    },
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

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeProject]);

  return (
    <section
      id="works-showcase"
      className="relative w-full bg-white dark:bg-[#0c1015] text-[#111417] dark:text-[#f2f6f9] border-t border-black/10 dark:border-white/10 select-none py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16"
    >
      {/* 1. SECTION HEADER & CENTER FLOATING DOMAIN SWITCHER */}
      <div className="max-w-[1700px] mx-auto mb-12 sm:mb-16 flex flex-col items-center">
        
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
                className={`relative flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-[13px] font-bold tracking-tight uppercase whitespace-nowrap transition-all duration-300 z-10 ${
                  isActive
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

      {/* 3. COMPACT SPLIT 2-COLUMN CASE STUDY DETAIL MODAL (No Scroll Needed, Isolated Viewport) */}
      <AnimatePresence>
        {activeProject && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-8"
            onWheel={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
            onTouchMove={(e) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="absolute inset-0 bg-black/65 backdrop-blur-md"
            />

            {/* Split Modal Card (Left Compact Image + Tech Stack | Right Content Only) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => {
                e.stopPropagation();
              }}
              className="relative w-full max-w-4xl xl:max-w-5xl bg-white dark:bg-[#10141a] text-black dark:text-white rounded-[26px] sm:rounded-[30px] shadow-2xl overflow-hidden border border-black/10 dark:border-white/10 z-10 flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 z-30 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/10 dark:bg-white/10 hover:bg-black/20 dark:hover:bg-white/20 flex items-center justify-center transition-colors shadow-sm"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* LEFT SIDE: Shorter Device Image + Tech Stack Below */}
              <div className="relative w-full md:w-[42%] bg-[#edf2f4] dark:bg-[#151a22] p-5 sm:p-6 md:p-7 flex flex-col justify-between border-b md:border-b-0 md:border-r border-black/10 dark:border-white/10 shrink-0">
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

              {/* RIGHT SIDE: Clean Content Only (No Number Cards, Fits Naturally without Scroll) */}
              <div className="w-full md:w-[58%] p-5 sm:p-6 md:p-8 flex flex-col justify-between space-y-3.5 sm:space-y-4">
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
      </AnimatePresence>
    </section>
  );
};

export default WorksShowcaseSection;
