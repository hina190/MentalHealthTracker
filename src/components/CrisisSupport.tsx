import React from "react";

const CrisisSupport: React.FC = () => (
  <div
    style={{
      backgroundColor: "#fff1f1",
      padding: "24px",
      borderRadius: "12px",
      border: "1px solid #ffcccc",
      margin: "32px 0",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      fontFamily: "sans-serif",
      color: "#333",
      lineHeight: 1.6,
    }}
  >
    <h2 style={{ color: "#cc0000", marginBottom: "12px" }}>
      🚨 Need Help Now?
    </h2>
    <p>If you are in crisis or need immediate support, please reach out:</p>
    <ul style={{ paddingLeft: "20px", marginTop: "8px" }}>
      <li>
        <strong>National Helpline:</strong>{" "}
        <a
          href="tel:1-800-662-HELP"
          style={{ color: "#cc0000", textDecoration: "underline" }}
        >
          1-800-662-HELP
        </a>
      </li>
      <li>
        <strong>Text:</strong>{" "}
        <a
          href="sms:741741"
          style={{ color: "#cc0000", textDecoration: "underline" }}
        >
          741741
        </a>{" "}
        (Text <strong>HOME</strong> to 741741)
      </li>
      <li>
        <strong>Emergency:</strong> Call <strong>911</strong> or your local
        emergency number.
      </li>
    </ul>
  </div>
);

export default CrisisSupport;
