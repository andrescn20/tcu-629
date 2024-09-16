import { PrimaryButton, TextField } from "@fluentui/react";
import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import fetchWithAuth from "../utils/fetchWithAuth";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Las contraseñas no coinciden.");
      return;
    }

    const response = await fetchWithAuth(`/Auth/ResetPassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        token,
        password,
      }),
    });

    if (response.ok) {
      setMessage("Contraseña restablecida con éxito. Redirigiendo a inicio de sesión...");
      setTimeout(() => navigate("/login"), 3000);
    } else {
      setMessage("Error al restablecer la contraseña. Intente más tarde.");
    }
  };

  return (
    <div className="flex flex-col m-12">
      <div className="grow my-12 w-full flex flex-col items-center justify-center">
        <div className="space-x-5 my-4 w-1/3">
          <h2 className="text-lg">Restablecer Contraseña</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              className="col-start-1 row-start-1"
              label="Nueva Contraseña"
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
              <PrimaryButton type="submit">Restablecer Contraseña</PrimaryButton>
            </div>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
 
