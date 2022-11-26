import { Alert } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import { useProjectAssets } from "./ProjectAssetsContext";
import { useRef } from "react";

export default function Alerts() {
  const { alerts } = useProjectAssets();

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1rem",
        right: "1rem",
        width: "fit-content",
        opacity: "80%",
      }}
    >
      {alerts &&
        alerts.map((alert) => (
          <Alert className="d-relative" variant={alert.variant} key={uuidv4()}>
            {alert.message}
          </Alert>
        ))}
    </div>
  );
}
