import React, { useReducer } from "react";
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
import { customer, initialCustomerState } from "../../tms-object/partners";

type FormInput =
  | { type: "SET_companyName"; payload: string }
  | { type: "SET_addressLine1"; payload: string }
  | { type: "SET_addressLine2"; payload: string }
  | { type: "SET_city"; payload: string }
  | { type: "SET_state"; payload: string }
  | { type: "SET_zip"; payload: string }
  | { type: "SET_phone"; payload: string }
  | { type: "SET_email"; payload: string }
  | { type: "SET_mc"; payload: string }
  | { type: "SET_fid"; payload: string }
  | { type: "SET_notes"; payload: string }
  | { type: "SET_stauts"; payload: string }
  | { type: "SET_quickPayFee"; payload: string }
  | { type: "SET_factoring"; payload: string }
  | { type: "SET_credit"; payload: string }
  | { type: "SET_payTerms"; payload: string }
  | { type: "SET_avgDaysToPay"; payload: string }
  | { type: "SET_radiovalue"; payload: string }
  | { type: "SET_broker"; payload: boolean }
  | { type: "SET_shipperOrReceiver"; payload: boolean };

const formReducer = (state: customer, action: FormInput): customer => {
  switch (action.type) {
    case "SET_companyName":
      return { ...state, companyName: action.payload };
    case "SET_addressLine1":
      return { ...state, addressLine1: action.payload };
    case "SET_addressLine2":
      return { ...state, addressLine2: action.payload };
    case "SET_city":
      return { ...state, city: action.payload };
    case "SET_state":
      return { ...state, state: action.payload };
    case "SET_zip":
      return { ...state, zip: action.payload };
    case "SET_phone":
      return { ...state, phone: action.payload };
    case "SET_email":
      return { ...state, email: action.payload };
    case "SET_mc":
      return { ...state, mc: action.payload };
    case "SET_fid":
      return { ...state, fid: action.payload };
    case "SET_notes":
      return { ...state, notes: action.payload };
    case "SET_stauts":
      return { ...state, stauts: action.payload };
    case "SET_quickPayFee":
      return { ...state, quickPayFee: action.payload };
    case "SET_factoring":
      return { ...state, factoring: action.payload };
    case "SET_credit":
      return { ...state, credit: action.payload };
    case "SET_payTerms":
      return { ...state, payTerms: action.payload };
    case "SET_avgDaysToPay":
      return { ...state, avgDaysToPay: action.payload };
    case "SET_radiovalue":
      return { ...state, radiovalue: action.payload };
    case "SET_shipperOrReceiver":
      return { ...state, shipperOrReceiver: !state.shipperOrReceiver };
    case "SET_broker":
      return { ...state, broker: !state.broker };
    default:
      return state;
  }
};

interface BrokerModalPageProps {
  isCustomerOpen: boolean;
  toggle: () => void;
}

const BrokerModalPage = ({ isCustomerOpen, toggle }: BrokerModalPageProps) => {
  const [formState, dispatch] = useReducer(formReducer, initialCustomerState);

  const handleInput =
    (type: FormInput["type"]) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      dispatch({ type, payload: event.target.value } as FormInput);
    };

  const handleCheckboxChange =
    (type: FormInput["type"]) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type,
        payload: event.target.checked,
      } as FormInput);
    };
  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formState);
  };
  return (
    <>
      <Modal isOpen={isCustomerOpen} toggle={toggle} size="xl" backdrop="static">
        <ModalHeader toggle={toggle} className="py-2">
          <h6 className="mb-0 fw-bold">New Customer</h6>
        </ModalHeader>
        <ModalBody>
          <Container>
            <Form className="newcustomer">
              <Row className="px-3">
                <Col md={6} className="px-4">
                  <FormGroup>
                    <Label for="companyName">Company Name</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      name="companyName"
                      id="companyName"
                      value={formState.companyName}
                      onChange={handleInput("SET_companyName")}
                    />
                  </FormGroup>
                </Col>
                <Col md={3} className="px-4">
                  <h6 className="fw-bold">Customer Type</h6>
                  <FormGroup check inline>
                    <Input
                      type="checkbox"
                      checked={formState.broker}
                      name="broker"
                      onChange={handleCheckboxChange("SET_broker")}
                    />
                    <Label check>Broker</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input
                      type="checkbox"
                      checked={formState.shipperOrReceiver}
                      name="shipperOrReceiver"
                      onChange={handleCheckboxChange("SET_shipperOrReceiver")}
                    />
                    <Label check>Shipper/Receiver</Label>
                  </FormGroup>
                </Col>
                <Col md={3} className="px-4">
                  <FormGroup tag="fieldset">
                    <h6 className="fw-bold">Billing</h6>
                    <FormGroup check>
                      <Input
                        name="radio1"
                        type="radio"
                        value={"Direct Billing"}
                        checked={formState.radiovalue === "Direct Billing"}
                        onChange={handleInput("SET_radiovalue")}
                      />
                      <Label check>Direct Billing</Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        name="radio1"
                        type="radio"
                        value={"Factoring"}
                        checked={formState.radiovalue === "Factoring"}
                        onChange={handleInput("SET_radiovalue")}
                      />
                      <Label check>Factoring</Label>
                    </FormGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="px-3">
                <Col md={6} className="px-4">
                  <FormGroup>
                    <Label for="addressLine1">Address Line1</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      name="addressLine1"
                      id="addressLine1"
                      value={formState.addressLine1}
                      onChange={handleInput("SET_addressLine1")}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="px-3">
                <Col md={6} className="px-4">
                  <FormGroup>
                    <Label for="addressLine2">Address Line2</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      name="addressLine2"
                      id="addressLine2"
                      value={formState.addressLine2}
                      onChange={handleInput("SET_addressLine2")}
                    />
                  </FormGroup>
                </Col>
                <Col md={3} className="px-4">
                  <FormGroup>
                    <Label for="quickPayFee">Quick Pay Fee</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      value={formState.quickPayFee}
                      name="quickPayFee"
                      id="quickPayFee"
                      onChange={handleInput("SET_quickPayFee")}
                    />
                  </FormGroup>
                </Col>
                <Col md={3} className="px-4">
                  <FormGroup>
                    <Label for="factoring">Factoring</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      value={formState.factoring}
                      name="factoring"
                      id="factoring"
                      onChange={handleInput("SET_factoring")}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="px-3">
                <Col md={3} className="px-4">
                  <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      value={formState.phone}
                      name="phone"
                      id="phone"
                      onChange={handleInput("SET_phone")}
                    />
                  </FormGroup>
                </Col>
                <Col md={3} className="px-4">
                  <FormGroup>
                    <Label for="email">Email</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="email"
                      value={formState.email}
                      name="email"
                      id="email"
                      onChange={handleInput("SET_email")}
                    />
                  </FormGroup>
                </Col>
                <Col md={3} className="px-4">
                  <FormGroup>
                    <Label for="stauts">Status</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      value={formState.stauts}
                      name="stauts"
                      id="stauts"
                      onChange={handleInput("SET_stauts")}
                    />
                  </FormGroup>
                </Col>
                <Col md={3} className="px-4">
                  <FormGroup>
                    <Label for="credit">Credit</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      value={formState.credit}
                      name="credit"
                      id="credit"
                      onChange={handleInput("SET_credit")}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="px-3">
                <Col md={3} className="px-4">
                  <FormGroup>
                    <Label for="city">City</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      value={formState.city}
                      name="city"
                      id="city"
                      onChange={handleInput("SET_city")}
                    />
                  </FormGroup>
                </Col>
                <Col md={3} className="px-4">
                  <FormGroup>
                    <Label for="state">State</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      value={formState.state}
                      name="state"
                      id="state"
                      onChange={handleInput("SET_state")}
                    />
                  </FormGroup>
                </Col>
                <Col md={3} className="px-4"></Col>
                <Col md={3} className="px-4">
                  <FormGroup>
                    <Label for="payTerms">Pay Terms</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      value={formState.payTerms}
                      name="payTerms"
                      id="payTerms"
                      onChange={handleInput("SET_payTerms")}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="px-3">
                <Col md={3} className="px-4">
                  <FormGroup>
                    <Label for="zip">Zip</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      value={formState.zip}
                      name="zip"
                      id="zip"
                      onChange={handleInput("SET_zip")}
                    />
                  </FormGroup>
                </Col>
                <Col md={3} className="px-4"></Col>
                <Col md={3} className="px-4"></Col>
                <Col md={3} className="px-4">
                  <FormGroup>
                    <Label for="avgDaysToPay">Avg. Days To Pay</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      value={formState.avgDaysToPay}
                      name="avgDaysToPay"
                      id="avgDaysToPay"
                      onChange={handleInput("SET_avgDaysToPay")}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="px-3">
                <Col md={3} className="px-4">
                  <FormGroup>
                    <Label for="fid">FID/EIN</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      value={formState.fid}
                      name="fid"
                      id="fid"
                      onChange={handleInput("SET_fid")}
                    />
                  </FormGroup>
                </Col>
                <Col md={3} className="px-4">
                  <FormGroup>
                    <Label for="mc">MC</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      value={formState.mc}
                      name="mc"
                      id="mc"
                      onChange={handleInput("SET_mc")}
                    />
                  </FormGroup>
                </Col>
                <Col md={3} className="px-4"></Col>
                <Col md={3} className="px-4"></Col>
              </Row>
              <Row className="px-3">
                <Col md={6} className="px-4">
                  <FormGroup>
                    <Label for="notes">Notes</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="textarea"
                      value={formState.notes}
                      name="notes"
                      id="notes"
                      onChange={handleInput("SET_notes")}
                    />
                  </FormGroup>
                </Col>
                <Col
                  md={6}
                  className="px-4 d-flex justify-content-end align-items-end"
                >
                  <Button
                    color="primary"
                    size="sm"
                    className="me-3 save-button"
                    onClick={handleCustomerSubmit}
                    type="submit"
                  >
                    <BiCheck fontSize={"16px"} />
                    Save
                  </Button>
                  <Button className="cancel-button" size="sm" onClick={toggle}>
                    <RxCross2 fontSize={"16px"} color="red" />
                    Close
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};

export default BrokerModalPage;
