import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshTransmissionMaterial } from '@react-three/drei';

export default function GlassTorus() {
  const meshRef = useRef();

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    
    // Smooth floating rotation
    meshRef.current.rotation.y = elapsed * 0.15;
    meshRef.current.rotation.x = elapsed * 0.08;

    // Interactive mouse tracking
    const targetX = (state.pointer.x * Math.PI) / 8;
    const targetY = (state.pointer.y * Math.PI) / 8;
    meshRef.current.rotation.x += (targetY - meshRef.current.rotation.x) * 0.05;
    meshRef.current.rotation.y += (targetX - meshRef.current.rotation.y) * 0.05;

    // Breathing float animation
    meshRef.current.position.y = Math.sin(elapsed * 1.5) * 0.1;
  });

  return (
    <group>
      {/* 100% Transparent water slime ball using state-of-the-art MeshTransmissionMaterial for realistic refractions */}
      <mesh ref={meshRef} scale={[1.15, 1.15, 1.15]} castShadow receiveShadow>
        <sphereGeometry args={[1.0, 64, 64]} />
        
        {/* MeshTransmissionMaterial simulates real physical water refraction, chromatic aberration, and wet glossiness */}
        <MeshTransmissionMaterial
          color="#ffffff" /* Colorless pure water body */
          roughness={0.04} /* Smooth wet water surface */
          ior={1.333} /* Physical index of refraction of water */
          transmission={1.0} /* 100% light transmission */
          thickness={1.5} /* Bends and refracts background objects realistically */
          anisotropy={0.25} /* Anisotropic direction of light scattering */
          chromaticAberration={0.06} /* Realistic rainbow dispersion color shifting on the edges of the water droplet */
          distortion={0.35} /* Built-in liquid distortion */
          distortionScale={0.4} /* Scale of liquid wobble waves */
          temporalDistortion={0.15} /* Animates the wobbly fluid motion over time */
          clearcoat={1.0} /* Wet outer coat reflection */
          clearcoatRoughness={0.0}
        />
      </mesh>
    </group>
  );
}
