import { Button, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsPencilFill, BsTrash } from "react-icons/bs";
import { useProjectAssets } from "../../contexts/ProjectAssetsContext";
import { useState } from "react";
import EditDeviceForm from "./EditDeviceForm";
import {
  ConnectionObjectType,
  DeviceObjectType,
  LocationObjectType,
} from "../../contexts/appTypes";

type DevicesTableTypes = {
  filterValue: string;
};

export default function DevicesTable({ filterValue }: DevicesTableTypes) {
  const {
    devices,
    connections,
    setConnections,
    setDevices,
    locations,
    pushAlert,
  } = useProjectAssets();

  const [editDeviceModalShow, setEditDeviceModalShow] = useState<string>("");

  const handleDelete = (deviceId: string) => {
    setConnections(
      connections.filter(
        (connection) =>
          connection.device1 !== deviceId && connection.device2 !== deviceId
      )
    );
    setDevices(devices.filter((device) => device.id !== deviceId));
  };

  const populatedDevices = devices.map((device) => {
    const deviceLocation =
      locations.find((location) => device.location === location.id) ||
      "not specified";
    return { ...device, location: deviceLocation };
  });

  const checkObject = (
    object: DeviceObjectType | ConnectionObjectType | LocationObjectType,
    filterValue: string
  ): boolean => {
    let flag = false;
    Object.entries(object).forEach(([key, value]) => {
      if (value && typeof value === "object") {
        if (checkObject(value, filterValue) === true) flag = true;
      }
      if (
        key !== "id" && //do not search in id's
        key !== "weight" && //do not search in weights
        key !== "details" && //do not search in details
        value !== "object" && // objects are ommited
        value?.toString().toLowerCase().match(filterValue.toLowerCase()) //check if value contains filterValue
      )
        flag = true;
    });
    return flag;
  };

  const filtered = populatedDevices.filter((device) => {
    if (filterValue.length > 0) {
      return checkObject(device, filterValue);
    } else return true;
  });

  return (
    <>
      {filtered.length > 0 ? (
        <>
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
              {filtered.map((device) => {
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
                        typeof device.location === "object" ? (
                          <Tooltip>{device.location.area}</Tooltip>
                        ) : (
                          <></>
                        )
                      }
                    >
                      <td>
                        {typeof device.location === "object"
                          ? `${device.location.area} | ${device.location.name}`
                          : "Not specified"}
                      </td>
                    </OverlayTrigger>
                    <td className="text-end">
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        className="me-1"
                        onClick={() => {
                          setEditDeviceModalShow(device.id);
                        }}
                      >
                        <BsPencilFill />
                      </Button>
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
          <EditDeviceForm
            show={editDeviceModalShow ? true : false}
            hide={() => setEditDeviceModalShow("")}
            id={editDeviceModalShow}
          />
        </>
      ) : (
        <div className="m-auto">No devices to display...</div>
      )}
    </>
  );
}
