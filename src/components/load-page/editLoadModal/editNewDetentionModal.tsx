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

interface EditNewDetentionModalProps {
  toggle: () => void;
  isOpen: boolean;
}
const EditNewDetentionModal = ({
  toggle,
  isOpen,
}: EditNewDetentionModalProps) => {
  return (
    <Modal isOpen={isOpen} toggle={() => toggle()}>
      <ModalHeader className="py-2" toggle={() => toggle()}>
        <h6 className="mb-0 fw-bold"> New Detention </h6>
      </ModalHeader>
      <ModalBody>
        <Container>
          <Form>
            <Row>
              <Col>
                <span> Status </span>
                <div className="d-flex gap-2">
                  <FormGroup check>
                    <Input
                      name="radio1"
                      type="radio"
                      value={"Direct Billing"}
                      // checked={formState.radiovalue === "Direct Billing"}
                      // onChange={handleInput("SET_radiovalue")}
                    />
                    <Label check>Open</Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input
                      name="radio1"
                      type="radio"
                      value={"Factoring"}
                      // checked={formState.radiovalue === "Factoring"}
                      // onChange={handleInput("SET_radiovalue")}
                    />
                    <Label check>Closed</Label>
                  </FormGroup>
                </div>
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
              <Col md={6}>
                <FormGroup>
                  <Label for="number"> Amount payable to driver </Label>
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
              <Col md={6} className="d-flex flex-wrap align-content-center">
                <FormGroup check>
                  <Input
                    name="radio1"
                    type="checkbox"
                    value={"Overide"}
                    // checked={formState.radiovalue === "Factoring"}
                    // onChange={handleInput("SET_radiovalue")}
                  />
                  <Label check>Overide</Label>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
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
          </Form>
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default EditNewDetentionModal;
