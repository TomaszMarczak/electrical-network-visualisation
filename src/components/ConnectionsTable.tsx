import { Button, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { useProjectAssets } from "../contexts/ProjectAssetsContext";

export default function ConnectionsTable() {
  const { locations, devices, pushAlert, connections, setConnections } =
    useProjectAssets();

  const handleDelete = (connectionId: string) => {
    setConnections(
      connections.filter((connection) => connection.id !== connectionId)
    );
  };
  return (
    <>
      {devices.length > 0 ? (
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
            {connections.map((connection) => {
              const device1 = devices.find(
                (device) => device.id === connection.device1
              );
              const device2 = devices.find(
                (device) => device.id === connection.device2
              );

              return (
                <tr key={connection.id}>
                  <td>{connection.name}</td>
                  <td>{connection.cable}</td>
                  <td>{device1?.name}</td>
                  <td>{device2?.name}</td>
                  <td>{connection.length}</td>
                  <td>{connection.status}</td>
                  <td className="text-end">
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
      ) : (
        <div className="m-auto flex">
          Create your first{" "}
          {devices ? "2 devices to create a connection" : "connection"}...
        </div>
      )}
    </>
  );
}
