import {frenslynkImg} from '../../../assets/FrensLynk/frenslynk';

export const featuredData = {
  categoryTitle: 'Featured Work',
  items: [
    {
      title: 'FrensLynk',
      date: 'Est. Jan 2026',
      role: 'Creator / Developer',
      description: 'Social Utility Platform Empowering Real-Life Connections.',
      languages: ['React', 'Tailwind', 'Node.js/Fastify'],
      summary: 'FrensLynk is a real-time social utility designed to bridge the gap between digital safety and physical connection. We’ve replaced the awkwardness of the cold approach with a high-speed, intent-driven framework.',
      image: frenslynkImg.FrensLynk01,
      images: [frenslynkImg.FrensLynk01, frenslynkImg.FrensLynk02, frenslynkImg.FrensLynk03],
    },
    {
      title: 'Coming Soon',
      date: 'TBA',
      role: 'In Development',
      description: 'A new project is currently in the works. Stay tuned for updates!',
      languages: [],
      summary: '',
      image: null,
      images: [],
    }
  ]
};