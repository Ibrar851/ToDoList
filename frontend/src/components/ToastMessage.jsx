import React, { useEffect } from "react";

const ToastMessage = ({ message, type, onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  // ✅ Different colors
  let bgColor = "darkblue";
  if (type === "update") bgColor = "#0080ffff"; // blue
  if (type === "delete") bgColor = "red";     // red

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        background: bgColor,
        color: "white",
        padding: "12px 20px",
        borderRadius: "8px",
        fontSize: "16px",
        fontWeight: "bold",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        zIndex: 9999,
      }}
    >
      {message}
    </div>
  );
};

export default ToastMessage;
