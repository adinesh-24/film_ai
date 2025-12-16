import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import idea1 from "../assets/idea-1.png";

export default function CreativityTools() {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "center center"]
    });

    // Map scroll progress to vertical position (simulating drag)
    // Starts 300px above (-300) and ends at 0
    const y = useTransform(scrollYProgress, [0, 1], [-300, 0]);
    const opacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
    const scale = useTransform(scrollYProgress, [0, 1], [0.5, 1]);
    const rotate = useTransform(scrollYProgress, [0, 1], [-15, 0]);

    return (
        <section ref={sectionRef} style={styles.section}>
            {/* Left Panel - Green with Animation */}
            <div style={styles.leftPanel}>
                <div style={styles.circleContainer}>
                    {/* The Black Circle (Background) */}
                    <div style={styles.blackCircle}>
                        {/* The Draggable/Flying Image (Foreground) - Driven by Scroll */}
                        <motion.div
                            style={{
                                ...styles.imageContainer,
                                y,
                                opacity,
                                scale,
                                rotate
                            }}
                        >
                            <img
                                src={idea1}
                                alt="Idea"
                                style={styles.imageContent}
                            />
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Black with Typography */}
            <div style={styles.rightPanel}>
                <div style={styles.content}>
                    <div style={styles.tag}>AI TOOLS</div>
                    <h2 style={styles.title}>
                        Tools to<br />
                        Unlock<br />
                        Creativity.
                    </h2>
                    <p style={styles.description}>
                        Trained for style, tuned for creators.
                    </p>
                </div>
            </div>
        </section>
    );
}

const styles = {
    section: {
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        position: "relative",
        fontFamily: "'Inter', sans-serif",
    },
    leftPanel: {
        flex: 1,
        backgroundColor: "#4ade80", // Vibrant Green
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        minHeight: "50vh",
    },
    circleContainer: {
        width: "80%",
        height: "80%",
        maxWidth: "600px",
        maxHeight: "600px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    blackCircle: {
        width: "100%",
        aspectRatio: "1/1",
        backgroundColor: "#000",
        borderRadius: "50%",
        position: "relative",
        display: "flex", // To center the image
        alignItems: "center",
        justifyContent: "center",
        zIndex: 0,
    },
    imageContainer: {
        width: "60%", // Image size relative to circle
        height: "60%",
        position: "relative",
        zIndex: 1, // Higher than circle
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    imageContent: {
        width: "100%",
        height: "100%",
        objectFit: "contain",
        borderRadius: "12px", // Slight radius for the image itself
    },
    rightPanel: {
        flex: 1,
        backgroundColor: "#0c0c0d", // Deep Black
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "80px",
        position: "relative",
    },
    content: {
        maxWidth: "500px",
    },
    tag: {
        fontSize: "12px",
        letterSpacing: "2px",
        fontWeight: "600",
        marginBottom: "24px",
        opacity: 0.7,
        fontFamily: "monospace",
    },
    title: {
        fontSize: "clamp(48px, 6vw, 96px)",
        lineHeight: 1,
        fontWeight: "500",
        letterSpacing: "-0.04em",
        marginBottom: "32px",
    },
    description: {
        fontSize: "18px",
        opacity: 0.8,
        fontWeight: "400",
        maxWidth: "300px",
    }
};
