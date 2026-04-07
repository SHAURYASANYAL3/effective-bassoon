# The Fool — Cinematic Observer Portfolio

A premium React + Vite implementation of a calm, dominant 3D intelligence layer that blends behind HTML content.

## 1) Installation commands

```bash
npm install
npm run dev
npm run build
npm run preview
```

## 2) Folder/file structure changes

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
      VoidScene.tsx            # Full R3F scene + post FX + parallax
    ui/
      CustomCursor.tsx         # Dot -> ring cursor with glow interaction
  data/
    content.ts                 # Identity fragments, project artifacts, skills
  hooks/
    useObserverSignals.ts      # Idle / speed / scroll / click psych messages
  shaders/
    sigilMaterial.ts           # Custom glow + heartbeat + distortion shader
  styles/
    index.css
  App.tsx
  main.tsx
```

## 3) 3D scene implementation

The complete scene code is in:

- `src/components/three/VoidScene.tsx`
- `src/shaders/sigilMaterial.ts`

It includes:
- Infinite void + fog
- Central arcane torus knot with fresnel neon shader
- Rotating control rings
- Instanced drifting shards/cubes
- Reactive particles (4500 positions)
- Intentional-delay camera parallax
- Post processing: Bloom + subtle noise + chromatic edge distortion + vignette

## 4) Integrate into existing HTML (step-by-step)

### Option A — Fullscreen fixed background (current setup)
1. Keep the `VoidScene` in `App.tsx` within a fixed wrapper:
   - `position: fixed; inset: 0; z-index: -10; pointer-events: none;`
2. Keep the HTML sections in normal flow above it.
3. Preserve the radial mask + opacity blend for cinematic depth.

### Option B — Targeted container scene
1. Create a container block where you want the 3D layer:
   ```tsx
   <div className="relative h-[70vh]">
     <VoidScene />
   </div>
   ```
2. Remove `fixed inset-0` wrapper classes.
3. Use `absolute inset-0` for overlays and text.
4. If user interaction with 3D objects is needed, remove `pointer-events-none` from the scene wrapper.

## 5) Shader examples

`sigilMaterial.ts` uses custom GLSL with:
- Fresnel edge glow
- Heartbeat pulse via `uHeartbeat`
- Soft geometric distortion using hashed wave noise
- Pointer influence via `uPointer`

## 6) Optimization tips (desktop + mobile)

- Keep `dpr={[1, 1.75]}` to cap excessive retina cost.
- Use instancing for repeated fragments (`instancedMesh`).
- Avoid high-overdraw transparencies and expensive dynamic lights.
- Disable MSAA in WebGL and use bloom softly.
- Keep post FX subtle and minimal pass count.
- Lazy-load the scene (`React.lazy + Suspense`).
- Mobile mode option: reduce particles from 4500 -> 1800 and shards from 80 -> 40.

## Resize handling

`<Canvas>` handles resize automatically in React Three Fiber. If you embed in a dynamic container, ensure parent dimensions are explicitly controlled (`height/width` CSS).

## Blend with existing UI

- Keep scene behind content (`z-index` negative or lower layer)
- Keep scene non-blocking (`pointer-events: none`) for standard UI
- Add custom cursor and observer messages for the “aware system” feel
