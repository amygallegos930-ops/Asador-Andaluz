import React from "react";
import "./ExploreMenu.css";
import { menu_list } from "../../assets/frontend_assets/assets";

const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Explora nuestro menú</h1>
      <p className="explore-menu-text">
        Elige entre un menú variado con deliciosos platos. Nuestra misión es
        satisfacer tus antojos y mejorar tu experiencia gastronómica.
      </p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => {
          return (
            <div onClick={()=>setCategory(prev=>prev===item.menu_image.name?"All":item.menu_name)} key={index} className="explore-menu-list-item">
              <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
              <p>{({
                Salad: "Ensaladas",
                Rolls: "Rollos",
                Deserts: "Postres",
                Sandwich: "Bocadillos",
                Cake: "Pasteles",
                "Pure Veg": "Vegetariano",
                Pasta: "Pastas",
                Noodles: "Fideos",
              })[item.menu_name]}</p>
            </div>
          );
        })}
      </div>
      <hr/>
    </div>
  );
};

export default ExploreMenu;
