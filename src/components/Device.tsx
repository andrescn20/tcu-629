import React from "react";
import DeviceCard from "../components/DeviceCard";
import { IDevice } from "./Interfaces";
import { PrimaryButton } from "../../node_modules/@fluentui/react/lib/Button";
import { useNavigate } from 'react-router-dom';

interface DeviceProps {
  device: IDevice;
}

const Device = ({ device }: DeviceProps) => {
    
    const navigate = useNavigate();

  return (
    <div className=" rounded-md px-8 py-4 mb-4">
      <div className="grid grid-cols-3 mb-2">
          <p className="col-start-1">
            <strong>Ubicación:</strong> {device.location}
          </p>
          <p className="" key={device.deviceId}>
            <strong>Tipo:</strong> {device.deviceType}
          </p>
          <p className="col-start-2 row-start-1 col-span-2">
            <strong>Descripción:</strong> {device.description}
          </p>
      </div>
      <PrimaryButton onClick={() => navigate(`/dispositivo?deviceId=${device.deviceId}`)}>Ver Detalles</PrimaryButton>
      <div className="grid grid-cols-2">
        <DeviceCard title="Temperatura Actual" value="25°C" />
        <DeviceCard title="Temperatura Promedio" value="25°C" />
        <DeviceCard title="Temperatura Maxima" value="25°C" />
        <DeviceCard title="Temperatura Minima" value="25°C" />
      </div>
    </div>
  );
};

export default Device;
