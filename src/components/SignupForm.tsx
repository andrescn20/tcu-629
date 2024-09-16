import React, { useState } from "react";
import { DefaultButton, PrimaryButton, Spinner, SpinnerSize, TextField } from "@fluentui/react";
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
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event) => {
    setErrorMessage("");
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
    setLoading(true);
    try {
      const response = await fetchWithAuth(`/Auth/Register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
        isAuthenticated: false,
      });
      setLoading(false);
      if (response.ok) {
        onSignUp();
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData[""][0] || "Información inválida");
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage("Error el registrar usuario");
    }
  };

  return (
    <div>
      <h2 className="text-lg">Registro de Usuario</h2>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
      {loading ? (
        <Spinner size={SpinnerSize.large} />
      ) : (
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
      )}
    </div>
  );
};

export default SignUpForm;
