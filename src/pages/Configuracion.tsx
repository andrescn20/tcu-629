import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import TypesForm from '../components/TypesForm';
import DeviceTables from '../components/DeviceTable';
import { IDeviceType, ISensorType, IDevice } from '../components/interfaces';

const Configuracion = () => {

    const url = import.meta.env.VITE_API_URL

    const [deviceTypes, setDeviceTypes] = useState<IDeviceType[]>([]);
    const [sensorTypes, setSensorTypes] = useState<ISensorType[]>([]);
    const [devices , setDevices] = useState<IDevice[]>([]);
    const [toogleTypes, setToogleTypes] = useState(true);
    const [toogleDevices, setToogleDevices] = useState(false);
    const [toogleUnderline, setToogleUnderline] = useState(true);

    const fetchDeviceTypes = async () => {
        const response = await fetch(url + '/Hardware/GetDeviceTypes?withDevices=false');
        const data = await response.json();
        setDeviceTypes(data);
    }
    const fetchSensorTypes = async () => {
        const response = await fetch(url + '/Hardware/GetSensorTypes');
        const data = await response.json();
        setSensorTypes(data);
    }

    const fetchDevices = async () => {
        const response = await fetch(url + '/Device/GetAllDevices');
        const data = await response.json();
        setDevices(data);
    }

    const deleteDevice = (deviceId: number): void => {
        fetch(url + `/Device/DeleteDevice?deviceId=${deviceId}`, {
            method: 'DELETE'
        }).then(() => {
            fetchDevices();
        });
    }

    useEffect(() => {
        fetchDeviceTypes();
        fetchSensorTypes();
        fetchDevices();
    }, []);
    
    return (
        <Layout>
            <div className='flex-grow bg-right bg-contain bg-no-repeat mt-4'>
                <button className={`text-xl ml-8 py-2 px-8 ${toogleUnderline ? 'rounded-t-md bg-slate-200' : ''}`} 
                onClick={() =>{ 
                    setToogleTypes(true)
                    setToogleDevices(false)
                    setToogleUnderline(true)
                 }}>Configuración de Tipos</button>
                <button className = {`text-xl px-8 py-2 ${!toogleUnderline ? 'rounded-t-md bg-slate-200' : ''}`}
                onClick={() => {
                    setToogleDevices(true)
                    setToogleTypes(false)
                    setToogleUnderline(false)
                    }}>Configuración de Dispositivos</button>
                    <div className={`bg-slate-200 mx-8 rounded-b-md rounded-tr-md ${!toogleUnderline ? 'rounded-tl-md' : ''}`}>
                {toogleTypes && <TypesForm deviceTypes={deviceTypes} sensorTypes={sensorTypes} url={url} fetchDeviceTypes={fetchDeviceTypes}
                    fetchSensorTypes={fetchSensorTypes} />}
                {toogleDevices && <DeviceTables devices={devices} fetchDevices={fetchDevices}/>}
                    </div>
            </div>
        </Layout>
    );
};

export default Configuracion;