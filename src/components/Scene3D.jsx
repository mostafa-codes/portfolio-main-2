import React, { Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import GlassTorus from './GlassTorus';

export default function Scene3D() {
  // Dynamically generate a radial gradient background inside WebGL
  // This fades to transparent at the edges so the Canvas blends seamlessly with the HTML,
  // but provides a rich purple background behind the sphere for the transmission shader to refract!
  const webglBackground = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    // Radial gradient: rich deep purple in center, fading to transparent at the outer boundaries
    const grad = ctx.createRadialGradient(128, 128, 10, 128, 128, 120);
    grad.addColorStop(0, '#1c1445'); /* Rich deep purple center */
    grad.addColorStop(0.5, '#0e082b'); /* Dark violet-purple */
    grad.addColorStop(1, 'rgba(3, 2, 6, 0)'); /* 100% transparent edges */
    
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 256, 256);
    
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Canvas
        camera={{ position: [0, 0, 3.8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Transparent canvas background */}
        
        <Suspense fallback={null}>
          {/* Ambient light for global exposure */}
          <ambientLight intensity={0.4} color="#ffffff" />
          
          {/* Saturated point lights to cast purple/magenta highlights onto the water surface */}
          <pointLight position={[-4, 3, 2]} intensity={6.0} color="#a855f7" />
          <pointLight position={[4, -3, 2]} intensity={7.0} color="#8b5cf6" />
          <pointLight position={[0, -2, 4]} intensity={5.0} color="#d946ef" />
          
          {/* Main white directional light to create sharp water specular reflections */}
          <directionalLight position={[1, 4, 1]} intensity={5.0} color="#ffffff" />

          {/* 1. Gradient Background Plane inside WebGL to feed the refraction buffer */}
          {/* Pos z=-2.5 so it is behind the sphere and the concentric rings */}
          <mesh position={[0, 0, -2.5]}>
            <planeGeometry args={[10, 10]} />
            <meshBasicMaterial 
              map={webglBackground} 
              transparent={true} 
              depthWrite={false} 
            />
          </mesh>

          {/* 2. Torus Mesh (now a 100% transparent water slime bubble with physical refractions) */}
          <GlassTorus />

          {/* 3. 3D Concentric Rings positioned directly behind the water bubble to demonstrate real refraction bending */}
          <group position={[0, 0, -1.0]}>
            <mesh>
              <ringGeometry args={[1.4, 1.415, 64]} />
              <meshBasicMaterial color="#a855f7" transparent opacity={0.2} side={THREE.DoubleSide} />
            </mesh>
            <mesh>
              <ringGeometry args={[1.9, 1.915, 64]} />
              <meshBasicMaterial color="#a855f7" transparent opacity={0.15} side={THREE.DoubleSide} />
            </mesh>
            <mesh>
              <ringGeometry args={[2.4, 2.415, 64]} />
              <meshBasicMaterial color="#a855f7" transparent opacity={0.08} side={THREE.DoubleSide} />
            </mesh>
          </group>

          {/* Studio environment preset is essential for projecting reflections onto clear water/glass */}
          <Environment preset="studio" />

          {/* Restricted camera control */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            minPolarAngle={Math.PI / 2.3}
            maxPolarAngle={Math.PI / 1.8}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
