import React from "react";
import { motion } from "framer-motion";
import Reveal from "./Reveal";

export default function Hero({ audiences, audienceIdx }) {
  return (
    <div style={styles.heroShell}>
      <motion.div
        style={styles.flimLarge}
        initial={{ scale: 2.2, opacity: 1 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.33, 0, 0.17, 1] }}
      >
        Flim
      </motion.div>

      <Reveal as="main" style={styles.hero} delay={200}>
        <div style={styles.heroTitleBlock}>
          <div style={styles.heroLine}>The Creative</div>
          <div style={styles.heroLine}>Sidekick</div>
          <div style={styles.heroLine}>
            Made for {" "}
            <span style={styles.heroHighlightWrap}>
              <motion.span
                key={audienceIdx}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.33, 0, 0.17, 1] }}
                style={styles.heroHighlight}
              >
                {audiences[audienceIdx]}.
              </motion.span>
            </span>
          </div>
          <div style={styles.heroLine}>Built for Storytellers.</div>
        </div>

        <div style={styles.heroCtaRow}>
          <button style={styles.heroCtaButton}>
            <span style={styles.heroCtaThumb}>
              <video
                style={styles.heroCtaVideo}
                autoPlay
                loop
                muted
                playsInline
                poster="https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa%2F691c87784e6975ef99f0d593_demo-compressed_poster.0000000.jpg"
              >
                <source src="https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa%2F691c87784e6975ef99f0d593_demo-compressed_mp4.mp4" />
                <source src="https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa%2F691c87784e6975ef99f0d593_demo-compressed_webm.webm" />
              </video>
            </span>
            <span style={styles.heroCtaText}>SIGN UP NOW</span>
          </button>
        </div>
      </Reveal>
    </div>
  );
}

const styles = {
  heroShell: {
    position: "relative",
    minHeight: 420,
    overflow: "hidden",
    display: "grid",
    gridTemplateColumns: "minmax(280px, 1.1fr) 1fr",
    gap: 32,
    alignItems: "center",
  },
  hero: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: 12,
    padding: "24px 0 24px",
    alignItems: "flex-start",
    maxWidth: 480,
    margin: "0 auto",
    textAlign: "left",
  },
  heroTitleBlock: {
    display: "grid",
    gap: 2,
    fontFamily: "var(--_typography---body--m--font-family)",
    fontSize: "var(--_typography---body--m--font-size)",
    lineHeight: "var(--_typography---body--m--line-height)",
    fontWeight: "var(--_typography---body--m--font-weight)",
    letterSpacing: "var(--_typography---body--m--letter-spacing)",
    color: "inherit",
  },
  heroLine: { display: "block" },
  heroHighlightWrap: {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2px 12px",
    background:
      "linear-gradient(0deg, rgba(200, 200, 200, 0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(200, 200, 200, 0.8) 1px, transparent 1px)",
    backgroundSize: "8px 8px",
    borderRadius: 4,
    minWidth: 140,
    textAlign: "center",
  },
  heroHighlight: {
    display: "inline-block",
    color: "inherit",
    boxShadow: "0 2px 0 rgba(0,0,0,0.08)",
  },
  heroCtaRow: { marginTop: 14 },
  heroCtaButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    background: "#111",
    color: "#fff",
    borderRadius: 12,
    padding: "8px 14px",
    border: "2px solid #111",
    cursor: "pointer",
    fontWeight: 700,
    letterSpacing: 1,
    transition: "transform 180ms ease, box-shadow 180ms ease",
    boxShadow: "0 8px 20px rgba(0,0,0,0.18)",
  },
  heroCtaThumb: {
    width: 36,
    height: 36,
    borderRadius: 8,
    overflow: "hidden",
    display: "grid",
    placeItems: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
  },
  heroCtaVideo: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  heroCtaText: {
    fontFamily: "'IBM Plex Mono', 'Space Mono', monospace",
    fontSize: 12,
  },
  flimLarge: {
    fontWeight: 800,
    fontSize: 300,
    lineHeight: 0.9,
    letterSpacing: -10,
    transformOrigin: "left center",
    whiteSpace: "nowrap",
  },
};
