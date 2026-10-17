import worksLogos from '../../assets/worksLogo/worksData';

export const projectsData = [
  {
    id: 'prins',
    name: 'prins-cli',
    title: 'prins-cli',
    category: 'CLI Tool / NPM Package',
    version: '1.0.0',
    tagline: 'Pre-install npm package inspector. Know what is inside before it hits your disk.',
    repo: 'prins',
    branch: 'master',
    github: 'https://github.com/gozajpeg/prins',
    npm: 'https://www.npmjs.com/package/prins-cli',
    command: 'npm install -g prins-cli',
    logo: worksLogos.prins,
    tech: ['Node.js', 'CLI', 'NPM Registry API', 'Vitest'],
  },
  {
    id: 'depshred',
    name: 'depshred',
    title: 'depshred',
    category: 'CLI Tool / NPM Package',
    version: '1.1.1',
    tagline: 'Clean up node_modules. Stop installing third-party packages modern Node already has.',
    repo: 'depshred',
    branch: 'master',
    github: 'https://github.com/gozajpeg/depshred',
    npm: 'https://www.npmjs.com/package/depshred',
    command: 'npx depshred',
    logo: worksLogos.depshred,
    tech: ['Node.js', 'AST / Dep Check', 'Native APIs', 'Zero-Config'],
  },
  {
    id: 'priva-cli',
    name: 'priva-cli',
    title: 'priva-cli',
    category: 'CLI Tool / NPM Package',
    version: '1.0.0',
  }
];
