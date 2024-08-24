import React, { useState} from "react";
import Layout from "../components/Layout";
import TypesForm from "../components/TypesConfig";
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

  const [activeTab, setActiveTab] = useState<number>(TABS.SENSORS);

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
          {activeTab == TABS.TYPES && <TypesForm />}
          {activeTab == TABS.DEVICES && <DevicesConfig />}
          {activeTab == TABS.SENSORS && <SensorsConfig />}
          {activeTab == TABS.BOARDS && <BoardsConfig />}
        </div>
      </div>
    </Layout>
  );
};

export default Configuracion;
