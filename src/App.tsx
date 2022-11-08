import Browser from "./components/Browser";
import Alerts from "./contexts/Alerts";

function App() {
  return (
    <div className="d-relative container d-flex flex-column mt-3 ">
      <Alerts />
      <Browser />
    </div>
  );
}

export default App;
