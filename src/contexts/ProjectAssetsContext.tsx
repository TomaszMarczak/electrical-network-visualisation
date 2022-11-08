import { useContext, ReactNode, createContext, useState, useRef } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  DeviceObjectType,
  LocationObjectType,
  AlertObjectType,
  ConnectionObjectType,
} from "./appTypes";

type ProjectAssetsContextType = {
  locations: LocationObjectType[];
  setLocations: (value: LocationObjectType[]) => void;
  devices: DeviceObjectType[];
  setDevices: (value: DeviceObjectType[]) => void;
  alerts: AlertObjectType[];
  pushAlert: (variant: string, message: string) => void;
  connections: ConnectionObjectType[];
  setConnections: (value: ConnectionObjectType[]) => void;
};

const ProjectAssetsContext = createContext({} as ProjectAssetsContextType);

export function useProjectAssets() {
  return useContext(ProjectAssetsContext);
}

export const ProjectAssetsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [alerts, setAlerts] = useState<AlertObjectType[]>([]);
  const alertsRef = useRef<AlertObjectType[]>([]);
  const [locations, setLocations] = useLocalStorage<LocationObjectType[]>(
    "appLocations",
    []
  );
  const [devices, setDevices] = useLocalStorage<DeviceObjectType[]>(
    "appDevices",
    []
  );
  const [connections, setConnections] = useLocalStorage<ConnectionObjectType[]>(
    "appConnections",
    []
  );

  const popAlert = () => {
    clearTimeout(alertsRef.current[0].timeoutId);
    alertsRef.current = alertsRef.current.splice(1);
    setAlerts(() => alertsRef.current);
    if (alertsRef.current.length === 0) setAlerts(() => []);
  };

  const pushAlert = (variant: string, message: string) => {
    const timeoutId = setTimeout(popAlert, 3000);
    const newAlert = { variant, message, timeoutId };
    alertsRef.current.push(newAlert);
    setAlerts(() => [...alerts, newAlert]);
  };

  return (
    <ProjectAssetsContext.Provider
      value={{
        locations,
        setLocations,
        devices,
        setDevices,
        alerts,
        pushAlert,
        connections,
        setConnections,
      }}
    >
      {children}
    </ProjectAssetsContext.Provider>
  );
};
