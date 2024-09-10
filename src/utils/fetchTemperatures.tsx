import fetchWithAuth from "./fetchWithAuth";

const url = import.meta.env.VITE_API_URL;

const fetchTemperatures = async (deviceId : string) => {
    const response = await fetchWithAuth("/SensorsData/GetTemperatureDataByDeviceId?deviceId=" + deviceId);
    const temperatures = await response.json();
    return temperatures;
  };

  export default fetchTemperatures;