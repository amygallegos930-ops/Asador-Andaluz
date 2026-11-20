import React, { useContext, useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/frontend_assets/assets";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
import { toast } from "react-toastify";

const LoginPopup = ({ setShowLogin }) => {
  const {url, setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currentState === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    const response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      toast.success("Sesión iniciada correctamente")
      setShowLogin(false);
    }else{
      toast.error(response.data.message);
    }
  };
  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentState === "Login" ? "Iniciar sesión" : "Crear cuenta"}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              name="name"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Tu nombre"
              required
            />
          )}
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Tu correo electrónico"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Tu contraseña"
            required
          />
        </div>
        <button type="submit">
          {currentState === "Sign Up" ? "Crear cuenta" : "Iniciar sesión"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>Al continuar, acepto los términos de uso y la política de privacidad.</p>
        </div>
        {currentState === "Login" ? (
          <p>
            ¿Crear una cuenta nueva?{" "}
            <span onClick={() => setCurrentState("Sign Up")}>Haz clic aquí</span>
          </p>
        ) : (
          <p>
            ¿Ya tienes una cuenta?{" "}
            <span onClick={() => setCurrentState("Login")}>Inicia sesión aquí</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
