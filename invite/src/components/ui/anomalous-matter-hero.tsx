import { useRef, useEffect, Suspense } from "react";
import * as THREE from "three";

export function GenerativeArtScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    currentMount.appendChild(renderer.domElement);

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
          vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
          p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
          vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
          m = m * m;
          return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
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
        uniform float time;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vWorldPosition;

        void main() {
          vec3 normal = normalize(vNormal);
          float fresnel = 1.0 - abs(dot(normal, vec3(0.0, 0.0, 1.0)));
          fresnel = pow(fresnel, 1.5);
          float gradient = (vWorldPosition.y + 4.0) / 8.0;
          vec3 color = mix(colorA, colorB, gradient);
          vec3 finalColor = color * (0.3 + fresnel * 0.7);

          float dist = length(vPosition);
          float angle = atan(vPosition.y, vPosition.x);

          float streaks = 0.0;
          for (int i = 0; i < 3; i++) {
            float fi = float(i);
            float phase = fi * 2.09 + fi * 17.3;
            float cycleTime = mod(time * 0.8 + phase, 4.0 + fi * 1.5);
            float waveFront = cycleTime * 1.2;
            float radialFade = exp(-2.5 * abs(dist - waveFront)) * step(0.0, waveFront - 0.1);
            float angleSeed = fi * 43.7 + floor((time * 0.8 + phase) / (4.0 + fi * 1.5)) * 91.3;
            float streakAngle = fract(sin(angleSeed) * 43758.5453) * 6.283;
            float angularMask = pow(max(0.0, cos((angle - streakAngle) * 3.0)), 8.0);
            float fade = smoothstep(0.0, 0.3, cycleTime) * smoothstep(4.0 + fi * 1.5, 1.5, cycleTime);
            streaks += radialFade * angularMask * fade * 0.45;
          }

          finalColor += vec3(streaks);

          float glint = 0.0;
          for (int i = 0; i < 5; i++) {
            float fi = float(i);
            float speed = 0.3 + fi * 0.15;
            vec3 seed = vec3(fi * 7.13, fi * 13.7, fi * 3.91);
            float travel = fract(sin(dot(seed, vec3(12.9898, 78.233, 45.164))) * 43758.5453);
            float wave = sin(vPosition.x * 6.0 + vPosition.y * 4.0 + vPosition.z * 5.0 + time * speed + travel * 30.0);
            float spike = pow(max(0.0, wave), 40.0);
            float flicker = 0.5 + 0.5 * sin(time * (1.2 + fi * 0.7) + fi * 5.0);
            glint += spike * flicker * 0.24;
          }
          finalColor += vec3(glint);

          float facing = dot(normal, vec3(0.0, 0.0, 1.0));
          float depthFade = smoothstep(-0.45, 0.05, facing);
          finalColor *= depthFade;

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

    let frameId: number;
    const animate = (t: number) => {
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
      if (!currentMount) return;
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.x = (e.clientX / window.innerWidth) * 2 - 1;
      mousePos.y = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotY.value = mousePos.x * 0.4;
      targetRotX.value = -mousePos.y * 0.3;
    };

    const handleClick = (e: MouseEvent) => {
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
      if (currentMount && renderer.domElement.parentNode === currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full z-0" />;
}

export function AnomalousMatterHero({
  title = "Observation Log: Anomaly 7",
  subtitle = "Matter in a state of constant, beautiful flux.",
  description = "A new form of digital existence has been observed. It responds to stimuli, changes form, and exudes an unknown energy. Further study is required.",
}: {
  title?: string;
  subtitle?: string;
  description?: string;
}) {
  return (
    <section
      role="banner"
      className="relative w-full h-screen bg-background text-foreground overflow-hidden"
    >
      <Suspense
        fallback={<div className="w-full h-full bg-background" />}
      >
        <GenerativeArtScene />
      </Suspense>

      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent z-10" />

      <div className="relative z-20 flex flex-col items-center justify-end h-full pb-20 md:pb-32 text-center">
        <div className="max-w-3xl px-4 animate-fade-in">
          <h1 className="text-sm font-mono tracking-widest text-sky-300/80 uppercase">
            {title}
          </h1>
          <p className="mt-4 text-3xl md:text-5xl font-bold leading-tight">
            {subtitle}
          </p>
          <p className="mt-6 max-w-xl mx-auto text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
