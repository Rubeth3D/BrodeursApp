import React, { useState } from "react";

function HoverText({ text, attribute }) {
  // État pour gérer la couleur du texte
  const [couleur, setCouleur] = useState("black");
  const [underLine, setUnderLine] = useState("0px solid white");

  // Changer la couleur lorsque l'élément est survolé
  const handleMouseOver = () => {
    setCouleur("#0d6efd");
    setUnderLine("1px solid #0d6efd");
  };

  // Revenir à la couleur d'origine lorsque le survol est enlevé
  const handleMouseOut = () => {
    setCouleur("black");
    setUnderLine("0px solid white");
  };

  return (
    <h2
      className={attribute}
      style={{
        color: couleur,
        fontSize: "24px",
        fontWeight: "bold",
        borderBottom: underLine,
      }}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      {text}
    </h2>
  );
}

export default HoverText;
