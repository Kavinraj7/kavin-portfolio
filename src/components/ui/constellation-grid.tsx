'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    baseX: number;
    baseY: number;
    radius: number;
    label: string;
    pulse: number;
}

interface ConstellationGridProps {
    className?: string;
    showOverlay?: boolean;
    forceDark?: boolean;
}

export default function ConstellationGrid({
    className = '',
    showOverlay = false,
    forceDark = true,
}: ConstellationGridProps) {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

    // Sync theme preference or respect forceDark
    useEffect(() => {
        if (forceDark) {
            setIsDarkMode(true);
            return;
        }
        const checkDark = () => {
            const isDocDark = document.documentElement.classList.contains('dark');
            const mediaDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            setIsDarkMode(isDocDark || mediaDark);
        };
        checkDark();
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', checkDark);
        return () => mediaQuery.removeEventListener('change', checkDark);
    }, [forceDark]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: false });
        if (!ctx) return;

        let animationFrameId: number;
        let width = 0;
        let height = 0;

        // Mouse velocity & inertial tracking
        const mouse = {
            x: -1000,
            y: -1000,
            prevX: -1000,
            prevY: -1000,
            vx: 0,
            vy: 0,
            radius: 140,
        };

        let nodes: Node[] = [];

        const handleResize = () => {
            const container = containerRef.current || canvas.parentElement;
            const parentSection = container?.closest('section') || container?.parentElement;
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            
            width = Math.max(
                window.innerWidth,
                parentSection?.clientWidth || 0,
                container?.clientWidth || 0
            );
            height = Math.max(
                window.innerHeight,
                parentSection?.scrollHeight || 0,
                parentSection?.clientHeight || 0,
                container?.clientHeight || 0
            );

            if (width === 0 || height === 0) {
                width = window.innerWidth;
                height = window.innerHeight;
            }
            
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = '100%';
            canvas.style.height = '100%';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            initNodes();
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        const initNodes = () => {
            nodes = [];
            const spacing = 48; // Dense high-resolution spatial matrix
            const cols = Math.ceil(width / spacing) + 4;
            const rows = Math.ceil(height / spacing) + 8;

            for (let i = -2; i <= cols; i++) {
                for (let j = -2; j <= rows; j++) {
                    const x = i * spacing;
                    const y = j * spacing;
                    nodes.push({
                        x,
                        y,
                        vx: 0,
                        vy: 0,
                        baseX: x,
                        baseY: y,
                        radius: Math.random() * 1.3 + 1.2,
                        label: `${(Math.abs(i) * 7).toString(16).toUpperCase()}:${(Math.abs(j) * 11).toString(16).toUpperCase()}`,
                        pulse: Math.random() * Math.PI * 2,
                    });
                }
            }
        };

        handleResize();
        const resizeObserver = new ResizeObserver(() => {
            handleResize();
        });
        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }
        if (canvas.parentElement) {
            resizeObserver.observe(canvas.parentElement);
        }
        const parentSection = containerRef.current?.closest('section');
        if (parentSection) {
            resizeObserver.observe(parentSection);
        }
        window.addEventListener('resize', handleResize);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        let lastTime = performance.now();

        const render = (now: number) => {
            // Dynamically synchronize canvas size with parent section size
            const container = containerRef.current || canvas.parentElement;
            const currentSection = container?.closest('section') || container?.parentElement;
            const curWidth = Math.max(window.innerWidth, currentSection?.clientWidth || 0, container?.clientWidth || 0);
            const curHeight = Math.max(window.innerHeight, currentSection?.scrollHeight || 0, currentSection?.clientHeight || 0, container?.clientHeight || 0);
            if (curWidth > 0 && curHeight > 0 && (Math.abs(curWidth - width) > 6 || Math.abs(curHeight - height) > 6)) {
                handleResize();
            }

            // Normalize dt across high-refresh displays
            const dt = Math.min((now - lastTime) / 1000, 0.05);
            lastTime = now;

            // Mouse velocity calculation
            mouse.vx = (mouse.x - mouse.prevX) / (dt * 1000 || 1);
            mouse.vy = (mouse.y - mouse.prevY) / (dt * 1000 || 1);
            mouse.prevX = mouse.x;
            mouse.prevY = mouse.y;

            const speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);

            // Color paletting for dark/light seamlessness
            const bgColor = isDarkMode ? '#030407' : '#f8fafc';
            const nodeColor = isDarkMode ? '255, 255, 255' : '15, 23, 42';
            const accentColor = isDarkMode ? '56, 189, 248' : '2, 132, 199'; // Sky Cyan Accent

            ctx.fillStyle = bgColor;
            ctx.fillRect(0, 0, width, height);

            // Node Physics Engine - Tuned for smooth, elegant, non-bouncy response
            const SPRING_K = 10; // Smooth spring stiffness
            const DAMPING = 0.88; // Higher damping for calm, controlled settling without oscillation

            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i];
                n.pulse += dt * 2.2;

                // Gentle ambient kinetic wave
                const waveX = Math.sin(now * 0.001 + n.baseY * 0.012) * 0.6;
                const waveY = Math.cos(now * 0.001 + n.baseX * 0.012) * 0.6;

                // Mouse distance vectors
                const dx = mouse.x - n.x;
                const dy = mouse.y - n.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Smooth gentle repulsion without violent impulses
                if (dist < mouse.radius && dist > 0) {
                    const power = Math.pow(1 - dist / mouse.radius, 1.5);
                    const force = power * (220 + Math.min(speed, 250) * 0.15);
                    const angle = Math.atan2(dy, dx);

                    // Impulse force pushing node away smoothly
                    n.vx -= Math.cos(angle) * force * dt;
                    n.vy -= Math.sin(angle) * force * dt;
                }

                // Calculate restoring force back to home anchor point + ambient wave
                const targetBaseX = n.baseX + waveX;
                const targetBaseY = n.baseY + waveY;
                const homeDx = targetBaseX - n.x;
                const homeDy = targetBaseY - n.y;

                n.vx += homeDx * SPRING_K * dt;
                n.vy += homeDy * SPRING_K * dt;

                // Apply Damping
                n.vx *= DAMPING;
                n.vy *= DAMPING;

                // Integrate position
                n.x += n.vx * dt * 60;
                n.y += n.vy * dt * 60;
            }

            // Draw Connections (Optimized Distance Culling)
            const MAX_CONN_DIST = 75;
            const MAX_CONN_DIST_SQ = MAX_CONN_DIST * MAX_CONN_DIST;

            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i];

                for (let j = i + 1; j < nodes.length; j++) {
                    const n2 = nodes[j];
                    const ndx = n.x - n2.x;
                    const ndy = n.y - n2.y;
                    const distSq = ndx * ndx + ndy * ndy;

                    if (distSq < MAX_CONN_DIST_SQ) {
                        const nDist = Math.sqrt(distSq);
                        const alpha = (1 - nDist / MAX_CONN_DIST) * (isDarkMode ? 0.18 : 0.08);

                        ctx.strokeStyle = `rgba(${nodeColor}, ${alpha})`;
                        ctx.lineWidth = 0.7;
                        ctx.beginPath();
                        ctx.moveTo(n.x, n.y);
                        ctx.lineTo(n2.x, n2.y);
                        ctx.stroke();
                    }
                }
            }

            // Render Node Points & Interactive Highlights
            for (let i = 0; i < nodes.length; i++) {
                const n = nodes[i];
                const dx = mouse.x - n.x;
                const dy = mouse.y - n.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const isNear = dist < mouse.radius;

                // Node base opacity pulse
                const baseAlpha = isNear ? 0.95 : 0.25 + Math.sin(n.pulse) * 0.1;

                ctx.fillStyle = isNear
                    ? `rgba(${accentColor}, ${baseAlpha})`
                    : `rgba(${nodeColor}, ${baseAlpha})`;

                const currentRadius = isNear
                    ? n.radius * 2.2
                    : n.radius + Math.sin(n.pulse) * 0.3;

                ctx.beginPath();
                ctx.arc(n.x, n.y, Math.max(0.5, currentRadius), 0, Math.PI * 2);
                ctx.fill();

                // High-tech Spatial Radar Rings on active proximity
                if (dist < 90) {
                    const pulseRing = ((n.pulse * 20) % 30) + 4;
                    const ringAlpha = (1 - pulseRing / 34) * 0.4;

                    ctx.strokeStyle = `rgba(${accentColor}, ${ringAlpha})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.arc(n.x, n.y, pulseRing, 0, Math.PI * 2);
                    ctx.stroke();
                }
            }

            animationFrameId = requestAnimationFrame(render);
        };

        animationFrameId = requestAnimationFrame(render);

        return () => {
            cancelAnimationFrame(animationFrameId);
            resizeObserver.disconnect();
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [isDarkMode]);

    return (
        <div ref={containerRef} className={`relative w-full h-full overflow-hidden select-none ${className}`}>
            <canvas ref={canvasRef} className="absolute inset-0 block cursor-crosshair w-full h-full" />

            {showOverlay && (
                <div className="relative z-10 flex h-full flex-col items-center justify-center text-center px-4 pointer-events-none mix-blend-difference text-white">
                    <h1 className="font-mono text-6xl md:text-9xl font-black tracking-tighter uppercase leading-none">
                        Constellation
                    </h1>
                    <p className="mt-4 font-mono text-xs md:text-sm max-w-lg opacity-70">
                        High-velocity dynamic mesh. Sweep your cursor quickly across the grid to unleash kinetic shockwaves.
                    </p>
                </div>
            )}
        </div>
    );
}
