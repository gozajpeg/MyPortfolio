function Contact() {
  return (
    <div className="animate-page-in w-full">
      <h2 className="text-[#555555] text-lg font-light tracking-widest uppercase mb-12">
        Contact
      </h2>

      <div className="w-full max-w-2xl">
        <p className="text-[#a3a3a3] font-light text-sm md:text-base leading-relaxed mb-10">
          I am currently open to new opportunities, collaborations, and discussions. 
          Feel free to reach out through the form below.
        </p>

        <form action="https://formsubmit.co/fb15985cb98f4db623c75fa83add9ffa" method="POST" className="flex flex-col gap-8">
          
          {/* FormSubmit Configuration (Optional: Disables the annoying captcha) */}
          <input type="hidden" name="_captcha" value="false" />
          {/* Ensures the email subject looks clean in your inbox */}
          <input type="hidden" name="_subject" value="New Contact Form Submission from Portfolio!" />

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
            <button type="submit" className="px-10 py-4 border border-[#333333] text-[#ededed] text-xs md:text-sm tracking-[0.15em] uppercase hover:bg-[#ededed] hover:text-[#0a0a0a] transition-all duration-300 outline-none cursor-pointer">
              Send Message
            </button>
            <span className="text-[#555555] text-[10px] tracking-widest uppercase text-left sm:text-right">
              Powered by <a href="https://formsubmit.co" target="_blank" rel="noopener noreferrer" className="hover:text-[#ededed] transition-colors duration-300 border-b border-transparent hover:border-[#ededed] pb-0.5">FormSubmit</a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Contact;