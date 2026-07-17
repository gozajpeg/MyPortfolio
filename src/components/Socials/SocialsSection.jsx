function SocialsSection() {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/gozajpeg/MyPortfolio', icon: 'https://cdn.simpleicons.org/github/050505', hoverBg: 'hover:bg-[#09005c]' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/rommel-angelo-goza-264a72421/', icon: 'https://api.iconify.design/simple-icons/linkedin.svg?color=%23050505', hoverBg: 'hover:bg-[#00a1db]' },
    { name: 'Instagram', url: 'https://www.instagram.com/jelonaticz', icon: 'https://cdn.simpleicons.org/instagram/050505', hoverBg: 'hover:bg-[#bd38ff]' },
    { name: 'Gmail', url: 'https://mail.google.com/mail/?view=cm&fs=1&to=ragoza.builds@gmail.com', icon: 'https://cdn.simpleicons.org/gmail/050505', hoverBg: 'hover:bg-[#ff2414]' },
  ];

  return (
    <section id="socials" className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      {/* Headline Banner */}
      <div className="bg-[#22d3ee] neo-border neo-shadow p-6 mb-12">
        <h2 className="font-display font-black text-4xl md:text-6xl tracking-tighter uppercase text-[#050505] leading-none">
          Socials
        </h2>
        <p className="font-mono text-sm uppercase tracking-wider text-[#050505] mt-2 font-semibold">
          Let's Build Something Legendary Together
        </p>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`group relative flex flex-col items-center justify-center gap-6 p-8 border-4 border-[#050505] bg-white ${social.hoverBg} transition-all duration-200 shadow-[6px_6px_0px_#050505] hover:shadow-[10px_10px_0px_#050505] hover:translate-x-[-4px] hover:translate-y-[-4px]`}
          >
            <div className="absolute top-4 right-4 font-mono font-bold text-lg text-[#050505]">
              ↗
            </div>
            <img
              src={social.icon}
              alt={social.name}
              className="w-16 h-16 object-contain group-hover:rotate-6 transition-transform duration-200"
            />

            <span className="font-display font-black text-lg tracking-wider uppercase text-[#050505]">
              {social.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

export default SocialsSection;
