import { Form, Button, Modal, InputGroup } from "react-bootstrap";

type DeviceFormTypes = {
  show: boolean;
  hide: () => void;
};

export default function DeviceForm({ show, hide }: DeviceFormTypes) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    hide();
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
                <Form.Label>Device ID:</Form.Label>
                <Form.Control type="text" placeholder="Enter device ID..." />
                <Form.Text>Must be unique!</Form.Text>
              </Form.Group>
              <Form.Group className="flex-grow-1">
                <Form.Label>Device name:</Form.Label>
                <Form.Control type="text" placeholder="Enter device name..." />
              </Form.Group>
              <Form.Group className="flex-grow-1" style={{ minWidth: "75%" }}>
                <Form.Label>Select location:</Form.Label>
                <Form.Select aria-label="Select area" className="">
                  <option>Select location</option>
                </Form.Select>
              </Form.Group>

              <Form.Group style={{ minWidth: "50%" }}>
                <Form.Label>Additional info:</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter additional info..."
                />
              </Form.Group>
              <Form.Group style={{ maxWidth: "150px" }}>
                <Form.Label>Weight:</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    placeholder="Enter device weight..."
                  />
                  <InputGroup.Text>kg</InputGroup.Text>
                </InputGroup>
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
