import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Pool of images to cycle through
const imagePool = [
    "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd15c_knight-7.avif",
    "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd15a_knight-1.avif",
    "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd157_knight-6.avif",
    "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd113_knight-3.avif",
    "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd116_knight-10.avif",
    "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd15b_knight-8.avif",
    "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd114_knight-2.avif",
    "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd117_knight-9.avif",
    "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd156_knight-4.avif",
    "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd15c_knight-7.avif", // Re-add doubles for randomness
    "https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd111_Anomaly.avif", // Add some brands as easter eggs? No keep to knights/film
];

// Fixed layout positions
const gridPositions = [
    { top: "5%", left: "2%", width: "14%", aspectRatio: "4/3", borderRadius: 12 },
    { top: "2%", left: "20%", width: "10%", aspectRatio: "3/2", borderRadius: 8 },
    { top: "28%", left: "32%", width: "8%", aspectRatio: "3/2", borderRadius: 8 },
    { top: "5%", left: "45%", width: "18%", aspectRatio: "16/9", borderRadius: 16 },
    { top: "25%", left: "70%", width: "7%", aspectRatio: "3/2", borderRadius: 8 },
    { top: "15%", right: "-5%", width: "20%", aspectRatio: "3/4", borderRadius: 20, zIndex: 2 },
    { top: "55%", left: "5%", width: "18%", aspectRatio: "4/3", borderRadius: 16 },
    { top: "70%", left: "40%", width: "16%", aspectRatio: "16/9", borderRadius: 12 },
    { top: "60%", left: "70%", width: "12%", aspectRatio: "4/3", borderRadius: 12 },
    { top: "85%", left: "85%", width: "6%", aspectRatio: "1", borderRadius: 8 }
];

const GridItem = ({ pos, index }) => {
    // Random start image
    const [imgIndex, setImgIndex] = useState(index % imagePool.length);

    useEffect(() => {
        // Random interval between 3s and 8s for organic feel
        const randomInterval = Math.random() * 5000 + 3000;

        const timer = setInterval(() => {
            setImgIndex(prev => (prev + 1) % imagePool.length);
        }, randomInterval);

        return () => clearInterval(timer);
    }, []);

    return (
        <div style={{
            position: "absolute",
            top: pos.top,
            left: pos.left,
            right: pos.right,
            width: pos.width,
            aspectRatio: pos.aspectRatio,
            borderRadius: pos.borderRadius,
            overflow: "hidden",
            zIndex: pos.zIndex || 1,
            boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            backgroundColor: "#eee"
        }}>
            <AnimatePresence mode="wait">
                <motion.img
                    key={imgIndex}
                    src={imagePool[imgIndex]}
                    alt={`Grid item ${index}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.4, ease: "backOut" }}
                    style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        position: "absolute",
                        inset: 0
                    }}
                />
            </AnimatePresence>
        </div>
    );
};

export default function ImagePopGrid() {
    const [searchTerm, setSearchTerm] = useState("BLACK AND WHITE FILM");

    // Dynamic search term typing effect (optional, matching the "changing text" vibe)
    useEffect(() => {
        const terms = ["BLACK AND WHITE FILM", "S ON THE WATER", "SCI-FI CITIES", "VINTAGE CARS"];
        let idx = 0;
        const interval = setInterval(() => {
            idx = (idx + 1) % terms.length;
            setSearchTerm(terms[idx]);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section style={styles.container}>
            {/* Grid Lines Background */}
            <div style={styles.gridBackground}></div>

            {/* Images Layer */}
            <div style={styles.imagesLayer}>
                {gridPositions.map((pos, index) => (
                    <GridItem key={index} pos={pos} index={index} />
                ))}
            </div>

            {/* Central Search Pill */}
            <div style={styles.centerContent}>
                <div style={styles.searchPill}>
                    <span style={styles.searchText}>
                        {searchTerm.split("").map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.05, delay: i * 0.05 }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </span>
                    <button style={styles.searchButton}>
                        SEARCH <span style={styles.commandIcon}>⌘/</span>
                    </button>
                </div>
            </div>
        </section>
    );
}

const styles = {
    container: {
        position: "relative",
        width: "100%",
        height: "100vh", // Full viewport height for impact
        minHeight: "800px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f9f9fb", // Light gray/white background
        marginTop: "60px", // Offset for nav if needed
        overflow: "hidden"
    },
    gridBackground: {
        position: "absolute",
        inset: 0,
        backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        pointerEvents: "none",
        zIndex: 0
    },
    imagesLayer: {
        position: "absolute",
        inset: 0,
        zIndex: 1,
        pointerEvents: "none" // Allow clicks to pass through to maybe buttons below
    },
    centerContent: {
        position: "relative",
        zIndex: 10,
        width: "100%",
        display: "flex",
        justifyContent: "center"
    },
    searchPill: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "90%",
        maxWidth: "600px",
        height: "80px",
        backgroundColor: "#e8e8ed", // Light greyish pill
        borderRadius: "999px",
        padding: "0 12px 0 40px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.05)",
        border: "1px solid rgba(255,255,255,0.4)"
    },
    searchText: {
        fontFamily: "'Courier New', Courier, monospace", // Monospace for the "typewriter" feel
        fontSize: "18px",
        letterSpacing: "2px",
        textTransform: "uppercase",
        color: "#333",
        fontWeight: "600",
        minWidth: "200px" // Prevent layout shift
    },
    searchButton: {
        backgroundColor: "#fff",
        border: "none",
        borderRadius: "999px",
        padding: "16px 32px",
        fontSize: "14px",
        fontWeight: "700",
        color: "#000",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        transition: "transform 0.2s ease"
    },
    commandIcon: {
        opacity: 0.4,
        fontSize: "12px",
        marginLeft: "4px"
    }
};
