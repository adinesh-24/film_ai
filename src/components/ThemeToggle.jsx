import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeToggle({ currentTheme, setTheme, themes }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (key) => {
        setTheme(key);
        setIsOpen(false);
    };

    return (
        <div style={{ position: "relative" }} ref={dropdownRef}>
            <button
                className="theme-toggle"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle theme menu"
                style={styles.triggerButton}
            >
                <div style={styles.triggerOuter}>
                    <div style={{
                        ...styles.triggerInner,
                        transform: isOpen ? "translate(4px, -2px) scale(0.9)" : "translate(4px, -2px)"
                    }}>
                        <div style={styles.pupil} />
                    </div>
                </div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        style={styles.dropdown}
                    >
                        {Object.keys(themes).map((key) => {
                            const theme = themes[key];
                            const isActive = currentTheme === key;
                            return (
                                <button
                                    key={key}
                                    onClick={() => handleSelect(key)}
                                    style={{
                                        ...styles.item,
                                        background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
                                        color: "inherit"
                                    }}
                                    className="theme-item"
                                >
                                    <span style={{ fontWeight: isActive ? 600 : 400 }}>{theme.label}</span>
                                    {isActive && <motion.div layoutId="activeDot" style={styles.activeDot} />}
                                </button>
                            );
                        })}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const styles = {
    triggerButton: {
        background: "transparent",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        borderRadius: "50%",
        width: "40px",
        height: "40px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        padding: "0px",
        marginLeft: "8px",
        color: "inherit"
    },
    triggerOuter: {
        width: "24px",
        height: "24px",
        borderRadius: "50%",
        border: "2px solid currentColor",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--theme-toggle-bg, transparent)",
    },
    triggerInner: {
        transition: "transform 0.3s",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
    },
    pupil: {
        width: "10px",
        height: "10px",
        background: "currentColor",
        borderRadius: "50%",
    },
    dropdown: {
        position: "absolute",
        top: "120%",
        right: 0,
        background: "rgba(30, 30, 35, 0.9)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.1)",
        borderRadius: "12px",
        padding: "8px",
        minWidth: "180px",
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        boxShadow: "0 10px 40px -10px rgba(0,0,0,0.5)",
        zIndex: 2000,
        color: "#fff"
    },
    item: {
        background: "transparent",
        border: "none",
        padding: "10px 16px",
        borderRadius: "8px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "0.85rem",
        textAlign: "left",
        transition: "background 0.2s",
    },
    activeDot: {
        width: 6,
        height: 6,
        borderRadius: "50%",
        background: "#fff",
    }
};
