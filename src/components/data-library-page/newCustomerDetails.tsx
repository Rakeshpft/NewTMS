import React from "react";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';
import { Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { routes } from "../routes/routes";

interface newCustomerModalProps {
    isOpen: boolean;
  toggle: () => void;
  
}
const NewCustomerDetailsModal = ({isOpen , toggle }: newCustomerModalProps) => {

    const navigate = useNavigate();
  const closeBtn = (
    <button className="border-0 bg-transparent" onClick={toggle} type="button">
      <RxCross2 />
    </button>
  )
const handleCancleButton = () => {
    {
    //   history.location.pathname === routes.dashboard
    //     ? history.push(routes.customersAll)
    //     : history.goBack();
    }
    {
      navigate(routes.customersAll);
    }
  };

  return (
    <div>
      <Modal isOpen={isOpen} toggle={() => toggle()} centered size="lg">
        <ModalHeader
          toggle={() => toggle()}
          close={closeBtn}
          className="modalColor"
        >
          <h6 className="mb-0 fw-bold "> New Customer </h6>
        </ModalHeader>
        <ModalBody>
          <Container>
            <>
            <div className="m-2 load-itemmain">
        <Form
        //   onSubmit={handleSubmit}
          className="load-item container p-4"
          style={{ zoom: "0.9" }}
        >
          <Row className="px-5">
            <Col lg={6} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="companyName">Company Name</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                  name="companyName"
                  id="companyName"
                  value={""}
                  onChange={() => ({})}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <h6 className="fw-bold">Customer Type</h6>
              <FormGroup check inline>
                <Input
                  type="checkbox"
                //   checked={''}
                  name="broker"
                  onChange={() => ({})}
                />
                <Label check>Broker</Label>
              </FormGroup>
              <FormGroup check inline>
                <Input
                  type="checkbox"
                //   checked={formState.shipperOrReceiver}
                  name="shipperOrReceiver"
                  onChange={() => ({})}
                />
                <Label check>Shipper/Receiver</Label>
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup tag="fieldset">
                <h6 className="fw-bold">Billing</h6>
                <div className="d-flex gap-2">
                  <FormGroup check>
                    <Input
                      name="radio1"
                      type="radio"
                      value={"Direct Billing"}
                    //   checked={formState.radiovalue === "Direct Billing"}
                    //   onChange={handleInput("SET_radiovalue")}
                    />
                    <Label check>Direct Billing</Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input
                      name="radio1"
                      type="radio"
                      value={"Factoring"}
                    //   checked={formState.radiovalue === "Factoring"}
                    //   onChange={handleInput("SET_radiovalue")}
                    />
                    <Label check>Factoring</Label>
                  </FormGroup>
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-5">
            <Col lg={6} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="addressLine1">Address Line1</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                  name="addressLine1"
                  id="addressLine1"
                  value={""}
                  onChange={() => ({})}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-5">
            <Col lg={6} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="addressLine2">Address Line2</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                  name="addressLine2"
                  id="addressLine2"
                  value={""}
                //   onChange={handleInput("SET_addressLine2")}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="quickPayFee">Quick Pay Fee</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                //   value={formState.quickPayFee}
                  name="quickPayFee"
                  id="quickPayFee"
                  value={""}
                  //   onChange={handleInput("SET_addressLine2")}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="factoring">Factoring</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                //   value={formState.factoring}
                  name="factoring"
                  id="factoring"
                //   onChange={handleInput("SET_factoring")}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-5">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="phone">Phone</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                //   value={formState.phone}
                  name="phone"
                  id="phone"
                //   onChange={handleInput("SET_phone")}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="email"
                //   value={formState.email}
                  name="email"
                  id="email"
                //   onChange={handleInput("SET_email")}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="stauts">Status</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                //   value={formState.stauts}
                  name="stauts"
                  id="stauts"
                //   onChange={handleInput("SET_stauts")}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="credit">Credit</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                //   value={formState.credit}
                  name="credit"
                  id="credit"
                //   onChange={handleInput("SET_credit")}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-5">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="city">City</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                //   value={formState.city}
                  name="city"
                  id="city"
                //   onChange={handleInput("SET_city")}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="state">State</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                //   value={formState.state}
                  name="state"
                  id="state"
                //   onChange={handleInput("SET_state")}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3"></Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="payTerms">Pay Terms</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                //   value={formState.payTerms}
                  name="payTerms"
                  id="payTerms"
                //   onChange={handleInput("SET_payTerms")}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-5">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="zip">Zip</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                //   value={formState.zip}
                  name="zip"
                  id="zip"
                //   onChange={handleInput("SET_zip")}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3"></Col>
            <Col lg={3} md={6} sm={12} className="px-3"></Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="avgDaysToPay">Avg. Days To Pay</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                //   value={formState.avgDaysToPay}
                  name="avgDaysToPay"
                  id="avgDaysToPay"
                //   onChange={handleInput("SET_avgDaysToPay")}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-5">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="fid">FID/EIN</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                //   value={formState.fid}
                  name="fid"
                  id="fid"
                //   onChange={handleInput("SET_fid")}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="mc">MC</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                //   value={formState.mc}
                  name="mc"
                  id="mc"
                //   onChange={handleInput("SET_mc")}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-5">
            <Col lg={6} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="notes">Notes</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="textarea"
                //   value={formState.notes}
                  name="notes"
                  id="notes"
                //   onChange={handleInput("SET_notes")}
                />
              </FormGroup>
            </Col>
            <Col lg={6} md={6} sm={12} className="px-3">
              <FormGroup
                className="d-flex justify-content-end align-self-center mt-5"
                style={{ bottom: "0", right: "0" }}
              >
                <Button className="me-3 save-button" size="sm">
                  <BiCheck fontSize={"16px"} />
                  Save
                </Button>
                <Button
                  size="sm"
                  className="cancel-button"
                  onClick={handleCancleButton}
                >
                  <RxCross2 fontSize={"16px"} color="red" /> Cancel
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </div>
            </>
          </Container>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default NewCustomerDetailsModal;
