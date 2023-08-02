import React, { useReducer, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import {
  Container,
  Form,
  Button,
  Col,
  Row,
  FormGroup,
  Input,
  Label,
  Nav,
  Navbar,
  NavbarBrand,
} from "reactstrap";
import { Header } from "../../header";
import Profile from "../../pofile";
import SearchPage from "../../search-page";

type FormState = {
  partner: string;
  driver: string;
  date: string;
  amount: string;
  category: string;
  notes: string;
  settlement: string;
};

type FormAction =
  | { type: "SET_partner"; payload: string }
  | { type: "SET_driver"; payload: string }
  | { type: "SET_date"; payload: string }
  | { type: "SET_amount"; payload: string }
  | { type: "SET_category"; payload: string }
  | { type: "SET_notes"; payload: string }
  | { type: "SET_settlement"; payload: string };

const formReducer = (state: FormState, action: FormAction): FormState => {
  switch (action.type) {
    case "SET_partner":
      return { ...state, partner: action.payload };
    case "SET_driver":
      return { ...state, driver: action.payload };
    case "SET_date":
      return { ...state, date: action.payload };
    case "SET_amount":
      return { ...state, amount: action.payload };
    case "SET_category":
      return { ...state, category: action.payload };
    case "SET_notes":
      return { ...state, notes: action.payload };
    case "SET_settlement":
      return { ...state, settlement: action.payload };
    default:
      return state;
  }
};

const initialState: FormState = {
  partner: "",
  driver: "",
  date: "",
  amount: "",
  category: "",
  notes: "",
  settlement: "",
};

const CreateBillingPage = () => {
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
        <NavbarBrand>New Billing Entry</NavbarBrand>
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
            Create Billing Entry
          </h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="exampleSelect">Partner</Label>
                    <Input
                      id="exampleSelect"
                      name="select"
                      type="select"
                      value={state.partner}
                      onChange={(e) => {
                        dispatch({
                          type: "SET_partner",
                          payload: e.target.value,
                        });
                      }}
                      style={{ color: "black", border: "1px solid #418ECB" }}
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="exampleSelect">Driver</Label>
                    <Input
                      id="exampleSelect"
                      name="select"
                      type="select"
                      value={state.driver}
                      onChange={(e) => {
                        dispatch({
                          type: "SET_driver",
                          payload: e.target.value,
                        });
                      }}
                      style={{ color: "black", border: "1px solid #418ECB" }}
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col>
                  <FormGroup>
                    <Label for="exampleSelect">Date</Label>
                    <Input
                      id="exampleSelect"
                      name="select"
                      type="select"
                      value={state.date}
                      onChange={(e) => {
                        dispatch({
                          type: "SET_date",
                          payload: e.target.value,
                        });
                      }}
                      style={{ color: "black", border: "1px solid #418ECB" }}
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
                <Col md={3}>
                  <FormGroup>
                    <Label for="exampleAmount">Amount</Label>
                    <Input
                      type="text"
                      id="exampleAmount"
                      name="amount"
                      placeholder="$"
                      value={state.amount}
                      onChange={(e) => {
                        dispatch({
                          type: "SET_amount",
                          payload: e.target.value,
                        });
                      }}
                      style={{ color: "black", border: "1px solid #418ECB" }}
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="exampleSelect">Category</Label>
                    <Input
                      id="exampleSelect"
                      name="select"
                      type="select"
                      value={state.category}
                      onChange={(e) => {
                        dispatch({
                          type: "SET_category",
                          payload: e.target.value,
                        });
                      }}
                      style={{ color: "black", border: "1px solid #418ECB" }}
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={3}> </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleSettlement">
                      Settlement Description
                    </Label>
                    <Input
                      rows="2"
                      type="textarea"
                      id="exampleSettlement"
                      name="settlement"
                      value={state.settlement}
                      onChange={(e) => {
                        dispatch({
                          type: "SET_settlement",
                          payload: e.target.value,
                        });
                      }}
                      style={{ color: "black", border: "1px solid #418ECB" }}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="exampleNote">Notes</Label>
                    <Input
                      rows="2"
                      type="textarea"
                      id="exampleNote"
                      name="note"
                      value={state.notes}
                      onChange={(e) => {
                        dispatch({
                          type: "SET_notes",
                          payload: e.target.value,
                        });
                      }}
                      style={{ color: "black", border: "1px solid #418ECB" }}
                    />
                  </FormGroup>
                </Col>
              </Row>
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

export default CreateBillingPage;
