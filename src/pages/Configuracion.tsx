import React, { useState, useEffect, act } from "react";
import Layout from "../components/Layout";
import TypesForm from "../components/TypesForm";
import { IDeviceType, ISensorType, IDevice } from "../components/Interfaces";
import SensorsConfig from "../components/SensorsConfig";
import BoardsConfig from "../components/BoardsConfig";
import DevicesConfig from "../components/DevicesConfig";

const Configuracion = () => {
  const url = import.meta.env.VITE_API_URL;

  const TABS = {
    SENSORS: 1,
    BOARDS: 2,
    DEVICES: 3,
    TYPES: 4,
  };

  const [deviceTypes, setDeviceTypes] = useState<IDeviceType[]>([]);
  const [sensorTypes, setSensorTypes] = useState<ISensorType[]>([]);
  const [devices, setDevices] = useState<IDevice[]>([]);
  const [sensors, setSensors] = useState([]);
  const [boards, setBoards] = useState([]);
  const [activeTab, setActiveTab] = useState<number>(TABS.SENSORS);

  const fetchDeviceTypes = async () => {
    const response = await fetch(url + "/Hardware/GetDeviceTypes?withDevices=false");
    const data = await response.json();
    setDeviceTypes(data);
  };
  const fetchSensorTypes = async () => {
    const response = await fetch(url + "/Hardware/GetSensorTypes");
    const data = await response.json();
    setSensorTypes(data);
  };

  const fetchDevices = async () => {
    const response = await fetch(url + "/Device/GetAllDevices");
    const data = await response.json();
    setDevices(data);
  };

  const deleteDevice = (deviceId: number): void => {
    fetch(url + `/Device/DeleteDevice?deviceId=${deviceId}`, {
      method: "DELETE",
    }).then(() => {
      fetchDevices();
    });
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
    fetchDevices();
    fetchSensors();
    fetchBoards();
  }, []);

  return (
    <Layout>
      <div className="flex-grow bg-right bg-contain bg-no-repeat mt-4">
        <button
          className={`text-xl ml-8 py-2 px-8 ${activeTab == TABS.SENSORS ? "rounded-t-md bg-slate-200" : ""}`}
          onClick={() => {
            setActiveTab(TABS.SENSORS);
          }}>
          Sensores
        </button>
        <button
          className={`text-xl px-8 py-2 ${activeTab == TABS.BOARDS ? "rounded-t-md bg-slate-200" : ""}`}
          onClick={() => {
            setActiveTab(TABS.BOARDS);
          }}>
          Controladores
        </button>
        <button
          className={`text-xl px-8 py-2 ${activeTab == TABS.DEVICES ? "rounded-t-md bg-slate-200" : ""}`}
          onClick={() => {
            setActiveTab(TABS.DEVICES);
          }}>
          Dispositivos
        </button>
        <button
          className={`text-xl px-8 py-2 ${activeTab == TABS.TYPES ? "rounded-t-md bg-slate-200" : ""}`}
          onClick={() => {
            setActiveTab(TABS.TYPES);
          }}>
          Opciones
        </button>
        <div
          className={`bg-slate-200 mx-8 rounded-b-md rounded-tr-md ${
            activeTab == TABS.DEVICES ? "rounded-tl-md" : ""
          }`}>
          {activeTab == TABS.TYPES && (
            <TypesForm
              deviceTypes={deviceTypes}
              sensorTypes={sensorTypes}
              url={url}
              fetchDeviceTypes={fetchDeviceTypes}
              fetchSensorTypes={fetchSensorTypes}
            />
          )}
          {activeTab == TABS.DEVICES && <DevicesConfig devices={devices} fetchDevices={fetchDevices} />}
          {activeTab == TABS.SENSORS && <SensorsConfig sensors={sensors} fetchSensors={fetchSensors} />}
          {activeTab == TABS.BOARDS && <BoardsConfig boards={boards} fetchBoards={fetchBoards}/>}
        </div>
      </div>
    </Layout>
  );
};

export default Configuracion;
