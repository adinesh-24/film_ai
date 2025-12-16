import React, { useState } from "react";

export default function Search() {
  const [searchValue, setSearchValue] = useState("");
  const [btnHover, setBtnHover] = useState(false);
  const phrases = [
    "Knight on a Horse",
    "Reflections on the Water",
    "Black and white film",
    "Quiet moments",
  ];
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search:", searchValue);
  };

  React.useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx((i) => (i + 1) % phrases.length);
        setVisible(true);
      }, 300);
    }, 2600);
    return () => clearInterval(interval);
  }, []);

  return (
    <form style={styles.searchForm} onSubmit={handleSubmit}>
      <div style={styles.searchInputWrapper}>
        <input
          type="text"
          placeholder=""
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={styles.searchInput}
          aria-label="Search"
        />

        {searchValue.length === 0 && (
          <div
            aria-hidden="true"
            style={{
              ...styles.dummyText,
              opacity: visible ? 1 : 0,
            }}
          >
            {phrases[idx].toUpperCase()}
          </div>
        )}

        <button
          type="submit"
          onMouseEnter={() => setBtnHover(true)}
          onMouseLeave={() => setBtnHover(false)}
          style={{
            ...styles.searchButton,
            position: "absolute",
            right: 8,
            top: "50%",
            transform: btnHover ? "translateY(-52%)" : "translateY(-50%)",
            background: btnHover ? "#f5f5f5" : "#fff",
            color: "#000",
            boxShadow: btnHover ? "0 10px 22px rgba(0,0,0,0.12)" : styles.searchButton.boxShadow,
          }}
        >
          SEARCH ⌘/
        </button>
      </div>
    </form>
  );
}

const styles = {
  searchForm: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    padding: "16px 20px",
    background: "transparent",
    backdropFilter: "none",
    borderTop: "none",
    zIndex: 999,
    borderRadius: "20px 20px 0 0",
  },
  searchInputWrapper: {
    flex: 1,
    maxWidth: 400,
    position: "relative",
  },
  searchInput: {
    width: "100%",
    padding: "12px 16px 12px 16px",
    paddingRight: "110px",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    background: "rgba(255, 255, 255, 0.2)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
    borderRadius: 24,
    fontFamily: "var(--_typography---ui--mono--s--font-family)",
    fontSize: "var(--_typography---body--s--font-size)",
    lineHeight: "var(--_typography---ui--mono--s--line-height)",
    fontWeight: 400,
    letterSpacing: "var(--_typography---ui--mono--s--letter-spacing)",
    textTransform: "uppercase",
    outline: "none",
    transition: "border-color 200ms ease",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  dummyText: {
    position: "absolute",
    left: 0,
    right: "110px",
    top: 0,
    bottom: 0,
    display: "flex",
    alignItems: "center",
    padding: "12px 12px 12px 16px",
    color: "#7d8278",
    pointerEvents: "none",
    transition: "opacity 240ms ease",
    textTransform: "uppercase",
    fontFamily: "var(--_typography---body--s--font-family)",
    letterSpacing: "var(--_typography---body--s--letter-spacing)",
    fontSize: "var(--_typography---body--s--font-size)",
    fontWeight: 400,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  searchButton: {
    padding: "10px 14px",
    background: "#fff",
    color: "#000",
    border: "1px solid #eee",
    borderRadius: 20,
    fontWeight: 600,
    cursor: "pointer",
    transition: "background 200ms ease, transform 120ms ease, box-shadow 200ms ease, color 120ms ease",
    boxShadow: "0 6px 14px rgba(0,0,0,0.06)",
  },
};
