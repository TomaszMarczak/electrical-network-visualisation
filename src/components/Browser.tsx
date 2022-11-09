import { Form, Button, Table } from "react-bootstrap";
import { useState } from "react";
import DeviceForm from "./DeviceForm";
import LocationForm from "./LocationForm";
import ConnectionForm from "./ConnectionForm";
import LocationsTable from "./LocationsTable";
import DevicesTable from "./DevicesTable";
import ConnectionsTable from "./ConnectionsTable";
import { useProjectAssets } from "../contexts/ProjectAssetsContext";

export default function Browser() {
  const [addDeviceModalShow, setAddDeviceModalShow] = useState<boolean>(false);
  const [addLocationModalShow, setAddLocationModalShow] =
    useState<boolean>(false);
  const [addConnectionModalShow, setAddConnectionModalShow] =
    useState<boolean>(false);

  const { locations, devices } = useProjectAssets();

  return (
    <div className="py-3 px-5">
      <h3 className="text-primary">Browse data</h3>
      <Form>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Search by name, ID, location, etc..."
          />
        </Form.Group>
      </Form>
      <div className="d-flex justify-content-between gap-2 flex-wrap">
        <div
          className="flex-grow-1 d-flex flex-column rounded border p-2 my-2"
          style={{ minHeight: "10rem" }}
        >
          <div className="d-flex justify-content-between">
            <div className="p-1 me-auto text-">Locations</div>
            <Button size="sm" onClick={() => setAddLocationModalShow(true)}>
              Create location
            </Button>
          </div>
          <LocationsTable />
        </div>
        <div className="flex-grow-1 d-flex flex-column rounded border p-2 my-2 ">
          <div className="d-flex justify-content-between">
            <div className="p-1 me-auto">Devices</div>
            <Button size="sm" onClick={() => setAddDeviceModalShow(true)}>
              Add device
            </Button>
          </div>
          <DevicesTable />
        </div>
      </div>
      <div
        className={`flex-grow-1 d-flex flex-column rounded border p-2 my-2 ${
          devices.length < 1 ? "text-muted bg-light" : ""
        }`}
        style={{ minHeight: "10rem" }}
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
        </div>
        <ConnectionsTable />
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
