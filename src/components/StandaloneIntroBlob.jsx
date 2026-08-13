import React, { useEffect, useRef } from 'react';
import '../components/BlobSphere.css';

const N = 60;
const angles = [];
const cosT = [];
const sinT = [];
for (let i = 0; i < N; i++) {
  const a = (i * 2 * Math.PI) / N;
  angles.push(a);
  cosT.push(Math.cos(a));
  sinT.push(Math.sin(a));
}

function polyR(theta, n, R, offset) {
  const sec = (2 * Math.PI) / n;
  const half = sec / 2;
  const ap = R * Math.cos(half);
  const t = ((theta - offset) % sec + sec) % sec;
  return ap / Math.cos(t - half);
}

const SQ = angles.map(a => polyR(a, 4, 165, Math.PI / 4));
const ST = angles.map(a => 148 + 45 * Math.cos(5 * a + Math.PI / 2));
const TR = angles.map(a => polyR(a, 3, 180, -Math.PI / 2));
const HX = angles.map(a => polyR(a, 6, 155, 0));

const AREA_FACTOR = Math.sin(Math.PI / N) / 2;
const TARGET_AREA = 58000;

export default function StandaloneIntroBlob() {
  const turbGlowRef = useRef(null);
  const turbMidRef  = useRef(null);
  const turbCoreRef = useRef(null);
  const turbLineRef = useRef(null);

  const path1Ref = useRef(null);
  const path2Ref = useRef(null);
  const path3Ref = useRef(null);
  const path4Ref = useRef(null);
  const groupRef = useRef(null);

  const radii = useRef(new Float64Array(N).fill(150));

  useEffect(() => {
    let raf;
    const t0 = performance.now();

    const tick = () => {
      const s = (performance.now() - t0) / 1000;

      let tgt;
      if (s < 2.5) {
        tgt = SQ;
      } else if (s < 5.0) {
        tgt = ST;
      } else if (s < 7.5) {
        tgt = TR;
      } else {
        tgt = HX;
      }

      const r = radii.current;
      for (let i = 0; i < N; i++) {
        r[i] += (tgt[i] - r[i]) * 0.06;
      }

      const cx = 230, cy = 230;
      const px = new Float64Array(N);
      const py = new Float64Array(N);
      for (let i = 0; i < N; i++) {
        px[i] = cx + r[i] * cosT[i];
        py[i] = cy + r[i] * sinT[i];
      }

      const tx = new Float64Array(N);
      const ty = new Float64Array(N);
      for (let i = 0; i < N; i++) {
        const prev = (i - 1 + N) % N;
        const next = (i + 1) % N;
        tx[i] = (px[next] - px[prev]) / 6;
        ty[i] = (py[next] - py[prev]) / 6;
      }

      let d = `M ${px[0].toFixed(2)},${py[0].toFixed(2)}`;
      for (let i = 0; i < N; i++) {
        const j = (i + 1) % N;
        const c1x = px[i] + tx[i];
        const c1y = py[i] + ty[i];
        const c2x = px[j] - tx[j];
        const c2y = py[j] - ty[j];
        d += ` C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(2)} ${px[j].toFixed(2)},${py[j].toFixed(2)}`;
      }
      d += 'Z';

      let sum = 0;
      for (let i = 0; i < N; i++) sum += r[i] * r[(i + 1) % N];
      const area = sum * AREA_FACTOR;
      const scale = Math.sqrt(TARGET_AREA / (area || 1));

      if (path1Ref.current) path1Ref.current.setAttribute('d', d);
      if (path2Ref.current) path2Ref.current.setAttribute('d', d);
      if (path3Ref.current) path3Ref.current.setAttribute('d', d);
      if (path4Ref.current) path4Ref.current.setAttribute('d', d);
      if (groupRef.current) groupRef.current.style.transform = `scale(${scale.toFixed(4)})`;

      const fx = (0.0025 + Math.sin(s * 0.05) * 0.0005).toFixed(6);
      const fy = (0.0025 + Math.cos(s * 0.03) * 0.0005).toFixed(6);
      const fr = `${fx} ${fy}`;
      if (turbGlowRef.current) turbGlowRef.current.setAttribute('baseFrequency', fr);
      if (turbMidRef.current)  turbMidRef.current.setAttribute('baseFrequency', fr);
      if (turbCoreRef.current) turbCoreRef.current.setAttribute('baseFrequency', fr);
      if (turbLineRef.current) turbLineRef.current.setAttribute('baseFrequency', fr);

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div style={{ width: '460px', height: '460px', position: 'relative' }}>
      <svg viewBox="0 0 460 460" className="blob-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="standalone-blob-glow-heavy" x="-100%" y="-100%" width="300%" height="300%">
            <feTurbulence ref={turbGlowRef} type="fractalNoise" baseFrequency="0.0025 0.0025" numOctaves="1" seed="12" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="55" />
          </filter>
          <filter id="standalone-blob-glow-medium" x="-100%" y="-100%" width="300%" height="300%">
            <feTurbulence ref={turbMidRef} type="fractalNoise" baseFrequency="0.0025 0.0025" numOctaves="1" seed="12" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="28" />
          </filter>
          <filter id="standalone-blob-glow-core" x="-100%" y="-100%" width="300%" height="300%">
            <feTurbulence ref={turbCoreRef} type="fractalNoise" baseFrequency="0.0025 0.0025" numOctaves="1" seed="12" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="15" />
          </filter>
          <filter id="standalone-blob-white-core" x="-100%" y="-100%" width="300%" height="300%">
            <feTurbulence ref={turbLineRef} type="fractalNoise" baseFrequency="0.0025 0.0025" numOctaves="1" seed="12" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="20" xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feGaussianBlur in="displaced" stdDeviation="7" />
          </filter>
        </defs>

        <g ref={groupRef} style={{ transformOrigin: '230px 230px' }}>
          <path ref={path1Ref} fill="none" stroke="rgba(239, 68, 68, 0.40)"   strokeWidth="140" filter="url(#standalone-blob-glow-heavy)"  />
          <path ref={path2Ref} fill="none" stroke="rgba(255, 90, 0, 0.85)"    strokeWidth="80"  filter="url(#standalone-blob-glow-medium)" />
          <path ref={path3Ref} fill="none" stroke="rgba(251, 191, 36, 0.95)"  strokeWidth="45"  filter="url(#standalone-blob-glow-core)"   />
          <path ref={path4Ref} fill="none" stroke="rgba(255, 255, 255, 1.0)"  strokeWidth="20"  filter="url(#standalone-blob-white-core)"  />
        </g>
      </svg>
    </div>
  );
}
