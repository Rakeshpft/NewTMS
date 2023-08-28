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
import { vendor } from "../../tms-object/partners";

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
  | { type: "SET_additonalPayee"; payload: string };

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
      return { ...state, additonalPayee: action.payload };
    default:
      return state;
  }
};

const initialState: vendor = {
  companyName: "",
  addressLine1: "",
  addressLine2: "",
  phone: "",
  email: "",
  city: "",
  state: "",
  zip: "",
  fid: "",
  mc: "",
  notes: "",
  additonalPayee: "",
};

const VendorNewPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);
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
        <NavbarBrand className="fw-bold ps-4">New Vendor</NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-3">
          <Profile />
        </div>
      </Navbar>
      <div className="m-2 load-itemmain" style={{ backgroundColor: "#E9F3FB" }}>
        <Form className="load-item container p-4" onSubmit={handleSubmit}>
          <Row>
            <Col className="px-5">
              <Row>
                <Col lg={12} md={12} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="companyName">Company Name</Label>
                    <Input
                      bsSize="sm"
                      id="companyName"
                      name="text"
                      type="text"
                      value={state.companyName}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_companyName",
                          payload: e.target.value,
                        })
                      }
                      className="form-control form-control-sm"
                      style={{ color: "black", border: "1px solid #418ECB" }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg={12} md={12} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="companyAddress">Address Line 1</Label>
                    <Input
                      bsSize="sm"
                      id="companyAddress"
                      name="text"
                      type="text"
                      value={state.addressLine1}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_addressLine1",
                          payload: e.target.value,
                        })
                      }
                      className="form-control form-control-sm"
                      style={{ color: "black", border: "1px solid #418ECB" }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg={12} md={12} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="companyAddress">Address Line 2</Label>
                    <Input
                      bsSize="sm"
                      id="companyAddress"
                      name="text"
                      type="text"
                      value={state.addressLine2}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_addressLine2",
                          payload: e.target.value,
                        })
                      }
                      className="form-control form-control-sm"
                      style={{ color: "black", border: "1px solid #418ECB" }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input
                      bsSize="sm"
                      id="phone"
                      name="text"
                      type="text"
                      value={state.phone}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_phone",
                          payload: e.target.value,
                        })
                      }
                      className="form-control form-control-sm"
                      style={{
                        color: "black",
                        border: "1px solid #418ECB",
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg={6} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="companyEmail">Email</Label>
                    <Input
                      bsSize="sm"
                      id="companyEmail"
                      name="email"
                      type="email"
                      value={state.email}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_email",
                          payload: e.target.value,
                        })
                      }
                      className="form-control form-control-sm"
                      style={{
                        color: "black",
                        border: "1px solid #418ECB",
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="city">city</Label>
                    <Input
                      bsSize="sm"
                      id="city"
                      name="text"
                      type="text"
                      value={state.city}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_city",
                          payload: e.target.value,
                        })
                      }
                      className="form-control form-control-sm"
                      style={{
                        color: "black",
                        border: "1px solid #418ECB",
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg={6} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="state">State</Label>
                    <Input
                      bsSize="sm"
                      id="state"
                      name="text"
                      type="text"
                      value={state.state}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_state",
                          payload: e.target.value,
                        })
                      }
                      className="form-control form-control-sm"
                      style={{
                        color: "black",
                        border: "1px solid #418ECB",
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="cityZip">Zip</Label>
                    <Input
                      bsSize="sm"
                      id="cityZip"
                      name="text"
                      type="text"
                      value={state.zip}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_zip",
                          payload: e.target.value,
                        })
                      }
                      className="form-control form-control-sm"
                      style={{
                        color: "black",
                        border: "1px solid #418ECB",
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="fid">FID/EIN</Label>
                    <Input
                      bsSize="sm"
                      id="fid"
                      name="text"
                      type="text"
                      value={state.fid}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_fid",
                          payload: e.target.value,
                        })
                      }
                      className="form-control form-control-sm"
                      style={{
                        color: "black",
                        border: "1px solid #418ECB",
                      }}
                    />
                  </FormGroup>
                </Col>
                <Col lg={6} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="mc">MC</Label>
                    <Input
                      bsSize="sm"
                      id="mc"
                      name="text"
                      type="text"
                      value={state.mc}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_mc",
                          payload: e.target.value,
                        })
                      }
                      className="form-control form-control-sm"
                      style={{
                        color: "black",
                        border: "1px solid #418ECB",
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg={12} md={12} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="Notes">Notes</Label>
                    <Input
                      bsSize="sm"
                      id="Notes"
                      name="text"
                      type="textarea"
                      value={state.notes}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_notes",
                          payload: e.target.value,
                        })
                      }
                      className="form-control form-control-sm"
                      style={{ color: "black", border: "1px solid #418ECB" }}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
            <Col>
              <Row>
                <Col lg={12} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="exampleSelect" className="d-flex">
                      Vendor Type
                    </Label>
                    <Button
                      size="sm"
                      style={{
                        color: "black",
                        backgroundColor: "#418ECB",
                        border: "1px solid #1E5367",
                      }}
                    >
                      <GrFormAdd fontSize={"16px"} /> Vendor Type
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg={12} md={6} sm={12} className="px-3">
                  <FormGroup className="mt-4">
                    <h5 className="fw-bold"> Billing </h5>
                  </FormGroup>
                  <FormGroup check>
                    <Input type="checkbox" />
                    <Label
                      check
                      style={{ marginBottom: "0px", fontSize: "small" }}
                    >
                      Additional Payee
                    </Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="position-absolute top-5">
                <Col lg={12} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Button
                      className="me-3 "
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

export default VendorNewPage;
