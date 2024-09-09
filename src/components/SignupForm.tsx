import React, { useState } from "react";
import { DefaultButton, PrimaryButton, TextField } from "@fluentui/react";
import fetchWithAuth from "../utils/fetchWithAuth";

interface SignUpFormProps {
  onSignUp: () => void;
  logIn: () => void;
}
const SignUpForm = ({ onSignUp, logIn }: SignUpFormProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const baseUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Las contraseñas no coinciden.");
      return;
    }

    const signupData = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await fetchWithAuth(`${baseUrl}/Auth/Register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
        isAuthenticated: false,
      });

      if (response.ok) {
        console.log("weHere");
        onSignUp();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData[""][0] || "Información inválida");
      }
    } catch (error) {
      setErrorMessage("Error el registrar usuario");
    }
  };

  return (
    <div>
      <h2 className="text-lg">Registro de Usuario</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <TextField
          className="col-start-1 row-start-3"
          label="Usuario"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          className="col-start-1 row-start-3"
          label="Correo"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className="col-start-1 row-start-3"
          label="Contraseña"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <TextField
          className="col-start-1 row-start-2"
          label="Confirmar Contraseña"
          type="password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <div className="py-2 space-x-3 space-y-3">
          <PrimaryButton type="submit" text="Registrar Usuario" />
          <DefaultButton onClick={() => logIn()} text="Iniciar Sesión" />
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
