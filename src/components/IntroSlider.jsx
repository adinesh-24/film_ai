import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";

const slides = [
  {
    eyebrow: "Database",
    title: "Find your influences",
    body:
      "Dive into the most complete visual library out there, curated to help you discover the references that shape your creative direction.",
    // buttonLabel: "Search anything",
  },
  {
    eyebrow: "The Platform",
    title: "Search beautifully. Create purposefully.",
    body:
      "For those who sketch with references, speak in moodboards, and shape ideas frame by frame.",
   
  },
];

const baseShapes = [
  { id: "videos", label: "400K videos", color: "#0c0c0d", width: 150, height: 56, rotate: -12, x: -300, y: 0 },
  { id: "movies", label: "5.8K movies", color: "#111", width: 150, height: 56, rotate: -4, x: -190, y: 0 },
  { id: "animations", label: "150K animations", color: "#111", width: 150, height: 56, rotate: -16, x: -120, y: 0 },
  { id: "stills", label: "1.5M stills", color: "#ff9300", width: 210, height: 92, rotate: 18, x: -10, y: 0 },
  { id: "music", label: "5.5K music videos", color: "#0c0c0d", width: 180, height: 70, rotate: 6, x: 60, y: 0 },
  { id: "tv", label: "2K TV series", color: "#0c0c0d", width: 150, height: 56, rotate: 0, x: 170, y: 0 },
  { id: "ads", label: "15K ads", color: "#0c0c0d", width: 110, height: 56, rotate: 10, x: 240, y: 0 },
];

const colors = ["#25b34b", "#ffb700", "#111", "#f5f5f7"];

const Pill = React.forwardRef(function Pill({ shape, style }, ref) {
  return (
    <div
      ref={ref}
      className="intro-pill"
      style={{
        ...style,
        background: shape.color,
        color: "#fff",
        width: shape.width,
        height: shape.height,
        borderRadius: shape.height / 1.2,
        display: "grid",
        placeItems: "center",
        fontWeight: 700,
        fontSize: 14,
        boxShadow: "0 16px 36px rgba(0,0,0,0.18)",
      }}
    >
      {shape.label}
    </div>
  );
});

function Block({ color, size = 96, rotate = 0, style }) {
  return (
    <div
      className="intro-block"
      style={{
        width: size,
        height: size,
        background: color,
        borderRadius: 12,
        transform: `rotate(${rotate}deg)`,
        boxShadow: "0 16px 36px rgba(0,0,0,0.12)",
        ...style,
      }}
    />
  );
}

export default function IntroSlider() {
  const [active, setActive] = useState(0);
  const shapesRef = useRef([]);
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered drop-in for text elements
      if (textRef.current) {
        const textElements = textRef.current.children;
        gsap.fromTo(
          textElements,
          { y: -30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: "power2.out",
          }
        );
      }

      // Drop-in for shapes
      shapesRef.current.forEach((el, idx) => {
        if (!el) return;
        const toY = baseShapes[idx].y;
        const toX = baseShapes[idx].x;
        const fromY = toY - 320 - idx * 18;
        gsap.fromTo(
          el,
          { y: fromY, x: toX, opacity: 0, rotate: baseShapes[idx].rotate - 18 },
          {
            y: toY,
            x: toX,
            opacity: 1,
            rotate: baseShapes[idx].rotate,
            duration: 1.35,
            delay: 0.04 * idx,
            ease: "power2.in",
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [active]);

  const handleNext = () => setActive((prev) => (prev + 1) % slides.length);

  return (
    <section
      style={styles.shell}
      id="intro-scroll"
      data-aos="fade-up"
      data-aos-offset="180"
      ref={containerRef}
    >
      <div style={styles.container}>
        <div style={styles.canvas}>
          <div style={styles.canvasBg} />

          <Block color="#14a13b" size={180} rotate={2} style={styles.baseBlock} />
          <Block color="#ffe177" size={110} rotate={-18} style={{ position: "absolute", right: 60, top: 110 }} />
          <Block
            color="white"
            size={140}
            rotate={-8}
            style={{ position: "absolute", left: "40%", top: 120, border: "1px solid #e9e9ef" }}
          />

          {baseShapes.map((shape, idx) => (
            <Pill
              key={shape.id}
              shape={shape}
              style={{
                position: "absolute",
                left: "52%",
                bottom: 12,
              }}
              ref={(node) => {
                shapesRef.current[idx] = node;
              }}
            />
          ))}
        </div>

        <div ref={textRef} style={styles.textOverlay}>
          <p style={styles.eyebrow}>{slides[active].eyebrow}</p>
          <h2 style={styles.title}>{slides[active].title}</h2>
          <p style={styles.copy}>{slides[active].body}</p>
          <button style={styles.primary} onClick={handleNext}>
            
            <span style={styles.chevron}>↓</span>
          </button>
        </div>
      </div>
    </section>
  );
}

const styles = {
  shell: {
    padding: "64px 0 40px",
  },
  container: {
    position: "relative",
    width: "100%",
  },
  textOverlay: {
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 10,
    display: "grid",
    gap: 12,
    maxWidth: "minmax(260px, 0.55fr)",
    padding: "24px",
    pointerEvents: "none",
  },
  eyebrow: {
    fontFamily: "'IBM Plex Mono', 'Space Mono', monospace",
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: "#4a4a51",
    margin: 0,
  },
  title: {
    margin: 0,
    fontSize: 42,
    lineHeight: 1.1,
    fontWeight: 800,
  },
  copy: {
    margin: 0,
    color: "#333",
    fontSize: 16,
    lineHeight: 1.5,
    maxWidth: 460,
  },
  primary: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    marginTop: 8,
    padding: "12px 16px",
    background: "#111",
    color: "#fff",
    borderRadius: 12,
    border: "1px solid #0c0c0d",
    cursor: "pointer",
    fontWeight: 700,
    letterSpacing: 0.5,
    boxShadow: "0 12px 24px rgba(0,0,0,0.16)",
    pointerEvents: "auto",
  },
  chevron: {
    fontSize: 16,
    transform: "translateY(2px)",
  },
  canvas: {
    position: "relative",
    width: "100%",
    minHeight: 420,
    borderRadius: 16,
    overflow: "hidden",
    background: "linear-gradient(180deg, rgba(14,14,18,0.04), rgba(14,14,18,0.02))",
    border: "1px solid #ececf3",
  },
  canvasBg: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at 20% 30%, rgba(255,214,70,0.25), transparent 28%), radial-gradient(circle at 70% 70%, rgba(0,180,90,0.18), transparent 35%)",
    pointerEvents: "none",
  },
  baseBlock: {
    position: "absolute",
    left: "28%",
    top: 140,
  },
};
