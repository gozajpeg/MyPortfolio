import { useState } from 'react';
import CustomCursor from './components/Layout/Cursor';
import BentoLayout from './components/Layout/BentoLayout';
import IntroSequence from './components/UI/IntroSequence';
import { useViewportHeight } from './hooks/useViewportHeight';

function App() {
  const [introFinished, setIntroFinished] = useState(false);
  useViewportHeight();

  return (
    <main
      className="relative w-full overflow-hidden"
      style={{ height: 'var(--app-height, 100svh)', maxHeight: 'var(--app-height, 100svh)' }}
    >
      <CustomCursor />
      <IntroSequence onComplete={() => setIntroFinished(true)} />
      <BentoLayout introFinished={introFinished} />
    </main>
  );
}

export default App;