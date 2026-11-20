import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header-contents">
        <h2>Pide aquí tu comida favorita</h2>
        <p>
          Elige entre un menú variado con platos preparados con los mejores
          ingredientes y experiencia culinaria. Nuestra misión es satisfacer
          tus antojos y mejorar tu experiencia gastronómica, una deliciosa
          comida a la vez.
        </p>
        <button>Ver menú</button>
      </div>
    </div>
  );
};

export default Header;
