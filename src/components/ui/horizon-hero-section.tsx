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
    line1: 'A NEW WORLD, A NEW BEGINNING.',
    line2: 'I entered engineering with questions, curiosity, and no fixed idea of where the journey would lead'
  },
  {
    title: 'DISCOVERY',
    line1: 'FINDING WHAT I COULD BECOME.',
    line2: 'Through development, leadership, and experimentation, I began discovering my strengths and the many directions I could pursue.'
  },
  {
    title: 'BECOMING',
    line1: 'STILL GROWING. STILL EXPLORING.',
    line2: 'Today, I bring together technology, data, AI, and management—with a story that continues to evolve.'
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
  targetCameraX: number;
  targetCameraY: number;
  targetCameraZ: number;
  currentProgress: number;
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
  const [, setMousePos] = useState({ x: 0, y: 0 });

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
    targetCameraZ: 300,
    currentProgress: 0
  });

  // Initialize Three.js Scene with White Sky, Shaded Golden-Yellow Hills & Atmospheric Dust
  useEffect(() => {
    if (!canvasRef.current) return;

    const { current: refs } = threeRefs;

    // Scene
    refs.scene = new THREE.Scene();
    refs.scene.background = new THREE.Color(0xffffff);
    refs.scene.fog = new THREE.FogExp2(0xffffff, 0.00032);

    // Camera
    refs.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      2200
    );
    refs.camera.position.set(0, 30, 300);

    // Renderer
    refs.renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: false
    });
    const isMobileView = typeof window !== 'undefined' && window.innerWidth < 768;
    refs.renderer.setSize(window.innerWidth, window.innerHeight);
    refs.renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobileView ? 1.5 : 2));

    // Post-processing
    refs.composer = new EffectComposer(refs.renderer);
    const renderPass = new RenderPass(refs.scene, refs.camera);
    refs.composer.addPass(renderPass);

    // 1. Black Dust Particles Field (adaptive particle count for silky mobile FPS)
    const dustCount = isMobileView ? 650 : 1800;
    const darkPalette = [
      new THREE.Color('#000000'),
      new THREE.Color('#1F2937'),
      new THREE.Color('#374151'),
      new THREE.Color('#4B5563'),
      new THREE.Color('#6B7280'),
      new THREE.Color('#CA8A04') // subtle gold speck highlight
    ];

    for (let layer = 0; layer < 3; layer++) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(dustCount * 3);
      const colors = new Float32Array(dustCount * 3);
      const sizes = new Float32Array(dustCount);

      for (let j = 0; j < dustCount; j++) {
        const radius = 140 + Math.random() * 880;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);

        positions[j * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[j * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) + 25;
        positions[j * 3 + 2] = radius * Math.cos(phi);

        const col = darkPalette[Math.floor(Math.random() * darkPalette.length)];
        colors[j * 3] = col.r;
        colors[j * 3 + 1] = col.g;
        colors[j * 3 + 2] = col.b;

        sizes[j] = Math.random() * 3.4 + 1.2;
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

    // 2. Parallax Mountain Layers (Sculpted Volumetric Gradients + Highlight Contour Ridges)
    // Luminous, radiant #FFEE00 to sunny golden tones with peaks framing below subtitle
    const mountainLayers = [
      {
        distance: -40,
        baseY: -140,
        height: 40,
        topColor: '#FFEE00',
        bottomColor: '#FDE047',
        ridgeColor: '#EAB308',
        opacity: 0.98,
      },
      {
        distance: -115,
        baseY: -125,
        height: 50,
        topColor: '#FFF133',
        bottomColor: '#FACC15',
        ridgeColor: '#CA8A04',
        opacity: 0.94,
      },
      {
        distance: -195,
        baseY: -112,
        height: 60,
        topColor: '#FACC15',
        bottomColor: '#EAB308',
        ridgeColor: '#CA8A04',
        opacity: 0.88,
      },
      {
        distance: -285,
        baseY: -100,
        height: 70,
        topColor: '#FBBF24',
        bottomColor: '#D97706',
        ridgeColor: '#B45309',
        opacity: 0.84,
      },
    ];

    mountainLayers.forEach((layer, index) => {
      const points: THREE.Vector2[] = [];
      const ridgePoints: THREE.Vector3[] = [];
      const segments = 100;

      for (let i = 0; i <= segments; i++) {
        const norm = (i / segments - 0.5) * 2;
        const x = norm * 1400;

        // Smooth harmonious mountain curves (no spiky artifacts)
        const freq1 = 0.0032 + index * 0.0008;
        const freq2 = 0.0078 + index * 0.0012;
        const freq3 = 0.016;

        const wave1 = Math.sin(x * freq1 + index * 1.8) * layer.height;
        const wave2 = Math.cos(x * freq2 + index * 1.2) * (layer.height * 0.42);
        const wave3 = Math.sin(x * freq3 + index * 0.8) * (layer.height * 0.16);

        // Natural falloff towards the edges
        const falloff = Math.cos(norm * (Math.PI * 0.44));
        const y = (wave1 + wave2 + wave3) * Math.max(0, falloff);

        points.push(new THREE.Vector2(x, y));
        ridgePoints.push(new THREE.Vector3(x, y + 0.35, 0.4));
      }

      // Base polygon to floor
      points.push(new THREE.Vector2(6000, -400));
      points.push(new THREE.Vector2(-6000, -400));

      const shape = new THREE.Shape(points);
      const geometry = new THREE.ShapeGeometry(shape);

      // Custom volumetric vertical gradient shader material
      const material = new THREE.ShaderMaterial({
        uniforms: {
          topColor: { value: new THREE.Color(layer.topColor) },
          bottomColor: { value: new THREE.Color(layer.bottomColor) },
          opacity: { value: layer.opacity },
          minY: { value: -220.0 },
          maxY: { value: layer.height * 0.9 },
        },
        vertexShader: `
          varying vec3 vPos;
          void main() {
            vPos = position;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform vec3 topColor;
          uniform vec3 bottomColor;
          uniform float opacity;
          uniform float minY;
          uniform float maxY;
          varying vec3 vPos;
          void main() {
            float factor = clamp((vPos.y - minY) / (maxY - minY), 0.0, 1.0);
            float t = pow(factor, 0.95);
            vec3 col = mix(bottomColor, topColor, t);
            gl_FragColor = vec4(col, opacity);
          }
        `,
        transparent: true,
        side: THREE.DoubleSide,
      });

      const mountain = new THREE.Mesh(geometry, material);
      mountain.position.z = layer.distance;
      mountain.position.y = layer.baseY;
      mountain.position.x = 0;
      mountain.userData = {
        baseZ: layer.distance,
        baseY: layer.baseY,
        baseOpacity: layer.opacity,
        index
      };

      // Architectural highlighted contour ridge line on mountain crest
      const lineGeo = new THREE.BufferGeometry().setFromPoints(ridgePoints);
      const lineMat = new THREE.LineBasicMaterial({
        color: new THREE.Color(layer.ridgeColor),
        linewidth: 2,
        transparent: true,
        opacity: 0.95,
      });
      const ridge = new THREE.Line(lineGeo, lineMat);
      mountain.add(ridge);

      if (refs.scene) {
        refs.scene.add(mountain);
      }
      refs.mountains.push(mountain);
    });

    // 3. Subtle Warm Atmospheric Horizon Mist
    const nebulaGeom = new THREE.PlaneGeometry(8000, 4000, 60, 60);
    const nebulaMat = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color1: { value: new THREE.Color('#FFFBEB') },
        color2: { value: new THREE.Color('#FEF08A') },
        opacity: { value: 0.16 }
      },
      vertexShader: `
        varying vec2 vUv;
        varying float vElevation;
        uniform float time;
        void main() {
          vUv = uv;
          vec3 pos = position;
          float elevation = sin(pos.x * 0.01 + time) * cos(pos.y * 0.01 + time) * 18.0;
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
          float mixFactor = sin(vUv.x * 6.0 + time * 0.4) * cos(vUv.y * 6.0 + time * 0.4);
          vec3 color = mix(color1, color2, mixFactor * 0.5 + 0.5);
          float alpha = opacity * (1.0 - length(vUv - 0.5) * 1.8);
          alpha *= 1.0 + vElevation * 0.01;
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

    // Animation Loop: Physics-driven Parallax, Sway & Scroll Camera Flight
    let isVisible = true;
    const animate = () => {
      if (!isVisible) return;
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

      // Smooth Camera Movement with Organic Floating Motion
      const smoothingFactor = 0.06;
      smoothCameraPos.current.x += (refs.targetCameraX - smoothCameraPos.current.x) * smoothingFactor;
      smoothCameraPos.current.y += (refs.targetCameraY - smoothCameraPos.current.y) * smoothingFactor;
      smoothCameraPos.current.z += (refs.targetCameraZ - smoothCameraPos.current.z) * smoothingFactor;

      const floatX = Math.sin(time * 0.15) * 1.8;
      const floatY = Math.cos(time * 0.2) * 1.2;

      if (refs.camera) {
        refs.camera.position.x = smoothCameraPos.current.x + floatX;
        refs.camera.position.y = smoothCameraPos.current.y + floatY;
        refs.camera.position.z = smoothCameraPos.current.z;
        refs.camera.lookAt(0, 15, -600);
      }

      // Smooth Mountain Parallax Motion driven by scroll progress
      const p = refs.currentProgress;
      refs.mountains.forEach((mountain, i) => {
        const speed = 1.0 + i * 0.45;
        const scrollZ = p * 420 * speed;
        const targetZ = mountain.userData.baseZ + scrollZ;

        // Smooth glide toward target Z
        mountain.position.z += (targetZ - mountain.position.z) * 0.12;

        // Natural sway + mouse parallax
        const swayX = Math.sin(time * 0.14 + i * 1.2) * (1.6 + i * 0.8);
        const swayY = Math.cos(time * 0.18 + i * 0.9) * (1.2 + i * 0.5);
        const parallaxX = -refs.targetCameraX * 0.28 * (1 + i * 0.15);
        const parallaxY = -refs.targetCameraY * 0.18 * (1 + i * 0.15);

        mountain.position.x = swayX + parallaxX;
        mountain.position.y = mountain.userData.baseY + swayY + parallaxY - p * 32 * (i * 0.2 + 0.4);

        // Smooth proximity fade as camera flies toward/past mountain
        if (refs.camera) {
          const distToCam = mountain.position.z - refs.camera.position.z;
          if (distToCam > -45) {
            const fade = Math.max(0, Math.min(1, -distToCam / 70));
            const baseOp = mountain.userData.baseOpacity || 0.9;
            const mat = mountain.material as THREE.ShaderMaterial;
            if (mat.uniforms?.opacity) {
              mat.uniforms.opacity.value = baseOp * fade;
            }
          }
        }
      });

      if (refs.composer) {
        refs.composer.render();
      }
    };

    animate();
    setIsReady(true);

    // IntersectionObserver to pause WebGL render loop when section is scrolled out of viewport
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined' && containerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (!isVisible) {
                isVisible = true;
                if (refs.animationId) cancelAnimationFrame(refs.animationId);
                refs.animationId = requestAnimationFrame(animate);
              }
            } else {
              isVisible = false;
              if (refs.animationId) cancelAnimationFrame(refs.animationId);
            }
          });
        },
        { threshold: 0.05 }
      );
      observer.observe(containerRef.current);
    }

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
      if (observer) observer.disconnect();
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

    if (titleRef.current) {
      tl.from(titleRef.current, {
        y: 35,
        opacity: 0,
        scale: 0.96,
        duration: 1.1,
        ease: 'power3.out'
      });
    }

    if (menuRef.current) {
      tl.from(menuRef.current, {
        x: -80,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out'
      }, '-=0.85');
    }

    if (scrollProgressRef.current) {
      tl.from(scrollProgressRef.current, {
        x: 80,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out'
      }, '-=0.85');
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

      const { current: refs } = threeRefs;
      refs.currentProgress = progress;

      const slideIdx = Math.min(Math.floor(progress * SLIDES.length), SLIDES.length - 1);
      setActiveSlideIndex(slideIdx);

      // Camera positions for each slide checkpoint:
      // Slide 0 (HORIZON): z = 300, y = 30
      // Slide 1 (DISCOVERY): z = -50, y = 35
      // Slide 2 (BECOMING): z = -450, y = 40
      const cameraPositions = [
        { x: 0, y: 30, z: 300 },
        { x: 0, y: 35, z: -50 },
        { x: 0, y: 40, z: -450 }
      ];

      const slideProgress = progress * (cameraPositions.length - 1);
      const curIdx = Math.min(Math.floor(slideProgress), cameraPositions.length - 2);
      const frac = slideProgress - curIdx;

      const p1 = cameraPositions[curIdx];
      const p2 = cameraPositions[curIdx + 1];

      refs.targetCameraX = p1.x + (p2.x - p1.x) * frac;
      refs.targetCameraY = p1.y + (p2.y - p1.y) * frac;
      refs.targetCameraZ = p1.z + (p2.z - p1.z) * frac;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cascading 3D letter wave animation
  const splitTitle = (text: string) => {
    return text.split('').map((char, i) => (
      <motion.span
        key={`${text}-${i}`}
        initial={{ opacity: 0, y: 35, rotateX: 55 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{
          duration: 0.55,
          delay: i * 0.035,
          ease: [0.215, 0.61, 0.355, 1],
        }}
        className="title-char inline-block transition-transform duration-300 hover:scale-110 select-none"
      >
        {char === ' ' ? '\u00A0' : char}
      </motion.span>
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.015)_0%,rgba(0,0,0,0.03)_100%)] pointer-events-none z-[2]" />

        {/* Layer 3: Left Side Navigation Menu */}
        <div
          ref={menuRef}
          className="side-menu absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-6 pointer-events-auto"
          style={{ visibility: 'hidden' }}
        >
          <div className="vertical-text [writing-mode:vertical-rl] tracking-[0.45em] text-[11px] font-bold text-black/60 uppercase flex items-center gap-2">
            <span className="w-3 h-px bg-black/30 mb-1"></span>
            MY JOURNEY
          </div>
        </div>

        {/* Layer 4: Hero Central Typography (Pure Black Titles with Cascading Characters & Non-wrapping Typography) */}
        <div className="hero-content cosmos-content relative z-10 w-full max-w-7xl px-4 sm:px-8 flex flex-col items-center justify-center text-center pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide.title}
              initial={{ opacity: 0, y: 35, filter: 'blur(8px)', scale: 0.98 }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
              exit={{ opacity: 0, y: -35, filter: 'blur(8px)', scale: 1.02 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center justify-center text-center w-full"
            >
              {/* Giant Black Title */}
              <h1
                ref={titleRef}
                className="hero-title whitespace-nowrap text-5xl sm:text-7xl md:text-8xl lg:text-[7.2vw] xl:text-[8vw] font-black tracking-[0.12em] sm:tracking-[0.15em] md:tracking-[0.18em] uppercase leading-none select-none text-black drop-shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
              >
                {splitTitle(activeSlide.title)}
              </h1>

              {/* Subtitles in Dark Neutral Above Mountains with Crystal-Clear Readability */}
              <div
                ref={subtitleRef}
                className="hero-subtitle cosmos-subtitle mt-5 sm:mt-7 max-w-2xl text-center space-y-1.5 sm:space-y-2"
              >
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15, ease: 'easeOut' }}
                  className="subtitle-line text-xs sm:text-sm md:text-base text-zinc-800 font-semibold tracking-[0.25em] uppercase"
                >
                  {activeSlide.line1}
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
                  className="subtitle-line text-xs sm:text-sm md:text-base text-zinc-600 font-medium tracking-[0.18em] uppercase leading-relaxed"
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
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none z-20"
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
