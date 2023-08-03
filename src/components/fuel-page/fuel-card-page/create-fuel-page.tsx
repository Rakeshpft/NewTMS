import React, { useReducer, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  Container,
  Form,
  Col,
  Row,
  FormGroup,
  Label,
  Button,
  Input,
  Table,
} from "reactstrap";
import { Header } from "../../header";
import Profile from "../../pofile";
import SearchPage from "../../search-page";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

type FormState = {
  cardNumber: string;
  active: string;
  expirationDate: string;
  truck: string;
  notes: string;
};

type FormAction =
  | { type: "SET_cardNumber"; payload: string }
  | { type: "SET_active"; payload: string }
  | { type: "SET_expirationDate"; payload: string }
  | { type: "SET_truck"; payload: string }
  | { type: "SET_notes"; payload: string };

const formReducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case "SET_cardNumber":
      return { ...state, cardNumber: action.payload };
    case "SET_active":
      return { ...state, active: action.payload };
    case "SET_expirationDate":
      return { ...state, expirationDate: action.payload };
    case "SET_truck":
      return { ...state, truck: action.payload };
    case "SET_notes":
      return { ...state, notes: action.payload };
    default:
      return state;
  }
};

const initialState: FormState = {
  cardNumber: "",
  active: "",
  expirationDate: "",
  truck: "",
  notes: "",
};

const CreateFuelPage = () => {
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
        <NavbarBrand>New Fuel Card</NavbarBrand>
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
            Create New Fuel Card
          </h2>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <Row>
                  <Col sm={6}>
                    <FormGroup>
                      <Label for="examplecardNumber">Card Number</Label>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
                        type="text"
                        name="cardNumber"
                        value={formState.cardNumber}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_cardNumber",
                            payload: e.target.value,
                          })
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col sm={6}>
                    <FormGroup tag="fieldset">
                      <legend>Active</legend>
                      <div className="d-flex gap-3">
                        <FormGroup check>
                          <Input name="radio1" type="radio" />
                          <Label check>Yes</Label>
                        </FormGroup>
                        <FormGroup check>
                          <Input name="radio1" type="radio" />
                          <Label check>No</Label>
                        </FormGroup>
                      </div>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col sm={6}>
                    <FormGroup>
                      <Label for="exampleexpirationDate">Expiration Date</Label>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
                        type="date"
                        name="expirationDate"
                        value={formState.expirationDate}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_expirationDate",
                            payload: e.target.value,
                          })
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col sm={6}>
                    <FormGroup>
                      <Label for="exampletruck">Truck</Label>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
                        type="select"
                        name="truck"
                        value={formState.truck}
                        onChange={(e) =>
                          dispatch({
                            type: "SET_truck",
                            payload: e.target.value,
                          })
                        }
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
                  <Col sm={6}>
                    <FormGroup>
                      <Label for="examplenotes">Notes</Label>
                      <Input
                        style={{ color: "black", border: "1px solid #418ECB" }}
                        type="textarea"
                        name="notes"
                        rows="3"
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
                </Row>
                <Row>
                  <Col className="d-flex justify-content-between m-3">
                    <h3>Driver</h3>
                    <Button
                      className="me-3 ps-3 pe-3"
                      style={{
                        color: "black",
                        border: "1px solid #1E5367",
                        backgroundColor: "#8FF086",
                      }}
                    >
                      <BiCheck fontSize={"24px"} />
                      Assign Card
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Table responsive hover className="table-data text-nowrap">
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
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default CreateFuelPage;
