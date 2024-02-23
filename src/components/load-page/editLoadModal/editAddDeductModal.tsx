import React from "react";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import {
  Button,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";

interface IEditAddDeductModal {
  isOpen: boolean;
  toggle: () => void;
}
const EditAddDeductModal = ({ isOpen, toggle }: IEditAddDeductModal) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} >
      <ModalHeader toggle={() => toggle()}>
        <h6 className="mb-0 fw-bold"> New Charge </h6>
      </ModalHeader>
      <ModalBody>
        <Container>
          <Row>
            <Col>
              <FormGroup>
                <Label for="stop">Category</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="select"
                  name="stop"
                  id="stop"
                  // value={addNewCustomer.company_name}
                  // onChange={handleCutomerInput("company_name")}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="number"> Amount </Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="number"
                  name="amount"
                  id="amount"
                  // value={addNewCustomer.company_name}
                  // onChange={handleCutomerInput("company_name")}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="stop">Stop</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="select"
                  name="stop"
                  id="stop"
                  // value={addNewCustomer.company_name}
                  // onChange={handleCutomerInput("company_name")}
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
                <Button size="sm" className="cancel-button">
                  <RxCross2 fontSize={"16px"} color="red" /> Cancel
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default EditAddDeductModal;
