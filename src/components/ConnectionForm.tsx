import { Form, Button, Modal, InputGroup } from "react-bootstrap";
import { useRef } from "react";
import { useProjectAssets } from "../contexts/ProjectAssetsContext";
import { v4 as uuidv4 } from "uuid";

type ModalFormTypes = {
  show: boolean;
  hide: () => void;
};

export default function ConnectionForm({ show, hide }: ModalFormTypes) {
  const nameRef = useRef<HTMLInputElement | null>(null);
  const cableRef = useRef<HTMLInputElement | null>(null);
  const device1Ref = useRef<string | null>(null);
  const device2Ref = useRef<string | null>(null);
  const lengthRef = useRef<HTMLInputElement | null>(null);
  const statusRef = useRef<string>("not ready");
  const { locations, devices, setConnections, connections, pushAlert } =
    useProjectAssets();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      nameRef.current?.value &&
      cableRef.current?.value &&
      device1Ref.current &&
      device2Ref.current &&
      lengthRef.current?.value &&
      statusRef.current
    ) {
      const newConnection = {
        id: uuidv4(),
        name: nameRef.current.value,
        cable: cableRef.current.value,
        device1: device1Ref.current,
        device2: device2Ref.current,
        length: parseInt(lengthRef.current.value),
        status: statusRef.current,
      };
      setConnections([...connections, newConnection]);
      pushAlert("success", `New connection created!`);
      hide();
    }
  };

  return (
    <Modal
      show={show}
      onHide={hide}
      size="lg"
      aria-labelledby="Modal Add Device"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="Modal Add Device">Add device</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex flex-column p-3 p-3">
          <Form
            onSubmit={handleSubmit}
            className="d-flex flex-column justify-content-between gap-2 flex-wrap align-items center gap-1"
          >
            <div className="d-flex justify-content-start gap-3 flex-wrap">
              <Form.Group>
                <Form.Label>Connection name:</Form.Label>
                <Form.Control
                  ref={nameRef}
                  type="text"
                  placeholder="Enter connection name..."
                />
              </Form.Group>
              <Form.Group className="flex-grow-1">
                <Form.Label>Cable:</Form.Label>
                <Form.Control
                  ref={cableRef}
                  type="text"
                  placeholder="Enter cable type..."
                />
              </Form.Group>
              <Form.Group className="flex-grow-1" style={{ minWidth: "75%" }}>
                <Form.Label>Select device:</Form.Label>
                <Form.Select
                  onChange={(e) => (device1Ref.current = e.target?.value)}
                  aria-label="Select first device"
                  className=""
                >
                  <option value="" hidden>
                    Choose device...
                  </option>
                  {devices
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((device) => {
                      const deviceLocation = locations.find(
                        (location) => location.id === device.location
                      );
                      return (
                        <option key={device.id} value={device.id}>
                          {`${
                            deviceLocation
                              ? `${deviceLocation.area} | ${deviceLocation.name}`
                              : "Not specified"
                          } | ${device.name}`}
                        </option>
                      );
                    })}
                </Form.Select>
              </Form.Group>
              <Form.Group className="flex-grow-1" style={{ minWidth: "75%" }}>
                <Form.Label>Select device:</Form.Label>
                <Form.Select
                  onChange={(e) => (device2Ref.current = e.target?.value)}
                  aria-label="Select second device"
                  className=""
                >
                  <option value="" hidden>
                    Choose device...
                  </option>
                  {devices
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((device) => {
                      const deviceLocation = locations.find(
                        (location) => location.id === device.location
                      );
                      return (
                        <option key={device.id} value={device.id}>
                          {`${
                            deviceLocation
                              ? `${deviceLocation.area} | ${deviceLocation.name}`
                              : "Not specified"
                          } | ${device.name}`}
                        </option>
                      );
                    })}
                </Form.Select>
              </Form.Group>
              <Form.Group style={{ maxWidth: "150px" }}>
                <Form.Label>Length:</Form.Label>
                <InputGroup>
                  <Form.Control
                    ref={lengthRef}
                    type="number"
                    placeholder="Enter connection length..."
                  />
                  <InputGroup.Text>m</InputGroup.Text>
                </InputGroup>
              </Form.Group>
              <Form.Group className="flex-grow-1" style={{ minWidth: "30%" }}>
                <Form.Label>Connection status:</Form.Label>
                <Form.Select
                  onChange={(e) => (statusRef.current = e.target?.value)}
                  aria-label="Select connection status"
                  className=""
                >
                  <option value="not ready">Not ready</option>
                  <option value="prepared">Prepared</option>
                  <option value="laid">Laid</option>
                  <option value="ready">Ready</option>
                </Form.Select>
              </Form.Group>
              <Button type="submit" className="ms-auto mt-auto">
                Add device
              </Button>
            </div>
          </Form>
        </div>
      </Modal.Body>
    </Modal>
  );
}
