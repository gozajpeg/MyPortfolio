import { useState, useEffect, useMemo } from 'react';

const GITHUB_USERNAME = 'gozajpeg';
const API_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;

const LEVEL_CLASSES = [
  'bg-surface-hover/60 border border-border/40',
  'bg-ink/25',
  'bg-ink/45',
  'bg-ink/70',
  'bg-ink',
];

export default function GitHubBento() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (isMounted) {
          setData(json);
          setLoading(false);
        }
      })
      .catch(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Group daily contributions into weeks (columns of 7 days) and compute summary stats once
  const { weeks, activeDays } = useMemo(() => {
    const list = data?.contributions || [];
    if (list.length === 0) return { weeks: [], activeDays: 0 };

    const grouped = [];
    let activeCount = 0;

    for (let i = 0; i < list.length; i += 7) {
      grouped.push(list.slice(i, i + 7));
    }
    for (let i = 0; i < list.length; i++) {
      if ((list[i].count || 0) > 0) activeCount++;
    }

    return { weeks: grouped, activeDays: activeCount };
  }, [data]);

  const totalLastYear = data?.total?.lastYear ?? null;

  return (
    <section
      id="github"
      aria-label="GitHub Contributions"
      className="flex flex-col gap-3.5"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-2 px-1">
        <div className="flex items-baseline gap-2.5">
          <h2 className="font-sans text-base sm:text-lg font-semibold text-ink tracking-tight m-0">
            GitHub Activity
          </h2>
          {totalLastYear !== null && (
            <span className="font-sans text-xs text-ink-soft">
              {totalLastYear} contributions in the last year
            </span>
          )}
        </div>

        <a
          href={`https://github.com/${GITHUB_USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-xs font-medium text-ink-soft hover:text-ink no-underline transition-colors"
        >
          @{GITHUB_USERNAME}
        </a>
      </div>

      <div className="theme-surface rounded-2xl border p-5 flex flex-col gap-4">
        {/* Static Live-Synced Heatmap Grid (Zero hover handlers = Zero lag) */}
        {loading ? (
          <div className="h-[108px] w-full flex items-center justify-center">
            <span className="font-sans text-xs text-ink-muted">
              Syncing GitHub contributions...
            </span>
          </div>
        ) : weeks.length > 0 ? (
          <div className="w-full overflow-x-auto no-scrollbar pb-1 pointer-events-none select-none">
            <div className="inline-grid grid-flow-col auto-cols-fr gap-[3px] min-w-[620px] w-full">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="grid grid-rows-7 gap-[3px]">
                  {week.map((day) => {
                    const level = Math.min(Math.max(day.level || 0, 0), 4);
                    return (
                      <div
                        key={day.date}
                        className={`w-full aspect-square min-w-[9px] rounded-[2.5px] ${LEVEL_CLASSES[level]}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="h-[96px] w-full flex items-center justify-between">
            <span className="font-sans text-xs text-ink-soft">
              View live commit history and open-source repositories on GitHub.
            </span>
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 px-3.5 rounded-xl border border-border hover:border-border-strong text-ink font-sans text-xs font-medium inline-flex items-center no-underline"
            >
              Open GitHub
            </a>
          </div>
        )}

        {/* Static Footer Summary & Monochrome Legend */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border">
          <span className="font-sans text-xs text-ink-muted">
            {activeDays > 0 ? ` · ${activeDays} active days this year` : ''}
          </span>

          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="font-sans text-[11px] text-ink-muted mr-1">
              Less
            </span>
            {LEVEL_CLASSES.map((cls, idx) => (
              <span
                key={idx}
                className={`w-2.5 h-2.5 rounded-[2px] ${cls}`}
              />
            ))}
            <span className="font-sans text-[11px] text-ink-muted ml-1">
              More
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
