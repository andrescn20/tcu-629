import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Dropdown } from "@fluentui/react/lib/Dropdown";
import { TextField } from "@fluentui/react/lib/TextField";
import { PrimaryButton } from "@fluentui/react";
import { useNavigate } from "react-router-dom";
import { IDevice, INewDevice, IType } from "../components/Interfaces";
import SensorFormField from "../components/SensorFormField";
import BoardFormField from "../components/BoardFormField";

const AgregarDispositivo = () => {
  const url = import.meta.env.VITE_API_URL;
  const dropdownStyles = {
    dropdown: { width: 300 },
  };

  const navigate = useNavigate();

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
    sensorIds: [],
    boardId: 0,
  });

  const hasDuplicates = (selectedIds: number[]) => {
    return selectedIds.some((item: number, index: number) => selectedIds.indexOf(item) !== index);
  };

  const createDevice = async () => {
    let createdDeviceId = 0
    if (newDevice.sensorIds.length === 0) {
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
    if (newDevice.sensorIds.includes(0)) {
      alert("Debe rellenar todos los campso de los sensores o eliminar los espacios vacíos");
      throw new Error();
    }
    if (hasDuplicates(selectedSensors)) {
      alert("No puede seleccionar el mismo sensor más de una vez");
      throw new Error();
    }
    console.log("Creating Device");
    try {
      const response = await fetch(url + "/Device/CreateNewDevice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDevice),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      const device: IDevice = await response.json();
      if(device.deviceId !== null) {
      createdDeviceId = device.deviceId;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    return createdDeviceId;
  };

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
        const deviceId: number = await createDevice();
        alert(`Dispositvo creado con éxito 
              Id Dispositivo: ${deviceId}`);
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
    const response = await fetch(url + "/Device/GetDeviceTypes?withDevices=false");
    const data = await response.json();
    setDeviceTypes(data);
    generateDeviceTypeOptions(data);
  };
  const fetchSensorTypes = async () => {
    const response = await fetch(url + "/Sensor/GetSensorTypes");
    const data = await response.json();
    setSensorTypes(data);
  };

  const fetchSensors = async () => {
    const response = await fetch(url + "/Sensor/GetAllSensors");
    const data = await response.json();
    setSensors(data);
  };

  const fetchBoards = async () => {
    const response = await fetch(url + "/Board/GetAllBoards");
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
    setNewDevice({ ...newDevice, sensorIds: selectedSensors });
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
        {sensors.length === 0 || boards.length === 0 ? (
          <>
            <h2>No hay sensores o dispositivos disponibles.</h2>
            <a href="./configuracion">Ir a Configuración</a>
          </>
        ) : (
          <>
            <h2 className="text-2xl">Nuevo Dispositivo</h2>
            <form onSubmit={handleSubmit} className="w-1/2">
              <p className="font-bold my-4">Dispositivo</p>
              <Dropdown
                required={true}
                placeholder="Seleccione una opción"
                label="Tipo de Dispositivo"
                options={deviceTypeOptions}
                styles={dropdownStyles}
                onChange={(e, item) => {
                  if (item) {
                    setNewDevice({ ...newDevice, deviceTypeId: Number(item.key) });
                  }
                }}
              />
              <TextField
                label="Ubicación"
                placeholder="Pabellón Central"
                required
                value={newDevice.location}
                onChange={(e) => setNewDevice({ ...newDevice, location: (e.target as HTMLInputElement).value })}
              />
              <TextField
                label="Descripción"
                placeholder="Calentador para las habitaciones 1 al 4"
                value={newDevice.description}
                onChange={(e) => setNewDevice({ ...newDevice, description: (e.target as HTMLInputElement).value })}
              />
              <p className="font-bold my-4">Sensores</p>
              <SensorFormField
                sensors={sensors}
                setSensor={setSelectedSensors}
                currentSelection={newDevice.sensorIds}
              />
              <p className="font-bold my-4">Controlador</p>
              <BoardFormField boards={boards} setBoardId={setSelectedBoardId} />
              <div className="flex justify-start">
                <PrimaryButton className="mt-4 mr-4" text="Guardar" type="submit" />
              </div>
            </form>
          </>
        )}
      </div>
    </Layout>
  );
};

export default AgregarDispositivo;
