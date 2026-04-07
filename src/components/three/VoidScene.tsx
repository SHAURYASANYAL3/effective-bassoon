import { useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float, Points, PointMaterial } from '@react-three/drei'
import { Bloom, ChromaticAberration, EffectComposer, Noise, Vignette } from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import * as THREE from 'three'
import { createSigilMaterial } from '../../shaders/sigilMaterial'

const ParallaxCameraRig = () => {
  const { camera, mouse } = useThree()
  const target = useRef(new THREE.Vector3(0, 0, 7))

  useFrame((_, delta) => {
    target.current.x = mouse.x * 0.45
    target.current.y = mouse.y * 0.3
    const smoothing = 1 - Math.exp(-delta * 3.2)
    camera.position.x += (target.current.x - camera.position.x) * smoothing
    camera.position.y += (target.current.y - camera.position.y) * smoothing
    camera.position.z = 7
    camera.lookAt(0, 0, 0)
  })

  return null
}

const Sigil = ({ pointer }: { pointer: React.MutableRefObject<THREE.Vector2> }) => {
  const mesh = useRef<THREE.Mesh>(null)
  const mat = useMemo(() => createSigilMaterial(), [])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    mat.uniforms.uTime.value = t
    mat.uniforms.uHeartbeat.value = (Math.sin(t * 0.45) + 1) / 2
    mat.uniforms.uPointer.value.lerp(pointer.current, 0.03)

    if (mesh.current) {
      mesh.current.rotation.y += 0.0018
      mesh.current.rotation.x = Math.sin(t * 0.2) * 0.14
      mesh.current.rotation.z = Math.cos(t * 0.17) * 0.06
    }
  })

  return (
    <Float speed={0.6} rotationIntensity={0.18} floatIntensity={0.35}>
      <mesh ref={mesh} material={mat}>
        <torusKnotGeometry args={[1.06, 0.23, 240, 32]} />
      </mesh>
    </Float>
  )
}

const ControlRings = () => {
  const group = useRef<THREE.Group>(null)

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.elapsedTime
    group.current.rotation.z = t * 0.05
  })

  return (
    <group ref={group} rotation={[1.1, 0.2, 0]}>
      {[1.8, 2.5, 3.15].map((radius, index) => (
        <mesh key={radius} rotation={[0, index * 0.8, index * 0.6]}>
          <torusGeometry args={[radius, 0.02, 12, 220]} />
          <meshBasicMaterial color="#86a6ff" transparent opacity={0.2 - index * 0.04} />
        </mesh>
      ))}
    </group>
  )
}

const BrokenReality = () => {
  const instanced = useRef<THREE.InstancedMesh>(null)
  const temp = useMemo(() => new THREE.Object3D(), [])

  useFrame(({ clock }) => {
    if (!instanced.current) return
    const t = clock.elapsedTime
    for (let i = 0; i < 80; i++) {
      temp.position.set(Math.sin(t * 0.13 + i) * 4.8, Math.cos(t * 0.11 + i * 0.3) * 2.6, -3 + ((i % 8) - 2))
      temp.rotation.set(t * 0.08 + i, t * 0.12 + i * 0.2, t * 0.06)
      const scale = 0.05 + (i % 5) * 0.03
      temp.scale.set(scale, scale * (1.2 + (i % 2) * 0.6), scale)
      temp.updateMatrix()
      instanced.current.setMatrixAt(i, temp.matrix)
    }
    instanced.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={instanced} args={[undefined, undefined, 80]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#95adff" emissive="#24345f" emissiveIntensity={0.5} roughness={0.35} metalness={0.15} />
    </instancedMesh>
  )
}

const ReactiveParticles = ({ pointer }: { pointer: React.MutableRefObject<THREE.Vector2> }) => {
  const ref = useRef<THREE.Points>(null)
  const base = useMemo(() => {
    const arr = new Float32Array(4500)
    for (let i = 0; i < 4500; i += 3) {
      arr[i] = (Math.random() - 0.5) * 18
      arr[i + 1] = (Math.random() - 0.5) * 11
      arr[i + 2] = (Math.random() - 0.5) * 18
    }
    return arr
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    const positions = ref.current.geometry.attributes.position.array as Float32Array
    for (let i = 0; i < positions.length; i += 3) {
      const fx = pointer.current.x * 0.5
      const fy = pointer.current.y * 0.4
      positions[i] = base[i] + Math.sin(t * 0.2 + i) * 0.02 + fx
      positions[i + 1] = base[i + 1] + Math.cos(t * 0.24 + i) * 0.02 + fy
    }
    ref.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <Points ref={ref} positions={base} stride={3} frustumCulled>
      <PointMaterial size={0.015} color="#9fb2ff" transparent opacity={0.75} depthWrite={false} sizeAttenuation />
    </Points>
  )
}

const PostFx = () => (
  <EffectComposer multisampling={0}>
    <Bloom mipmapBlur luminanceThreshold={0.42} intensity={0.45} radius={0.72} />
    <ChromaticAberration blendFunction={BlendFunction.NORMAL} offset={new THREE.Vector2(0.0005, 0.0008)} />
    <Noise opacity={0.035} premultiply blendFunction={BlendFunction.SOFT_LIGHT} />
    <Vignette eskil={false} offset={0.18} darkness={0.5} />
  </EffectComposer>
)

export const VoidScene = () => {
  const pointer = useRef(new THREE.Vector2(0, 0))

  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 47 }}
      dpr={[1, 1.75]}
      gl={{ antialias: false, powerPreference: 'high-performance' }}
      onPointerMove={(event) => {
        pointer.current.set(event.pointer.x, event.pointer.y)
      }}
    >
      <color attach="background" args={['#04050B']} />
      <fog attach="fog" args={['#04050B', 4, 20]} />
      <ambientLight intensity={0.28} />
      <pointLight position={[2, 2, 3]} intensity={1.6} color="#7e9dff" />
      <directionalLight position={[-3, 1, 5]} intensity={0.3} color="#9bb3ff" />
      <ParallaxCameraRig />
      <Sigil pointer={pointer} />
      <ControlRings />
      <BrokenReality />
      <ReactiveParticles pointer={pointer} />
      <PostFx />
    </Canvas>
  )
}
