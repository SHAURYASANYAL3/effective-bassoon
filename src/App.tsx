import { Suspense, lazy } from 'react'
import { aboutFragments, projects, skillClusters, systemFragments } from './data/content'
import { useObserverSignals } from './hooks/useObserverSignals'
import { CustomCursor } from './components/ui/CustomCursor'
import { EntrySection } from './components/sections/EntrySection'
import { LandingSection } from './components/sections/LandingSection'
import { AboutSection } from './components/sections/AboutSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { SkillsSection } from './components/sections/SkillsSection'
import { ContactSection } from './components/sections/ContactSection'

const VoidScene = lazy(async () => {
  const mod = await import('./components/three/VoidScene')
  return { default: mod.VoidScene }
})

const App = () => {
  const { message } = useObserverSignals()

  return (
    <div className="relative min-h-screen text-slate-100">
      <CustomCursor />
      <div className="fixed inset-0 -z-10">
        <Suspense fallback={<div className="h-full w-full bg-void" />}>
          <VoidScene />
        </Suspense>
      </div>

      <div className="fixed right-6 top-6 z-50 glass-panel px-4 py-2 text-xs text-slate-300">{message}</div>

      <EntrySection lines={systemFragments} />
      <LandingSection />
      <AboutSection fragments={aboutFragments} />
      <ProjectsSection items={projects} />
      <SkillsSection clusters={skillClusters} />
      <ContactSection />
    </div>
  )
}

export default App
