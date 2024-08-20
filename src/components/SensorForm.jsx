import React, { useEffect, useState } from "react";
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { TextField } from '@fluentui/react/lib/TextField';

const SensorForm = ({currentFields, sensors, setSensors, sensorTypeOptions}) => {

    const dropdownStyles = {
        dropdown: { width: 300 },
    };


    const [sensor, setSensor] = useState({});

    useEffect(() => {
        console.log(sensors)
        if (sensors[currentFields]) {
            setSensor(sensors[currentFields]);
        }
        if(sensors.length === 0) { 
            setSensors([sensor]);
            return;
        }
        const newSensors = [...sensors] 
        newSensors[currentFields] = sensor;
        console.log("New List", newSensors);
        setSensors( newSensors);
    }, [sensor]);

    useEffect(() => {
       if (sensors[currentFields]) {
           setSensor(sensors[currentFields]);
       }}, []);
       
    return (
        <>
            <p className='font-bold mt-4'>Sensor #{currentFields + 1}</p>
            <Dropdown
                required={true}
                placeholder="Seleccione una opción"
                value={sensor.sensorTypeId}
                label="Tipo de Sensor"
                options={sensorTypeOptions}
                styles={dropdownStyles}
                onChange={(e, item) => { setSensor({ ...sensor, sensorTypeId: item.key }) }}
            />
            <TextField label="Nombre" required value={sensor.sensorName}
            onChange={(e) => {
                setSensor({ ...sensor, sensorName: e.target.value })
            }} />
            <TextField label="Descripción" value={sensor.description} onChange={(e) => setSensor({...sensor, description: e.target.value}) } />
            
        </>
    );

}
export default SensorForm;