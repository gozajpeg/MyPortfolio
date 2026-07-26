import { useState } from 'react';
import { useIsMobile } from '../../hooks/useIsMobile';
import { featuredData } from '../../data/Projects/Featured/featuredData';
import { screensaverData } from '../../data/Projects/Others/screensaverData';
import { logoData } from '../../data/Projects/Others/logoData';
import { npmData } from '../../data/Projects/Others/npmData';

const CATEGORIES = [
  { key: 'featured', label: 'Featured', data: featuredData },
  { key: 'screensaver', label: 'Screensavers', data: screensaverData },
  { key: 'logos', label: 'Logos', data: logoData },
  { key: 'npm', label: 'NPM', data: npmData },
];

/* ── LIGHTBOX ──────────────────────────────────────────────── */
function Lightbox({ src, onClose }) {
  if (!src) return null;
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[1000] bg-black/90 flex items-center justify-center p-6"
    >
      <img
        src={src}
        alt="Preview"
        className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
        onClick={e => e.stopPropagation()}
      />
      <button
        onClick={onClose}
        className="absolute top-5 right-6 bg-transparent border-none text-white text-2xl cursor-pointer opacity-70 font-mono"
      >
        ✕
      </button>
    </div>
  );
}

/* ── EXPANDED CONTENT ──────────────────────────────────────── */
function ExpandedContent({ project, imgIdx, setImgIdx, setLightbox, isMobile }) {
  const images = project.images?.length ? project.images : project.image ? [project.image] : [];
  const hasImages = images.length > 0;

  return (
    <div className="animate-expand-in flex-1 min-h-[200px] flex flex-col sm:flex-row gap-4 sm:gap-6 py-2.5 pb-4.5 overflow-hidden">
      {/* Image pane */}
      {hasImages && (
        <div
          onClick={() => setLightbox(images[imgIdx])}
          className="relative shrink-0 w-full sm:w-[50%] aspect-video rounded-xl overflow-hidden cursor-zoom-in bg-[#141414] border border-white/[0.07] flex items-center justify-center p-2.5"
        >
          <img
            src={images[imgIdx]}
            alt={project.title}
            className="max-w-full max-h-full w-auto h-auto object-contain block transition-transform duration-300 hover:scale-105"
          />
          {images.length > 1 && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-black/70 rounded-md py-1 px-2.5 font-mono text-[10px] text-white/80">
              <button
                onClick={e => { e.stopPropagation(); setImgIdx(p => Math.max(0, p - 1)); }}
                className="bg-transparent border-none color-inherit cursor-pointer text-base leading-none px-0.5 flex items-center"
              >
                ‹
              </button>
              {imgIdx + 1} / {images.length}
              <button
                onClick={e => { e.stopPropagation(); setImgIdx(p => Math.min(images.length - 1, p + 1)); }}
                className="bg-transparent border-none color-inherit cursor-pointer text-base leading-none px-0.5 flex items-center"
              >
                ›
              </button>
            </div>
          )}
        </div>
      )}

      {/* Details pane */}
      <div className="flex-1 min-w-0 flex flex-col justify-between gap-2.5 overflow-hidden">
        <p className="font-sans text-xs sm:text-sm font-normal text-ink-soft leading-relaxed m-0 overflow-hidden line-clamp-5 sm:line-clamp-6">
          {project.summary || project.description}
        </p>

        {(project.languages?.length || project.tech) && (
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {(project.languages ?? [project.tech]).map(t => (
              <span key={t} className="font-mono text-[10px] font-medium text-ink-muted uppercase tracking-wider">{t}</span>
            ))}
          </div>
        )}

        {project.link && project.link !== 'Unreleased' && (
          <div className="relative bg-[#141414] border border-[#252525] rounded-xl h-[42px] w-[130px] shadow-[0_2px_4px_rgba(0,0,0,0.5)] mt-1.5 shrink-0">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 flex items-center justify-center gap-1.5 font-mono text-[11px] font-bold text-bg bg-[#EDEAE3] border border-[#252525] border-b-[4px] rounded-xl shadow-[inset_0_1.5px_0_rgba(255,255,255,0.4)] uppercase tracking-wider no-underline transition-all duration-75 hover:border-b-[2px] hover:translate-y-[2px] active:border-b-0 active:translate-y-[4px]"
            >
              View project ↗
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── PROJECT LIST ──────────────────────────────────────────── */
function ProjectList({ items, expandedTitle, onToggle, imgIdx, setImgIdx, setLightbox, isMobile }) {
  return (
    <div className="flex-1 overflow-y-auto no-scrollbar pr-1">
      {items.map((project, i) => {
        const isOpen = expandedTitle === project.title;
        return (
          <div
            key={project.title}
            className={`border-white/[0.05] overflow-hidden flex flex-col transition-all duration-300 ${i < items.length - 1 ? 'border-b' : ''}`}
          >
            {/* Row header */}
            <button
              type="button"
              onClick={() => onToggle(project.title)}
              className="w-full flex items-center gap-3 py-3 sm:py-3.5 bg-transparent border-none cursor-pointer text-left shrink-0"
            >
              <span className="font-mono text-[10px] font-semibold text-ink-muted shrink-0 min-w-[22px]">
                {String(i + 1).padStart(2, '0')}
              </span>
              <p className={`font-display text-sm sm:text-base md:text-lg font-bold m-0 flex-1 truncate tracking-tight transition-colors duration-200 ${isOpen ? 'text-ink' : 'text-ink-soft'}`}>
                {project.title}
              </p>
              {project.date && !isMobile && (
                <span className="font-mono text-[10px] text-ink-muted shrink-0">
                  {project.date}
                </span>
              )}
              <span className={`font-mono text-base text-ink-muted shrink-0 transition-all duration-300 w-4 text-center leading-none ${isOpen ? 'rotate-45 text-ink' : 'rotate-0'}`}>
                +
              </span>
            </button>

            {/* Height-transitioned container for expanded content to avoid overlap */}
            <div
              className="transition-all duration-300 ease-in-out overflow-hidden"
              style={{
                maxHeight: isOpen ? '1000px' : '0px',
                opacity: isOpen ? 1 : 0,
              }}
            >
              {isOpen && (
                <ExpandedContent
                  project={project}
                  imgIdx={imgIdx}
                  setImgIdx={setImgIdx}
                  setLightbox={setLightbox}
                  isMobile={isMobile}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── DESKTOP ───────────────────────────────────────────────── */
function ProjectsDesktop({ activeCat, setActiveCat, expandedTitle, onToggle, imgIdx, setImgIdx, setLightbox }) {
  const catData = CATEGORIES.find(c => c.key === activeCat);
  const items = catData?.data?.items ?? [];
  return (
    <div className="h-full w-full overflow-hidden grid grid-cols-[clamp(110px,13vw,165px)_1fr] p-6 sm:p-10 md:p-12 gap-0">
      {/* Sidebar */}
      <div className="flex flex-col gap-1 pr-4 sm:pr-5 border-r border-white/5 overflow-hidden shrink-0">
        <span className="font-mono text-[9px] font-bold text-ink-muted uppercase tracking-widest mb-2.5 shrink-0">Category</span>
        {CATEGORIES.map(cat => (
          <button
            key={cat.key}
            type="button"
            onClick={() => setActiveCat(cat.key)}
            className={`border-none rounded-lg py-2 px-3 text-left cursor-pointer font-display text-xs sm:text-sm font-bold transition-all shrink-0 truncate ${activeCat === cat.key ? 'bg-white/[0.08] text-ink' : 'bg-transparent text-ink-soft'}`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* List area */}
      <div className="flex flex-col overflow-hidden pl-5 sm:pl-8 md:pl-10 pr-3">
        <span className="font-mono text-[9px] font-bold text-ink-muted uppercase tracking-widest mb-2.5 shrink-0">
          {catData?.data?.categoryTitle}
        </span>
        <ProjectList items={items} expandedTitle={expandedTitle} onToggle={onToggle} imgIdx={imgIdx} setImgIdx={setImgIdx} setLightbox={setLightbox} isMobile={false} />
      </div>
    </div>
  );
}

/* ── MOBILE ────────────────────────────────────────────────── */
function ProjectsMobile({ activeCat, setActiveCat, expandedTitle, onToggle, imgIdx, setImgIdx, setLightbox }) {
  const catData = CATEGORIES.find(c => c.key === activeCat);
  const items = catData?.data?.items ?? [];
  return (
    <div className="h-full w-full overflow-hidden flex flex-col p-4 sm:p-5 gap-3">
      {/* Tab strip */}
      <div className="flex gap-3 py-1.5 shrink-0 overflow-x-auto no-scrollbar">
        {CATEGORIES.map(cat => {
          const isActive = activeCat === cat.key;
          return (
            <div key={cat.key} className="relative bg-[#141414] border border-[#252525] rounded-lg h-[34px] w-[95px] shrink-0 shadow-[0_1px_2px_rgba(0,0,0,0.5)]">
              <button
                type="button"
                onClick={() => setActiveCat(cat.key)}
                className={`absolute inset-0 flex items-center justify-center font-mono text-[9px] font-bold uppercase tracking-wider transition-all duration-75 rounded-lg border border-[#252525] ${isActive
                  ? 'text-bg bg-[#EDEAE3] border-b-[3px] translate-y-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]'
                  : 'text-ink-soft bg-[#1A1A1A] border-b-[3px] hover:bg-[#222222] shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] hover:border-b-[2px] hover:translate-y-[1px] active:border-b-0 active:translate-y-[3px]'
                  }`}
              >
                {cat.label}
              </button>
            </div>
          );
        })}
      </div>
      <span className="font-mono text-[9px] font-bold text-ink-muted uppercase tracking-widest shrink-0">
        {catData?.data?.categoryTitle}
      </span>
      <ProjectList items={items} expandedTitle={expandedTitle} onToggle={onToggle} imgIdx={imgIdx} setImgIdx={setImgIdx} setLightbox={setLightbox} isMobile />
    </div>
  );
}

/* ── ROOT ──────────────────────────────────────────────────── */
export default function ProjectsBento() {
  const isMobile = useIsMobile();
  const [activeCat, setActiveCat] = useState('featured');
  const [expandedTitle, setExpandedTitle] = useState(null);
  const [imgIdx, setImgIdx] = useState(0);
  const [lightbox, setLightbox] = useState(null);

  const handleCatChange = (key) => { setActiveCat(key); setExpandedTitle(null); setImgIdx(0); };
  const handleToggle = (title) => { setExpandedTitle(prev => prev === title ? null : title); setImgIdx(0); };

  const sharedProps = { activeCat, setActiveCat: handleCatChange, expandedTitle, onToggle: handleToggle, imgIdx, setImgIdx, setLightbox };

  return (
    <div className="animate-content-reveal h-full w-full overflow-hidden">
      {isMobile ? <ProjectsMobile {...sharedProps} /> : <ProjectsDesktop {...sharedProps} />}
      <Lightbox src={lightbox} onClose={() => setLightbox(null)} />
    </div>
  );
}