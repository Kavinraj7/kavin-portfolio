import { PerspectiveItem } from '../types';

export const PERSPECTIVES_DATA: PerspectiveItem[] = [
  {
    id: '01',
    key: 'admin',
    title: 'Administration Manager',
    subtitle: 'Leadership, planning, operations & execution',
    speechMain: 'Exploring executive cadence, operational rigor, and cross-functional leadership.',
    speechSub: 'Focusing on resource governance, P&L architecture, and high-velocity strategy.',
    iconName: 'Building2',
    accentColor: 'indigo',
    summary:
      'Orchestrating multi-disciplinary engineering, product, and operations divisions. Specializing in high-stakes execution, multi-million dollar capital allocation, and zero-defect organizational cadence.',
    highlights: [
      'Directed cross-functional divisions scaling from 8 to 65+ headcount across 3 geographic hubs',
      'Established Quarterly OKR architecture and continuous alignment cycles delivering 94% target attainment',
      'Architected operational governance frameworks reducing inter-team blocker resolution time from 4 days to 4 hours',
      'Engineered capital allocation models balancing infrastructure amortization against aggressive R&D investments'
    ],
    metrics: [
      { label: 'Budget Managed', value: '$18.4M', detail: 'P&L stewardship across tech & ops' },
      { label: 'Delivery Velocity', value: '+62%', detail: 'Cycle time compression year-over-year' },
      { label: 'Retention Rate', value: '96.2%', detail: 'Across lead and senior staff levels' },
      { label: 'Vendor Cost Optimization', value: '$2.1M', detail: 'Annualized recurring savings' }
    ],
    caseStudies: [
      {
        title: 'Global Platform Consolidation & Governance',
        domain: 'Enterprise Operations',
        impact: 'Unified 4 disparate departmental toolchains into single unified operating model',
        description:
          'Led the operational overhaul of redundant legacy contracts, consolidated tracking systems, and authored global compliance SLAs for cross-border engineering delivery.',
        technologiesOrFrameworks: ['OKR Frameworks', 'P&L Modeling', 'Vendor Governance', 'Risk Registers']
      },
      {
        title: 'Crisis Cadence & Rapid Turnaround',
        domain: 'Strategic Leadership',
        impact: 'Rescued critical Q3 mission-critical launch with zero customer-facing downtime',
        description:
          'Assumed interim command over a slipping core release. Restructured standups, pruned non-critical dependencies, and mobilized 24/7 tiger teams to hit deadline 3 days early.',
        technologiesOrFrameworks: ['Critical Path Analysis', 'Tiger Team Protocols', 'Stakeholder Comms']
      }
    ],
    philosophies: [
      'Speed is a habit, but direction is destiny: cadence without clarity is mere friction.',
      'Protect the makers from organizational static; amplify the signals they need to ship.',
      'Rigorous transparency produces accountability without bureaucratic overhead.'
    ]
  },
  {
    id: '02',
    key: 'hr',
    title: 'Human Resource Manager',
    subtitle: 'People, coordination & organizational thinking',
    speechMain: 'Delving into organizational design, talent empathy, and people architecture.',
    speechSub: 'Evaluating cultural scalability, retention systems, and high-trust performance health.',
    iconName: 'Users',
    accentColor: 'emerald',
    summary:
      'Engineering cultural resilience, high-conviction hiring bars, and human-centric feedback loops. Bridging technical engineering reality with deep emotional intelligence and career mobility pathways.',
    highlights: [
      'Authored engineering leveling matrices and transparent compensation bands adopted company-wide',
      'Pioneered 360-degree continuous peer retrospectives replacing archaic annual reviews',
      'Achieved 0% regrettable attrition across mission-critical technical leads over a 24-month horizon',
      'Instituted inclusive mentorship initiatives yielding a 40% increase in internal promotions'
    ],
    metrics: [
      { label: 'Regrettable Attrition', value: '1.4%', detail: 'Benchmark industry average: 13.8%' },
      { label: 'Offer Acceptance', value: '89%', detail: 'On top-tier engineering talent' },
      { label: 'Time-to-Productivity', value: '18 Days', detail: 'Down from 45 days through modernized onboarding' },
      { label: 'Team eNPS', value: '+74', detail: 'Consistently sustained over 8 quarters' }
    ],
    caseStudies: [
      {
        title: 'Bespoke Engineering Apprenticeship & Fast-Track',
        domain: 'Talent Acquisition & Development',
        impact: 'Sourced and trained 18 high-potential engineers with 100% full-time conversion',
        description:
          'Constructed an immersive 12-week internal academy pairing junior talent directly with senior staff on production pull requests, cutting external recruiting spend drastically.',
        technologiesOrFrameworks: ['Competency Mapping', 'Cohort Mentorship', 'Psychological Safety Surveys']
      },
      {
        title: 'Distributed Remote Culture & Asynchronous Rituals',
        domain: 'Organizational Design',
        impact: 'Maintained cultural cohesion across 7 time zones without meeting fatigue',
        description:
          'Eliminated status check meetings in favor of asynchronous written artifacts, establishing core collaboration windows and quarterly in-person hack retreats.',
        technologiesOrFrameworks: ['Async First Workflows', 'Cultural Playbooks', 'Pulse Health Telemetry']
      }
    ],
    philosophies: [
      'High standards and deep empathy are not opposing forces; they are multiplicative.',
      'People don’t burn out from hard problems; they burn out from meaningless friction and broken trust.',
      'Great hiring is about finding exceptional spikes, not rounding off all edges.'
    ]
  },
  {
    id: '03',
    key: 'software',
    title: 'Software Developer',
    subtitle: 'Building systems, applications & technical solutions',
    speechMain: 'So you want to see the builder side of me? Compiling full-stack architecture.',
    speechSub: 'Zero-latency interfaces, reactive event buses, and resilient codebases.',
    iconName: 'Code2',
    accentColor: 'blue',
    summary:
      'Hands-on architectural craftsmanship spanning distributed microservices, low-latency UI frameworks, edge compute, and type-safe systems. Obsessed with performance, minimalism, and developer ergonomics.',
    highlights: [
      'Engineered real-time reactive engines handling 120k+ WebSocket concurrent sessions with sub-20ms latency',
      'Designed modular frontend micro-frontends and state machines using modern TypeScript & React',
      'Spearheaded transition to containerized Cloud Run / Kubernetes architectures with automated GitOps CI/CD',
      'Zero-defect mindset: comprehensive automated end-to-end testing with 92% production code coverage'
    ],
    metrics: [
      { label: 'Avg API Latency (p99)', value: '< 24ms', detail: 'Globally distributed edge endpoints' },
      { label: 'System Availability', value: '99.99%', detail: 'Exceeding SLA requirements across 3 years' },
      { label: 'Deploy Frequency', value: '14 / day', detail: 'Fully automated zero-downtime rollouts' },
      { label: 'Lighthouse Score', value: '99/100', detail: 'Performance, Accessibility & SEO' }
    ],
    caseStudies: [
      {
        title: 'Ultra-Low Latency Telemetry Engine',
        domain: 'Distributed Systems',
        impact: 'Processed 45,000 events/sec with under 15ms end-to-end ingestion latency',
        description:
          'Designed an in-memory streaming pipeline utilizing Rust edge nodes, Redis streams, and typed WebSocket broadcast channels to deliver instantaneous financial dashboards.',
        technologiesOrFrameworks: ['TypeScript', 'Rust', 'Node.js', 'Redis Streams', 'Docker', 'WebSockets']
      },
      {
        title: 'Design System & Component Framework',
        domain: 'Frontend Engineering',
        impact: 'Used by 24 engineering squads, reducing design-to-production turnaround by 70%',
        description:
          'Architected an accessible, themeable design system featuring mathematical typography scales, fluid animations, and zero-runtime CSS-in-JS overhead.',
        technologiesOrFrameworks: ['React', 'Tailwind CSS', 'Motion', 'Radix UI', 'Vite', 'Storybook']
      }
    ],
    philosophies: [
      'Simple code that is easy to delete is vastly superior to clever code that is impossible to maintain.',
      'Performance is not an optimization phase; it is an architectural foundation.',
      'Typing is thinking: rigorous types catch tomorrow’s outages at compile time.'
    ]
  },
  {
    id: '04',
    key: 'data',
    title: 'Data Analyst',
    subtitle: 'Turning data into insights & decisions',
    speechMain: 'Let’s explore how I turn raw signal and telemetry into high-conviction decisions.',
    speechSub: 'Statistical modeling, behavioral analytics, and predictive intelligence pipelines.',
    iconName: 'BarChart3',
    accentColor: 'amber',
    summary:
      'Transforming murky telemetry, transactional databases, and user behavior into sharp predictive models, cohort analyses, and actionable executive dashboards that guide multi-million dollar decisions.',
    highlights: [
      'Built automated churn prediction model surfacing leading indicators 30 days prior to contract cancellation',
      'Architected central data mart linking marketing attribution, product analytics, and customer support tickets',
      'Pioneered experimentation framework executing 80+ simultaneous A/B variants with Bayesian confidence intervals',
      'Eliminated manual executive reporting by engineering real-time executive cockpit displays'
    ],
    metrics: [
      { label: 'Attributed ARR Lift', value: '+$4.8M', detail: 'Through data-driven pricing & cohort optimization' },
      { label: 'Query Speedup', value: '14x', detail: 'Partitioning & columnar query re-indexing' },
      { label: 'Daily Data Volume', value: '3.2 TB', detail: 'Cleaned, normalized, and modeled automatically' },
      { label: 'Experiment Confidence', value: '98%', detail: 'Strict Bayesian testing guardrails' }
    ],
    caseStudies: [
      {
        title: 'Predictive Lifecycle & Churn Prevention Engine',
        domain: 'Machine Learning & Analytics',
        impact: 'Rescued $2.4M in potential contract churn within first 6 months of live deployment',
        description:
          'Trained gradient-boosted decision trees on 120 behavioral feature vectors. Hooked inferences directly into customer success workflows via automated webhooks.',
        technologiesOrFrameworks: ['Python', 'SQL', 'BigQuery', 'dbt', 'Scikit-Learn', 'Metabase']
      },
      {
        title: 'Product Funnel & Cohort Exploration Sandbox',
        domain: 'Behavioral Telemetry',
        impact: 'Uncovered 34% dropoff in onboarding flow, driving immediate 18% conversion recovery',
        description:
          'Instrumented client-side interaction events with differential privacy, normalizing high-frequency events into granular user journey maps and retention heatmaps.',
        technologiesOrFrameworks: ['PostHog', 'Snowflake', 'dbt', 'Tableau', 'R Statistical Library']
      }
    ],
    philosophies: [
      'Data does not speak for itself; it whispers clues that require rigorous contextual understanding.',
      'Beware of metric vanity: optimize for retention and enduring value over transient engagement spikes.',
      'A dashboard nobody acts upon is just aesthetic clutter.'
    ]
  },
  {
    id: '05',
    key: 'holistic',
    title: 'My Complete Story',
    subtitle: 'Explore every side of Kavin',
    speechMain: 'Good choice. Let’s start from the beginning — the holistic journey.',
    speechSub: 'Synthesizing tech, people, and execution into one unified path.',
    badge: 'ALL-IN-ONE',
    iconName: 'Sparkles',
    accentColor: 'purple',
    summary:
      'The intersection of engineering discipline, people leadership, operational rigor, and data-informed decision making. Built for organizations where technical depth meets strategic vision.',
    highlights: [
      'Decade-long career progression from hands-on software engineer to technical operations and product leader',
      'Rare dual-proficiency: capable of architecting deep distributed systems and presenting board-level P&L strategies',
      'Champion of high-craft software: blending Swiss editorial visual elegance with bulletproof backend resiliency',
      'Passionate mentor who has elevated dozens of individual contributors into technical leads and directors'
    ],
    metrics: [
      { label: 'Total Career Impact', value: '$42M+', detail: 'In direct pipeline and operational efficiency' },
      { label: 'Global Teams Scaled', value: '45+', detail: 'Engineers, analysts & designers' },
      { label: 'Systems Deployed', value: '38+', detail: 'Production architectures shipped' },
      { label: 'Years of Craft', value: '8+ Yrs', detail: 'Continuous evolution & technical mastery' }
    ],
    caseStudies: [
      {
        title: 'Enterprise Turnaround: From Monolith to Modern Cloud',
        domain: 'End-to-End Leadership',
        impact: 'Rebuilt core platform, restructured 4 teams, and scaled revenue 3.2x over 18 months',
        description:
          'Acted as principal architect and operations lead, migrating legacy architecture to modern event-driven serverless while overhauling engineering hiring and cultural rituals.',
        technologiesOrFrameworks: ['Next.js', 'TypeScript', 'GCP', 'PostgreSQL', 'Microservices', 'Executive Leadership']
      },
      {
        title: 'Bespoke AI Strategy & Operational Integration',
        domain: 'Emerging Tech & Automation',
        impact: 'Automated 60% of tier-1 support tasks, saving 1,200 engineering hours quarterly',
        description:
          'Designed agentic workflows connecting internal knowledge bases with fine-tuned LLMs, embedding guardrails and zero-leakage security protocols.',
        technologiesOrFrameworks: ['Gemini API', 'Vector Embeddings', 'Python', 'Retrieval Pipelines', 'Agent Frameworks']
      }
    ],
    philosophies: [
      'Craft is caring about the details that most people will never see, but everyone will feel.',
      'The best leaders build systems that eventually run better without them.',
      'Integrity in engineering means doing the right thing when the compiler is silent.'
    ]
  }
];

export const SYSTEMS_OVERVIEW = [
  {
    name: 'Unified Core OS',
    tag: 'ARCHITECTURE',
    status: 'ACTIVE // OPTIMAL',
    desc: 'Distributed microservice fabric orchestrating client interfaces, real-time event streaming, and cloud data marts with sub-50ms roundtrips.',
    specs: ['99.99% Availability', 'Global CDN Edge', 'Zero Trust IAM', 'Multi-Region Failover']
  },
  {
    name: 'Neural Agentic Bridge',
    tag: 'AI ENGINE',
    status: 'READY // V2.4',
    desc: 'Self-governing context engine processing incoming queries, grounding responses with internal documentation, and streaming structured actions.',
    specs: ['Streaming RPC', 'Context Compression', 'Vector Grounding', 'Guardrail Auditing']
  },
  {
    name: 'Radical Monolith Design System',
    tag: 'INTERFACE',
    status: 'EXPANDED',
    desc: 'Strict Swiss typographical grid, mathematical step scales (1.25 ratio), high-contrast monochromatic gamut, and tactile audio feedback.',
    specs: ['WCAG AA AA+ Compliance', 'Pill Radii Geometries', 'Hairline Boundaries', 'Zero Runtime Overhead']
  }
];

export const WRITING_ARTICLES = [
  {
    title: 'The Architecture of Velocity: Why Speed is an Organizational Trait',
    date: 'February 2025',
    readTime: '6 min read',
    tags: ['LEADERSHIP', 'SYSTEMS'],
    excerpt:
      'Engineering velocity is rarely constrained by how fast individual developers type code. It is throttled by cognitive load, ambiguous specifications, and asynchronous fear.'
  },
  {
    title: 'Against Premature Abstraction: The Power of Duplication in Early Code',
    date: 'December 2024',
    readTime: '9 min read',
    tags: ['SOFTWARE', 'CLEAN CODE'],
    excerpt:
      'Duplication is far cheaper than the wrong abstraction. A reflection on designing modular software systems that adapt gracefully to evolving business realities.'
  },
  {
    title: 'The Modern Recruiter’s Dilemma: Finding the Multi-Disciplinary Generalist',
    date: 'October 2024',
    readTime: '5 min read',
    tags: ['TALENT', 'CAREER'],
    excerpt:
      'In an era where AI lowers the barrier to entry across every domain, the highest leverage belongs to individuals who can synthesize deep engineering with business empathy.'
  }
];

export const BIOGRAPHY_MILESTONES = [
  {
    period: '2023 — Present',
    role: 'Principal Technologist & Systems Architect',
    organization: 'High-Growth Tech Ecosystems',
    description:
      'Leading platform engineering, enterprise operations, and bespoke AI application development. Advising early-stage founders on team topology and architectural scale.'
  },
  {
    period: '2020 — 2023',
    role: 'Head of Engineering & Technical Operations',
    organization: 'Venture-Backed Cloud Solutions',
    description:
      'Grew engineering organization from 12 to 50+ members. Drove architectural evolution from legacy monolith to cloud-native microservices while maintaining 99.99% uptime.'
  },
  {
    period: '2017 — 2020',
    role: 'Senior Full-Stack & Distributed Systems Engineer',
    organization: 'FinTech & Real-Time Data Labs',
    description:
      'Engineered high-frequency messaging pipelines, interactive data visualization workspaces, and fault-tolerant financial settlement services.'
  }
];
