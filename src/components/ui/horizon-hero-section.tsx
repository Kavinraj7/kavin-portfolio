'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { motion, AnimatePresence } from 'framer-motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SLIDES = [
  {
    title: 'HORIZON',
    line1: 'WHERE VISION MEETS REALITY,',
    line2: 'WE SHAPE THE FUTURE OF TOMORROW'
  },
  {
    title: 'COSMOS',
    line1: 'BEYOND THE BOUNDARIES OF IMAGINATION,',
    line2: 'LIES THE UNIVERSE OF POSSIBILITIES'
  },
  {
    title: 'INFINITY',
    line1: 'IN THE SPACE BETWEEN THOUGHT AND CREATION,',
    line2: 'WE FIND THE ESSENCE OF TRUE INNOVATION'
  }
];

interface ThreeRefsState {
  scene: THREE.Scene | null;
  camera: THREE.PerspectiveCamera | null;
  renderer: THREE.WebGLRenderer | null;
  composer: EffectComposer | null;
  dustParticles: THREE.Points[];
  mountains: THREE.Mesh[];
  nebula: THREE.Mesh | null;
  animationId: number | null;
  locations?: number[];
  targetCameraX: number;
  targetCameraY: number;
  targetCameraZ: number;
}

export const Component = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLDivElement | null>(null);
  const scrollProgressRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const smoothCameraPos = useRef({ x: 0, y: 30, z: 300 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const threeRefs = useRef<ThreeRefsState>({
    scene: null,
    camera: null,
    renderer: null,
    composer: null,
    dustParticles: [],
    mountains: [],
    nebula: null,
    animationId: null,
    targetCameraX: 0,
    targetCameraY: 30,
    targetCameraZ: 300
  });

  // Initialize Three.js Scene with White Background and Black Dust Particles
  useEffect(() => {
    if (!canvasRef.current) return;

    const { current: refs } = threeRefs;

    // Scene
    refs.scene = new THREE.Scene();
    refs.scene.background = new THREE.Color(0xffffff);
    refs.scene.fog = new THREE.FogExp2(0xffffff, 0.00035);

    // Camera
    refs.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    );
    refs.camera.position.set(0, 30, 300);

    // Renderer
    refs.renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: false
    });
    refs.renderer.setSize(window.innerWidth, window.innerHeight);
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Post-processing
    refs.composer = new EffectComposer(refs.renderer);
    const renderPass = new RenderPass(refs.scene, refs.camera);
    refs.composer.addPass(renderPass);

    // 1. Black Dust Particles Field (3 layers of depth)
    const dustCount = 2000;
    const darkPalette = [
      new THREE.Color('#000000'),
      new THREE.Color('#111827'),
      new THREE.Color('#1F2937'),
      new THREE.Color('#374151'),
      new THREE.Color('#4B5563')
    ];

    for (let layer = 0; layer < 3; layer++) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(dustCount * 3);
      const colors = new Float32Array(dustCount * 3);
      const sizes = new Float32Array(dustCount);

      for (let j = 0; j < dustCount; j++) {
        const radius = 150 + Math.random() * 850;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) + 20;
        positions[j * 3 + 2] = radius * Math.cos(phi);

        const col = darkPalette[Math.floor(Math.random() * darkPalette.length)];
        colors[j * 3] = col.r;
        colors[j * 3 + 1] = col.g;
        colors[j * 3 + 2] = col.b;

        sizes[j] = Math.random() * 3.5 + 1.2;
      }

      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

      const material = new THREE.ShaderMaterial({
        uniforms: {
          time: { value: 0 },
          depth: { value: layer }
        },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          uniform float time;
          uniform float depth;
          void main() {
            vColor = color;
            vec3 pos = position;
            float angle = time * 0.04 * (1.0 - depth * 0.28);
            mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
            pos.xy = rot * pos.xy;
            pos.y += sin(time * 0.4 + pos.x * 0.01) * 8.0;
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_PointSize = size * (300.0 / -mvPosition.z);
            gl_Position = projectionMatrix * mvPosition;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float dist = length(gl_PointCoord - vec2(0.5));
            if (dist > 0.5) discard;
            float opacity = 1.0 - smoothstep(0.0, 0.5, dist);
            gl_FragColor = vec4(vColor, opacity * 0.75);
          }
        `,
        transparent: true,
        blending: THREE.NormalBlending,
        depthWrite: false
      });

      const dust = new THREE.Points(geometry, material);
      if (refs.scene) {
        refs.scene.add(dust);
      }
      refs.dustParticles.push(dust);
    }

    // 2. Parallax Mountain Layers (Sculpted Minimalist Silhouette on White)
    const mountainLayers = [
      { distance: -50, height: 60, color: 0xd1d5db, opacity: 0.95 },
      { distance: -100, height: 80, color: 0x9ca3af, opacity: 0.85 },
      { distance: -150, height: 100, color: 0x6b7280, opacity: 0.7 },
      { distance: -200, height: 120, color: 0x374151, opacity: 0.5 }
    ];

    mountainLayers.forEach((layer, index) => {
      const points: THREE.Vector2[] = [];
      const segments = 50;

      for (let i = 0; i <= segments; i++) {
        const x = (i / segments - 0.5) * 1000;
        const y = Math.sin(i * 0.1) * layer.height +
                 Math.sin(i * 0.05) * layer.height * 0.5 +
                 Math.random() * layer.height * 0.2 - 100;
        points.push(new THREE.Vector2(x, y));
      }

      points.push(new THREE.Vector2(5000, -300));
      points.push(new THREE.Vector2(-5000, -300));

      const shape = new THREE.Shape(points);
      const geometry = new THREE.ShapeGeometry(shape);
      const material = new THREE.MeshBasicMaterial({
        color: layer.color,
        transparent: true,
        opacity: layer.opacity,
        side: THREE.DoubleSide
      });

      const mountain = new THREE.Mesh(geometry, material);
      mountain.position.z = layer.distance;
      mountain.position.y = layer.distance;
      mountain.userData = { baseZ: layer.distance, index };
      if (refs.scene) {
        refs.scene.add(mountain);
      }
      refs.mountains.push(mountain);
    });

    // 3. Subtle Atmospheric Mist Wave Shader
    const nebulaGeom = new THREE.PlaneGeometry(8000, 4000, 80, 80);
    const nebulaMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color('#E5E7EB') },
        color2: { value: new THREE.Color('#D1D5DB') },
        opacity: { value: 0.35 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vElevation;
        uniform float time;
        void main() {
          vUv = uv;
          vec3 pos = position;
          float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 20.0;
          pos.z += elevation;
          vElevation = elevation;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform float opacity;
        varying vec2 vUv;
        varying float vElevation;
        void main() {
          float mixFactor = sin(vUv.x * 8.0 + time * 0.5) * cos(vUv.y * 8.0 + time * 0.5);
          vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
          float alpha = opacity * (1.0 - length(vUv - 0.5) * 1.8);
          alpha *= 1.0 + vElevation * 0.012;
          gl_FragColor = vec4(color, max(alpha, 0.0));
        }
      `,
      transparent: true,
      blending: THREE.NormalBlending,
      side: THREE.DoubleSide,
      depthWrite: false
    });

    refs.nebula = new THREE.Mesh(nebulaGeom, nebulaMat);
    refs.nebula.position.z = -1050;
    if (refs.scene) {
      refs.scene.add(refs.nebula);
    }

    const locations: number[] = [];
    refs.mountains.forEach((m, i) => {
      locations[i] = m.position.z;
    });
    refs.locations = locations;

    // Animation Loop with Easing & Float Sway
    const animate = () => {
      refs.animationId = requestAnimationFrame(animate);
      const time = Date.now() * 0.001;

      // Update Dust Particles
      refs.dustParticles.forEach((dust) => {
        if (dust.material && (dust.material as THREE.ShaderMaterial).uniforms?.time) {
          (dust.material as THREE.ShaderMaterial).uniforms.time.value = time;
        }
      });

      // Update Mist
      if (refs.nebula && (refs.nebula.material as THREE.ShaderMaterial).uniforms?.time) {
        (refs.nebula.material as THREE.ShaderMaterial).uniforms.time.value = time * 0.5;
      }

      // Smooth Camera Movement with Floating Motion
      const smoothingFactor = 0.055;
      smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * smoothingFactor;
      smoothCameraPos.current.y += (refs.targetCameraY - smoothCameraPos.current.y) * smoothingFactor;
      smoothCameraPos.current.z += (refs.targetCameraZ - smoothCameraPos.current.z) * smoothingFactor;

      const floatX = Math.sin(time * 0.1) * 2;
      const floatY = Math.cos(time * 0.15) * 1;

      if (refs.camera) {
        refs.camera.position.x = smoothCameraPos.current.x + floatX;
        refs.camera.position.y = smoothCameraPos.current.y + floatY;
        refs.camera.position.z = smoothCameraPos.current.z;
        refs.camera.lookAt(0, 10, -600);
      }

      // Parallax Mountains
      refs.mountains.forEach((mountain, i) => {
        const parallaxFactor = 1 + i * 0.5;
        mountain.position.x = Math.sin(time * 0.1) * 2 * parallaxFactor;
        mountain.position.y = 50 + Math.cos(time * 0.15) * 1 * parallaxFactor;
      });

      if (refs.composer) {
        refs.composer.render();
      }
    };

    animate();
    setIsReady(true);

    const handleResize = () => {
      if (refs.camera && refs.renderer && refs.composer) {
        refs.camera.aspect = window.innerWidth / window.innerHeight;
        refs.camera.updateProjectionMatrix();
        refs.renderer.setSize(window.innerWidth, window.innerHeight);
        refs.composer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (refs.animationId) cancelAnimationFrame(refs.animationId);
      window.removeEventListener('resize', handleResize);

      refs.dustParticles.forEach((d) => {
        d.geometry.dispose();
        (d.material as THREE.Material).dispose();
      });
      refs.mountains.forEach((m) => {
        m.geometry.dispose();
        (m.material as THREE.Material).dispose();
      });
      if (refs.nebula) {
        refs.nebula.geometry.dispose();
        (refs.nebula.material as THREE.Material).dispose();
      }
      refs.renderer?.dispose();
    };
  }, []);

  // GSAP Entrance Animations
  useEffect(() => {
    if (!isReady) return;

    gsap.set([menuRef.current, scrollProgressRef.current, subtitleRef.current], {
      visibility: 'visible'
    });

    const tl = gsap.timeline();

    if (menuRef.current) {
      tl.from(menuRef.current, {
        x: -80,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out'
      });
    }

    if (scrollProgressRef.current) {
      tl.from(scrollProgressRef.current, {
        x: 80,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out'
      }, '-=0.8');
    }

    return () => {
      tl.kill();
    };
  }, [isReady]);

  // Mouse Move Parallax
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const normX = (e.clientX / window.innerWidth - 0.5) * 2;
    const normY = (e.clientY / window.innerHeight - 0.5) * 2;
    setMousePos({ x: normX, y: normY });

    const { current: refs } = threeRefs;
    refs.targetCameraX = normX * 18;
    refs.targetCameraY = 30 - normY * 12;
  };

  // Scroll Handling linked to Hero Container Track
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollDistance = rect.height - windowHeight;

      if (totalScrollDistance <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.min(Math.max(scrolled / totalScrollDistance, 0), 1);
      setScrollProgress(progress);

      const slideIdx = Math.min(Math.floor(progress * SLIDES.length), SLIDES.length - 1);
      setActiveSlideIndex(slideIdx);

      // Camera positions for each slide checkpoint:
      // Slide 0 (HORIZON): z = 300, y = 30
      // Slide 1 (COSMOS): z = -50, y = 40
      // Slide 2 (INFINITY): z = -700, y = 50
      const cameraPositions = [
        { x: 0, y: 30, z: 300 },
        { x: 0, y: 40, z: -50 },
        { x: 0, y: 50, z: -700 }
      ];

      const slideProgress = progress * (cameraPositions.length - 1);
      const curIdx = Math.min(Math.floor(slideProgress), cameraPositions.length - 2);
      const frac = slideProgress - curIdx;

      const p1 = cameraPositions[curIdx];
      const p2 = cameraPositions[curIdx + 1];

      const { current: refs } = threeRefs;
      refs.targetCameraX = p1.x + (p2.x - p1.x) * frac;
      refs.targetCameraY = p1.y + (p2.y - p1.y) * frac;
      refs.targetCameraZ = p1.z + (p2.z - p1.z) * frac;

      // Parallax Mountains on Scroll
      refs.mountains.forEach((mountain, i) => {
        const speed = 1 + i * 0.9;
        const targetZ = mountain.userData.baseZ + progress * 500 * speed;
        if (refs.nebula) {
          refs.nebula.position.z = (targetZ + progress * speed * 0.01) - 100;
        }

        mountain.userData.targetZ = targetZ;
        if (refs.locations) {
          if (progress > 0.75) {
            mountain.position.z = 600000;
          } else {
            mountain.position.z = refs.locations[i];
          }
        }
      });
      if (refs.nebula && refs.mountains[3]) {
        refs.nebula.position.z = refs.mountains[3].position.z;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const splitTitle = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="title-char inline-block transition-transform duration-300 hover:scale-105">
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  const activeSlide = SLIDES[activeSlideIndex] || SLIDES[0];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="hero-container cosmos-style relative w-full h-[300vh] bg-white text-black select-none"
    >
      {/* Pinned Sticky Viewport (100vh) */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-white">
        {/* Layer 1: Three.js 3D Canvas (White Canvas with 3-Layer Black Dust Particle Field & Mountain Silhouettes) */}
        <canvas
          ref={canvasRef}
          className="hero-canvas absolute inset-0 w-full h-full pointer-events-none z-[1]"
        />

        {/* Layer 2: Subtle Ambient Radial Light Gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.015)_0%,rgba(0,0,0,0.04)_100%)] pointer-events-none z-[2]" />

        {/* Layer 3: Left Side Navigation Menu */}
        <div
          ref={menuRef}
          className="side-menu absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-6 pointer-events-auto"
          style={{ visibility: 'hidden' }}
        >
          <button
            type="button"
            aria-label="Toggle Space Menu"
            className="menu-icon flex items-center justify-center w-11 h-11 rounded-full bg-white/80 hover:bg-black/5 border border-black/10 backdrop-blur-md transition-all shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:border-black/30"
          >
            <div className="flex gap-1">
              <span className="w-0.5 h-4 bg-black/80 rounded-full"></span>
              <span className="w-0.5 h-4 bg-black/80 rounded-full"></span>
              <span className="w-0.5 h-4 bg-black/80 rounded-full"></span>
            </div>
          </button>
          <div className="vertical-text [writing-mode:vertical-rl] tracking-[0.45em] text-[11px] font-bold text-black/60 uppercase flex items-center gap-2">
            <span className="w-3 h-px bg-black/30 mb-1"></span>
            SPACE
          </div>
        </div>

        {/* Layer 4: Hero Central Typography (Vibrant Red Titles with Non-wrapping Typography) */}
        <div className="hero-content cosmos-content relative z-10 w-full max-w-7xl px-4 sm:px-8 flex flex-col items-center justify-center text-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.title}
              initial={{ opacity: 0, y: 35, filter: 'blur(10px)', scale: 0.97 }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, y: -35, filter: 'blur(10px)', scale: 1.03 }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center text-center w-full"
            >
              {/* Giant Vibrant Red Title (Strictly Single-Line with whitespace-nowrap) */}
              <h1
                ref={titleRef}
                className="hero-title whitespace-nowrap text-5xl sm:text-7xl md:text-8xl lg:text-[7.2vw] xl:text-[8vw] font-black tracking-[0.12em] sm:tracking-[0.15em] md:tracking-[0.18em] uppercase leading-none select-none text-[#E50914] drop-shadow-[0_4px_30px_rgba(229,9,20,0.28)]"
              >
                {splitTitle(activeSlide.title)}
              </h1>

              {/* Subtitles in Dark Neutral */}
              <div
                ref={subtitleRef}
                className="hero-subtitle cosmos-subtitle mt-6 sm:mt-9 max-w-2xl text-center space-y-1.5 sm:space-y-2"
              >
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                  className="subtitle-line text-xs sm:text-sm md:text-base text-gray-700 font-medium tracking-[0.28em] uppercase"
                >
                  {activeSlide.line1}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
                  className="subtitle-line text-xs sm:text-sm md:text-base text-gray-500 font-medium tracking-[0.28em] uppercase"
                >
                  {activeSlide.line2}
                </motion.p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Layer 5: Scroll Progress Indicator (Right) */}
        <div
          ref={scrollProgressRef}
          className="scroll-progress absolute right-6 md:right-12 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-3 pointer-events-none select-none"
          style={{ visibility: 'hidden' }}
        >
          <div className="scroll-text [writing-mode:vertical-rl] tracking-[0.4em] text-[10px] font-bold text-black/50 uppercase">
            SCROLL
          </div>
          <div className="progress-track w-0.5 h-28 bg-black/10 rounded-full overflow-hidden relative">
            <div
              className="progress-fill w-full bg-black rounded-full transition-all duration-100 shadow-[0_0_8px_rgba(0,0,0,0.3)]"
              style={{ height: `${scrollProgress * 100}%` }}
            />
          </div>
          <div className="section-counter font-mono text-[11px] font-bold text-black/75 tracking-widest">
            {String(activeSlideIndex + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}
          </div>
        </div>

        {/* Layer 6: Bottom Center Scroll Hint */}
        <motion.div
          animate={{ opacity: scrollProgress > 0.92 ? 0 : 0.75 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-7 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
        >
          <span className="text-[10px] tracking-[0.35em] uppercase text-black/60 font-semibold font-mono">
            SCROLL TO EXPLORE
          </span>
          <div className="w-4 h-7 border border-black/30 rounded-full flex justify-center pt-1.5 shadow-[0_1px_6px_rgba(0,0,0,0.05)]">
            <motion.div
              animate={{ y: [0, 8, 0], opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
              className="w-1 h-1.5 bg-black rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const HorizonHeroSection = Component;
