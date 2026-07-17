import React, { Suspense, useRef, useState, useEffect, Component, ReactNode } from 'react';

// ─── Error Boundary ──────────────────────────────────────────────────────────
interface EBState { hasError: boolean }
class CanvasErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, EBState> {
  state: EBState = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error) {
    // Silently absorb WebGL errors
    console.debug('[HeroCanvas] WebGL unavailable, using CSS fallback.', error.message);
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

// ─── CSS-only animated background (no WebGL) ─────────────────────────────────
export function CSSHeroBg() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-bg-primary">
      {/* Animated grid */}
      <div className="absolute inset-0" style={{
        backgroundImage: `
          linear-gradient(rgba(0,212,255,0.06) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,212,255,0.06) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none" style={{
        background: 'radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)',
        animation: 'orbFloat 7s ease-in-out infinite',
      }} />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full pointer-events-none" style={{
        background: 'radial-gradient(circle, rgba(0,255,135,0.08) 0%, transparent 70%)',
        animation: 'orbFloat 9s ease-in-out infinite reverse',
      }} />

      {/* Radar rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none">
        {[0, 15, 30, 45].map(pct => (
          <div key={pct} className="absolute rounded-full border border-cyber-cyan/10"
            style={{ inset: `${pct}%` }} />
        ))}
        <div className="absolute inset-0 origin-center rounded-full" style={{
          background: 'conic-gradient(from 0deg, transparent 75%, rgba(0,212,255,0.25) 100%)',
          animation: 'radarSpin 4s linear infinite',
        }} />
      </div>

      {/* Floating particles */}
      {Array.from({ length: 50 }, (_, i) => {
        const size   = (((i * 7) % 4) + 1);
        const left   = ((i * 17 + 3) % 100);
        const top    = ((i * 13 + 7) % 100);
        const dur    = ((i * 3) % 8) + 5;
        const delay  = ((i * 2) % 5);
        const color  = i % 3 === 0 ? '#00ff87' : '#00d4ff';
        return (
          <div key={i} className="absolute rounded-full pointer-events-none" style={{
            width: size + 'px', height: size + 'px',
            left: left + '%', top: top + '%',
            background: color,
            opacity: 0.15 + (i % 5) * 0.08,
            animation: `particleFloat${i % 3} ${dur}s ease-in-out ${delay}s infinite`,
          }} />
        );
      })}

      {/* Binary rain strips */}
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="absolute top-0 font-mono text-cyber-green/10 text-xs select-none pointer-events-none"
          style={{
            left: (i * 13 + 5) + '%',
            animation: `binaryRain ${6 + i}s linear ${i * 0.8}s infinite`,
            whiteSpace: 'pre-line',
            letterSpacing: '0.1em',
          }}>
          {Array.from({ length: 20 }, (_, j) => (Math.random() > 0.5 ? '1' : '0')).join('\n')}
        </div>
      ))}

      <style>{`
        @keyframes orbFloat { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-24px) scale(1.04)} }
        @keyframes radarSpin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes particleFloat0 { 0%,100%{transform:translate(0,0);opacity:0.15} 50%{transform:translate(12px,-18px);opacity:0.5} }
        @keyframes particleFloat1 { 0%,100%{transform:translate(0,0);opacity:0.2}  50%{transform:translate(-10px,14px);opacity:0.45} }
        @keyframes particleFloat2 { 0%,100%{transform:translate(0,0);opacity:0.1}  50%{transform:translate(8px,-10px);opacity:0.4} }
        @keyframes binaryRain { 0%{transform:translateY(-100%);opacity:0} 20%{opacity:1} 80%{opacity:0.5} 100%{transform:translateY(120vh);opacity:0} }
      `}</style>
    </div>
  );
}

// ─── Lazy-loaded 3D canvas ────────────────────────────────────────────────────
const ThreeCanvas = React.lazy(() => import('./ThreeCanvas'));

// ─── Main Export ─────────────────────────────────────────────────────────────
export default function HeroCanvas() {
  const [webglOk, setWebglOk] = useState(false);

  useEffect(() => {
    // Async detection: only enable Three.js after confirming WebGL works
    let ok = false;
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') ?? testCanvas.getContext('experimental-webgl');
      if (gl instanceof WebGLRenderingContext && !gl.isContextLost()) {
        ok = true;
      }
      // Clean up
      const ext = (gl as WebGLRenderingContext | null)?.getExtension('WEBGL_lose_context');
      ext?.loseContext();
    } catch {
      ok = false;
    }
    setWebglOk(ok);
  }, []);

  return (
    <>
      {/* CSS fallback always renders — 3D canvas layers on top if WebGL available */}
      <CSSHeroBg />
      {webglOk && (
        <CanvasErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <ThreeCanvas />
          </Suspense>
        </CanvasErrorBoundary>
      )}
    </>
  );
}
