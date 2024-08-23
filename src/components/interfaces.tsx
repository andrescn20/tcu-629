export interface INewDevice {
  deviceTypeId: number;
  description: string;
  location: string;
  sensors: number[];
  boardId: number;
}

export interface IDevice {
  deviceId: number;
  deviceTypeId: number;
  description: string;
  location: string;
  added_at: Date;
  deviceType: string;
  sensors: ISensor[];
  board: IBoard;
}
export interface IBoard {
  boardId: number;
  microcontroller: string;
  description: string;
  isInstalled: boolean;
}

export interface ISensor {
  sensorId: number;
  sensorTypeId: number;
  description: string;
  sensorName: string;
  sensorType: string;
  isAvailable: boolean;
}

export interface IDeviceType {
  typeId: number;
  type: string;
}

export interface ISensorType {
  sensorTypeId: number;
  type: string;
}

export interface IDDOptions {
  key: number;
  text: string;
}
