import React, { useReducer, useState } from "react";
import {
  Button,
  Col,
  Row,
  Form,
  FormGroup,
  Input,
  Label,
  TabPane,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
} from "reactstrap";
import TabPage from "./tab-page";
import { RxCross2 } from "react-icons/rx";
import { BiCheck } from "react-icons/bi";
import { Header } from "../header";
import Profile from "../pofile";
import SearchPage from "../search-page";
import { CgProfile } from "react-icons/cg";

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
  ifta: string;
  fuelCard: string;
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
  | { type: "SET_perEmptyMiles"; payload: string }
  | { type: "SET_ifta"; payload: string }
  | { type: "SET_fuelCard"; payload: string };

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
    case "SET_ifta":
      return { ...state, ifta: action.payload };
    case "SET_fuelCard":
      return { ...state, fuelCard: action.payload };
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
  ifta: "",
  fuelCard: "",
};

const NewDriver = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [image, setImage] = useState({ preview: "", raw: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);
  };

  const handleChange = (e: any) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image.raw);

    await fetch("YOUR_URL", {
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    });
  };

  return (
    <>
      <Navbar
        style={{ border: "1px solid #1B56AE" }}
        color="light"
        className="py-0"
      >
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
          showHambuger={false}
        />
        <NavbarBrand>Driver</NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-3">
          <SearchPage />
          <Profile />
        </div>
      </Navbar>
      <div className="m-2">
        <Container
          fluid
          style={{ backgroundColor: "#E9F3FB" }}
          className="mt-1 px-5 py-2"
        >
          <h2 style={{ color: "rgb(66 111 177)", fontWeight: "bold" }}>
            Create New Driver
          </h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="examplefName">FirstName</Label>
                      <Input
                        bsSize="sm"
                        style={{ color: "black", border: "1px solid #418ECB" }}
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
                      <div>
                        <label htmlFor="upload-button">
                          {image.preview ? (
                            <img
                              src={image.preview}
                              alt="dummy"
                              width="300"
                              height="300"
                            />
                          ) : (
                            <>
                              <span className="fa-stack fa-2x mt-3 mb-2">
                                <CgProfile height={60} />
                                <p
                                  className="text-center"
                                  onClick={handleUpload}
                                >
                                  Upload your photo
                                </p>
                              </span>
                            </>
                          )}
                        </label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                            display: "none",
                          }}
                          type="file"
                          id="upload-button"
                          onChange={handleChange}
                        />
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="examplelName">LastName</Label>
                      <Input
                        bsSize="sm"
                        style={{ color: "black", border: "1px solid #418ECB" }}
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
                        style={{ color: "black", border: "1px solid #418ECB" }}
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
                        style={{ color: "black", border: "1px solid #418ECB" }}
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
                        style={{ color: "black", border: "1px solid #418ECB" }}
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
                        bsSize="sm"
                        style={{ color: "black", border: "1px solid #418ECB" }}
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
                        style={{ color: "black", border: "1px solid #418ECB" }}
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
                        bsSize="sm"
                        style={{ color: "black", border: "1px solid #418ECB" }}
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
                        style={{ color: "black", border: "1px solid #418ECB" }}
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
                        style={{ color: "black", border: "1px solid #418ECB" }}
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
                        style={{ color: "black", border: "1px solid #418ECB" }}
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
                        style={{ color: "black", border: "1px solid #418ECB" }}
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
                        style={{ color: "black", border: "1px solid #418ECB" }}
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
                        style={{ color: "black", border: "1px solid #418ECB" }}
                        type="checkbox"
                      />
                      <Label check>Create New Partner</Label>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="exampleappdate">Application Date</Label>
                      <Input
                        bsSize="sm"
                        style={{ color: "black", border: "1px solid #418ECB" }}
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
                        style={{ color: "black", border: "1px solid #418ECB" }}
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
                        style={{ color: "black", border: "1px solid #418ECB" }}
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
                        style={{ color: "black", border: "1px solid #418ECB" }}
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
                        style={{ color: "black", border: "1px solid #418ECB" }}
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
                        style={{ color: "black", border: "1px solid #418ECB" }}
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
                      <Label for="exampletrailer">Trailer</Label>
                      <Input
                        bsSize="sm"
                        style={{ color: "black", border: "1px solid #418ECB" }}
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
                  <Col className="mt-4">
                    <FormGroup check>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
                        type="checkbox"
                        value={state.ifta}
                        onChange={(e) => {
                          dispatch({
                            type: "SET_ifta",
                            payload: e.target.value,
                          });
                        }}
                      />
                      <Label check>IFTA Handled by Company</Label>
                    </FormGroup>
                  </Col>
                </Row>
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
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
                        name="radio2"
                        type="radio"
                      />
                      <Label check>Company Driver</Label>
                    </FormGroup>
                  </Col>
                  <Col sm={2}>
                    <FormGroup check>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
                        name="radio2"
                        type="radio"
                      />
                      <Label check>Owner Operator</Label>
                    </FormGroup>
                  </Col>
                </Row>
                <Row className="mt-2">
                  <Col sm={2}>
                    <FormGroup check>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
                        name="radio1"
                        type="radio"
                      />
                      <Label check>Per Mile</Label>
                    </FormGroup>
                  </Col>
                  <Col sm={2}>
                    <FormGroup check>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
                        name="radio1"
                        type="radio"
                      />
                      <Label check>Freight %</Label>
                    </FormGroup>
                  </Col>
                  <Col sm={2}>
                    <FormGroup check>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
                        name="radio1"
                        type="radio"
                      />
                      <Label check>Flat Pay</Label>
                    </FormGroup>
                  </Col>
                  <Col sm={2}>
                    <FormGroup check>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
                        name="radio1"
                        type="radio"
                      />
                      <Label check>Hourly</Label>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="exampleperMile">Per Mile</Label>
                      <Input
                        bsSize="sm"
                        style={{ color: "black", border: "1px solid #418ECB" }}
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
                        bsSize="sm"
                        style={{ color: "black", border: "1px solid #418ECB" }}
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
                        bsSize="sm"
                        style={{ color: "black", border: "1px solid #418ECB" }}
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
            <Button
              className="me-3  ps-3 pe-3"
              style={{
                color: "black",
                border: "1px solid #1E5367",
                backgroundColor: "#B7D1E6",
              }}
            >
              <BiCheck fontSize={"24px"} />
              Save
            </Button>
            <Button
              style={{
                color: "red",
                border: "1px solid red",
                backgroundColor: "white",
              }}
            >
              <RxCross2 fontSize={"21px"} color="red" /> Cancel
            </Button>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default NewDriver;
