import React, { useReducer, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { Header } from "../../header";
import Profile from "../../pofile";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { fuelTransaction } from "../../tms-object/fuelpage";

type FormAction =
  | { type: "SET_driver"; payload: string }
  | { type: "SET_addnew"; payload: string }
  | { type: "SET_additionalPayee"; payload: string }
  | { type: "SET_fuelCard"; payload: string }
  | { type: "SET_date"; payload: string }
  | { type: "SET_amount"; payload: string }
  | { type: "SET_ifta"; payload: string }
  | { type: "SET_city"; payload: string }
  | { type: "SET_state"; payload: string }
  | { type: "SET_unitGallons"; payload: string }
  | { type: "SET_productCode"; payload: string }
  | { type: "SET_zip"; payload: string }
  | { type: "SET_truck"; payload: string }
  | { type: "SET_trailer"; payload: string }
  | { type: "SET_notes"; payload: string };

const formReducer = (
  state: fuelTransaction,
  action: FormAction
): fuelTransaction => {
  switch (action.type) {
    case "SET_driver":
      return { ...state, driver: action.payload };
    case "SET_addnew":
      return { ...state, addnew: action.payload };
    case "SET_additionalPayee":
      return { ...state, additionalPayee: action.payload };
    case "SET_fuelCard":
      return { ...state, fuelCard: action.payload };
    case "SET_date":
      return { ...state, date: action.payload };
    case "SET_amount":
      return { ...state, amount: action.payload };
    case "SET_ifta":
      return { ...state, ifta: action.payload };
    case "SET_city":
      return { ...state, city: action.payload };
    case "SET_state":
      return { ...state, state: action.payload };
    case "SET_unitGallons":
      return { ...state, unitGallons: action.payload };
    case "SET_productCode":
      return { ...state, productCode: action.payload };
    case "SET_zip":
      return { ...state, zip: action.payload };
    case "SET_truck":
      return { ...state, truck: action.payload };
    case "SET_trailer":
      return { ...state, trailer: action.payload };
    case "SET_notes":
      return { ...state, notes: action.payload };
    default:
      return state;
  }
};

const initialState: fuelTransaction = {
  driver: "",
  addnew: "",
  additionalPayee: "",
  fuelCard: "",
  date: "",
  amount: "",
  ifta: "",
  city: "",
  state: "",
  unitGallons: "",
  productCode: "",
  zip: "",
  truck: "",
  trailer: "",
  notes: "",
};

const CreateFuelTransactionPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <>
      <Navbar color="light" className="py-0 formpagenavbar">
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
          showHambuger={false}
        />
        <NavbarBrand className="fw-bold ps-4">New Fuel Transaction</NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-3">
          <Profile />
        </div>
      </Navbar>
      <div className="m-2 load-itemmain" style={{ backgroundColor: "#E9F3FB" }}>
        <Form onSubmit={handleSubmit} className="load-item container p-4">
          <Row className="px-5">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="exampledriver">Driver</Label>
                <Input
                  bsSize="sm"
                  style={{ color: "black", border: "1px solid #418ECB" }}
                  type="text"
                  value={state.driver}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_driver",
                      payload: e.target.value,
                    });
                  }}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3"></Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="exampleaddnew">Additional Payee</Label>
                <Input
                  bsSize="sm"
                  style={{ color: "black", border: "1px solid #418ECB" }}
                  type="text"
                  value={state.addnew}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_addnew",
                      payload: e.target.value,
                    });
                  }}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="examplefuelCard">Fuel Card</Label>
                <Input
                  bsSize="sm"
                  style={{ color: "black", border: "1px solid #418ECB" }}
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
          </Row>
          <Row className="px-5">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="exampledate">Date</Label>
                <Input
                  bsSize="sm"
                  style={{ color: "black", border: "1px solid #418ECB" }}
                  id="exampledate"
                  name="date"
                  type="date"
                  value={state.date}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_date",
                      payload: e.target.value,
                    });
                  }}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="exampleamount">Amount, $</Label>
                <Input
                  bsSize="sm"
                  style={{ color: "black", border: "1px solid #418ECB" }}
                  id="exampleamount"
                  name="amount"
                  type="text"
                  value={state.amount}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_amount",
                      payload: e.target.value,
                    });
                  }}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3"></Col>
            <Col lg={3} md={6} sm={12} className="px-3 mt-4">
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
          <Row className="px-5">
            <Col lg={3} md={6} sm={12} className="px-3">
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
            <Col lg={3} md={6} sm={12} className="px-3">
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
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="exampleunit">Unit, Gallons</Label>
                <Input
                  bsSize="sm"
                  style={{ color: "black", border: "1px solid #418ECB" }}
                  id="exampleunit"
                  name="unitGallons"
                  type="text"
                  value={state.unitGallons}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_unitGallons",
                      payload: e.target.value,
                    });
                  }}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="examplecproductCode">Product Code</Label>
                <Input
                  bsSize="sm"
                  style={{ color: "black", border: "1px solid #418ECB" }}
                  id="examplecproductCode"
                  name="productCode"
                  type="text"
                  value={state.productCode}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_productCode",
                      payload: e.target.value,
                    });
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-5">
            <Col lg={3} md={6} sm={12} className="px-3">
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
          <Row className="px-5">
            <Col lg={3} md={6} sm={12} className="px-3">
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
            <Col lg={3} md={6} sm={12} className="px-3">
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
          </Row>
          <Row className="px-5">
            <Col lg={6} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="examplenotes">Notes</Label>
                <Input
                  bsSize="sm"
                  style={{ color: "black", border: "1px solid #418ECB" }}
                  id="examplenotes"
                  name="notes"
                  type="textarea"
                  rows="3"
                  value={state.notes}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_notes",
                      payload: e.target.value,
                    });
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-5">
            <Col className="d-flex justify-content-end mt-4">
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
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default CreateFuelTransactionPage;
