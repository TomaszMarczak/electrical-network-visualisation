import Browser from "./components/Browser";
import GraphCanvas from "./components/GraphCanvas";
import Alerts from "./contexts/Alerts";

function App() {
  return (
    <div
      className="d-relative container d-flex flex-column mt-3"
      id="appContainer"
    >
      <Alerts />
      <Browser />
      <GraphCanvas />
    </div>
  );
}

export default App;
