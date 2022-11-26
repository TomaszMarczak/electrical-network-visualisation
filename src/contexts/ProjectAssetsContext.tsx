import { useContext, ReactNode, createContext, useState, useRef } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import {
  DeviceObjectType,
  LocationObjectType,
  AlertObjectType,
  ConnectionObjectType,
} from "./Types";
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
  addRandomDevice: () => void;
  addRandomConnection: () => void;
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

  function createId(length: number) {
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const addRandomLocation = () => {
    const newLocation = {
      id: uuidv4(),
      name: `Room ${Math.floor(Math.random() * 200 + 1)}`,
      area: `Floor ${Math.floor(Math.random() * (6 + 2 + 1) - 2)}`,
      details: null,
    };
    setLocations([...locations, newLocation]);
    pushAlert("success", `New location created!`);
  };
  const addRandomDevice = () => {
    const newDevice = {
      id: uuidv4(),
      givenId: createId(4),
      name: `Device ${Math.floor(Math.random() * (20 - 1 + 1) + 1)}`,
      location: locations[Math.floor(Math.random() * locations.length)].id,
      details: null,
      weight: Math.floor(Math.random() * 400 + 1),
    };

    setDevices([...devices, newDevice]);
    pushAlert("success", `New device created!`);
  };
  const addRandomConnection = () => {
    if (devices.length > 1) {
      const cablePairs = ["2", "3", "4", "5", "6"];
      const cablePairs2 = [null, "2"];
      const cableDiameters = [
        "0,5",
        "0,75",
        "1,5",
        "2,5",
        "4",
        "6",
        "10",
        "16",
        "25",
      ];
      const cablePair =
        cablePairs[Math.floor(Math.random() * cablePairs.length)];
      const cablePair2 =
        cablePairs2[Math.floor(Math.random() * cablePairs2.length)];
      const cableDiameter =
        cableDiameters[Math.floor(Math.random() * cableDiameters.length)];
      let device1, device2;
      device1 = devices[Math.floor(Math.random() * devices.length)].id;
      do device2 = devices[Math.floor(Math.random() * devices.length)].id;
      while (device2 === device1);

      const newConnection = {
        id: uuidv4(),
        name: createId(4),
        cable: `${cablePair}x${
          cablePair2 ? cablePair + "x" : ""
        }${cableDiameter}`,
        device1,
        device2,
        length: Math.floor(Math.random() * (100 - 2 + 1) + 1),
        status: "not ready",
      };
      setConnections([...connections, newConnection]);
      pushAlert("success", `New connection created!`);
    } else pushAlert("warning", "Create more devices!");
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
        addRandomDevice,
        addRandomConnection,
      }}
    >
      {children}
    </ProjectAssetsContext.Provider>
  );
};
