import { useState, useEffect, useMemo } from 'react';

const GITHUB_USERNAME = 'gozajpeg';
const API_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`;

const MONTH_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

const MONTH_INITIAL = [
  'J', 'F', 'M', 'A', 'M', 'J',
  'J', 'A', 'S', 'O', 'N', 'D',
];

// Shared module-level fetch cache so desktop and mobile instances never duplicate network calls
let cachedData = null;
let fetchPromise = null;

function fetchGitHubContributions() {
  if (cachedData) return Promise.resolve(cachedData);
  if (!fetchPromise) {
    fetchPromise = fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((json) => {
        cachedData = json;
        return json;
      });
  }
  return fetchPromise;
}

function formatShortDate(isoDate) {
  if (!isoDate) return '—';
  const parts = isoDate.split('-');
  if (parts.length !== 3) return isoDate;
  const monthIdx = Number(parts[1]) - 1;
  const day = Number(parts[2]);
  if (monthIdx < 0 || monthIdx > 11 || Number.isNaN(day)) return isoDate;
  return `${MONTH_SHORT[monthIdx]} ${day}`;
}

export default function GitHubBento() {
  const [data, setData] = useState(() => cachedData);
  const [loading, setLoading] = useState(() => !cachedData);

  useEffect(() => {
    let isMounted = true;
    fetchGitHubContributions()
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

  const stats = useMemo(() => {
    const list = data?.contributions || [];
    if (list.length === 0) return null;

    // Sort chronologically ascending
    const sorted = [...list].sort((a, b) =>
      String(a.date).localeCompare(String(b.date))
    );

    const monthlyTotals = new Array(12).fill(0);
    let totalCommits = 0;
    let activeDays = 0;
    let longestStreak = 0;
    let currentStreak = 0;
    let runningStreak = 0;
    let bestDay = { count: 0, date: '' };
    let latestActive = null;

    for (let i = 0; i < sorted.length; i++) {
      const item = sorted[i];
      const count = Number(item.count) || 0;
      totalCommits += count;

      if (item.date) {
        const mIdx = Number(item.date.slice(5, 7)) - 1;
        if (mIdx >= 0 && mIdx < 12) {
          monthlyTotals[mIdx] += count;
        }
      }

      if (count > 0) {
        activeDays++;
        runningStreak++;
        if (runningStreak > longestStreak) {
          longestStreak = runningStreak;
        }
        if (count >= bestDay.count) {
          bestDay = { count, date: item.date };
        }
        latestActive = { count, date: item.date };
      } else {
        runningStreak = 0;
      }
    }

    // Compute current active streak up to the latest active day or today
    for (let i = sorted.length - 1; i >= 0; i--) {
      const count = Number(sorted[i].count) || 0;
      if (count > 0) {
        currentStreak++;
      } else if (currentStreak > 0) {
        break;
      }
    }

    const maxMonthCommits = Math.max(...monthlyTotals, 1);
    const peakMonthIdx = monthlyTotals.indexOf(Math.max(...monthlyTotals));

    return {
      totalCommits: data?.total?.lastYear ?? totalCommits,
      activeDays,
      totalDays: sorted.length,
      longestStreak,
      currentStreak,
      bestDay,
      latestActive,
      monthlyTotals,
      maxMonthCommits,
      peakMonthLabel:
        peakMonthIdx >= 0 ? MONTH_SHORT[peakMonthIdx] : '',
      peakMonthCount:
        peakMonthIdx >= 0 ? monthlyTotals[peakMonthIdx] : 0,
    };
  }, [data]);

  return (
    <section
      id="github"
      aria-label="GitHub Activity and Statistics"
      className="flex flex-col gap-3"
    >
      {/* Section Header */}
      <div className="flex items-baseline justify-between gap-2 px-1">
        <h2 className="font-sans text-base sm:text-lg font-semibold text-ink tracking-tight m-0">
          GitHub Activity
        </h2>

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
        {loading ? (
          <div className="h-[210px] w-full flex items-center justify-center">
            <span className="font-sans text-xs text-ink-muted">
              Syncing GitHub stats...
            </span>
          </div>
        ) : stats ? (
          <>
            {/* 1. Top: 12-Bar Monthly Sparkline (Jan -> Dec) */}
            <div className="flex flex-col gap-2.5 pb-4 border-b border-border">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-sans text-[11px] font-medium text-ink-muted">
                  Monthly activity (Jan – Dec)
                </span>
                {stats.peakMonthCount > 0 && (
                  <span className="font-mono text-[10px] text-ink-soft">
                    Peak: {stats.peakMonthLabel} ({stats.peakMonthCount})
                  </span>
                )}
              </div>

              <div
                aria-label="12-month contribution sparkline from January to December"
                className="grid grid-cols-12 gap-1.5 items-end h-12 pt-1 select-none"
              >
                {stats.monthlyTotals.map((count, mIdx) => {
                  const ratio = count / stats.maxMonthCommits;
                  const heightPct = count === 0 ? 10 : Math.max(18, Math.round(ratio * 100));
                  const isPeak = count === stats.maxMonthCommits && count > 0;

                  return (
                    <div
                      key={MONTH_SHORT[mIdx]}
                      title={`${MONTH_SHORT[mIdx]}: ${count} contributions`}
                      className="flex flex-col items-center justify-end h-full gap-1.5"
                    >
                      <div className="w-full flex-1 flex items-end">
                        <div
                          style={{ height: `${heightPct}%` }}
                          className={`w-full rounded-[3px] transition-all duration-300 ${
                            isPeak
                              ? 'bg-ink'
                              : count > 0
                              ? 'bg-ink/55'
                              : 'bg-surface-hover border border-border/50'
                          }`}
                        />
                      </div>
                      <span
                        className={`font-mono text-[9px] leading-none ${
                          isPeak ? 'font-bold text-ink' : 'text-ink-muted'
                        }`}
                      >
                        {MONTH_INITIAL[mIdx]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 2. Middle: 2x2 Key Metrics Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {/* Total Commits */}
              <div className="rounded-xl border border-border bg-surface-hover/25 p-3 flex flex-col gap-0.5">
                <span className="font-sans text-[11px] text-ink-muted">
                  Total Commits
                </span>
                <span className="font-mono text-lg font-bold text-ink tracking-tight leading-snug">
                  {stats.totalCommits}
                </span>
                <span className="font-sans text-[10px] text-ink-soft">
                  Past 12 months
                </span>
              </div>

              {/* Longest Streak */}
              <div className="rounded-xl border border-border bg-surface-hover/25 p-3 flex flex-col gap-0.5">
                <span className="font-sans text-[11px] text-ink-muted">
                  Best Streak
                </span>
                <span className="font-mono text-lg font-bold text-ink tracking-tight leading-snug">
                  {stats.longestStreak}d
                </span>
                <span className="font-sans text-[10px] text-ink-soft">
                  Consecutive days
                </span>
              </div>

              {/* Days Active */}
              <div className="rounded-xl border border-border bg-surface-hover/25 p-3 flex flex-col gap-0.5">
                <span className="font-sans text-[11px] text-ink-muted">
                  Days Active
                </span>
                <span className="font-mono text-lg font-bold text-ink tracking-tight leading-snug">
                  {stats.activeDays}
                </span>
                <span className="font-sans text-[10px] text-ink-soft">
                  {Math.round((stats.activeDays / Math.max(stats.totalDays, 1)) * 100)}% of year
                </span>
              </div>

              {/* Most Contributions (Best Day) */}
              <div className="rounded-xl border border-border bg-surface-hover/25 p-3 flex flex-col gap-0.5">
                <span className="font-sans text-[11px] text-ink-muted">
                  Most Contributions
                </span>
                <span className="font-mono text-lg font-bold text-ink tracking-tight leading-snug">
                  {stats.bestDay.count}
                </span>
                <span className="font-sans text-[10px] text-ink-soft">
                  {stats.bestDay.date ? `On ${formatShortDate(stats.bestDay.date)}` : 'Single day peak'}
                </span>
              </div>
            </div>

            {/* 3. Bottom: Latest Contribution Footer Row */}
            <div className="flex items-center justify-between gap-2 pt-3 border-t border-border">
              <span className="font-sans text-xs text-ink-muted">
                Latest contribution
              </span>
              <span className="font-mono text-xs font-semibold text-ink">
                {stats.latestActive
                  ? `${formatShortDate(stats.latestActive.date)} · ${stats.latestActive.count} ${
                      stats.latestActive.count === 1 ? 'commit' : 'commits'
                    }`
                  : '—'}
              </span>
            </div>
          </>
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
      </div>
    </section>
  );
}
