import { logoAssets } from '../../../assets/logo/logo';
import { gradiatorImg } from '../../../assets/Gradiator/gradiator'
import { auditrazeImg } from '../../../assets/AudiTraze/auditraze'
import { ceriumImg } from '../../../assets/Cerium/cerium'

const { gozalogoImg } = logoAssets;
const { GradiatorLogo } = gradiatorImg;
const { AudiTrazeLogo } = auditrazeImg;
const { CeriumLogo, CeriumNewLogo } = ceriumImg;
export const logoData = {
  categoryTitle: 'Logos & Branding',
  items: [
    {
      title: 'RAG',
      description: 'A custom logo and visual identity created for my personal brand, reflecting my style and values.',
      tech: 'Framer/Figma',
      image: gozalogoImg,
    },
    {
      title: 'Gradiator',
      description: ' Gradient Generator and Color Palette Tool for Designers and Developers.',
      tech: 'Framer/Figma',
      image: GradiatorLogo,
    },
    {
      title: 'AudiTraze',
      description: 'An official logo and branding for AudiTraze, a company that specializes in automotive technology and services.',
      tech: 'Framer/Figma',
      image: AudiTrazeLogo,
    },
    {
      title: 'Cerium',
      description: 'An official logo and branding for Cerium, An AI-powered bot testing and website quality assurance.',
      tech: 'Framer/Figma',
      image: CeriumLogo,
    },
    {
      title: 'Cerium [Redesigned]',
      description: 'A redesigned and official new logo and branding for Cerium, An AI-powered bot testing and website quality assurance.',
      tech: 'Framer/Figma',
      image: CeriumNewLogo,
    }
  
  ]
};