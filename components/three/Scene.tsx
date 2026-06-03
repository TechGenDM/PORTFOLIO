// @ts-nocheck
/* eslint-disable */
'use client'

import { useRef, useState, useMemo, useEffect } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Environment } from '@react-three/drei'
import * as THREE from 'three'

// ─── Shared elapsed clock ─────────────────────────────────────────────────
const clock = new THREE.Clock()

// ─── MULTI-LAYER PARTICLE SYSTEM ─────────────────────────────────────────
function ParticleSystem({ hovered }: { hovered: boolean }) {
  const outerRef  = useRef<THREE.Points>(null!)
  const innerRef  = useRef<THREE.Points>(null!)
  const cloudRef  = useRef<THREE.Points>(null!)
  const speedRef  = useRef(1)

  // Outer ring — 6 000 blue-white particles
  const [outerGeo, outerMat] = useMemo(() => {
    const N   = 6000
    const pos = new Float32Array(N * 3)
    const col = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2
      const r = 2.45 + (Math.random() - 0.5) * 0.5
      pos[i * 3]     = r * Math.cos(a) + (Math.random() - 0.5) * 0.07
      pos[i * 3 + 1] = r * Math.sin(a) + (Math.random() - 0.5) * 0.18
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.2
      const t = (Math.sin(a * 3) + 1) / 2
      col[i * 3]     = 0.55 + t * 0.45
      col[i * 3 + 1] = 0.68 + t * 0.32
      col[i * 3 + 2] = 1.0
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('color',    new THREE.BufferAttribute(col, 3))
    const mat = new THREE.PointsMaterial({
      size: 0.017, vertexColors: true,
      transparent: true, opacity: 0.88,
      sizeAttenuation: true, depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    return [geo, mat]
  }, [])

  // Inner tilted ring — 3 000 purple-blue particles
  const [innerGeo, innerMat] = useMemo(() => {
    const N   = 3000
    const pos = new Float32Array(N * 3)
    const col = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      const a = (i / N) * Math.PI * 2
      const r = 1.75 + (Math.random() - 0.5) * 0.3
      pos[i * 3]     = r * Math.cos(a) + (Math.random() - 0.5) * 0.05
      pos[i * 3 + 1] = r * Math.sin(a) + (Math.random() - 0.5) * 0.08
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.1
      col[i * 3]     = 0.45 + Math.random() * 0.3
      col[i * 3 + 1] = 0.35 + Math.random() * 0.3
      col[i * 3 + 2] = 1.0
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    geo.setAttribute('color',    new THREE.BufferAttribute(col, 3))
    const mat = new THREE.PointsMaterial({
      size: 0.013, vertexColors: true,
      transparent: true, opacity: 0.65,
      sizeAttenuation: true, depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    return [geo, mat]
  }, [])

  // Ambient sphere halo — 1 400 sparse particles
  const [cloudGeo, cloudMat] = useMemo(() => {
    const N   = 1400
    const pos = new Float32Array(N * 3)
    for (let i = 0; i < N; i++) {
      const r     = 2.1 + Math.random() * 1.4
      const theta = Math.random() * Math.PI * 2
      const phi   = Math.acos(2 * Math.random() - 1)
      pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.3
      pos[i * 3 + 2] = r * Math.cos(phi) * 0.3
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
    const mat = new THREE.PointsMaterial({
      color: '#7788ff', size: 0.009,
      transparent: true, opacity: 0.28,
      sizeAttenuation: true, depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    return [geo, mat]
  }, [])

  useFrame(() => {
    const t = clock.getElapsedTime()
    speedRef.current += ((hovered ? 2.4 : 1.0) - speedRef.current) * 0.04
    const s = speedRef.current

    if (outerRef.current)  outerRef.current.rotation.z  +=  0.003 * s
    if (innerRef.current)  innerRef.current.rotation.z  -= 0.005 * s
    if (cloudRef.current)  cloudRef.current.rotation.y  +=  0.001 * s

    outerMat.opacity = 0.74 + Math.sin(t * 1.3) * 0.14
    innerMat.opacity = 0.50 + Math.sin(t * 1.9 + 1.0) * 0.13
  })

  return (
    <group>
      <points ref={outerRef} geometry={outerGeo} material={outerMat} />
      <points ref={innerRef} geometry={innerGeo} material={innerMat}
              rotation={[Math.PI / 5, 0, 0]} />
      <points ref={cloudRef} geometry={cloudGeo} material={cloudMat} />
    </group>
  )
}

// ─── GLOWING ENERGY TORUS RINGS ─────────────────────────────────────────
function EnergyRings({ hovered }: { hovered: boolean }) {
  const refs = [
    useRef<THREE.Mesh>(null!),
    useRef<THREE.Mesh>(null!),
    useRef<THREE.Mesh>(null!),
  ]

  const mats = useMemo(() => [
    new THREE.MeshBasicMaterial({ color: '#3377ff', transparent: true, opacity: 0.22, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }),
    new THREE.MeshBasicMaterial({ color: '#9944ff', transparent: true, opacity: 0.16, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }),
    new THREE.MeshBasicMaterial({ color: '#11ccff', transparent: true, opacity: 0.12, side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false }),
  ], [])

  useFrame(() => {
    const t = clock.getElapsedTime()
    const s = hovered ? 1.7 : 1.0

    if (refs[0].current) {
      refs[0].current.rotation.z =  t * 0.28 * s
      refs[0].current.rotation.x =  Math.sin(t * 0.4) * 0.15
      mats[0].opacity = 0.18 + Math.sin(t * 1.5) * 0.09
    }
    if (refs[1].current) {
      refs[1].current.rotation.z = -t * 0.19 * s
      refs[1].current.rotation.y =  t * 0.12 * s
      mats[1].opacity = 0.12 + Math.sin(t * 2.2 + 1) * 0.07
    }
    if (refs[2].current) {
      refs[2].current.rotation.x =  t * 0.23 * s
      refs[2].current.rotation.z =  Math.cos(t * 0.35) * 0.2
      mats[2].opacity = 0.09 + Math.sin(t * 1.8 + 2) * 0.06
    }
  })

  return (
    <group>
      <mesh ref={refs[0]} material={mats[0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.47, 0.042, 8, 128]} />
      </mesh>
      <mesh ref={refs[1]} material={mats[1]} rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[2.12, 0.028, 8, 100]} />
      </mesh>
      <mesh ref={refs[2]} material={mats[2]} rotation={[Math.PI / 6, 0, 0]}>
        <torusGeometry args={[1.78, 0.020, 8, 80]} />
      </mesh>
    </group>
  )
}

// ─── ORBITING ENERGY ORBS ───────────────────────────────────────────────
function OrbitalOrbs({ hovered }: { hovered: boolean }) {
  const outerGroupRef = useRef<THREE.Group>(null!)
  const innerGroupRef = useRef<THREE.Group>(null!)
  const speedRef      = useRef(1)

  const orbGeo  = useMemo(() => new THREE.SphereGeometry(0.058, 12, 12), [])
  const smallGeo = useMemo(() => new THREE.SphereGeometry(0.036, 10, 10), [])

  const orbMat  = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#88aaff', transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending,
  }), [])
  const smallMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#cc88ff', transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending,
  }), [])

  const OUTER_ORBS = 3
  const INNER_ORBS = 2

  useFrame(() => {
    const t = clock.getElapsedTime()
    speedRef.current += ((hovered ? 1.9 : 1.0) - speedRef.current) * 0.04
    const s = speedRef.current

    if (outerGroupRef.current) {
      outerGroupRef.current.children.forEach((child, i) => {
        const a = t * 0.6 * s + (i / OUTER_ORBS) * Math.PI * 2
        child.position.set(2.47 * Math.cos(a), Math.sin(t * 0.5 + i) * 0.09, 2.47 * Math.sin(a))
      })
    }
    if (innerGroupRef.current) {
      innerGroupRef.current.children.forEach((child, i) => {
        const a = t * -0.9 * s + (i / INNER_ORBS) * Math.PI * 2
        child.position.set(1.78 * Math.cos(a), Math.sin(t * 0.8 + i * 1.5) * 0.28, 1.78 * Math.sin(a))
      })
    }

    orbMat.opacity  = 0.8  + Math.sin(t * 2.5) * 0.18
    smallMat.opacity = 0.7  + Math.sin(t * 2.0 + 1.2) * 0.18
  })

  return (
    <group>
      <group ref={outerGroupRef} rotation={[0, 0, 0]}>
        {Array.from({ length: OUTER_ORBS }).map((_, i) => (
          <mesh key={i} geometry={orbGeo} material={orbMat} />
        ))}
      </group>
      <group ref={innerGroupRef} rotation={[Math.PI / 2.5, 0, 0]}>
        {Array.from({ length: INNER_ORBS }).map((_, i) => (
          <mesh key={i} geometry={smallGeo} material={smallMat} />
        ))}
      </group>
    </group>
  )
}

// ─── REALISTIC PBR CUBE ──────────────────────────────────────────────────
function HoloCube({ hovered }: { hovered: boolean }) {
  const groupRef = useRef<THREE.Group>(null!)
  const glowRef  = useRef<THREE.Mesh>(null!)

  const mouseTarget  = useRef({ x: 0, y: 0 })
  const mouseCurrent = useRef({ x: 0, y: 0 })
  const floatOffset  = useRef(Math.random() * Math.PI * 2)
  const scaleRef     = useRef(1)

  // Full PBR physical material
  const pbr = useMemo(() => new THREE.MeshPhysicalMaterial({
    color:               new THREE.Color('#c8d8ff'),
    metalness:           1.0,
    roughness:           0.04,
    envMapIntensity:     4.0,
    clearcoat:           1.0,
    clearcoatRoughness:  0.04,
    iridescence:         0.7,
    iridescenceIOR:      1.6,
    sheen:               0.5,
    sheenColor:          new THREE.Color('#5577ff'),
    sheenRoughness:      0.25,
  }), [])

  // Edge lines
  const edgeGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(0.84, 0.84, 0.84)), [])
  const edgeMat = useMemo(() => new THREE.LineBasicMaterial({
    color: '#aaccff', transparent: true, opacity: 0.6,
    blending: THREE.AdditiveBlending,
  }), [])

  // Back-face glow shell (slightly larger)
  const glowMat = useMemo(() => new THREE.MeshBasicMaterial({
    color: '#2244ff', transparent: true, opacity: 0.055,
    side: THREE.BackSide, blending: THREE.AdditiveBlending,
  }), [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseTarget.current = {
        x:  (e.clientY / window.innerHeight - 0.5) * 0.65,
        y:  (e.clientX / window.innerWidth  - 0.5) * 0.85,
      }
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame(() => {
    const t = clock.getElapsedTime()

    // Smooth lerp mouse tilt
    mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * 0.05
    mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * 0.05

    // Float
    const floatY = Math.sin(t * 1.1 + floatOffset.current) * 0.13

    // Scale breathe
    const targetScale = hovered ? 1.08 : 1.0
    scaleRef.current  += (targetScale - scaleRef.current) * 0.06
    const breathe      = scaleRef.current + Math.sin(t * 0.9) * 0.012

    if (groupRef.current) {
      groupRef.current.position.y  = floatY
      groupRef.current.rotation.x  = mouseCurrent.current.x
      groupRef.current.rotation.y  = t * (hovered ? 0.75 : 0.38) + mouseCurrent.current.y
      groupRef.current.scale.setScalar(breathe)
    }

    // Glow shell pulse
    if (glowRef.current) {
      glowMat.opacity = 0.045 + Math.sin(t * 1.9) * 0.03
      glowRef.current.scale.setScalar(1.18 + Math.sin(t * 1.1) * 0.05)
    }

    // Edge brightness
    edgeMat.opacity = hovered
      ? 0.8 + Math.sin(t * 3.2) * 0.18
      : 0.5 + Math.sin(t * 1.6) * 0.12
  })

  // Corner vertex accent spheres
  const corners: [number, number, number][] = [
    [ 0.42,  0.42,  0.42], [-0.42,  0.42,  0.42],
    [ 0.42, -0.42,  0.42], [-0.42, -0.42,  0.42],
    [ 0.42,  0.42, -0.42], [-0.42,  0.42, -0.42],
    [ 0.42, -0.42, -0.42], [-0.42, -0.42, -0.42],
  ]

  return (
    <group ref={groupRef}>
      {/* Glow shell */}
      <mesh ref={glowRef}>
        <boxGeometry args={[0.84, 0.84, 0.84]} />
        <primitive object={glowMat} attach="material" />
      </mesh>

      {/* Main cube */}
      <mesh>
        <boxGeometry args={[0.84, 0.84, 0.84]} />
        <primitive object={pbr} attach="material" />
      </mesh>

      {/* Edge wireframe */}
      <lineSegments geometry={edgeGeo} material={edgeMat} />

      {/* Corner accent orbs */}
      {corners.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.026, 8, 8]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? '#88aaff' : '#bb88ff'}
            transparent opacity={0.92}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}

// ─── DYNAMIC LIGHTS ──────────────────────────────────────────────────────
function DynamicLights({ hovered }: { hovered: boolean }) {
  const l1 = useRef<THREE.PointLight>(null!)
  const l2 = useRef<THREE.PointLight>(null!)
  const l3 = useRef<THREE.PointLight>(null!)

  useFrame(() => {
    const t = clock.getElapsedTime()
    if (l1.current) {
      l1.current.position.set(Math.sin(t * 0.7) * 4, Math.cos(t * 0.5) * 3, 3.5)
      l1.current.intensity = (hovered ? 7 : 4.5) + Math.sin(t * 2.1) * 0.9
    }
    if (l2.current) {
      l2.current.position.set(Math.cos(t * 0.6) * 3.5, Math.sin(t * 0.8) * 2.5, -2)
      l2.current.intensity = 2.5 + Math.sin(t * 1.3 + 1) * 0.6
    }
    if (l3.current) {
      l3.current.intensity = 2.2 + Math.sin(t * 1.7 + 2) * 0.7
    }
  })

  return (
    <>
      <ambientLight intensity={0.45} color="#aabbff" />
      <pointLight ref={l1} color="#5588ff"  intensity={4.5} distance={14} />
      <pointLight ref={l2} color="#9955ff"  intensity={2.5} distance={10} />
      <pointLight ref={l3} position={[0, 3, 2]} color="#ffffff" intensity={2.2} distance={9} />
      <pointLight position={[0, -3, 1]} color="#3366ff" intensity={1.6} distance={9} />
    </>
  )
}

// ─── CANVAS WRAPPER — single canvas + CSS glow overlay ──────────────────
export default function Scene() {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      style={{ width: '100%', height: '100%', position: 'relative' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* CSS-only glow bloom — radial gradient that pulses on hover.
          Zero extra canvases = zero fiber event-listener crashes.        */}
      <div
        style={{
          position:   'absolute',
          inset:      0,
          zIndex:     1,
          pointerEvents: 'none',
          background: hovered
            ? 'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(60,100,255,0.18) 0%, rgba(100,60,255,0.10) 40%, transparent 70%)'
            : 'radial-gradient(ellipse 50% 50% at 50% 50%, rgba(40,80,220,0.12) 0%, transparent 65%)',
          transition: 'background 0.6s ease',
        }}
      />

      {/* Single high-quality Canvas — no duplicate, no crash */}
      <Canvas
        camera={{ position: [0, 0, 7], fov: 40 }}
        gl={{
          alpha: true,
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.4,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
        dpr={[1, 2]}
        style={{ position: 'relative', zIndex: 2, background: 'transparent', width: '100%', height: '100%' }}
        frameloop="always"
      >
        <Environment preset="city" />
        <DynamicLights hovered={hovered} />
        <ParticleSystem hovered={hovered} />
        <EnergyRings hovered={hovered} />
        <OrbitalOrbs hovered={hovered} />
        <HoloCube hovered={hovered} />
      </Canvas>
    </div>
  )
}
