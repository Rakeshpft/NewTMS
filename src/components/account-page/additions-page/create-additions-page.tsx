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
import { additionsPage } from "../../tms-object/accountspage";

type FormAction =
  | { type: "SET_type"; payload: string }
  | { type: "SET_vendor"; payload: string }
  | { type: "SET_driver"; payload: string }
  | { type: "SET_date"; payload: string }
  | { type: "SET_amount"; payload: string }
  | { type: "SET_category"; payload: string }
  | { type: "SET_notes"; payload: string }
  | { type: "SET_settlement"; payload: string };

const formReducer = (
  state: additionsPage,
  action: FormAction
): additionsPage => {
  switch (action.type) {
    case "SET_type":
      return { ...state, type: action.payload };
    case "SET_vendor":
      return { ...state, type: action.payload };
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

const initialState: additionsPage = {
  type: "",
  vendor: "",
  driver: "",
  date: "",
  amount: "",
  category: "",
  notes: "",
  settlement: "",
};

const CreateAdditionsPage = () => {
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
        <NavbarBrand className="fw-bold ps-4">
          New Additions/Deductions Entry
        </NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-3">
          <Profile />
        </div>
      </Navbar>
      <div className="m-2 load-itemmain" style={{ backgroundColor: "#E9F3FB" }}>
        <Form onSubmit={handleSubmit} className="load-item container p-4">
          <Row className="px-5">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup tag="fieldset">
                <legend className="col-form-label col-sm-2 fw-bold">
                  Type
                </legend>
                <Col sm={10}>
                  <FormGroup check inline>
                    <Input name="radio2" type="radio" />
                    <Label
                      check
                      style={{
                        marginBottom: "0px",
                        fontSize: "small",
                      }}
                    >
                      Addition
                    </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input name="radio2" type="radio" />
                    <Label
                      check
                      style={{
                        marginBottom: "0px",
                        fontSize: "small",
                      }}
                    >
                      Deduction
                    </Label>
                  </FormGroup>
                </Col>
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="exampleSelect">Driver</Label>
                <Input
                  bsSize="sm"
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
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="exampleSelect">Vendor</Label>
                <Input
                  bsSize="sm"
                  id="exampleSelect"
                  name="select"
                  type="select"
                  value={state.vendor}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_vendor",
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
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="exampleSelect">Date</Label>
                <Input
                  bsSize="sm"
                  id="exampleSelect"
                  name="select"
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
                <Label for="exampleSelect">Category</Label>
                <Input
                  bsSize="sm"
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
          </Row>
          <Row className="px-5">
            <Col lg={6} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="exampleNote">Notes</Label>
                <Input
                  bsSize="sm"
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
          <Row className="px-5">
            <Col lg={6} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="exampleSettlement">
                  Settlement Description(Optional)
                </Label>
                <Input
                  bsSize="sm"
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
            <Col lg={6} md={6} sm={12} className="px-3 mt-5">
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

export default CreateAdditionsPage;
