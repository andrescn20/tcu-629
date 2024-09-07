import React, { useEffect, useState } from "react";
import { TextField } from "@fluentui/react/lib/TextField";
import { IDDOptions, INewBoard } from "../utils/Interfaces";
import { PrimaryButton } from "@fluentui/react";
import fetchWithAuth from "../utils/fetchwithauth";

interface IProps {
  fetchBoards: () => void;
  setShowBoardForm: (value: boolean) => void;
}
const BoardForm = ({fetchBoards, setShowBoardForm}:IProps) => {

  const url = import.meta.env.VITE_API_URL;

  const [newBoard, setnewBoard] = useState<INewBoard>({
    microcontroller: "",
    description: "",
    boardSerial: "",
  });

  const createnewBoard = async (e) => {
    e.preventDefault();
      const response = await fetchWithAuth(url + "/Board/CreateNewBoard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBoard),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      fetchBoards();
      setShowBoardForm(false)
  };


  return (
    <div className="my-2 space-y-4 flex flex-col items-center">
      <form onSubmit={createnewBoard} className="bg-white p-4 rounded-md grid grid-cols-2 items-end justify-end gap-2">
        <p className="text-start font-bold col-start-1 row-start-1 col-span-2">Agregar Nuevo Controlador:</p>
        <TextField
          className="col-start-1 row-start-2"
          label="Microcontrolador"
          required
          value={newBoard.microcontroller}
          onChange={(e) => {
            setnewBoard({ ...newBoard, microcontroller: e.target.value });
          }}
        />
        <TextField
          className="col-start-2 row-start-2"
          label="Descripción"
          required
          value={newBoard.description}
          onChange={(e) => setnewBoard({ ...newBoard, description: e.target.value })}
        />
        <TextField
          className="col-start-1 row-start-3"
          label="Serial"
          required
          value={newBoard.boardSerial}
          onChange={(e) => setnewBoard({ ...newBoard, boardSerial: e.target.value })}
        />
        <PrimaryButton type="subit" className="col-start-2 row-start-3" text="Guardar Controlador" />
      </form>
    </div>
  );
};
export default BoardForm;
