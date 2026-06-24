import {frenslynkImg} from '../../../assets/FrensLynk/frenslynk';
import {polluImg} from '../../../assets/Pollu.io/pollu';

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
      title: 'Pollu.io',
      date: 'Est. June 2026',
      role: 'Creator / Developer',
      description: 'Spatial Air Quality & Pollution Monitoring Platform.',
      languages: ['React', 'Tailwind'],
      summary: 'Pollu.io is a real-time spatial monitoring platform for air quality and pollution data. It empowers users to visualize and analyze environmental conditions, enabling informed decisions for healthier living.',
      image: polluImg.Pollu1,
      images: [polluImg.Pollu1, polluImg.Pollu2, polluImg.Pollu3],
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