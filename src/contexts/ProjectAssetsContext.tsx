import { useContext, ReactNode, createContext, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type LocationObjectType = {
  id: string;
  name: string;
  area: string;
  details: string;
};

type ProjectAssetsContextType = {
  locations: LocationObjectType[];
  setLocations: (value: LocationObjectType[]) => void;
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
  const [locations, setLocations] = useLocalStorage<LocationObjectType[]>(
    "appLocations",
    []
  );
  //   const [devices, setDevices] = useLocalStorage("appDevices", []);

  return (
    <ProjectAssetsContext.Provider value={{ locations, setLocations }}>
      {children}
    </ProjectAssetsContext.Provider>
  );
};
