import { Form, Button, Modal } from "react-bootstrap";
import { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { useProjectAssets } from "../../contexts/ProjectAssetsContext";

type EditModalFormTypes = {
  show: boolean;
  hide: () => void;
  id: string;
};

export default function EditLocationForm({
  show,
  hide,
  id,
}: EditModalFormTypes) {
  const { locations, setLocations, pushAlert } = useProjectAssets();
  const location = locations.find((location) => location.id === id);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const areaRef = useRef<HTMLInputElement | null>(null);
  const detailsRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (location?.id && nameRef.current?.value && areaRef.current?.value) {
      const editedLocation = {
        id: location.id,
        name: nameRef.current.value,
        area: areaRef.current.value,
        details: detailsRef.current?.value || null,
      };
      setLocations(
        locations.map((prevLocation) => {
          if (prevLocation.id !== editedLocation.id) return prevLocation;
          else return editedLocation;
        })
      );

      pushAlert("success", `Location edited!`);
      hide();
    }
  };

  return (
    <Modal
      show={show}
      onHide={hide}
      size="lg"
      aria-labelledby="Modal Edit Location"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="Modal Add Device">Edit location</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column p-3 p-3">
          <Form
            onSubmit={handleSubmit}
            className="d-flex flex-column justify-content-between gap-2 flex-wrap align-items center gap-1"
          >
            <div className="d-flex justify-content-start gap-3 flex-wrap">
              <Form.Group className="flex-grow-1">
                <Form.Label>Location name:</Form.Label>
                <Form.Control
                  defaultValue={location?.name}
                  ref={nameRef}
                  type="text"
                  placeholder="Enter location name..."
                />
              </Form.Group>
              <Form.Group className="flex-grow-1">
                <Form.Label>Area name:</Form.Label>
                <Form.Control
                  defaultValue={location?.area}
                  ref={areaRef}
                  type="text"
                  placeholder="Floor, deck, zone, etc..."
                />
              </Form.Group>
              <Form.Group className="w-75">
                <Form.Label>Details:</Form.Label>
                <Form.Control
                  defaultValue={location?.details || ""}
                  ref={detailsRef}
                  type="text"
                  placeholder="More details about your location..."
                />
              </Form.Group>

              <Button type="submit" className="ms-auto mt-auto">
                Edit location
              </Button>
            </div>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
