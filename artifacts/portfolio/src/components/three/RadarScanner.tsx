import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function RadarScanner() {
  const radarRef = useRef<THREE.Group>(null);
  const sweepRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (radarRef.current) {
      radarRef.current.rotation.z = -state.clock.elapsedTime * 0.2;
    }
    if (sweepRef.current) {
      sweepRef.current.rotation.z = -state.clock.elapsedTime * 2.0;
    }
  });

  const circleGeometry = useMemo(() => new THREE.CircleGeometry(15, 64), []);
  const ringGeometry = useMemo(() => new THREE.RingGeometry(14.8, 15, 64), []);
  
  // Custom shader for the radar sweep gradient
  const sweepMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: {
      color: { value: new THREE.Color('#00FFC6') }
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 color;
      varying vec2 vUv;
      void main() {
        // Create a conic gradient effect for the sweep
        vec2 center = vec2(0.5, 0.5);
        vec2 dir = vUv - center;
        float angle = atan(dir.y, dir.x);
        float normalizedAngle = (angle + 3.14159) / (2.0 * 3.14159);
        
        // Only show a slice
        float alpha = smoothstep(0.75, 1.0, normalizedAngle) * 0.3;
        if(normalizedAngle < 0.75) alpha = 0.0;
        
        gl_FragColor = vec4(color, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide
  }), []);

  return (
    <group position={[0, -2, -15]} rotation={[-Math.PI / 2.5, 0, 0]}>
      {/* Grid lines */}
      <gridHelper args={[40, 20, '#00FFC6', '#031A18']} rotation={[Math.PI / 2, 0, 0]} />
      
      <group ref={radarRef}>
        {/* Inner concentric rings */}
        {[5, 10, 15].map((radius, i) => (
          <mesh key={i} position={[0, 0, 0.01]}>
            <ringGeometry args={[radius - 0.05, radius, 64]} />
            <meshBasicMaterial color="#00FFC6" transparent opacity={0.2} />
          </mesh>
        ))}
        
        {/* Crosshairs */}
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[30, 0.05]} />
          <meshBasicMaterial color="#00FFC6" transparent opacity={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.02]} rotation={[0, 0, Math.PI / 2]}>
          <planeGeometry args={[30, 0.05]} />
          <meshBasicMaterial color="#00FFC6" transparent opacity={0.3} />
        </mesh>
      </group>

      {/* Radar sweep */}
      <mesh ref={sweepRef} position={[0, 0, 0.03]} geometry={circleGeometry} material={sweepMaterial} />
    </group>
  );
}