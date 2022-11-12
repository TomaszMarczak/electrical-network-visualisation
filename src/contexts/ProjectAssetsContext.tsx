import React, {
  useContext,
  ReactNode,
  createContext,
  useState,
  useRef,
} from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  DeviceObjectType,
  LocationObjectType,
  AlertObjectType,
  ConnectionObjectType,
} from "./appTypes";
import { v4 as uuidv4 } from "uuid";

type ProjectAssetsContextType = {
  locations: LocationObjectType[];
  setLocations: (value: LocationObjectType[]) => void;
  devices: DeviceObjectType[];
  setDevices: (value: DeviceObjectType[]) => void;
  alerts: AlertObjectType[];
  pushAlert: (variant: string, message: string) => void;
  connections: ConnectionObjectType[];
  setConnections: (value: ConnectionObjectType[]) => void;
  addRandomLocation: () => void;
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

  const addRandomLocation = () => {
    const newLocation = {
      id: uuidv4(),
      name: `Room ${Math.floor(Math.random() * (200 - 1 + 1) + 1)}`,
      area: `Floor ${Math.floor(Math.random() * (6 + 2 + 1) - 2)}`,
      details: null,
    };
    setLocations([...locations, newLocation]);
    pushAlert("success", `New location created!`);
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
        addRandomLocation,
      }}
    >
      {children}
    </ProjectAssetsContext.Provider>
  );
};
