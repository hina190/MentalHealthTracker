"use client";

import React, { useState } from "react";

const PersonalizedTips: React.FC = () => {
  const [tip, setTip] = useState("");
  const [loading, setLoading] = useState(false);

  const getTip = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/tips", { method: "POST" });
      const data = await res.json();
      setTip(data.tip);
    } catch (error) {
      setTip("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#f4faff",
        padding: "24px",
        borderRadius: "12px",
        border: "1px solid #cce4f6",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.04)",
        fontFamily: "sans-serif",
        color: "#333",
        marginTop: "32px",
      }}
    >
      <h2 style={{ marginBottom: "16px", color: "#005f99" }}>
        ✨ Personalized Tips
      </h2>
      <button
        onClick={getTip}
        disabled={loading}
        style={{
          padding: "10px 20px",
          backgroundColor: loading ? "#ccc" : "#007acc",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: loading ? "not-allowed" : "pointer",
          transition: "background-color 0.2s",
        }}
      >
        {loading ? "Loading..." : "Get a Tip"}
      </button>
      {tip && (
        <p style={{ marginTop: "16px", fontStyle: "italic", color: "#333" }}>
          {tip}
        </p>
      )}
    </div>
  );
};

export default PersonalizedTips;
