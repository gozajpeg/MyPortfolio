import { frenslynkImg } from '../../../assets/FrensLynk/frenslynk';
import { polluImg } from '../../../assets/Pollu.io/pollu';
import { gradiatorImg } from '../../../assets/Gradiator/gradiator';
import { auditrazeImg } from '../../../assets/AudiTraze/auditraze';
import { ceriumImg } from '../../../assets/Cerium/cerium';

export const featuredData = {
  categoryTitle: 'Featured Work',
  items: [
    {
      title: 'Cerium',
      date: '2026',
      description: 'Automated website QA and bug detection platform powered by Playwright.',
      languages: ['React', 'Tailwind', 'Node.js/Fastify', 'PostgreSQL', 'Playwright'],
      summary: 'Cerium automates website regression testing, catching visual and functional bugs before deployment. Features a Bring Your Own Key (BYOK) architecture so users maintain full custody over their API keys and testing environments.',
      image: ceriumImg.Cerium01,
      images: [ceriumImg.Cerium01, ceriumImg.Cerium02, ceriumImg.Cerium03],
      website: 'https://cerium.vercel.app/',
    },
    {
      title: 'AudiTraze',
      date: '2026',
      description: 'Immutable, real-time audit log storage and verification system.',
      languages: ['React', 'Tailwind', 'Node.js/Fastify', 'PostgreSQL'],
      summary: 'AudiTraze provides a tamper-proof pipeline to capture, store, and verify system audit trails in real-time. Log entries cannot be mutated once written, ensuring evidentiary integrity and security compliance.',
      image: auditrazeImg.AudiTraze01,
      images: [auditrazeImg.AudiTraze01, auditrazeImg.AudiTraze02, auditrazeImg.AudiTraze03],
    },
    {
      title: 'FrensLynk',
      date: '2026',
      description: 'Real-time social connection and event discovery platform.',
      languages: ['React', 'Tailwind', 'Node.js/Fastify', 'PostgreSQL'],
      summary: 'A real-time social utility designed to bridge digital safety with in-person connection. Engineered with a low-latency Fastify REST backend and PostgreSQL database for responsive interactions.',
      image: frenslynkImg.FrensLynk01,
      images: [frenslynkImg.FrensLynk01, frenslynkImg.FrensLynk02, frenslynkImg.FrensLynk03],
      website: 'https://frenslynk.vercel.app/',
      github: 'https://github.com/gozajpeg/FrensLynk',
    },
    {
      title: 'Pollu.io',
      date: '2026',
      description: 'Spatial air quality and environmental data visualization platform.',
      languages: ['React', 'Tailwind', 'REST APIs'],
      summary: 'Pollu.io provides spatial mapping and visualization for air quality and pollution metrics, enabling users to monitor environmental health across geographic zones in real-time.',
      image: polluImg.Pollu1,
      images: [polluImg.Pollu1, polluImg.Pollu2, polluImg.Pollu3],
      website: 'https://pollu.io/',
      github: 'https://github.com/gozajpeg/Pollu.io',
    },
    {
      title: 'Gradiator',
      date: '2026',
      description: 'Gradient generator and color harmony palette tool for designers.',
      languages: ['React', 'Tailwind', 'Canvas API'],
      summary: 'A responsive color utility for creating, fine-tuning, and exporting CSS gradients and complementary color palettes for web interfaces.',
      image: gradiatorImg.Gradiator01,
      images: [gradiatorImg.Gradiator01, gradiatorImg.Gradiator02, gradiatorImg.Gradiator03],
      website: 'https://gradiator.vercel.app/',
      github: 'https://github.com/gozajpeg/Gradiator',
    },
    {
      title: 'Nganvas',
      date: '2026',
      description: 'Ingredient-first recipe discovery platform backed by Spoonacular API.',
      languages: ['React', 'Tailwind', 'Spoonacular API'],
      summary: 'An ingredient-centric culinary application that calculates viable recipes based on user pantry inventory, powered by external recipe endpoints.',
      image: null,
      images: [],
    },
  ]
};