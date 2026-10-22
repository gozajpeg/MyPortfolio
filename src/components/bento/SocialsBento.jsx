import { useState, useEffect, useRef } from 'react';
import { hasUserSentMessage, recordMessageSent, getDeviceFingerprint } from '../../utils/antiSpam';

export default function SocialsBento() {
  const messageInputRef = useRef(null);
  const [sender, setSender] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [hasSent, setHasSent] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  useEffect(() => {
    let isMounted = true;
    hasUserSentMessage().then((alreadySent) => {
      if (isMounted && alreadySent) {
        setHasSent(true);
      }
    });

    const handleQuickMessage = () => {
      setTimeout(() => {
        messageInputRef.current?.focus();
      }, 250);
    };

    window.addEventListener('open-quick-message', handleQuickMessage);
    return () => {
      isMounted = false;
      window.removeEventListener('open-quick-message', handleQuickMessage);
    };
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('ragoza.builds@gmail.com');
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      window.location.href = 'mailto:ragoza.builds@gmail.com';
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    if (!message.trim() || status === 'loading') return;

    const alreadySent = await hasUserSentMessage();
    if (alreadySent || hasSent) {
      setHasSent(true);
      setStatus('already_sent');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const fp = getDeviceFingerprint();
      const params = new URLSearchParams({
        sender: sender.trim() || 'Anonymous Visitor',
        message: message.trim(),
        timestamp: new Date().toISOString(),
        fp,
      });

      const response = await fetch(
        `https://messages.ragoza-builds.workers.dev?${params.toString()}`,
        {
          method: 'GET',
          headers: { Accept: 'application/json' },
        }
      );

      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      const data = await response.json();

      if (data.success) {
        await recordMessageSent(sender.trim());
        setHasSent(true);
        setStatus('success');
        setMessage('');
      } else {
        throw new Error(data.error || 'Failed to send');
      }
    } catch (err) {
      console.error('Dispatch failed:', err);
      setStatus('error');
      setErrorMessage('Could not send right now. Please email ragoza.builds@gmail.com.');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <section
      id="socials"
      aria-label="Call to Action and Contact"
      className="theme-surface rounded-2xl border p-6 sm:p-8 flex flex-col gap-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
        {/* Left Column: CTA + Direct Contact Channels */}
        <div className="md:col-span-5 flex flex-col justify-between gap-5">
          <div className="flex flex-col gap-2">
            <span className="font-sans text-xs font-medium text-ink-muted">
              Available for projects &amp; full-time roles
            </span>
            <h2 className="font-sans text-xl sm:text-2xl font-bold text-ink tracking-tight m-0 leading-snug">
              Let&apos;s build something together.
            </h2>
            <p className="font-sans text-xs sm:text-sm text-ink-soft leading-relaxed m-0">
              Reach out directly via email, socials, or send a quick message straight to my Telegram.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy email address ragoza.builds@gmail.com"
              className="flex h-10 w-full items-center justify-between gap-2 rounded-xl border border-border hover:border-border-strong bg-surface-hover/35 hover:bg-surface-hover px-3.5 text-left transition-colors cursor-pointer"
            >
              <span className="font-sans text-xs font-semibold text-ink truncate">
                ragoza.builds@gmail.com
              </span>
              <span
                aria-live="polite"
                className="font-sans text-[11px] font-medium text-ink-soft shrink-0"
              >
                {emailCopied ? 'Copied' : 'Copy email'}
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: Direct Message Form */}
        <form
          onSubmit={handleSubmit}
          className="md:col-span-7 flex flex-col gap-3 md:pl-6 md:border-l border-border"
        >
          <input
            id="dm-sender"
            type="text"
            aria-label="Your email or name"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            placeholder="Your name or email"
            disabled={status === 'loading' || hasSent}
            className="h-10 w-full rounded-xl border border-border bg-transparent focus:border-border-strong px-3.5 font-sans text-xs text-ink placeholder:text-ink-muted transition-colors disabled:opacity-50"
          />

          <textarea
            id="dm-message"
            ref={messageInputRef}
            rows={4}
            maxLength={500}
            aria-label="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell me about your project, role, or idea..."
            disabled={status === 'loading' || hasSent}
            className="w-full rounded-xl border border-border bg-transparent focus:border-border-strong p-3.5 font-sans text-xs text-ink placeholder:text-ink-muted resize-none transition-colors disabled:opacity-50"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-0.5">
            <span aria-live="polite" className="font-sans text-xs text-ink-soft">
              {status === 'success' && 'Delivered. I will reply soon.'}
              {(hasSent || status === 'already_sent') && status !== 'success' && '1 message limit reached.'}
              {status === 'error' && errorMessage}
            </span>

            <button
              type="submit"
              disabled={status === 'loading' || hasSent || !message.trim()}
              className="h-10 px-5 rounded-xl bg-ink text-bg font-sans text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer border-none disabled:opacity-40 disabled:pointer-events-none ml-auto"
            >
              {status === 'loading'
                ? 'Sending...'
                : status === 'success' || hasSent
                ? 'Message sent'
                : 'Send message'}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
