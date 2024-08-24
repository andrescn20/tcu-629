export interface INewDevice {
  deviceTypeId: number;
  description: string;
  location: string;
  sensorIds: number[];
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

export interface INewBoard {
    microcontroller: string;
    description: string;
    boardSerial: string;
  }

export interface IBoard extends INewBoard {
  boardId: number;
  isInstalled: boolean;
}

export interface INewSensor {
    sensorTypeId: number;
    description: string;
    sensorName: string;
    sensorAddress: string;
  }

export interface ISensor extends INewSensor {
  sensorId: number;
  sensorType: string;
  isAvailable: boolean;
}

export interface IDDOptions {
  key: number;
  text: string;
}

export interface IType {
    typeId: number;
    type: string;
  }