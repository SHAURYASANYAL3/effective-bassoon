import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, OrbitControls, Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { createSigilMaterial } from '../../shaders/sigilMaterial'

const Sigil = () => {
  const mesh = useRef<THREE.Mesh>(null)
  const mat = useMemo(() => createSigilMaterial(), [])

  useFrame((state) => {
    mat.uniforms.uTime.value = state.clock.elapsedTime
    if (mesh.current) {
      mesh.current.rotation.y += 0.0025
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15
    }
  })

  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.45}>
      <mesh ref={mesh} material={mat}>
        <torusKnotGeometry args={[1.05, 0.22, 220, 24]} />
      </mesh>
    </Float>
  )
}

const RingSystem = () => (
  <group rotation={[1.2, 0, 0]}>
    {[1.8, 2.4, 3].map((radius, index) => (
      <mesh key={radius} rotation={[0, index * 0.5, index * 0.9]}>
        <torusGeometry args={[radius, 0.02, 16, 160]} />
        <meshBasicMaterial color="#6f8fff" transparent opacity={0.25 - index * 0.05} />
      </mesh>
    ))}
  </group>
)

const Particles = () => {
  const points = useMemo(() => {
    const p = new Float32Array(3000)
    for (let i = 0; i < 3000; i += 3) {
      p[i] = (Math.random() - 0.5) * 16
      p[i + 1] = (Math.random() - 0.5) * 10
      p[i + 2] = (Math.random() - 0.5) * 16
    }
    return p
  }, [])

  return (
    <Points positions={points} stride={3} frustumCulled>
      <PointMaterial size={0.015} color="#99adff" transparent opacity={0.65} sizeAttenuation depthWrite={false} />
    </Points>
  )
}

const BrokenReality = () => {
  const instanced = useRef<THREE.InstancedMesh>(null)

  useFrame(({ clock }) => {
    if (!instanced.current) return
    const t = clock.elapsedTime
    const temp = new THREE.Object3D()
    for (let i = 0; i < 60; i++) {
      temp.position.set(Math.sin(t * 0.2 + i) * 4, Math.cos(t * 0.17 + i * 0.2) * 2, -2 + (i % 6))
      temp.rotation.set(t * 0.15 + i, t * 0.2 + i * 0.1, t * 0.1)
      const scale = 0.08 + (i % 5) * 0.02
      temp.scale.setScalar(scale)
      temp.updateMatrix()
      instanced.current.setMatrixAt(i, temp.matrix)
    }
    instanced.current.instanceMatrix.needsUpdate = true
  })

  return (
    <instancedMesh ref={instanced} args={[undefined, undefined, 60]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#9ab0ff" emissive="#2d3f6c" emissiveIntensity={0.35} />
    </instancedMesh>
  )
}

export const VoidScene = () => (
  <Canvas camera={{ position: [0, 0, 7], fov: 48 }} dpr={[1, 1.8]}>
    <color attach="background" args={['#05050A']} />
    <fog attach="fog" args={['#05050A', 4, 18]} />
    <ambientLight intensity={0.3} />
    <pointLight position={[2, 2, 4]} intensity={2} color="#8ca6ff" />
    <Sigil />
    <RingSystem />
    <BrokenReality />
    <Particles />
    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.15} />
  </Canvas>
)
