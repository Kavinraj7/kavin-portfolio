export type PerspectiveKey = 'admin' | 'hr' | 'software' | 'data' | 'holistic';

export type MainNavView = 'hero' | 'dossier' | 'systems' | 'writing' | 'biography';

export interface PerspectiveItem {
  id: string;
  key: PerspectiveKey;
  title: string;
  subtitle: string;
  speechMain: string;
  speechSub: string;
  badge?: string;
  iconName: string;
  accentColor: string;
  summary: string;
  highlights: string[];
  metrics: { label: string; value: string; detail?: string }[];
  caseStudies: {
    title: string;
    domain: string;
    impact: string;
    description: string;
    technologiesOrFrameworks: string[];
  }[];
  philosophies: string[];
}

export interface TerminalMessage {
  id: string;
  sender: 'system' | 'user' | 'ai';
  text: string;
  timestamp: string;
  actionHint?: string;
}
