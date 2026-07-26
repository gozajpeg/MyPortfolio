import CustomCursor from './components/Layout/Cursor';
import BentoLayout from './components/Layout/BentoLayout';
import FloatMessageBar from './components/Layout/FloatMessageBar';

function App() {
  return (
    <main className="relative w-full h-dvh">
      <CustomCursor />
      <FloatMessageBar />
      <BentoLayout />
    </main>
  );
}

export default App;