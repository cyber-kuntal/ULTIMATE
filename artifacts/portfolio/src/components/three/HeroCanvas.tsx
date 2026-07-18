import React, { Suspense, useState, useEffect, Component, ReactNode } from 'react';

// ─── Error Boundary ──────────────────────────────────────────────────────────
interface EBState { hasError: boolean }
class CanvasErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, EBState> {
  state: EBState = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: Error) {
    console.debug('[HeroCanvas] WebGL unavailable, using CSS fallback.', error.message);
  }
  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

// ─── CSS-only animated background (no WebGL) ─────────────────────────────────
export function CSSHeroBg() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden" style={{ background: '#031A18' }}>

      {/* Animated Hexagon Grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='104' viewBox='0 0 60 104' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l25.98 15v30L30 60 4.02 45V15z' fill='none' stroke='%2300FFC6' stroke-width='0.8' stroke-opacity='0.12'/%3E%3Cpath d='M30 52l25.98 15v30L30 112 4.02 97V67z' fill='none' stroke='%2300FFC6' stroke-width='0.8' stroke-opacity='0.12'/%3E%3C/svg%3E")`,
        backgroundSize: '60px 104px',
        animation: 'hexPulse 5s ease-in-out infinite',
      }} />

      {/* Glow orbs */}
      <div className="absolute pointer-events-none" style={{
        top: '-20%', right: '-15%',
        width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,255,198,0.12) 0%, transparent 70%)',
        animation: 'orbFloat 8s ease-in-out infinite',
      }} />
      <div className="absolute pointer-events-none" style={{
        bottom: '-20%', left: '-15%',
        width: '500px', height: '500px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(124,255,178,0.08) 0%, transparent 70%)',
        animation: 'orbFloat 10s ease-in-out infinite reverse',
      }} />

      {/* Radar sweep */}
      <div className="absolute pointer-events-none" style={{
        top: '50%', left: '50%',
        width: '800px', height: '800px',
        transform: 'translate(-50%, -50%)',
      }}>
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%',
          background: 'conic-gradient(from 0deg, transparent 75%, rgba(0,255,198,0.14) 100%)',
          animation: 'radarSpin 4s linear infinite',
          transformOrigin: 'center',
        }} />
        {[0, 20, 40, 60].map(pct => (
          <div key={pct} style={{
            position: 'absolute',
            inset: `${pct}%`,
            borderRadius: '50%',
            border: '1px solid rgba(0,255,198,0.10)',
          }} />
        ))}
      </div>

      {/* Holographic HUD corner brackets */}
      <div className="absolute inset-6 pointer-events-none">
        <div style={{ position: 'absolute', top: 0, left: 0, width: 32, height: 32, borderTop: '2px solid #00FFC6', borderLeft: '2px solid #00FFC6' }} />
        <div style={{ position: 'absolute', top: 0, right: 0, width: 32, height: 32, borderTop: '2px solid #00FFC6', borderRight: '2px solid #00FFC6' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: 32, height: 32, borderBottom: '2px solid #00FFC6', borderLeft: '2px solid #00FFC6' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: 32, height: 32, borderBottom: '2px solid #00FFC6', borderRight: '2px solid #00FFC6' }} />
      </div>

      {/* Horizontal scan line */}
      <div className="absolute left-0 right-0 pointer-events-none" style={{
        height: '2px',
        background: 'rgba(0,255,198,0.5)',
        boxShadow: '0 0 10px rgba(0,255,198,0.8)',
        animation: 'scanLineAnim 3s linear infinite',
      }} />

      {/* Floating data nodes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.25 }}>
        <path d="M100 200 L300 150 L500 400 L800 300" fill="none" stroke="#00FFC6" strokeWidth="1" strokeDasharray="5,5" />
        <path d="M200 600 L400 500 L700 700 L900 400" fill="none" stroke="#7CFFB2" strokeWidth="1" strokeDasharray="5,5" />
        {([
          [100,200],[300,150],[500,400],[800,300],
          [200,600],[400,500],[700,700],[900,400],
        ] as [number,number][]).map(([cx,cy],i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill="#00FFC6" />
        ))}
      </svg>

      {/* Binary rain */}
      {Array.from({ length: 12 }, (_, i) => (
        <div key={i} className="absolute top-0 select-none pointer-events-none" style={{
          fontFamily: "'JetBrains Mono', monospace",
          color: 'rgba(124,255,178,0.18)',
          fontSize: '12px',
          left: `${(i * 9 + 5) % 100}%`,
          animation: `matrixRain ${5 + (i % 5)}s linear ${i * 0.5}s infinite`,
          whiteSpace: 'pre-line',
          letterSpacing: '0.1em',
        }}>
          {Array.from({ length: 25 }, (_, j) => ((i + j) % 2 === 0 ? '1' : '0')).join('\n')}
        </div>
      ))}

      <style>{`
        @keyframes hexPulse    { 0%,100%{opacity:0.8} 50%{opacity:1} }
        @keyframes orbFloat    { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-24px) scale(1.04)} }
        @keyframes radarSpin   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes scanLineAnim{ 0%{top:-2px;opacity:0} 10%{opacity:1} 90%{opacity:0.6} 100%{top:100%;opacity:0} }
        @keyframes matrixRain  { 0%{transform:translateY(-100%);opacity:0} 10%{opacity:1} 90%{opacity:0.4} 100%{transform:translateY(110vh);opacity:0} }
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
    let ok = false;
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') ?? testCanvas.getContext('experimental-webgl');
      if (gl instanceof WebGLRenderingContext && !gl.isContextLost()) {
        ok = true;
      }
      const ext = (gl as WebGLRenderingContext | null)?.getExtension('WEBGL_lose_context');
      ext?.loseContext();
    } catch {
      ok = false;
    }
    setWebglOk(ok);
  }, []);

  return (
    <>
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
