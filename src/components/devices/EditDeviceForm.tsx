import { Form, Button, Modal, InputGroup } from "react-bootstrap";
import { useRef } from "react";
import { useProjectAssets } from "../../contexts/ProjectAssetsContext";
import { v4 as uuidv4 } from "uuid";

type ModalFormTypes = {
  show: boolean;
  hide: () => void;
  id: string;
};

export default function EditDeviceForm({ show, hide, id }: ModalFormTypes) {
  const { locations, devices, setDevices, pushAlert } = useProjectAssets();
  const device = devices.find((device) => device.id === id);
  const givenIdRef = useRef<HTMLInputElement | null>(null);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const locationRef = useRef<string>("not specified");
  const detailsRef = useRef<HTMLInputElement | null>(null);
  const weightRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (device?.id && givenIdRef.current?.value && nameRef.current?.value) {
      const editedDevice = {
        id: device.id,
        givenId: givenIdRef.current.value,
        name: nameRef.current?.value,
        location: locationRef.current,
        details: detailsRef.current?.value || null,
        weight: parseInt(weightRef.current?.value || "0"),
      };
      setDevices(
        devices.map((prevDevice) => {
          if (prevDevice.id !== editedDevice.id) return prevDevice;
          else return editedDevice;
        })
      );
      pushAlert("success", `Device edited!`);
      hide();
    }
  };

  return (
    <Modal
      show={show}
      onHide={hide}
      size="lg"
      aria-labelledby="Modal Edit Device"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="Modal Add Device">Edit device</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column p-3 p-3">
          <Form
            onSubmit={handleSubmit}
            className="d-flex flex-column justify-content-between gap-2 flex-wrap align-items center gap-1"
          >
            <div className="d-flex justify-content-start gap-3 flex-wrap">
              <Form.Group>
                <Form.Label>Device ID:</Form.Label>
                <Form.Control
                  defaultValue={device?.givenId}
                  ref={givenIdRef}
                  type="text"
                  placeholder="Enter device ID..."
                  required
                />
                <Form.Text>Must be unique!</Form.Text>
              </Form.Group>
              <Form.Group className="flex-grow-1">
                <Form.Label>Device name:</Form.Label>
                <Form.Control
                  defaultValue={device?.name}
                  ref={nameRef}
                  type="text"
                  placeholder="Enter device name..."
                  required
                />
              </Form.Group>
              <Form.Group className="flex-grow-1" style={{ minWidth: "75%" }}>
                <Form.Label>Select location:</Form.Label>
                <Form.Select
                  defaultValue={device?.location || "not specified"}
                  onChange={(e) => (locationRef.current = e.target?.value)}
                  aria-label="Select area"
                  className=""
                >
                  <option value="not specified">Unspecified</option>
                  {locations
                    .sort((a, b) => a.area.localeCompare(b.area))
                    .map((location) => (
                      <option
                        key={location.id}
                        value={location.id}
                        // selected={
                        //   location.id === device?.location ? true : false
                        // }
                      >
                        {`${location.area} | ${location.name}`}
                      </option>
                    ))}
                </Form.Select>
              </Form.Group>

              <Form.Group style={{ minWidth: "50%" }}>
                <Form.Label>Additional info:</Form.Label>
                <Form.Control
                  defaultValue={device?.details || ""}
                  ref={detailsRef}
                  type="text"
                  placeholder="Enter additional info..."
                />
              </Form.Group>
              <Form.Group style={{ maxWidth: "150px" }}>
                <Form.Label>Weight:</Form.Label>
                <InputGroup>
                  <Form.Control
                    defaultValue={device?.weight}
                    ref={weightRef}
                    type="number"
                    placeholder="Enter device weight..."
                  />
                  <InputGroup.Text>kg</InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Button type="submit" className="ms-auto mt-auto">
                Edit device
              </Button>
            </div>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
