import React, { useState, useEffect } from "react";
import { Dropdown } from "@fluentui/react/lib/Dropdown";
import { IBoard } from "./Interfaces";
import { IComboBox } from "../../node_modules/@fluentui/react/lib/ComboBox";

interface IProps {
  boards: IBoard[];
  setBoardId: (id:number) => void;
}

interface IDDOptions {
  key: number;
  text: string;
}

const dropdownStyles = {
  dropdown: { width: 600 },
};

export const SensorFormField = ({ boards, setBoardId }: IProps) => {
  const [selectedBoardId, setSelectedBoardId] = useState<number>(0);
  const [dropdownOptions, setDropdownOptions] = useState<IDDOptions[]>([]);

  const generateDropdownOptions = () => {
    const options: IDDOptions[] = [];
    boards.map((board: IBoard) => {
      if (board.isInstalled) return;
      options.push({
        key: board.boardId,
        text: `Id: ${board.boardId} | Micro: ${board.microcontroller} | Descripción: ${board.description}`,
      });
    });
    setDropdownOptions(options);
  };

  useEffect(() => {
    generateDropdownOptions();
  }, [boards]);

  useEffect(() => {
    setBoardId(selectedBoardId);
  }, [selectedBoardId]);

  return !boards.some((board) => board.isInstalled) ? (
      <div className="my-2">
        <p>No hay Placas Disponibles</p>
        <a className="underline text-blue-400" href="./configuracion">
          Agregar Placas
        </a>
      </div>
    ) : (
    <Dropdown
      required={true}
      placeholder="Seleccione una opción"
      label="Placas  Disponibles"
      options={dropdownOptions}
      styles={dropdownStyles}
      onChange={(e, item) => {
        if (item) {
          setSelectedBoardId(Number(item.key));
        }
      }}
    />)
};
export default SensorFormField;
