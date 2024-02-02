import React, { useReducer, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Nav,
  Navbar,
  NavbarBrand,
  Row,
} from "reactstrap";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { GrFormAdd } from "react-icons/gr";
import { Header } from "../../header";
import Profile from "../../pofile";
import { initialVendorState, vendor } from "../../tms-object/partners";
import { useNavigate } from 'react-router-dom';
import { routes } from "../../routes/routes";

type FormAction =
  | { type: "SET_companyName"; payload: string }
  | { type: "SET_addressLine1"; payload: string }
  | { type: "SET_addressLine2"; payload: string }
  | { type: "SET_phone"; payload: string }
  | { type: "SET_email"; payload: string }
  | { type: "SET_city"; payload: string }
  | { type: "SET_state"; payload: string }
  | { type: "SET_zip"; payload: string }
  | { type: "SET_fid"; payload: string }
  | { type: "SET_mc"; payload: string }
  | { type: "SET_notes"; payload: string }
  | { type: "SET_additonalPayee"; payload: boolean };

const formReducer = (state: vendor, action: FormAction): vendor => {
  switch (action.type) {
    case "SET_companyName":
      return { ...state, companyName: action.payload };
    case "SET_addressLine1":
      return { ...state, addressLine1: action.payload };
    case "SET_addressLine2":
      return { ...state, addressLine2: action.payload };
    case "SET_phone":
      return { ...state, phone: action.payload };
    case "SET_email":
      return { ...state, email: action.payload };
    case "SET_city":
      return { ...state, city: action.payload };
    case "SET_state":
      return { ...state, state: action.payload };
    case "SET_zip":
      return { ...state, zip: action.payload };
    case "SET_fid":
      return { ...state, fid: action.payload };
    case "SET_mc":
      return { ...state, mc: action.payload };
    case "SET_notes":
      return { ...state, notes: action.payload };
    case "SET_additonalPayee":
      return { ...state, additonalPayee: !state.additonalPayee };
    default:
      return state;
  }
};

const CreateNewVendorPage = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [state, dispatch] = useReducer(formReducer, initialVendorState);

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
    //     ? history.push(routes.vendorsAll)
    //     : history.goBack();
    // }
    {
      navigate(routes.vendorsAll);
    }
  };

  return (
    <>
      <Navbar className="formpagenavbar" color="light">
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
          showHambuger={false}
        />
        <NavbarBrand className="fw-bold px-4">New Vendor</NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-3">
          <Profile />
        </div>
      </Navbar>
      <div className="m-2 load-itemmain">
        <Form
          className="load-item container p-4"
          onSubmit={handleSubmit}
          style={{ zoom: "0.9" }}
        >
          <Row>
            <Col className="px-5" md="6">
              <Row>
                <Col className="px-3">
                  <FormGroup>
                    <Label for="companyName">Company Name</Label>
                    <Input
                      bsSize="sm"
                      id="companyName"
                      name="companyName"
                      type="text"
                      value={state.companyName}
                      onChange={handleInput("SET_companyName")}
                      className="form-control form-control-sm"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="px-3">
                  <FormGroup>
                    <Label for="addressLine1">Address Line 1</Label>
                    <Input
                      bsSize="sm"
                      id="addressLine1"
                      name="addressLine1"
                      type="text"
                      value={state.addressLine1}
                      onChange={handleInput("SET_addressLine1")}
                      className="form-control form-control-sm"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="px-3">
                  <FormGroup>
                    <Label for="addressLine2">Address Line 2</Label>
                    <Input
                      bsSize="sm"
                      id="addressLine2"
                      name="addressLine1"
                      type="text"
                      value={state.addressLine2}
                      onChange={handleInput("SET_addressLine2")}
                      className="form-control form-control-sm"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6} className="px-3">
                  <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input
                      bsSize="sm"
                      id="phone"
                      name="phone"
                      type="text"
                      value={state.phone}
                      onChange={handleInput("SET_phone")}
                      className="form-control form-control-sm"
                    />
                  </FormGroup>
                </Col>
                <Col md={6} className="px-3">
                  <FormGroup>
                    <Label for="companyEmail">Email</Label>
                    <Input
                      bsSize="sm"
                      id="companyEmail"
                      name="email"
                      type="email"
                      value={state.email}
                      onChange={handleInput("SET_email")}
                      className="form-control form-control-sm"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6} className="px-3">
                  <FormGroup>
                    <Label for="city">city</Label>
                    <Input
                      bsSize="sm"
                      id="city"
                      name="city"
                      type="text"
                      value={state.city}
                      onChange={handleInput("SET_city")}
                      className="form-control form-control-sm"
                    />
                  </FormGroup>
                </Col>
                <Col md={6} className="px-3">
                  <FormGroup>
                    <Label for="state">State</Label>
                    <Input
                      bsSize="sm"
                      id="state"
                      name="state"
                      type="text"
                      value={state.state}
                      onChange={handleInput("SET_state")}
                      className="form-control form-control-sm"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6} className="px-3">
                  <FormGroup>
                    <Label for="zip">Zip</Label>
                    <Input
                      bsSize="sm"
                      id="zip"
                      name="zip"
                      type="text"
                      value={state.zip}
                      onChange={handleInput("SET_zip")}
                      className="form-control form-control-sm"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6} className="px-3">
                  <FormGroup>
                    <Label for="fid">FID/EIN</Label>
                    <Input
                      bsSize="sm"
                      id="fid"
                      name="fid"
                      type="text"
                      value={state.fid}
                      onChange={handleInput("SET_fid")}
                      className="form-control form-control-sm"
                    />
                  </FormGroup>
                </Col>
                <Col md={6} className="px-3">
                  <FormGroup>
                    <Label for="mc">MC</Label>
                    <Input
                      bsSize="sm"
                      id="mc"
                      name="mc"
                      type="text"
                      value={state.mc}
                      onChange={handleInput("SET_mc")}
                      className="form-control form-control-sm"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12} className="px-3">
                  <FormGroup>
                    <Label for="notes">Notes</Label>
                    <Input
                      bsSize="sm"
                      id="notes"
                      name="notes"
                      type="textarea"
                      value={state.notes}
                      onChange={handleInput("SET_notes")}
                      className="form-control form-control-sm"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
            <Col md="6" className="d-flex flex-column justify-content-between">
              <Row>
                <Row>
                  <Col md={6} className="px-3">
                    <FormGroup>
                      <Label className="d-flex">Vendor Type</Label>
                      <Button size="sm" color="outline-primary">
                        <GrFormAdd fontSize={"16px"} /> Add Vendor Type
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg={12} md={6} sm={12} className="px-3">
                    <FormGroup className="mt-4">
                      <Label className="d-flex fw-bold h5">Billing</Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        type="checkbox"
                        checked={state.additonalPayee}
                        onChange={handleCheckboxChange("SET_additonalPayee")}
                      />
                      <Label check>Additional Payee</Label>
                    </FormGroup>
                  </Col>
                </Row>
              </Row>

              <Row>
                <Col
                  lg={12}
                  md={6}
                  sm={12}
                  className="px-3 d-flex justify-content-end"
                >
                  <FormGroup>
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
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default CreateNewVendorPage;
