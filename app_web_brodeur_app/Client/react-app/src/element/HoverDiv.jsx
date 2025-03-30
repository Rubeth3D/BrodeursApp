import React, { useState } from "react";

function HoverDiv({ text, svgImage, isCliquer}) {
  // État pour gérer la couleur de la div au survol
  const [isHovered, setIsHovered] = useState(false);
  const [opacity, setOpacity] = useState(1);

  // Changer la couleur de fond lors du survol
  const handleMouseOver = () => {
    setIsHovered(true);
    setOpacity(0.8);
  };

  // Rétablir la couleur de fond lors du retrait du survol
  const handleMouseOut = () => {
    if(!isCliquer){
      setIsHovered(false);
      setOpacity(1);
    }
  };

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={{
        display: "flex",
        alignItems: "center", // Aligne verticalement l'image et le texte
        padding: "8px",
        margin: "0.75rem",
        opacity: opacity,
        backgroundColor: isHovered ? "#0d6efd" : "transparent", // Change la couleur de fond en bleu au survol
        borderRadius: "8px", // Ajoute un rayon pour arrondir les coins de la div
        cursor: "pointer", // Change le curseur en pointeur lorsqu'on survole
        transition: "background-color 0.3s ease", // Animation de transition lors du changement de couleur
      }}
    >
      <div style={{ marginRight: "1rem",color: isHovered ? "white" : "black"  }}>
        {svgImage}
      </div>
      <div style={{ fontSize: "20px", color: isHovered ? "white" : "black" }}>
        {/* Affiche le texte */}
        {text}
      </div>
    </div>
  );
}

export default HoverDiv;
