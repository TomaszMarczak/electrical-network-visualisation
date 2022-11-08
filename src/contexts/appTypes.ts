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
  location: string;
  details: string | null;
  weight: number;
};
export type AlertObjectType = {
  variant: string;
  message: string;
  timeoutId: NodeJS.Timer;
};
