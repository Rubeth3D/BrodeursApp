{/* Source :
    https://stackoverflow.com/questions/77784919/how-can-i-implement-a-toggle-functionality-in-reactjs-where-clicking-a-function?,
    et chatGPT 
*/}

import React, { useState } from 'react';

const ListEtudiant = ({ etudiants, handleCheckboxChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-2">
      <label htmlFor="etudiants">Sélectionner des étudiants</label>
      <br></br>
      <button
        type="button"
        onClick={toggleDropdown}
        className="btn btn-secondary"
      >
        {isOpen ? 'Fermer la liste' : 'Ouvrir la liste'}
      </button>

      {isOpen && (
  <fieldset id="etudiants" className="mt-4 border p-4 rounded">
    <legend>Étudiants</legend>
    {etudiants.map((etudiant) => (
      <div key={etudiant.id_etudiant} className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id={`etudiant-${etudiant.id_etudiant}`}
          value={etudiant.id_etudiant}
          onChange={(e) =>
            handleCheckboxChange(e, etudiant.id_etudiant)
          }
        />
        <label
          className="form-check-label"
          htmlFor={`etudiant-${etudiant.id_etudiant}`}
        >
          {etudiant.nom_complet}
        </label>
      </div>
    ))}
  </fieldset>
)}
    </div>
  );
};

export default ListEtudiant;
