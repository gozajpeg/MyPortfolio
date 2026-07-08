import {frenslynkImg} from '../../../assets/FrensLynk/frenslynk';
import {polluImg} from '../../../assets/Pollu.io/pollu';
import {gradiatorImg} from '../../../assets/Gradiator/gradiator';
import {auditrazeImg} from '../../../assets/AudiTraze/auditraze';

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
      title: 'Gradiator',
      date: 'Est. June 2026',
      role: 'Creator / Developer',
      description: 'Gradiant Generator and Color Palette Tool for Designers and Developers.',
      languages: ['React', 'Tailwind'],
      summary: 'Gradiator is a gradient generator and color palette tool designed for designers and developers. It allows users to create, customize, and export gradients and color palettes for use in web and graphic design projects.',
      image: gradiatorImg.Gradiator01,
      images: [gradiatorImg.Gradiator01, gradiatorImg.Gradiator02, gradiatorImg.Gradiator03],
    },
    {
      title: 'AudiTraze',
      date: 'Est. July 2026',
      role: 'Founder / Developer',
      description: 'AudiTraze specialize in securing, storing and managing a tamper-proof audit logs in real-time.',
      languages: ['React', 'Tailwind', 'Node.js/Fastify'],
      summary: 'AudiTraze is a platform where you can store and manage your audit-logs in real-time. It provides a secure and tamper-proof solutions for business and/or organizations to ensure the integrity and authenticity of their audit logs. AudiTraze can\'t be modifired or tampered data once it is stored, securing the records and audits in one place.',
      image: auditrazeImg.AudiTraze01,
      images: [auditrazeImg.AudiTraze01, auditrazeImg.AudiTraze02, auditrazeImg.AudiTraze03],
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