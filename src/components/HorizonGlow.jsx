import React from 'react';
import { motion } from 'framer-motion';
import './HorizonGlow.css';

export default function HorizonGlow() {
  // Modified the crescent path geometry so that the outer and inner curves
  // meet at the exact same start/end coordinates (X=200/800 and X=250/750).
  // This tapers the tips to needle points (0px thickness) naturally.
  // Combined with a wider edge-fade mask, the ends fade out gradually and blend smoothly.

  return (
    <div className="horizon-glow-container">
      <svg
        viewBox="0 0 1000 350"
        className="horizon-glow-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Neon Glow Filters */}
          <filter id="crescent-glow-heavy" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="28" />
          </filter>
          <filter id="crescent-glow-medium" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="12" />
          </filter>
          <filter id="crescent-glow-sharp" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3.5" />
          </filter>

          {/* Outer Crescent Body Gradient (Linear left-to-right with fade-out tips) */}
          <linearGradient id="outer-crescent-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-dark)" stopOpacity="0" />
            <stop offset="15%" stopColor="var(--color-dark)" stopOpacity="0.45" />
            <stop offset="35%" stopColor="var(--color-secondary)" stopOpacity="0.9" />
            <stop offset="50%" stopColor="var(--color-bright)" stopOpacity="1" />
            <stop offset="65%" stopColor="var(--color-secondary)" stopOpacity="0.9" />
            <stop offset="85%" stopColor="var(--color-dark)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--color-dark)" stopOpacity="0" />
          </linearGradient>

          {/* Inner Crescent Body Gradient */}
          <linearGradient id="inner-crescent-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--color-dark)" stopOpacity="0" />
            <stop offset="25%" stopColor="var(--color-dark)" stopOpacity="0.5" />
            <stop offset="50%" stopColor="var(--color-secondary)" stopOpacity="0.85" />
            <stop offset="75%" stopColor="var(--color-dark)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="var(--color-dark)" stopOpacity="0" />
          </linearGradient>

          {/* White-Hot Neon Rim Gradient */}
          <linearGradient id="rim-neon-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="20%" stopColor="#e0f2fe" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="80%" stopColor="#e0f2fe" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          {/* Vertical Stripe Gradient (Behind the Arch) */}
          <linearGradient id="stripe-grad" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.28" />
            <stop offset="100%" stopColor="var(--color-primary)" stopOpacity="0.00" />
          </linearGradient>

          {/* Under-Arch Eclipse Shadow Gradient */}
          <radialGradient id="eclipse-shadow-grad" cx="50%" cy="100%" r="100%">
            <stop offset="0%" stopColor="#000000" stopOpacity="1.0" />
            <stop offset="75%" stopColor="#030206" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.0" />
          </radialGradient>

          {/* ─── Horizontal Edge Fading Mask (Sayha Edges) ─── */}
          {/* Smoothly fades out the left and right ends of the SVG to prevent sharp borders */}
          <linearGradient id="edge-fade-mask" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="20%" stopColor="#000000" /> {/* Left tip (at X=200) starts at 0% opacity */}
            <stop offset="40%" stopColor="#ffffff" /> {/* Mid-width is fully opaque */}
            <stop offset="60%" stopColor="#ffffff" /> 
            <stop offset="80%" stopColor="#000000" /> {/* Right tip (at X=800) ends at 0% opacity */}
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
          <mask id="portal-mask">
            <rect x="0" y="0" width="1000" height="350" fill="url(#edge-fade-mask)" />
          </mask>
        </defs>

        {/* ─── MASKED CONTAINER GROUP (Everything inside fades at the sides) ─── */}
        <g mask="url(#portal-mask)">
          {/* 1. VERTICAL LIGHT STRIPES (Background) */}
          <g opacity="0.55">
            <rect x="320" y="100" width="12" height="250" fill="url(#stripe-grad)" filter="url(#crescent-glow-medium)" />
            <rect x="380" y="70" width="18" height="280" fill="url(#stripe-grad)" filter="url(#crescent-glow-medium)" />
            <rect x="440" y="90" width="10" height="260" fill="url(#stripe-grad)" filter="url(#crescent-glow-medium)" />
            <rect x="500" y="50" width="22" height="300" fill="url(#stripe-grad)" filter="url(#crescent-glow-medium)" />
            <rect x="560" y="90" width="10" height="260" fill="url(#stripe-grad)" filter="url(#crescent-glow-medium)" />
            <rect x="620" y="70" width="18" height="280" fill="url(#stripe-grad)" filter="url(#crescent-glow-medium)" />
            <rect x="680" y="100" width="12" height="250" fill="url(#stripe-grad)" filter="url(#crescent-glow-medium)" />
          </g>

          {/* 2. BACK AMBIENT GLOW (Diffused Purple/Blue Gas) */}
          <path
            d="M 180,350 A 320,150 0 0,1 820,350"
            fill="none"
            stroke="var(--color-dark)"
            strokeWidth="80"
            filter="url(#crescent-glow-heavy)"
            opacity="0.8"
          />
          <path
            d="M 200,350 A 300,140 0 0,1 800,350"
            fill="none"
            stroke="var(--color-secondary)"
            strokeWidth="45"
            filter="url(#crescent-glow-heavy)"
            opacity="0.65"
          />

          {/* 3. OUTER CRESCENT ARCH (Main Thick Gradient Body) */}
          {/* Outer and inner curves start and end at the exact same points (200,350) and (800,350) to taper perfectly */}
          <path
            d="M 200,350 A 300,140 0 0,1 800,350 A 300,115 0 0,0 200,350 Z"
            fill="url(#outer-crescent-grad)"
          />

          {/* 4. OUTER NEON HIGHLIGHT RIMS */}
          {/* Soft Violet/Bright Rim Glow */}
          <path
            d="M 199,350 A 301,140.5 0 0,1 801,350"
            fill="none"
            stroke="var(--color-bright)"
            strokeWidth="16"
            filter="url(#crescent-glow-medium)"
            opacity="0.9"
          />
          {/* Sharp White-Hot Neon Core Rim */}
          <motion.path
            d="M 200,350 A 300,140 0 0,1 800,350"
            fill="none"
            stroke="url(#rim-neon-grad)"
            strokeWidth="5"
            filter="url(#crescent-glow-sharp)"
            opacity="0.98"
            animate={{ opacity: [0.85, 1.0, 0.85] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          {/* Crisp Center Hairline */}
          <path
            d="M 200,350 A 300,140 0 0,1 800,350"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.5"
            opacity="0.8"
          />

          {/* 5. INNER CRESCENT ARCH (Second Concentric Ring) */}
          {/* Outer and inner curves meet at X=250 and X=750 to taper perfectly */}
          <path
            d="M 250,350 A 250,110 0 0,1 750,350 A 250,95 0 0,0 250,350 Z"
            fill="url(#inner-crescent-grad)"
          />
          {/* Inner Neon Guideline */}
          <path
            d="M 250,350 A 250,110 0 0,1 750,350"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="2.5"
            filter="url(#crescent-glow-sharp)"
            opacity="0.8"
          />
          <path
            d="M 250,350 A 250,110 0 0,1 750,350"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1"
            opacity="0.65"
          />

          {/* 6. CORE ECLIPSE SHADOW (Dark Area Under the Inner Arch) */}
          <path
            d="M 250,350 A 250,95 0 0,1 750,350 Z"
            fill="url(#eclipse-shadow-grad)"
          />
          <path
            d="M 260,350 A 240,85 0 0,1 740,350 Z"
            fill="#000000"
            opacity="0.98"
          />
        </g>
      </svg>
    </div>
  );
}
