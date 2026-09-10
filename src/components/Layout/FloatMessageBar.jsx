import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatMessageBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [senderInfo, setSenderInfo] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const inputRef = useRef(null);

  const WORKER_URL = 'https://messages.ragoza-builds.workers.dev';

  // Toggle via Ctrl+E, Esc, or global custom event
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e') {
        e.preventDefault();
        setIsOpen((prev) => {
          const next = !prev;
          if (next) setTimeout(() => inputRef.current?.focus(), 100);
          return next;
        });
      }

      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    const handleOpenEvent = () => {
      setIsOpen(true);
      setTimeout(() => inputRef.current?.focus(), 100);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-quick-message', handleOpenEvent);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-quick-message', handleOpenEvent);
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setStatus('loading');

    try {
      const params = new URLSearchParams({
        sender: senderInfo.trim() || 'Anonymous Visitor',
        message: message.trim(),
        timestamp: new Date().toISOString(),
      });

      const response = await fetch(`${WORKER_URL}?${params.toString()}`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });

      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage('');
        setSenderInfo('');
        setTimeout(() => {
          setStatus('idle');
          setIsOpen(false);
        }, 1800);
      } else {
        throw new Error(data.error || 'Failed to dispatch');
      }
    } catch (err) {
      console.error('Dispatch failed:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[9990] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 8 }}
            transition={{ type: 'spring', damping: 28, stiffness: 360 }}
            className="w-full max-w-[440px] bg-[#141414] border border-[#252525] rounded-2xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
            role="dialog"
            aria-modal="true"
            aria-labelledby="message-dialog-title"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-white/[0.06]">
              <div>
                <h2 id="message-dialog-title" className="font-display font-bold text-base text-ink m-0 tracking-tight">
                  Direct Message
                </h2>
                <p className="font-sans text-xs text-ink-muted mt-0.5 mb-0">
                  Sends straight to Telegram
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="font-sans text-xs font-medium text-ink-muted hover:text-ink bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-lg px-2.5 py-1 cursor-pointer transition-colors"
              >
                ✕ Close
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <div>
                <label htmlFor="sender-contact" className="block font-sans text-xs font-semibold text-ink-muted mb-1">
                  Your Name or Email <span className="text-ink-muted/60 font-normal">(Optional)</span>
                </label>
                <input
                  id="sender-contact"
                  type="text"
                  placeholder="e.g. Alex (alex@example.com)"
                  value={senderInfo}
                  onChange={(e) => setSenderInfo(e.target.value)}
                  disabled={status === 'loading'}
                  className="w-full bg-[#1A1A1A] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs font-sans text-ink placeholder:text-ink-muted/50 focus:border-ink-soft/40 focus:bg-[#202020] transition-all outline-none"
                />
              </div>

              <div>
                <label htmlFor="direct-message-body" className="block font-sans text-xs font-semibold text-ink-muted mb-1">
                  Message <span className="text-ink-soft">*</span>
                </label>
                <textarea
                  id="direct-message-body"
                  ref={inputRef}
                  required
                  rows={3}
                  placeholder="What would you like to discuss?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  disabled={status === 'loading'}
                  className="w-full bg-[#1A1A1A] border border-white/[0.08] rounded-xl px-3.5 py-2.5 text-xs font-sans text-ink placeholder:text-ink-muted/50 focus:border-ink-soft/40 focus:bg-[#202020] transition-all outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <div className="font-sans text-xs">
                  {status === 'success' && (
                    <span className="text-emerald-400 font-medium">Message sent</span>
                  )}
                  {status === 'error' && (
                    <span className="text-red-400 font-medium">Could not send. Please use email.</span>
                  )}
                </div>

                <div className="relative bg-[#141414] border border-[#252525] rounded-xl h-[38px] w-[105px] shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
                  <button
                    type="submit"
                    disabled={status === 'loading' || !message.trim()}
                    className="absolute inset-0 flex items-center justify-center font-sans text-xs font-bold text-bg bg-[#EDEAE3] border border-[#252525] border-b-[4px] rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.4)] cursor-pointer transition-all duration-75 hover:border-b-[2px] hover:translate-y-[2px] active:border-b-0 active:translate-y-[4px] disabled:opacity-40 disabled:pointer-events-none"
                  >
                    {status === 'loading' ? 'Sending...' : 'Send'}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}