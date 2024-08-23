import React from "react";
import { IBoard } from "./Interfaces";

interface IProps {
  boards: IBoard[];
  fetchBoards: () => void;
}
export const BoardsConfig = ({ boards, fetchBoards }: IProps) => {
  
    const url = import.meta.env.VITE_API_URL;

  const deleteBoard = (boardId: number): void => {
    fetch(url + `/Board/DeleteBoardById?boardId=${boardId}`, {
      method: "DELETE",
    }).then(() => {
      fetchBoards();
    });
  };

  return (
    <div className="mx-8 py-8 ">
      <table className="min-w-full border-2 bg-slate-100">
        {boards.length === 0 && (
          <p>
            No hay dispositivos.
            <a href="./agregardispositivo" className="underline text-blue-500">
              Agregar Dispositivo
            </a>
          </p>
        )}
        <thead className="bg-white border-b-2 border-slate/500">
          <tr>
            <th className="py-2 px-4 text-start">Descripción</th>
            <th className="py-2 px-4 text-start">Microcontrolador</th>
            <th className="py-2 px-4 text-start">Disponibilidad</th>
            <th className="py-2 px-4 text-start">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {boards.map((board, index) => (
            <tr key={board.boardId} className={`${index % 2 !== 0 ? "bg-slate-300" : ""}`}>
              <td className="py-2 px-4">{board.description}</td>
              <td className="py-2 px-4">{board.microcontroller}</td>
              <td className={`py-2 px-4 ${!board.isInstalled ? "text-green-700" : "text-red-700"}`}>
                {!board.isInstalled ? "Disponible " : "En Uso"}
              </td>
              <td className="py-2 px-4">
                <button onClick={() => deleteBoard(board.boardId)}>
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    {" "}
                    <path
                      d="M12 1.75a3.25 3.25 0 0 1 3.245 3.066L15.25 5h5.25a.75.75 0 0 1 .102 1.493L20.5 6.5h-.796l-1.28 13.02a2.75 2.75 0 0 1-2.561 2.474l-.176.006H8.313a2.75 2.75 0 0 1-2.714-2.307l-.023-.174L4.295 6.5H3.5a.75.75 0 0 1-.743-.648L2.75 5.75a.75.75 0 0 1 .648-.743L3.5 5h5.25A3.25 3.25 0 0 1 12 1.75Zm6.197 4.75H5.802l1.267 12.872a1.25 1.25 0 0 0 1.117 1.122l.127.006h7.374c.6 0 1.109-.425 1.225-1.002l.02-.126L18.196 6.5ZM13.75 9.25a.75.75 0 0 1 .743.648L14.5 10v7a.75.75 0 0 1-1.493.102L13 17v-7a.75.75 0 0 1 .75-.75Zm-3.5 0a.75.75 0 0 1 .743.648L11 10v7a.75.75 0 0 1-1.493.102L9.5 17v-7a.75.75 0 0 1 .75-.75Zm1.75-6a1.75 1.75 0 0 0-1.744 1.606L10.25 5h3.5A1.75 1.75 0 0 0 12 3.25Z"
                      fill="#212121"
                    />{" "}
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default BoardsConfig;
