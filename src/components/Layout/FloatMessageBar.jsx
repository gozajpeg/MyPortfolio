import { useState, useEffect, useRef } from 'react';

export default function FloatMessageBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [senderInfo, setSenderInfo] = useState(''); // Unified Email / Username input
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const inputRef = useRef(null);

  const WORKER_URL = 'https://messages.ragoza-builds.workers.dev';

  // Keyboard shortcut listener: Ctrl + E to toggle & Esc to close
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle on Ctrl + E / Cmd + E
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        setIsOpen((prev) => {
          const next = !prev;
          if (next) {
            setTimeout(() => inputRef.current?.focus(), 150);
          }
          return next;
        });
      }

      // Close on Escape if open
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus('loading');

    try {
      const params = new URLSearchParams({
        sender: senderInfo.trim() || 'Anonymous User',
        message: message.trim(),
        timestamp: new Date().toISOString(),
      });

      const response = await fetch(`${WORKER_URL}?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage('');
        setSenderInfo('');
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        throw new Error(data.error || data.telegramError || 'Failed to dispatch');
      }
    } catch (err) {
      console.error('Telegram dispatch failed:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[9990] w-[90%] max-w-[420px] animate-in fade-in slide-in-from-top-4 duration-200">
      {/* Outer keycap housing */}
      <div className="relative bg-[#121212] border border-[#26262B] rounded-xl shadow-[0_12px_32px_rgba(0,0,0,0.6)] p-3">
        {/* Figma styled bar header */}
        <div className="flex items-center justify-between mb-2 pb-2 border-b border-white/5">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#9F4FFF] animate-pulse" />
            <span className="font-mono text-[9px] font-bold text-ink-muted uppercase tracking-widest">
              Quick Message
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="font-mono text-[9px] text-ink-soft hover:text-ink bg-white/[0.04] border border-white/10 rounded px-1.5 py-0.5 cursor-pointer uppercase transition-colors"
          >
            Esc [Ctrl+E]
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Your Username / Email (optional)"
            value={senderInfo}
            onChange={(e) => setSenderInfo(e.target.value)}
            disabled={status === 'loading'}
            className="w-full bg-[#1A1A1A] border border-white/[0.04] rounded-lg px-3 py-2 text-xs font-sans text-ink placeholder:text-ink-muted focus:border-white/[0.12] focus:bg-[#202020] transition-all outline-none"
          />

          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              required
              placeholder="Write a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={status === 'loading'}
              className="flex-1 bg-[#1A1A1A] border border-white/[0.04] rounded-lg px-3 py-2 text-xs font-sans text-ink placeholder:text-ink-muted focus:border-white/[0.12] focus:bg-[#202020] transition-all outline-none"
            />

            {/* Keycap wrapper for send button */}
            <div className="relative bg-[#141414] border border-[#252525] rounded-lg h-[32px] w-[55px] shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              <button
                type="submit"
                disabled={status === 'loading' || !message.trim()}
                className={`absolute inset-0 flex items-center justify-center font-mono text-[9px] font-bold uppercase tracking-wider transition-all duration-75 rounded-lg border border-[#252525] cursor-pointer disabled:opacity-50 disabled:pointer-events-none ${status === 'loading'
                  ? 'text-ink-soft bg-[#222222] border-b-[2px]'
                  : 'text-bg bg-[#EDEAE3] border-b-[3px] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] hover:border-b-[2px] hover:translate-y-[1px] active:border-b-0 active:translate-y-[3px]'
                  }`}
              >
                {status === 'loading' ? '...' : 'Send'}
              </button>
            </div>
          </div>
        </form>

        {/* Status indicator bar */}
        {status !== 'idle' && (
          <div className="mt-2 text-center animate-in fade-in duration-150">
            {status === 'success' && (
              <span className="font-mono text-[8px] font-bold text-[#a3e635] uppercase tracking-wider">
                ✓ Message dispatched to Telegram Bot!
              </span>
            )}
            {status === 'error' && (
              <span className="font-mono text-[8px] font-bold text-[#FF3884] uppercase tracking-wider">
                ⚠ Send error. Please verify worker route.
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}