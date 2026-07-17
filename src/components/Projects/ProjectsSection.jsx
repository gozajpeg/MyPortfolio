import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { primaryWorksCategories, otherWorksCategories } from '../../data/Projects/projectData';

function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedCategory, setExpandedCategory] = useState(null);

  // Lock scrolling on body when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProject]);

  return (
    <section id="projects" className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      {/* Headline Banner */}
      <div className="bg-[#a3e635] neo-border neo-shadow p-6 mb-12">
        <h2 className="font-display font-black text-4xl md:text-6xl tracking-tighter uppercase text-[#050505] leading-none">
          Projects
        </h2>
        <p className="font-mono text-sm uppercase tracking-wider text-[#050505] mt-2 font-semibold">
          Featured Systems, Toolkits, & Creative Ventures
        </p>
      </div>

      <div className="space-y-16">
        {/* Featured Projects */}
        {primaryWorksCategories.map((data, catIndex) => (
          <div key={catIndex} className="space-y-8">
            <div className="border-b-4 border-black pb-2">
              <h3 className="font-display font-black text-2xl md:text-3xl uppercase text-[#050505]">
                {data.categoryTitle}
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {data.items.map((project, index) => (
                <div
                  key={index}
                  className={`bg-white neo-border neo-shadow flex flex-col justify-between group ${project.image || (project.images && project.images.length > 0) ? 'cursor-pointer' : ''
                    }`}
                  onClick={() => {
                    if (project.image || (project.images && project.images.length > 0)) {
                      setSelectedProject(project);
                      setCurrentImageIndex(0);
                    }
                  }}
                >
                  <div>
                    {/* Project Header Image */}
                    <div className="h-48 bg-zinc-100 border-b-4 border-black relative overflow-hidden flex items-center justify-center p-6">
                      {project.image || (project.images && project.images.length > 0) ? (
                        <img
                          src={project.image || project.images[0]}
                          alt={project.title}
                          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <span className="font-mono text-sm uppercase tracking-wider font-bold text-zinc-400">
                          Coming Soon &bull; TBA
                        </span>
                      )}
                    </div>

                    <div className="p-6 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-display font-black text-2xl uppercase tracking-tight text-[#050505]">
                          {project.title}
                        </h4>
                        <span className="font-mono text-xs font-bold text-zinc-500">
                          {project.date}
                        </span>
                      </div>
                      <p className="font-sans text-sm text-zinc-600 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Badges footer */}
                  {project.languages && project.languages.length > 0 && (
                    <div className="px-6 pb-6 pt-2 flex flex-wrap gap-2">
                      {project.languages.map((lang, idx) => (
                        <span key={idx} className="px-2 py-1 bg-[#22d3ee] border-2 border-black text-[#050505] font-mono text-[10px] font-bold uppercase">
                          {lang}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Other Works Accordion */}
        <div className="space-y-8">
          <div className="border-b-4 border-black pb-2">
            <h3 className="font-display font-black text-2xl md:text-3xl uppercase text-[#050505]">
              Other Works
            </h3>
          </div>

          <div className="space-y-4">
            {otherWorksCategories.map((data, catIndex) => {
              const category = data.categoryTitle;
              const isExpanded = expandedCategory === category;

              return (
                <div key={catIndex} className="bg-white neo-border neo-shadow flex flex-col">
                  {/* Header Button */}
                  <button
                    type="button"
                    onClick={() => setExpandedCategory(isExpanded ? null : category)}
                    className="flex items-center justify-between p-6 text-left outline-none cursor-pointer w-full hover:bg-zinc-50"
                  >
                    <span className="font-display font-black text-lg uppercase text-[#050505]">
                      {category}
                    </span>
                    <span className="font-mono font-bold text-2xl">
                      {isExpanded ? '[-]' : '[+]'}
                    </span>
                  </button>

                  {/* Accordion Content */}
                  {isExpanded && (
                    <div className="border-t-4 border-black bg-zinc-50 p-6 space-y-6">
                      {data.link && (
                        <div className="flex items-center justify-between pb-4 border-b-2 border-black">
                          <span className="font-mono text-xs font-bold text-zinc-500 uppercase">
                            Collection Details
                          </span>
                          {data.link !== 'Unreleased' ? (
                            <a
                              href={data.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 py-1 bg-[#ff6b00] border-2 border-black text-white font-mono text-xs uppercase font-bold shadow-[2px_2px_0px_#050505] hover:translate-x-[-1px] hover:translate-y-[-1px]"
                            >
                              Download ↗
                            </a>
                          ) : (
                            <span className="px-3 py-1 bg-zinc-300 border-2 border-black text-zinc-600 font-mono text-xs uppercase font-bold">
                              Unreleased
                            </span>
                          )}
                        </div>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {data.items.map((project, index) => (
                          <div
                            key={index}
                            className="bg-white border-4 border-black p-5 flex flex-col justify-between shadow-[4px_4px_0px_#050505]"
                          >
                            <div className="space-y-3">
                              {project.image && (
                                <div className="h-28 bg-zinc-50 border-2 border-black flex items-center justify-center p-3 overflow-hidden">
                                  <img
                                    src={project.image}
                                    alt={project.title}
                                    className="max-h-full max-w-full object-contain"
                                  />
                                </div>
                              )}
                              <h4 className="font-display font-black text-lg uppercase text-[#050505]">
                                {project.title}
                              </h4>
                              <p className="font-sans text-xs text-zinc-600 leading-relaxed">
                                {project.description}
                              </p>
                            </div>

                            <div className="pt-4 flex items-center justify-between">
                              <span className="px-2 py-0.5 bg-[#fde047] border-2 border-black font-mono text-[9px] font-bold uppercase">
                                {project.tech}
                              </span>
                              {project.link && (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="font-mono text-xs font-bold uppercase text-[#050505] border-b-2 border-black hover:pb-1 transition-all"
                                >
                                  View ↗
                                </a>
                              )}
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

      {/* Details Preview Modal */}
      {selectedProject && createPortal(
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-[#050505]/80 backdrop-blur-sm"
            onClick={() => setSelectedProject(null)}
          ></div>

          {/* Modal Container */}
          <div className="relative w-full max-w-4xl bg-white neo-border neo-shadow-lg flex flex-col md:flex-row overflow-hidden max-h-[85vh] z-10">
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-17 right-4 z-20 w-10 h-10 flex items-center justify-center bg-white border-2 border-black text-[#050505] font-bold text-xl hover:bg-[#ff6b00] transition-colors"
            >
              &times;
            </button>

            {/* Left side: Images */}
            <div className="w-full md:w-3/5 bg-zinc-50 flex flex-col justify-between border-b-4 md:border-b-0 md:border-r-4 border-black relative min-h-[30vh]">
              <div className="flex-1 flex items-center justify-center p-6 min-h-[250px]">
                {(() => {
                  const images = selectedProject.images || (selectedProject.image ? [selectedProject.image] : []);
                  if (images.length === 0) return <span className="font-mono text-zinc-400">No Previews Available</span>;
                  return (
                    <img
                      src={images[currentImageIndex]}
                      alt={selectedProject.title}
                      className="max-h-[350px] max-w-full object-contain"
                    />
                  );
                })()}
              </div>

              {/* Slider Dots/Arrows if multi-image */}
              {selectedProject.images && selectedProject.images.length > 1 && (
                <div className="bg-white border-t-2 border-black p-3 flex items-center justify-between">
                  <button
                    onClick={() => setCurrentImageIndex(prev => (prev === 0 ? selectedProject.images.length - 1 : prev - 1))}
                    className="px-3 py-1 border-2 border-black bg-[#a3e635] text-xs font-mono font-bold"
                  >
                    &larr; Prev
                  </button>
                  <span className="font-mono text-xs font-bold">
                    {currentImageIndex + 1} / {selectedProject.images.length}
                  </span>
                  <button
                    onClick={() => setCurrentImageIndex(prev => (prev === selectedProject.images.length - 1 ? 0 : prev + 1))}
                    className="px-3 py-1 border-2 border-black bg-[#a3e635] text-xs font-mono font-bold"
                  >
                    Next &rarr;
                  </button>
                </div>
              )}
            </div>

            {/* Right side: Summary & Meta */}
            <div className="w-full md:w-2/5 p-6 md:p-8 flex flex-col justify-between bg-white overflow-y-auto max-h-[50vh] md:max-h-[85vh]">
              <div className="space-y-4">
                <h3 className="font-display font-black text-3xl uppercase text-[#050505]">
                  {selectedProject.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-0.5 bg-[#fde047] border-2 border-black font-mono text-[10px] font-bold uppercase">
                    {selectedProject.date}
                  </span>
                </div>
                <hr className="border-2 border-black" />
                <p className="font-sans text-sm text-zinc-700 leading-relaxed whitespace-pre-line">
                  {selectedProject.summary || selectedProject.detailedDescription || selectedProject.description}
                </p>
              </div>

              {selectedProject.languages && selectedProject.languages.length > 0 && (
                <div className="mt-6">
                  <p className="font-mono text-[11px] font-bold text-zinc-400 uppercase mb-2">Technologies Used</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.languages.map((lang, idx) => (
                      <span key={idx} className="px-2 py-1 bg-zinc-100 border-2 border-black font-mono text-[10px] font-bold uppercase">
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}

export default ProjectsSection;
