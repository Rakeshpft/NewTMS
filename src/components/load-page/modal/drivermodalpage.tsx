import React, { useReducer } from "react";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Container,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  TabPane,
  Button,
  ModalFooter,
} from "reactstrap";
import { TabPage } from "../../driver-page";
import { driverpage } from "../../tms-object/driverpage";

type FormAction =
  | { type: "SET_firstName"; payload: string }
  | { type: "SET_Stauts"; payload: string }
  | { type: "SET_lastName"; payload: string }
  | { type: "SET_dob"; payload: string }
  | { type: "SET_appDate"; payload: string }
  | { type: "SET_payTo"; payload: string }
  | { type: "SET_phone"; payload: string }
  | { type: "SET_email"; payload: string }
  | { type: "SET_hireDate"; payload: string }
  | { type: "SET_coDriver"; payload: string }
  | { type: "SET_addressline1"; payload: string }
  | { type: "SET_addressline2"; payload: string }
  | { type: "SET_truck"; payload: string }
  | { type: "SET_city"; payload: string }
  | { type: "SET_state"; payload: string }
  | { type: "SET_zip"; payload: string }
  | { type: "SET_trailer"; payload: string }
  | { type: "SET_permiles"; payload: string }
  | { type: "SET_perExtraStop"; payload: string }
  | { type: "SET_perEmptyMiles"; payload: string }
  | { type: "SET_ifta"; payload: string }
  | { type: "SET_fuelCard"; payload: string };

const formReducer = (state: driverpage, action: FormAction): driverpage => {
  switch (action.type) {
    case "SET_firstName":
      return { ...state, firstName: action.payload };
    case "SET_Stauts":
      return { ...state, Stauts: action.payload };
    case "SET_lastName":
      return { ...state, lastName: action.payload };
    case "SET_dob":
      return { ...state, dob: action.payload };
    case "SET_appDate":
      return { ...state, appDate: action.payload };
    case "SET_payTo":
      return { ...state, payTo: action.payload };
    case "SET_phone":
      return { ...state, phone: action.payload };
    case "SET_email":
      return { ...state, email: action.payload };
    case "SET_hireDate":
      return { ...state, hireDate: action.payload };
    case "SET_coDriver":
      return { ...state, coDriver: action.payload };
    case "SET_addressline1":
      return { ...state, addressline1: action.payload };
    case "SET_addressline2":
      return { ...state, addressline2: action.payload };
    case "SET_truck":
      return { ...state, truck: action.payload };
    case "SET_city":
      return { ...state, city: action.payload };
    case "SET_state":
      return { ...state, state: action.payload };
    case "SET_zip":
      return { ...state, zip: action.payload };
    case "SET_trailer":
      return { ...state, trailer: action.payload };
    case "SET_permiles":
      return { ...state, permiles: action.payload };
    case "SET_perExtraStop":
      return { ...state, perExtraStop: action.payload };
    case "SET_perEmptyMiles":
      return { ...state, perEmptyMiles: action.payload };
    case "SET_ifta":
      return { ...state, ifta: action.payload };
    case "SET_fuelCard":
      return { ...state, fuelCard: action.payload };
    default:
      return state;
  }
};

const initialState: driverpage = {
  firstName: "",
  Stauts: "",
  lastName: "",
  dob: "",
  appDate: "",
  payTo: "",
  phone: "",
  email: "",
  hireDate: "",
  coDriver: "",
  addressline1: "",
  addressline2: "",
  truck: "",
  city: "",
  state: "",
  zip: "",
  trailer: "",
  permiles: "",
  perExtraStop: "",
  perEmptyMiles: "",
  ifta: "",
  fuelCard: "",
};

interface DriverModalPageProps {
  isDriverOpen: boolean;
  toggle: () => void;
}

const DriverModalPage = ({ isDriverOpen, toggle }: DriverModalPageProps) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);
  };
  return (
    <>
      <Modal isOpen={isDriverOpen} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle} style={{ backgroundColor: "#E9F3FB" }}>
          New Driver
        </ModalHeader>
        <ModalBody>
          <Container>
            <Form onSubmit={handleSubmit} className="driveritem">
              <Row>
                <Col>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="examplefName">FirstName</Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          type="text"
                          value={state.firstName}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_firstName",
                              payload: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col></Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="examplelName">LastName</Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          id="examplelName"
                          name="lastName"
                          type="text"
                          value={state.lastName}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_lastName",
                              payload: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="exampledob">D.O.B</Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          id="exampledob"
                          name="dob"
                          type="date"
                          value={state.dob}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_dob",
                              payload: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="examplephone">Phone</Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          id="examplephone"
                          name="phone"
                          type="text"
                          value={state.phone}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_phone",
                              payload: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="exampleemail">Email</Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          id="exampleemail"
                          name="email"
                          type="email"
                          value={state.email}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_email",
                              payload: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="exampleaddressLine1">Address Line 1</Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          id="exampleaddressLine1"
                          name="address"
                          type="text"
                          value={state.addressline1}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_addressline1",
                              payload: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="exampleaddressLine1">Address Line 2</Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          id="exampleaddressLine2"
                          name="address"
                          type="text"
                          value={state.addressline2}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_addressline2",
                              payload: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="examplecity">City</Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          id="examplecity"
                          name="city"
                          type="text"
                          value={state.city}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_city",
                              payload: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="examplestate">State</Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          id="examplestate"
                          name="state"
                          type="text"
                          value={state.state}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_state",
                              payload: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="examplezip">Zip</Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          id="examplezip"
                          name="zip"
                          type="text"
                          value={state.zip}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_zip",
                              payload: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
                <Col>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="examplestauts">Stauts</Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          id="examplestauts"
                          name="stauts"
                          type="text"
                          value={state.Stauts}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_Stauts",
                              payload: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col className="mt-4">
                      <FormGroup check>
                        <Input
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          type="checkbox"
                        />
                        <Label
                          check
                          style={{ marginBottom: "0px", fontSize: "small" }}
                        >
                          Create New Partner
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="exampleappdate">Application Date</Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          id="exampleappdate"
                          name="appDate"
                          type="date"
                          value={state.appDate}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_appDate",
                              payload: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="examplepay">Pay To</Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          id="examplepay"
                          name="pay to"
                          type="text"
                          value={state.payTo}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_payTo",
                              payload: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="examplehiredate">Hire Date</Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          id="examplehiredate"
                          name="hireDate"
                          type="date"
                          value={state.hireDate}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_hireDate",
                              payload: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="examplecoDriver">Co-Driver</Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          id="examplecoDriver"
                          name="coDriver"
                          type="text"
                          value={state.coDriver}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_coDriver",
                              payload: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="examplefuleCard">Fule Card #</Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          id="exampletruck"
                          name="truck"
                          type="text"
                          value={state.fuelCard}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_fuelCard",
                              payload: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="exampletruck">Truck</Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          id="exampletruck"
                          name="truck"
                          type="text"
                          value={state.truck}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_truck",
                              payload: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col></Col>
                    <Col>
                      <FormGroup>
                        <Label for="exampletrailer">Trailer</Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          id="exampletrailer"
                          name="trailer"
                          type="text"
                          value={state.trailer}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_trailer",
                              payload: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col></Col>
                    <Col className="mt-4">
                      <FormGroup check>
                        <Input
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          type="checkbox"
                          value={state.ifta}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_ifta",
                              payload: e.target.value,
                            });
                          }}
                        />
                        <Label
                          check
                          style={{ marginBottom: "0px", fontSize: "small" }}
                        >
                          IFTA Handled by Company
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col md={8}>
                  <TabPage
                    tabTitles={[
                      "Pay Rates",
                      "Sechedule Payments/Deductions",
                      "Additional Payee",
                      "Notes",
                    ]}
                  >
                    <TabPane
                      tabId={1}
                      style={{ color: "black", border: "1px solid #418ECB" }}
                    >
                      <Row className="mt-3 px-4">
                        <Col>
                          <Row>
                            <Col sm={3}>
                              <FormGroup check>
                                <Input
                                  style={{
                                    color: "black",
                                    border: "1px solid #418ECB",
                                  }}
                                  name="radio2"
                                  type="radio"
                                />
                                <Label
                                  check
                                  style={{
                                    marginBottom: "0px",
                                    fontSize: "small",
                                  }}
                                >
                                  Company Driver
                                </Label>
                              </FormGroup>
                            </Col>
                            <Col sm={3}>
                              <FormGroup check>
                                <Input
                                  style={{
                                    color: "black",
                                    border: "1px solid #418ECB",
                                  }}
                                  name="radio2"
                                  type="radio"
                                />
                                <Label
                                  check
                                  style={{
                                    marginBottom: "0px",
                                    fontSize: "small",
                                  }}
                                >
                                  Owner Operator
                                </Label>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row>
                            <Col sm={3}>
                              <FormGroup check>
                                <Input
                                  style={{
                                    color: "black",
                                    border: "1px solid #418ECB",
                                  }}
                                  name="radio1"
                                  type="radio"
                                />
                                <Label
                                  check
                                  style={{
                                    marginBottom: "0px",
                                    fontSize: "small",
                                  }}
                                >
                                  Per Mile
                                </Label>
                              </FormGroup>
                            </Col>
                            <Col sm={3}>
                              <FormGroup check>
                                <Input
                                  style={{
                                    color: "black",
                                    border: "1px solid #418ECB",
                                  }}
                                  name="radio1"
                                  type="radio"
                                />
                                <Label
                                  check
                                  style={{
                                    marginBottom: "0px",
                                    fontSize: "small",
                                  }}
                                >
                                  Freight %
                                </Label>
                              </FormGroup>
                            </Col>
                            <Col sm={3}>
                              <FormGroup check>
                                <Input
                                  style={{
                                    color: "black",
                                    border: "1px solid #418ECB",
                                  }}
                                  name="radio1"
                                  type="radio"
                                />
                                <Label
                                  check
                                  style={{
                                    marginBottom: "0px",
                                    fontSize: "small",
                                  }}
                                >
                                  Flat Pay
                                </Label>
                              </FormGroup>
                            </Col>
                            <Col sm={3}>
                              <FormGroup check>
                                <Input
                                  style={{
                                    color: "black",
                                    border: "1px solid #418ECB",
                                  }}
                                  name="radio1"
                                  type="radio"
                                />
                                <Label
                                  check
                                  style={{
                                    marginBottom: "0px",
                                    fontSize: "small",
                                  }}
                                >
                                  Hourly
                                </Label>
                              </FormGroup>
                            </Col>
                          </Row>
                          <Row className="mt-3">
                            <Col sm={3}>
                              <FormGroup>
                                <Label for="exampleperMile">Per Mile</Label>
                                <Input
                                  bsSize="sm"
                                  style={{
                                    color: "black",
                                    border: "1px solid #418ECB",
                                  }}
                                  id="exampleperMile"
                                  name="perMile"
                                  type="text"
                                  value={state.permiles}
                                  onChange={(e) => {
                                    dispatch({
                                      type: "SET_permiles",
                                      payload: e.target.value,
                                    });
                                  }}
                                />
                              </FormGroup>
                            </Col>
                            <Col sm={3}>
                              <FormGroup>
                                <Label for="exampleperExtraStop">
                                  Per Extra Stop
                                </Label>
                                <Input
                                  bsSize="sm"
                                  style={{
                                    color: "black",
                                    border: "1px solid #418ECB",
                                  }}
                                  id="exampleperExtraStop"
                                  name="perExtraStop"
                                  type="text"
                                  value={state.perExtraStop}
                                  onChange={(e) => {
                                    dispatch({
                                      type: "SET_perExtraStop",
                                      payload: e.target.value,
                                    });
                                  }}
                                />
                              </FormGroup>
                            </Col>
                            <Col sm={3}>
                              <FormGroup>
                                <Label for="exampleperEmptyMile">
                                  Per Empty Mile
                                </Label>
                                <Input
                                  bsSize="sm"
                                  style={{
                                    color: "black",
                                    border: "1px solid #418ECB",
                                  }}
                                  id="exampleperEmptyMile"
                                  name="perEmptyMile"
                                  type="text"
                                  value={state.perEmptyMiles}
                                  onChange={(e) => {
                                    dispatch({
                                      type: "SET_perEmptyMiles",
                                      payload: e.target.value,
                                    });
                                  }}
                                />
                              </FormGroup>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </TabPane>
                  </TabPage>
                </Col>
                <Col md={4}></Col>
              </Row>
            </Form>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            size="sm"
            className="me-3"
            style={{
              color: "black",
              border: "1px solid #1E5367",
              backgroundColor: "#418ECB",
            }}
          >
            <BiCheck fontSize={"16px"} />
            Save
          </Button>
          <Button
            size="sm"
            style={{
              color: "red",
              border: "1px solid red",
              backgroundColor: "white",
            }}
            onClick={toggle}
          >
            <RxCross2 fontSize={"16px"} color="red" />
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default DriverModalPage;
