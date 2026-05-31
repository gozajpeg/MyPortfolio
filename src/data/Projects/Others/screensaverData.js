import { screensaverAssets } from '../../../assets/screensavers/screensavers';

const { SS1: ss1Img, SS2: ss2Img, SS3: ss3Img } = screensaverAssets;

export const screensaverData = {
  categoryTitle: 'Screensavers',
  link: 'https://github.com/gozajpeg/Screensavers/releases',
  items: [
    {
      title: 'Canvas ScreenSaver',
      description: 'A customizable screensaver that allows users to create their own visual experience using a simple canvas interface.',
      tech: 'Python / Tkinter',
      image: ss1Img,
    },
    {
      title: 'Environment Time/Day Sync ScreenSaver',
      description: 'A dynamic screensaver that automatically adapts its visual environment to match your actual local time of day.',
      tech: 'Python / Tkinter',
      image: ss2Img,
    },
    {
      title: 'Bouncing Logo',
      description: 'Nostalgic "DVD Bouncing Animation" customizable with your own logo.',
      tech: 'Python / Tkinter',
      image: ss3Img,
    }
  ]
};