import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FindInfluences from "./FindInfluences";
import SearchBeautifully from "./SearchBeautifully";

gsap.registerPlugin(ScrollTrigger);

export default function InfluenceSearchSlider() {
    const containerRef = useRef(null);
    const sliderRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const totalSections = 2; // FindInfluences + SearchBeautifully

            gsap.to(sliderRef.current, {
                xPercent: -50, // Move halfway (since 2 sections = 200% width, -50% centers the second one)
                ease: "none",
                scrollTrigger: {
                    trigger: containerRef.current,
                    pin: true,
                    scrub: 1,
                    snap: 1 / (totalSections - 1),
                    start: "top top",
                    end: "+=150%", // Scroll distance to complete animation
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={containerRef} style={styles.outerContainer}>
            <div ref={sliderRef} style={styles.sliderContainer}>

                {/* Section 1: FindInfluences */}
                <div style={styles.sectionWrapper}>
                    <div style={styles.contentContainer}>
                        <FindInfluences />
                    </div>
                </div>

                {/* Section 2: SearchBeautifully */}
                <div style={styles.sectionWrapper}>
                    <div style={styles.contentContainer}>
                        <SearchBeautifully />
                    </div>
                </div>

            </div>
        </div>
    );
}

const styles = {
    outerContainer: {
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        position: "relative",
    },
    sliderContainer: {
        display: "flex",
        width: "200%", // 2 sections
        height: "100%",
    },
    sectionWrapper: {
        width: "50%", // Each section takes half of the 200% width (so 100vw)
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
    },
    contentContainer: {
        width: "100%",
        height: "100%",
        overflow: "hidden", // Prevent internal spill
        // Ensure components inside fill the space or center properly
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    }
};
