'use client'

import { useEffect, useState } from 'react'

export default function ViewportFrame() {
  const [dims, setDims] = useState({ w: 1440, h: 900 })

  useEffect(() => {
    const update = () => setDims({ w: window.innerWidth, h: window.innerHeight })
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const pad = 8          // inset from viewport edge
  const chamferTR = 200  // top-right horizontal chamfer length  
  const chamferTRv = 55  // top-right vertical chamfer drop
  const chamferBL = 24   // bottom-left notch size
  const r = 14           // corner radius for the other two corners

  const W = dims.w - pad
  const H = dims.h - pad

  // Path draws the frame shape with:
  // - top-right: diagonal chamfer (the angled line)
  // - bottom-left: small diagonal notch (folded corner)
  // - top-left and bottom-right: slightly rounded
  const d = [
    `M ${pad + r} ${pad}`,
    `L ${W - chamferTR} ${pad}`,
    `L ${W} ${pad + chamferTRv}`,
    `L ${W} ${H - r}`,
    `Q ${W} ${H} ${W - r} ${H}`,
    `L ${pad + chamferBL} ${H}`,
    `L ${pad} ${H - chamferBL}`,
    `L ${pad} ${pad + r}`,
    `Q ${pad} ${pad} ${pad + r} ${pad}`,
    `Z`
  ].join(' ')

  return (
    <svg
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 50,
        overflow: 'visible',
      }}
    >
      <defs>
        <linearGradient id="frameGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgba(180,200,255,0.22)" />
          <stop offset="40%" stopColor="rgba(255,255,255,0.1)" />
          <stop offset="100%" stopColor="rgba(120,100,255,0.15)" />
        </linearGradient>
      </defs>
      <path
        d={d}
        fill="none"
        stroke="url(#frameGrad)"
        strokeWidth="1"
      />
      {/* Subtle glow dot at top-right chamfer corner */}
      <circle
        cx={dims.w - pad - 8}
        cy={pad + chamferTRv / 2}
        r="2"
        fill="rgba(160,180,255,0.4)"
      />
    </svg>
  )
}
