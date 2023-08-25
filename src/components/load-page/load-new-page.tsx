import React, { useReducer, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Nav,
  Navbar,
  NavbarBrand,
  Row,
} from "reactstrap";
import Profile from "../pofile";
import { Header } from "../header";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { LoadPage } from "../tms-object/loadpage";
import { AiOutlinePlus } from "react-icons/ai";
import {
  BrokerModalPage,
  DriverModalPage,
  TrailerModalPage,
  TruckModalPage,
} from "./modal";

type FormAction =
  | { type: "SET_status"; payload: string }
  | { type: "SET_date"; payload: string }
  | { type: "SET_notes"; payload: string }
  | { type: "SET_billingStatus"; payload: string }
  | { type: "SET_city"; payload: string }
  | { type: "SET_dispatcher"; payload: string }
  | { type: "SET_state"; payload: string }
  | { type: "SET_zip"; payload: string }
  | { type: "SET_broker"; payload: string }
  | { type: "SET_driver"; payload: string }
  | { type: "SET_truck"; payload: string }
  | { type: "SET_trailer"; payload: string }
  | { type: "SET_rate"; payload: string }
  | { type: "SET_po"; payload: string };

const formReducer = (state: LoadPage, action: FormAction): LoadPage => {
  switch (action.type) {
    case "SET_status":
      return { ...state, status: action.payload };
    case "SET_date":
      return { ...state, date: action.payload };
    case "SET_notes":
      return { ...state, notes: action.payload };
    case "SET_billingStatus":
      return { ...state, billingStatus: action.payload };
    case "SET_city":
      return { ...state, city: action.payload };
    case "SET_dispatcher":
      return { ...state, dispatcher: action.payload };
    case "SET_state":
      return { ...state, state: action.payload };
    case "SET_zip":
      return { ...state, zip: action.payload };
    case "SET_broker":
      return { ...state, broker: action.payload };
    case "SET_driver":
      return { ...state, driver: action.payload };
    case "SET_truck":
      return { ...state, truck: action.payload };
    case "SET_trailer":
      return { ...state, trailer: action.payload };
    case "SET_rate":
      return { ...state, rate: action.payload };
    case "SET_po":
      return { ...state, po: action.payload };
    default:
      return state;
  }
};

const initialState: LoadPage = {
  status: "",
  date: "",
  notes: "",
  billingStatus: "",
  city: "",
  dispatcher: "",
  state: "",
  zip: "",
  broker: "",
  driver: "",
  truck: "",
  trailer: "",
  rate: "",
  po: "",
};

const LaodNewPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formState, dispatch] = useReducer(formReducer, initialState);
  const [customerModal, setCustomerModal] = useState(false);
  const [driverModal, setDriverModal] = useState(false);
  const [trailerModal, setTrailerModal] = useState(false);
  const [truckModal, setTruckModal] = useState(false);

  const toggleCustomer = () => setCustomerModal(!customerModal);
  const toggleDriver = () => setDriverModal(!driverModal);
  const toggleTrailer = () => setTrailerModal(!trailerModal);
  const toggleTruck = () => setTruckModal(!truckModal);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formState);
  };

  return (
    <>
      <Navbar className="py-0 formpagenavbar" color="light">
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
          showHambuger={false}
        />
        <NavbarBrand className="fw-bold">New Load</NavbarBrand>
        <Nav className="me-auto d-flex flex-row gap-2" navbar></Nav>
        <div className="d-flex  gap-3">
          <Profile />
        </div>
      </Navbar>
      <div
        className="py-2 load-itemmain"
        style={{ backgroundColor: "#E9F3FB" }}
      >
        <Container className="mt-4 px-5 py-2">
          <Form className="load-item" onSubmit={handleSubmit}>
            <Row className="px-5">
              <Col lg={3} md={6} sm={12} className="px-3">
                <h5 style={{ color: "black" }}> New Load </h5>
                <FormGroup>
                  <Label for="loadSelect">Status</Label>
                  <Input
                    id="loadSelect"
                    name="select"
                    type="select"
                    value={formState.status}
                    onChange={(e) => {
                      dispatch({
                        type: "SET_status",
                        payload: e.target.value,
                      });
                    }}
                    className="form-select form-select-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
                  >
                    <option>New</option>
                    <option>Canceled</option>
                    <option>TONU</option>
                    <option>Dispatched</option>
                    <option>EnRoute</option>
                    <option>Picked-up</option>
                    <option>Delivered</option>
                    <option>Closed</option>
                  </Input>
                </FormGroup>

                <FormGroup>
                  <Label for="BillingSelect">Billing Status</Label>
                  <Input
                    id="BillingSelect"
                    name="select"
                    type="select"
                    className="form-select form-select-sm"
                    value={formState.billingStatus}
                    onChange={(e) => {
                      dispatch({
                        type: "SET_billingStatus",
                        payload: e.target.value,
                      });
                    }}
                    style={{ color: "black", border: "1px solid #418ECB" }}
                  >
                    <option>Pending</option>
                    <option>Canceled</option>
                    <option>BOL received</option>
                    <option>Invoiced</option>
                    <option>Sent to factoring</option>
                    <option>Funded</option>
                    <option>Paid</option>
                    <option>Closed</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="dispatcherSelect">Dispatcher</Label>
                  <Input
                    id="dispatcherSelect"
                    name="select"
                    type="select"
                    value={formState.dispatcher}
                    onChange={(e) => {
                      dispatch({
                        type: "SET_dispatcher",
                        payload: e.target.value,
                      });
                    }}
                    className="form-select form-select-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
                  >
                    <option>Pending</option>
                    <option>Canceled</option>
                    <option>BOL received</option>
                    <option>Invoiced</option>
                    <option>Sent to factoring</option>
                    <option>Funded</option>
                    <option>Paid</option>
                    <option>Closed</option>
                  </Input>
                </FormGroup>
              </Col>

              <Col lg={3} md={6} sm={12} className="px-3">
                <h5 style={{ color: "black" }}> Pickup </h5>

                <FormGroup>
                  <Label for="pickupDate">Date</Label>
                  <Input
                    id="pickDate"
                    name="date"
                    type="date"
                    value={formState.date}
                    onChange={(e) => {
                      dispatch({
                        type: "SET_date",
                        payload: e.target.value,
                      });
                    }}
                    className="form-control form-control-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    value={formState.city}
                    onChange={(e) => {
                      dispatch({
                        type: "SET_city",
                        payload: e.target.value,
                      });
                    }}
                    className="form-control form-control-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="pickupState">State</Label>
                  <Input
                    id="pickupState"
                    name="state"
                    type="text"
                    value={formState.state}
                    onChange={(e) => {
                      dispatch({
                        type: "SET_state",
                        payload: e.target.value,
                      });
                    }}
                    className="form-control form-control-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="pickupZip">ZIP</Label>
                  <Input
                    id="pickupZip"
                    name="zip"
                    type="text"
                    value={formState.zip}
                    onChange={(e) => {
                      dispatch({
                        type: "SET_zip",
                        payload: e.target.value,
                      });
                    }}
                    className="form-control form-control-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
                  />
                </FormGroup>
              </Col>

              <Col lg={3} md={6} sm={12} className="px-3">
                <h5 style={{ color: "black" }}> Delivery</h5>
                <FormGroup>
                  <Label for="pickupDate">Date</Label>
                  <Input
                    id="pickDate"
                    name="date"
                    type="date"
                    value={formState.date}
                    onChange={(e) => {
                      dispatch({
                        type: "SET_date",
                        payload: e.target.value,
                      });
                    }}
                    className="form-control form-control-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    value={formState.city}
                    onChange={(e) => {
                      dispatch({
                        type: "SET_city",
                        payload: e.target.value,
                      });
                    }}
                    className="form-control form-control-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="pickupState">State</Label>
                  <Input
                    id="pickupState"
                    name="state"
                    type="text"
                    value={formState.state}
                    onChange={(e) => {
                      dispatch({
                        type: "SET_state",
                        payload: e.target.value,
                      });
                    }}
                    className="form-control form-control-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="pickupZip">ZIP</Label>
                  <Input
                    id="pickupZip"
                    name="zip"
                    type="text"
                    value={formState.zip}
                    onChange={(e) => {
                      dispatch({
                        type: "SET_zip",
                        payload: e.target.value,
                      });
                    }}
                    className="form-control form-control-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
                  />
                </FormGroup>
              </Col>
              <Col lg={3} md={6} sm={12} className="px-3">
                <h5 style={{ color: "black" }}> Notes </h5>
                <FormGroup>
                  <Label for="Note">Notes</Label>
                  <Input
                    id="Note"
                    name="Note"
                    type="textarea"
                    rows="3"
                    value={formState.notes}
                    onChange={(e) => {
                      dispatch({
                        type: "SET_notes",
                        payload: e.target.value,
                      });
                    }}
                    className="form-control form-control-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="fileAttachment">Attachment</Label>
                  <Input
                    id="fileAttachment"
                    name="file"
                    type="file"
                    style={{ color: "black", border: "1px solid #418ECB" }}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row className="px-5 mt-4 justify-content-end">
              <Col lg={3} md={6} sm={12} className="px-3">
                <h5 style={{ color: "black" }}>Broker</h5>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="loadSelect">Broker</Label>
                      <InputGroup>
                        <Input
                          id="loadSelect"
                          name="select"
                          type="select"
                          value={formState.broker}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_broker",
                              payload: e.target.value,
                            });
                          }}
                          className="form-select form-select-sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                        >
                          <option>New</option>
                          <option>Canceled</option>
                          <option>TONU</option>
                          <option>Dispatched</option>
                          <option>EnRoute</option>
                          <option>Picked-up</option>
                          <option>Delivered</option>
                          <option>Closed</option>
                        </Input>
                        <Button
                          size="sm"
                          className="p-1"
                          style={{ backgroundColor: "#418ECB" }}
                          onClick={toggleCustomer}
                        >
                          <AiOutlinePlus />
                          <BrokerModalPage
                            isCustomerOpen={customerModal}
                            toggle={() => {
                              setCustomerModal(false);
                            }}
                          />
                        </Button>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>

                <FormGroup>
                  <Label for="po">PO #</Label>
                  <Input
                    id="po"
                    name="po"
                    type="text"
                    value={formState.po}
                    onChange={(e) => {
                      dispatch({
                        type: "SET_po",
                        payload: e.target.value,
                      });
                    }}
                    className="form-control form-control-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="rate">Rate</Label>
                  <Input
                    id="rate"
                    name="rate"
                    type="text"
                    value={formState.rate}
                    onChange={(e) => {
                      dispatch({
                        type: "SET_rate",
                        payload: e.target.value,
                      });
                    }}
                    className="form-control form-control-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
                  />
                </FormGroup>
              </Col>
              <Col lg={3} md={6} sm={12} className="px-3">
                <h5 style={{ color: "black" }}> Driver </h5>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="loadSelect">Driver</Label>
                      <InputGroup>
                        <Input
                          id="loadSelect"
                          name="select"
                          type="select"
                          value={formState.driver}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_driver",
                              payload: e.target.value,
                            });
                          }}
                          className="form-select form-select-sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                        >
                          <option>New</option>
                          <option>Canceled</option>
                          <option>TONU</option>
                          <option>Dispatched</option>
                          <option>EnRoute</option>
                          <option>Picked-up</option>
                          <option>Delivered</option>
                          <option>Closed</option>
                        </Input>
                        <Button
                          size="sm"
                          className="p-1"
                          style={{ backgroundColor: "#418ECB" }}
                          onClick={toggleDriver}
                        >
                          <AiOutlinePlus />
                          <DriverModalPage
                            isDriverOpen={driverModal}
                            toggle={() => {
                              setDriverModal(false);
                            }}
                          />
                        </Button>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="BillingSelect">Truck</Label>
                      <InputGroup>
                        <Input
                          id="BillingSelect"
                          name="select"
                          type="select"
                          value={formState.truck}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_truck",
                              payload: e.target.value,
                            });
                          }}
                          className="form-select form-select-sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                        >
                          <option>Pending</option>
                          <option>Canceled</option>
                          <option>BOL received</option>
                          <option>Invoiced</option>
                          <option>Sent to factoring</option>
                          <option>Funded</option>
                          <option>Paid</option>
                          <option>Closed</option>
                        </Input>
                        <Button
                          size="sm"
                          className="p-1"
                          style={{ backgroundColor: "#418ECB" }}
                          onClick={toggleTruck}
                        >
                          <AiOutlinePlus />
                          <TruckModalPage
                            isTruckOpen={truckModal}
                            toggle={() => {
                              setTruckModal(false);
                            }}
                          />
                        </Button>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="dispatcherSelect">Trailer</Label>
                      <InputGroup>
                        <Input
                          id="dispatcherSelect"
                          name="select"
                          type="select"
                          value={formState.trailer}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_trailer",
                              payload: e.target.value,
                            });
                          }}
                          className="form-select form-select-sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                        >
                          <option>Pending</option>
                          <option>Canceled</option>
                          <option>BOL received</option>
                          <option>Invoiced</option>
                          <option>Sent to factoring</option>
                          <option>Funded</option>
                          <option>Paid</option>
                          <option>Closed</option>
                        </Input>
                        <Button
                          size="sm"
                          className="p-1"
                          style={{ backgroundColor: "#418ECB" }}
                          onClick={toggleTrailer}
                        >
                          <AiOutlinePlus />
                          <TrailerModalPage
                            isTrailerOpen={trailerModal}
                            toggle={() => {
                              setTrailerModal(false);
                            }}
                          />
                        </Button>
                      </InputGroup>
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col lg={3} md={6} sm={12} className="px-3 align-self-end">
                <FormGroup
                  className="d-flex justify-content-end mb-1"
                  style={{ bottom: "0", right: "0" }}
                >
                  <Button
                    className="me-3"
                    size="sm"
                    style={{
                      color: "white",
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
                  >
                    <RxCross2 fontSize={"13px"} color="red" /> Cancel
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default LaodNewPage;
