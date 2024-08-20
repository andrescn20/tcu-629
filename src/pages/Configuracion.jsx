import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import TypesForm from '../components/TypesForm';

const Configuracion = () => {

    const url = import.meta.env.VITE_API_URL

    const [deviceTypes, setDeviceTypes] = useState([]);
    const [sensorTypes, setSensorTypes] = useState([]);

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

    useEffect(() => {
        fetchDeviceTypes();
        fetchSensorTypes();
    }, []);


    return (
        <Layout>
            <div className='flex-grow bg-right bg-contain bg-no-repeat'>
                <h1 className='text-2xl text-center'> Configuración</h1>
                <TypesForm deviceTypes={deviceTypes} sensorTypes={sensorTypes} url={url} fetchDeviceTypes={fetchDeviceTypes}
                    fetchSensorTypes={fetchSensorTypes} />
            </div>
        </Layout>
    );
};

export default Configuracion;