import React, { useState } from "react";

function HoverDiv({ text, svgImage }) {
  // État pour gérer la couleur de la div au survol
  const [isHovered, setIsHovered] = useState(false);

  // Changer la couleur de fond lors du survol
  const handleMouseOver = () => {
    setIsHovered(true);
  };

  // Rétablir la couleur de fond lors du retrait du survol
  const handleMouseOut = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      style={{
        display: "flex",
        alignItems: "center", // Aligne verticalement l'image et le texte
        padding: "10px",
        backgroundColor: isHovered ? "#0d6efd" : "transparent", // Change la couleur de fond en bleu au survol
        borderRadius: "8px", // Ajoute un rayon pour arrondir les coins de la div
        cursor: "pointer", // Change le curseur en pointeur lorsqu'on survole
        transition: "background-color 0.3s ease", // Animation de transition lors du changement de couleur
      }}
    >
      <div style={{ marginRight: "10px" }}>
        {/* Affiche l'image SVG */}
        {svgImage}
      </div>
      <div style={{ fontSize: "18px", color: isHovered ? "white" : "black" }}>
        {/* Affiche le texte */}
        {text}
      </div>
    </div>
  );
}

export default HoverDiv;
