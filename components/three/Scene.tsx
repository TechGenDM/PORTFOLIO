// @ts-nocheck
/* eslint-disable */
'use client'

import { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// === COMPONENT: ParticleRing ===
function ParticleRing() {
  const groupRef = useRef<THREE.Group>(null!)

  const [geometry, material] = useMemo(() => {
    const points = []
    for (let i = 0; i < 4000; i++) {
      const angle = (i / 4000) * Math.PI * 2
      const radiusVariation = (Math.random() - 0.5) * 0.4
      const r = 2.2 + radiusVariation
      const x = r * Math.cos(angle) + (Math.random() - 0.5) * 0.12
      const y = r * Math.sin(angle) + (Math.random() - 0.5) * 0.12
      const z = (Math.random() - 0.5) * 0.18
      points.push(x, y, z)
    }

    const positions = new Float32Array(points)
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const mat = new THREE.PointsMaterial({
      color: '#ffffff',
      size: 0.014,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
      depthWrite: false
    })

    return [geo, mat]
  }, [])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.z += 0.002
    }
  })

  return (
    <group ref={groupRef}>
      <points geometry={geometry} material={material} rotation={[0, 0, 0]} />
    </group>
  )
}

// === HELPER: Metallic Cube Params ===
function useMetallicCubeParams(size: number) {
  return useMemo(() => {
    const geo = new THREE.BoxGeometry(size, size, size)
    const mat = new THREE.MeshStandardMaterial({
      color: '#cccccc',
      metalness: 0.6,
      roughness: 0.25,
      envMapIntensity: 1
    })
    const eGeo = new THREE.EdgesGeometry(geo)
    const eMat = new THREE.LineBasicMaterial({
      color: '#ffffff',
      opacity: 0.5,
      transparent: true
    })
    return { geo, mat, eGeo, eMat }
  }, [size])
}

// === COMPONENT: SingleCube (idle state) ===
function SingleCube() {
  const cubeRef = useRef<THREE.Group>(null!)
  const { geo, mat, eGeo, eMat } = useMetallicCubeParams(0.75)

  useFrame(() => {
    if (cubeRef.current) {
      cubeRef.current.rotation.y += 0.005
      cubeRef.current.rotation.x += 0.002
    }
  })

  return (
    <group ref={cubeRef} position={[0, 0, 0]}>
      <mesh geometry={geo} material={mat} />
      <lineSegments geometry={eGeo} material={eMat} />
    </group>
  )
}

// === COMPONENT: BlockchainCubes (hovered state) ===
function BlockchainCubes() {
  const groupRef = useRef<THREE.Group>(null!)

  const centerParams = useMetallicCubeParams(0.75)
  const sideParams = useMetallicCubeParams(0.6)

  const [lineGeo, lineMat, dotGeo, dotMat] = useMemo(() => {
    const lGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-1.3, 0, 0),
      new THREE.Vector3(1.3, 0, 0)
    ])
    const lMat = new THREE.LineBasicMaterial({
      color: '#ffffff',
      opacity: 0.35,
      transparent: true
    })

    const dGeo = new THREE.SphereGeometry(0.03)
    const dMat = new THREE.MeshBasicMaterial({ color: '#ffffff' })

    return [lGeo, lMat, dGeo, dMat]
  }, [])

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.004
    }
  })

  return (
    <group ref={groupRef}>
      {/* Center Cube */}
      <group position={[0, 0, 0]}>
        <mesh geometry={centerParams.geo} material={centerParams.mat} />
        <lineSegments geometry={centerParams.eGeo} material={centerParams.eMat} />
      </group>

      {/* Left Cube */}
      <group position={[-1.3, 0, 0]}>
        <mesh geometry={sideParams.geo} material={sideParams.mat} />
        <lineSegments geometry={sideParams.eGeo} material={sideParams.eMat} />
      </group>

      {/* Right Cube */}
      <group position={[1.3, 0, 0]}>
        <mesh geometry={sideParams.geo} material={sideParams.mat} />
        <lineSegments geometry={sideParams.eGeo} material={sideParams.eMat} />
      </group>

      {/* Connecting Line */}
      <primitive object={new THREE.Line(lineGeo, lineMat)} />

      {/* Tiny Dots */}
      <mesh position={[-0.65, 0, 0]} geometry={dotGeo} material={dotMat} />
      <mesh position={[0.65, 0, 0]} geometry={dotGeo} material={dotMat} />
    </group>
  )
}

// === EXPORT WRAPPER ===
export default function Scene() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      style={{ width: '100%', height: '100%' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 7], fov: 40 }}
        gl={{ alpha: true, antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        dpr={[1, 2]}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
        frameloop="always"
      >
        <ParticleRing />
        {isHovered ? <BlockchainCubes /> : <SingleCube />}
        <ambientLight intensity={1.2} color="#ffffff" />
        <pointLight position={[3, 3, 4]} intensity={3} color="#ffffff" />
        <pointLight position={[-2, -1, 3]} intensity={1.5} color="#ffffff" />
        <pointLight position={[0, -3, 2]} intensity={0.8} color="#aaaaff" />
      </Canvas>
    </div>
  )
}
