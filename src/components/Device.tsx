import React, { useEffect, useState } from "react";
import DeviceCard from "../components/DeviceCard";
import { IDevice, IDeviceStats } from "../utils/Interfaces";
import { PrimaryButton } from "../../node_modules/@fluentui/react/lib/Button";
import { useNavigate } from "react-router-dom";
import fetchWithAuth from "../utils/fetchWithAuth";

interface DeviceProps {
  device: IDevice;
}

const Device = ({ device }: DeviceProps) => {
  const navigate = useNavigate();
  
  const [stats, setStats] = useState<IDeviceStats>();

  const fetchData = async () => {
    const id = device.deviceId.toString();
    const response = await fetchWithAuth(`/Device/GetDeviceStats?deviceId=${id}`);
    const stats = await response.json();
    console.log(stats);
    setStats(stats);
  };


  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="rounded-md px-8 py-4 mb-4">
      <div className="grid grid-cols-3 mb-2 gap-2">
        <p className="col-start-1 row-start-2">
          <strong>Ubicación:</strong> {device.location}
        </p>
        <p className="" key={device.deviceId}>
          <strong>Tipo:</strong> {device.deviceType}
        </p>
        <p className="col-start-2 row-start-1 col-span-2">
          <strong>Descripción:</strong> {device.description}
        </p>
      <div className="row-start-2 col-start-3 col-span-1 flex justify-end mr-2">
        <PrimaryButton  onClick={() => navigate(`/dispositivo?deviceId=${device.deviceId}&description=${device.description}&location=${device.location}&deviceType=${device.deviceType}`)}>Ver Detalles</PrimaryButton>
        </div>
      </div>
      {stats && <div className="grid grid-cols-2">
        <DeviceCard title="Temperatura Mas Reciente" value={stats.latestTemperature} date={stats.latestTemperatureTime} />
        <DeviceCard title="Temperatura Promedio" value={stats.medianTemperature}  date={undefined}/>
        <DeviceCard title="Temperatura Maxima" value={stats.maxTemperature} date={stats.maxTemperatureTime} />
        <DeviceCard title="Temperatura Minima" value={stats.minTemperature} date={stats.minTemperatureTime} />
      </div>}
    </div>
  );
};

export default Device;
