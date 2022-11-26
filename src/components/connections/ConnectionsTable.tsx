import { Button, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsPencilFill, BsTrash } from "react-icons/bs";
import { useProjectAssets } from "../../contexts/ProjectAssetsContext";
import { useState } from "react";
import EditConnectionForm from "./EditConnectionForm";
import { checkObject } from "../../utils/helperFunctions";

type ConnectionsTableTypes = {
  filterValue: string;
};
export default function ConnectionsTable({
  filterValue,
}: ConnectionsTableTypes) {
  const { locations, devices, pushAlert, connections, setConnections } =
    useProjectAssets();
  const [editConnectionModalShow, setEditConnectionModalShow] =
    useState<string>("");

  const handleDelete = (connectionId: string) => {
    setConnections(
      connections.filter((connection) => connection.id !== connectionId)
    );
  };

  const populatedConnections = connections.map((connection) => {
    let device1 = JSON.parse(
      JSON.stringify(devices.find((device) => device.id == connection.device1)) // creating deep copy of device1
    );
    let device2 = JSON.parse(
      JSON.stringify(devices.find((device) => device.id == connection.device2)) // creating deep copy of device2
    );
    let device1Location =
      locations.find((location) => device1!.location === location.id) ||
      "not specified";
    let device2Location =
      locations.find((location) => device2!.location === location.id) ||
      "not specified";
    device1.location = device1Location;
    device2.location = device2Location;
    return { ...connection, device1, device2 };
  });

  const filtered = populatedConnections.filter((connection) => {
    if (filterValue.length > 0) {
      return checkObject(connection, filterValue);
    } else return true;
  });

  return (
    <>
      {filtered.length > 0 ? (
        <>
          <Table
            responsive
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
              {filtered.map((connection) => {
                let status;
                switch (connection.status) {
                  case "not ready":
                    status = "Not ready";
                    break;
                  case "prepared":
                    status = "Prepared";
                    break;
                  case "laid":
                    status = "Laid";
                    break;
                  case "ready":
                    status = "Ready";
                    break;
                  default:
                    status = "Not ready";
                }
                return (
                  <tr key={connection.id}>
                    <td>{connection.name}</td>
                    <td>{connection.cable}</td>
                    <td>{connection.device1?.name}</td>
                    <td>{connection.device2?.name}</td>
                    <td>{connection.length}</td>
                    <td>{status}</td>
                    <td className="text-end">
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        className="me-1"
                        onClick={() => {
                          setEditConnectionModalShow(connection.id);
                        }}
                      >
                        <BsPencilFill />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => {
                          handleDelete(connection.id);
                          pushAlert("danger", "Connection deleted!");
                        }}
                      >
                        <BsTrash />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <EditConnectionForm
            show={editConnectionModalShow ? true : false}
            hide={() => setEditConnectionModalShow("")}
            id={editConnectionModalShow}
          />
        </>
      ) : (
        <div className="m-auto flex">No connections to display...</div>
      )}
    </>
  );
}
