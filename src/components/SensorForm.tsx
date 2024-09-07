import React, { useEffect, useState } from "react";
import { Dropdown } from "@fluentui/react/lib/Dropdown";
import { TextField } from "@fluentui/react/lib/TextField";
import { IDDOptions, INewSensor, ISensor, IType } from "../utils/Interfaces";
import { PrimaryButton } from "@fluentui/react";
import fetchWithAuth from "../utils/fetchwithauth";

interface IProps {
  fetchSensors: () => void;
  setShowForm: (value: boolean) => void;
}

const SensorForm = ({ fetchSensors, setShowForm }: IProps) => {
  const url = import.meta.env.VITE_API_URL;

  const dropdownStyles = {
    dropdown: { width: 300 },
  };

  const [newSensor, setNewSensor] = useState<INewSensor>({
    sensorTypeId: 0,
    description: "",
    sensorName: "",
    sensorAddress: "",
  });
  const [dropdownOptions, setDropdownOptions] = useState<IDDOptions[]>([]);
  const [sensorTypes, setSensorTypes] = useState<IType[]>([]);

  const generateDropdownOptions = () => {
    const options: IDDOptions[] = [];

    sensorTypes.map((type: IType) => {
      options.push({
        key: type.typeId,
        text: type.type,
      });
    });
    setDropdownOptions(options);
  };

  const fetchSensorTypes = async () => {
    const response = await fetchWithAuth(url + "/Sensor/GetSensorTypes");
    const data = await response.json();
    setSensorTypes(data);
  };

  const createNewSensor = async (e) => {
    e.preventDefault();
    if (newSensor.sensorTypeId === 0) {
      alert("Debe seleccionar el tipo de sensor");
      return;
    }
    const response = await fetchWithAuth(url + "/Sensor/CreateNewSensor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSensor),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    fetchSensors();
    setShowForm(false)
  };

  useEffect(() => {
    fetchSensorTypes();
  }, []);
  useEffect(() => {
    generateDropdownOptions();
  }, [sensorTypes]);

  return (
    <div className="my-2 space-y-4 flex flex-col items-center">
      <form
        onSubmit={createNewSensor}
        className="max-w-2xl bg-white p-4 rounded-md grid grid-cols-2 items-end justify-end gap-2">
        <p className="text-start font-bold col-start-1 row-start-1 col-span-2">Agregar Nuevo Sensor:</p>
        <Dropdown
          className="col-start-1 row-start-2"
          required
          placeholder="Seleccione una opción"
          label="Tipo de Sensor"
          options={dropdownOptions}
          styles={dropdownStyles}
          onChange={(e, item) => {
            setNewSensor({ ...newSensor, sensorTypeId: item!.key });
          }}
        />
        <TextField
          className="col-start-2 row-start-2"
          label="Nombre"
          required
          value={newSensor.sensorName}
          onChange={(e) => {
            setNewSensor({ ...newSensor, sensorName: e.target.value });
          }}
        />
        <TextField
          className="col-start-1 row-start-3"
          label="Descripción"
          required
          value={newSensor.description}
          onChange={(e) => setNewSensor({ ...newSensor, description: e.target.value })}
        />{" "}
        <TextField
          className="col-start-2 row-start-3"
          label="Address"
          required
          value={newSensor.sensorAddress}
          onChange={(e) => setNewSensor({ ...newSensor, sensorAddress: e.target.value })}
        />
        <PrimaryButton type="subit" className="col-start-1 row-start-4" text="Agregar Sensor" />
      </form>
    </div>
  );
};
export default SensorForm;
