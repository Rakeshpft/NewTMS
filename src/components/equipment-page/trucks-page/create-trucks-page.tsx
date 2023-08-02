import React, { useReducer, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  Container,
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
import SearchPage from "../../search-page";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

type FormState = {
  unit: string;
  vin: string;
  ELDprovider: string;
  ELDid: string;
  year: string;
  make: string;
  ownership: string;
  modal: string;
  purchaseDate: string;
  purchasePrice: string;
  driver: string;
  plate: string;
  plateState: string;
  notes: string;
  history: string;
};

type FormAction =
  | { type: "SET_unit"; payload: string }
  | { type: "SET_vin"; payload: string }
  | { type: "SET_ELDprovider"; payload: string }
  | { type: "SET_ELDid"; payload: string }
  | { type: "SET_year"; payload: string }
  | { type: "SET_make"; payload: string }
  | { type: "SET_ownership"; payload: string }
  | { type: "SET_modal"; payload: string }
  | { type: "SET_purchaseDate"; payload: string }
  | { type: "SET_purchasePrice"; payload: string }
  | { type: "SET_driver"; payload: string }
  | { type: "SET_plate"; payload: string }
  | { type: "SET_plateState"; payload: string }
  | { type: "SET_notes"; payload: string }
  | { type: "SET_history"; payload: string };

const formReducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case "SET_unit":
      return { ...state, unit: action.payload };
    case "SET_vin":
      return { ...state, vin: action.payload };
    case "SET_ELDprovider":
      return { ...state, ELDprovider: action.payload };
    case "SET_ELDid":
      return { ...state, ELDid: action.payload };
    case "SET_year":
      return { ...state, year: action.payload };
    case "SET_make":
      return { ...state, make: action.payload };
    case "SET_ownership":
      return { ...state, ownership: action.payload };
    case "SET_modal":
      return { ...state, modal: action.payload };
    case "SET_purchaseDate":
      return { ...state, purchaseDate: action.payload };
    case "SET_purchasePrice":
      return { ...state, purchasePrice: action.payload };
    case "SET_driver":
      return { ...state, driver: action.payload };
    case "SET_plate":
      return { ...state, plate: action.payload };
    case "SET_plateState":
      return { ...state, plateState: action.payload };
    case "SET_notes":
      return { ...state, notes: action.payload };
    case "SET_history":
      return { ...state, history: action.payload };
    default:
      return state;
  }
};

const initialState: FormState = {
  unit: "",
  vin: "",
  ELDprovider: "",
  ELDid: "",
  year: "",
  make: "",
  ownership: "",
  modal: "",
  purchaseDate: "",
  purchasePrice: "",
  driver: "",
  plate: "",
  plateState: "",
  notes: "",
  history: "",
};

const CreateTruckPage = () => {
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
        <NavbarBrand>New Truck</NavbarBrand>
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
            Create New Truck
          </h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Row>
                  <Col sm={3}>
                    <FormGroup>
                      <Label for="exampleunit">Unit</Label>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
                        type="text"
                        value={state.unit}
                        onChange={(e) => {
                          dispatch({
                            type: "SET_unit",
                            payload: e.target.value,
                          });
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm={3}>
                    <FormGroup>
                      <Label>VIN</Label>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
                        type="text"
                        value={state.vin}
                        onChange={(e) => {
                          dispatch({
                            type: "SET_vin",
                            payload: e.target.value,
                          });
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm={3}>
                    <FormGroup>
                      <Label for="exampleSelect">ELD Provider</Label>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
                        type="select"
                        id="exampleSelect"
                        name="select"
                        value={state.ELDprovider}
                        onChange={(e) => {
                          dispatch({
                            type: "SET_ELDprovider",
                            payload: e.target.value,
                          });
                        }}
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col sm={3}>
                    <FormGroup>
                      <Label>ELD ID</Label>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
                        type="text"
                        value={state.ELDid}
                        onChange={(e) => {
                          dispatch({
                            type: "SET_ELDid",
                            payload: e.target.value,
                          });
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm={3}>
                    <FormGroup>
                      <Label for="exampleyear">Year</Label>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
                        id="exampleyear"
                        name="year"
                        type="text"
                        value={state.year}
                        onChange={(e) => {
                          dispatch({
                            type: "SET_year",
                            payload: e.target.value,
                          });
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm={3}>
                    <FormGroup>
                      <Label for="examplemake">Make</Label>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
                        id="examplemake"
                        name="make"
                        type="text"
                        value={state.make}
                        onChange={(e) => {
                          dispatch({
                            type: "SET_make",
                            payload: e.target.value,
                          });
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm={3}>
                    <FormGroup>
                      <Label for="exampleSelect">OwnerShip</Label>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
                        type="select"
                        id="exampleSelect"
                        name="select"
                        value={state.ownership}
                        onChange={(e) => {
                          dispatch({
                            type: "SET_ownership",
                            payload: e.target.value,
                          });
                        }}
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col sm={3}></Col>
                </Row>
                <Row>
                  <Col sm={3}>
                    <FormGroup>
                      <Label for="examplemodal">Modal</Label>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
                        id="examplemodal"
                        name="modal"
                        type="text"
                        value={state.modal}
                        onChange={(e) => {
                          dispatch({
                            type: "SET_modal",
                            payload: e.target.value,
                          });
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm={3}></Col>
                  <Col sm={3}>
                    <FormGroup>
                      <Label for="examplepurchaseDate">Purchase Date</Label>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
                        id="examplepurchaseDate"
                        name="purchaseDate"
                        type="date"
                        value={state.purchaseDate}
                        onChange={(e) => {
                          dispatch({
                            type: "SET_purchaseDate",
                            payload: e.target.value,
                          });
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col sm={3}>
                    <FormGroup>
                      <Label for="examplepurchaseprice">Purchase Price</Label>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
                        id="examplepurchaseprice"
                        name="purchaseprice"
                        type="text"
                        value={state.purchasePrice}
                        onChange={(e) => {
                          dispatch({
                            type: "SET_purchasePrice",
                            payload: e.target.value,
                          });
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm={3}>
                    <FormGroup>
                      <Label for="exampledriver">Driver</Label>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
                        id="exampledriver"
                        name="driver"
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
                  <Col sm={3}>
                    <FormGroup>
                      <Label for="exampleSelect">Plate</Label>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
                        type="select"
                        id="exampleSelect"
                        name="select"
                        value={state.plate}
                        onChange={(e) => {
                          dispatch({
                            type: "SET_plate",
                            payload: e.target.value,
                          });
                        }}
                      >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm={3}>
                    <FormGroup>
                      <Label for="exampleplateState">Plate State</Label>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
                        id="exampleplateState"
                        name="plateState"
                        type="text"
                        value={state.plateState}
                        onChange={(e) => {
                          dispatch({
                            type: "SET_plateState",
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
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="examplehistory">Histoy</Label>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
                        id="examplehistory"
                        name="history"
                        type="textarea"
                        rows="3"
                        value={state.history}
                        onChange={(e) => {
                          dispatch({
                            type: "SET_history",
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

export default CreateTruckPage;
