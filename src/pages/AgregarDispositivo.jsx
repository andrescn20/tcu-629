import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { TextField } from '@fluentui/react/lib/TextField';
import { DefaultButton, PrimaryButton } from '@fluentui/react';

const AgregarDispositivo = () => {

    const url = import.meta.env.VITE_API_URL

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [deviceTypes, setDeviceTypes] = useState([]);
    const [typeOptions, setTypeOptions] = useState([]);
    const [newDevice, setNewDevice] = useState({
        deviceTypeId: "",
        description: "",
        location: '',

    });
    const [sensorFields, setSensorFields] = useState([
        <TextField label="Sensor #1" required onChange={(e) => setNewDevice({ ...newDevice, location: e.target.value })} />
    ]
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newDevice.deviceTypeId === "") {
            alert("Por favor elija el tipo de dispositivo");
            return
        }

    };
    const dropdownStyles = {
        dropdown: { width: 300 },
    };

    useEffect(() => {
    }, [newDevice]);

    const generateTypeOptions = () => {
        if (deviceTypes.length === 0) return [];
        const types = deviceTypes.map(type => {
            return { key: type.deviceTypeId, text: type.type }
        })
        setTypeOptions(types);
    };

    const fetchTypes = async () => {
        const response = await fetch(url + '/Device/GetDeviceTypes?withDevices=false');
        const data = await response.json();
        setDeviceTypes(data);
    }

    useEffect(() => {
        generateTypeOptions();
    }, [deviceTypes]);

    useEffect(() => {
        fetchTypes();
    }, []);

    const generateSensorFields = () => {
        const currentFields = sensorFields.length;
        setSensorFields( fields => [...fields, <TextField label={`Sensor #${currentFields + 1}`} required onChange={(e) => setNewDevice({ ...newDevice, location: e.target.value })} />])
    }

    const removeSensorFields = () => {
        const currentFields = sensorFields.length;
        if (currentFields === 1) {
            alert("Debe agregarse al menos un sensor")
            return;
        }
        const newFields = sensorFields.slice(0, currentFields - 1);
        setSensorFields(newFields);
    }

    return (
        <Layout>
            <div className='flex flex-col h-full items-center justify-center space-y-4'>
                <h2 className='text-2xl'>Agregar Dispositivo</h2>
                <form onSubmit={handleSubmit}
                    className='w-1/2'>
                    <Dropdown
                        required={true}
                        placeholder="Seleccione una opción"
                        label="Tipo de Dispositivo"
                        options={typeOptions}
                        styles={dropdownStyles}
                        onChange={(e, item) => setNewDevice({ ...newDevice, deviceTypeId: item.key })}
                    />
                    <TextField label="Id de Placa " required onChange={(e) => setNewDevice({ ...newDevice, location: e.target.value })} />
                    {sensorFields}
                    <DefaultButton className='mt-4' text="Agregar Sensor" onClick={() => generateSensorFields()} />
                    <DefaultButton className='mt-4 ml-2' text="Eliminar Sensor" onClick={() => removeSensorFields()} />
                    <TextField label="Descripción" multiline rows={3} required onChange={(e) => setNewDevice({ ...newDevice, description: e.target.value })} />

                    <PrimaryButton className='mt-4' text="Agregar Dispositivo" type="submit" />
                </form>
            </div>
        </Layout>
    );
};

export default AgregarDispositivo;