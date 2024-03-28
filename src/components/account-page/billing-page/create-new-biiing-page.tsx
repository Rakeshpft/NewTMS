import React, { useReducer, useState } from "react";
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
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { Header } from "../../shared";
import Profile from "../../pofile";
import {
  billingEntryPage,
  initialBillingState,
} from "../../tms-object/accountspage";
// import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { routes } from "../../routes/routes";

type FormAction =
  | { type: "SET_partner"; payload: string }
  | { type: "SET_driver"; payload: string }
  | { type: "SET_date"; payload: string }
  | { type: "SET_amount"; payload: number }
  | { type: "SET_category"; payload: string }
  | { type: "SET_notes"; payload: string }
  | { type: "SET_settlement"; payload: string };

const formReducer = (
  state: billingEntryPage,
  action: FormAction
): billingEntryPage => {
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

const CreateNewBillingPage = () => {
  // const history = useHistory();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [state, dispatch] = useReducer(formReducer, initialBillingState);

  const handleInput =
    (type: FormAction["type"]) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | any
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
    //     ? history.push(routes.billingPage)
    //     : history.goBack();
    // }
    {
      navigate(routes.billingPage);
    }
  };

  return (
    <>
      <Navbar color="light" className="formpagenavbar">
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
          showHambuger={false}
        />
        <NavbarBrand className="fw-bold px-4">New Billing Entry</NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-3">
          <Profile />
        </div>
      </Navbar>
      <div className="m-2 load-itemmain">
        <Form onSubmit={handleSubmit} className="load-item container p-4">
          <Row className="px-5">
            <Col lg={3} md={6} sm={12} className="px-4">
              <FormGroup>
                <Label for="partner">Partner</Label>
                <Input
                  bsSize="sm"
                  id="partner"
                  name="partner"
                  type="select"
                  value={state.partner}
                  onChange={handleInput("SET_partner")}
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
            <Col lg={3} md={6} sm={12} className="px-4">
              <FormGroup>
                <Label for="driver">Driver</Label>
                <Input
                  bsSize="sm"
                  id="driver"
                  name="driver"
                  type="select"
                  value={state.driver}
                  onChange={handleInput("SET_driver")}
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
            <Col lg={3} md={6} sm={12} className="px-4">
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
          </Row>
          <Row className="px-5">
            <Col lg={3} md={6} sm={12} className="px-4">
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
            <Col lg={3} md={6} sm={12} className="px-4">
              <FormGroup>
                <Label for="category">Category</Label>
                <Input
                  bsSize="sm"
                  id="category"
                  name="category"
                  type="select"
                  value={state.category}
                  onChange={handleInput("SET_category")}
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
            <Col lg={6} md={6} sm={12} className="px-4">
              <FormGroup>
                <Label for="settlement">Settlement Description</Label>
                <Input
                  bsSize="sm"
                  rows="3"
                  type="textarea"
                  id="settlement"
                  name="settlement"
                  value={state.settlement}
                  onChange={handleInput("SET_settlement")}
                  className="form-control form-control-sm"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-5">
            <Col lg={6} md={6} sm={12} className="px-4">
              <FormGroup>
                <Label for="note">Notes</Label>
                <Input
                  bsSize="sm"
                  rows="3"
                  type="textarea"
                  id="note"
                  name="note"
                  value={state.notes}
                  onChange={handleInput("SET_notes")}
                  className="form-control form-control-sm"
                />
              </FormGroup>
            </Col>
            <Col
              lg={4}
              md={6}
              sm={12}
              className="px-4 mt-5 d-flex justify-content-end align-items-end"
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
            <Col lg={2} md={2} sm={12} className="px-4"></Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default CreateNewBillingPage;
