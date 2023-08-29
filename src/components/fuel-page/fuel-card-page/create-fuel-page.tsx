import React, { useReducer, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
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
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { fuelCard } from "../../tms-object/fuelpage";

type FormAction =
  | { type: "SET_cardNumber"; payload: string }
  | { type: "SET_active"; payload: string }
  | { type: "SET_expirationDate"; payload: string }
  | { type: "SET_truck"; payload: string }
  | { type: "SET_notes"; payload: string };

const formReducer = (state: fuelCard, action: FormAction): fuelCard => {
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

const initialState: fuelCard = {
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
      <Navbar color="light" className="py-0 formpagenavbar">
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
          showHambuger={false}
        />
        <NavbarBrand className="fw-bold px-4">New Fuel Card</NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-3">
          <Profile />
        </div>
      </Navbar>
      <div className="m-2 load-itemmain" style={{ backgroundColor: "#E9F3FB" }}>
        <Form onSubmit={handleSubmit} className="load-item container p-4">
          <Row>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="examplecardNumber">Card Number</Label>
                <Input
                  bsSize="sm"
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
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup tag="fieldset">
                <h6 className="fw-bold">Active</h6>
                <div className="d-flex gap-3">
                  <FormGroup check>
                    <Input name="radio1" type="radio" />
                    <Label
                      check
                      style={{ marginBottom: "0px", fontSize: "small" }}
                    >
                      Yes
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input name="radio1" type="radio" />
                    <Label
                      check
                      style={{ marginBottom: "0px", fontSize: "small" }}
                    >
                      No
                    </Label>
                  </FormGroup>
                </div>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="exampleexpirationDate">Expiration Date</Label>
                <Input
                  bsSize="sm"
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
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="exampletruck">Truck</Label>
                <Input
                  bsSize="sm"
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
            <Col lg={6} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="examplenotes">Notes</Label>
                <Input
                  bsSize="sm"
                  style={{ color: "black", border: "1px solid #418ECB" }}
                  type="textarea"
                  rows="3"
                  name="notes"
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
            <Col className="d-flex justify-content-between mt-4 px-3">
              <h5 className="fw-bold">Driver</h5>
              <Button
                size="sm"
                className="me-3"
                style={{
                  color: "black",
                  border: "1px solid #1E5367",
                  backgroundColor: "#8FF086",
                }}
              >
                <BiCheck fontSize={"16px"} />
                Assign Card
              </Button>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={10} md={10} sm={12} className="px-3">
              <Table
                responsive
                hover
                size="sm"
                className="table-data text-nowrap"
              >
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
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                    <td>@mdo</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-end mt-5 px-3">
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
                <RxCross2 fontSize={"16px"} color="red" /> Close
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default CreateFuelPage;
