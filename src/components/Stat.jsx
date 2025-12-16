import React from "react";

export default function Stat({ label, value }) {
  const styles = {
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

  return (
    <div style={styles.stat}>
      <div style={styles.statValue}>{value}</div>
      <div style={styles.statLabel}>{label}</div>
    </div>
  );
}
