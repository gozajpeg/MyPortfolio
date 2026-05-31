import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { primaryWorksCategories, otherWorksCategories } from '../data/Projects/projectData';

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Lock scrolling on the background when the modal is open
  useEffect(() => {
    const mainPane = document.querySelector('main');
    const asidePane = document.querySelector('aside');
    if (selectedProject) {
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
  }, [selectedProject]);

  return (
    <div className="animate-page-in w-full">
      <h2 className="text-[#555555] text-lg font-light tracking-widest uppercase mb-12">
        Projects
      </h2>

      <div className="flex flex-col gap-16 w-full max-w-4xl">
         {/* Primary/Featured Works Sections */}
        {primaryWorksCategories.map((data, catIndex) => (
          <div key={catIndex}>
            <h3 className="text-[#ededed] text-sm font-light tracking-[0.2em] uppercase mb-8 border-b border-[#222222] pb-4">
              {data.categoryTitle}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {data.items.map((project, index) => (
                <div 
                  key={index} 
                  className={`group border border-[#222222] bg-[#0c0c0c] overflow-hidden transition-all duration-300 hover:border-[#ededed] flex flex-col ${project.image || project.images ? 'cursor-pointer' : 'cursor-default'}`}
                  onClick={() => {
                    if (project.image || project.images) {
                      setSelectedProject(project);
                      setCurrentImageIndex(0);
                    }
                  }}
                >
                  <div 
                    className="w-full h-40 bg-[#1a1a1a] overflow-hidden relative border-b border-[#222222] transition-colors duration-300"
                  >
                {project.image || (project.images && project.images.length > 0) ? (
                  <img 
                    src={project.image || project.images[0]} 
                    alt={project.title} 
                    className="w-full h-full object-contain p-6 opacity-50 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
                    onError={(e) => { e.target.style.display = 'none'; e.target.parentElement.innerHTML = '<div class="flex items-center justify-center h-full text-[#333333] text-xs uppercase tracking-widest">Image Missing</div>'; }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-[#333333] group-hover:text-[#555555] text-xs uppercase tracking-widest transition-colors duration-500">Coming Soon</div>
                )}
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
        ))}

        {/* Other Works Accordion */}
        <div>
          <h3 className="text-[#ededed] text-sm font-light tracking-[0.2em] uppercase mb-8 border-b border-[#222222] pb-4">
            Other Works
          </h3>
          <div className="flex flex-col gap-4">
            {otherWorksCategories.map((data, catIndex) => {
              const category = data.categoryTitle;
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
                        <div 
                          key={index} 
                          className={`group flex flex-col border border-[#222222] bg-[#0c0c0c] transition-all duration-300 hover:border-[#ededed] hover:bg-[#ededed] overflow-hidden ${project.image || project.images ? 'cursor-pointer' : 'cursor-default'}`}
                          onClick={() => {
                            if (project.image || project.images) {
                              setSelectedProject(project);
                              setCurrentImageIndex(0);
                            }
                          }}
                        >
                          
                          <div 
                            className="w-full h-32 bg-[#1a1a1a] relative overflow-hidden border-b border-[#222222] transition-colors duration-300"
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

      {/* Project Details Modal */}
      {selectedProject && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#0a0a0a]/95 backdrop-blur-sm p-4 md:p-8">
          {/* Overlay click to close */}
          <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedProject(null)}></div>
          
          <div className="relative w-full max-w-5xl bg-[#0c0c0c] border border-[#222222] shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh] z-10 animate-page-in">
            {/* Close Button */}
            <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 z-20 text-[#555555] hover:text-[#ededed] text-3xl leading-none outline-none">&times;</button>

            {/* Pane 1: Image Gallery */}
            <div className="w-full md:w-3/5 bg-[#111111] relative flex items-center justify-center border-b md:border-b-0 md:border-r border-[#222222] min-h-[40vh] md:min-h-[60vh] group overflow-hidden">
              {(() => {
                const images = selectedProject.images || (selectedProject.image ? [selectedProject.image] : []);
                if (images.length === 0) return <span className="text-[#333333] text-xs uppercase tracking-widest">No Image</span>;
                
                return (
                  <>
                    <img src={images[currentImageIndex]} alt={selectedProject.title} className="absolute inset-0 w-full h-full p-4 md:p-8 object-contain" />
                    
                    {/* Navigation Controls (Only show if multiple images) */}
                    {images.length > 1 && (
                      <>
                        <button onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1)); }} className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[#0a0a0a]/80 border border-[#333333] text-[#ededed] hover:bg-[#ededed] hover:text-[#0a0a0a] transition-all duration-300 opacity-0 group-hover:opacity-100">&larr;</button>
                        <button onClick={(e) => { e.stopPropagation(); setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1)); }} className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[#0a0a0a]/80 border border-[#333333] text-[#ededed] hover:bg-[#ededed] hover:text-[#0a0a0a] transition-all duration-300 opacity-0 group-hover:opacity-100">&rarr;</button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {images.map((_, idx) => (
                            <span key={idx} className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${idx === currentImageIndex ? 'bg-[#ededed]' : 'bg-[#333333]'}`}></span>
                          ))}
                        </div>
                      </>
                    )}
                  </>
                );
              })()}
            </div>

            {/* Pane 2: Content Details */}
            <div className="w-full md:w-2/5 p-8 md:p-10 flex flex-col gap-6 overflow-y-auto bg-[#0c0c0c]">
              <div>
                <h3 className="text-[#ededed] text-2xl font-light tracking-wide">{selectedProject.title}</h3>
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-[#737373] text-xs tracking-widest uppercase mt-3">
                  <span>{selectedProject.role || selectedProject.tech}</span>
                  {selectedProject.date && <span>• {selectedProject.date}</span>}
                </div>
              </div>
              <div className="h-px w-full bg-[#222222]"></div>
              <p className="text-[#a3a3a3] text-sm font-light leading-relaxed whitespace-pre-wrap">
                {selectedProject.summary || selectedProject.detailedDescription || selectedProject.description || "More details coming soon."}
              </p>

              {/* Language Tags */}
              {selectedProject.languages && selectedProject.languages.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedProject.languages.map((lang, idx) => (
                    <span key={idx} className="px-3 py-1.5 border border-[#333333] bg-[#111111] text-[#a3a3a3] text-[10px] tracking-widest uppercase">
                      {lang}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

export default Projects;