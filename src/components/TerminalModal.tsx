'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, RotateCcw, ArrowUp } from 'lucide-react';
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
  const getFormattedTime = () => {
    const d = new Date();
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
  };

  const [messages, setMessages] = useState<TerminalMessage[]>([
    {
      id: '1',
      sender: 'ai',
      senderName: 'Kavin AI',
      text: 'Hi there! I am an interactive AI persona trained on Kavin’s architectural decisions, leadership frameworks, and engineering experience.',
      timestamp: '09:38',
      status: 'Delivered'
    },
    {
      id: '2',
      sender: 'user',
      senderName: 'You',
      text: 'What can you help me explore about Kavin’s background?',
      timestamp: '09:40',
      status: 'Read 09:41'
    },
    {
      id: '3',
      sender: 'ai',
      senderName: 'Kavin AI',
      text: 'You can ask about his full-stack architecture, distributed systems, engineering leadership metrics, or direct engagement terms for Q2 2025.',
      timestamp: '09:42',
      status: 'Edited • 09:44'
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
    'Direct contact details'
  ];

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTo({
        top: outputRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages, isTyping]);

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    soundFx.playTerminal();
    const currentTime = getFormattedTime();

    const newMsg: TerminalMessage = {
      id: Date.now().toString(),
      sender: 'user',
      senderName: 'You',
      text: query,
      timestamp: currentTime,
      status: `Read ${currentTime}`
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputVal('');
    setIsTyping(true);

    // Generate response
    setTimeout(() => {
      soundFx.playConfirm();
      setIsTyping(false);

      const respTime = getFormattedTime();
      let responseText = '';
      const lower = query.toLowerCase();

      if (lower.startsWith('/help') || lower.includes('help')) {
        responseText =
          'Here are some topics you can ask me about:\n• Technical Stack & Systems Architecture\n• Leadership Cadence & OKRs\n• Team Culture & Retention Strategies\n• Availability & Contact Coordinates';
      } else if (lower.startsWith('/clear') || lower === 'clear') {
        setMessages([]);
        return;
      } else if (lower.includes('stack') || lower.includes('software') || lower.includes('code') || lower.includes('tech')) {
        responseText =
          'My primary stack centers on modern TypeScript, Next.js / React, Node.js, Go, and PostgreSQL / Redis. I prioritize type safety, sub-30ms p99 latencies, and declarative state architectures.';
      } else if (lower.includes('leadership') || lower.includes('manage') || lower.includes('admin')) {
        responseText =
          'My leadership framework pairs transparent quarterly OKRs with deep psychological safety — insulating engineers from organizational churn and directly aligning system architecture with company P&L.';
      } else if (lower.includes('retention') || lower.includes('hr') || lower.includes('people') || lower.includes('culture')) {
        responseText =
          'I maintained a 1.4% regrettable attrition rate across 45+ engineers by replacing annual reviews with continuous 360 peer feedback and an async-first culture that protects deep work.';
      } else if (lower.includes('contact') || lower.includes('email') || lower.includes('terms') || lower.includes('hire') || lower.includes('reach')) {
        responseText =
          'Direct contact: pocokavin123@gmail.com\nLocation: High-sync Remote / New York\nAvailability: Open for select VP of Engineering, Principal Architect, or Fractional Advisory roles.';
      } else {
        responseText = `Based on Kavin's production portfolio, his focus remains on building resilient full-stack systems and high-performing engineering organizations. Feel free to explore his projects or email him at pocokavin123@gmail.com.`;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          senderName: 'Kavin AI',
          text: responseText,
          timestamp: respTime,
          status: `Delivered • ${respTime}`
        }
      ]);
    }, 700);
  };

  const handleReset = () => {
    setMessages([
      {
        id: '1',
        sender: 'ai',
        senderName: 'Kavin AI',
        text: 'Conversation reset. How can I assist you today?',
        timestamp: getFormattedTime(),
        status: 'Delivered'
      }
    ]);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div
        id="terminal-modal"
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            soundFx.playDismiss();
            onClose();
          }
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 12 }}
          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white dark:bg-[#111113] text-zinc-900 dark:text-zinc-100 w-full max-w-2xl rounded-3xl sm:rounded-[32px] shadow-2xl border border-zinc-200/80 dark:border-zinc-800 flex flex-col h-[85vh] max-h-[680px] overflow-hidden"
        >
          {/* Header Bar */}
          <div className="h-16 border-b border-zinc-100 dark:border-zinc-800/80 px-5 sm:px-6 flex items-center justify-between shrink-0 bg-white/80 dark:bg-[#111113]/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-9 h-9 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold text-sm">
                <Sparkles className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-[#111113]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
                  Kavin AI Assistant
                </h3>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Online • Powered by Portfolio Context
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Reset conversation"
                className="w-8 h-8 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  soundFx.playDismiss();
                  onClose();
                }}
                title="Close chat"
                className="w-8 h-8 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Message Stream Area */}
          <div
            ref={outputRef}
            className="flex-1 p-5 sm:p-7 overflow-y-auto space-y-5 bg-white dark:bg-[#111113]"
          >
            {messages.map((m) => {
              const isUser = m.sender === 'user';

              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-full`}
                >
                  {/* Sender Name and Timestamp Header */}
                  {!isUser && (
                    <div className="text-[12px] sm:text-[13px] text-zinc-400 dark:text-zinc-500 font-medium mb-1.5 px-1 flex items-center gap-1.5">
                      <span>{m.senderName || 'Kavin AI'}</span>
                      <span>•</span>
                      <span>{m.timestamp}</span>
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[85%] sm:max-w-[75%] px-4 py-3 sm:px-5 sm:py-3.5 rounded-[22px] text-[13.5px] sm:text-[14.5px] leading-relaxed whitespace-pre-wrap transition-all ${
                      isUser
                        ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 font-normal rounded-tr-md'
                        : 'bg-[#F4F4F5] text-zinc-900 dark:bg-zinc-800/80 dark:text-zinc-100 font-normal rounded-tl-md'
                    }`}
                  >
                    {m.text}
                  </div>

                  {/* Status / Timestamp Footer */}
                  {isUser && m.status && (
                    <div className="text-[11px] sm:text-[12px] text-zinc-400 dark:text-zinc-500 mt-1.5 px-1 font-normal text-right">
                      {m.status}
                    </div>
                  )}
                  {!isUser && m.status && (
                    <div className="text-[11px] sm:text-[12px] text-zinc-400 dark:text-zinc-500 mt-1.5 px-1 font-normal text-left">
                      {m.status}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex flex-col items-start">
                <div className="text-[12px] text-zinc-400 dark:text-zinc-500 font-medium mb-1.5 px-1 flex items-center gap-1.5">
                  <span>Kavin AI</span>
                  <span>•</span>
                  <span>typing...</span>
                </div>
                <div className="bg-[#F4F4F5] dark:bg-zinc-800/80 px-4 py-3 rounded-[22px] rounded-tl-md flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            )}
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-5 py-2.5 bg-zinc-50/70 dark:bg-zinc-900/40 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center gap-2 overflow-x-auto scrollbar-none">
            {quickPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p)}
                className="px-3 py-1.5 rounded-full bg-white dark:bg-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-700 border border-zinc-200/80 dark:border-zinc-700/60 text-xs font-medium text-zinc-700 dark:text-zinc-300 whitespace-nowrap transition-all shadow-xs shrink-0"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-4 sm:p-5 bg-white dark:bg-[#111113] border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2.5"
          >
            <div className="flex items-center gap-2 flex-1 bg-zinc-100/80 dark:bg-zinc-800/60 border border-zinc-200/70 dark:border-zinc-700/50 rounded-full px-4 py-2.5 focus-within:border-zinc-400 dark:focus-within:border-zinc-500 focus-within:bg-white dark:focus-within:bg-zinc-800 transition-all">
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask anything about Kavin..."
                className="w-full bg-transparent text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-sm font-normal focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={!inputVal.trim()}
              className="w-10 h-10 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 transition-all shrink-0 shadow-sm cursor-pointer"
            >
              <ArrowUp className="w-4 h-4 stroke-[2.5]" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
