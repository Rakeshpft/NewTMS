import React from "react";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import {
    Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";

interface EditLumperModalProps {
  isOpen: boolean;
  toggle: () => void;
}
const UploadConfirmation = ({ isOpen, toggle }: EditLumperModalProps) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader className="py-2" toggle={() => toggle()}>
        <h6 className="mb-0 fw-bold"> Upload Confirmation </h6>
      </ModalHeader>
      <ModalBody>
        <Container>
          <Form>
            <Row>
          <Col md={12} className="py-4">
                <FormGroup>
                  <Input
                    type="file"
                    placeholder="No File Selected"
                    bsSize="sm"
                  />
                </FormGroup>
              </Col>
              </Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="notes">Notes</Label>
                  <Input
                    bsSize="sm"
                    className="form-control form-control-sm"
                    type="textarea"
                    name="notes"
                    id="notes"
                    // value={formState.notes}
                    // onChange={handleInput("SET_notes")}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
              <FormGroup
              className="d-flex justify-content-end align-self-center mt-1"
              style={{ bottom: "0", right: "0" }}
            >
                <Button className="me-3 save-button" size="sm">
                <BiCheck fontSize={"16px"} />
                Save
              </Button>
              <Button
                  size="sm"
                  className="cancel-button"
                 
                >
                  <RxCross2 fontSize={"16px"} color="red" /> Close
                </Button>
            </FormGroup>
                
              </Col>
            </Row>
          </Form>
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default UploadConfirmation;
