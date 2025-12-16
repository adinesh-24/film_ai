import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import idea1 from "../assets/idea-1.png";
import ideaMerged from "../assets/idea-merged.png";

export default function GenerateEdit() {
    const [showResult, setShowResult] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowResult((prev) => !prev);
        }, 3000); // Toggle every 3 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <section style={styles.section}>
            <div style={styles.container}>
                <div style={styles.grid}>
                    {/* Left Column */}
                    <div style={styles.leftCol}>
                        <div style={styles.header}>
                            <h3 style={styles.title}>
                                Generate <br />
                                <span style={styles.iconDiamondWrapper}>
                                    <svg viewBox="0 0 85 85" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.iconSvg}>
                                        <rect x="42.4219" width="60" height="60" rx="16" transform="rotate(45 42.4219 0)" fill="currentColor"></rect>
                                    </svg>
                                </span> & Edit
                            </h3>
                            <p style={styles.subtitle}>
                                An AI built for creators, helping you to<br />
                                transform ideas into artistic visions.
                            </p>
                        </div>

                        {/* Preset Card */}
                        <div style={styles.cardPreset}>
                            <div style={styles.windowHeader}>
                                <div style={styles.dots}><span /><span /><span /></div>
                                <span style={styles.windowTitle}>PRESET</span>
                            </div>
                            <div style={styles.gridBackground}>
                                <div style={styles.dropZone}>
                                    DRAG AND DROP HERE
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Combine Ideas */}
                    <div style={styles.rightCol}>
                        <div style={styles.cardCombine}>
                            <div style={styles.windowHeader}>
                                <div style={styles.dots}><span /><span /><span /></div>
                                <span style={styles.windowTitle}>COMBINE IDEAS</span>
                            </div>
                            <div style={styles.gridBackground}>
                                <div style={styles.combineImages}>
                                    <AnimatePresence mode="wait">
                                        {!showResult ? (
                                            <motion.div
                                                key="inputs"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                transition={{ duration: 0.5 }}
                                                style={{ display: "flex", gap: "20px", alignItems: "center" }}
                                            >
                                                <motion.img
                                                    src={idea1}
                                                    alt="Idea 1"
                                                    style={styles.combineImg}
                                                    layoutId="img1"
                                                />
                                                <motion.img
                                                    src="https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd15c_knight-7.avif"
                                                    alt="Idea 2"
                                                    style={styles.combineImg}
                                                    layoutId="img2"
                                                />
                                            </motion.div>
                                        ) : (
                                            <motion.img
                                                key="result"
                                                src={ideaMerged}
                                                alt="Merged Result"
                                                initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
                                                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                                                exit={{ opacity: 0 }}
                                                transition={{ duration: 0.8, ease: "easeOut" }}
                                                style={{ ...styles.combineImg, width: "300px", height: "200px" }}
                                            />
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>


            </div>
        </section>
    );
}

const styles = {
    section: {
        backgroundColor: "#f5f5f5", // Gray background
        color: "#000",
        padding: "120px 24px",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
    },
    container: {
        maxWidth: "1400px",
        margin: "0 auto",
        position: "relative",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "60px",
        alignItems: "start",
        "@media (max-width: 900px)": {
            gridTemplateColumns: "1fr",
        }
    },
    leftCol: {
        display: "flex",
        flexDirection: "column",
        gap: "80px",
    },
    title: {
        fontSize: "clamp(64px, 8vw, 120px)",
        fontWeight: "600",
        lineHeight: "0.9",
        letterSpacing: "-0.04em",
        marginBottom: "32px",
    },
    iconDiamondWrapper: {
        display: "inline-block",
        verticalAlign: "middle",
        width: "0.8em",
        height: "0.8em",
        marginBottom: "0.1em",
        color: "#15803d", // Green
    },
    iconSvg: {
        width: "100%",
        height: "100%",
        display: "block",
    },
    subtitle: {
        fontSize: "20px",
        lineHeight: "1.5",
        fontWeight: "500",
        maxWidth: "400px",
        opacity: 0.8,
    },
    // Cards
    cardPreset: {
        border: "1px solid #e5e5e5",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
        width: "80%",
    },
    cardCombine: {
        border: "1px solid #e5e5e5",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
        width: "100%",
        minHeight: "500px",
        display: "flex",
        flexDirection: "column",
    },
    windowHeader: {
        backgroundColor: "#f5f5f5",
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center", // Title centered
        position: "relative",
        borderBottom: "1px solid #e5e5e5",
    },
    dots: {
        position: "absolute",
        left: "16px",
        display: "flex",
        gap: "6px",
    },
    windowTitle: {
        fontSize: "10px",
        fontWeight: "600",
        letterSpacing: "1px",
        opacity: 0.5,
        textTransform: "uppercase",
    },
    gridBackground: {
        backgroundColor: "#fff",
        backgroundImage: `
            linear-gradient(to right, #f0f0f0 1px, transparent 1px),
            linear-gradient(to bottom, #f0f0f0 1px, transparent 1px)
        `,
        backgroundSize: "40px 40px",
        flex: 1,
        padding: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "300px",
    },
    dropZone: {
        border: "1px dashed #ccc",
        borderRadius: "12px",
        width: "100%",
        height: "180px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "10px",
        fontWeight: "600",
        color: "#999",
        backgroundColor: "#fff",
    },
    combineImages: {
        display: "flex",
        gap: "40px",
        alignItems: "center",
    },
    combineImg: {
        width: "200px",
        height: "140px",
        borderRadius: "12px",
        objectFit: "cover",
        boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
    },

};
