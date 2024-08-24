import React, {useState, useEffect} from "react";
import { IDDOptions } from "./Interfaces";
import { Dropdown } from "@fluentui/react/lib/Dropdown";

interface IProps {
    index: number; 
    options: IDDOptions[];
    updateSelectedSensors: (index: number, selectedId: number) => void;
}

const dropdownStyles = {
    dropdown: { width: 600 },
  };
  
  
const SensorDropDown = ({index, options, updateSelectedSensors}: IProps) => {

    const [selectedId, setSelectedId] = useState<number>(0);

    useEffect(() => {
        updateSelectedSensors(index, selectedId);
    }, [selectedId]);
  return (
    <Dropdown
      placeholder="Seleccione una opción"
      selectedKey={selectedId}
      label="Sensores Disponibles"
      options={options}
      styles={dropdownStyles}
      onChange={(e, item) => {
        if (item) {
          setSelectedId(item.key as number);
        }
      }}
    />
  );
};

export default SensorDropDown;
