import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Device from "../components/Device";
import { IDevice } from "../utils/Interfaces";
import { Spinner } from "@fluentui/react";
import fetchWithAuth from "../utils/fetchwithauth";

const PanelGeneral = () => {

  const [devices, setDevices] = useState<IDevice[]>([]);

  const url = import.meta.env.VITE_API_URL;

  const fetchData = async () => {
    const response = await fetchWithAuth(url + "/Device/GetAllDevices");
    const devices = await response.json();
    setDevices(devices);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderDevices = () => {
    return devices.map((device) => {
      return (
        <Device device={device}/>
      );
    });
  };

  return (
    <Layout>
      <div className="flex justify-center">
          <div className="flex-grow bg-right max-w-4xl">
            {devices.length == 0 ? <Spinner /> : renderDevices()}
          </div>
      </div>
    </Layout>
  );
};

export default PanelGeneral;
