import React, { useReducer, useState } from "react";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import {
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
import { payments } from "../../tms-object/accountspage";

type FormAction =
  | { type: "SET_payee"; payload: string }
  | { type: "SET_payto"; payload: string }
  | { type: "SET_date"; payload: string }
  | { type: "SET_description"; payload: string }
  | { type: "SET_type"; payload: string }
  | { type: "SET_amount"; payload: string };

const formReducer = (state: payments, action: FormAction): payments => {
  switch (action.type) {
    case "SET_payee":
      return { ...state, payee: action.payload };
    case "SET_payto":
      return { ...state, payto: action.payload };
    case "SET_date":
      return { ...state, date: action.payload };
    case "SET_description":
      return { ...state, description: action.payload };
    case "SET_type":
      return { ...state, type: action.payload };
    case "SET_amount":
      return { ...state, amount: action.payload };
    default:
      return state;
  }
};

const initialState: payments = {
  payee: "",
  payto: "",
  date: "",
  description: "",
  type: "",
  amount: "",
};

const CreatePaymentsPage = () => {
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
        <NavbarBrand className="fw-bold px-4">New Payment</NavbarBrand>
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
                <Label for="exampleSelect">Date</Label>
                <Input
                  bsSize="sm"
                  id="exampleSelect"
                  name="date"
                  type="date"
                  value={state.date}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_date",
                      payload: e.target.value,
                    });
                  }}
                  style={{ color: "black", border: "1px solid #418ECB" }}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="exampleSelect">Payee</Label>
                <Input
                  bsSize="sm"
                  id="exampleSelect"
                  name="select"
                  type="select"
                  value={state.payee}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_payee",
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
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="exampleSelect">Pay To</Label>
                <Input
                  bsSize="sm"
                  id="exampleSelect"
                  name="select"
                  type="select"
                  value={state.payto}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_payto",
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
          <Row className="px-5">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="exampleSelect">Type</Label>
                <Input
                  bsSize="sm"
                  id="exampleSelect"
                  name="select"
                  type="select"
                  value={state.type}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_type",
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
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="exampleAmount">Amount</Label>
                <Input
                  bsSize="sm"
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
          </Row>
          <Row>
            <Col lg={3} md={6} sm={12} className="px-3"></Col>
          </Row>
          <Row className="px-5">
            <Col lg={6} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="exampleNote">Description</Label>
                <Input
                  bsSize="sm"
                  rows="2"
                  type="textarea"
                  id="exampleNote"
                  name="note"
                  value={state.description}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_description",
                      payload: e.target.value,
                    });
                  }}
                  style={{ color: "black", border: "1px solid #418ECB" }}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-5 ">
            <Col
              lg={9}
              md={12}
              sm={12}
              className="px-3 mt-5 d-flex justify-content-end"
            >
              <Button
                size="sm"
                className="me-3"
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

export default CreatePaymentsPage;
