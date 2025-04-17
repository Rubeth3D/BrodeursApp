import { bottom } from "@popperjs/core";
import React from "react";
import ReactDom from "react-dom";

function ModalModifierClasse({ open, classe, estFermee }) {
  const STYLE_OVERLAY = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    zIndex: 1000,
  };
  const STYLE_DU_MODAL = {
    position: "fixed",
    left: "50%",
    top: "50%",
    bottom: "50%",
    right: "50%",
    transform: "translate(-50%,50%)",
    zIndex: 1000,
  };
  if (!open) {
    return null;
  }
  return ReactDom.createPortal(
    <>
      <div style={STYLE_OVERLAY}>
        <div style={STYLE_DU_MODAL}>
          <button onClick={estFermee}>X</button>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}
export default ModalModifierClasse;
