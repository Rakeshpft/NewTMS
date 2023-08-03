import React, { useState } from "react";
import {
  Button,
  Form,
  Row,
  Label,
  Col,
  FormGroup,
  Input,
  Container,
  Nav,
  Navbar,
  NavbarBrand,
} from "reactstrap";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { Header } from "../../header";
import Profile from "../../pofile";
import SearchPage from "../../search-page";

type FormState = {
  companyName: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  mc: string;
  fid: string;
  notes: string;
  stauts: string;
  quickPayFee: string;
  factoring: string;
  credit: string;
  payTerms: string;
  avgDaysToPay: string;
  cutomerType: string;
  directBilling: boolean;
  factoringBilling: boolean;
};

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

const formReducer = (state: FormState, action: FormAction) => {
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

const initialState: FormState = {
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
        <NavbarBrand>Customer</NavbarBrand>
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
          <h3 style={{ color: "rgb(66 111 177)", fontWeight: "bold" }}>
            Create New Customer
          </h3>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="companyName">Company Name</Label>
                  <Input
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
                <FormGroup>
                  <Label for="addressLine1">Address Line1</Label>
                  <Input
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
                <FormGroup>
                  <Label for="addressLine2">Address Line2</Label>
                  <Input
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
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="phone">Phone</Label>
                      <Input
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
                  <Col>
                    <FormGroup>
                      <Label for="email">Email</Label>
                      <Input
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
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="city">City</Label>
                      <Input
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
                  <Col>
                    <FormGroup>
                      <Label for="state">State</Label>
                      <Input
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
                </Row>
                <FormGroup>
                  <Label for="zip">Zip</Label>
                  <Input
                    style={{ color: "black", border: "1px solid #418ECB" }}
                    type="text"
                    value={formState.zip}
                    onChange={(e) => {
                      dispatch({ type: "SET_zip", payload: e.target.value });
                    }}
                  />
                </FormGroup>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="fid">FID/EIN</Label>
                      <Input
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
                  <Col>
                    <FormGroup>
                      <Label for="mc">MC</Label>
                      <Input
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
                <FormGroup>
                  <Label for="notes">Notes</Label>
                  <Input
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
              <Col>
                <Row>
                  <Col>
                    <h5>Customer Type</h5>
                    <FormGroup check inline>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
                        type="checkbox"
                        value={formState.cutomerType}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_cutomerType",
                            payload: e.target.value,
                          })
                        }
                      />
                      <Label check>Broker</Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
                        type="checkbox"
                        value={formState.cutomerType}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_cutomerType",
                            payload: e.target.value,
                          })
                        }
                      />
                      <Label check>Shipper/Reciver</Label>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup tag="fieldset">
                      <h5>Billing</h5>
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
                          <Label check>Direct Billing</Label>
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
                          <Label check>Factoring Billing</Label>
                        </FormGroup>
                      </div>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="quickPayFee">Quick Pay Fee</Label>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
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
                  <Col>
                    <FormGroup>
                      <Label for="factoring">Factoring</Label>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
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
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="stauts">Stauts</Label>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
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
                  <Col>
                    <FormGroup>
                      <Label for="credit">Credit</Label>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
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
                    <FormGroup>
                      <Label for="payTerms">Pay Terms</Label>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
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
                    <FormGroup>
                      <Label for="avgDaysToPay">Avg. Days To Pay</Label>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
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
                    <FormGroup
                      className="d-flex justify-content-end align-self-end mt-5 me-4"
                      style={{ bottom: "0", right: "0" }}
                    >
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
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default CustomerNewPage;
