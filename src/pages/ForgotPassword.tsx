import { PrimaryButton, TextField } from "@fluentui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [requested, setRequested] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`${url}/Auth/ForgotPassword`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        resetUrl: `${window.location.origin}/reset-password`, // Pass the reset URL
      }),
    });

    if (response.ok) {
      setMessage("Si el email está asociado a un usuario, se enviará un enlace de recuperación.");
      setRequested(true);
    } else {
      setMessage("Error al enviar el enlace de recuperación. Intente más tarde.");
    }
  };

  return (
    <div className="flex flex-col m-12">
      <div className="grow my-12 w-full flex flex-col items-center justify-center">
        <div className="space-x-5 my-4 w-1/3">
          {" "}
          <h2 className="text-lg">Recuperar Contraseña</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              className="col-start-1 row-start-3"
              label="Correo"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="py-2 space-x-3 space-y-3">
              {message && <p>{message}</p>}
              {requested ? (
                <PrimaryButton
                  onClick={() => {
                    navigate("/login");
                  }}>
                  Volver al Inicio
                </PrimaryButton>
              ) : (
                <PrimaryButton type="submit">Recuperar Contraseña</PrimaryButton>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
