import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import frenslynkImg from '../assets/FrensLynk.webp';
import arhkilaImg from '../assets/Arhkila.webp';
import ss1Img from '../assets/SS1.webp';
import ss2Img from '../assets/SS2.webp';
import gozaLogoImg from '../assets/gozalogo.webp';

function Projects() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Lock scrolling on the background when the modal is open
  useEffect(() => {
    const mainPane = document.querySelector('main');
    const asidePane = document.querySelector('aside');
    if (selectedImage) {
      document.body.style.overflow = 'hidden';
      if (mainPane) mainPane.style.overflow = 'hidden';
      if (asidePane) asidePane.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      if (mainPane) mainPane.style.overflow = '';
      if (asidePane) asidePane.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      if (mainPane) mainPane.style.overflow = '';
      if (asidePane) asidePane.style.overflow = '';
    };
  }, [selectedImage]);

  const featuredProjects = [
    {
      title: 'FrensLynk',
      date: 'Est. Jan 2026',
      role: 'Creator / Developer',
      description: 'Social Utility Platform Empowering Real-Life Connections.',
      image: frenslynkImg,
    },
    {
      title: 'Arhkila',
      date: '',
      role: 'Lead Developer',
      description: '',
      image: arhkilaImg,
    }
  ];

  const otherExperiments = {
    'Screensavers': {
      link: 'https://github.com/gozajpeg/Screensavers/releases',
      items: [
        {
          title: 'Canvas ScreenSaver',
          description: 'Spotify based',
          tech: 'Python / Tkinter',
          image: ss1Img,
        },
        {
          title: 'Environment Time/Day Sync ScreenSaver',
          description: '',
          tech: 'Python / Tkinter',
          image: ss2Img,
        }
      ]
    },
    'Logos & Branding': {
      items: [
        {
          title: 'RAG',
          description: 'A custom logo and visual identity created for my personal brand, reflecting my style and values.',
          tech: 'Framer/Figma',
          image: gozaLogoImg,
        }
      ]
    }
  };

  return (
    <div className="animate-page-in w-full">
      <h2 className="text-[#555555] text-lg font-light tracking-widest uppercase mb-12">
        Projects
      </h2>

      <div className="flex flex-col gap-16 w-full max-w-4xl">
        {/* Featured Projects */}
        <div>
          <h3 className="text-[#ededed] text-sm font-light tracking-[0.2em] uppercase mb-8 border-b border-[#222222] pb-4">
            Featured Work
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <div key={index} className="group border border-[#222222] bg-[#0c0c0c] overflow-hidden transition-all duration-300 hover:border-[#ededed] flex flex-col">
                <div 
                  className="w-full h-48 bg-[#1a1a1a] overflow-hidden relative border-b border-[#222222] group-hover:border-[#ededed] transition-colors duration-300 cursor-zoom-in"
                  onClick={() => setSelectedImage(project.image)}
                >
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-contain p-6 opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full text-[#333333] text-xs uppercase tracking-widest">Image Missing</div>'; }}
                  />
                </div>
                <div className="p-6 md:p-8 flex flex-col gap-4 flex-grow">
                  <div>
                    <h4 className="text-[#ededed] text-xl font-light tracking-wide mb-1">{project.title}</h4>
                    <div className="flex justify-between items-center text-[#737373] text-xs tracking-widest uppercase mt-2">
                      <span>{project.role}</span>
                      {project.date && <span>{project.date}</span>}
                    </div>
                  </div>
                  {project.description && (
                    <p className="text-[#a3a3a3] text-sm font-light leading-relaxed mt-2">
                      {project.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Other Works Accordion */}
        <div>
          <h3 className="text-[#ededed] text-sm font-light tracking-[0.2em] uppercase mb-8 border-b border-[#222222] pb-4">
            Other Works
          </h3>
          <div className="flex flex-col gap-4">
            {Object.entries(otherExperiments).map(([category, data], catIndex) => {
              const isExpanded = expandedCategory === category;
              const projects = data.items;
              
              return (
                <div key={catIndex} className="flex flex-col border border-[#222222] bg-[#0c0c0c]">
                  {/* Accordion Header */}
                  <button
                    type="button"
                    onClick={() => setExpandedCategory(isExpanded ? null : category)}
                    className="flex items-center justify-between p-6 w-full text-left hover:bg-[#111111] transition-colors duration-300 outline-none cursor-pointer group"
                  >
                    <span className="text-[#ededed] text-sm font-light tracking-[0.2em] uppercase group-hover:text-white">
                      {category}
                    </span>
                    <span className="text-[#555555] font-light text-2xl leading-none group-hover:text-[#ededed] transition-colors duration-300">
                      {isExpanded ? '−' : '+'}
                    </span>
                  </button>

                  {/* Accordion Content */}
                  {isExpanded && (
                    <div className="flex flex-col border-t border-[#222222] bg-[#0a0a0a] animate-page-in">
                      {data.link && (
                        <div className="flex items-center justify-between px-6 pt-6 pb-2">
                          <span className="text-[#737373] text-xs font-light tracking-widest uppercase">
                            Get the collection
                          </span>
                          <a 
                            href={data.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-[#ededed] hover:text-[#a3a3a3] text-[10px] md:text-xs tracking-widest uppercase transition-colors duration-300 flex items-center gap-2 border-b border-[#333333] hover:border-[#a3a3a3] pb-1"
                          >
                            Download <span className="text-[10px]">↗</span>
                          </a>
                        </div>
                      )}
                      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 px-6 pb-6 ${data.link ? 'pt-4' : 'pt-6'}`}>
                      {projects.map((project, index) => (
                        <div key={index} className="group flex flex-col border border-[#222222] bg-[#0c0c0c] transition-all duration-300 hover:border-[#ededed] hover:bg-[#ededed] overflow-hidden">
                          
                          <div 
                            className="w-full h-32 bg-[#1a1a1a] relative overflow-hidden border-b border-[#222222] group-hover:border-[#ededed] transition-colors duration-300 cursor-zoom-in"
                            onClick={() => setSelectedImage(project.image)}
                          >
                            <img 
                              src={project.image} 
                              alt={project.title} 
                              className="w-full h-full object-contain p-4 opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                              onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full text-[#333333] text-xs uppercase tracking-widest">Image Missing</div>'; }}
                            />
                          </div>

                          <div className="flex flex-col gap-2 p-6 justify-center flex-grow">
                            <h4 className="text-[#ededed] group-hover:text-[#0a0a0a] text-sm font-light tracking-wider transition-colors duration-300">
                              {project.title}
                            </h4>
                            {project.description && (
                              <p className="text-[#737373] group-hover:text-[#333333] text-xs font-light transition-colors duration-300">
                                {project.description}
                              </p>
                            )}
                          <div className="mt-auto pt-4 flex items-center justify-between gap-2">
                              <span className="inline-block px-2 py-1 border border-[#333333] group-hover:border-[#0a0a0a] text-[#555555] group-hover:text-[#0a0a0a] text-[10px] tracking-widest uppercase w-max transition-colors duration-300">
                                {project.tech}
                              </span>
                            {project.link && (
                              <a 
                                href={project.link} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-[#737373] group-hover:text-[#0a0a0a] hover:!opacity-60 text-[10px] tracking-widest uppercase transition-opacity duration-300 flex items-center gap-1"
                              >
                                View <span className="text-xs">↗</span>
                              </a>
                            )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

      {/* Fullscreen Image Modal */}
      {selectedImage && createPortal(
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a]/95 backdrop-blur-sm p-4 md:p-8 cursor-zoom-out overflow-hidden overscroll-none touch-none"
          onClick={() => setSelectedImage(null)}
        >
            <img 
              src={selectedImage} 
              alt="Fullscreen view" 
              className="w-auto h-auto max-w-full max-h-[85vh] object-contain border border-[#222222] shadow-2xl"
            />
            <span className="absolute bottom-8 md:bottom-12 text-[#555555] text-xs tracking-[0.2em] uppercase">Click anywhere to close</span>
        </div>,
        document.body
      )}
    </div>
  );
}

export default Projects;