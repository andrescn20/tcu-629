import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { TextField } from '@fluentui/react/lib/TextField';
import { DefaultButton, PrimaryButton } from '@fluentui/react';
import SensorForm from '../components/SensorForm';
import { useNavigate } from 'react-router-dom';

const AgregarDispositivo = () => {

    const url = import.meta.env.VITE_API_URL
    const dropdownStyles = {
        dropdown: { width: 300 },
    };

    const navigate = useNavigate();

    const [deviceTypes, setDeviceTypes] = useState([]);
    const [deviceTypeOptions, setDeviceTypeOptions] = useState([]);
    const [sensorTypes, setSensorTypes] = useState([]);
    const [sensorTypeOptions, setSensorTypeOptions] = useState([]);
    const [sensors, setSensors] = useState([]);
    const [board, setBoard] = useState({ microcontroller: '', description: '' });
    const [newDevice, setNewDevice] = useState({
        deviceTypeId: "",
        description: "",
        location: '',
        board: {
            microcontroller: '',
            description: ''
        },
        sensors: []

    });
    const [step, setStep] = useState(1);
    const [sensorFields, setSensorFields] = useState([]);

    const createDevice = async () => {
        console.log("Creating Device");
        const response = await fetch(url + '/Hardware/CreateNewDevice', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newDevice),
        })
        const data = await response.json();
        console.log(data);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(newDevice);
            await createDevice();
            alert("Dispositvo creado con éxito");
            navigate('/home');
        }
        catch (error) {
            alert("ATENCION: Error al crear el dispositivo");
            console.error(error);
            navigate('/agregardispositivo');
        }
    }

    const handleNext = () => {
        if (step === 1) {
            if (newDevice.deviceTypeId === "") {
                alert("Por favor elija el tipo de dispositivo");
                return
            }
            if (newDevice.location === "") {
                alert("Por favor ingrese la ubicación del dispositivo");
                return
            }

        }
        if (step === 2) {
        }
        setStep(step + 1);
    }

    useEffect(() => {
        console.log(newDevice);
    }, [newDevice]);

    const generateTypeOptions = () => {
        if (deviceTypes.length === 0) return [];
        const dtypes = deviceTypes.map(type => {
            return { key: type.typeId, text: type.type }
        })
        setDeviceTypeOptions(dtypes);
        if (sensorTypes.length === 0) return [];
        const stypes = sensorTypes.map(type => {
            return { key: type.typeId, text: type.type }
        })
        setSensorTypeOptions(stypes);
    };

    const fetchDeviceTypes = async () => {
        const response = await fetch(url + '/Hardware/GetDeviceTypes?withDevices=false');
        const data = await response.json();
        console.log(data)
        setDeviceTypes(data);
    }
    const fetchSensorTypes = async () => {
        const response = await fetch(url + '/Hardware/GetSensorTypes');
        const data = await response.json();
        setSensorTypes(data);
    }

    useEffect(() => {
        generateTypeOptions();
    }, [deviceTypes, sensorTypes]);

    useEffect(() => {
        fetchDeviceTypes();
        fetchSensorTypes();
    }, []);

    useEffect(() => {
        setNewDevice({ ...newDevice, sensors: sensors });
    }, [sensors]);

    useEffect(() => {
        setNewDevice({ ...newDevice, board: board });
    }, [board]);


    const generateSensorFields = () => {
        // if(sensorTypes.length === 0) return;    
        const currentFields = sensorFields.length;
        setSensorFields(fields =>
            [
                <SensorForm key={currentFields} currentFields={currentFields} setSensors={setSensors} sensorTypeOptions={sensorTypeOptions} sensors={sensors} />,
                ...fields,
            ])
    }

    const removeSensorFields = () => {
        const currentFields = sensorFields.length;
        if (currentFields === 1) {
            alert("Debe agregarse al menos un sensor")
            return;
        }
        const newFields = sensorFields.slice(1, currentFields);
        const newSensors = sensors.slice(0, currentFields - 1);
        setSensors(newSensors);
        setSensorFields(newFields);
    }

    const renderSteps = () => {
        const steps = {
            1: (<>
                <p>Dispositivo</p>
                <Dropdown
                    required={true}
                    placeholder="Seleccione una opción"
                    label="Tipo de Dispositivo"
                    options={deviceTypeOptions}
                    styles={dropdownStyles}
                    onChange={(e, item) => {
                        console.log(item);
                        setNewDevice({ ...newDevice, deviceTypeId: item.key })
                    }}
                />
                <TextField label="Ubicación" placeholder='Pabellón Central' required value={newDevice.location} onChange={(e) => setNewDevice({ ...newDevice, location: e.target.value })} />
                <TextField label="Descripción" placeholder='Calentador para las habitaciones 1 al 4' value={newDevice.description} multiline rows={3} onChange={(e) => setNewDevice({ ...newDevice, description: e.target.value })} />
            </>),
            2: (<>
                <p>Sensores</p>
                <PrimaryButton className='mt-4' text="Agregar Sensor" onClick={() => generateSensorFields()} />
                <DefaultButton className='mt-4 ml-2' text="Eliminar Sensor" onClick={() => removeSensorFields()} />
                {sensorFields}
            </>
            ),
            3: (<>
                <p>Placa</p>
                <TextField label="Microcontrolador" placeholder='Arduino' required onChange={(e) => setBoard({ ...board, microcontroller: e.target.value })} />
                <TextField label="Descripcion" placeholder='Arduino UNO R3' onChange={(e) => setBoard({ ...board, description: e.target.value })} />
            </>)
        }
        return steps[step];
    }

    return (
        <Layout>
            <div className='flex flex-col h-full items-center pt-4 space-y-4'>
                <h2 className='text-2xl'>Nuevo Dispositivo</h2>
                <form onSubmit={handleSubmit}
                    className='w-1/2'>
                    {renderSteps()}
                    <div className='flex justify-start'>
                        {step < 3 && <PrimaryButton className='mt-4 mr-4' text="Siguiente" onClick={() => handleNext()} disabled={(step === 2 && sensorFields.length === 0) ? true : false} />}
                        {step === 3 && <PrimaryButton className='mt-4 mr-4' text={step == 3 ? "Agregar Dispositivo" : "Siguiente"} type="submit" />}
                        {step > 1 && <DefaultButton className='mt-4 mr-4' text="Atrás" onClick={() => setStep(step - 1)} />}
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default AgregarDispositivo;