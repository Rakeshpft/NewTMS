import React, { useReducer, useState } from "react";
import {
  Button,
  Col,
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
import { LoadPage, initialLoadState } from "../tms-object/loadpage";
import { AiOutlinePlus } from "react-icons/ai";
import {
  BrokerModalPage,
  DriverModalPage,
  TrailerModalPage,
  TruckModalPage,
} from "./modal";
import { useHistory } from "react-router-dom";
import { routes } from "../routes/routes";

type FormAction =
  | { type: "SET_status"; payload: string }
  | { type: "SET_pickupDate"; payload: string }
  | { type: "SET_deliveryDate"; payload: string }
  | { type: "SET_notes"; payload: string }
  | { type: "SET_billingStatus"; payload: string }
  | { type: "SET_pickupCity"; payload: string }
  | { type: "SET_deliveryCity"; payload: string }
  | { type: "SET_dispatcher"; payload: string }
  | { type: "SET_pickupState"; payload: string }
  | { type: "SET_deliveryState"; payload: string }
  | { type: "SET_pickupZip"; payload: string }
  | { type: "SET_deliveryZip"; payload: string }
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
    case "SET_pickupDate":
      return { ...state, pickupDate: action.payload };
    case "SET_deliveryDate":
      return { ...state, deliveryDate: action.payload };
    case "SET_notes":
      return { ...state, notes: action.payload };
    case "SET_billingStatus":
      return { ...state, billingStatus: action.payload };
    case "SET_pickupCity":
      return { ...state, pickupCity: action.payload };
    case "SET_deliveryCity":
      return { ...state, deliveryCity: action.payload };
    case "SET_dispatcher":
      return { ...state, dispatcher: action.payload };
    case "SET_pickupState":
      return { ...state, pickupState: action.payload };
    case "SET_deliveryState":
      return { ...state, deliveryState: action.payload };
    case "SET_pickupZip":
      return { ...state, pickupZip: action.payload };
    case "SET_deliveryZip":
      return { ...state, deliveryZip: action.payload };
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

const CreateNewLaodPage = () => {
  const history = useHistory();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formState, dispatch] = useReducer(formReducer, initialLoadState);
  const [customerModal, setCustomerModal] = useState(false);
  const [driverModal, setDriverModal] = useState(false);
  const [trailerModal, setTrailerModal] = useState(false);
  const [truckModal, setTruckModal] = useState(false);

  const toggleCustomer = () => setCustomerModal(!customerModal);
  const toggleDriver = () => setDriverModal(true);
  const toggleTrailer = () => setTrailerModal(!trailerModal);
  const toggleTruck = () => setTruckModal(!truckModal);

  const handleInput =
    (type: FormAction["type"]) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      dispatch({ type, payload: event.target.value });
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formState);
  };

  const handleCancleButton = () => {
    {
      history.location.pathname === routes.dashboard
        ? history.push(routes.loadpageAll)
        : history.goBack();
    }
  };

  return (
    <main>
      <Navbar className="formpagenavbar" color="light">
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
          showHambuger={false}
        />
        <NavbarBrand className="fw-bold px-4">New Load</NavbarBrand>
        <Nav className="me-auto d-flex flex-row gap-2" navbar></Nav>
        <div className="d-flex  gap-3">
          <Profile />
        </div>
      </Navbar>
      <div className="load-itemmain m-2">
        <Form className="load-item container p-5" onSubmit={handleSubmit}>
          <Row>
            <Col lg={3} md={6} sm={12} className="px-3">
              <h5 style={{ color: "black" }}> New Load </h5>
              <FormGroup>
                <Label for="loadSelect">Status</Label>
                <Input
                  id="loadSelect"
                  name="status"
                  type="select"
                  bsSize="sm"
                  value={formState.status}
                  onChange={handleInput("SET_status")}
                >
                  <option>New</option>
                  <option>cancel-buttoned</option>
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
                  name="billingStatus"
                  type="select"
                  bsSize="sm"
                  value={formState.billingStatus}
                  onChange={handleInput("SET_billingStatus")}
                >
                  <option>Pending</option>
                  <option>cancel-buttoned</option>
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
                  name="dispatcher"
                  type="select"
                  bsSize="sm"
                  value={formState.dispatcher}
                  onChange={handleInput("SET_dispatcher")}
                >
                  <option>Pending</option>
                  <option>cancel-buttoned</option>
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
                  id="pickupDate"
                  name="pickupDate"
                  type="date"
                  className="form-control form-control-sm"
                  value={formState.pickupDate}
                  onChange={handleInput("SET_pickupDate")}
                />
              </FormGroup>
              <FormGroup>
                <Label for="pickupCity">City</Label>
                <Input
                  id="pickupCity"
                  name="pickupCity"
                  type="text"
                  className="form-control form-control-sm"
                  value={formState.pickupCity}
                  onChange={handleInput("SET_pickupCity")}
                />
              </FormGroup>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="pickupState">State</Label>
                    <Input
                      id="pickupState"
                      bsSize="sm"
                      name="pickupState"
                      type="select"
                      className="form-control form-control-sm"
                      value={formState.pickupState}
                      onChange={handleInput("SET_pickupState")}
                    >
                      <option>Pending</option>
                      <option>cancel-buttoned</option>
                      <option>BOL received</option>
                      <option>Invoiced</option>
                      <option>Sent to factoring</option>
                      <option>Funded</option>
                      <option>Paid</option>
                      <option>Closed</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="pickupZip">ZIP</Label>
                    <Input
                      id="pickupZip"
                      name="pickupZip"
                      type="text"
                      className="form-control form-control-sm"
                      value={formState.pickupZip}
                      onChange={handleInput("SET_pickupZip")}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Col>

            <Col lg={3} md={6} sm={12} className="px-3">
              <h5 style={{ color: "black" }}>Delivery</h5>
              <FormGroup>
                <Label for="deliveryDate">Date</Label>
                <Input
                  id="deliveryDate"
                  name="deliveryDate"
                  type="date"
                  value={formState.deliveryDate}
                  className="form-control form-control-sm"
                  onChange={handleInput("SET_deliveryDate")}
                />
              </FormGroup>
              <FormGroup>
                <Label for="deliveryCity">City</Label>
                <Input
                  id="deliveryCity"
                  name="deliveryCity"
                  type="text"
                  className="form-control form-control-sm"
                  value={formState.deliveryCity}
                  onChange={handleInput("SET_deliveryCity")}
                />
              </FormGroup>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="deliveryState">State</Label>
                    <Input
                      id="deliveryState"
                      name="deliveryState"
                      type="select"
                      bsSize="sm"
                      className="form-control form-control-sm"
                      value={formState.deliveryState}
                      onChange={handleInput("SET_deliveryState")}
                    >
                      <option>Pending</option>
                      <option>cancel-buttoned</option>
                      <option>BOL received</option>
                      <option>Invoiced</option>
                      <option>Sent to factoring</option>
                      <option>Funded</option>
                      <option>Paid</option>
                      <option>Closed</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="deliveryZip">ZIP</Label>
                    <Input
                      id="deliveryZip"
                      name="deliveryZip"
                      bsSize="sm"
                      type="text"
                      value={formState.deliveryZip}
                      onChange={handleInput("SET_deliveryZip")}
                      className="form-control form-control-sm"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <h5 style={{ color: "black" }}> Notes </h5>
              <FormGroup>
                <Label for="Note">Notes</Label>
                <Input
                  id="Note"
                  name="Note"
                  type="textarea"
                  rows="4"
                  bsSize="sm"
                  value={formState.notes}
                  onChange={handleInput("SET_notes")}
                  className="form-control form-control-sm"
                />
              </FormGroup>
              <FormGroup>
                <Label for="fileAttachment">Attachment</Label>
                <Input
                  id="fileAttachment"
                  name="file"
                  type="file"
                  bsSize="sm"
                  multiple
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="mt-4 justify-content-end">
            <Col lg={3} md={6} sm={12} className="px-3">
              <h5 style={{ color: "black" }}>Broker</h5>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="loadSelect">Broker</Label>
                    <InputGroup>
                      <Input
                        id="loadSelect"
                        name="broker"
                        type="select"
                        value={formState.broker}
                        onChange={handleInput("SET_broker")}
                        bsSize="sm"
                        className="form-control form-control-sm"
                      >
                        <option>New</option>
                        <option>cancel-buttoned</option>
                        <option>TONU</option>
                        <option>Dispatched</option>
                        <option>EnRoute</option>
                        <option>Picked-up</option>
                        <option>Delivered</option>
                        <option>Closed</option>
                      </Input>
                      <Button
                        size="sm"
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
                  onChange={handleInput("SET_po")}
                  className="form-control form-control-sm"
                />
              </FormGroup>
              <FormGroup>
                <Label for="rate">Rate</Label>
                <Input
                  id="rate"
                  name="rate"
                  type="text"
                  value={formState.rate}
                  onChange={handleInput("SET_rate")}
                  className="form-control form-control-sm"
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <h5 style={{ color: "black" }}> Driver </h5>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="driver">Driver</Label>
                    <InputGroup>
                      <Input
                        id="driver"
                        name="driver"
                        type="select"
                        value={formState.driver}
                        onChange={handleInput("SET_driver")}
                        bsSize="sm"
                        className="form-control form-control-sm"
                      >
                        <option>New</option>
                        <option>cancel-buttoned</option>
                        <option>TONU</option>
                        <option>Dispatched</option>
                        <option>EnRoute</option>
                        <option>Picked-up</option>
                        <option>Delivered</option>
                        <option>Closed</option>
                      </Input>
                      <Button
                        size="sm"
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
                    <Label for="truck">Truck</Label>
                    <InputGroup>
                      <Input
                        id="truck"
                        name="truck"
                        type="select"
                        value={formState.truck}
                        onChange={handleInput("SET_truck")}
                        bsSize="sm"
                        className="form-control form-control-sm"
                      >
                        <option>Pending</option>
                        <option>cancel-buttoned</option>
                        <option>BOL received</option>
                        <option>Invoiced</option>
                        <option>Sent to factoring</option>
                        <option>Funded</option>
                        <option>Paid</option>
                        <option>Closed</option>
                      </Input>
                      <Button
                        size="sm"
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
                    <Label for="trailer">Trailer</Label>
                    <InputGroup>
                      <Input
                        id="trailer"
                        name="select"
                        type="select"
                        value={formState.trailer}
                        onChange={handleInput("SET_trailer")}
                        bsSize="sm"
                        className="form-control form-control-sm"
                      >
                        <option>Pending</option>
                        <option>cancel-buttoned</option>
                        <option>BOL received</option>
                        <option>Invoiced</option>
                        <option>Sent to factoring</option>
                        <option>Funded</option>
                        <option>Paid</option>
                        <option>Closed</option>
                      </Input>
                      <Button
                        size="sm"
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
                <Button className="me-3 save-button" size="sm" type="submit">
                  <BiCheck fontSize={"16px"} />
                  Save
                </Button>
                <Button
                  className="cancel-button"
                  size="sm"
                  onClick={handleCancleButton}
                >
                  <RxCross2 fontSize={"13px"} color="red" /> Cancel
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </div>
    </main>
  );
};

export default CreateNewLaodPage;
