import React, { useReducer, useState } from "react";
import {
  Chartofaccount,
  initialChartofaccountState,
} from "../../tms-object/accountspage";
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
import { Header } from "../../shared";
import Profile from "../../pofile";
// import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { routes } from "../../routes/routes";

type FormAction =
  | { type: "SET_accountType"; payload: string }
  | { type: "SET_parentAccount"; payload: string }
  | { type: "SET_notes"; payload: string }
  | { type: "SET_name"; payload: string }
  | { type: "SET_subAccount"; payload: boolean };

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
      return { ...state, subAccount: !state.subAccount };
    default:
      return state;
  }
};

const CreateNewChartofAccounts = () => {
  // const history = useHistory();
    const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [state, dispatch] = useReducer(formReducer, initialChartofaccountState);

  const handleInput =
    (type: FormAction["type"]) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      dispatch({ type, payload: event.target.value } as FormAction);
    };

  const handleCheckboxChange =
    (type: FormAction["type"]) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type,
        payload: event.target.checked,
      } as FormAction);
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);
  };

  const handleCancleButton = () => {
    
    {
      navigate(routes.chartOfAccounts);
    }
  };

  return (
    <>
      <Navbar className="formpagenavbar" color="light">
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
      <div className="m-2 load-itemmain">
        <Form onSubmit={handleSubmit} className="load-item container p-4">
          <Row className="px-5">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  bsSize="sm"
                  id="name"
                  name="name"
                  type="select"
                  value={state.name}
                  onChange={handleInput("SET_name")}
                  className="form-control form-control-sm"
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
                <Label for="accountType">Account Type</Label>
                <Input
                  bsSize="sm"
                  id="accountType"
                  name="accountType"
                  type="select"
                  value={state.accountType}
                  onChange={handleInput("SET_accountType")}
                  className="form-control form-control-sm"
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
                  name="subAccount"
                  checked={state.subAccount}
                  onChange={handleCheckboxChange("SET_subAccount")}
                />
                <Label check>It's a Sub-Account</Label>
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-5">
            <Col lg={6} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="notes">Notes</Label>
                <Input
                  bsSize="sm"
                  id="notes"
                  name="notes"
                  row="3"
                  type="textarea"
                  value={state.notes}
                  onChange={handleInput("SET_notes")}
                  className="form-control form-control-sm"
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="parentAccount">Parent Account</Label>
                <Input
                  bsSize="sm"
                  id="parentAccount"
                  name="parentAccount"
                  type="select"
                  value={state.parentAccount}
                  onChange={handleInput("SET_parentAccount")}
                  className="form-control form-control-sm"
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
              <Button size="sm" className="me-3 save-button">
                <BiCheck fontSize={"16px"} />
                Save
              </Button>
              <Button
                size="sm"
                className="cancel-button"
                onClick={handleCancleButton}
              >
                <RxCross2 fontSize={"16px"} color="red" />
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default CreateNewChartofAccounts;
