import { Form, Button, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { useState } from "react";
import DeviceForm from "./DeviceForm";
import LocationForm from "./LocationForm";
import { BsTrash } from "react-icons/bs";
import { useProjectAssets } from "../contexts/ProjectAssetsContext";

export default function Browser() {
  const [addDeviceModalShow, setAddDeviceModalShow] = useState<boolean>(false);
  const [addLocationModalShow, setAddLocationModalShow] =
    useState<boolean>(false);

  const { locations, setLocations } = useProjectAssets();

  const handleDelete = (locationId: string) => {
    setLocations(locations.filter((location) => location.id !== locationId));
  };
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
        <div className="flex-grow-1 d-flex flex-column rounded border p-2 my-2">
          <div className="d-flex justify-content-between">
            <div className="p-1 me-auto text-">Locations</div>
            <Button size="sm" onClick={() => setAddLocationModalShow(true)}>
              Create location
            </Button>
          </div>
          {locations.length > 0 ? (
            <Table
              hover
              size="sm"
              className="my-1"
              style={{ verticalAlign: "middle" }}
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Area</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {locations.map((location) => {
                  return (
                    <tr key={location.id}>
                      <OverlayTrigger
                        placement="left"
                        delay={{ show: 250, hide: 100 }}
                        overlay={<Tooltip>{location.details}</Tooltip>}
                      >
                        <td>{location.name}</td>
                      </OverlayTrigger>
                      <td>{location.area}</td>
                      <td className="text-end">
                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleDelete(location.id)}
                        >
                          <BsTrash />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          ) : (
            <div className="m-auto">Create your first location...</div>
          )}
        </div>
        <div className="flex-grow-1 d-flex flex-column rounded border p-2 my-2">
          <div className="d-flex justify-content-between">
            <div className="p-1 me-auto">Devices</div>
            <Button size="sm" onClick={() => setAddDeviceModalShow(true)}>
              Add device
            </Button>
          </div>
          <Table
            hover
            size="sm"
            className="my-1"
            style={{ verticalAlign: "middle" }}
          >
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>A00001</td>
                <td>Rozdzielnica główna</td>
                <td>Maszynownia</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
      <div className="flex-grow-1 rounded border p-2 my-2">
        <div className="d-flex justify-content-between">
          <div className="p-1 me-auto">Connections</div>
          <Button size="sm">Add connection</Button>
        </div>
        <Table
          hover
          size="sm"
          className="my-1"
          style={{ verticalAlign: "middle" }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Cable type</th>
              <th>Device 1</th>
              <th>Device 2</th>
              <th>Length</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>A00001</td>
              <td>Rozdzielnica główna</td>
              <td>Maszynownia</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <DeviceForm
        show={addDeviceModalShow}
        hide={() => setAddDeviceModalShow(false)}
      />
      <LocationForm
        show={addLocationModalShow}
        hide={() => setAddLocationModalShow(false)}
      />
    </div>
  );
}
