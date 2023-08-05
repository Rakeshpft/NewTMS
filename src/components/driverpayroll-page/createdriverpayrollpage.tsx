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
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { driverpayrollPage } from "../tms-object/driverpayrollpage";

type FormAction =
  | { type: "SET_driver"; payload: string }
  | { type: "SET_partner"; payload: string }
  | { type: "SET_date"; payload: string }
  | { type: "SET_byDelivery"; payload: string }
  | { type: "SET_byPickup"; payload: string };

const formReducer = (
  state: driverpayrollPage,
  action: FormAction
): driverpayrollPage => {
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

const initialState: driverpayrollPage = {
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
        style={{ border: "1px solid #1B56AE", backgroundColor: "#E9F3FB" }}
        className="py-0"
      >
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
          showHambuger={false}
        />
        <NavbarBrand className="fw-bold">New Driver Payroll</NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-3">
          <Profile />
        </div>
      </Navbar>
      <div className="py-2 driverpayrollmain">
        <Container className="mt-4 px-5 py-2">
          <Form onSubmit={handleSubmit} className="driverpayrollitem">
            <Row>
              <Col>
                <Row className="px-5">
                  <Col md={3}>
                    <FormGroup>
                      <Label for="exampleSelect">Driver</Label>
                      <Input
                        name="select"
                        type="select"
                        value={formState.driver}
                        onChange={(e) => {
                          dispatch({
                            type: "SET_driver",
                            payload: e.target.value,
                          });
                        }}
                        style={{
                          color: "black",
                          border: "1px solid #418ECB",
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
                <Row className="px-5">
                  <Col md={3}>
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
                <Row className="px-5">
                  <Col>
                    <Row className="d-flex justify-content-between mt-4">
                      <Col md={2}>
                        <h5
                          style={{ color: "#5E5E5E" }}
                          className="fw-bold mt-3"
                        >
                          Open Balance
                        </h5>
                      </Col>
                      <Col md={2}>
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
                            style={{
                              color: "black",
                              border: "1px solid #418ECB",
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={2}>
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
                            style={{
                              color: "black",
                              border: "1px solid #418ECB",
                            }}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4} className="d-flex mt-4 gap-3">
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
                          <Label
                            check
                            style={{ marginBottom: "0", fontSize: "small" }}
                          >
                            By Pickup Date
                          </Label>
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
                          <Label
                            check
                            style={{ marginBottom: "0", fontSize: "small" }}
                          >
                            By Delivery Date
                          </Label>
                        </FormGroup>
                      </Col>
                      <Col md={2} className="mt-4">
                        <Button
                          className="me-3"
                          size="sm"
                          style={{
                            display: "flex",
                            color: "black",
                            border: "1px solid #1E5367",
                            backgroundColor: "#AAF6A4",
                          }}
                        >
                          <BiCheck fontSize={"16px"} />
                          Apply
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Row className="px-5">
                <Col className="mt-5">
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
                  className="me-3"
                  size="sm"
                  style={{
                    color: "black",
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
                  <RxCross2 fontSize={"16px"} color="red" /> Close
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
