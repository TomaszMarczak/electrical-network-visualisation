import Browser from "./components/Browser";
import GraphCanvas from "./components/GraphCanvas";
import Alerts from "./contexts/Alerts";
import { useProjectAssets } from "./contexts/ProjectAssetsContext";

function App() {
  const { devices, connections } = useProjectAssets();
  return (
    <>
      <div
        className="d-relative container d-flex flex-column mt-3"
        id="appContainer"
      >
        <Browser />
        <GraphCanvas devices={devices} connections={connections} />
      </div>
      <Alerts />
    </>
  );
}

export default App;
