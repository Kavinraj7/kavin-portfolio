'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  ArrowRight, 
  X, 
  CheckCircle2, 
  Layers, 
  Cpu, 
  Database, 
  Code2, 
  Briefcase, 
  Users, 
  BarChart3, 
  Maximize2,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Activity,
  Award,
  Terminal
} from 'lucide-react';
import { soundFx } from '@/utils/audio';

// Domain and Project Types
export type DomainKey = 'management' | 'data' | 'ai' | 'software' | 'hr';

export interface ProjectData {
  id: string;
  number: string;
  title: string;
  domainKey: DomainKey;
  domainLabel: string;
  secondaryDomains?: DomainKey[];
  technologies: string[];
  summary: string;
  problem: string;
  approach: string;
  result: string;
  role: string;
  image: string;
  nodePos: { x: number; y: number }; // % coordinates within constellation box
  caseStudy: {
    problemDetails: string;
    approachDetails: string;
    techDetails: string;
    buildDetails: string;
    resultDetails: string;
    learnings: string;
    metrics: { label: string; value: string }[];
  };
}

export interface DomainData {
  key: DomainKey;
  title: string;
  projectCount: string;
  techSummary: string;
  pos: { x: number; y: number }; // % coordinates
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
}

const DOMAINS: DomainData[] = [
  {
    key: 'ai',
    title: 'AI / MACHINE LEARNING',
    projectCount: '04 PROJECTS',
    techSummary: 'Python · OpenCV · Scikit-learn · CNN',
    pos: { x: 50, y: 15 },
    icon: Cpu,
    accentColor: '#8B5CF6',
  },
  {
    key: 'management',
    title: 'PROJECT MANAGEMENT',
    projectCount: '05 PROJECTS',
    techSummary: 'Agile · Jira · SDLC · Planning',
    pos: { x: 20, y: 35 },
    icon: Briefcase,
    accentColor: '#F59E0B',
  },
  {
    key: 'software',
    title: 'SOFTWARE DEVELOPMENT',
    projectCount: '03 PROJECTS',
    techSummary: 'Java · React · Node.js · AWS',
    pos: { x: 80, y: 35 },
    icon: Code2,
    accentColor: '#3B82F6',
  },
  {
    key: 'data',
    title: 'DATA ANALYTICS',
    projectCount: '04 PROJECTS',
    techSummary: 'Excel · SQL · Power BI · Python',
    pos: { x: 25, y: 78 },
    icon: Database,
    accentColor: '#EC4899',
  },
  {
    key: 'hr',
    title: 'HR / PEOPLE',
    projectCount: '02 PROJECTS',
    techSummary: 'HR systems · People analytics · Process design',
    pos: { x: 75, y: 78 },
    icon: Users,
    accentColor: '#10B981',
  },
];

const PROJECTS: ProjectData[] = [
  {
    id: 'p1',
    number: '01',
    title: 'Netflix Analytics Dashboard',
    domainKey: 'data',
    domainLabel: 'Data Analytics',
    secondaryDomains: ['software'],
    technologies: ['Excel', 'MySQL', 'Power BI', 'Python'],
    summary: 'Interactive business intelligence dashboard exploring Netflix content trends, genre distribution, and regional catalog dynamics.',
    problem: 'Netflix’s vast catalog required multi-dimensional slicing to reveal licensing trends, genre concentration, and viewer rating correlations.',
    approach: 'Engineered automated ETL pipelines in MySQL, calculated DAX time-intelligence metrics, and built interactive drill-down visualizations in Power BI.',
    result: 'Reduced catalog analysis turnaround by 65% with intuitive exploration of 8,800+ titles across 40+ countries.',
    role: 'Data Analyst & BI Architect',
    image: 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?q=80&w=1200&auto=format&fit=crop',
    nodePos: { x: 16, y: 88 },
    caseStudy: {
      problemDetails: 'Understanding Netflix’s catalog shifts from third-party licensing to internal original productions across global regions.',
      approachDetails: 'Cleaned raw messy metadata, normalized nested actors/director fields, and established strict relational schemas.',
      techDetails: 'MySQL for relational normalization, Python for pre-processing NLP genre tokens, and Power BI for DAX measure models.',
      buildDetails: 'Constructed star-schema analytical models and configured dynamic bookmarking for rapid executive filtering.',
      resultDetails: 'Demonstrated actionable findings showing original production surges in Asian and European territories with 4.2x title growth.',
      learnings: 'High-density storytelling relies on aggressive visual hierarchy and pre-calculated aggregations for instant rendering.',
      metrics: [
        { label: 'Titles Analyzed', value: '8,800+' },
        { label: 'Query Speedup', value: '65%' },
        { label: 'Countries Mapped', value: '40+' },
      ],
    },
  },
  {
    id: 'p2',
    number: '02',
    title: 'Zomato Restaurant Analytics',
    domainKey: 'data',
    domainLabel: 'Data Analytics',
    secondaryDomains: ['management'],
    technologies: ['Python', 'SQL', 'Tableau', 'Geospatial'],
    summary: 'High-dimensional spatial and consumer sentiment analytics modeling restaurant pricing and cuisine saturation.',
    problem: 'Restaurant chains needed demographic and density insights to locate optimal expansion corridors without cannibalizing existing stores.',
    approach: 'Extracted geospatial clustering indices and analyzed rating distributions against average cost-for-two brackets.',
    result: 'Delivered an interactive heat-map identifying under-served culinary corridors with 92% market fit validation.',
    role: 'Analytics Engineer',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1200&auto=format&fit=crop',
    nodePos: { x: 34, y: 86 },
    caseStudy: {
      problemDetails: 'Identifying whitespace opportunities in food delivery markets characterized by volatile customer loyalty and heavy discounts.',
      approachDetails: 'Normalized cuisine taxonomy, applied k-means spatial clustering on GPS coordinates, and modeled rating sentiments.',
      techDetails: 'Pandas for data transformation, GeoPandas for spatial polygon bounding, and Tableau for executive dashboard distribution.',
      buildDetails: 'Engineered custom spatial overlays highlighting delivery radius coverage vs average customer feedback density.',
      resultDetails: 'Identified 14 high-margin micro-markets suitable for cloud kitchen deployments.',
      learnings: 'Spatial data requires coordinate reprojection and strict outlier thresholds to eliminate noisy user feedback.',
      metrics: [
        { label: 'Restaurants Mapped', value: '9,500+' },
        { label: 'Cluster Accuracy', value: '92%' },
        { label: 'New Corridors', value: '14 Zones' },
      ],
    },
  },
  {
    id: 'p3',
    number: '03',
    title: 'Face Anonymizer Vision Pipeline',
    domainKey: 'ai',
    domainLabel: 'AI / Machine Learning',
    secondaryDomains: ['software'],
    technologies: ['Python', 'OpenCV', 'MediaPipe', 'FastAPI'],
    summary: 'Real-time computer vision pipeline obfuscating human identities in video streams at 60 FPS while preserving contextual background.',
    problem: 'Compliance regulations mandated strict privacy masking on enterprise surveillance feeds without introducing stream latency.',
    approach: 'Built a lightweight 468-point facial landmark detector with selective bounding-box dynamic Gaussian blurring.',
    result: 'Sub-16ms latency per frame processing uninterrupted 1080p video feeds with 99.4% detection recall.',
    role: 'Computer Vision Engineer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop',
    nodePos: { x: 42, y: 8 },
    caseStudy: {
      problemDetails: 'Strict GDPR & HIPAA mandates requiring automatic facial blurring in real-time camera streams.',
      approachDetails: 'Leveraged single-shot multi-box facial detectors optimized with SIMD hardware instructions for zero lag.',
      techDetails: 'MediaPipe face mesh inference, OpenCV CUDA backend acceleration, and FastAPI streaming WebSockets.',
      buildDetails: 'Designed an asynchronous frame-buffer pipeline with multi-threading to decouple camera ingest from pixel blurring.',
      resultDetails: 'Shipped containerized vision worker handling up to 8 concurrent RTSP streams on standard edge CPU hardware.',
      learnings: 'Edge vision models achieve peak throughput when memory allocations are recycled across frame cycles.',
      metrics: [
        { label: 'Framerate', value: '60 FPS' },
        { label: 'Latency', value: '16ms' },
        { label: 'Detection Recall', value: '99.4%' },
      ],
    },
  },
  {
    id: 'p4',
    number: '04',
    title: 'Multimodal Emotion Classifier',
    domainKey: 'ai',
    domainLabel: 'AI / Machine Learning',
    secondaryDomains: ['hr'],
    technologies: ['PyTorch', 'CNN', 'Librosa', 'Scikit-learn'],
    summary: 'Deep neural network classifying emotional sentiment from facial micro-expressions and acoustic speech pitch cues.',
    problem: 'Measuring authentic candidate engagement during remote interviews and user research sessions lacked objective telemetry.',
    approach: 'Trained dual-stream convolutional networks: spatial CNNs on facial frames paired with spectrogram CNNs on audio pitch.',
    result: 'Achieved 91.4% classification accuracy across 7 discrete emotional states with live confidence metrics.',
    role: 'Deep Learning Researcher',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop',
    nodePos: { x: 62, y: 8 },
    caseStudy: {
      problemDetails: 'Subjective assessments in human engagement testing create bias and noisy evaluations in remote environments.',
      approachDetails: 'Fused multi-modal spatial features with audio frequency spectrograms using late-fusion attention layers.',
      techDetails: 'PyTorch deep learning framework, Librosa audio DSP feature extractors, and OpenCV vision preprocessing.',
      buildDetails: 'Implemented data augmentation pipelines with random affine transforms and acoustic background noise injection.',
      resultDetails: 'Surpassed single-modality baseline accuracy by 14.8% on standard benchmark datasets.',
      learnings: 'Multi-modal fusion requires normalized loss weighting to prevent dominant visual signals from suppressing subtle vocal cues.',
      metrics: [
        { label: 'Validation Accuracy', value: '91.4%' },
        { label: 'Emotion Classes', value: '7 States' },
        { label: 'Inference Time', value: '45ms' },
      ],
    },
  },
  {
    id: 'p5',
    number: '05',
    title: 'SkillBridge Platform',
    domainKey: 'software',
    domainLabel: 'Software Development',
    secondaryDomains: ['management', 'software'],
    technologies: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    summary: 'Enterprise student skill verification and mentorship routing platform connecting academia with industry opportunities.',
    problem: 'Traditional campus recruitment suffered from resume fraud, opaque verification, and manual mentor scheduling delays.',
    approach: 'Engineered modular TypeScript microservices, granular role-based access control, and automated portfolio verification engines.',
    result: 'Successfully onboarded 1,400+ students with 99.8% uptime and 70% reduction in mentor matching latency.',
    role: 'Full-Stack Architect & Lead',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1200&auto=format&fit=crop',
    nodePos: { x: 88, y: 24 },
    caseStudy: {
      problemDetails: 'Bridging the skill validation gap between university curricula and contemporary software engineering expectations.',
      approachDetails: 'Built automated coding challenge sandboxes with instant unit test verification and peer-endorsement graphs.',
      techDetails: 'Next.js frontend, Express/Node.js REST microservices, PostgreSQL relational core, AWS S3 and CloudFront.',
      buildDetails: 'Integrated Stripe webhook pipelines for verified certification badges and automated calendar sync for mentors.',
      resultDetails: 'Over 1,400 active student portfolios verified across 8 engineering disciplines.',
      learnings: 'Strict database indexing and asynchronous job queues are essential to prevent booking contention during peak hiring cycles.',
      metrics: [
        { label: 'Active Students', value: '1,400+' },
        { label: 'System Uptime', value: '99.8%' },
        { label: 'Matching Speed', value: '-70%' },
      ],
    },
  },
  {
    id: 'p6',
    number: '06',
    title: 'Appointment Booking Platform',
    domainKey: 'software',
    domainLabel: 'Software Development',
    secondaryDomains: ['software'],
    technologies: ['TypeScript', 'Next.js', 'Redis', 'Tailwind'],
    summary: 'High-concurrency reservation engine with distributed slot locking to eliminate race conditions under peak traffic spikes.',
    problem: 'Surges in reservation traffic caused double-booking anomalies and database table locks.',
    approach: 'Implemented distributed Redis slot locks with transactional mutexes and real-time WebSocket state synchronization.',
    result: 'Zero booking collision anomalies recorded under simulated loads of 1,500 simultaneous checkout requests.',
    role: 'Lead Systems Engineer',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
    nodePos: { x: 86, y: 46 },
    caseStudy: {
      problemDetails: 'Preventing double-booking race conditions during high-demand promotional reservation windows.',
      approachDetails: 'Adopted pessimistic slot reservation with auto-expiring TTLs in Redis before final database writes.',
      techDetails: 'Redis for distributed key locks, TypeScript Next.js app router, and WebSocket broadcast channels.',
      buildDetails: 'Designed a self-healing queue worker that automatically restores expired held slots back to the public pool.',
      resultDetails: 'Achieved sub-20ms lock acquisition time with zero inventory drift across 10,000+ stress-test simulations.',
      learnings: 'Decoupling lock management from relational database writes protects the primary DB from thread exhaustion.',
      metrics: [
        { label: 'Concurrent Users', value: '1,500 req/s' },
        { label: 'Booking Collisions', value: '0' },
        { label: 'Lock Latency', value: '< 20ms' },
      ],
    },
  },
  {
    id: 'p7',
    number: '07',
    title: 'Agile Sprint & Delivery Matrix',
    domainKey: 'management',
    domainLabel: 'Project Management',
    secondaryDomains: ['software', 'management'],
    technologies: ['Jira', 'Confluence', 'Agile/Scrum', 'SDLC'],
    summary: 'Standardized delivery governance framework and sprint telemetry aligning 3 cross-functional engineering squads.',
    problem: 'Siloed development squads faced sprint spillovers, opaque blocker reporting, and inconsistent QA handoffs.',
    approach: 'Established automated Jira workflow automations, dual-track agile discovery/delivery, and daily risk burndown telemetry.',
    result: 'Reduced sprint velocity variance by 38% and hit 96% on-time milestone delivery over 14 consecutive sprints.',
    role: 'Technical Project Manager / Scrum Master',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200&auto=format&fit=crop',
    nodePos: { x: 12, y: 26 },
    caseStudy: {
      problemDetails: 'Engineering delivery predictability suffered due to shifting scope requirements and unclear ticket acceptance criteria.',
      approachDetails: 'Standardized definition-of-ready contracts and instituted bi-weekly automated velocity retrospectives.',
      techDetails: 'Atlassian Jira REST APIs for sprint velocity metric scraping, Confluence for technical PRDs, and automated Slack webhooks.',
      buildDetails: 'Created executive dashboards tracking epic burndown, pull-request turnaround times, and cycle-time bottlenecks.',
      resultDetails: 'Achieved 96% on-time delivery across 4 major enterprise feature releases.',
      learnings: 'High-velocity teams thrive when friction is removed at the PR and QA boundary rather than simply increasing story points.',
      metrics: [
        { label: 'On-Time Releases', value: '96%' },
        { label: 'Velocity Variance', value: '-38%' },
        { label: 'Sprints Tracked', value: '14 Sprints' },
      ],
    },
  },
  {
    id: 'p8',
    number: '08',
    title: 'People Analytics & Retention Predictor',
    domainKey: 'hr',
    domainLabel: 'HR / People',
    secondaryDomains: ['data', 'ai'],
    technologies: ['Python', 'Scikit-Learn', 'Power BI', 'SHAP'],
    summary: 'Predictive machine learning telemetry analyzing employee sentiment, review cadence, and proactive retention signals.',
    problem: 'High engineering turnover created organizational drag without clear data-backed indicators of impending departures.',
    approach: 'Trained explainable gradient-boosted decision trees on historical compensation bands, promotion velocity, and survey feedback.',
    result: 'Achieved 84% predictive precision for 6-month attrition risk, enabling timely leadership retention interventions.',
    role: 'HR Tech & People Analytics Lead',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop',
    nodePos: { x: 84, y: 88 },
    caseStudy: {
      problemDetails: 'Reactive exit interviews failed to diagnose employee flight risk before key engineers submitted resignations.',
      approachDetails: 'Applied SHAP (SHapley Additive exPlanations) values to highlight the primary factors influencing departure probability.',
      techDetails: 'XGBoost classifier, SHAP interpretability library, Pandas, and confidential Power BI executive reports.',
      buildDetails: 'Engineered strict anonymization filters ensuring individual privacy while delivering cohort-level risk signals.',
      resultDetails: 'Allowed HR business partners to proactively retain 18 high-performing engineers through tailored career adjustments.',
      learnings: 'Explainable AI is mandatory in HR analytics to avoid opaque decisions and ensure ethical human-centered action.',
      metrics: [
        { label: 'Risk Precision', value: '84%' },
        { label: 'Talent Retained', value: '18 Leads' },
        { label: 'Signals Modeled', value: '28 Metrics' },
      ],
    },
  },
];

export const ProjectUniverseSection: React.FC = () => {
  const [hoveredDomain, setHoveredDomain] = useState<DomainKey | null>(null);
  const [hoveredProject, setHoveredProject] = useState<ProjectData | null>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [caseStudyOpen, setCaseStudyOpen] = useState(false);
  const constellationRef = useRef<HTMLDivElement>(null);

  // Center node position (KAVIN)
  const centerPos = { x: 50, y: 50 };

  const handleSelectProject = (project: ProjectData) => {
    soundFx.playConfirm();
    setSelectedProject(project);
  };

  const handleBackToUniverse = () => {
    soundFx.playSelect();
    setSelectedProject(null);
    setCaseStudyOpen(false);
  };

  const handleOpenCaseStudy = () => {
    soundFx.playTerminal();
    setCaseStudyOpen(true);
  };

  return (
    <section id="project-universe" className="relative w-full bg-[#FAF9F6] dark:bg-[#07060A] text-zinc-900 dark:text-zinc-100 transition-colors duration-500 overflow-hidden">
      
      {/* ========================================================================= */}
      {/* 1. EDITORIAL HERO INTRO */}
      {/* ========================================================================= */}
      <div className="relative w-full pt-20 sm:pt-28 pb-12 sm:pb-16 px-6 sm:px-10 md:px-16 lg:px-24 border-b border-zinc-200/80 dark:border-zinc-800/80">
        
        {/* Subtle Background Geometric Grid */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20 dark:opacity-10"
          style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
          }}
        />

        <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          {/* Left Title: WHAT I'VE BUILT */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-200/70 dark:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 text-[11px] font-mono font-bold uppercase tracking-widest mb-4 w-fit border border-zinc-300/60 dark:border-zinc-700/60"
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
              <span>PROJECT UNIVERSE</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-zinc-950 dark:text-white tracking-tighter uppercase leading-[0.92] font-sans"
            >
              WHAT I&apos;VE<br />BUILT.
            </motion.h2>
          </div>

          {/* Right Subtitle Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="max-w-md text-left md:text-right pb-2"
          >
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-sans font-normal leading-relaxed">
              Projects are where ideas became systems, experiments became solutions, and concepts became something people could actually use.
            </p>
            <div className="mt-4 flex items-center md:justify-end gap-2 text-xs font-mono font-semibold text-zinc-500 dark:text-zinc-500">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>5 Disciplines Interconnected &bull; 8 Featured Nodes</span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN INTERACTIVE PROJECT CONSTELLATION */}
      {/* ========================================================================= */}
      <div className="relative w-full min-h-[880px] lg:min-h-[960px] flex items-center justify-center p-4 sm:p-8 md:p-12 overflow-hidden">
        
        {/* Constellation Canvas Container */}
        <div
          ref={constellationRef}
          className="relative w-full max-w-6xl h-[820px] sm:h-[860px] md:h-[900px] rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-950/40 backdrop-blur-md overflow-hidden flex items-center justify-center"
        >
          {/* Subtle Constellation Grid Background */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-15"
            style={{
              backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Ambient Celestial Glows */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-purple-500/10 via-amber-500/5 to-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

          {/* SVG Connection Network Lines (Desktop/Tablet Constellation) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            {/* 1. Lines from KAVIN (50%, 50%) to each Domain Node */}
            {DOMAINS.map((domain) => {
              const isDomainActive = hoveredDomain === domain.key;
              return (
                <g key={`kavin-line-${domain.key}`}>
                  <line
                    x1={`${centerPos.x}%`}
                    y1={`${centerPos.y}%`}
                    x2={`${domain.pos.x}%`}
                    y2={`${domain.pos.y}%`}
                    stroke={isDomainActive ? domain.accentColor : 'currentColor'}
                    strokeWidth={isDomainActive ? 2 : 1}
                    strokeDasharray={isDomainActive ? 'none' : '4 4'}
                    className={`transition-all duration-300 ${
                      isDomainActive
                        ? 'opacity-80'
                        : hoveredDomain
                        ? 'opacity-10 text-zinc-400 dark:text-zinc-700'
                        : 'opacity-30 text-zinc-400 dark:text-zinc-600'
                    }`}
                  />
                  {/* Glowing Node Pulse on active line */}
                  {isDomainActive && (
                    <circle
                      cx={`${(centerPos.x + domain.pos.x) / 2}%`}
                      cy={`${(centerPos.y + domain.pos.y) / 2}%`}
                      r={3}
                      fill={domain.accentColor}
                      className="animate-ping"
                    />
                  )}
                </g>
              );
            })}

            {/* 2. Cross-domain Interconnect Lines showing multidisciplinary overlaps */}
            {/* Management <-> Software */}
            <line
              x1="20%"
              y1="35%"
              x2="80%"
              y2="35%"
              stroke="currentColor"
              strokeWidth={0.75}
              strokeDasharray="3 6"
              className="opacity-15 text-zinc-400 dark:text-zinc-600"
            />
            {/* AI <-> Data */}
            <line
              x1="50%"
              y1="15%"
              x2="25%"
              y2="78%"
              stroke="currentColor"
              strokeWidth={0.75}
              strokeDasharray="3 6"
              className="opacity-15 text-zinc-400 dark:text-zinc-600"
            />
            {/* AI <-> HR */}
            <line
              x1="50%"
              y1="15%"
              x2="75%"
              y2="78%"
              stroke="currentColor"
              strokeWidth={0.75}
              strokeDasharray="3 6"
              className="opacity-15 text-zinc-400 dark:text-zinc-600"
            />
            {/* Data <-> HR */}
            <line
              x1="25%"
              y1="78%"
              x2="75%"
              y2="78%"
              stroke="currentColor"
              strokeWidth={0.75}
              strokeDasharray="3 6"
              className="opacity-15 text-zinc-400 dark:text-zinc-600"
            />

            {/* 3. Lines from Domain Nodes to their Connected Project Nodes */}
            {PROJECTS.map((project) => {
              const parentDomain = DOMAINS.find((d) => d.key === project.domainKey);
              if (!parentDomain) return null;
              const isProjHovered = hoveredProject?.id === project.id;
              const isParentDomainHovered = hoveredDomain === project.domainKey;

              return (
                <g key={`proj-line-${project.id}`}>
                  <line
                    x1={`${parentDomain.pos.x}%`}
                    y1={`${parentDomain.pos.y}%`}
                    x2={`${project.nodePos.x}%`}
                    y2={`${project.nodePos.y}%`}
                    stroke={isProjHovered || isParentDomainHovered ? parentDomain.accentColor : 'currentColor'}
                    strokeWidth={isProjHovered ? 2 : 1}
                    className={`transition-all duration-300 ${
                      isProjHovered || isParentDomainHovered
                        ? 'opacity-90'
                        : hoveredDomain || hoveredProject
                        ? 'opacity-10 text-zinc-400 dark:text-zinc-700'
                        : 'opacity-25 text-zinc-400 dark:text-zinc-600'
                    }`}
                  />
                  {/* Secondary Domain Multi-Disciplinary Link Lines */}
                  {project.secondaryDomains?.map((secKey) => {
                    const secDomain = DOMAINS.find((d) => d.key === secKey);
                    if (!secDomain) return null;
                    return (
                      <line
                        key={`sec-line-${project.id}-${secKey}`}
                        x1={`${secDomain.pos.x}%`}
                        y1={`${secDomain.pos.y}%`}
                        x2={`${project.nodePos.x}%`}
                        y2={`${project.nodePos.y}%`}
                        stroke={secDomain.accentColor}
                        strokeWidth={0.75}
                        strokeDasharray="2 4"
                        className={`transition-all duration-300 ${
                          isProjHovered ? 'opacity-70' : 'opacity-15'
                        }`}
                      />
                    );
                  })}
                </g>
              );
            })}
          </svg>

          {/* ================================================================= */}
          {/* CENTRAL NODE: KAVIN */}
          {/* ================================================================= */}
          <motion.div
            style={{ left: `${centerPos.x}%`, top: `${centerPos.y}%` }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center cursor-pointer group select-none"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => soundFx.playConfirm()}
          >
            {/* Luminous Center Breathing Rings */}
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -inset-4 rounded-full bg-gradient-to-tr from-purple-500/20 via-pink-500/20 to-cyan-500/20 blur-md pointer-events-none"
            />
            
            {/* Main Central Core Badge */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white dark:bg-[#12111A] border-2 border-zinc-950 dark:border-white shadow-2xl flex flex-col items-center justify-center p-2 text-center group-hover:border-purple-600 transition-colors duration-300">
              <span className="text-xs font-mono font-bold tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
                CORE
              </span>
              <span className="text-xl sm:text-2xl font-black text-zinc-950 dark:text-white tracking-tighter uppercase font-sans">
                KAVIN
              </span>
              <span className="text-[9px] font-mono text-purple-600 dark:text-purple-400 font-bold uppercase tracking-tight">
                Nexus
              </span>
            </div>
          </motion.div>

          {/* ================================================================= */}
          {/* 5 MAJOR DOMAIN NODES */}
          {/* ================================================================= */}
          {DOMAINS.map((domain) => {
            const isHovered = hoveredDomain === domain.key;
            const isDimmed = hoveredDomain !== null && !isHovered;
            const Icon = domain.icon;

            return (
              <motion.div
                key={domain.key}
                style={{ left: `${domain.pos.x}%`, top: `${domain.pos.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 transition-opacity duration-300 ${
                  isDimmed ? 'opacity-30' : 'opacity-100'
                }`}
                onMouseEnter={() => {
                  setHoveredDomain(domain.key);
                  soundFx.playSelect();
                }}
                onMouseLeave={() => setHoveredDomain(null)}
              >
                {/* Domain Node Card Object */}
                <motion.div
                  animate={
                    isHovered
                      ? { scale: 1.08, y: -4 }
                      : { scale: 1, y: 0 }
                  }
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className={`flex flex-col items-center text-center p-3.5 sm:p-4 rounded-2xl bg-white/90 dark:bg-zinc-900/90 border backdrop-blur-md shadow-lg cursor-pointer transition-all duration-300 max-w-[210px] sm:max-w-[240px] ${
                    isHovered
                      ? 'border-purple-500 shadow-xl shadow-purple-500/10 ring-2 ring-purple-500/20'
                      : 'border-zinc-200 dark:border-zinc-800'
                  }`}
                >
                  {/* Top Row: Icon + Project Count Badge */}
                  <div className="flex items-center justify-between w-full gap-2 mb-1.5">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: domain.accentColor }}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono font-bold tracking-wider text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-full">
                      {domain.projectCount}
                    </span>
                  </div>

                  {/* Domain Title */}
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-950 dark:text-white tracking-tight uppercase leading-tight font-sans">
                    {domain.title}
                  </h4>

                  {/* Tech Summary Subtitle */}
                  <p className="text-[10px] sm:text-[11px] text-zinc-500 dark:text-zinc-400 font-mono mt-1 line-clamp-1">
                    {domain.techSummary}
                  </p>
                </motion.div>
              </motion.div>
            );
          })}

          {/* ================================================================= */}
          {/* PROJECT NODES CONNECTED TO DOMAINS */}
          {/* ================================================================= */}
          {PROJECTS.map((project) => {
            const isHovered = hoveredProject?.id === project.id;
            const isDomainParentHovered = hoveredDomain === project.domainKey;
            const isDimmed = (hoveredDomain !== null && !isDomainParentHovered) || (hoveredProject !== null && !isHovered);

            return (
              <div
                key={project.id}
                style={{ left: `${project.nodePos.x}%`, top: `${project.nodePos.y}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 z-30 transition-opacity duration-300 ${
                  isDimmed ? 'opacity-35' : 'opacity-100'
                }`}
              >
                {/* Project Node Trigger Button / Pill */}
                <motion.div
                  className="relative"
                  onMouseEnter={() => {
                    setHoveredProject(project);
                    soundFx.playSelect();
                  }}
                  onMouseLeave={() => setHoveredProject(null)}
                  onClick={() => handleSelectProject(project)}
                >
                  <motion.button
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 border text-xs font-sans font-bold shadow-md cursor-pointer transition-all duration-200 whitespace-nowrap ${
                      isHovered || isDomainParentHovered
                        ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 shadow-purple-500/20 shadow-lg scale-105'
                        : 'border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                    <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 font-normal">
                      {project.number}
                    </span>
                    <span className="text-[11px] font-bold tracking-tight">
                      {project.title}
                    </span>
                  </motion.button>

                  {/* Compact Spring-Animated Hover Preview Emerging from Node */}
                  <AnimatePresence>
                    {isHovered && !selectedProject && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.85, y: 5 }}
                        transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 w-64 sm:w-72 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-purple-500/40 shadow-2xl backdrop-blur-xl pointer-events-auto select-none"
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">
                            {project.domainLabel}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-400">
                            {project.number}
                          </span>
                        </div>

                        <h5 className="text-sm font-bold text-zinc-950 dark:text-white font-sans leading-tight mb-1">
                          {project.title}
                        </h5>

                        <div className="flex flex-wrap gap-1 my-2">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <span
                              key={tech}
                              className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-[10px] font-mono"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>

                        <p className="text-[11px] text-zinc-600 dark:text-zinc-400 font-sans line-clamp-2 leading-relaxed mb-3">
                          {project.summary}
                        </p>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleSelectProject(project);
                          }}
                          className="w-full py-1.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold font-sans flex items-center justify-center gap-1.5 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm cursor-pointer"
                        >
                          <span>[ EXPLORE ]</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}

          {/* ================================================================= */}
          {/* FOCUSED PROJECT DETAIL VIEW (Transforming Constellation into focus) */}
          {/* ================================================================= */}
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-4 sm:inset-6 z-40 rounded-2xl bg-white/95 dark:bg-[#0C0B12]/95 backdrop-blur-2xl border border-zinc-300/80 dark:border-zinc-700/80 p-6 sm:p-8 md:p-10 flex flex-col justify-between overflow-y-auto shadow-2xl"
              >
                {/* Header Bar with Return to Universe button */}
                <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4 mb-6">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-mono font-bold">
                      PROJECT {selectedProject.number}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">
                      &bull; {selectedProject.domainLabel}
                    </span>
                  </div>

                  <button
                    onClick={handleBackToUniverse}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-all cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                    <span>BACK TO UNIVERSE</span>
                  </button>
                </div>

                {/* Main 2-Column Focused Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center flex-1 my-auto">
                  {/* Left Column: Project Image Preview */}
                  <div className="lg:col-span-6 relative h-64 sm:h-80 md:h-96 w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 shadow-lg">
                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
                        {selectedProject.role}
                      </span>
                      <h3 className="text-2xl font-bold text-white tracking-tight">
                        {selectedProject.title}
                      </h3>
                    </div>
                  </div>

                  {/* Right Column: Problem, Approach, Result Breakdown */}
                  <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-4">
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-black text-zinc-950 dark:text-white uppercase tracking-tight font-sans mb-3">
                        {selectedProject.title}
                      </h3>

                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {selectedProject.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-mono font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Problem, Approach, Result Blocks */}
                      <div className="space-y-3 text-xs sm:text-sm">
                        <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60">
                          <span className="text-[10px] font-mono font-bold text-rose-500 uppercase tracking-wider block mb-1">
                            THE PROBLEM
                          </span>
                          <p className="text-zinc-700 dark:text-zinc-300 font-normal leading-relaxed">
                            {selectedProject.problem}
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60">
                          <span className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-wider block mb-1">
                            APPROACH &amp; ARCHITECTURE
                          </span>
                          <p className="text-zinc-700 dark:text-zinc-300 font-normal leading-relaxed">
                            {selectedProject.approach}
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60">
                          <span className="text-[10px] font-mono font-bold text-emerald-500 uppercase tracking-wider block mb-1">
                            MEASURABLE RESULT
                          </span>
                          <p className="text-zinc-700 dark:text-zinc-300 font-normal leading-relaxed">
                            {selectedProject.result}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="pt-4 flex items-center justify-between gap-4">
                      <div className="text-xs font-mono text-zinc-500">
                        Role: <span className="text-zinc-800 dark:text-zinc-200 font-bold">{selectedProject.role}</span>
                      </div>

                      <button
                        onClick={handleOpenCaseStudy}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all shadow-md hover:scale-105 cursor-pointer active:scale-95"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                        <span>VIEW FULL CASE STUDY</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CASE STUDY EXPANDED MODAL (6-STAGE DEEP DIVE) */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {caseStudyOpen && selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-[#0E0D16] border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 overflow-y-auto shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => setCaseStudyOpen(false)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 flex items-center justify-center cursor-pointer transition-colors"
                aria-label="Close Case Study"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Case Study Header */}
              <div className="mb-8">
                <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-xs font-mono font-bold uppercase tracking-wider">
                  CASE STUDY &bull; {selectedProject.domainLabel}
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-950 dark:text-white uppercase tracking-tight font-sans mt-3">
                  {selectedProject.title}
                </h2>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                  Architected &amp; Delivered by <strong className="text-zinc-900 dark:text-white">Kavin</strong> ({selectedProject.role})
                </p>
              </div>

              {/* Metrics Spotlight Row */}
              <div className="grid grid-cols-3 gap-3 p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 mb-8 text-center">
                {selectedProject.caseStudy.metrics.map((m, idx) => (
                  <div key={idx} className="flex flex-col">
                    <span className="text-lg sm:text-xl font-black text-purple-600 dark:text-purple-400 font-mono">
                      {m.value}
                    </span>
                    <span className="text-xs text-zinc-500 font-sans tracking-tight">
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* 6-Stage Narrative Breakdown */}
              <div className="space-y-6">
                {/* 01 PROBLEM */}
                <div className="border-l-2 border-rose-500 pl-4">
                  <span className="text-xs font-mono font-bold text-rose-500 uppercase tracking-widest block mb-1">
                    01 — THE PROBLEM
                  </span>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                    {selectedProject.caseStudy.problemDetails}
                  </p>
                </div>

                {/* 02 APPROACH */}
                <div className="border-l-2 border-amber-500 pl-4">
                  <span className="text-xs font-mono font-bold text-amber-500 uppercase tracking-widest block mb-1">
                    02 — THE STRATEGIC APPROACH
                  </span>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                    {selectedProject.caseStudy.approachDetails}
                  </p>
                </div>

                {/* 03 TECHNOLOGY */}
                <div className="border-l-2 border-blue-500 pl-4">
                  <span className="text-xs font-mono font-bold text-blue-500 uppercase tracking-widest block mb-1">
                    03 — THE TECHNOLOGY STACK
                  </span>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                    {selectedProject.caseStudy.techDetails}
                  </p>
                </div>

                {/* 04 THE BUILD */}
                <div className="border-l-2 border-purple-500 pl-4">
                  <span className="text-xs font-mono font-bold text-purple-500 uppercase tracking-widest block mb-1">
                    04 — THE BUILD &amp; IMPLEMENTATION
                  </span>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                    {selectedProject.caseStudy.buildDetails}
                  </p>
                </div>

                {/* 05 THE RESULT */}
                <div className="border-l-2 border-emerald-500 pl-4">
                  <span className="text-xs font-mono font-bold text-emerald-500 uppercase tracking-widest block mb-1">
                    05 — MEASURABLE IMPACT
                  </span>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                    {selectedProject.caseStudy.resultDetails}
                  </p>
                </div>

                {/* 06 WHAT I LEARNED */}
                <div className="border-l-2 border-cyan-500 pl-4">
                  <span className="text-xs font-mono font-bold text-cyan-500 uppercase tracking-widest block mb-1">
                    06 — WHAT I LEARNED
                  </span>
                  <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                    {selectedProject.caseStudy.learnings}
                  </p>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex justify-end">
                <button
                  onClick={() => setCaseStudyOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all cursor-pointer"
                >
                  Close Case Study
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 4. FINAL KPI CONTROL ROOM ("WHAT THE WORK REVEALS") */}
      {/* ========================================================================= */}
      <div className="relative w-full py-16 sm:py-24 px-6 sm:px-10 md:px-16 lg:px-24 bg-[#F5F4F0] dark:bg-[#0A0910] border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="max-w-6xl mx-auto">
          
          {/* Section Header */}
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest block mb-2">
              ANALYTICAL TELEMETRY
            </span>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-950 dark:text-white uppercase tracking-tight font-sans">
              WHAT THE WORK REVEALS.
            </h3>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-2 font-normal leading-relaxed">
              Empirical project evidence across high-concurrency systems, predictive data analytics, and operational orchestration.
            </p>
          </div>

          {/* KPI High-Level Telemetry Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12">
            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <span className="text-3xl sm:text-4xl font-black text-purple-600 dark:text-purple-400 font-mono block">
                18+
              </span>
              <span className="text-xs font-bold text-zinc-900 dark:text-white font-sans uppercase tracking-tight mt-1 block">
                Total Projects Built
              </span>
              <span className="text-[11px] text-zinc-500 font-sans">
                Production &amp; Research
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <span className="text-3xl sm:text-4xl font-black text-blue-600 dark:text-blue-400 font-mono block">
                05
              </span>
              <span className="text-xs font-bold text-zinc-900 dark:text-white font-sans uppercase tracking-tight mt-1 block">
                Domains Mastered
              </span>
              <span className="text-[11px] text-zinc-500 font-sans">
                Cross-Disciplinary
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <span className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 font-mono block">
                24+
              </span>
              <span className="text-xs font-bold text-zinc-900 dark:text-white font-sans uppercase tracking-tight mt-1 block">
                Technologies Used
              </span>
              <span className="text-[11px] text-zinc-500 font-sans">
                Cloud, AI &amp; Full-Stack
              </span>
            </div>

            <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <span className="text-3xl sm:text-4xl font-black text-amber-600 dark:text-amber-400 font-mono block">
                99.9%
              </span>
              <span className="text-xs font-bold text-zinc-900 dark:text-white font-sans uppercase tracking-tight mt-1 block">
                Reliability &amp; Delivery
              </span>
              <span className="text-[11px] text-zinc-500 font-sans">
                Sprint Track Record
              </span>
            </div>
          </div>

          {/* Domain Project Exposure Breakdown (Based on Actual Documented Projects) */}
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-md">
            <h4 className="text-base font-bold text-zinc-950 dark:text-white uppercase tracking-tight font-sans mb-6 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-purple-600" />
              <span>Documented Domain Exposure Breakdown</span>
            </h4>

            <div className="space-y-4">
              {/* Data Analytics */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">DATA ANALYTICS &bull; 4 Documented Systems</span>
                  <span className="text-purple-600 dark:text-purple-400 font-bold">SQL, Power BI, Python, Tableau</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full w-[85%]" />
                </div>
              </div>

              {/* AI / Machine Learning */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">AI / MACHINE LEARNING &bull; 4 Computer Vision &amp; Deep Learning Engines</span>
                  <span className="text-purple-600 dark:text-purple-400 font-bold">PyTorch, OpenCV, CNN, NLP</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-violet-500 to-cyan-500 rounded-full w-[80%]" />
                </div>
              </div>

              {/* Software Development */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">SOFTWARE DEVELOPMENT &bull; 3 Cloud &amp; High-Concurrency Platforms</span>
                  <span className="text-purple-600 dark:text-purple-400 font-bold">Next.js, TypeScript, Node.js, AWS</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full w-[75%]" />
                </div>
              </div>

              {/* Project Management */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">PROJECT MANAGEMENT &bull; 5 Agile Squad Governance Deployments</span>
                  <span className="text-purple-600 dark:text-purple-400 font-bold">Jira, Scrum, SDLC, Risk Matrix</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full w-[90%]" />
                </div>
              </div>

              {/* HR / People Technology */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="font-bold text-zinc-800 dark:text-zinc-200">HR / PEOPLE TECHNOLOGY &bull; 2 Retention &amp; Analytics Frameworks</span>
                  <span className="text-purple-600 dark:text-purple-400 font-bold">People Analytics, Retention ML</span>
                </div>
                <div className="w-full h-2.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full w-[65%]" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
};

export default ProjectUniverseSection;
