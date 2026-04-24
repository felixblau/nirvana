import { useState, useEffect, useRef, Suspense } from "react";
import * as THREE from "three";

// ─── Nirvana Logo (inline SVG) ───────────────────────────────────────────────
function NirvanaLogo({ className }) {
  return (
    <svg className={className} width="189" height="34" viewBox="0 0 189 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M41.8711 28.8282V5.21717C41.8711 5.12007 41.9509 5.04024 42.048 5.04024H46.0116C46.1 5.04024 46.1756 5.10712 46.1863 5.19559L46.5575 8.08898C46.579 8.2508 46.784 8.30042 46.8768 8.16665C48.4432 5.8925 51.3345 4.31743 54.7133 4.31743C59.8226 4.31743 63.1691 7.75455 63.1691 13.1357V28.8303C63.1691 28.9274 63.0893 29.0073 62.9922 29.0073H58.0102C57.9131 29.0073 57.8333 28.9274 57.8333 28.8303V13.4075C57.8333 10.7407 56.0705 8.97576 53.0843 8.97576C49.6019 8.97576 47.2522 11.3729 47.2069 14.4928V28.8303C47.2069 28.9274 47.1271 29.0073 47.03 29.0073H42.048C41.9509 29.0051 41.8711 28.9253 41.8711 28.8282Z" fill="white"/>
      <path d="M66.1337 28.8281V5.21715C66.1337 5.12006 66.2135 5.04022 66.3106 5.04022H71.2926C71.3897 5.04022 71.4695 5.12006 71.4695 5.21715V28.8281C71.4695 28.9252 71.3897 29.0051 71.2926 29.0051H66.3106C66.2135 29.0051 66.1337 28.9252 66.1337 28.8281Z" fill="white"/>
      <path d="M74.6175 28.8281V5.21715C74.6175 5.12006 74.6973 5.04022 74.7944 5.04022H78.758C78.8464 5.04022 78.9219 5.10495 78.9327 5.19341L79.47 9.18072C79.4937 9.35118 79.7203 9.39001 79.8001 9.23898C81.3752 6.31107 82.8812 5.08122 86.6506 5.08122H87.3885C87.4813 5.08122 87.5568 5.15673 87.5568 5.24951L89.4167 9.95531C89.4188 9.96178 89.4145 9.96826 89.408 9.96826H87.8675C82.8941 9.96826 79.9554 12.6351 79.9554 17.1575V28.8281C79.9554 28.9252 79.8756 29.0051 79.7785 29.0051H74.7965C74.6973 29.0051 74.6175 28.9252 74.6175 28.8281Z" fill="white"/>
      <path d="M99.6827 28.8972L89.8374 5.28404C89.7878 5.16752 89.8741 5.04022 90.0014 5.04022H95.4041C95.4775 5.04022 95.5422 5.08553 95.5681 5.15242L102.367 22.3056C102.425 22.4545 102.636 22.4545 102.695 22.3056L109.45 5.15458C109.476 5.08769 109.543 5.04238 109.614 5.04238H115.017C115.142 5.04238 115.228 5.17183 115.181 5.28619L105.336 28.8972C105.308 28.9641 105.243 29.0051 105.172 29.0051H99.8467C99.7755 29.0051 99.7108 28.9619 99.6827 28.8972Z" fill="white"/>
      <path d="M114.268 16.8878C114.268 9.472 118.836 4.31741 125.212 4.31741C128.763 4.31741 131.747 5.8968 133.361 8.36514C133.452 8.50323 133.663 8.4536 133.685 8.28962L134.058 5.19557C134.069 5.10711 134.144 5.04022 134.233 5.04022H138.194C138.291 5.04022 138.371 5.12006 138.371 5.21715V28.8282C138.371 28.9252 138.291 29.0051 138.194 29.0051H133.258C133.161 29.0051 133.081 28.9252 133.081 28.8282V26.3231C133.081 26.1505 132.863 26.0815 132.761 26.2196C131.182 28.3815 128.604 29.6826 125.393 29.6826C118.925 29.6826 114.268 24.4374 114.268 16.8878ZM133.079 16.8425C133.079 12.0935 130.366 8.79451 126.476 8.79451C122.498 8.79451 119.738 12.141 119.738 16.9331C119.738 21.7705 122.45 25.1623 126.386 25.1623C130.319 25.1623 133.079 21.7252 133.079 16.8425Z" fill="white"/>
      <path d="M141.058 28.8282V5.21715C141.058 5.12006 141.137 5.04022 141.234 5.04022H145.198C145.286 5.04022 145.362 5.10711 145.373 5.19557L145.744 8.08896C145.765 8.25078 145.97 8.30041 146.063 8.16663C147.63 5.89249 150.521 4.31741 153.9 4.31741C159.009 4.31741 162.356 7.75453 162.356 13.1357V28.8303C162.356 28.9274 162.276 29.0072 162.179 29.0072H157.197C157.1 29.0072 157.02 28.9274 157.02 28.8303V13.4075C157.02 10.7407 155.257 8.97575 152.271 8.97575C148.788 8.97575 146.439 11.3729 146.393 14.4928V28.8303C146.393 28.9274 146.314 29.0072 146.216 29.0072H141.234C141.137 29.0051 141.058 28.9252 141.058 28.8282Z" fill="white"/>
      <path d="M164.256 16.8878C164.256 9.472 168.824 4.31741 175.2 4.31741C178.751 4.31741 181.735 5.8968 183.349 8.36514C183.44 8.50323 183.651 8.4536 183.673 8.28962L184.046 5.19557C184.057 5.10711 184.133 5.04022 184.221 5.04022H188.182C188.28 5.04022 188.359 5.12006 188.359 5.21715V28.8282C188.359 28.9252 188.28 29.0051 188.182 29.0051H183.246C183.149 29.0051 183.069 28.9252 183.069 28.8282V26.3231C183.069 26.1505 182.851 26.0815 182.75 26.2196C181.17 28.3815 178.592 29.6826 175.381 29.6826C168.915 29.6826 164.256 24.4374 164.256 16.8878ZM183.067 16.8425C183.067 12.0935 180.355 8.79451 176.464 8.79451C172.486 8.79451 169.726 12.141 169.726 16.9331C169.726 21.7705 172.438 25.1623 176.374 25.1623C180.309 25.1623 183.067 21.7252 183.067 16.8425Z" fill="white"/>
      <path d="M15.3278 21.3455C17.7278 21.3455 19.6733 19.3999 19.6733 17C19.6733 14.6001 17.7278 12.6545 15.3278 12.6545C12.9279 12.6545 10.9824 14.6001 10.9824 17C10.9824 19.3999 12.9279 21.3455 15.3278 21.3455Z" fill="white"/>
      <path d="M21.3714 22.7501C16.2599 23.8505 13.0084 28.8886 14.1088 34C19.2224 32.8975 22.4739 27.8615 21.3714 22.7501Z" fill="white"/>
      <path d="M17.2848 8.85062C20.7715 12.7473 26.759 13.0796 30.6557 9.59285C27.1668 5.694 21.1815 5.36172 17.2848 8.85062Z" fill="white"/>
      <path d="M0 24.4072C3.89669 20.9204 9.88412 21.2527 13.3709 25.1515C9.47201 28.6383 3.48674 28.3038 0 24.4072Z" fill="white"/>
      <path d="M16.5469 0C17.6473 5.11144 14.3936 10.1495 9.28213 11.2478C8.18174 6.13632 11.4333 1.10039 16.5469 0Z" fill="white"/>
      <path d="M1.23416 7.45248C6.19888 9.0966 8.88945 14.454 7.24533 19.4187C2.28277 17.7746 -0.409956 12.4172 1.23416 7.45248Z" fill="white"/>
      <path d="M23.3456 14.6439C28.3103 16.288 31.0009 21.6454 29.3568 26.6101C24.3942 24.9638 21.7036 19.6086 23.3456 14.6439Z" fill="white"/>
    </svg>
  );
}

// ─── Three.js Generative Art Background ──────────────────────────────────────
function GenerativeArtScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, el.clientWidth / el.clientHeight, 0.1, 1000);
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    el.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(3.6, 64);
    const mousePos = new THREE.Vector2(0, 0);
    const rippleOrigin = new THREE.Vector2(-99, -99);

    const material = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mousePos: { value: mousePos },
        colorA: { value: new THREE.Color(0x9073f2) },
        colorB: { value: new THREE.Color(0xdcd2c8) },
        rippleOrigin: { value: rippleOrigin },
        rippleTime: { value: -1.0 },
        rippleStrength: { value: 0.0 },
      },
      vertexShader: `
        uniform float time;
        uniform vec2 mousePos;
        uniform vec2 rippleOrigin;
        uniform float rippleTime;
        uniform float rippleStrength;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vWorldPosition;

        vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
        vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
        vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
        float snoise(vec3 v) {
          const vec2 C = vec2(1.0/6.0, 1.0/3.0);
          const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
          vec3 i = floor(v + dot(v, C.yyy));
          vec3 x0 = v - i + dot(i, C.xxx);
          vec3 g = step(x0.yzx, x0.xyz);
          vec3 l = 1.0 - g;
          vec3 i1 = min(g.xyz, l.zxy);
          vec3 i2 = max(g.xyz, l.zxy);
          vec3 x1 = x0 - i1 + C.xxx;
          vec3 x2 = x0 - i2 + C.yyy;
          vec3 x3 = x0 - D.yyy;
          i = mod289(i);
          vec4 p = permute(permute(permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));
          float n_ = 0.142857142857;
          vec3 ns = n_ * D.wyz - D.xzx;
          vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
          vec4 x_ = floor(j * ns.z);
          vec4 y_ = floor(j - 7.0 * x_);
          vec4 x = x_ * ns.x + ns.yyyy;
          vec4 y = y_ * ns.x + ns.yyyy;
          vec4 h = 1.0 - abs(x) - abs(y);
          vec4 b0 = vec4(x.xy, y.xy);
          vec4 b1 = vec4(x.zw, y.zw);
          vec4 s0 = floor(b0) * 2.0 + 1.0;
          vec4 s1 = floor(b1) * 2.0 + 1.0;
          vec4 sh = -step(h, vec4(0.0));
          vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
          vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
          vec3 p0 = vec3(a0.xy, h.x);
          vec3 p1 = vec3(a0.zw, h.y);
          vec3 p2 = vec3(a1.xy, h.z);
          vec3 p3 = vec3(a1.zw, h.w);
          vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
        }

        void main() {
          vNormal = normal;
          vPosition = position;
          float mouseInfluence = smoothstep(1.8, 0.0, length(position.xy - mousePos * 3.0));
          float displacement = snoise(position * 2.0 + time * 0.5) * 0.2;
          displacement += mouseInfluence * 0.5;
          float dist = length(position.xy - rippleOrigin);
          float rippleRadius = rippleTime * 4.0;
          float rippleWave = sin((dist - rippleRadius) * 8.0) * exp(-3.0 * abs(dist - rippleRadius)) * rippleStrength;
          displacement += rippleWave * 0.4;
          vec3 newPosition = position + normal * displacement;
          vWorldPosition = newPosition;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 colorA;
        uniform vec3 colorB;
        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        void main() {
          vec3 normal = normalize(vNormal);
          float fresnel = 1.0 - abs(dot(normal, vec3(0.0, 0.0, 1.0)));
          fresnel = pow(fresnel, 1.5);
          float gradient = (vWorldPosition.y + 4.0) / 8.0;
          vec3 color = mix(colorA, colorB, gradient);
          vec3 finalColor = color * (0.3 + fresnel * 0.7);
          gl_FragColor = vec4(finalColor, 1.0);
        }
      `,
      wireframe: true,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const targetRotX = { value: 0 };
    const targetRotY = { value: 0 };
    let rippleStart = -1;

    let frameId;
    const animate = (t) => {
      material.uniforms.time.value = t * 0.0003;
      mesh.rotation.y += 0.0005 + (targetRotY.value - mesh.rotation.y) * 0.03;
      mesh.rotation.x += 0.0002 + (targetRotX.value - mesh.rotation.x) * 0.03;
      if (rippleStart > 0) {
        const elapsed = (t - rippleStart) * 0.001;
        material.uniforms.rippleTime.value = elapsed;
        material.uniforms.rippleStrength.value = Math.max(0, 1.0 - elapsed * 0.6);
        if (elapsed > 2.0) rippleStart = -1;
      }
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate(0);

    const handleResize = () => {
      if (!el) return;
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    const handleMouseMove = (e) => {
      mousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY.value = mousePos.x * 0.4;
      targetRotX.value = -mousePos.y * 0.3;
    };
    const handleClick = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      rippleOrigin.set(x * 3.0, y * 3.0);
      material.uniforms.rippleOrigin.value = rippleOrigin;
      rippleStart = performance.now();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      if (el && renderer.domElement.parentNode === el) {
        el.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full z-0" />;
}

// ─── Mouse-follow glow on text ───────────────────────────────────────────────
function TextGlow({ children }) {
  const containerRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current || !glowRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const mask = `radial-gradient(circle 80px at ${x}px ${y}px, black 0%, transparent 100%)`;
      glowRef.current.style.maskImage = mask;
      glowRef.current.style.webkitMaskImage = mask;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {children}
      <div
        ref={glowRef}
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage: "radial-gradient(circle 80px at -200px -200px, black 0%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(circle 80px at -200px -200px, black 0%, transparent 100%)",
          filter: "drop-shadow(0 0 8px rgba(255,255,255,0.5)) drop-shadow(0 0 20px rgba(255,255,255,0.15))",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── RSVP Dialog (plain HTML dialog, no dependencies) ────────────────────────
function RSVPDialog({ open, onClose, onSubmit, submitted, submitting, name, onNameChange, email, onEmailChange }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="fixed inset-0 z-50 m-auto w-full max-w-md rounded-xl border border-white/10 bg-black/95 p-6 text-white backdrop:bg-black/50 backdrop:backdrop-blur-sm"
      style={{ backgroundColor: "rgba(0,0,0,0.95)" }}
    >
      {!submitted ? (
        <>
          <div className="flex flex-col gap-2 mb-4">
            <h2 className="text-xl font-light tracking-tight text-white">Reserve Your Seat</h2>
            <p className="text-white/50 text-sm">15 seats only. Confirm your attendance for July 23.</p>
          </div>
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="name" className="block text-xs font-mono tracking-wider uppercase text-white/40">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                value={name}
                onChange={onNameChange}
                required
                placeholder="Your name"
                className="w-full h-10 rounded-lg border border-white/10 bg-white/5 px-3 text-white placeholder:text-white/20 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/10"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-xs font-mono tracking-wider uppercase text-white/40">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={onEmailChange}
                required
                placeholder="you@company.com"
                className="w-full h-10 rounded-lg border border-white/10 bg-white/5 px-3 text-white placeholder:text-white/20 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/10"
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 text-sm font-mono tracking-[0.15em] uppercase bg-white text-black hover:bg-white/90 rounded-full cursor-pointer transition-all duration-300 disabled:opacity-50"
            >
              {submitting ? "Confirming…" : "Confirm RSVP"}
            </button>
          </form>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-white/40 hover:text-white text-xl leading-none cursor-pointer"
          >
            &times;
          </button>
        </>
      ) : (
        <div className="py-8 text-center">
          <div className="mb-4 text-4xl">&#10003;</div>
          <h2 className="text-xl font-light tracking-tight text-white mb-2">You're Confirmed</h2>
          <p className="text-white/50 text-sm">We'll send details to {email} shortly.</p>
          <p className="mt-4 text-gray-400 text-xs font-mono tracking-wider">
            July 23 &middot; 5 PM &ndash; 9 PM &middot; NYC
          </p>
        </div>
      )}
    </dialog>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function NirvanaInvite() {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbxoHYB-GtNa8aE8gBWPVWqd52yBu5E0epHjReKGT91B6xZ476-L_CzNLXMnwaayPlvs/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email }),
        }
      );
    } catch {}
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <div className="relative min-h-screen bg-[#0d0d0d] text-white overflow-hidden" style={{ fontFamily: "'Geist Variable', system-ui, sans-serif" }}>
      <Suspense fallback={<div className="w-full h-full bg-[#0d0d0d]" />}>
        <GenerativeArtScene />
      </Suspense>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/60 to-[#0d0d0d]/30 z-10" />

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-6">
        <div className="max-w-2xl mx-auto text-center" style={{ animation: "fadeIn 1s ease-out forwards" }}>
          <TextGlow>
            <div className="mb-8">
              <div className="inline-block px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm">
                <span className="text-xs font-mono tracking-[0.25em] uppercase text-white/60">
                  By Invitation Only
                </span>
              </div>
            </div>

            <div className="mb-4">
              <NirvanaLogo className="h-5 mx-auto opacity-60" />
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.1]">
              Healthcare AI
              <br />
              <span className="font-normal bg-gradient-to-r from-blue-300 via-sky-200 to-blue-400 bg-clip-text text-transparent">
                Executive Dinner
              </span>
            </h1>

            <div className="mt-10 max-w-lg mx-auto" style={{ animation: "fadeInSlow 1.2s ease-out 0.3s both" }}>
              <p className="text-base sm:text-lg text-white leading-relaxed">
                Join CFOs, RCM leaders, alongside AI leaders from OpenAI, Anthropic
                and more at this intimate dinner to trade notes and discuss how to
                improve healthcare revenue operations.
              </p>
            </div>

            <div className="mt-12 flex flex-col items-center gap-6" style={{ animation: "fadeInSlow 1.2s ease-out 0.5s both" }}>
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-sm font-mono tracking-wider uppercase text-white/60">
                <span>July 23, 2025</span>
                <span className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
                <span>5:00 PM &ndash; 9:00 PM</span>
                <span className="hidden sm:block w-1 h-1 rounded-full bg-white/20" />
                <span>New York City</span>
              </div>

              <button
                onClick={() => setOpen(true)}
                className="mt-4 relative px-10 py-4 text-sm font-mono tracking-[0.15em] uppercase bg-white text-black hover:bg-white/90 rounded-full transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] cursor-pointer"
              >
                RSVP
              </button>

              <p className="text-xs font-mono text-gray-400 tracking-wider">
                Please RSVP by May 15, 2025
              </p>
            </div>
          </TextGlow>
        </div>
      </div>

      <RSVPDialog
        open={open}
        onClose={() => setOpen(false)}
        onSubmit={handleSubmit}
        submitted={submitted}
        submitting={submitting}
        name={name}
        onNameChange={(e) => setName(e.target.value)}
        email={email}
        onEmailChange={(e) => setEmail(e.target.value)}
      />

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeInSlow {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        dialog::backdrop {
          background: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
        }
      `}</style>
    </div>
  );
}
