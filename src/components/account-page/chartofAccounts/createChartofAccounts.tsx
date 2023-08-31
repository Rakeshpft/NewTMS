import React, { useReducer, useState } from "react";
import { Chartofaccount } from "../../tms-object/accountspage";
import {
  Navbar,
  NavbarBrand,
  Nav,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { Header } from "../../header";
import Profile from "../../pofile";

type FormAction =
  | { type: "SET_accountType"; payload: string }
  | { type: "SET_parentAccount"; payload: string }
  | { type: "SET_notes"; payload: string }
  | { type: "SET_name"; payload: string }
  | { type: "SET_subAccount"; payload: string };

const formReducer = (state: Chartofaccount, action: FormAction) => {
  switch (action.type) {
    case "SET_accountType":
      return { ...state, accountType: action.payload };
    case "SET_parentAccount":
      return { ...state, parentAccount: action.payload };
    case "SET_notes":
      return { ...state, notes: action.payload };
    case "SET_name":
      return { ...state, name: action.payload };
    case "SET_subAccount":
      return { ...state, subAccount: action.payload };
    default:
      return state;
  }
};

const initialState: Chartofaccount = {
  accountType: "",
  parentAccount: "",
  notes: "",
  name: "",
  subAccount: "",
};

const CreateChartofAccounts = () => {
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
        <NavbarBrand className="fw-bold px-4">New Chart of Account</NavbarBrand>
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
                <Label>Name</Label>
                <Input
                  bsSize="sm"
                  id="exampleSelect"
                  name="select"
                  type="select"
                  value={state.name}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_name",
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
                <Label>Account Type</Label>
                <Input
                  bsSize="sm"
                  id="exampleSelect"
                  name="select"
                  type="select"
                  value={state.accountType}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_accountType",
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
            <Col lg={3} md={6} sm={12} className="mt-4 px-3">
              <FormGroup check inline>
                <Input
                  type="checkbox"
                  value={state.subAccount}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_subAccount",
                      payload: e.target.value,
                    });
                  }}
                />
                <Label check>It's a Sub-Account</Label>
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-5">
            <Col lg={6} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="examplenotes">Notes</Label>
                <Input
                  bsSize="sm"
                  id="examplenotes"
                  name="notes"
                  row="3"
                  type="textarea"
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
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label>Parent Account</Label>
                <Input
                  bsSize="sm"
                  id="exampleSelect"
                  name="select"
                  type="select"
                  value={state.parentAccount}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_parentAccount",
                      payload: e.target.value,
                    });
                  }}
                  style={{ color: "black", border: "1px solid #418ECB" }}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-5">
            <Col sm={12} className="px-3 mt-5 d-flex justify-content-end">
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

export default CreateChartofAccounts;
