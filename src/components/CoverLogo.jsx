import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function CoverLogo() {
  const containerRef = useRef(null);
  const svgRef = useRef(null);
  const videoRef = useRef(null);
  const [overlay, setOverlay] = useState({ left: 0, top: 0, size: 100 });

  // ViewBox size for the SVG (used to map into pixels)
  const VIEWBOX = { width: 608, height: 218 };
  // Pixel offset to shift the overlay (positive = move right)
  const OFFSET_PX = 50;

  // Approximate viewBox coordinates for the 'i' dot center and desired overlay size
  const TARGET = { x: 270, y: 40, size: 48 }; // nudged further left per request

  // Scroll animation hooks
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end start"]
  });

  // Map scroll progress to rotation:
  // Starts closed (0deg) when element hits center of viewport
  // Rotates open (-125deg) as you scroll past
  // Map scroll progress to rotation:
  // Hinge on right, flip open to the "outside" (positive rotation brings left edge out/right?)
  const rotateY = useTransform(scrollYProgress, [0, 0.5], [0, 180]);

  const computeOverlay = useCallback(() => {
    const container = containerRef.current;
    const svg = svgRef.current;
    if (!container || !svg) return;

    const svgRect = svg.getBoundingClientRect();
    const parentRect = container.getBoundingClientRect();

    const scaleX = svgRect.width / VIEWBOX.width;
    const scaleY = svgRect.height / VIEWBOX.height;

    const centerX = svgRect.left - parentRect.left + TARGET.x * scaleX;
    const centerY = svgRect.top - parentRect.top + TARGET.y * scaleY;
    const sizePx = Math.round(TARGET.size * ((scaleX + scaleY) / 2));
    setOverlay({ left: Math.round(centerX + OFFSET_PX), top: Math.round(centerY), size: sizePx });
  }, []);

  useEffect(() => {
    computeOverlay();
    window.addEventListener("resize", computeOverlay);
    return () => window.removeEventListener("resize", computeOverlay);
  }, [computeOverlay]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || typeof IntersectionObserver === "undefined") return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            v.play().catch(() => { });
          } else {
            v.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 40,
      }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 608 218"
        aria-hidden
        style={{ width: "100%", maxWidth: 1400, height: "auto", color: "#0c0c0d" }}
      >
        <path d="M173.774 46.1962H54.7449V92.5299H157.737V138.727H54.7449V217L0 216.863V0H173.774V46.1962ZM243.583 217H195.336V0H243.583V217ZM551.874 59.2185C585.466 59.2185 608 81.5627 608 118.164V216.862H559.893V129.404C559.893 107.197 547.033 97.6018 530.996 97.6017C510.122 97.6017 495.744 115.148 495.744 156.547V216.588H447.498V129.13C447.498 106.923 434.641 97.3273 418.605 97.3272C397.73 97.3272 383.352 114.874 383.352 156.272V216.725H335.243V64.0164H383.352L376.993 111.721H383.352C391.37 70.3223 418.604 59.2185 439.48 59.2185C471.551 59.2185 489.248 86.2236 489.248 111.721H495.744C503.763 70.3224 530.996 59.2185 551.874 59.2185ZM313.545 216.863H265.297V63.7429H313.545V216.863Z" fill="currentColor"></path>
      </svg>

      {/* Square video overlay positioned by mapping viewBox coordinates to pixels */}
      <div
        style={{
          position: "absolute",
          left: overlay.left,
          top: overlay.top,
          width: overlay.size,
          height: overlay.size,
          transform: "translate(-60%, -70%)",
          perspective: "600px", // Perspective for 3D rotation
          pointerEvents: "none", // Allow clicks to pass through if needed
        }}
      >
        <motion.div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#000",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 10,
            transformOrigin: "right center", // Hinge on the right edge
            rotateY: rotateY, // Bound to scroll
            opacity: useTransform(scrollYProgress, [0.3, 0.6], [1, 0]), // Fade out later to show the opening
          }}
        />
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 0,
            overflow: "hidden",
            boxShadow: "0 6px 18px rgba(0,0,0,0.12)",
            border: "2px solid rgba(0,0,0,0.85)",
            background: "#fff",
          }}
        >
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            preload="metadata"
            poster="https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa%2F69087f86db3e610fc49dfbfe_goodbye%20v2_poster.0000000.jpg"
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          >
            <source src="https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa%2F69087f86db3e610fc49dfbfe_goodbye%20v2_mp4.mp4" type="video/mp4" />
            <source src="https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa%2F69087f86db3e610fc49dfbfe_goodbye%20v2_webm.webm" type="video/webm" />
          </video>
        </div>
      </div>
    </div>
  );
}
