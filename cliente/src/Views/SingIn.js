import React, { useState } from "react";
import { Link } from "react-router-dom";

import Main from "../Components/Main.js";

export default function SingIn({ singIn, showError }) {
  const [userEmailPassword, setUserEmailPassword] = useState({
    email: "",
    password: "",
  });

  function getUserData(e) {
    setUserEmailPassword({
      ...userEmailPassword,
      [e.target.name]: e.target.value,
    });
  }

  async function sendDataToServer(e) {
    e.preventDefault();

    try {
      await singIn(userEmailPassword.email, userEmailPassword.password);
    } catch (err) {
      showError(err.response.data.message);
      console.log(err.response.data.message);
    }
  }

  return (
    <Main center={true}>
      <div className="FormContainer">
        <h1 className="Form__titulo">Intercambiagram</h1>
        <p className="FormContainer__info">
          Inicia secion para usar Intercambiagram
        </p>
        <form onSubmit={sendDataToServer}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="Form__field"
            onChange={getUserData}
            value={userEmailPassword.email}
          />
          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            className="Form__field"
            onChange={getUserData}
            value={userEmailPassword.password}
          />
          <button className="Form__submit" type="submit">
            Sign up
          </button>
          <p className="FormContainer__info">
            No tienes cuenta? <Link to="/singUp">Registrate</Link>
          </p>
        </form>
      </div>
    </Main>
  );
}
