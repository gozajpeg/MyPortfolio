function Socials() {
  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/gozajpeg/MyPortfolio', icon: 'https://cdn.simpleicons.org/github/ededed' },
    { name: 'Facebook', url: 'https://www.facebook.com/jelunatic.z', icon: 'https://cdn.simpleicons.org/facebook/ededed' },
    { name: 'Instagram', url: 'https://www.instagram.com/jelonaticz', icon: 'https://cdn.simpleicons.org/instagram/ededed' },
  ];

  return (
    <div className="animate-page-in w-full">
      <h2 className="text-[#555555] text-lg font-light tracking-widest uppercase mb-12">
        Socials
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        {socialLinks.map((social, index) => (
          <a
            key={index}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col items-center justify-center gap-6 p-12 md:p-16 border border-[#222222] bg-[#0c0c0c] hover:bg-[#ededed] hover:border-[#ededed] transition-all duration-500 overflow-hidden"
          >
            <div className="absolute top-6 right-8 text-[#555555] group-hover:text-[#0a0a0a] font-light text-xl transition-colors duration-500">
              ↗
            </div>
            <img 
              src={social.icon} 
              alt={social.name} 
              className="w-12 h-12 opacity-70 group-hover:invert group-hover:scale-110 group-hover:opacity-100 transition-all duration-500" 
            />
            <span className="text-[#ededed] group-hover:text-[#0a0a0a] font-light text-sm tracking-[0.2em] uppercase transition-colors duration-500">
              {social.name}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Socials;