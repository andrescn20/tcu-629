export interface IDevice {
    deviceId: number;
    deviceTypeId: number;
    description: string;
    location: string;
    added_at: Date;
    deviceType: string;
}

export interface IDeviceType {
    typeId: number;
    type: string;
}

export interface ISensorType {
    sensorTypeId: number;
    type: string;
}