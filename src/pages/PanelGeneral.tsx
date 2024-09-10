import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Device from "../components/Device";
import { IDevice } from "../utils/Interfaces";
import { Spinner } from "@fluentui/react";
import fetchWithAuth from "../utils/fetchWithAuth";

const PanelGeneral = () => {
  const [devices, setDevices] = useState<IDevice[]>([]);

  const fetchData = async () => {
    const response = await fetchWithAuth("/Device/GetAllDevices");
    const devices = await response.json();
    setDevices(devices);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderDevices = () => {
    return devices.map((device, i) => {
      return (
        <div className="rounded-md bg-slate-200">
          <Device device={device} />
        </div>
      );
    });
  };

  return (
    <Layout>
      <div className="flex justify-center my-4">
        <div className="flex-grow bg-right max-w-4xl">{devices.length == 0 ? <Spinner /> : renderDevices()}</div>
      </div>
    </Layout>
  );
};

export default PanelGeneral;
