import React, { useEffect, useState } from "react";

function HoverDiv({ text, svgImage, isCliquer, onclick }) {
  const [isHovered, setIsHovered] = useState(false);

  // Fonction pour gérer l'effet de survol
  const handleMouseOver = () => setIsHovered(true);
  const handleMouseOut = () => setIsHovered(false);

  return (
    <div
      onClick={() => {
        onclick();
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={{
        display: "flex",
        alignItems: "center",
        padding: "8px",
        margin: "0.75rem",
        backgroundColor: isCliquer
          ? "#0d6efd" // Bleu si le bouton est cliqué
          : isHovered
          ? "#007bff" // Bleu clair au survol
          : "transparent", // Transparent par défaut
        borderRadius: "8px",
        cursor: "pointer",
        transition: "background-color 0.3s ease", // Animation pour adoucir les transitions de couleur
      }}
    >
      <div
        style={{
          marginRight: "1rem",
          color: isCliquer || isHovered ? "white" : "black",
        }}
      >
        {svgImage}
      </div>
      <div
        style={{
          fontSize: "20px",
          color: isCliquer || isHovered ? "white" : "black",
        }}
      >
        {text}
      </div>
    </div>
  );
}

export default HoverDiv;
