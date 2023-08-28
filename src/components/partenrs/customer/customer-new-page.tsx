import React, { useState } from "react";
import {
  Button,
  Form,
  Row,
  Label,
  Col,
  FormGroup,
  Input,
  Nav,
  Navbar,
  NavbarBrand,
} from "reactstrap";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { Header } from "../../header";
import Profile from "../../pofile";
import { customer } from "../../tms-object/partners";

type FormAction =
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
  | { type: "SET_cutomerType"; payload: string }
  | { type: "SET_directBilling"; payload: boolean }
  | { type: "SET_factoringBilling"; payload: boolean };

const formReducer = (state: customer, action: FormAction): customer => {
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
    case "SET_cutomerType":
      return { ...state, cutomerType: action.payload };
    case "SET_directBilling":
      return { ...state, directBilling: action.payload };
    case "SET_factoringBilling":
      return { ...state, factoringBilling: action.payload };
    default:
      return state;
  }
};

const initialState: customer = {
  companyName: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  email: "",
  mc: "",
  fid: "",
  notes: "",
  stauts: "",
  quickPayFee: "",
  factoring: "",
  credit: "",
  payTerms: "",
  avgDaysToPay: "",
  cutomerType: "",
  directBilling: false,
  factoringBilling: false,
};
const CustomerNewPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formState, dispatch] = React.useReducer(formReducer, initialState);

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
        <NavbarBrand className="fw-bold ps-4">New Customer</NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-3">
          <Profile />
        </div>
      </Navbar>
      <div className="m-2 load-itemmain" style={{ backgroundColor: "#E9F3FB" }}>
        <Form onSubmit={handleSubmit} className="load-item container p-4">
          <Row className="px-5">
            <Col lg={6} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="companyName">Company Name</Label>
                <Input
                  bsSize="sm"
                  style={{ color: "black", border: "1px solid #418ECB" }}
                  type="text"
                  value={formState.companyName}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_companyName",
                      payload: e.target.value,
                    })
                  }
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <h6 className="fw-bold">Customer Type</h6>
              <FormGroup check inline>
                <Input
                  style={{
                    color: "black",
                    border: "1px solid #418ECB",
                  }}
                  type="checkbox"
                  value={formState.cutomerType}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_cutomerType",
                      payload: e.target.value,
                    })
                  }
                />
                <Label check style={{ marginBottom: "0px", fontSize: "small" }}>
                  Broker
                </Label>
              </FormGroup>
              <FormGroup check inline>
                <Input
                  style={{
                    color: "black",
                    border: "1px solid #418ECB",
                  }}
                  type="checkbox"
                  value={formState.cutomerType}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_cutomerType",
                      payload: e.target.value,
                    })
                  }
                />
                <Label check style={{ marginBottom: "0px", fontSize: "small" }}>
                  Shipper/Receiver
                </Label>
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup tag="fieldset">
                <h6 className="fw-bold">Billing</h6>
                <div className="d-flex gap-2">
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
                      style={{ marginBottom: "0px", fontSize: "small" }}
                    >
                      Direct Billing
                    </Label>
                  </FormGroup>
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
                      style={{ marginBottom: "0px", fontSize: "small" }}
                    >
                      Factoring
                    </Label>
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
                  style={{ color: "black", border: "1px solid #418ECB" }}
                  type="text"
                  value={formState.addressLine1}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_addressLine1",
                      payload: e.target.value,
                    })
                  }
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
                  style={{ color: "black", border: "1px solid #418ECB" }}
                  type="text"
                  value={formState.addressLine2}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_addressLine2",
                      payload: e.target.value,
                    })
                  }
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="quickPayFee">Quick Pay Fee</Label>
                <Input
                  bsSize="sm"
                  style={{
                    color: "black",
                    border: "1px solid #418ECB",
                  }}
                  type="text"
                  value={formState.quickPayFee}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_quickPayFee",
                      payload: e.target.value,
                    })
                  }
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="factoring">Factoring</Label>
                <Input
                  bsSize="sm"
                  style={{
                    color: "black",
                    border: "1px solid #418ECB",
                  }}
                  type="text"
                  value={formState.factoring}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_factoring",
                      payload: e.target.value,
                    })
                  }
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
                  style={{ color: "black", border: "1px solid #418ECB" }}
                  type="text"
                  value={formState.phone}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_phone",
                      payload: e.target.value,
                    })
                  }
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  bsSize="sm"
                  style={{ color: "black", border: "1px solid #418ECB" }}
                  type="email"
                  value={formState.email}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_email",
                      payload: e.target.value,
                    })
                  }
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="stauts">Status</Label>
                <Input
                  bsSize="sm"
                  style={{
                    color: "black",
                    border: "1px solid #418ECB",
                  }}
                  type="text"
                  value={formState.stauts}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_stauts",
                      payload: e.target.value,
                    })
                  }
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="credit">Credit</Label>
                <Input
                  bsSize="sm"
                  style={{
                    color: "black",
                    border: "1px solid #418ECB",
                  }}
                  type="text"
                  value={formState.credit}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_credit",
                      payload: e.target.value,
                    })
                  }
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
                  style={{ color: "black", border: "1px solid #418ECB" }}
                  type="text"
                  value={formState.city}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_city",
                      payload: e.target.value,
                    })
                  }
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="state">State</Label>
                <Input
                  bsSize="sm"
                  style={{ color: "black", border: "1px solid #418ECB" }}
                  type="text"
                  value={formState.state}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_state",
                      payload: e.target.value,
                    })
                  }
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3"></Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="payTerms">Pay Terms</Label>
                <Input
                  bsSize="sm"
                  style={{
                    color: "black",
                    border: "1px solid #418ECB",
                  }}
                  type="text"
                  value={formState.payTerms}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_payTerms",
                      payload: e.target.value,
                    })
                  }
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
                  style={{ color: "black", border: "1px solid #418ECB" }}
                  type="text"
                  value={formState.zip}
                  onChange={(e) => {
                    dispatch({ type: "SET_zip", payload: e.target.value });
                  }}
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
                  style={{
                    color: "black",
                    border: "1px solid #418ECB",
                  }}
                  type="text"
                  value={formState.avgDaysToPay}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_avgDaysToPay",
                      payload: e.target.value,
                    })
                  }
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
                  style={{ color: "black", border: "1px solid #418ECB" }}
                  type="text"
                  value={formState.fid}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_fid",
                      payload: e.target.value,
                    })
                  }
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="mc">MC</Label>
                <Input
                  bsSize="sm"
                  style={{ color: "black", border: "1px solid #418ECB" }}
                  type="text"
                  value={formState.mc}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_mc",
                      payload: e.target.value,
                    })
                  }
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
                  style={{ color: "black", border: "1px solid #418ECB" }}
                  type="textarea"
                  value={formState.notes}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_notes",
                      payload: e.target.value,
                    })
                  }
                />
              </FormGroup>
            </Col>
            <Col lg={6} md={6} sm={12} className="px-3">
              <FormGroup
                className="d-flex justify-content-end align-self-center mt-5"
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
                  <RxCross2 fontSize={"16px"} color="red" /> Cancel
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default CustomerNewPage;
