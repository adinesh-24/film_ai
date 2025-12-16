import React, { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";

// Components
import Reveal from "./components/Reveal";
import Stat from "./components/Stat";
import Hero from "./components/Hero";
import Search from "./components/Search";
import ImagePopGrid from "./components/ImagePopGrid";
import CoverLogo from "./components/CoverLogo";
import CreativityTools from "./components/CreativityTools";
import GenerateEdit from "./components/GenerateEdit";
import VisualExpression from "./components/VisualExpression";
import FindInfluences from "./components/FindInfluences";
import IntroPlatform from "./components/IntroPlatform";
import ThemeToggle from "./components/ThemeToggle";

// Responsive styles
const responsiveStyles = `
  @media (max-width: 768px) {
    * { box-sizing: border-box; }
    body { font-size: 16px; }
    h1, h2, h3 { font-size: clamp(20px, 5vw, 32px); }
  }
  @media (max-width: 480px) {
    body { font-size: 14px; padding: 0 16px; }
    h1, h2, h3 { font-size: clamp(18px, 6vw, 28px); }
  }
`;

if (typeof document !== 'undefined') {
  if (!document.getElementById('responsive-styles')) {
    const style = document.createElement('style');
    style.id = 'responsive-styles';
    style.textContent = responsiveStyles;
    document.head.appendChild(style);
  }
}

const brands = [
  "Anomaly", "BETC", "Canada", "Partizan", "Expedia",
  "Caviar", "Droga5", "Buzzman", "Skydance", "DDB",
  "Dentsu", "Havas", "Ogilvy"
];

const brandLogos = [
  { alt: "Anomaly logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd111_Anomaly.avif", width: 108 },
  { alt: "Zalando logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/6904c8ae97335f408bb683a5_Zalando.avif", width: 108 },
  { alt: "BETC logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd0d5_BETC.avif", width: 86 },
  { alt: "Fortiche logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/6904bc5fff30f9c3ef33ec3f_Fortiche.avif", width: 86 },
  { alt: "Canada logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd0d2_Canada.avif", width: 141 },
  { alt: "Logitech logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/6904c8ae8f706c8286928416_Logitech.avif", width: 141 },
  { alt: "Partizan logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd0e7_Partizan.avif", width: 137 },
  { alt: "Hermes logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/6904c2d98ecee217b8927bff_Hermes.avif", width: 78 },
  { alt: "Vector logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/6904bc5fefed61efd99466db_Vector.avif", width: 85 },
  { alt: "Expedia logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd0d7_Expedia.avif", width: 107 },
  { alt: "Caviar logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd0d3_Caviar.avif", width: 126 },
  { alt: "Chanel logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/6904c8ae1dded45fc9de2e5b_Chanel.avif", width: 114 },
  { alt: "Division logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/6904bc5ff13be9ef015653e5_Division.avif", width: 114 },
  { alt: "Droga5 logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd0d8_Droga5.avif", width: 58 },
  { alt: "Buzzman logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd0d4_Buzzman.avif", width: 32 },
  { alt: "AMI logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/6904c2d9fcf414b4e198c088_AMI.avif", width: 32 },
  { alt: "David Martin logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd0db_David%20Martin.avif", width: 152 },
  { alt: "Skydance logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd0f7_Skydance.avif", width: 179 },
  { alt: "Doyle Dane Bernbach logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd0da_Doyle%20Dane%20Bernbach.avif", width: 62 },
  { alt: "Habbar logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd110_Habbar.avif", width: 44 },
  { alt: "Arla logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/6904c2d97adaef63307599e6_Arla.avif", width: 44 },
  { alt: "Dentsu logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd0df_Dentsu.avif", width: 138 },
  { alt: "Havas logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd0e3_Havas.avif", width: 153 },
  { alt: "OpenAI logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/6904c2da94c2fec02a62833f_OpenAI.avif", width: 153 },
  { alt: "Iconoclast logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd0e5_Iconoslast.avif", width: 218 },
  { alt: "Jacquemus logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd0e4_Jacquemus.avif", width: 171 },
  { alt: "Jean Paul Gaultier logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd0e2_Jean%20Paul%20Gaultier.avif", width: 82 },
  { alt: "Acne logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/6904bc5fbf2732f37e3d1606_Acne.avif", width: 137 },
  { alt: "Ogilvy logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd0e6_Ogilvy.avif", width: 44 },
  { alt: "Plarium logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd0f6_Plarium.avif", width: 42 },
  { alt: "Pretty Bird logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd0f8_Pretty%20Bird.avif", width: 98 },
  { alt: "Publicis logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd0e9_Publicis.avif", width: 31 },
  { alt: "Webedia logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/6904c8aeae118d5dc181d448_Webedia.avif", width: 23 },
  { alt: "Mediawan logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/6904c8ae5fed6c0aa6bac545_mediawan.avif", width: 23 },
  { alt: "The Good Co logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd0ff_The%20Good%20Co.avif", width: 35 },
  { alt: "Dicks Sporting Goods logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/6904bc5f8ae202bcbe454150_Dicks%20Sporting%20good.avif", width: 39 },
  { alt: "AKQA logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd0d6_Akqa.avif", width: 67 },
  { alt: "Wieden+Kennedy logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd0fe_Wieden%2BKennedy.avif", width: 72 },
  { alt: "Gucci logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/6904c2d9d8bc045a394d2693_gucci.avif", width: 185 },
  { alt: "Accenture logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd0e1_Accenture.avif", width: 107 },
  { alt: "Rimowa logo", src: "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/6904c8ae873d6ef1683e0edd_RIMOWA.avif", width: 240 }
];

// Theme Definitions
const themes = {
  LIGHT: {
    label: "LIGHT",
    colors: {
      background: "#ffffff",
      text: "#000000",
      lottieBg: "#f5f5f5",
      tagBg: "#e0e0e0",
      accent: "#333333",
      pattern: "#f0f0f0"
    },
    isDark: false
  },
  SAMBA: {
    label: "SAMBA",
    colors: {
      background: "#e94e1b", // Vibrant Orange/Red
      text: "#ffffff",
      lottieBg: "#fbe4dd",
      tagBg: "#c23b10",
      accent: "#4a1205",
      pattern: "#d34113"
    },
    isDark: true
  },
  NOIR: {
    label: "NOIR",
    colors: {
      background: "#1a1a1a", // Dark Gray/Black
      text: "#f0f0f0",
      lottieBg: "#2a2a2a",
      tagBg: "#4a4a4a",
      accent: "#000000",
      pattern: "#333333"
    },
    isDark: true
  },
  PSYCHOLOGICAL: {
    label: "PSYCHOLOGICAL",
    colors: {
      background: "#200736",    // User provided Deep Purple
      text: "#ffffff",
      lottieBg: "#f2f0f9",      // User provided Light Gray/Purple
      tagBg: "#9d98b3",         // User provided Muted Purple
      accent: "#060317",        // User provided Near Black
      pattern: "#3d3663"        // User provided Dark Grayish Purple
    },
    isDark: true
  },
  GIALLO: {
    label: "GIALLO",
    colors: {
      background: "#f1c40f", // Vibrant Yellow
      text: "#000000",
      lottieBg: "#fff9c4",
      tagBg: "#d4ac0d",
      accent: "#7d1007", // Blood Red accent
      pattern: "#f39c12"
    },
    isDark: false
  },
  "SCI-FI": {
    label: "SCI-FI",
    colors: {
      background: "#05081c", // Deep Blue/Black
      text: "#00f3ff",     // Neon Cyan
      lottieBg: "#e0fbfc",
      tagBg: "#0f3460",
      accent: "#000000",
      pattern: "#16213e"
    },
    isDark: true
  }
};

export default function App() {
  const audiences = ["agencies", "directors"];
  const [audienceIdx, setAudienceIdx] = useState(0);

  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  const [currentTheme, setCurrentTheme] = useState("LIGHT");
  const activeTheme = themes[currentTheme];

  useEffect(() => {
    return scrollY.on("change", (latest) => {
      setIsScrolled(latest > 100);
    });
  }, [scrollY]);

  useEffect(() => {
    const id = setInterval(() => {
      setAudienceIdx((prev) => (prev + 1) % audiences.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    AOS.init({ once: true, duration: 800, offset: 120 });
  }, []);

  // Compute styles based on active theme
  const themeStyles = {
    "--_theme---background": activeTheme.colors.background,
    "--_theme---inline-lottie-background": activeTheme.colors.lottieBg,
    "--_theme---tag-background": activeTheme.colors.tagBg,
    "--_theme---accent-section-background": activeTheme.colors.accent,
    "--_theme---pattern-background": activeTheme.colors.pattern,
    "--_theme---text": activeTheme.colors.text,
    background: activeTheme.colors.background,
    color: activeTheme.colors.text,
    transition: "background 0.5s ease, color 0.5s ease",
    minHeight: "100vh",
    width: "100%",
    overflowX: "hidden", // Prevent horizontal scroll from absolute elements
    position: "relative"
  };

  const navStyle = isScrolled ? {
    ...styles.nav,
    background: activeTheme.isDark ? "rgba(12, 12, 13, 0.8)" : "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    borderBottom: activeTheme.isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    color: activeTheme.colors.text
  } : {
    ...styles.nav,
    background: "transparent",
    backdropFilter: "none",
    borderBottom: "none",
    boxShadow: "none",
    transition: "all 0.3s ease",
    color: activeTheme.colors.text
  };

  return (
    <div style={themeStyles}>
      <motion.header style={navStyle}>
        <div style={styles.logo}>Home</div>
        <nav style={styles.links}>
        </nav>
        <div style={styles.auth}>
          <button style={{ ...styles.linkBtn, color: activeTheme.colors.text }}>Log in</button>
          <button style={styles.primaryBtn}>Sign up</button>
          <ThemeToggle
            currentTheme={currentTheme}
            setTheme={setCurrentTheme}
            themes={themes}
          />
        </div>
      </motion.header>

      <Hero audiences={audiences} audienceIdx={audienceIdx} />

      <ImagePopGrid />

      <Reveal as="section" style={styles.marqueeSection} delay={140}>
        <div style={styles.marqueeHeader}>
          <h3 style={{ ...styles.marqueeTitle, color: activeTheme.colors.text }}>Trusted by the brands shaping culture</h3>
        </div>
        <div style={styles.marqueeViewport}>
          <motion.div
            style={styles.marqueeRow}
            initial={{ x: 0 }}
            animate={{ x: "-50%" }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          >
            {brandLogos.concat(brandLogos).map((logo, idx) => (
              <div key={`${logo.src}-${idx}`} style={styles.brandLogoWrap}>
                <img
                  src={logo.src}
                  alt={logo.alt}
                  width={logo.width}
                  height="32"
                  loading="lazy"
                  style={activeTheme.isDark ? { ...styles.brandLogoImg, filter: "brightness(0) invert(1)" } : styles.brandLogoImg}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </Reveal>

      <VisualExpression theme={activeTheme.isDark ? "dark" : "light"} />


      <IntroPlatform />

      <FindInfluences />
      <CreativityTools />

      <GenerateEdit />

      <CoverLogo />
      <Search />
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 0",
    position: "sticky",
    top: 0,
    background: "rgba(249,249,251,0.9)",
    backdropFilter: "blur(10px)",
    zIndex: 10,
  },
  logo: {
    paddingLeft: "20px",
    fontFamily: "var(--_typography---ui--mono--s--font-family)",
    fontSize: "var(--_typography---ui--mono--s--font-size)",
    lineHeight: "var(--_typography---ui--mono--s--line-height)",
    fontWeight: "var(--_typography---ui--mono--s--font-weight)",
    letterSpacing: "var(--_typography---ui--mono--s--letter-spacing)",
    textTransform: "uppercase",
  },
  links: { display: "flex", gap: 16, alignItems: "center" },
  auth: { display: "flex", gap: 8 },
  linkBtn: {
    border: "none",
    background: "transparent",
    color: "#0c0c0d",
    cursor: "pointer",
    fontWeight: 600,
  },
  primaryBtn: {
    border: "none",
    background: "#111",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600,
  },
  ghostBtn: {
    border: "1px solid #ddd",
    background: "#fff",
    color: "#0c0c0d",
    padding: "10px 16px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: 600,
  },
  marqueeSection: { padding: "24px 0 8px", marginTop: 4 },
  marqueeHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  marqueeTitle: { margin: 0, fontSize: 18, fontWeight: 700 },
  marqueeViewport: {
    overflow: "hidden",
    position: "relative",
    padding: "12px 0",
    width: "100vw",
    marginLeft: "calc(50% - 50vw)",
    marginRight: "calc(50% - 50vw)",
    borderRadius: 0,
    background: "transparent",
    border: "none",
    maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
    WebkitMaskImage:
      "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
  },
  marqueeRow: {
    display: "flex",
    alignItems: "center",
    gap: 22,
    minWidth: "200%",
    padding: "6px 0",
  },
  brandLogoWrap: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6px 16px",
    minWidth: 140,
  },
  brandLogoImg: { height: 32, width: "auto", objectFit: "contain", transition: "filter 0.3s ease" },
  stats: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
    gap: 16,
    padding: "32px 0",
  },
  stat: {
    background: "#fff",
    border: "1px solid #eee",
    borderRadius: 12,
    padding: "16px 14px",
    textAlign: "center",
  },
  statValue: { fontSize: 24, fontWeight: 700 },
  statLabel: { color: "#555", marginTop: 4 },
};
