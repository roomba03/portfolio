import React from "react";

export default function StampedImage({ src = "/stamp-test.jpg", alt = "Stamped image", blend = "color-burn", className = "" }) {
  const style = { mixBlendMode: blend };
  const variant = blend === "color-burn" ? "stamp-ink" : "stamp-multiply";

  return (
    <div className={`stamped-wrap ${variant} ${className} max-w-sm mx-auto`}>
      <div className="stamp-frame">
        <img
          src={src}
          alt={alt}
          className="stamp-img"
          style={style}
        />
      </div>
    </div>
  );
}
