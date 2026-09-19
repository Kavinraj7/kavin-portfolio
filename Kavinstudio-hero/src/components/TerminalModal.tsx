import React, { useState, useEffect, useRef } from 'react';
import { X, Terminal as TerminalIcon, Send, Sparkles, CornerDownLeft } from 'lucide-react';
import { TerminalMessage } from '../types';
import { soundFx } from '../utils/audio';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPerspective?: (key: string) => void;
}

export const TerminalModal: React.FC<TerminalModalProps> = ({
  isOpen,
  onClose,
  onSelectPerspective
}) => {
  const [messages, setMessages] = useState<TerminalMessage[]>([
    {
      id: '1',
      sender: 'system',
      text: 'Initializing neural link to Kavin Portfolio v2.4...',
      timestamp: '00:00:01'
    },
    {
      id: '2',
      sender: 'system',
      text: 'Context injected: 5 distinct functional archetypes loaded (Admin, HR, Software, Data, Holistic).',
      timestamp: '00:00:02'
    },
    {
      id: '3',
      sender: 'ai',
      text: 'Greetings. I am Kavin AI — an interactive persona trained on Kavin’s actual architectural decisions, leadership frameworks, and engineering codebases. How can I assist your evaluation today?',
      timestamp: '00:00:03'
    }
  ]);

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickPrompts = [
    'What is your primary software stack?',
    'Summarize your leadership cadence',
    'How do you approach team retention & culture?',
    'What are your Q2 2025 engagement terms?',
    '/help'
  ];

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    soundFx.playTerminal();

    const newMsg: TerminalMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputVal('');
    setIsTyping(true);

    // AI intelligent answer generation
    setTimeout(() => {
      soundFx.playConfirm();
      setIsTyping(false);

      let responseText = '';
      const lower = query.toLowerCase();

      if (lower.startsWith('/help')) {
        responseText =
          'Available commands:\n• /skills - Review technical & management competencies\n• /perspectives - List the 5 perspective archetypes\n• /contact - Display direct contact coordinates\n• /clear - Clear the terminal output buffer\nOr ask any natural language question about engineering, leadership, or metrics.';
      } else if (lower.startsWith('/clear')) {
        setMessages([]);
        return;
      } else if (lower.startsWith('/skills')) {
        responseText =
          '[SKILLS ARCHIVE]:\n• Distributed Systems: TypeScript, Node.js, Go, Rust, WebSockets, Redis, PostgreSQL\n• Cloud & Infra: GCP, Cloud Run, Docker, Kubernetes, CI/CD, Terraform\n• Architecture: Event-driven queues, micro-frontends, high-concurrency pub/sub\n• Leadership: Cross-functional engineering management, OKRs, P&L stewardship, leveling frameworks.';
      } else if (lower.startsWith('/perspectives')) {
        responseText =
          '[ARCHETYPES AVAILABLE]:\n01. Administration & Management (Leadership & P&L)\n02. Human Resource Management (Culture & Retention)\n03. Software Development (Distributed Systems & Code)\n04. Data Analytics (Bayesian testing & predictive modeling)\n05. My Complete Story (Holistic multi-disciplinary journey)';
      } else if (lower.startsWith('/contact')) {
        responseText =
          '[COORDINATES]:\n• Email: pocokavin123@gmail.com\n• Timezone: UTC-05:00 EST\n• Availability: Q2 2025 Select Engagements & Principal Roles.';
      } else if (lower.includes('stack') || lower.includes('software') || lower.includes('tech') || lower.includes('code')) {
        responseText =
          '[SOFTWARE PERSPECTIVE]: Kavin specializes in zero-latency TypeScript/Node.js, reactive WebSockets, Go/Rust microservices, and modern frontends with Vite & Tailwind. Core principle: Type safety and simplicity eliminate 90% of production outages.';
      } else if (lower.includes('leadership') || lower.includes('manage') || lower.includes('admin') || lower.includes('scale')) {
        responseText =
          '[MANAGEMENT PERSPECTIVE]: Led engineering divisions scaling from 8 to 65+ heads across 3 geographic hubs with 94% OKR attainment and $18.4M P&L responsibility. Core principle: Speed is a habit, but direction is destiny.';
      } else if (lower.includes('culture') || lower.includes('retention') || lower.includes('hr') || lower.includes('people')) {
        responseText =
          '[HR PERSPECTIVE]: Achieved 1.4% regrettable attrition over 24 months, designed transparent salary bands, and replaced archaic annual reviews with 360-degree continuous retrospectives.';
      } else if (lower.includes('availability') || lower.includes('hire') || lower.includes('role') || lower.includes('rate') || lower.includes('q2')) {
        responseText =
          '[ENGAGEMENT STATUS]: Currently booking Q2 2025 for Principal Architecture, Fractional Head of Engineering, and full-time technical leadership engagements. Send an inquiry to pocokavin123@gmail.com.';
      } else {
        responseText = `[KAVIN_AI]: Synthesizing context for "${query}". Kavin’s track record bridges high-rigor systems engineering ($42M+ pipeline influenced, 99.99% SLA) with empathetic people leadership. Feel free to inspect any of the 5 perspective dossiers or contact him directly!`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: responseText,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    }, 600);
  };

  return (
    <div
      id="ai-modal"
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 md:p-6 animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundFx.playDismiss();
          onClose();
        }
      }}
    >
      <div className="bg-zinc-100 dark:bg-[#141416] w-full max-w-2xl rounded-3xl p-5 sm:p-7 shadow-2xl border border-zinc-300 dark:border-zinc-800 flex flex-col space-y-4 max-h-[90vh]">
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-xs text-zinc-900 dark:text-white tracking-wider uppercase font-semibold">
              KAVIN_AI // DIRECT CONSOLE v2.4
            </span>
          </div>

          <button
            id="close-modal"
            type="button"
            onClick={() => {
              soundFx.playDismiss();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-zinc-200 hover:bg-zinc-300 dark:bg-[#222226] dark:hover:bg-[#2a2a2e] flex items-center justify-center text-zinc-700 dark:text-zinc-300 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(prompt)}
              className="px-3 py-1 rounded-full bg-zinc-200/80 hover:bg-zinc-300 dark:bg-[#1e1e22] dark:hover:bg-[#28282d] text-[11px] font-mono text-zinc-700 dark:text-zinc-300 whitespace-nowrap transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Terminal Screen Output */}
        <div
          ref={outputRef}
          id="modal-terminal-output"
          className="bg-white dark:bg-[#0a0a0a] rounded-2xl p-4 md:p-5 font-mono text-xs space-y-3 h-72 md:h-80 overflow-y-auto border border-zinc-200 dark:border-zinc-900 shadow-inner"
        >
          {messages.map((m) => {
            if (m.sender === 'system') {
              return (
                <div key={m.id} className="text-zinc-500 dark:text-zinc-500 flex items-start gap-2">
                  <span className="opacity-50">#</span>
                  <span>{m.text}</span>
                </div>
              );
            }
            if (m.sender === 'user') {
              return (
                <div key={m.id} className="text-zinc-900 dark:text-zinc-200 flex items-start gap-2 font-semibold">
                  <span className="text-emerald-600 dark:text-emerald-400">&gt;</span>
                  <span>{m.text}</span>
                </div>
              );
            }
            return (
              <div key={m.id} className="text-zinc-800 dark:text-zinc-300 space-y-1 bg-zinc-50 dark:bg-[#121214] p-3 rounded-xl border border-zinc-200/50 dark:border-zinc-800/60">
                <div className="flex items-center justify-between text-[10px] text-zinc-400 font-bold uppercase tracking-wider">
                  <span className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                    <Sparkles className="w-3 h-3" />
                    KAVIN_AI
                  </span>
                  <span>{m.timestamp}</span>
                </div>
                <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-2 text-zinc-400 text-xs py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
              <span>Synthesizing response...</span>
            </div>
          )}
        </div>

        {/* Terminal Input Bar */}
        <div className="flex gap-2 items-center">
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 font-mono text-xs">
              &gt;
            </span>
            <input
              ref={inputRef}
              id="modal-input"
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
              placeholder="Ask about systems, leadership, or recent code (or /help)..."
              className="w-full bg-white dark:bg-[#0a0a0a] border border-zinc-300 dark:border-zinc-800 rounded-full pl-8 pr-4 py-2.5 font-mono text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-zinc-900 dark:focus:border-white transition-colors"
            />
          </div>

          <button
            id="modal-send"
            type="button"
            onClick={() => handleSend()}
            disabled={!inputVal.trim()}
            className="px-5 py-2.5 rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 text-xs font-semibold uppercase tracking-wider hover:opacity-90 disabled:opacity-40 transition-all flex items-center gap-1.5"
          >
            <span>Execute</span>
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
