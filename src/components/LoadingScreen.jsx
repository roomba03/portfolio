import React from "react";

export default function LoadingScreen() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#FAF8EF",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "7px",
        zIndex: 10000,
        animation: "loading-fade 1100ms ease forwards",
      }}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: "14px",
            height: "14px",
            backgroundColor: "#8BA6A9",
            animation: "bubble-bounce 0.55s ease-in-out infinite",
            animationDelay: `${i * 0.14}s`,
          }}
        />
      ))}
    </div>
  );
}
