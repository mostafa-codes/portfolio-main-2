import React from 'react';
import { motion } from 'framer-motion';
import './Singularity.css';

export default function Singularity() {
  return (
    <div className="singularity-container">
      <svg
        viewBox="0 0 800 300"
        className="singularity-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Heavy Glow Filter (For ambient gas/gravitational lensing) */}
          <filter id="lensing-glow-heavy" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="18" />
          </filter>

          {/* Medium Glow Filter */}
          <filter id="lensing-glow-medium" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" />
          </filter>

          {/* Sharp Glow Filter (For the white-hot event horizon core) */}
          <filter id="lensing-glow-sharp" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* ─── 1. BACKGROUND GLOW (Ambient Lensing Halo) ─── */}
        <motion.circle
          cx="400"
          cy="200"
          r="160"
          fill="none"
          stroke="var(--color-dark)"
          strokeWidth="60"
          filter="url(#lensing-glow-heavy)"
          opacity="0.35"
          animate={{
            scale: [0.96, 1.04, 0.96],
            opacity: [0.3, 0.45, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: '400px 200px' }}
        />

        {/* ─── 2. LENSING ARCHES (Bent Light Arcs) ─── */}
        {/* Outer Deep Purple Arch */}
        <motion.path
          d="M 260,200 A 140,140 0 0,1 540,200"
          fill="none"
          stroke="var(--color-secondary)"
          strokeWidth="10"
          filter="url(#lensing-glow-heavy)"
          opacity="0.6"
          animate={{ opacity: [0.5, 0.75, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Middle Lavender Arch */}
        <motion.path
          d="M 290,200 A 110,110 0 0,1 510,200"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="7"
          filter="url(#lensing-glow-medium)"
          opacity="0.8"
          animate={{ scaleY: [0.98, 1.02, 0.98] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: '400px 200px' }}
        />

        {/* Inner White-Hot Arch */}
        <motion.path
          d="M 320,200 A 80,80 0 0,1 480,200"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.5"
          filter="url(#lensing-glow-sharp)"
          opacity="0.9"
        />

        {/* ─── 3. GRAVITATIONAL REFLECTION (Lower Mirror Arches) ─── */}
        {/* These simulate the bottom half of the lensed light reflection */}
        <motion.path
          d="M 280,200 A 120,120 0 0,0 520,200"
          fill="none"
          stroke="var(--color-secondary)"
          strokeWidth="14"
          filter="url(#lensing-glow-heavy)"
          opacity="0.3"
        />
        <motion.path
          d="M 310,200 A 90,90 0 0,0 490,200"
          fill="none"
          stroke="var(--color-bright)"
          strokeWidth="6"
          filter="url(#lensing-glow-medium)"
          opacity="0.45"
        />
        <motion.path
          d="M 330,200 A 70,70 0 0,0 470,200"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          filter="url(#lensing-glow-sharp)"
          opacity="0.5"
        />

        {/* ─── 4. ACCRETION DISK (Horizontal Line of Material) ─── */}
        {/* Deep Purple Accretion Glow */}
        <motion.line
          x1="80" y1="200" x2="720" y2="200"
          stroke="var(--color-dark)"
          strokeWidth="24"
          filter="url(#lensing-glow-heavy)"
          opacity="0.85"
          animate={{ scaleX: [0.97, 1.03, 0.97] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: '400px 200px' }}
        />

        {/* Lavender Accretion Glow */}
        <motion.line
          x1="120" y1="200" x2="680" y2="200"
          stroke="var(--color-primary)"
          strokeWidth="12"
          filter="url(#lensing-glow-medium)"
          opacity="0.9"
        />

        {/* White Hot Accretion Core */}
        <line
          x1="160" y1="200" x2="640" y2="200"
          stroke="#ffffff"
          strokeWidth="3.5"
          filter="url(#lensing-glow-sharp)"
        />
        
        {/* Crisp Center Line */}
        <line
          x1="220" y1="200" x2="580" y2="200"
          stroke="#ffffff"
          strokeWidth="1.5"
        />

        {/* ─── 5. THE SINGULARITY SHADOW (Black Center Sphere) ─── */}
        {/* 
          The center of a black hole is a region of zero light.
          This solid black circle clips the horizontal line behind it,
          creating the signature gravitational shadow.
        */}
        <circle
          cx="400"
          cy="200"
          r="54"
          fill="#000000"
        />

        {/* ─── 6. EVENT HORIZON INNER GLOW (White-Hot Edge) ─── */}
        {/* White Event Horizon Edge Ring */}
        <motion.circle
          cx="400"
          cy="200"
          r="55"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3"
          filter="url(#lensing-glow-sharp)"
          animate={{
            scale: [1, 1.03, 1],
            opacity: [0.85, 1, 0.85]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{ transformOrigin: '400px 200px' }}
        />

        {/* Inner Lavender Horizon Border */}
        <circle
          cx="400"
          cy="200"
          r="57"
          fill="none"
          stroke="var(--color-primary)"
          strokeWidth="3"
          filter="url(#lensing-glow-medium)"
          opacity="0.8"
        />
      </svg>
    </div>
  );
}
