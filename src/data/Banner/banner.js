import worksLogos from '../../assets/worksLogo/worksData';

/**
 * Expandable Announcement / Release Banner Configuration.
 * Add new project launches here and set `active: true` on the banner you want to feature.
 * When the user dismisses the active announcement banner, the fallback quote banner is shown.
 */
export const bannerData = [
  {
    id: 'barstile-v1',
    active: true,
    version: 'V1',
    logo: worksLogos.barstile,
    title: 'Barstile 1',
    subtitle: 'is now released publicly!',
    ctaText: 'Visit Barstile',
    ctaUrl: 'https://barstile.pages.dev',
  },
];

export const fallbackBannerQuote =
  'Building and shipping systems with confidence.';

export function getActiveBanner() {
  return bannerData.find((item) => item.active) || null;
}
