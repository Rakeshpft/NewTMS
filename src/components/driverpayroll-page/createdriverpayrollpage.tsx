import React, { useReducer, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  Container,
  Form,
  Row,
  FormGroup,
  Input,
  Label,
  Col,
  Button,
  Table,
} from "reactstrap";
import { Header } from "../header";
import Profile from "../pofile";
import SearchPage from "../search-page";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

type FormState = {
  driver: string;
  partner: string;
  date: string;
  byDelivery: string;
  byPickup: string;
};

type FormAction =
  | { type: "SET_driver"; payload: string }
  | { type: "SET_partner"; payload: string }
  | { type: "SET_date"; payload: string }
  | { type: "SET_byDelivery"; payload: string }
  | { type: "SET_byPickup"; payload: string };

const formReducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case "SET_driver":
      return { ...state, driver: action.payload };
    case "SET_partner":
      return { ...state, partner: action.payload };
    case "SET_date":
      return { ...state, date: action.payload };
    case "SET_byDelivery":
      return { ...state, byDelivery: action.payload };
    case "SET_byPickup":
      return { ...state, byPickup: action.payload };
    default:
      return state;
  }
};

const initialState: FormState = {
  driver: "",
  partner: "",
  date: "",
  byDelivery: "",
  byPickup: "",
};

const CreateDriverPayrollPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formState, dispatch] = useReducer(formReducer, initialState);

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
        <NavbarBrand>Driver Payroll</NavbarBrand>
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
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col sm={3}>
                <FormGroup>
                  <Label for="exampleSelect">Driver</Label>
                  <Input
                    id="exampleSelect"
                    name="select"
                    type="select"
                    value={formState.driver}
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
            </Row>
            <Row>
              <Col sm={3}>
                <FormGroup>
                  <Label for="exampleSelect">Partner</Label>
                  <Input
                    id="exampleSelect"
                    name="select"
                    type="select"
                    value={formState.partner}
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
            </Row>
            <Row>
              <Col sm={3}>
                <h3>Open Balance</h3>
              </Col>
              <Col sm={3} className="d-flex gap-3">
                <FormGroup>
                  <Label for="exampleDate">Date Range:From</Label>
                  <Input
                    id="exampleDate"
                    type="date"
                    placeholder="select date"
                    value={formState.date}
                    onChange={(e) => {
                      dispatch({
                        type: "SET_date",
                        payload: e.target.value,
                      });
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="exampleDate">Date Range:To</Label>
                  <Input
                    id="exampleDate"
                    type="date"
                    placeholder="select date"
                    value={formState.date}
                    onChange={(e) => {
                      dispatch({
                        type: "SET_date",
                        payload: e.target.value,
                      });
                    }}
                  />
                </FormGroup>
              </Col>
              <Col sm={3} className="d-flex gap-3">
                <FormGroup check>
                  <Input
                    name="radio2"
                    type="radio"
                    value={formState.byPickup}
                    onChange={(e) => {
                      dispatch({
                        type: "SET_byPickup",
                        payload: e.target.value,
                      });
                    }}
                  />
                  <Label check>By Pickup Date</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    name="radio2"
                    type="radio"
                    value={formState.byDelivery}
                    onChange={(e) => {
                      dispatch({
                        type: "SET_byDelivery",
                        payload: e.target.value,
                      });
                    }}
                  />
                  <Label check>By Delivery Date</Label>
                </FormGroup>
                <div className="gap-2">
                  <Button
                    className="me-3 ps-3 pe-3"
                    style={{
                      display: "flex",
                      color: "black",
                      border: "1px solid #1E5367",
                      backgroundColor: "#AAF6A4",
                    }}
                  >
                    <BiCheck fontSize={"24px"} />
                    Apply
                  </Button>
                </div>
              </Col>
              <Row>
                <Col className="m-3">
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Driver</th>
                        <th>Assign On</th>
                        <th>Returned On</th>
                        <th>Equipment Owner</th>
                        <th>*</th>
                      </tr>
                    </thead>
                    <tbody>
                      <p>No records</p>
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <div className="d-flex justify-content-end">
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
                  <RxCross2 fontSize={"21px"} color="red" /> Close
                </Button>
              </div>
            </Row>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default CreateDriverPayrollPage;
