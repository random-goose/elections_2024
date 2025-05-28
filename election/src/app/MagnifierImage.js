// MagnifierImage.jsx
import React, { useRef, useState } from "react";

const MagnifierImage = ({
  src,
  alt,
  magnifierHeight = 150,
  magnifierWidth = 150,
  zoom = 2,
  style = {},
  ...rest
}) => {
  const [[x, y], setXY] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  const imgRef = useRef(null);

  return (
    <div
      style={{ position: "relative", display: "inline-block", ...style }}
      onMouseEnter={() => setShowMagnifier(true)}
      onMouseLeave={() => setShowMagnifier(false)}
      onMouseMove={e => {
        const { top, left } = imgRef.current.getBoundingClientRect();
        const x = e.pageX - left - window.pageXOffset;
        const y = e.pageY - top - window.pageYOffset;
        setXY([x, y]);
      }}
    >
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        style={{ width: "100%", height: "auto", ...style }}
        {...rest}
      />
      {showMagnifier && (
        <div
          style={{
            pointerEvents: "none",
            position: "absolute",
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifierWidth / 2}px`,
            width: `${magnifierWidth}px`,
            height: `${magnifierHeight}px`,
            borderRadius: "50%",
            boxShadow: "0 0 8px 2px rgba(0,0,0,0.2)",
            border: "2px solid #aaa",
            backgroundColor: "white",
            backgroundImage: `url('${src}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${imgRef.current?.width * zoom}px ${imgRef.current?.height * zoom}px`,
            backgroundPositionX: `-${x * zoom - magnifierWidth / 2}px`,
            backgroundPositionY: `-${y * zoom - magnifierHeight / 2}px`,
            zIndex: 10,
          }}
        />
      )}
    </div>
  );
};

export default MagnifierImage;