import fetchWithAuth from "./fetchWithAuth";

const fetchTemperatures = async (deviceId : string) => {
    const response = await fetchWithAuth("/SensorsData/GetTemperatureDataByDeviceId?deviceId=" + deviceId);
    const temperatures = await response.json();
    return temperatures;
  };

  export default fetchTemperatures;