import React, { useReducer, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { Header } from "../../header";
import Profile from "../../pofile";
import SearchPage from "../../search-page";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

type FormState = {
  driver: string;
  addnew: string;
  additionalPayee: string;
  fuelCard: string;
  date: string;
  amount: string;
  ifta: string;
  city: string;
  state: string;
  unitGallons: string;
  productCode: string;
  zip: string;
  truck: string;
  trailer: string;
  notes: string;
};

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

const formReducer = (state: FormState, action: FormAction) => {
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

const initialState: FormState = {
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
        <NavbarBrand>New Fuel Transaction</NavbarBrand>
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
            Create New Fuel Transaction
          </h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Row>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="exampledriver">Driver</Label>
                      <Input
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
                  <Col md={3}></Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="exampleaddnew">Additional Payee</Label>
                      <Input
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
                  <Col md={3}>
                    <FormGroup>
                      <Label for="examplefuelCard">Fuel Card</Label>
                      <Input
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
                <Row>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="exampledate">Date</Label>
                      <Input
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
                  <Col md={3}>
                    <FormGroup>
                      <Label for="exampleamount">Amount, $</Label>
                      <Input
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
                  <Col md={3}></Col>
                  <Col md={3} className="mt-4">
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
                <Row>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="examplecity">City</Label>
                      <Input
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
                  <Col md={3}>
                    <FormGroup>
                      <Label for="examplestate">State</Label>
                      <Input
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
                  <Col md={3}>
                    <FormGroup>
                      <Label for="exampleunit">Unit, Gallons</Label>
                      <Input
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
                  <Col md={3}>
                    <FormGroup>
                      <Label for="examplecproductCode">Product Code</Label>
                      <Input
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
                <Row>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="examplezip">Zip</Label>
                      <Input
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
                <Row>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="exampletruck">Truck</Label>
                      <Input
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
                  <Col md={3}>
                    <FormGroup>
                      <Label for="exampletrailer">Trailer</Label>
                      <Input
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
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="examplenotes">Notes</Label>
                      <Input
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
              </Col>
            </Row>
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

export default CreateFuelTransactionPage;
