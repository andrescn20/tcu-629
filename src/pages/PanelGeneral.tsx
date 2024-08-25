import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Device from "../components/Device";
import { IDevice } from "../components/Interfaces";

const PanelGeneral = () => {

  const [devices, setDevices] = useState<IDevice[]>([]);

  const url = import.meta.env.VITE_API_URL;

  const fetchData = async () => {
    const response = await fetch(url + "/Device/GetAllDevices");
    const devices = await response.json();
    setDevices(devices);
  };

  const deleteDevice = (deviceId: number): void => {
    fetch(url + `/Device/DeleteDevice?deviceId=${deviceId}`, {
      method: "DELETE",
    }).then(() => {
      fetchData();
    });
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
            {renderDevices()}
          </div>
      </div>
    </Layout>
  );
};

export default PanelGeneral;
