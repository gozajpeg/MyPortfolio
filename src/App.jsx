import CustomCursor from './components/Layout/Cursor'
import HeroSection from './components/Hero/HeroSection'
import AboutSection from './components/About/AboutSection'
import ProjectsSection from './components/Projects/ProjectsSection'
import SkillsSection from './components/Skills/SkillsSection'
import SocialsSection from './components/Socials/SocialsSection'

function App() {
  return (
    <main className="relative min-h-screen">
      <CustomCursor />
      <div className="flex flex-col gap-32 pb-32">
        <section id="portfolio"><HeroSection /></section>
        <section id="about"><AboutSection /></section>
        <section id="projects"><ProjectsSection /></section>
        <section id="skills"><SkillsSection /></section>
        <section id="socials"><SocialsSection /></section>
      </div>
    </main>
  )
}

export default App