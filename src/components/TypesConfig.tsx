import React, { useEffect, useState } from "react";
import { TextField } from '@fluentui/react/lib/TextField';
import { PrimaryButton } from "@fluentui/react";
import { IType } from "./Interfaces";

const TypesForm = () => {
    const url = import.meta.env.VITE_API_URL;

    const [newSensorType, setNewSensorType] = useState("");
    const [newDeviceType, setNewDeviceType] = useState("");
    const [deviceTypes, setDeviceTypes] = useState<IType[]>([]);
    const [sensorTypes, setSensorTypes] = useState<IType[]>([]);
  
    const fetchDeviceTypes = async () => {
      const response = await fetch(url + "/Device/GetDeviceTypes?withDevices=false");
      const data = await response.json();
      setDeviceTypes(data);
    };
    const fetchSensorTypes = async () => {
      const response = await fetch(url + "/Sensor/GetSensorTypes");
      const data = await response.json();
      setSensorTypes(data);
    };
  

    const handleNewSensorSubmit = async () => {
        const response = await fetch(url + '/Sensor/AddSensorType', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type: newSensorType })
        });
        setNewSensorType("");
        fetchSensorTypes();
    }

    const handleNewDeviceSubmit = async () => {
        const response = await fetch(url + '/Device/AddDeviceType', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type: newDeviceType })
        });
        setNewDeviceType("");
        fetchDeviceTypes();
    }

    const deleteType = async (typeId:number, category:string) => {
        const categoryMapper: { [key: string]: string } = {
            sensor: "Sensor",
            device: "Device"
        }
        const selectedCategory = categoryMapper[category];
        await fetch(url + `/${selectedCategory}/Delete${selectedCategory}Type?typeId=${typeId}`, {
            method: 'DELETE',
        });
        if (category === "sensor") fetchSensorTypes();
        if (category === "device") fetchDeviceTypes();
    }

    const renderTypesTable = (types:IType[], category:string) => {
        return types.map((type, index) => {
            return <div className={`flex max-w-sm p-2 ${index % 2 == 0 ? "bg-slate-200" : ""}`}>
                <p className="flex-grow" key={type.typeId}>{type.type}</p>
                <button onClick={() => deleteType(type.typeId, category)}>
                    <svg width="18" height="18" fill="none" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 1.75a3.25 3.25 0 0 1 3.245 3.066L15.25 5h5.25a.75.75 0 0 1 .102 1.493L20.5 6.5h-.796l-1.28 13.02a2.75 2.75 0 0 1-2.561 2.474l-.176.006H8.313a2.75 2.75 0 0 1-2.714-2.307l-.023-.174L4.295 6.5H3.5a.75.75 0 0 1-.743-.648L2.75 5.75a.75.75 0 0 1 .648-.743L3.5 5h5.25A3.25 3.25 0 0 1 12 1.75Zm6.197 4.75H5.802l1.267 12.872a1.25 1.25 0 0 0 1.117 1.122l.127.006h7.374c.6 0 1.109-.425 1.225-1.002l.02-.126L18.196 6.5ZM13.75 9.25a.75.75 0 0 1 .743.648L14.5 10v7a.75.75 0 0 1-1.493.102L13 17v-7a.75.75 0 0 1 .75-.75Zm-3.5 0a.75.75 0 0 1 .743.648L11 10v7a.75.75 0 0 1-1.493.102L9.5 17v-7a.75.75 0 0 1 .75-.75Zm1.75-6a1.75 1.75 0 0 0-1.744 1.606L10.25 5h3.5A1.75 1.75 0 0 0 12 3.25Z" fill="#212121" /></svg>
                </button>
            </div>
        })
    }

    useEffect(() => {
        fetchDeviceTypes();
        fetchSensorTypes();
    }, []);
    return (
        <div className="flex space-x-8 justify-start px-8 mb-8 pb-4">
            <div className="w-1/3">
                <p className='font-bold mt-4 text-lg'>Tipos de Sensores</p>
                <TextField className="max-w-sm my-2" label="Nuevo Tipo de Sensor" placeholder="Ej: Sensor de Humedad" required value={newSensorType}
                    onChange={(e) => {
                        setNewSensorType(e.target.value)
                    }} />
                <PrimaryButton className="mb-2" text="Agregar" onClick={(e) => handleNewSensorSubmit(e.target.value)} />
                <p className="font-bold" > Tipos de sensores registrados: </p>
                {deviceTypes.length === 0 ? <p>No hay tipos que mostrar</p> : renderTypesTable(sensorTypes, "sensor")}
            </div>
            <div className="w-1/3">
                <p className='font-bold mt-4 text-lg'>Tipos de Dispositivos</p>
                <TextField className="max-w-sm my-2" label="Nuevo Tipo de Dispositivo" placeholder="Ej: Calentador" required value={newDeviceType}
                    onChange={(e) => {
                        setNewDeviceType(e.target.value)
                    }} />
                <PrimaryButton className="mb-2" text="Agregar" onClick={() => handleNewDeviceSubmit()} />
                <p className="font-bold" > Tipos de dispositivos registrados: </p>
                {deviceTypes.length === 0 ? <p>No hay tipos que mostrar</p> : renderTypesTable(deviceTypes, "device")}
            </div>
        </div>
    );

}
export default TypesForm;