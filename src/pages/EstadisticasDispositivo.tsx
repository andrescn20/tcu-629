import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import Layout from "../components/Layout";
import { IDeviceStats, ITemperatureData } from "../utils/Interfaces";
import { useSearchParams } from "react-router-dom";
import fetchTemperatures from "../utils/fetchTemperatures";
import { DatePicker, DetailsList, PrimaryButton } from "@fluentui/react";
import fetchWithAuth from "../utils/fetchWithAuth";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import formatDateToLocalTime from "../utils/formatDate";

initializeIcons();

const EstadisticasDispositivo = () => {
  const [queryParameters] = useSearchParams();
  const deviceId = queryParameters.get("deviceId");
  const location = queryParameters.get("location");
  const description = queryParameters.get("description");
  const deviceType = queryParameters.get("deviceType");

  const [temperatures, setTemperatures] = useState<ITemperatureData[]>([]);
  const [stats, setStats] = useState<IDeviceStats>();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [filteredTemperatures, setFilteredTemperatures] = useState<ITemperatureData[]>([]);
  const [minDate, setMinDate] = useState<Date>();
  const [maxDate, setMaxDate] = useState<Date>();

  // Generate vertical axis data (temperature)
  const generateVerticalAxisData = (temperatures: ITemperatureData[]) => {
    return temperatures.map((temperature) => temperature.temperature);
  };

  // Generate horizontal axis data (timestamp)
  const generateHorizontalAxisData = (temperatures: ITemperatureData[]) => {
    return temperatures.map((temperature) => {
      let formattedDate = formatDateToLocalTime(temperature.timestamp);
      return formattedDate;
    });
  };

  const tooltipFormatter = (params: any) => {
    const temperatureData = params[0]; // Access the data point
    const date = temperatureData.axisValue;
    return `Hora: ${date}<br/>Temperature: ${temperatureData.data}°C`;
  };

  // Chart options
  const options = {
    xAxis: {
      type: "category",
      data: generateHorizontalAxisData(filteredTemperatures),
    },
    title: {
      text: "Temperaturas",
      left: "left",
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: generateVerticalAxisData(filteredTemperatures),
        type: "line",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      formatter: tooltipFormatter, // Custom tooltip formatter
    },
  };

  // Fetch temperatures when component mounts
  useEffect(() => {
    const fetchData = async () => {
      const temperatures = await fetchTemperatures(deviceId ?? "");
      setTemperatures(temperatures);
      console.log(temperatures);
      setFilteredTemperatures(temperatures);
      const statsRequest = await fetchWithAuth(`/Device/GetDeviceStats?deviceId=${deviceId}`);
      const stats = await statsRequest.json();
      console.log(stats);
      setStats(stats);
    };
    fetchData();
  }, [deviceId]);

  useEffect(() => {
    if (temperatures.length === 0) return;
    const minDate = new Date(temperatures[0].timestamp);
    const maxDate = new Date(temperatures[temperatures.length - 1].timestamp);
    console.log(minDate, maxDate);
    setMinDate(minDate);
    setMaxDate(maxDate);
    setStartDate(minDate);
    setEndDate(maxDate);
  }, [temperatures]);

  useEffect(() => {
    filterTemperatures();
  }, [startDate, endDate]);

  // Filter the temperatures by date range
  const filterTemperatures = () => {
    if (startDate && endDate) {
      const filtered = temperatures.filter((temperature) => {
        const timestamp = new Date(temperature.timestamp);
        return timestamp >= startDate && timestamp <= endDate;
      });
      const formatedFiltered = filtered.map((temperature) => {
        return {
          ...temperature,
          timestamp: formatDateToLocalTime(temperature.timestamp),
        };
      });

      setFilteredTemperatures(formatedFiltered);
    } else {
      const formatedTemperatures = temperatures.map((temperature) => {
        return {
          ...temperature,
          timestamp: formatDateToLocalTime(temperature.timestamp),
        };
      });
      setFilteredTemperatures(formatedTemperatures); // No filtering if dates are missing
    }
  };

  const generateTableData = (temperatures: ITemperatureData[]) => {
    return temperatures.map((temperature) => {
      return {
        key: temperature.id,
        timestamp: new Date(temperature.timestamp)
          .toLocaleString("es-ES", {
            weekday: "short", // Optional: 'long' for full day names
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })
          .replace(/(^\w{1})|(\s\w{1})/g, (match) => match.toUpperCase())
          .replace(/De/g, "de"),
        temperature: temperature.temperature,
      };
    });
  };

  const columns = [
    { key: "column1", name: "Fecha", fieldName: "timestamp", minWidth: 200, maxWidth: 500, isResizable: true },
    { key: "column2", name: "Temperatura", fieldName: "temperature", minWidth: 100, maxWidth: 200, isResizable: true },
  ];

  return (
    <Layout>
      <div className="grid grid-cols-12 items-center gap-4 mx-12 my-12">
        <div className="col-span-12 flex justify-between">
          <h1 className="text-2xl font-bold ">Estadísticas del Dispositivo</h1>
          <h2 className="text-lg text-end px-4 py-2 rounded-md bg-slate-200 p-1">
            <strong>Descripción: </strong>
            {description}
            <br></br>
            <strong>Ubicación: </strong> {location} <br></br> <strong>Tipo:</strong> {deviceType}
          </h2>
        </div>
        <div className="col-span-12 mx-6 row-start-2">
          <ReactECharts option={options} />
        </div>
        <div className="col-span-4 col-start-3 row-start-3">
          <DatePicker
            label="Inicio"
            value={startDate}
            minDate={minDate}
            maxDate={endDate}
            onSelectDate={setStartDate}
            placeholder="Seleccione fecha inicial..."
          />
        </div>
        <div className="col-span-4 row-start-3">
          <DatePicker
            label="Fin"
            value={endDate}
            minDate={startDate}
            maxDate={maxDate}
            onSelectDate={setEndDate}
            placeholder="Seleccione fecha final..."
          />
        </div>
        <div className="col-span-6 col-start-3 row-start-4">
          <DetailsList items={generateTableData(filteredTemperatures)} columns={columns} />
        </div>
      </div>
    </Layout>
  );
};

export default EstadisticasDispositivo;
