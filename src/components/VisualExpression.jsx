import React, { useRef, useLayoutEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const getImages = (isMobile) => [
    {
        src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd17b_485c73ebf44a5f1d16dd40cc8eb8662b_intro-image-2.avif",
        top: isMobile ? "15%" : "12%",
        left: isMobile ? "5%" : "22%",
        rotate: -6, zIndex: 1, scale: isMobile ? 0.6 : 0.8,
        width: isMobile ? 120 : 180, aspectRatio: 16 / 9 // Standardized to 16:9
    },
    {
        src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd17e_530688aa83656837a578241a25cc9622_intro-image-1.avif",
        top: isMobile ? "5%" : "15%",
        left: isMobile ? "55%" : "75%",
        rotate: 6, zIndex: 2, scale: isMobile ? 0.7 : 0.9,
        width: isMobile ? 140 : 220, aspectRatio: 16 / 9
    },
    {
        src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd17c_1320acbfc56822d6bc797ce95b2799bc_intro-image-3.avif",
        top: isMobile ? "55%" : "50%",
        left: isMobile ? "5%" : "10%",
        rotate: -3, zIndex: 3, scale: isMobile ? 0.5 : 0.75,
        width: isMobile ? 110 : 160, aspectRatio: 16 / 9 // Standardized to 16:9
    },
    {
        src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd17f_1efb09d93198ba12b2a76b9a26147a93_intro-image-4.avif",
        top: isMobile ? "10%" : "50%",
        left: isMobile ? "45%" : "70%",
        rotate: 3, zIndex: 0, scale: isMobile ? 0.6 : 0.75,
        width: isMobile ? 120 : 160, aspectRatio: 16 / 9
    }
];

// Simplified approach: Animate to fixed positions relative to viewport or container
// Since the target container is in the next section, we can use ScrollTrigger to scrub the movement.

export default function VisualExpression({ theme }) {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const imagesRef = useRef([]);

    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const images = React.useMemo(() => getImages(isMobile), [isMobile]);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // Text Animation
            gsap.from(textRef.current.children, {
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse"
                },
                duration: 1,
                scale: 0.8,
                y: 40,
                opacity: 0,
                ease: "power1.inOut",
                stagger: 0.2
            });

            // --- SCROLL-FLIP LOGIC ---
            // 1. Identify Target Elements
            const targetIds = ["target-img-0", "target-img-1", "target-img-2", "target-img-3"];
            const targets = targetIds.map(id => document.getElementById(id));

            // If targets aren't mounted/found, skip
            if (targets.some(t => !t)) return;

            // 2. Define ScrollTrigger
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 1,
                    invalidateOnRefresh: true // Key for responsive resize
                }
            });

            imagesRef.current.forEach((img, i) => {
                if (!img) return;

                // Special handling for Image 4 (index 3): Fade out
                if (i === 3) {
                    tl.to(img, {
                        opacity: 0,
                        scale: 0.5,
                        duration: 0.5,
                        ease: "power2.in"
                    }, 0);
                    return;
                }

                if (!targets[i]) return;

                // Initial State
                gsap.set(img, {
                    xPercent: -50,
                    yPercent: -50,
                    rotation: images[i].rotate,
                    scale: images[i].scale
                });

                // Functional Tween for Responsive Recalculation
                tl.to(img, {
                    x: () => {
                        const startRect = img.getBoundingClientRect();
                        const endRect = targets[i].getBoundingClientRect();
                        const startCenter = startRect.left + startRect.width / 2;
                        const targetLeft = endRect.left;
                        return targetLeft - startCenter;
                    },
                    y: () => {
                        const startRect = img.getBoundingClientRect();
                        const endRect = targets[i].getBoundingClientRect();
                        const startCenter = startRect.top + startRect.height / 2;
                        const targetTop = endRect.top;
                        return targetTop - startCenter;
                    },
                    width: () => targets[i].getBoundingClientRect().width,
                    height: () => targets[i].getBoundingClientRect().height,
                    xPercent: 0,
                    yPercent: 0,
                    rotation: 0, // Flatten rotation
                    scale: 1,
                    zIndex: 100,
                    borderRadius: "8px",
                    ease: "power2.inOut"
                }, 0);

                // Animate Inner Frame
                const frame = img.querySelector('div');
                if (frame) {
                    tl.to(frame, {
                        padding: 0,
                        backgroundColor: "transparent",
                        borderRadius: "2px",
                        ease: "power2.inOut"
                    }, 0);
                }
            });

        }, containerRef);

        return () => ctx.revert();
    }, []);

    const isDark = theme === "dark";

    return (
        <section ref={containerRef} style={styles.section}>
            <div style={styles.container}>

                {/* Floating Images Container */}
                <div style={styles.imagesContainer}>
                    {images.map((img, i) => (
                        <div
                            key={i}
                            ref={el => imagesRef.current[i] = el}
                            style={{
                                ...styles.floater,
                                top: img.top,
                                left: img.left,
                                width: img.width,
                                zIndex: 50, // High base z-index
                                // transform handled by GSAP setup
                            }}
                        >
                            <div style={styles.imgFrame}>
                                <img
                                    src={img.src}
                                    alt={`Visual expression ${i + 1}`}
                                    style={styles.img}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Text Content - Same as before */}
                <div ref={textRef} style={styles.content}>
                    <div style={styles.label}>WHAT IS FLIM</div>
                    <h2 style={styles.title}>
                        A new <span style={styles.emoji}>🟡</span> language of{" "}
                        <span style={styles.highlightWrap}>
                            <span style={styles.highlight}>visual expression.</span>
                        </span>
                    </h2>
                    <h2 style={styles.subtitle}>
                        Built <span style={styles.icon}>⏩</span> on the most complete platform for storytelling.
                    </h2>
                </div>

            </div>
        </section>
    );
}

const styles = {
    section: {
        position: "relative",
        zIndex: 20, // Ensure images fly OVER the next section
        // overflow: "hidden", // Removed to allow images to animate out to the next section
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
    },
    container: {
        maxWidth: 1200,
        margin: "0 auto",
        width: "100%",
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        paddingBottom: "120px",
        position: "relative",
        zIndex: 1,
        textAlign: "center",
    },
    content: {
        position: "relative",
        zIndex: 10,
        maxWidth: 1100,
        margin: "0 auto",
        padding: "0 24px",
    },
    label: {
        fontFamily: "var(--_typography---ui--mono--s--font-family, monospace)",
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: 2,
        marginBottom: 32,
        opacity: 0.6,
        textTransform: "uppercase",
        color: "inherit" // Inherits parent color (which we manually set if needed, or rely on Theme wrapper)
    },
    title: {
        fontFamily: "'Swizzy', Arial, sans-serif",
        fontSize: "min(58px, max(22px, calc(22px + 36 * ((min(100vw, 100vh * (16 / 9)) - 320px) / 1600))))",
        lineHeight: 1.05,
        fontWeight: 600,
        letterSpacing: "-0.04em",
        margin: "0 0 4px 0",
        color: "inherit",
    },
    subtitle: {
        fontFamily: "'Swizzy', Arial, sans-serif",
        fontSize: "min(58px, max(22px, calc(22px + 36 * ((min(100vw, 100vh * (16 / 9)) - 320px) / 1600))))",
        lineHeight: 1.05,
        fontWeight: 600,
        letterSpacing: "-0.04em",
        margin: 0,
        color: "inherit",
    },
    emoji: {
        display: "inline-block",
        filter: "grayscale(0%)",
        verticalAlign: "middle",
        fontSize: "0.9em",
        position: "relative",
        top: "-0.05em",
    },
    icon: {
        display: "inline-block",
        verticalAlign: "middle",
        fontSize: "0.9em",
        color: "#27ae60",
        position: "relative",
        top: "-0.02em",
    },
    highlightWrap: {
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2px 12px",
        background: "linear-gradient(0deg, rgba(200, 200, 200, 0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(200, 200, 200, 0.8) 1px, transparent 1px)",
        backgroundSize: "8px 8px",
        borderRadius: 4,
        minWidth: 140,
        textAlign: "center",
        verticalAlign: "middle",
    },
    highlight: {
        display: "inline-block",
        color: "#000",
        boxShadow: "0 2px 0 rgba(0,0,0,0.08)",
    },
    imagesContainer: {
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
    },
    floater: {
        position: "absolute",
        // transform handled by gsap
        display: "flex", // Ensure content fills
        flexDirection: "column",
    },
    imgFrame: {
        background: "#fff",
        padding: 2,
        borderRadius: 8,
        width: "100%",
        height: "100%", // Fill the floater
        display: "flex", // Flex to hold img
        boxSizing: "border-box", // Corrected from "border"
        overflow: "hidden",
    },
    img: {
        display: "block",
        width: "100%",
        height: "100%", // Fill the frame
        borderRadius: 4,
        objectFit: "cover", // Crop to fit
    },
};
