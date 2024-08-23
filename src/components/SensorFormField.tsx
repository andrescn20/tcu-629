import React, { useState, useEffect } from "react";
import { ISensor } from "./Interfaces";
import { PrimaryButton } from "@fluentui/react";
import { DefaultButton } from "@fluentui/react";
import SensorDropDown from "./SensorDropDown";
import { IDDOptions } from "./Interfaces";

interface IProps {
  sensors: ISensor[];
  setSensor: (sensors: number[]) => void;
  currentSelection: number[];
}

export const SensorFormField = ({ sensors, setSensor, currentSelection }: IProps) => {
  const [selectedSensorIds, setSelectedSensorIds] = useState<number[]>([]);
  const [dropdownOptions, setDropdownOptions] = useState<IDDOptions[]>([]);
  const [sensorFields, setSensorFields] = useState<number[]>([0]);

  const generateDropdownOptions = () => {
    const options: IDDOptions[] = [];
    sensors.map((sensor: ISensor) => {
      if (!sensor.isAvailable) return;
      options.push({
        key: sensor.sensorId,
        text: `Id: ${sensor.sensorId} | Tipo: ${sensor.sensorType} | Descripción: ${sensor.description}`,
      });
    });
    setDropdownOptions(options);
  };

  const updateSelectedSensors = (index: number, selectedId: number) => {
    const newSelectedSensors = [...selectedSensorIds];
    newSelectedSensors[index] = selectedId;
    setSelectedSensorIds(newSelectedSensors);
  };

  const removeLastSensor = () => {
    const newSelectedSensors = [...selectedSensorIds];
    newSelectedSensors.pop();
    setSelectedSensorIds(newSelectedSensors);
  }

  const removeSensorField = () => {
    removeLastSensor();
    const newSensorFields = [...sensorFields];
    newSensorFields.pop();
    setSensorFields(newSensorFields);
  };
  useEffect(() => {
    generateDropdownOptions();
  }, [sensors]);

  useEffect(() => {
    setSensor(selectedSensorIds);
  }, [selectedSensorIds]);

  useEffect(() => {
    setDropdownOptions([]);
    generateDropdownOptions();
  }, [currentSelection]);

  return (
    <>
      <PrimaryButton
        className="mt-4"
        text="Agregar Sensor"
        onClick={() => setSensorFields([...sensorFields, sensorFields.length])}
      />
      <DefaultButton
        disabled={sensorFields.length <= 1}
        className="mt-4 ml-4"
        text="Eliminar Sensor"
        onClick={() => removeSensorField()}
      />
      {sensorFields.map((field, index) => {
        return (
          <>
            <p>Sensor #{field + 1}</p>
            <SensorDropDown
              key={index}
              index={index}
              updateSelectedSensors={updateSelectedSensors}
              options={dropdownOptions}
            />
          </>
        );
      })}
    </>
  );
};
export default SensorFormField;
