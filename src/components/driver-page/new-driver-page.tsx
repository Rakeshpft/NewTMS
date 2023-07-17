import React, { useReducer, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Col,
  Row,
  Form,
  FormGroup,
  Input,
  Label,
  TabPane,
} from "reactstrap";
import TabPage from "./tab-page";

type FormState = {
  firstName: string;
  Stauts: string;
  lastName: string;
  dob: string;
  appDate: string;
  payTo: string;
  phone: string;
  email: string;
  hireDate: string;
  coDriver: string;
  addressline1: string;
  addressline2: string;
  truck: string;
  city: string;
  state: string;
  zip: string;
  trailer: string;
  permiles: string;
  perExtraStop: string;
  perEmptyMiles: string;
};

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
  | { type: "SET_perEmptyMiles"; payload: string };

const formReducer = (state: FormState, action: FormAction): FormState => {
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
    default:
      return state;
  }
};

const initialState: FormState = {
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
};

const NewDriverPage = () => {
  const [modal, setModal] = useState(false);
  const [state, dispatch] = useReducer(formReducer, initialState);
  const toggle = () => setModal(!modal);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <div>
      <Button color="primary" onClick={toggle} >
        New Driver
      </Button>
      <Modal isOpen={modal} toggle={toggle} fullscreen="xl" size="xl" >
        <ModalHeader toggle={toggle} style={{ backgroundColor: "#B7D1E6" }}>
          New Driver
        </ModalHeader>
        <ModalBody className="m-3">
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="examplefName">FirstName</Label>
                  <Input
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
              <Col>
                <FormGroup>
                  <Input id="exampleFile" name="Upload File" type="file" />
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="examplestauts">Stauts</Label>
                  <Input
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
              <Col>
                <FormGroup check>
                  <Input type="checkbox" />
                  <Label check>Create New Partner</Label>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="examplelName">LastName</Label>
                  <Input
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
              <Col>
                <FormGroup>
                  <Label for="exampleappdate">Application Date</Label>
                  <Input
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
                  <Label for="examplephone">Phone</Label>
                  <Input
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
              <Col>
                <FormGroup>
                  <Label for="examplehiredate">Hire Date</Label>
                  <Input
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
                  <Label for="exampleaddressLine1">Address Line 1</Label>
                  <Input
                    id="exampleaddressLine1"
                    name="address"
                    type="textarea"
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
              <Col>
                <FormGroup>
                  <Label for="examplefuleCard">Fule Card #</Label>
                  {/* <Input id="examplefuleCard" name="fuleCard" type="email" /> */}
                </FormGroup>
              </Col>
              <Col>
                <FormGroup>
                  <Label for="exampletruck">Truck</Label>
                  <Input
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
              <Col>
                <FormGroup>
                  <Label for="exampleaddressLine1">Address Line 2</Label>
                  <Input
                    id="exampleaddressLine2"
                    name="address"
                    type="textarea"
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
              <Col>
                <FormGroup>
                  <Label for="exampletrailer">Trailer</Label>
                  <Input
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
              <Col>
                <FormGroup>
                  <Label for="examplestate">State</Label>
                  <Input
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
              <Col>
                <FormGroup check>
                  <Input type="checkbox" />
                  <Label check>IFTA Handled by Company</Label>
                </FormGroup>
              </Col>
            </Row>
            <TabPage
              tabTitles={[
                "Pay Rates",
                "Sechedule Payments/Deductions",
                "Additional Payee",
                "Notes",
              ]}
            >
              <TabPane tabId={1} className="m-4">
                <Row>
                  <Col sm={2}>
                    <FormGroup check>
                      <Input name="radio2" type="radio" />
                      <Label check>Company Driver</Label>
                    </FormGroup>
                  </Col>
                  <Col sm={2}>
                    <FormGroup check>
                      <Input name="radio2" type="radio" />
                      <Label check>Owner Operator</Label>
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col sm={2}>
                    <FormGroup check>
                      <Input name="radio1" type="radio" />
                      <Label check>Per Mile</Label>
                    </FormGroup>
                  </Col>
                  <Col sm={2}>
                    <FormGroup check>
                      <Input name="radio1" type="radio" />
                      <Label check>Freight %</Label>
                    </FormGroup>
                  </Col>
                  <Col sm={2}>
                    <FormGroup check>
                      <Input name="radio1" type="radio" />
                      <Label check>Flat Pay</Label>
                    </FormGroup>
                  </Col>
                  <Col sm={2}>
                    <FormGroup check>
                      <Input name="radio1" type="radio" />
                      <Label check>Hourly</Label>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="exampleperMile">Per Mile</Label>
                      <Input
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
                  <Col>
                    <FormGroup>
                      <Label for="exampleperExtraStop">Per Extra Stop</Label>
                      <Input
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
                  <Col>
                    <FormGroup>
                      <Label for="exampleperEmptyMile">Per Empty Mile</Label>
                      <Input
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
              </TabPane>
            </TabPage>
            <Button type="submit" className="mx-1 m-2">
              Save
            </Button>
            <Button className="mx-1 m-2" onClick={toggle}>
              Close
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default NewDriverPage;
