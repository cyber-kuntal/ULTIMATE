import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import ParticleField from './ParticleField';
import RadarScanner from './RadarScanner';

function MouseReactiveCamera() {
  const { camera, pointer } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 10));
  useFrame(() => {
    target.current.set(pointer.x * 2, pointer.y * 2, 10);
    camera.position.lerp(target.current, 0.05);
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function WireframeGlobe() {
  const globeRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      globeRef.current.rotation.x = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <mesh ref={globeRef} position={[5, 2, -5]}>
      <icosahedronGeometry args={[3, 1]} />
      <meshBasicMaterial color="#00FFC6" wireframe transparent opacity={0.15} />
    </mesh>
  );
}

function FloatingHexagons() {
  const hexGroup = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (hexGroup.current) {
      hexGroup.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  const hexShape = new THREE.Shape();
  hexShape.moveTo(0, 1);
  hexShape.lineTo(0.866, 0.5);
  hexShape.lineTo(0.866, -0.5);
  hexShape.lineTo(0, -1);
  hexShape.lineTo(-0.866, -0.5);
  hexShape.lineTo(-0.866, 0.5);
  hexShape.lineTo(0, 1);

  const extrudeSettings = { depth: 0.2, bevelEnabled: true, bevelSegments: 1, steps: 1, bevelSize: 0.05, bevelThickness: 0.05 };

  return (
    <group ref={hexGroup}>
      {Array.from({ length: 15 }).map((_, i) => {
        const x = (Math.random() - 0.5) * 30;
        const y = (Math.random() - 0.5) * 30;
        const z = (Math.random() - 0.5) * 20 - 10;
        const scale = Math.random() * 0.5 + 0.2;
        return (
          <mesh key={i} position={[x, y, z]} scale={[scale, scale, scale]} rotation={[Math.random() * Math.PI, Math.random() * Math.PI, 0]}>
            <extrudeGeometry args={[hexShape, extrudeSettings]} />
            <meshBasicMaterial color="#7CFFB2" transparent opacity={0.1} wireframe />
          </mesh>
        );
      })}
    </group>
  );
}

export default function ThreeCanvas() {
  return (
    <div className="absolute inset-0 z-1 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#031A18', 0); // transparent so CSS bg shows through
        }}
      >
        <Suspense fallback={null}>
          <ParticleField />
          <RadarScanner />
          <WireframeGlobe />
          <FloatingHexagons />
          <MouseReactiveCamera />
        </Suspense>
      </Canvas>
    </div>
  );
}

