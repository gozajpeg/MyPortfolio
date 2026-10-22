import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

const FALLBACK_READMES = {
  prins: `# prins-cli

> **npm Pre-Install Package Inspector**  
> Check unpacked size, lifecycle scripts, and dependencies before anything writes to disk.

\`\`\`bash
npm install -g prins-cli
# or run directly:
npx prins-cli <package-name>
\`\`\`

### Overview
When installing packages, standard package managers extract files before showing key metadata:
- Unpacked disk space consumed
- Number of direct dependencies
- License type
- Publisher and maintainer details
- Background installation scripts
- Deprecation warnings

**prins-cli** queries registry metadata before installation, prints a structured summary, and asks for confirmation before downloading anything to your project.`,

  depshred: `# depshred

> **Clean up your node_modules. Stop installing packages modern Node.js already has.**

\`\`\`bash
npx depshred
\`\`\`

### Why depshred?
Many codebases ship unnecessary third-party packages for tasks modern Node.js handles natively (such as \`dotenv\`, \`uuid\`, \`rimraf\`, and \`node-fetch\`).

**depshred** scans your dependencies, identifies packages you can remove, and shows the exact native Node.js standard library replacement.`,

  preva: `# preva-cli

> **Same Git, with an interactive pre-flight preview.**  
> Inspect what is leaving your machine before you push.

\`\`\`bash
npm install -g preva-cli
# or run directly:
npx preva-cli
\`\`\`

### Overview
preva-cli provides interactive diff previews and branch confirmation before executing Git commands like \`commit\`, \`push\`, and branch operations.`,
};

function MarkdownRenderer({ content, repo, branch }) {
  const renderedHtml = useMemo(() => {
    if (!content) return '';

    let raw = content;

    const rawBase = `https://raw.githubusercontent.com/gozajpeg/${repo}/${branch}/`;
    raw = raw.replace(/src=["'](?!http)(?:\.\/)?([^"']+)["']/g, `src="${rawBase}$1"`);
    raw = raw.replace(/!\[([^\]]*)\]\((?!http)(?:\.\/)?([^)]+)\)/g, `![$1](${rawBase}$2)`);

    const codeBlocks = [];
    raw = raw.replace(/```([a-z0-9_-]*)\n([\s\S]*?)```/gi, (_, lang, code) => {
      const idx = codeBlocks.length;
      codeBlocks.push({ lang: lang.trim(), code: code.trim() });
      return `__CODE_BLOCK_${idx}__`;
    });

    raw = raw.replace(/^###### (.*$)/gim, '<h6 class="text-xs font-bold text-ink-muted mt-3 mb-1">$1</h6>');
    raw = raw.replace(/^##### (.*$)/gim, '<h5 class="text-sm font-semibold text-ink-soft mt-3 mb-1.5">$1</h5>');
    raw = raw.replace(/^#### (.*$)/gim, '<h4 class="text-base font-bold text-ink mt-5 mb-2">$1</h4>');
    raw = raw.replace(/^### (.*$)/gim, '<h3 class="text-lg font-bold text-ink mt-6 mb-2">$1</h3>');
    raw = raw.replace(/^## (.*$)/gim, '<h2 class="text-xl font-bold text-ink mt-8 mb-3 pb-2 border-b border-border">$1</h2>');
    raw = raw.replace(/^# (.*$)/gim, '<h1 class="text-2xl font-bold text-ink mt-4 mb-4 pb-2 border-b border-border">$1</h1>');

    raw = raw.replace(/^---$/gim, '<hr class="border-t border-border my-6" />');

    raw = raw.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-ink">$1</strong>');
    raw = raw.replace(/\*(.*?)\*/g, '<em class="italic text-ink-soft">$1</em>');

    raw = raw.replace(/`([^`]+)`/g, '<code class="font-mono text-xs text-ink bg-surface-hover/70 border border-border px-1.5 py-0.5 rounded-md">$1</code>');

    raw = raw.replace(/^\s*[-*]\s+(.*)$/gim, '<li class="text-ink-soft text-sm leading-relaxed ml-4 list-disc">$1</li>');

    raw = raw.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="rounded-xl max-w-full my-4" loading="lazy" />');

    raw = raw.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-ink underline decoration-ink-muted hover:decoration-ink font-medium transition-colors">$1</a>');

    const lines = raw.split('\n');
    const processedLines = lines.map((line) => {
      const trimmed = line.trim();
      if (
        !trimmed ||
        trimmed.startsWith('<') ||
        trimmed.startsWith('__CODE_BLOCK_') ||
        trimmed.startsWith('<li') ||
        trimmed.startsWith('<h') ||
        trimmed.startsWith('<hr')
      ) {
        return line;
      }
      return `<p class="text-ink-soft text-sm leading-relaxed my-2.5">${line}</p>`;
    });
    raw = processedLines.join('\n');

    raw = raw.replace(/__CODE_BLOCK_(\d+)__/g, (_, idx) => {
      const { code } = codeBlocks[Number(idx)];
      const escaped = code
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');

      return `
        <div class="my-4 rounded-xl overflow-hidden border border-border bg-surface-hover/40">
          <pre class="p-4 font-mono text-xs sm:text-[13px] text-ink leading-relaxed overflow-x-auto m-0"><code>${escaped}</code></pre>
        </div>
      `;
    });

    return raw;
  }, [content, repo, branch]);

  return (
    <div
      className="readme-content space-y-3 font-sans text-ink-soft"
      dangerouslySetInnerHTML={{ __html: renderedHtml }}
    />
  );
}

export default function ReadmeFrameModal({ project, isOpen, onClose }) {
  const [markdown, setMarkdown] = useState('');
  const [loading, setLoading] = useState(true);
  const [usedFallback, setUsedFallback] = useState(false);

  useEffect(() => {
    if (!isOpen || !project) return;

    let isMounted = true;
    setLoading(true);
    setUsedFallback(false);

    const rawUrl = `https://raw.githubusercontent.com/gozajpeg/${project.repo}/${project.branch}/README.md`;

    fetch(rawUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.text();
      })
      .then((text) => {
        if (isMounted) {
          setMarkdown(text);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setMarkdown(FALLBACK_READMES[project.repo] || FALLBACK_READMES.prins);
          setUsedFallback(true);
          setLoading(false);
        }
      });

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      isMounted = false;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, project, onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && project && (
        <motion.div
          key="readme-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="fixed inset-0 z-[99990] flex items-center justify-center p-4 sm:p-6 bg-black/50 backdrop-blur-xs"
          onClick={onClose}
        >
          <motion.div
            key="readme-dialog"
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-3xl h-[80vh] max-h-[760px] theme-surface rounded-2xl border border-border-strong flex flex-col overflow-hidden shadow-xl"
            role="dialog"
            aria-modal="true"
            aria-label={`${project.name} documentation`}
          >
            <div className="flex items-center justify-between px-5 sm:px-6 py-3.5 border-b border-border shrink-0">
              <span className="font-sans text-sm font-semibold text-ink">
                {project.name}
              </span>

              <div className="flex items-center gap-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-8 px-3 rounded-xl border border-border hover:border-border-strong font-sans text-xs font-medium text-ink-soft hover:text-ink transition-colors no-underline hidden sm:inline-flex items-center"
                >
                  GitHub
                </a>
                {project.npm && (
                  <a
                    href={project.npm}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="h-8 px-3 rounded-xl border border-border hover:border-border-strong font-sans text-xs font-medium text-ink-soft hover:text-ink transition-colors no-underline hidden sm:inline-flex items-center"
                  >
                    npm
                  </a>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="h-8 px-3.5 rounded-xl bg-ink text-bg font-sans text-xs font-semibold cursor-pointer border-none hover:opacity-90 transition-opacity"
                  aria-label="Close README documentation viewer"
                >
                  Close
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 sm:p-8">
              {loading ? (
                <div className="flex items-center justify-center h-full font-sans text-xs text-ink-muted">
                  Loading documentation...
                </div>
              ) : (
                <>
                  {usedFallback && (
                    <div className="mb-5 p-3 rounded-xl border border-border bg-surface-hover/50 font-sans text-xs text-ink-muted">
                      Showing bundled package documentation.
                    </div>
                  )}
                  <MarkdownRenderer content={markdown} repo={project.repo} branch={project.branch} />
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
