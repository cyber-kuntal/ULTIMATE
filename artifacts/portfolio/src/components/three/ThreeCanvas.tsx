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
          gl.setClearColor('#050a0e', 0); // transparent so CSS bg shows through
        }}
      >
        <Suspense fallback={null}>
          <ParticleField />
          <RadarScanner />
          <MouseReactiveCamera />
        </Suspense>
      </Canvas>
    </div>
  );
}
