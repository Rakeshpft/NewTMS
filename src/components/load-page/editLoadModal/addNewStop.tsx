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

interface IAddStopModal {
  isOpen: boolean;
  toggle: () => void;
}
const AddStopModal = ({ isOpen, toggle }: IAddStopModal) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle} size="lg">
      <ModalHeader toggle={() => toggle()}>
        <h6 className="mb-0 fw-bold"> New Stop </h6>
      </ModalHeader>
      <ModalBody>
        <Container>
          <Row>
            <Col>
              <div className="d-flex gap-2 ">
                <FormGroup check>
                  <Input
                    name="radio1"
                    type="radio"
                    value={"Direct Billing"}
                    // checked={formState.radiovalue === "Direct Billing"}
                    // onChange={handleInput("SET_radiovalue")}
                  />
                  <Label check>PickUp</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    name="radio1"
                    type="radio"
                    value={"Factoring"}
                    // checked={formState.radiovalue === "Factoring"}
                    // onChange={handleInput("SET_radiovalue")}
                  />
                  <Label check>Delivery</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    name="radio1"
                    type="radio"
                    value={"Factoring"}
                    // checked={formState.radiovalue === "Factoring"}
                    // onChange={handleInput("SET_radiovalue")}
                  />
                  <Label check>Other</Label>
                </FormGroup>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <FormGroup>
                <Label for="stop">Order (After)</Label>
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
              <div className="d-flex gap-2">
                <FormGroup check>
                  <Input
                    name="radio1"
                    type="radio"
                    value={"Direct Billing"}
                    // checked={formState.radiovalue === "Direct Billing"}
                    // onChange={handleInput("SET_radiovalue")}
                  />
                  <Label check>FCFS</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    name="radio1"
                    type="radio"
                    value={"Factoring"}
                    // checked={formState.radiovalue === "Factoring"}
                    // onChange={handleInput("SET_radiovalue")}
                  />
                  <Label check>Appoinment</Label>
                </FormGroup>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="px-3">
              <FormGroup>
                <Label>Date </Label>
                <Input
                  bsSize="sm"
                  id="exampleSelect"
                  name="select"
                  type="date"
                  className="form-control form-control-sm"
                />
              </FormGroup>
            </Col>
            <Col md={3}>
            <FormGroup>
                <Label for="stop">Start Time</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                  name="stop"
                  id="stop"
                  // value={addNewCustomer.company_name}
                  // onChange={handleCutomerInput("company_name")}
                />
              </FormGroup>  
            </Col>
            <Col md={3}>
            <FormGroup>
                <Label for="stop">End Time</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
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
                <Label for="company">Company</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                  name="company"
                  id="company"
                  // value={addNewCustomer.company_name}
                  // onChange={handleCutomerInput("company_name")}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label for="number"> Street </Label>
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
            <Col md={6}>
              <FormGroup>
                <Label for="number"> State </Label>
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
                <Label for="number"> City </Label>
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
            <Col md={6}>
              <FormGroup>
                <Label for="number"> ZIP </Label>
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
                <Label for="number"> Phone </Label>
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

export default AddStopModal;
