import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Device from "../components/Device";
import { IDevice } from "../components/Interfaces";
import { useSearchParams } from "react-router-dom";

const Dispositivo = () => {

    const [queryParameters] = useSearchParams();
    const deviceId = queryParameters.get('deviceId');

  const [devices, setDevices] = useState<IDevice[]>([]);

  const url = import.meta.env.VITE_API_URL;

  const fetchData = async () => {
    const response = await fetch(url + "/Device/GetAllDevices");
    console.log(response);
    const devices = await response.json();
    console.log(devices);
    setDevices(devices);
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Layout>
      <div className="flex justify-center">DIspositivo Id: {deviceId}</div>
    </Layout>
  );
};

export default Dispositivo;
