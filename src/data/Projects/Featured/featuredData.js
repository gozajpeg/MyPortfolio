import { frenslynkImg } from '../../../assets/FrensLynk/frenslynk';
import { polluImg } from '../../../assets/Pollu.io/pollu';
import { gradiatorImg } from '../../../assets/Gradiator/gradiator';
import { auditrazeImg } from '../../../assets/AudiTraze/auditraze';
import { ceriumImg } from '../../../assets/Cerium/cerium';

export const featuredData = {
  categoryTitle: 'Featured Work',
  items: [
    {
      title: 'FrensLynk',
      date: 'Est. Jan 2026',
      description: 'Social Utility Platform Empowering Real-Life Connections.',
      languages: ['React', 'Tailwind', 'Node.js/Fastify', 'PostgreSQL'],
      summary: 'FrensLynk is a real-time social utility designed to bridge the gap between digital safety and physical connection. We’ve replaced the awkwardness of the cold approach with a high-speed, intent-driven framework.',
      image: frenslynkImg.FrensLynk01,
      images: [frenslynkImg.FrensLynk01, frenslynkImg.FrensLynk02, frenslynkImg.FrensLynk03],
      website: 'https://frenslynk.vercel.app/',
      github: 'https://github.com/gozajpeg/FrensLynk',
    },
    {
      title: 'Pollu.io',
      date: 'Est. June 2026',
      description: 'Spatial Air Quality & Pollution Monitoring Platform.',
      languages: ['React', 'Tailwind'],
      summary: 'Pollu.io is a real-time spatial monitoring platform for air quality and pollution data. It empowers users to visualize and analyze environmental conditions, enabling informed decisions for healthier living.',
      image: polluImg.Pollu1,
      images: [polluImg.Pollu1, polluImg.Pollu2, polluImg.Pollu3],
      website: 'https://pollu.io/',
      github: 'https://github.com/gozajpeg/Pollu.io',
    },
    {
      title: 'Gradiator',
      date: 'Est. June 2026',
      description: 'Gradiant Generator and Color Palette Tool for Designers and Developers.',
      languages: ['React', 'Tailwind'],
      summary: 'Gradiator is a gradient generator and color palette tool designed for designers and developers. It allows users to create, customize, and export gradients and color palettes for use in web and graphic design projects.',
      image: gradiatorImg.Gradiator01,
      images: [gradiatorImg.Gradiator01, gradiatorImg.Gradiator02, gradiatorImg.Gradiator03],
      website: 'https://gradiator.vercel.app/',
      github: 'https://github.com/gozajpeg/Gradiator',
    },
    {
      title: 'Nganvas',
      date: 'Est. June 2026',
      description: 'Ingredient-first Recipe Platform powered by Spoonacular',
      languages: ['React', 'Tailwind'],
      summary: 'Nganvas is an ingredient-first recipe platform that allows users to search for recipes based on the ingredients they have on hand. It is powered by Spoonacular API, which provides a vast database of recipes and nutritional information.',
      image: null,
      images: [],
    },
    {
      title: 'AudiTraze',
      date: 'Est. July 2026',
      description: 'AudiTraze specialize in securing, storing and managing a tamper-proof audit logs in real-time.',
      languages: ['React', 'Tailwind', 'Node.js/Fastify', 'PostgreSQL'],
      summary: 'AudiTraze is a platform where you can store and manage your audit-logs in real-time. It provides a secure and tamper-proof solutions for business and/or organizations to ensure the integrity and authenticity of their audit logs. AudiTraze can\'t be modified or tampered data once it is stored, securing the records and audits in one place.',
      image: auditrazeImg.AudiTraze01,
      images: [auditrazeImg.AudiTraze01, auditrazeImg.AudiTraze02, auditrazeImg.AudiTraze03],
    },
    {
      title: 'Cerium',
      date: 'Est. July 2026',
      description: 'Cerium is a bot testing platform that allows users to test their websites to detect bugs and errors before users encounter them.',
      languages: ['React', 'Tailwind', 'Node.js/Fastify', 'PostgreSQL', 'Playwright'],
      summary: 'Cerium is a bot testing platform that allows users to test, detects, and guide to fix bugs and errors in their websites in real-time. Cerium uses Bring Your Own Key (BYOK) concept to ensure that the users have full control over their data and privacy.',
      image: ceriumImg.Cerium01,
      images: [ceriumImg.Cerium01, ceriumImg.Cerium02, ceriumImg.Cerium03],
      website: 'https://cerium.vercel.app/',
    },
    /*{
      title: 'Coming Soon',
      date: 'TBA',
      role: 'In Development',
      description: 'A new project is currently in the works. Stay tuned for updates!',
      languages: [],
      summary: '',
      image: null,
      images: [],
    }*/
  ]
};