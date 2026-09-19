'use client';

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
          '[SKILLS ARCHIVE]:\n• Distributed Systems: TypeScript, Node.js, Next.js, Go, Rust, WebSockets, Redis, PostgreSQL\n• Cloud & Infra: GCP, Cloud Run, Docker, Kubernetes, CI/CD, Terraform\n• Architecture: Event-driven queues, micro-frontends, high-concurrency pub/sub\n• Leadership: Cross-functional engineering management, OKRs, P&L stewardship, leveling frameworks.';
      } else if (lower.includes('stack') || lower.includes('software') || lower.includes('code')) {
        responseText =
          'My primary software stack centers around modern TypeScript, Next.js / React, Node.js, Go, and PostgreSQL / Redis. I prioritize type safety, zero-runtime overhead, sub-30ms p99 latencies, and declarative state architectures.';
      } else if (lower.includes('leadership') || lower.includes('manage') || lower.includes('admin')) {
        responseText =
          'My leadership philosophy combines rigorous quarterly OKR cadence with psychological safety. I protect developers from organizational noise, establish transparent leveling bands, and align technical architecture directly with company P&L goals.';
      } else if (lower.includes('retention') || lower.includes('hr') || lower.includes('people') || lower.includes('culture')) {
        responseText =
          'I maintained a 1.4% regrettable attrition rate across 45+ engineers by replacing annual reviews with continuous 360 peer feedback, clear promotion tracks, and an async-first culture that respects uninterrupted deep work.';
      } else if (lower.includes('contact') || lower.includes('email') || lower.includes('terms') || lower.includes('hire')) {
        responseText =
          'Direct contact: pocokavin123@gmail.com\nLocation: New York / High-sync Remote\nAvailability: Open for select VP of Engineering, Principal Systems Architect, or Fractional Advisory roles starting Q2 2025.';
      } else {
        responseText = `Acknowledged. Based on Kavin's production portfolio, his focus remains on building resilient full-stack systems and high-performing engineering organizations. Feel free to explore the 5 perspective dossiers or contact him at pocokavin123@gmail.com for deeper technical RFCs.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          sender: 'ai',
          text: responseText,
          timestamp: new Date().toLocaleTimeString()
        }
      ]);
    }, 600);
  };

  return (
    <div
      id="terminal-modal"
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundFx.playDismiss();
          onClose();
        }
      }}
    >
      <div className="bg-[#0e0e11] text-zinc-100 w-full max-w-3xl rounded-3xl border border-zinc-800 shadow-2xl flex flex-col h-[85vh] max-h-[700px] overflow-hidden">
        {/* Terminal Header */}
        <div className="h-12 bg-[#141418] border-b border-zinc-800 px-4 sm:px-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 cursor-pointer" onClick={onClose} />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="font-mono text-xs text-zinc-400 font-semibold ml-3 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5 text-zinc-400" />
              kavin-ai-interactive-terminal // session_01
            </span>
          </div>

          <button
            onClick={() => {
              soundFx.playDismiss();
              onClose();
            }}
            className="w-7 h-7 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Terminal Message Stream */}
        <div ref={outputRef} className="flex-1 p-4 sm:p-6 overflow-y-auto font-mono text-xs sm:text-sm space-y-4">
          {messages.map((m) => (
            <div key={m.id} className="space-y-1">
              <div className="flex items-center gap-2 text-[10px] text-zinc-500">
                <span className="uppercase font-bold text-zinc-400">[{m.sender}]</span>
                <span>{m.timestamp}</span>
              </div>
              <div
                className={`p-3 rounded-2xl whitespace-pre-wrap leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-zinc-800/80 text-white ml-8 sm:ml-16 border border-zinc-700/50'
                    : m.sender === 'system'
                    ? 'bg-zinc-900/40 text-zinc-400 border border-zinc-800/40'
                    : 'bg-[#18181f] text-zinc-200 mr-8 sm:mr-16 border border-zinc-800'
                }`}
              >
                {m.text}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1.5 text-zinc-500 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="text-xs font-mono ml-1 text-purple-400">Thinking...</span>
            </div>
          )}
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-2 bg-[#121216] border-t border-zinc-800/60 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <span className="text-[10px] font-mono text-zinc-500 uppercase shrink-0">Prompts:</span>
          {quickPrompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(p)}
              className="px-2.5 py-1 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-[11px] font-mono text-zinc-300 whitespace-nowrap transition-colors"
            >
              {p}
            </button>
          ))}
        </div>

        {/* Command Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 sm:p-4 bg-[#141418] border-t border-zinc-800 flex items-center gap-2"
        >
          <div className="flex items-center gap-2 flex-1 bg-[#0a0a0d] border border-zinc-700/60 rounded-2xl px-4 py-2.5 focus-within:border-zinc-400 transition-colors">
            <span className="text-purple-400 font-mono text-sm font-bold">❯</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask anything or enter a command..."
              className="w-full bg-transparent text-zinc-100 placeholder-zinc-500 text-xs sm:text-sm font-mono focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-10 h-10 rounded-2xl bg-white text-zinc-950 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
