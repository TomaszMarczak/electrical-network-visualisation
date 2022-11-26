import { useState } from "react";
import Browser from "./components/Browser";
import GraphCanvas from "./components/GraphCanvas";
import Alerts from "./contexts/Alerts";
import { useProjectAssets } from "./contexts/ProjectAssetsContext";

function App() {
  const [showVisualisation, setShowVisualisation] = useState(false);
  const { devices, connections } = useProjectAssets();
  return (
    <>
      {showVisualisation && (
        <GraphCanvas
          devices={devices}
          connections={connections}
          handleShow={() => setShowVisualisation(!showVisualisation)}
        />
      )}
      {!showVisualisation && (
        <div
          className="d-relative container d-flex flex-column mt-3"
          id="appContainer"
        >
          <Browser
            handleShow={() => setShowVisualisation(!showVisualisation)}
          />
        </div>
      )}
      <Alerts />
    </>
  );
}

export default App;
