import React from "react";
import "./Footer.css";
import { assets } from "../../assets/frontend_assets/assets";

const Footer = () => {
  return (
    <div className="footer" id="footer">
      <div className="footer-content">
        <div className="footer-content-left">
          <span className="footer-brand">Asador Andaluz</span>
          <p>
            Disfruta de una amplia selección de platos preparados con
            ingredientes frescos y entregados a la puerta de tu hogar.
          </p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Empresa</h2>
          <ul>
            <li>Inicio</li>
            <li>Sobre nosotros</li>
            <li>Entrega</li>
            <li>Política de privacidad</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>Contacto</h2>
          <ul>
            <li>+92-308-4900522</li>
            <li>contact@tomato.com</li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">
        © 2026 Asador Andaluz - Todos los derechos reservados.
      </p>
    </div>
  );
};

export default Footer;
