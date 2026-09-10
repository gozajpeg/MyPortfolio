import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '../../hooks/useIsMobile';
import DriftWall from '../UI/DriftWall';
import { featuredData } from '../../data/Projects/Featured/featuredData';
import { screensaverData } from '../../data/Projects/Others/screensaverData';
import { logoData } from '../../data/Projects/Others/logoData';
import { npmData } from '../../data/Projects/Others/npmData';

// All 14 projects compiled into the 3D drift wall
const DRIFT_PROJECTS = [
  ...featuredData.items.map((item) => ({
    ...item,
    category: 'Featured Work',
  })),
  ...screensaverData.items.map((item) => ({
    ...item,
    category: 'Screensavers',
  })),
  ...logoData.items.map((item) => ({
    ...item,
    category: 'Logos & Identity',
  })),
  ...npmData.items.map((item) => ({
    ...item,
    category: 'NPM Packages',
    href: npmData.link,
  })),
];

/* ── FULLSCREEN LIGHTBOX ───────────────────────────────────── */
function Lightbox({ src, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (src) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [src, onClose]);

  return (
    <AnimatePresence>
      {src && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        >
          <motion.img
            src={src}
            alt="Preview"
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.94, opacity: 0 }}
            transition={{ type: 'spring', damping: 26, stiffness: 350 }}
            className="max-w-[92vw] max-h-[86vh] object-contain rounded-xl shadow-2xl border border-white/10"
            onClick={(e) => e.stopPropagation()}
          />
          <button
            type="button"
            onClick={onClose}
            className="absolute top-5 right-6 bg-transparent border-none text-white/80 hover:text-white text-2xl cursor-pointer font-sans p-2"
            aria-label="Close image preview"
          >
            ✕
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── BIG STUDIO PROJECT DETAIL MODAL (Desktop & Mobile) ────── */
function ProjectDetailModal({ project, onClose, onOpenLightbox }) {
  const [activeImgIdx, setActiveImgIdx] = useState(0);

  useEffect(() => {
    setActiveImgIdx(0);
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  const images = project?.images?.length ? project.images : project?.image ? [project.image] : [];
  const currentImage = images[activeImgIdx] || project?.image;
  const techList = project?.languages || (project?.tech ? [project.tech] : []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[9990] flex items-center justify-center p-3 sm:p-6 lg:p-10 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        transition={{ type: 'spring', damping: 30, stiffness: 360 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[90vh] bg-[#141414] border border-[#252525] rounded-2xl overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,0.95)] flex flex-col"
        role="dialog"
        aria-modal="true"
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06] shrink-0 bg-surface">
          <div className="flex items-center gap-3 min-w-0">
            <span className="font-sans text-xs font-semibold text-ink-muted px-2.5 py-0.5 rounded-md bg-white/[0.04] border border-white/[0.06] shrink-0">
              {project.category || 'Project'}
            </span>
            <h2 className="font-display font-bold text-lg sm:text-xl text-ink m-0 tracking-tight truncate">
              {project.title}
            </h2>
            {project.date && (
              <span className="font-sans text-xs text-ink-muted hidden sm:inline">
                • {project.date}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="font-sans text-xs font-medium text-ink-muted hover:text-ink bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.08] rounded-lg px-3 py-1.5 cursor-pointer transition-colors shrink-0"
          >
            ✕ Close
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto no-scrollbar p-6 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-[1.3fr_1fr] gap-6 lg:gap-8 items-start">
            {/* Left Column: Big Screenshot Showcase */}
            <div className="flex flex-col gap-3">
              {currentImage && (
                <div
                  onClick={() => onOpenLightbox(currentImage)}
                  className="relative w-full aspect-video rounded-xl overflow-hidden cursor-zoom-in bg-[#181818] border border-white/[0.08] flex items-center justify-center group shadow-md"
                >
                  <img
                    src={currentImage}
                    alt={project.title}
                    className="w-full h-full object-contain block transition-transform duration-300 group-hover:scale-102"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                    <span className="font-sans text-xs text-ink bg-black/80 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to Expand ⤢
                    </span>
                  </div>
                </div>
              )}

              {/* Multiple Images Carousel Strip */}
              {images.length > 1 && (
                <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImgIdx(idx)}
                      className={`relative shrink-0 w-20 sm:w-24 aspect-video rounded-lg overflow-hidden border cursor-pointer transition-all ${idx === activeImgIdx
                        ? 'border-white/70 ring-1 ring-white/50 shadow-sm'
                        : 'border-white/10 opacity-50 hover:opacity-90'
                        }`}
                    >
                      <img src={img} alt={`Slide ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Information, Stack & CTAs */}
            <div className="flex flex-col justify-between gap-6">
              <div className="flex flex-col gap-4">
                <div>
                  <span className="font-sans text-xs font-semibold text-ink-muted uppercase tracking-wider block mb-2">
                    Overview
                  </span>
                  <p className="font-sans text-sm sm:text-base font-normal text-ink-soft leading-relaxed m-0">
                    {project.summary || project.description}
                  </p>
                </div>

                {techList.length > 0 && (
                  <div className="flex flex-col gap-2 pt-1 border-t border-white/[0.06]">
                    <span className="font-sans text-xs font-semibold text-ink-muted uppercase tracking-wider">
                      Stack & Architecture
                    </span>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {techList.map((t) => (
                        <span
                          key={t}
                          className="font-sans text-xs font-medium text-ink-soft bg-white/[0.04] border border-white/[0.08] rounded-lg px-2.5 py-1"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* CTA Action Buttons */}
              {(project.website || project.github) && (
                <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/[0.06]">
                  {project.website && (
                    <div className="relative bg-[#141414] border border-[#252525] rounded-xl h-[42px] min-w-[140px] shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center gap-1.5 font-sans text-xs font-bold text-bg bg-[#EDEAE3] border border-[#252525] border-b-[4px] rounded-xl shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] no-underline transition-all duration-75 hover:border-b-[2px] hover:translate-y-[2px] active:border-b-0 active:translate-y-[4px]"
                      >
                        Live Website ↗
                      </a>
                    </div>
                  )}
                  {project.github && (
                    <div className="relative bg-[#141414] border border-[#252525] rounded-xl h-[42px] min-w-[130px] shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="absolute inset-0 flex items-center justify-center gap-1.5 font-sans text-xs font-semibold text-ink-soft hover:text-ink bg-[#1A1A1A] border border-[#252525] border-b-[4px] rounded-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] no-underline transition-all duration-75 hover:bg-[#222222] hover:border-b-[2px] hover:translate-y-[2px] active:border-b-0 active:translate-y-[4px]"
                      >
                        GitHub ↗
                      </a>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── ROOT PROJECTS BENTO ───────────────────────────────────── */
export default function ProjectsBento({ isActive = true }) {
  const isMobile = useIsMobile();
  const [lightbox, setLightbox] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <div className="h-full w-full overflow-hidden relative bg-surface">
      {/* 3D Drift Wall - Fills entire section edge-to-edge */}
      <DriftWall
        items={DRIFT_PROJECTS}
        isActive={isActive && !selectedProject}
        columns={isMobile ? 3 : 5}
        tileWidth={isMobile ? 150 : 330}
        tileHeight={isMobile ? 100 : 220}
        gap={isMobile ? 12 : 24}
        radius={14}
        tilt={isMobile ? 8 : 14}
        turn={isMobile ? -6 : -12}
        roll={0}
        perspective={isMobile ? 850 : 1300}
        depth={isMobile ? 60 : 120}
        speed={isMobile ? 22 : 36}
        direction="up"
        variance={0.45}
        parallax={isMobile ? 0.3 : 0.65}
        lift={isMobile ? 36 : 72}
        fade={0.4}
        dim={0.68}
        grayscale={false}
        overlayColor="#090909"
        onTileClick={(item) => setSelectedProject(item)}
        className="w-full h-full"
      />

      {/* Ambient gradient scrim - seamlessly darkens background behind heading with no container box */}
      <div className="absolute inset-x-0 top-0 h-64 md:h-full md:inset-y-0 md:left-0 md:w-[580px] pointer-events-none z-[5] bg-gradient-to-b md:bg-gradient-to-r from-[#090909] via-[#090909]/90 md:via-[#090909]/80 to-transparent" />

      {/* Editorial Heading Overlay - Raw floating text, 450px width on both screens */}
      <div className="absolute z-10 pointer-events-none select-none w-[450px] max-w-[calc(100vw-32px)] top-4 left-4 sm:top-6 sm:left-6 md:top-1/2 md:-translate-y-1/2 md:left-8 lg:left-12">
        <h2 className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-[44px] text-ink uppercase tracking-tight leading-[0.95] m-0 drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
          Projects I built with passion.
        </h2>
      </div>

      {/* Big Studio Project Detail Modal with smooth entrance and exit animations */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal
            key={selectedProject.title || 'detail-modal'}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onOpenLightbox={(img) => setLightbox(img)}
          />
        )}
      </AnimatePresence>

      {/* Fullscreen Zoom Lightbox */}
      <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
    </div>
  );
}