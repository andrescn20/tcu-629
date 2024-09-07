import React from "react";

const LogoutButton = () => {

    const logout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };
    
  return (
    <button onClick={() => logout()}>
      Salir
    </button>
  );
};

export default LogoutButton;