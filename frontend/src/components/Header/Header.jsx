import React from "react";
import "./Header.css";
import headerImage from "../../assets/frontend_assets/header_andaluz.png";

const Header = () => {
  return (
    <div
      className="header"
      style={{ backgroundImage: `url("${headerImage}")` }}
    >
      <div className="header-contents">
        <h2>Pide aquí tu comida favorita</h2>
        <p>
          ¡El auténtico sabor del Ecuador te espera! <br />

Déjate conquistar por los sabores de nuestra tierra, 
disfruta de recetas llenas de tradición y vive una experiencia única en cada bocado. 
¡Elige tu favorito y lleva el sabor de nuestra gastronomía hasta tu mesa!
        </p>
        <button>Ver menú</button>
      </div>
    </div>
  );
};

export default Header;
