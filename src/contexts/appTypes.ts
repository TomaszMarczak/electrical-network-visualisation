export type LocationObjectType = {
  id: string;
  name: string;
  area: string;
  details: string | null;
};
export type DeviceObjectType = {
  id: string;
  givenId: string;
  name: string;
  location: string | LocationObjectType;
  details: string | null;
  weight: number;
};
export type ConnectionObjectType = {
  id: string;
  name: string;
  cable: string;
  device1: string | DeviceObjectType;
  device2: string | DeviceObjectType;
  status: string;
  length: number;
};
export type AlertObjectType = {
  variant: string;
  message: string;
  timeoutId: NodeJS.Timer;
};
