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
import { Header } from "../../shared";
import Profile from "../../pofile";
import { initialPaymentState, payments } from "../../tms-object/accountspage";
// import { routes } from "../../routes/routes";
// import { useHistory } from "react-router-dom";
import {  useNavigate } from 'react-router-dom';

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

const CreateNewPaymentsPage = () => {
  // const history = useHistory();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [state, dispatch] = useReducer(formReducer, initialPaymentState);

  const handleInput =
    (type: FormAction["type"]) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      dispatch({ type, payload: event.target.value });
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);
  };

  const handleCancleButton = () => {
    // {
    //   history.location.pathname === routes.dashboard
    //     ? history.push(routes.paymentsPage)
    //     : history.goBack();
    // }
    {
      
      navigate(-1);
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
        <NavbarBrand className="fw-bold px-4">New Payment</NavbarBrand>
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
                <Label for="date">Date</Label>
                <Input
                  bsSize="sm"
                  id="date"
                  name="date"
                  type="date"
                  value={state.date}
                  onChange={handleInput("SET_date")}
                  className="form-control form-control-sm"
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="payee">Payee</Label>
                <Input
                  bsSize="sm"
                  id="payee"
                  name="payee"
                  type="select"
                  value={state.payee}
                  onChange={handleInput("SET_payee")}
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
                <Label for="payto">Pay To</Label>
                <Input
                  bsSize="sm"
                  id="payto"
                  name="payto"
                  type="select"
                  value={state.payto}
                  onChange={handleInput("SET_payto")}
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
          </Row>
          <Row className="px-5">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="type">Type</Label>
                <Input
                  bsSize="sm"
                  id="type"
                  name="type"
                  type="select"
                  value={state.type}
                  onChange={handleInput("SET_type")}
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
                <Label for="amount">Amount</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  id="amount"
                  name="amount"
                  placeholder="$"
                  value={state.amount}
                  onChange={handleInput("SET_amount")}
                  className="form-control form-control-sm"
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
                <Label for="description">Description</Label>
                <Input
                  bsSize="sm"
                  rows="2"
                  type="textarea"
                  id="description"
                  name="description"
                  value={state.description}
                  onChange={handleInput("SET_description")}
                  className="form-control form-control-sm"
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
              <Button size="sm" className="me-3 save-button">
                <BiCheck fontSize={"16px"} />
                Save
              </Button>
              <Button
                size="sm"
                className="cancel-button"
                onClick={handleCancleButton}
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

export default CreateNewPaymentsPage;
