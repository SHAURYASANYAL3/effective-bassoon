# The Fool — Cinematic Portfolio System

A React + Vite + Tailwind + React Three Fiber build designed as a calm, psychologically dominant "observing system" for Shaurya Sanyal.

## Project structure

```txt
src/
  components/
    sections/
      EntrySection.tsx
      LandingSection.tsx
      AboutSection.tsx
      ProjectsSection.tsx
      SkillsSection.tsx
      ContactSection.tsx
    three/
      VoidScene.tsx
    ui/
      CustomCursor.tsx
  data/
    content.ts
  hooks/
    useObserverSignals.ts
  shaders/
    sigilMaterial.ts
  styles/
    index.css
  App.tsx
  main.tsx
```

## Implementation notes

1. `VoidScene` renders the infinite void, fog, sigil, control rings, broken cubes (instanced), and particles.
2. `useObserverSignals` tracks motion speed, idle time, and click count to emit dynamic psychological messages.
3. Section components create the reveal flow: Entry → Landing → About → Artifacts → Skills → Contact.
4. `CustomCursor` provides dot/ring pulse behavior.
5. Scene is lazy loaded for startup performance.

## Run

```bash
npm install
npm run dev
npm run build
```
