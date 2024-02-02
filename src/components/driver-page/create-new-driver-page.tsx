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
  Nav,
  Navbar,
  NavbarBrand,
} from "reactstrap";
import TabPage from "./tab-page";
import { RxCross2 } from "react-icons/rx";
import { BiCheck } from "react-icons/bi";
import { Header } from "../header";
import Profile from "../pofile";
import { driverpage, initialDriverState } from "../tms-object/driverpage";
// import { routes } from "../routes/routes";
import {  useNavigate } from 'react-router-dom';

// import { useHistory } from "react-router-dom";

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
  | { type: "SET_ifta" }
  | { type: "SET_createNewPartner" }
  | { type: "SET_fuelCard"; payload: string }
  | { type: "SET_permiles"; payload: string }
  | { type: "SET_perExtraStop"; payload: string }
  | { type: "SET_perEmptyMiles"; payload: string }
  | { type: "SET_radiovalue1"; payload: string }
  | { type: "SET_radiovalue2"; payload: string }
  | { type: "SET_image"; payload: string | null };

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
      return { ...state, ifta: !state.ifta };
    case "SET_createNewPartner":
      return { ...state, createNewPartner: !state.createNewPartner };
    case "SET_fuelCard":
      return { ...state, fuelCard: action.payload };
    case "SET_radiovalue1":
      return { ...state, radiovalue1: action.payload };
    case "SET_radiovalue2":
      return { ...state, radiovalue2: action.payload };
    case "SET_image":
      return { ...state, imageUrl: action.payload };
    default:
      return state;
  }
};

const CreateNewDriverPage = () => {
  // const history = useHistory();
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(formReducer, initialDriverState);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (file) {
          setSelectedImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
      dispatch({ type: "SET_image", payload: file.name as unknown as string });
    }
  };
  const handleInput =
    (type: FormAction["type"]) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      dispatch({ type, payload: event.target.value } as FormAction);
    };

  const handleCheckboxChange =
    (type: FormAction["type"]) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type,
        payload: event.target.checked,
      } as FormAction);
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);
  };

  const handleCancleButton = () => {
    // {
    //   history.location.pathname === routes.dashboard
    //     ? history.push(routes.driverpageAll)
    //     : history.goBack();
    // }
    {
      navigate(-1);
    }
  };

  return (
    <>
      <Navbar
        style={{
          borderBottom: "1px solid #1B56AE",
        }}
        className="py-0"
        color="light"
      >
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
          showHambuger={false}
        />
        <NavbarBrand className="fw-bold px-4">New Driver</NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-2">
          <Profile />
        </div>
      </Navbar>
      <div className="load-itemmain m-2">
        <Form
          onSubmit={handleSubmit}
          className="load-item container p-4"
          style={{ zoom: "0.9" }}
        >
          <Row className="px-5">
            <Col>
              <Row>
                <Col lg={6} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="examplefName">FirstName</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      id="examplefName"
                      name="firstName"
                      value={state.firstName}
                      onChange={handleInput("SET_firstName")}
                    />
                  </FormGroup>
                </Col>
                <Col lg={6} md={6} sm={12} className="px-3">
                  {selectedImage ? (
                    <img
                      src={selectedImage as string}
                      alt="Profile"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                      className="mt-2"
                    />
                  ) : (
                    <img
                      src={require("../../../public/images/user-avatar.png")}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                      className="mt-2"
                    />
                  )}
                  <Label className="custom-file-upload-label">
                    <span className="custom-file-upload">Upload Photo</span>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="d-none"
                    />
                  </Label>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="examplelName">LastName</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      id="examplelName"
                      name="lastName"
                      type="text"
                      value={state.lastName}
                      onChange={handleInput("SET_lastName")}
                    />
                  </FormGroup>
                </Col>
                <Col lg={6} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="exampledob">D.O.B</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      id="exampledob"
                      name="dob"
                      type="date"
                      value={state.dob}
                      onChange={handleInput("SET_dob")}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="examplephone">Phone</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      id="examplephone"
                      name="phone"
                      type="text"
                      value={state.phone}
                      onChange={handleInput("SET_phone")}
                    />
                  </FormGroup>
                </Col>
                <Col lg={6} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="exampleemail">Email</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      id="exampleemail"
                      name="email"
                      type="email"
                      value={state.email}
                      onChange={handleInput("SET_email")}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <FormGroup>
                    <Label for="exampleaddressLine1">Address Line 1</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      id="exampleaddressLine1"
                      name="address"
                      type="text"
                      value={state.addressline1}
                      onChange={handleInput("SET_addressline1")}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="exampleaddressLine1">Address Line 2</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      id="exampleaddressLine2"
                      name="addressline2"
                      type="text"
                      value={state.addressline2}
                      onChange={handleInput("SET_addressline2")}
                    />
                  </FormGroup>
                </Col>
                <Col lg={6} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="examplecity">City</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      id="examplecity"
                      name="city"
                      type="text"
                      value={state.city}
                      onChange={handleInput("SET_city")}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="examplestate">State</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      id="examplestate"
                      name="state"
                      type="text"
                      value={state.state}
                      onChange={handleInput("SET_state")}
                    />
                  </FormGroup>
                </Col>
                <Col lg={6} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="examplezip">Zip</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      id="examplezip"
                      name="zip"
                      type="text"
                      value={state.zip}
                      onChange={handleInput("SET_zip")}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col lg={6} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="examplestauts">Status</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      id="examplestauts"
                      name="stauts"
                      type="text"
                      value={state.Stauts}
                      onChange={handleInput("SET_Stauts")}
                    />
                  </FormGroup>
                </Col>
                <Col lg={6} md={6} sm={12} className="px-3 align-self-center">
                  <FormGroup check>
                    <Input
                      type="checkbox"
                      name="createNewPartner"
                      checked={state.createNewPartner}
                      onChange={handleCheckboxChange("SET_createNewPartner")}
                    />
                    <Label check>Create New Partner</Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="exampleappdate">Application Date</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      id="exampleappdate"
                      name="appDate"
                      type="date"
                      value={state.appDate}
                      onChange={handleInput("SET_appDate")}
                    />
                  </FormGroup>
                </Col>
                <Col lg={6} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="examplepay">Pay To</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      id="examplepay"
                      name="payTo"
                      type="text"
                      value={state.payTo}
                      onChange={handleInput("SET_payTo")}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="examplehiredate">Hire Date</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      id="examplehiredate"
                      name="hireDate"
                      type="date"
                      value={state.hireDate}
                      onChange={handleInput("SET_hireDate")}
                    />
                  </FormGroup>
                </Col>
                <Col lg={6} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="examplecoDriver">Co-Driver</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      id="examplecoDriver"
                      name="coDriver"
                      type="text"
                      value={state.coDriver}
                      onChange={handleInput("SET_coDriver")}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="examplefuleCard">Fule Card #</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      id="examplefuleCard"
                      name="fuelCard"
                      type="text"
                      value={state.fuelCard}
                      onChange={handleInput("SET_fuelCard")}
                    />
                  </FormGroup>
                </Col>
                <Col lg={6} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="exampletruck">Truck</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      id="exampletruck"
                      name="truck"
                      type="text"
                      value={state.truck}
                      onChange={handleInput("SET_truck")}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col></Col>
                <Col lg={6} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="exampletrailer">Trailer</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      id="exampletrailer"
                      name="trailer"
                      type="text"
                      value={state.trailer}
                      onChange={handleInput("SET_trailer")}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col></Col>
                <Col lg={6} md={6} sm={12} className="px-3 mt-4">
                  <FormGroup check>
                    <Input
                      type="checkbox"
                      checked={state.ifta}
                      name="ifta"
                      onChange={handleCheckboxChange("SET_ifta")}
                    />
                    <Label check>IFTA Handled by Company</Label>
                  </FormGroup>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="my-3 px-5">
            <Col md={8} sm={12}>
              <TabPage
                tabTitles={[
                  "Pay Rates",
                  "Sechedule Payments/Deductions",
                  "Additional Payee",
                  "Notes",
                ]}
              >
                <TabPane tabId={1} className="border bg-light">
                  <Row className="mt-3 px-4">
                    <Col>
                      <Row>
                        <Col md={3}>
                          <FormGroup check>
                            <Input
                              name="radio2"
                              type="radio"
                              value="Company Driver"
                              checked={state.radiovalue1 === "Company Driver"}
                              onChange={handleInput("SET_radiovalue1")}
                            />
                            <Label check>Company Driver</Label>
                          </FormGroup>
                        </Col>
                        <Col md={3}>
                          <FormGroup check>
                            <Input
                              name="radio2"
                              type="radio"
                              value={"Owner Operator"}
                              checked={state.radiovalue1 === "Owner Operator"}
                              onChange={handleInput("SET_radiovalue1")}
                            />
                            <Label check>Owner Operator</Label>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="mt-2">
                        <Col md="3" sm="6">
                          <FormGroup check>
                            <Input
                              name="radio1"
                              type="radio"
                              value={"Per Mile"}
                              checked={state.radiovalue2 === "Per Mile"}
                              onChange={handleInput("SET_radiovalue2")}
                            />
                            <Label check>Per Mile</Label>
                          </FormGroup>
                        </Col>
                        <Col md="3" sm="6">
                          <FormGroup check>
                            <Input
                              name="radio1"
                              type="radio"
                              value={"Freight %"}
                              checked={state.radiovalue2 === "Freight %"}
                              onChange={handleInput("SET_radiovalue2")}
                            />
                            <Label check>Freight %</Label>
                          </FormGroup>
                        </Col>
                        <Col md="3" sm="6">
                          <FormGroup check>
                            <Input
                              name="radio1"
                              type="radio"
                              value={"Flat Pay"}
                              checked={state.radiovalue2 === "Flat Pay"}
                              onChange={handleInput("SET_radiovalue2")}
                            />
                            <Label check>Flat Pay</Label>
                          </FormGroup>
                        </Col>
                        <Col md="3" sm="6">
                          <FormGroup check>
                            <Input
                              name="radio1"
                              type="radio"
                              value={"Hourly"}
                              checked={state.radiovalue2 === "Hourly"}
                              onChange={handleInput("SET_radiovalue2")}
                            />
                            <Label check>Hourly</Label>
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className="my-2">
                        <Col lg={3} md={6} sm={12} className="px-3">
                          <FormGroup>
                            <Label for="exampleperMile">Per Mile</Label>
                            <Input
                              bsSize="sm"
                              id="exampleperMile"
                              name="permiles"
                              type="text"
                              value={state.permiles}
                              onChange={handleInput("SET_permiles")}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg={3} md={6} sm={12} className="px-3">
                          <FormGroup>
                            <Label for="exampleperExtraStop">
                              Per Extra Stop
                            </Label>
                            <Input
                              bsSize="sm"
                              id="exampleperExtraStop"
                              name="perExtraStop"
                              type="text"
                              value={state.perExtraStop}
                              onChange={handleInput("SET_perExtraStop")}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg={3} md={6} sm={12} className="px-3">
                          <FormGroup>
                            <Label for="exampleperEmptyMile">
                              Per Empty Mile
                            </Label>
                            <Input
                              bsSize="sm"
                              id="exampleperEmptyMile"
                              name="perEmptyMiles"
                              type="text"
                              value={state.perEmptyMiles}
                              onChange={handleInput("SET_perEmptyMiles")}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </TabPane>
              </TabPage>
            </Col>
            <Col
              lg={4}
              md={4}
              sm={12}
              className="d-flex justify-content-end align-self-end"
              style={{ bottom: "0", right: "0" }}
            >
              <Button className="me-3 save-button" size="sm" color="info">
                <BiCheck fontSize={"16px"} />
                Save
              </Button>
              <Button
                size="sm"
                className="cancel-button"
                onClick={handleCancleButton}
              >
                <RxCross2 fontSize={"16px"} color="red" /> cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default CreateNewDriverPage;
