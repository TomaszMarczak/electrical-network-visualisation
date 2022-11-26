import { Form, Button, Table } from "react-bootstrap";
import { useState } from "react";
import DeviceForm from "./devices/DeviceForm";
import LocationForm from "./locations/LocationForm";
import ConnectionForm from "./connections/ConnectionForm";
import LocationsTable from "./locations/LocationsTable";
import DevicesTable from "./devices/DevicesTable";
import ConnectionsTable from "./connections/ConnectionsTable";
import { useProjectAssets } from "../contexts/ProjectAssetsContext";

type BrowserTypes = {
  handleShow: () => void;
};
export default function Browser({ handleShow }: BrowserTypes) {
  const [addDeviceModalShow, setAddDeviceModalShow] = useState<boolean>(false);
  const [addLocationModalShow, setAddLocationModalShow] =
    useState<boolean>(false);
  const [addConnectionModalShow, setAddConnectionModalShow] =
    useState<boolean>(false);
  const [filterValue, setFilterValue] = useState<string>("");

  const {
    locations,
    devices,
    addRandomLocation,
    addRandomDevice,
    addRandomConnection,
  } = useProjectAssets();

  return (
    <div className="py-3 px-5">
      <div className="d-flex mb-2 align-items-center">
        <h3 className="text-primary">Browse data</h3>
        <Button variant="outline-primary" className="ms-3" onClick={handleShow}>
          Visualise
        </Button>
      </div>
      <Form>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Search by name, ID, location, etc..."
            value={filterValue}
            onChange={(e) => setFilterValue(e.target.value)}
          />
        </Form.Group>
      </Form>
      <div className="d-flex justify-content-between gap-2 flex-wrap">
        <div
          className="flex-grow-1 d-flex flex-column rounded border p-2 my-2"
          style={{
            minHeight: "10rem",
            maxHeight: "20rem",
            overflow: "auto",
          }}
        >
          <div className="d-flex justify-content-between">
            <div className="p-1 me-auto">Locations</div>
            <Button size="sm" onClick={() => setAddLocationModalShow(true)}>
              Create location
            </Button>
            <Button
              className="ms-1"
              size="sm"
              onClick={addRandomLocation}
              variant="outline-secondary"
            >
              Random
            </Button>
          </div>
          <LocationsTable filterValue={filterValue} />
        </div>
        <div
          className="flex-grow-1 d-flex flex-column rounded border p-2 my-2 "
          style={{
            minHeight: "10rem",
            maxHeight: "20rem",
            overflow: "auto",
          }}
        >
          <div className="d-flex justify-content-between">
            <div className="p-1 me-auto">Devices</div>
            <Button size="sm" onClick={() => setAddDeviceModalShow(true)}>
              Add device
            </Button>
            <Button
              className="ms-1"
              size="sm"
              onClick={addRandomDevice}
              variant="outline-secondary"
            >
              Random
            </Button>
          </div>
          <DevicesTable filterValue={filterValue} />
        </div>
      </div>
      <div
        className={`flex-grow-1 d-flex flex-column rounded border p-2 my-2 ${
          devices.length < 1 ? "text-muted bg-light" : ""
        }`}
        style={{
          minHeight: "10rem",
          maxHeight: "20rem",
          overflow: "auto",
        }}
      >
        <div className="d-flex justify-content-between">
          <div className="p-1 me-auto">Connections</div>
          <Button
            size="sm"
            disabled={devices.length < 1}
            onClick={() => setAddConnectionModalShow(true)}
          >
            Add connection
          </Button>
          <Button
            className="ms-1"
            size="sm"
            disabled={devices.length < 1}
            onClick={addRandomConnection}
            variant="outline-secondary"
          >
            Random
          </Button>
        </div>
        <ConnectionsTable filterValue={filterValue} />
      </div>
      <DeviceForm
        show={addDeviceModalShow}
        hide={() => setAddDeviceModalShow(false)}
      />
      <LocationForm
        show={addLocationModalShow}
        hide={() => setAddLocationModalShow(false)}
      />
      <ConnectionForm
        show={addConnectionModalShow}
        hide={() => setAddConnectionModalShow(false)}
      />
    </div>
  );
}
