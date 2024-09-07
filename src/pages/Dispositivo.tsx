import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import Layout from "../components/Layout";
import Device from "../components/Device";
import { IDevice } from "../utils/Interfaces";
import { useSearchParams } from "react-router-dom";
import fetchWithAuth from "../utils/fetchWithAuth";

const Dispositivo = () => {
  const [queryParameters] = useSearchParams();
  const deviceId = queryParameters.get("deviceId");

  const [temperatures, setTemperatures] = useState<ITemperatureData[]>([]);

  const url = import.meta.env.VITE_API_URL;

  const fetchTemperatures = async () => {
    const response = await fetchWithAuth(url + "/SensorsData/GetTemperatureDataByDeviceId?deviceId=" + deviceId);
    const temperatures = await response.json();
    console.log(temperatures);
    setTemperatures(temperatures);
  };

  const generateVerticalAxisData = (temperatures: ITemperatureData[]) => {
    return temperatures.map((temperature) => temperature.temperature);
  };

  const generateHorizontalAxisData = (temperatures: ITemperatureData[]) => {
    return temperatures.map((temperature) => new Date(temperature.timestamp).toLocaleTimeString());
  };

  const options = {
    xAxis: {
      type: "category",
      data: generateHorizontalAxisData(temperatures),
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
        data: generateVerticalAxisData(temperatures),
        type: "line",
        smooth: true,
      },
    ],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
  };

  useEffect(() => {
    fetchTemperatures();
  }, []);

  return (
    <Layout>
      <div className="grid grid-cols-12 items-center">
        <div className="col-span-8 col-start-3">
          <ReactECharts option={options} />
        </div>
      </div>
    </Layout>
  );
};

export default Dispositivo;
