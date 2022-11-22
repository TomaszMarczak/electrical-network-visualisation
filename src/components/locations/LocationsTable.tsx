import { Button, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsPencilFill, BsTrash } from "react-icons/bs";
import { useProjectAssets } from "../../contexts/ProjectAssetsContext";
import { useState } from "react";
import EditLocationForm from "./EditLocationForm";

type LocationsTableType = {
  filterValue: string;
};
export default function LocationsTable({ filterValue }: LocationsTableType) {
  const { locations, setLocations, pushAlert } = useProjectAssets();
  const [editLocationModalShow, setEditLocationModalShow] =
    useState<string>("");

  const handleDelete = (locationId: string) => {
    setLocations(locations.filter((location) => location.id !== locationId));
  };

  const filtered = locations.filter((location) => {
    if (filterValue.length > 0) {
      let flag = false;
      Object.entries(location).forEach(([key, value]) => {
        if (
          key !== "id" && //do not search in id's
          value?.toString().toLowerCase().match(filterValue.toLowerCase()) //check if value contains filterValue
        )
          flag = true;
      });
      return flag;
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
                <th>Name</th>
                <th>Area</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((location) => {
                return (
                  <tr key={location.id}>
                    <OverlayTrigger
                      placement="left"
                      delay={{ show: 400, hide: 100 }}
                      overlay={
                        location.details ? (
                          <Tooltip>{location.details}</Tooltip>
                        ) : (
                          <></>
                        )
                      }
                    >
                      <td>{location.name}</td>
                    </OverlayTrigger>
                    <td>{location.area}</td>
                    <td className="text-end">
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        className="me-1"
                        onClick={() => {
                          setEditLocationModalShow(location.id);
                        }}
                      >
                        <BsPencilFill />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => {
                          handleDelete(location.id);
                          pushAlert("danger", "Location deleted!");
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
          <EditLocationForm
            show={editLocationModalShow ? true : false}
            hide={() => setEditLocationModalShow("")}
            id={editLocationModalShow}
          />
        </>
      ) : (
        <div className="m-auto">No locations to display...</div>
      )}
    </>
  );
}
