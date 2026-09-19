'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface LuffyRigProps {
    isVisible?: boolean;
    message?: string;
    onFistMove?: (fistImpactX: number) => void;
    onComplete?: () => void;
}

export default function LuffyRig({
    isVisible = true,
    message,
    onFistMove,
    onComplete,
}: LuffyRigProps) {
    const svgContainerRef =
        useRef<HTMLDivElement | null>(null);
    const redCircleRef =
        useRef<HTMLDivElement | null>(null);
    const svgElementRef =
        useRef<SVGSVGElement | null>(null);
    const impactPtRef =
        useRef<SVGPoint | null>(null);
    const fistPtRef =
        useRef<SVGPoint | null>(null);

    const onFistMoveRef = useRef(onFistMove);
    useEffect(() => {
        onFistMoveRef.current = onFistMove;
    }, [onFistMove]);

    // Dynamic responsive layout state for mobile and desktop alignment
    const [responsiveLayout, setResponsiveLayout] = useState({
        offset: 'calc(-50% + 90px)',
        circleSize: 105,
    });

    useEffect(() => {
        const updateLayout = () => {
            const w = window.innerWidth;
            if (w < 480) {
                setResponsiveLayout({ offset: 'calc(-50% + 22px)', circleSize: 72 });
            } else if (w < 640) {
                setResponsiveLayout({ offset: 'calc(-50% + 40px)', circleSize: 84 });
            } else if (w < 1024) {
                setResponsiveLayout({ offset: 'calc(-50% + 65px)', circleSize: 96 });
            } else {
                setResponsiveLayout({ offset: 'calc(-50% + 90px)', circleSize: 105 });
            }
        };

        updateLayout();
        window.addEventListener('resize', updateLayout);
        return () => window.removeEventListener('resize', updateLayout);
    }, []);

    // =========================================================
    // DRAG STATE
    // =========================================================

    const isDragging = useRef(false);

    // Pointer position in SVG coordinates when dragging starts
    const dragStartSvgX = useRef(0);

    // Arm offset when dragging starts
    const dragStartOffset = useRef(0);

    // Current target offset
    const targetOffset = useRef(0);

    // Last visually applied offset
    const appliedOffset = useRef(0);

    // Animation frame
    const animationFrame =
        useRef<number | null>(null);

    // =========================================================
    // FIST PIXEL HIT DETECTION
    // =========================================================

    const fistHitCanvas =
        useRef<HTMLCanvasElement | null>(null);

    const fistHitContext =
        useRef<CanvasRenderingContext2D | null>(null);

    // Actual visible bounds of the fist inside the PNG
    const fistVisibleBounds = useRef<{
        left: number;
        right: number;
        top: number;
        bottom: number;
    } | null>(null);

    // Prevent completion multiple times
    const completed = useRef(false);

    useEffect(() => {
        if (!isVisible) return;

        let mounted = true;

        // =========================================================
        // LOAD FIST PNG FOR EXACT CLICK DETECTION
        // =========================================================

        const fistImage = new Image();

        fistImage.src = '/luffy/luffy-fist.png';

        fistImage.onload = () => {
            if (!mounted) return;

            const canvas =
                document.createElement('canvas');

            canvas.width =
                fistImage.naturalWidth;

            canvas.height =
                fistImage.naturalHeight;

            const context =
                canvas.getContext('2d', {
                    willReadFrequently: true,
                });

            if (!context) return;

            context.drawImage(
                fistImage,
                0,
                0
            );

            fistHitCanvas.current = canvas;
            fistHitContext.current = context;

            // =======================================================
            // FIND ACTUAL NON-TRANSPARENT FIST BOUNDS
            // =======================================================

            const imageData =
                context.getImageData(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                );

            const data =
                imageData.data;

            let minX = canvas.width;
            let maxX = 0;
            let minY = canvas.height;
            let maxY = 0;

            let foundPixel = false;

            for (
                let y = 0;
                y < canvas.height;
                y++
            ) {
                for (
                    let x = 0;
                    x < canvas.width;
                    x++
                ) {
                    const alpha =
                        data[
                        (y * canvas.width + x) * 4 + 3
                        ];

                    if (alpha > 20) {
                        foundPixel = true;

                        if (x < minX) minX = x;
                        if (x > maxX) maxX = x;
                        if (y < minY) minY = y;
                        if (y > maxY) maxY = y;
                    }
                }
            }

            if (foundPixel) {
                fistVisibleBounds.current = {
                    left: minX,
                    right: maxX,
                    top: minY,
                    bottom: maxY,
                };
            }
        };

        // =========================================================
        // LOAD SVG
        // =========================================================

        const initializeSvg = async () => {
            try {
                const response = await fetch(
                    '/luffy/luffy-rig.svg'
                );

                if (!response.ok) {
                    throw new Error(
                        'Failed to load luffy-rig.svg'
                    );
                }

                const svgText =
                    await response.text();

                if (
                    !mounted ||
                    !svgContainerRef.current
                ) {
                    return;
                }

                const container =
                    svgContainerRef.current;

                // React owns the empty container.
                // SVG is injected here.
                container.innerHTML =
                    svgText;

                const svg =
                    container.querySelector(
                        'svg'
                    ) as SVGSVGElement | null;

                if (!svg) {
                    console.error(
                        'SVG root not found'
                    );
                    return;
                }

                svgElementRef.current = svg;
                impactPtRef.current = svg.createSVGPoint();
                fistPtRef.current = svg.createSVGPoint();

                // =====================================================
                // SVG DISPLAY SETTINGS
                // =====================================================

                svg.style.width =
                    '100%';

                svg.style.height =
                    '100%';

                svg.style.overflow =
                    'visible';

                /*
                 * Keep Luffy's original proportions.
                 *
                 * xMinYMid:
                 *   Keep Luffy aligned to the left.
                 *
                 * meet:
                 *   Preserve aspect ratio.
                 */
                svg.setAttribute(
                    'preserveAspectRatio',
                    'xMinYMid meet'
                );

                /*
                 * Pointer events are handled by our
                 * outer container and manually hit-tested.
                 */
                svg.style.pointerEvents =
                    'none';

                // =====================================================
                // FIND SVG ELEMENTS
                // =====================================================

                const body =
                    svg.querySelector(
                        '#luffy-body'
                    ) as SVGElement | null;

                const shoulder =
                    svg.querySelector(
                        '#luffy-shoulder'
                    ) as SVGElement | null;

                const fist =
                    svg.querySelector(
                        '#luffy-fist'
                    ) as SVGImageElement | null;

                const forearmStart =
                    svg.querySelector(
                        '#forearm-start'
                    ) as SVGImageElement | null;

                const forearmStretch =
                    svg.querySelector(
                        '#forearm-stretch'
                    ) as SVGImageElement | null;

                const forearmEnd =
                    svg.querySelector(
                        '#forearm-end'
                    ) as SVGImageElement | null;

                const forearmOriginal =
                    svg.querySelector(
                        '#forearm-original'
                    ) as SVGElement | null;

                if (
                    !body ||
                    !shoulder ||
                    !fist ||
                    !forearmStart ||
                    !forearmStretch ||
                    !forearmEnd
                ) {
                    console.error(
                        'Required Luffy SVG elements are missing'
                    );
                    return;
                }

                // =====================================================
                // BODY MUST NEVER MOVE
                // =====================================================

                body.removeAttribute(
                    'transform'
                );

                shoulder.removeAttribute(
                    'transform'
                );

                // =====================================================
                // HIDE ORIGINAL FOREARM BACKUP
                // =====================================================

                if (forearmOriginal) {
                    forearmOriginal.setAttribute(
                        'visibility',
                        'hidden'
                    );
                }

                // =====================================================
                // RESET TRANSFORMS
                // =====================================================

                fist.removeAttribute(
                    'transform'
                );

                forearmStart.removeAttribute(
                    'transform'
                );

                forearmEnd.removeAttribute(
                    'transform'
                );

                // =====================================================
                // GET ORIGINAL STRETCH CLIP
                // =====================================================

                const originalClipPath =
                    svg.querySelector(
                        '#clipPath3'
                    );

                if (!originalClipPath) {
                    console.error(
                        'clipPath3 not found'
                    );
                    return;
                }

                const originalClipRect =
                    originalClipPath.querySelector(
                        'rect'
                    );

                if (!originalClipRect) {
                    console.error(
                        'Original stretch rectangle not found'
                    );
                    return;
                }

                const stretchX =
                    parseFloat(
                        originalClipRect.getAttribute(
                            'x'
                        ) || '0'
                    );

                const stretchY =
                    parseFloat(
                        originalClipRect.getAttribute(
                            'y'
                        ) || '0'
                    );

                const originalStretchWidth =
                    parseFloat(
                        originalClipRect.getAttribute(
                            'width'
                        ) || '0'
                    );

                const originalStretchHeight =
                    parseFloat(
                        originalClipRect.getAttribute(
                            'height'
                        ) || '0'
                    );

                // =====================================================
                // REMOVE ORIGINAL CLIP FROM STRETCH
                // =====================================================

                forearmStretch.removeAttribute(
                    'clip-path'
                );

                // =====================================================
                // CREATE DYNAMIC CLIP
                // =====================================================

                const defs =
                    svg.querySelector(
                        'defs'
                    );

                if (!defs) {
                    console.error(
                        'SVG defs not found'
                    );
                    return;
                }

                const dynamicClip =
                    document.createElementNS(
                        'http://www.w3.org/2000/svg',
                        'clipPath'
                    );

                dynamicClip.setAttribute(
                    'id',
                    'dynamic-stretch-clip'
                );

                const dynamicRect =
                    document.createElementNS(
                        'http://www.w3.org/2000/svg',
                        'rect'
                    );

                dynamicRect.setAttribute(
                    'x',
                    String(stretchX)
                );

                dynamicRect.setAttribute(
                    'y',
                    String(stretchY)
                );

                dynamicRect.setAttribute(
                    'width',
                    String(originalStretchWidth)
                );

                dynamicRect.setAttribute(
                    'height',
                    String(originalStretchHeight)
                );

                dynamicClip.appendChild(
                    dynamicRect
                );

                defs.appendChild(
                    dynamicClip
                );

                // =====================================================
                // CREATE STRETCH VIEWPORT
                // =====================================================

                const stretchParent =
                    forearmStretch.parentNode;

                if (!stretchParent) {
                    return;
                }

                const dynamicViewport =
                    document.createElementNS(
                        'http://www.w3.org/2000/svg',
                        'g'
                    );

                dynamicViewport.setAttribute(
                    'id',
                    'dynamic-stretch-viewport'
                );

                dynamicViewport.setAttribute(
                    'clip-path',
                    'url(#dynamic-stretch-clip)'
                );

                const dynamicContent =
                    document.createElementNS(
                        'http://www.w3.org/2000/svg',
                        'g'
                    );

                dynamicContent.setAttribute(
                    'id',
                    'dynamic-stretch-content'
                );

                stretchParent.insertBefore(
                    dynamicViewport,
                    forearmStretch
                );

                dynamicViewport.appendChild(
                    dynamicContent
                );

                dynamicContent.appendChild(
                    forearmStretch
                );

                // =====================================================
                // FIST IMAGE COORDINATES
                // =====================================================

                const fistX =
                    parseFloat(
                        fist.getAttribute('x') ||
                        '0'
                    );

                const fistY =
                    parseFloat(
                        fist.getAttribute('y') ||
                        '0'
                    );

                const fistWidth =
                    parseFloat(
                        fist.getAttribute(
                            'width'
                        ) || '807'
                    );

                const fistHeight =
                    parseFloat(
                        fist.getAttribute(
                            'height'
                        ) || '962'
                    );

                // =====================================================
                // SVG POINTER CONVERSION
                // =====================================================

                const pointerToSvg =
                    (event: PointerEvent) => {
                        const point =
                            svg.createSVGPoint();

                        point.x =
                            event.clientX;

                        point.y =
                            event.clientY;

                        const matrix =
                            svg.getScreenCTM();

                        if (!matrix) {
                            return {
                                x: 0,
                                y: 0,
                            };
                        }

                        return point.matrixTransform(
                            matrix.inverse()
                        );
                    };

                // =====================================================
                // SCREEN X → SVG X
                // =====================================================

                const screenXToSvgX = (
                    screenX: number
                ) => {
                    const point =
                        svg.createSVGPoint();

                    point.x = screenX;

                    /*
                     * Use a point around the vertical
                     * center of the SVG.
                     */
                    point.y =
                        window.innerHeight / 2;

                    const matrix =
                        svg.getScreenCTM();

                    if (!matrix) {
                        return 0;
                    }

                    return point.matrixTransform(
                        matrix.inverse()
                    ).x;
                };

                // =====================================================
                // GET MAXIMUM FORWARD OFFSET
                // =====================================================

                const getMaximumOffset =
                    () => {
                        /*
                         * We do NOT use a fixed MAX_OFFSET.
                         *
                         * Instead:
                         *
                         * Browser right edge
                         *        ↓
                         *      |👊|
                         *
                         * The visible fist is allowed to travel
                         * until its actual right edge reaches
                         * the browser window.
                         */

                        const rightEdgeSvgX =
                            screenXToSvgX(
                                window.innerWidth
                            );

                        const bounds =
                            fistVisibleBounds.current;

                        if (!bounds) {
                            /*
                             * Fallback until PNG has loaded.
                             */
                            return 1000;
                        }

                        const visibleFistRightSvg =
                            fistX +
                            (bounds.right /
                                fistHitCanvas.current!.width) *
                            fistWidth;

                        const maxOffset =
                            rightEdgeSvgX -
                            visibleFistRightSvg;

                        /*
                         * Never allow the fist to move
                         * backward beyond its original position.
                         */
                        return Math.max(
                            0,
                            maxOffset
                        );
                    };

                // =====================================================
                // APPLY ARM POSITION
                // =====================================================

                const applyArmPosition =
                    (offset: number) => {
                        /*
                         * BACKWARD:
                         *
                         * Minimum = 0
                         *
                         * Therefore the arm can return to
                         * its original position but cannot
                         * compress backward into itself.
                         */
                        const maxOffset =
                            getMaximumOffset();

                        const clampedOffset =
                            Math.max(
                                0,
                                Math.min(
                                    maxOffset,
                                    offset
                                )
                            );

                        appliedOffset.current =
                            clampedOffset;

                        // =================================================
                        // FIST
                        // =================================================

                        fist.setAttribute(
                            'transform',
                            `translate(${clampedOffset} 0)`
                        );

                        // =================================================
                        // END SECTION
                        // =================================================

                        /*
                         * End follows the fist exactly.
                         */
                        forearmEnd.setAttribute(
                            'transform',
                            `translate(${clampedOffset} 0)`
                        );

                        // =================================================
                        // STRETCH SECTION
                        // =================================================

                        const newWidth =
                            Math.max(
                                1,
                                originalStretchWidth +
                                clampedOffset
                            );

                        const scaleX =
                            newWidth /
                            originalStretchWidth;

                        /*
                         * Scale only the stretch CONTENT.
                         *
                         * The viewport remains fixed.
                         *
                         * This prevents the start/end pieces
                         * from getting distorted.
                         */
                        dynamicContent.setAttribute(
                            'transform',
                            `translate(${stretchX} 0) scale(${scaleX} 1) translate(${-stretchX} 0)`
                        );

                        // =================================================
                        // DYNAMIC CLIP WIDTH
                        // =================================================

                        dynamicRect.setAttribute(
                            'width',
                            String(newWidth)
                        );

                        // =================================================
                        // IMPORTANT:
                        // BODY DOES NOT MOVE
                        // SHOULDER DOES NOT MOVE
                        // =================================================

                        body.removeAttribute(
                            'transform'
                        );

                        shoulder.removeAttribute(
                            'transform'
                        );

                        // =================================================
                        // IMPACT & BADGE SCREEN POSITIONING
                        // =================================================

                        const bounds = fistVisibleBounds.current;
                        const svgElement = svgElementRef.current;
                        if (svgElement) {
                            const matrix = svgElement.getScreenCTM();
                            if (matrix) {
                                const canvasWidth = fistHitCanvas.current?.width || 807;
                                const canvasHeight = fistHitCanvas.current?.height || 962;

                                const impactSvgX = fistX + clampedOffset + (bounds ? (bounds.right / canvasWidth) * fistWidth : 780);
                                const impactSvgY = fistY + (bounds ? ((bounds.top + bounds.bottom) / 2 / canvasHeight) * fistHeight : 200);

                                const impactPt = impactPtRef.current || svgElement.createSVGPoint();
                                impactPt.x = impactSvgX;
                                impactPt.y = impactSvgY;
                                const screenImpact = impactPt.matrixTransform(matrix);

                                if (onFistMoveRef.current) {
                                    onFistMoveRef.current(screenImpact.x);
                                }

                                if (redCircleRef.current) {
                                    const fistCenterSvgX = fistX + clampedOffset + (bounds ? ((bounds.left + bounds.right) / 2 / canvasWidth) * fistWidth : 700);
                                    const fistCenterSvgY = fistY + (bounds ? ((bounds.top + bounds.bottom) / 2 / canvasHeight) * fistHeight : 200);

                                    const fistPt = fistPtRef.current || svgElement.createSVGPoint();
                                    fistPt.x = fistCenterSvgX;
                                    fistPt.y = fistCenterSvgY;
                                    const screenFist = fistPt.matrixTransform(matrix);

                                    redCircleRef.current.style.left = `${screenFist.x}px`;
                                    redCircleRef.current.style.top = `${screenFist.y}px`;
                                    redCircleRef.current.style.opacity = '1';
                                }
                            }
                        }

                        // =================================================
                        // COMPLETION
                        // =================================================

                        /*
                         * When the fist reaches the right edge
                         * of the browser window.
                         */
                        if (
                            maxOffset > 0 &&
                            clampedOffset >=
                            maxOffset - 2 &&
                            !completed.current
                        ) {
                            completed.current = true;

                            if (onComplete) {
                                onComplete();
                            }
                        }
                    };

                // =====================================================
                // EXACT FIST HIT TEST
                // =====================================================

                const isPointerOnFist =
                    (event: PointerEvent) => {
                        const canvas =
                            fistHitCanvas.current;

                        const context =
                            fistHitContext.current;

                        if (!canvas || !context) {
                            return false;
                        }

                        const point =
                            pointerToSvg(event);

                        /*
                         * Remove current fist translation.
                         *
                         * This gives us the position relative
                         * to the original fist PNG.
                         */
                        const localX =
                            point.x -
                            appliedOffset.current;

                        const localY =
                            point.y;

                        // =================================================
                        // PNG COORDINATE
                        // =================================================

                        const normalizedX =
                            (localX - fistX) /
                            fistWidth;

                        const normalizedY =
                            (localY - fistY) /
                            fistHeight;

                        if (
                            normalizedX < 0 ||
                            normalizedX > 1 ||
                            normalizedY < 0 ||
                            normalizedY > 1
                        ) {
                            return false;
                        }

                        const pixelX =
                            Math.floor(
                                normalizedX *
                                canvas.width
                            );

                        const pixelY =
                            Math.floor(
                                normalizedY *
                                canvas.height
                            );

                        if (
                            pixelX < 0 ||
                            pixelY < 0 ||
                            pixelX >= canvas.width ||
                            pixelY >= canvas.height
                        ) {
                            return false;
                        }

                        // =================================================
                        // READ ACTUAL PIXEL
                        // =================================================

                        const pixel =
                            context.getImageData(
                                pixelX,
                                pixelY,
                                1,
                                1
                            ).data;

                        const alpha =
                            pixel[3];

                        /*
                         * Only non-transparent pixels
                         * are draggable.
                         */
                        return alpha > 20;
                    };

                // =====================================================
                // POINTER DOWN
                // =====================================================

                const handlePointerDown =
                    (event: PointerEvent) => {
                        /*
                         * ONLY the actual fist can start dragging.
                         *
                         * White space = nothing.
                         * Body = nothing.
                         * Shoulder = nothing.
                         * Forearm = nothing.
                         */
                        if (
                            !isPointerOnFist(event)
                        ) {
                            return;
                        }

                        isDragging.current =
                            true;

                        const pointer =
                            pointerToSvg(event);

                        /*
                         * Store pointer in SVG coordinates,
                         * NOT screen pixels.
                         *
                         * This is what makes movement match
                         * the cursor correctly.
                         */
                        dragStartSvgX.current =
                            pointer.x;

                        dragStartOffset.current =
                            appliedOffset.current;

                        const element =
                            event.currentTarget as HTMLElement;

                        element.setPointerCapture(
                            event.pointerId
                        );

                        element.style.cursor =
                            'grabbing';

                        event.preventDefault();
                    };

                // =====================================================
                // POINTER MOVE
                // =====================================================

                const handlePointerMove =
                    (event: PointerEvent) => {
                        // -------------------------------------------------
                        // HOVER
                        // -------------------------------------------------

                        if (!isDragging.current) {
                            const element =
                                event.currentTarget as HTMLElement;

                            if (
                                isPointerOnFist(event)
                            ) {
                                element.style.cursor =
                                    'grab';
                                if (redCircleRef.current) {
                                    redCircleRef.current.style.borderColor = '#DC2626';
                                    redCircleRef.current.style.backgroundColor = 'rgba(239, 68, 68, 0.28)';
                                    redCircleRef.current.style.boxShadow = '0 0 35px rgba(220, 38, 38, 1), inset 0 0 20px rgba(220, 38, 38, 0.6)';
                                }
                            } else {
                                element.style.cursor =
                                    'default';
                                if (redCircleRef.current) {
                                    redCircleRef.current.style.borderColor = 'rgba(239, 68, 68, 0.7)';
                                    redCircleRef.current.style.backgroundColor = 'transparent';
                                    redCircleRef.current.style.boxShadow = '0 0 20px rgba(239, 68, 68, 0.6), inset 0 0 10px rgba(239, 68, 68, 0.25)';
                                }
                            }

                            return;
                        }

                        // -------------------------------------------------
                        // CURRENT POINTER
                        // -------------------------------------------------

                        const pointer =
                            pointerToSvg(event);

                        /*
                         * EXACT SVG DISTANCE MOVED.
                         *
                         * No:
                         *
                         * 0.65
                         * lerp
                         * easing
                         * spring
                         * artificial delay
                         *
                         * The fist follows the cursor movement
                         * directly.
                         */
                        const pointerDelta =
                            pointer.x -
                            dragStartSvgX.current;

                        const newOffset =
                            dragStartOffset.current +
                            pointerDelta;

                        const maxOffset =
                            getMaximumOffset();

                        targetOffset.current =
                            Math.max(
                                0,
                                Math.min(
                                    maxOffset,
                                    newOffset
                                )
                            );

                        // -------------------------------------------------
                        // RENDER ON NEXT FRAME
                        // -------------------------------------------------

                        if (
                            animationFrame.current ===
                            null
                        ) {
                            animationFrame.current =
                                requestAnimationFrame(
                                    () => {
                                        animationFrame.current =
                                            null;

                                        applyArmPosition(
                                            targetOffset.current
                                        );
                                    }
                                );
                        }

                        event.preventDefault();
                    };

                // =====================================================
                // POINTER UP
                // =====================================================

                const handlePointerUp =
                    (event: PointerEvent) => {
                        if (
                            !isDragging.current
                        ) {
                            return;
                        }

                        isDragging.current =
                            false;

                        applyArmPosition(
                            targetOffset.current
                        );

                        const element =
                            event.currentTarget as HTMLElement;

                        if (
                            element.hasPointerCapture(
                                event.pointerId
                            )
                        ) {
                            element.releasePointerCapture(
                                event.pointerId
                            );
                        }

                        element.style.cursor =
                            'default';

                        event.preventDefault();
                    };

                // =====================================================
                // POINTER CANCEL
                // =====================================================

                const handlePointerCancel =
                    (event: PointerEvent) => {
                        isDragging.current =
                            false;

                        const element =
                            event.currentTarget as HTMLElement;

                        if (
                            element.hasPointerCapture(
                                event.pointerId
                            )
                        ) {
                            element.releasePointerCapture(
                                event.pointerId
                            );
                        }

                        element.style.cursor =
                            'default';
                    };

                // =====================================================
                // ATTACH EVENTS
                // =====================================================

                container.addEventListener(
                    'pointerdown',
                    handlePointerDown
                );

                container.addEventListener(
                    'pointermove',
                    handlePointerMove
                );

                container.addEventListener(
                    'pointerup',
                    handlePointerUp
                );

                container.addEventListener(
                    'pointercancel',
                    handlePointerCancel
                );

                // =====================================================
                // INITIAL POSITION
                // =====================================================

                targetOffset.current = 0;
                appliedOffset.current = 0;
                completed.current = false;

                applyArmPosition(0);

                // =====================================================
                // CLEANUP
                // =====================================================

                return () => {
                    container.removeEventListener(
                        'pointerdown',
                        handlePointerDown
                    );

                    container.removeEventListener(
                        'pointermove',
                        handlePointerMove
                    );

                    container.removeEventListener(
                        'pointerup',
                        handlePointerUp
                    );

                    container.removeEventListener(
                        'pointercancel',
                        handlePointerCancel
                    );

                    if (
                        animationFrame.current !==
                        null
                    ) {
                        cancelAnimationFrame(
                            animationFrame.current
                        );

                        animationFrame.current =
                            null;
                    }

                    container.innerHTML = '';
                };
            } catch (error) {
                console.error(
                    'Failed to initialize Luffy rig:',
                    error
                );
            }
        };

        initializeSvg();

        return () => {
            mounted = false;

            if (
                animationFrame.current !==
                null
            ) {
                cancelAnimationFrame(
                    animationFrame.current
                );

                animationFrame.current =
                    null;
            }
        };
    }, [isVisible, onComplete]);

    // ===========================================================
    // RENDER
    // ===========================================================

    if (!isVisible) {
        return null;
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                    duration: 0.6,
                    ease: 'easeOut',
                }}
                style={{
                    position: 'fixed',
                    left: '10px',
                    top: '50%',
                    transform: `translateY(${responsiveLayout.offset})`,
                    width: 'calc(100vw - 20px)',
                    height: '350px',
                    overflow: 'visible',
                    touchAction: 'none',
                    userSelect: 'none',
                    zIndex: 9999,
                    pointerEvents: 'auto',
                    cursor: 'default',
                }}
            >
                <div
                    ref={svgContainerRef}
                    style={{
                        width: '100%',
                        height: '100%',
                        overflow: 'visible',
                        touchAction: 'none',
                        userSelect: 'none',
                    }}
                />
            </motion.div>
            {/* Red Circle around the fist alone (turns solid bright red on hover) */}
            <div
                ref={redCircleRef}
                style={{
                    position: 'fixed',
                    top: '0px',
                    left: '0px',
                    opacity: 0,
                    width: `${responsiveLayout.circleSize}px`,
                    height: `${responsiveLayout.circleSize}px`,
                    transform: 'translate(-50%, -50%)',
                    pointerEvents: 'none',
                    zIndex: 10000,
                    borderRadius: '50%',
                    border: '2px solid rgba(239, 68, 68, 0.7)',
                    boxShadow: '0 0 20px rgba(239, 68, 68, 0.6), inset 0 0 10px rgba(239, 68, 68, 0.25)',
                    transition: 'border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease, opacity 0.3s ease',
                }}
                className="animate-pulse"
            />
        </>
    );
}