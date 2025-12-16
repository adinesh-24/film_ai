import React, { useRef } from "react";
import { useScroll } from "framer-motion";

export default function IntroPlatform() {
    const sectionRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    return (
        <section ref={sectionRef} style={styles.section}>
            {/* Top Header Image */}
            <img
                src="https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd178_intro-header.svg"
                loading="eager"
                alt="Platform Header"
                style={styles.headerImg}
            />

            <div style={styles.wrapper}>
                {/* Main Platform Image (Desktop) */}
                <img
                    src="https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd176_intro-platform.avif"
                    loading="eager"
                    alt="Intro Platform"
                    srcSet="https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd176_intro-platform.avif 500w, https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd176_intro-platform.avif 800w, https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd176_intro-platform.avif 1080w, https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd176_intro-platform.avif 1600w, https://cdn.prod.website-files.com/68ad8a274502a69dfd5cd0aa/68ad8a274502a69dfd5cd176_intro-platform.avif 1850w"
                    sizes="(max-width: 1439px) 100vw, 1059px"
                    style={styles.platformImg}
                />



                {/* Target Slots for Scroll Animation */}
                <div className="target-slots-layer" style={styles.targetsContainer}>
                    <div id="target-img-0" style={{ border: "1px dashed rgba(0, 0, 0, 0.1)", borderRadius: "8px", position: "relative", aspectRatio: "16 / 9", placeSelf: "start", width: "100%" }}></div>
                    <div id="target-img-1" style={{ ...styles.targetSlot, ...styles.targetSlotSmall }}></div>
                    <div id="target-img-2" style={{ ...styles.targetSlot, ...styles.targetSlotSmall }}></div>
                    <div id="target-img-3" style={{ ...styles.targetSlot, ...styles.targetSlotLarge }}></div>
                </div>

            </div>
        </section>
    );
}

const styles = {
    section: {
        position: "relative",
        width: "100%",
        maxWidth: 1400,
        margin: "0 auto",
        padding: "0 24px 64px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    headerImg: {
        width: "100%",
        maxWidth: 900,
        height: "auto",
        display: "block",
        marginBottom: -40,
        zIndex: 2,
        position: "relative",
    },
    wrapper: {
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    platformImg: {
        width: "100%",
        height: "auto",
        borderRadius: 12,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
        position: "relative",
        zIndex: 1,
    },
    // Target slots container
    targetsContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 10,
        pointerEvents: "none",
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr 1.2fr", // Reduced last column width
        gap: "1%",
        padding: "2%", // Reduced padding to push items to edges
    },
    targetSlot: {
        border: "1px dashed rgba(0,0,0,0.1)",
        borderRadius: 8,
        position: "relative",
    },
    targetSlotSmall: {
        aspectRatio: "16/9", // Reduced height (was 4/3)
        alignSelf: "start",
        justifySelf: "start",
        width: "100%",
    },
    targetSlotLarge: {
        aspectRatio: "16/9",
        gridColumn: "4 / 5",
        gridRow: "1 / 3",
        alignSelf: "center", // Center vertically in the spanned rows
        width: "100%",
        maxWidth: "240px", // Hard constraint on size
        justifySelf: "center", // Center in its smaller column
    }
};
