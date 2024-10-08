import React, { useState } from "react";
import { DefaultButton, PrimaryButton, Spinner, SpinnerSize, TextField } from "@fluentui/react";
import fetchWithAuth from "../utils/fetchWithAuth";
import { Link } from "react-router-dom";

interface LoginFormProps {
  onLogin: (token: string) => void;
  registerUser: () => void;
}
const LoginForm = ({ onLogin, registerUser }: LoginFormProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage('');
    setLoading(true);
    const loginData = {
      username: username,
      password: password,
    };

    try {
      const response = await fetchWithAuth(`/Auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
        isAuthenticated: false,
      });

      setLoading(false);
      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        onLogin(token);
        localStorage.setItem("token", token);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Credenciales inválidas");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      setErrorMessage("Error al iniciar sesión");
    }
  };

  return (
    <div>
      <h2 className="text-lg">Inicio de Sesión</h2>
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
            label="Contraseña"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link className="text-blue-500" to="/forgot-password">
            Recuperar Contraseña
          </Link>
          <div className="py-2 space-x-3 space-y-3">
            <PrimaryButton type="submit" text="Iniciar Sesión" />
            <DefaultButton onClick={() => registerUser()} text="Registrar Usuario" />
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginForm;
