import { Button, Table, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import { useProjectAssets } from "../contexts/ProjectAssetsContext";

export default function LocationsTable() {
  const { locations, setLocations, pushAlert } = useProjectAssets();

  const handleDelete = (locationId: string) => {
    setLocations(locations.filter((location) => location.id !== locationId));
  };
  return (
    <>
      {locations.length > 0 ? (
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
            {locations.map((location) => {
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
      ) : (
        <div className="m-auto">Create your first location...</div>
      )}
    </>
  );
}
