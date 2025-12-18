import React from "react";
import { motion } from "framer-motion";
import idea1 from "../assets/idea-1.png";



export default function SearchBeautifully() {
    return (
        <section style={styles.section}>
            <div style={styles.container}>

                {/* LEFT COLUMN: Text & Badges */}
                <div style={styles.leftCol}>
                    <div style={styles.label}>THE PLATFORM</div>

                    <div style={styles.headingWrap}>
                        <h2 style={styles.heading}>
                            Search <br />
                            Beautifully. <br />
                            Create <br />
                            Purposefully.
                        </h2>

                        {/* "SEARCH /" Badge placed absolutely */}
                        <div style={styles.badgeSearch}>
                            SEARCH <span style={styles.slash}>⌘/</span>
                        </div>

                        {/* "Sparkle" Card placed absolutely */}
                        <div style={styles.cardSparkle}>
                            <span style={styles.sparkleIcon}>✨</span>
                        </div>
                    </div>

                    <div style={styles.bottomRow}>
                        <p style={styles.description}>
                            For those who sketch with references, <br />
                            speak in moodboards, and shape ideas <br />
                            frame by frame.
                        </p>
                        <button style={styles.btnPricing}>
                            LEARN ABOUT PRICING
                        </button>
                    </div>

                    {/* Floating Search Bar (Bottom Center-ish) */}
                    <div style={styles.searchBar}>
                        <input type="text" placeholder="SEARCH ANYTHING" style={styles.searchInput} disabled />
                        <div style={styles.searchKey}>SEARCH ⌘/</div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Platform Images */}
                <div style={styles.rightCol}>
                    <div style={styles.platformHeaderWrapper}>
                        <img
                            src="https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd179_search-header.svg"
                            loading="eager"
                            alt=""
                            style={styles.platformHeader}
                        />
                    </div>

                    <div style={styles.platformImagesWrapper}>
                        <img
                            src="https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd17d_search-platform.avif"
                            loading="eager"
                            alt=""
                            srcSet="https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd17d_search-platform.avif 500w, https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd17d_search-platform.avif 800w, https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd17d_search-platform.avif 1059w"
                            sizes="(max-width: 1439px) 100vw, 1059px"
                            style={styles.platformImage}
                        />

                        <div style={styles.platformImages}>
                            {/* The image that apparently slides up or is positioned */}
                            <motion.img
                                src={idea1}
                                loading="eager"
                                alt=""
                                style={styles.searchPlatformImage}
                                initial={{ y: -300, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                viewport={{ once: true }}
                            />
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}

const styles = {
    section: {
        padding: "120px 24px 200px 24px",
        background: "#fff",
        color: "#000",
        overflow: "hidden", // Ensure horizontal slider doesn't break layout
        fontFamily: "'Inter', sans-serif",
    },
    container: {
        maxWidth: 1400,
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 60,
        alignItems: "center",
        "@media (max-width: 900px)": {
            gridTemplateColumns: "1fr",
        }
    },
    leftCol: {
        position: "relative",
        paddingRight: 40,
    },
    label: {
        fontSize: 12,
        fontWeight: 600,
        letterSpacing: 2,
        marginBottom: 40,
        opacity: 0.5,
    },
    headingWrap: {
        position: "relative",
        marginBottom: 80,
    },
    heading: {
        fontSize: "clamp(60px, 7vw, 90px)",
        lineHeight: 0.9,
        fontWeight: 500,
        letterSpacing: "-0.04em",
        margin: 0,
    },
    badgeSearch: {
        position: "absolute",
        top: "30px", // Adjust based on "Search" line height
        left: "340px", // Approximate placement next to "Search"
        background: "#f3f3f3",
        border: "1px solid #e5e5e5",
        padding: "8px 16px",
        borderRadius: "12px",
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 1,
        color: "#999",
        display: "flex",
        alignItems: "center",
        gap: 8,
        transform: "rotate(-2deg)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    },
    slash: {
        background: "#fff",
        padding: "2px 6px",
        borderRadius: 4,
        color: "#000",
    },
    cardSparkle: {
        position: "absolute",
        top: "180px", // Next to "Create"
        left: "-20px",
        width: 80,
        height: 80,
        background: "#fff",
        border: "1px solid #eee",
        borderRadius: 16,
        boxShadow: "0 12px 24px rgba(0,0,0,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transform: "rotate(6deg)",
        zIndex: 2,
    },
    sparkleIcon: {
        fontSize: 32,
    },
    bottomRow: {
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 20,
        marginBottom: 60,
    },
    description: {
        fontSize: 18,
        lineHeight: 1.5,
        fontWeight: 500,
        maxWidth: 340,
        margin: 0,
    },
    btnPricing: {
        background: "#000",
        color: "#fff",
        padding: "16px 24px",
        borderRadius: 8,
        fontSize: 12,
        fontWeight: 700,
        letterSpacing: 1,
        border: "none",
        cursor: "pointer",
    },
    searchBar: {
        background: "#f5f5f5",
        borderRadius: 100, // Pill shape
        padding: "8px 8px 8px 24px",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "space-between",
        minWidth: 380,
        border: "1px solid #eee",
    },
    searchInput: {
        background: "transparent",
        border: "none",
        outline: "none",
        fontSize: 14,
        fontWeight: 600,
        color: "#999",
        flex: 1,
    },
    searchKey: {
        background: "#fff",
        padding: "10px 16px",
        borderRadius: 100,
        fontSize: 12,
        fontWeight: 700,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    },
    // RIGHT COL
    rightCol: {
        position: "relative",
        paddingLeft: 20,
        display: "flex",
        flexDirection: "column",
        // width: '20px',
        alignItems: "center", // Center the images
    },
    platformHeaderWrapper: {
        position: 'relative',
        zIndex: 2,
        marginBottom: -10, // Slight overlap
        width: "90%", // Make header slightly smaller than platform
    },
    platformHeader: {
        width: "100%",
        display: "block",
    },
    platformImagesWrapper: {
        position: 'relative',
        width: "100%",
    },
    platformImage: {
        width: '100%',
        display: 'block',
        borderRadius: 16,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
    },
    platformImages: {
        position: 'absolute',
        top: 0,
        left: '10%', // Center the 70% width element (100 - 70) / 2
        width: '70%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: "none",
        borderRadius: 16, // Match platformImage radius
        overflow: "hidden", // Prevent inner image from spilling out
    },
    searchPlatformImage: {
        width: "65%", // Reduced from 80% to fit inside whitespace
        borderRadius: "0.5rem", // Slightly smaller radius to match scale
        boxShadow: "0 10px 30px rgba(0,0,0,0.15)",

    }
};
