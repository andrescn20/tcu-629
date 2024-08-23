import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Dropdown } from "@fluentui/react/lib/Dropdown";
import { TextField } from "@fluentui/react/lib/TextField";
import { PrimaryButton } from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import { IDevice, INewDevice } from "../components/Interfaces";
import SensorFormField from "../components/SensorFormField";
import BoardFormField from "../components/BoardFormField";

const AgregarDispositivo = () => {
  const url = import.meta.env.VITE_API_URL;
  const dropdownStyles = {
    dropdown: { width: 300 },
  };

  const navigate = useNavigate();

  interface IType {
    typeId: number;
    type: string;
  }

  interface ITypeOptions {
    key: number;
    text: string;
  }
  const [deviceTypes, setDeviceTypes] = useState<IType[]>([]);
  const [deviceTypeOptions, setDeviceTypeOptions] = useState<ITypeOptions[]>([]);
  const [sensorTypes, setSensorTypes] = useState<IType[]>([]);
  const [boards, setBoards] = useState([]);
  const [sensors, setSensors] = useState([]);
  const [selectedSensors, setSelectedSensors] = useState<number[]>([]);
  const [selectedBoardId, setSelectedBoardId] = useState<number>(0);
  const [newDevice, setNewDevice] = useState<INewDevice>({
    deviceTypeId: 0,
    location: "",
    description: "",
    sensors: [],
    boardId: 0,
  });
  const [sensorFields, setSensorFields] = useState<JSX.Element[]>([]);

  const hasDuplicates = (selectedIds: number[]) => {
    return selectedIds.some((item: number, index: number) => selectedIds.indexOf(item) !== index);
  };

  const createDevice = async () => {
    if (newDevice.sensors.length === 0) {
      alert("Debe seleccionar al menos un sensor");
      throw new Error();
    }
    if (newDevice.boardId === 0) {
      alert("Debe seleccionar una placa");
      throw new Error();
    }
    if (newDevice.deviceTypeId === 0) {
      alert("Debe seleccionar un tipo de dispositivo");
      throw new Error();
    }
    if (newDevice.location === "") {
      alert("Debe ingresar una ubicación");
      throw new Error();
    }
    if (newDevice.description === "") {
      alert("Debe ingresar una descripción");
      throw new Error();
    }
    if (newDevice.sensors.includes(0)) {
      alert("Debe rellenar todos los campso de los sensores o eliminar los espacios vacíos");
      throw new Error();
    }
    if (hasDuplicates(selectedSensors)) {
      alert("No puede seleccionar el mismo sensor más de una vez");
      throw new Error();
    }
    console.log("Creating Device");
    const response = await fetch(url + "/Hardware/CreateNewDevice", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newDevice),
    });
    const device: IDevice = await response.json();
    return device;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const device = await createDevice();
      alert(`Dispositvo creado con éxito 
                Id Dispositivo: ${device.deviceId}`);
      navigate("/home");
    } catch (error) {
      alert("ATENCION: Error al crear el dispositivo");
      console.error(error);
      navigate("/agregardispositivo");
    }
  };

  const generateDeviceTypeOptions = (deviceTypes: IType[]) => {
    if (deviceTypes.length === 0) return [];
    const dtypes = deviceTypes.map((type) => {
      return { key: type.typeId, text: type.type };
    });
    setDeviceTypeOptions(dtypes);
  };

  const fetchDeviceTypes = async () => {
    const response = await fetch(url + "/Hardware/GetDeviceTypes?withDevices=false");
    const data = await response.json();
    setDeviceTypes(data);
    generateDeviceTypeOptions(data);
  };
  const fetchSensorTypes = async () => {
    const response = await fetch(url + "/Hardware/GetSensorTypes");
    const data = await response.json();
    setSensorTypes(data);
  };

  const fetchSensors = async () => {
    const response = await fetch(url + "/Hardware/GetAllSensors");
    const data = await response.json();
    setSensors(data);
  };

  const fetchBoards = async () => {
    const response = await fetch(url + "/Hardware/GetAllBoards");
    const data = await response.json();
    setBoards(data);
  };

  useEffect(() => {
    fetchDeviceTypes();
    fetchSensorTypes();
    fetchSensors();
    fetchBoards();
  }, []);

  useEffect(() => {
    setNewDevice({ ...newDevice, sensors: selectedSensors });
  }, [selectedSensors]);

  useEffect(() => {
    setNewDevice({ ...newDevice, boardId: selectedBoardId });
  }, [selectedBoardId]);

  useEffect(() => {
    console.log(newDevice);
  }, [newDevice]);

  return (
    <Layout>
      <div className="flex flex-col h-full items-center pt-4 space-y-4">
        <h2 className="text-2xl">Nuevo Dispositivo</h2>
        <form onSubmit={handleSubmit} className="w-1/2">
          <p>Dispositivo</p>
          <Dropdown
            required={true}
            placeholder="Seleccione una opción"
            label="Tipo de Dispositivo"
            options={deviceTypeOptions}
            styles={dropdownStyles}
            onChange={(e, item) => {
              setNewDevice({ ...newDevice, deviceTypeId: item.key });
            }}
          />
          <TextField
            label="Ubicación"
            placeholder="Pabellón Central"
            required
            value={newDevice.location}
            onChange={(e) => setNewDevice({ ...newDevice, location: e.target.value })}
          />
          <TextField
            label="Descripción"
            placeholder="Calentador para las habitaciones 1 al 4"
            value={newDevice.description}
            onChange={(e) => setNewDevice({ ...newDevice, description: e.target.value })}
          />
          <p>Sensores</p>
          <SensorFormField sensors={sensors} setSensor={setSelectedSensors} currentSelection={newDevice.sensors} />
          <p>Placa</p>
          <BoardFormField boards={boards} setBoardId={setSelectedBoardId} />
          <div className="flex justify-start">
            <PrimaryButton className="mt-4 mr-4" text="Guardar" onClick={() => createDevice()} />
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AgregarDispositivo;
