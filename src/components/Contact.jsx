import { useState, useMemo } from 'react';
import gozaLogoImg from '../assets/gozalogo.webp';

function Contact() {
  const [status, setStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'

  const { localStart, localEnd } = useMemo(() => {
    // 6:00 AM UTC+8 is 22:00 UTC the previous day
    const start = new Date(Date.UTC(2000, 0, 1, 22, 0, 0));
    // 12:00 AM UTC+8 (midnight) is 16:00 UTC
    const end = new Date(Date.UTC(2000, 0, 2, 16, 0, 0));
    
    const formatter = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' });
    return {
      localStart: formatter.format(start),
      localEnd: formatter.format(end)
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    setStatus('submitting');

    try {
      // Use Web3Forms endpoint
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }

    // Clear the notification popup after 5 seconds
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <div className="animate-page-in w-full">
      <h2 className="text-[#555555] text-lg font-light tracking-widest uppercase mb-12">
        Contact
      </h2>

      <div className="w-full max-w-2xl">
        <p className="text-[#a3a3a3] font-light text-sm md:text-base leading-relaxed mb-10">
          I'm always open to discussing new projects, creative ideas, or opportunities to collaborate. 
          Feel free to use the form below, or drop me an email directly at <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ragoza.builds@gmail.com" target="_blank" rel="noopener noreferrer" className="text-[#ededed] border-b border-[#333333] hover:border-[#ededed] transition-colors duration-300 pb-0.5 outline-none cursor-pointer">ragoza.builds@gmail.com</a>. If you're looking for a quick response, I am typically online between <span className="text-[#ededed] font-medium">{localStart} and {localEnd}</span>.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          
          {/* Web3Forms Access Key */}
          <input type="hidden" name="access_key" value={import.meta.env.VITE_WEB3FORMS_ACCESS_KEY} />
          {/* Web3Forms Configuration: Ensures the email subject looks clean */}
          <input type="hidden" name="subject" value="New Contact Form Submission from Portfolio!" />

          <div className="flex flex-col gap-2 relative group">
            <label htmlFor="name" className="text-[#555555] text-xs tracking-[0.15em] uppercase transition-colors group-focus-within:text-[#ededed]">Name</label>
            <input type="text" id="name" name="name" required className="bg-transparent border-b border-[#333333] text-[#ededed] py-2 outline-none focus:border-[#ededed] transition-colors duration-300 font-light" placeholder="John Doe" />
          </div>
          
          <div className="flex flex-col gap-2 relative group">
            <label htmlFor="email" className="text-[#555555] text-xs tracking-[0.15em] uppercase transition-colors group-focus-within:text-[#ededed]">Email</label>
            <input type="email" id="email" name="email" required className="bg-transparent border-b border-[#333333] text-[#ededed] py-2 outline-none focus:border-[#ededed] transition-colors duration-300 font-light" placeholder="john@example.com" />
          </div>
          
          <div className="flex flex-col gap-2 relative group mt-4">
            <label htmlFor="message" className="text-[#555555] text-xs tracking-[0.15em] uppercase transition-colors group-focus-within:text-[#ededed]">Message</label>
            <textarea id="message" name="message" required rows="4" className="bg-transparent border-b border-[#333333] text-[#ededed] py-2 outline-none focus:border-[#ededed] transition-colors duration-300 font-light resize-none" placeholder="Hello..."></textarea>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <button 
              type="submit" 
              disabled={status === 'submitting'}
              className="flex items-center justify-center min-w-[200px] px-10 py-4 border border-[#333333] text-[#ededed] text-xs md:text-sm tracking-[0.15em] uppercase hover:bg-[#ededed] hover:text-[#0a0a0a] transition-all duration-300 outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-[#ededed]"
            >
              {status === 'submitting' ? (
                <img src={gozaLogoImg} alt="Sending..." className="w-5 h-5 animate-pulse" />
              ) : (
                "Send Message"
              )}
            </button>
            <span className="text-[#555555] text-[10px] tracking-widest uppercase text-left sm:text-right">
              Powered by <a href="https://web3forms.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#ededed] transition-colors duration-300 border-b border-transparent hover:border-[#ededed] pb-0.5">Web3Forms</a>
            </span>
          </div>
        </form>
      </div>

      {/* Floating Success / Error Popups */}
      <div 
        className={`fixed bottom-8 right-8 bg-[#0c0c0c] border border-[#222222] p-6 shadow-2xl flex items-center gap-4 z-[9999] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${status === 'success' || status === 'error' ? 'translate-y-0 opacity-100 visible' : 'translate-y-12 opacity-0 invisible'}`}
      >
        <span className={`w-2 h-2 rounded-full animate-pulse ${status === 'success' ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]'}`}></span>
        <span className="text-[#ededed] text-xs md:text-sm tracking-widest uppercase font-light">
          {status === 'success' ? 'Message sent successfully.' : 'Failed to send. Try again.'}
        </span>
      </div>
    </div>
  );
}

export default Contact;