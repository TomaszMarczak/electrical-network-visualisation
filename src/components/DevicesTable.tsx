import { Button, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { useProjectAssets } from "../contexts/ProjectAssetsContext";

export default function DevicesTable() {
  const {
    devices,
    connections,
    setConnections,
    setDevices,
    locations,
    pushAlert,
  } = useProjectAssets();

  const handleDelete = (deviceId: string) => {
    setConnections(
      connections.filter(
        (connection) =>
          connection.device1 !== deviceId && connection.device2 !== deviceId
      )
    );
    setDevices(devices.filter((device) => device.id !== deviceId));
  };
  return (
    <>
      {devices.length > 0 ? (
        <Table
          hover
          size="sm"
          className="my-1"
          responsive
          style={{
            verticalAlign: "middle",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {devices.map((device) => {
              const deviceLocation = locations.find(
                (location) => location.id === device.location
              );
              return (
                <tr key={device.id}>
                  <td>{device.givenId}</td>
                  <OverlayTrigger
                    placement="auto"
                    delay={{ show: 400, hide: 100 }}
                    overlay={
                      device.details ? (
                        <Tooltip>{device.details}</Tooltip>
                      ) : (
                        <></>
                      )
                    }
                  >
                    <td>{device.name}</td>
                  </OverlayTrigger>
                  <OverlayTrigger
                    placement="top"
                    delay={{ show: 400, hide: 100 }}
                    overlay={
                      deviceLocation ? (
                        <Tooltip>{deviceLocation.area}</Tooltip>
                      ) : (
                        <></>
                      )
                    }
                  >
                    <td>
                      {deviceLocation
                        ? `${deviceLocation.area} | ${deviceLocation.name}`
                        : "Not specified"}
                    </td>
                  </OverlayTrigger>
                  <td className="text-end">
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => {
                        handleDelete(device.id);
                        pushAlert("danger", "Device deleted!");
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
        <div className="m-auto">Create your first device...</div>
      )}
    </>
  );
}
