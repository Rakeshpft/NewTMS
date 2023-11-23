import React, { useReducer, useState } from "react";
import { expenses, initialExpensesState } from "../../tms-object/accountspage";
import {
  Navbar,
  NavbarBrand,
  Nav,
  Form,
  Col,
  Row,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";
import { Header } from "../../header";
import Profile from "../../pofile";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { useHistory } from "react-router-dom";
import { routes } from "../../routes/routes";

type FormAction =
  | { type: "SET_payto"; payload: string }
  | { type: "SET_date"; payload: string }
  | { type: "SET_notes"; payload: string }
  | { type: "SET_category"; payload: string }
  | { type: "SET_amount"; payload: string };

const formReducer = (state: expenses, action: FormAction): expenses => {
  switch (action.type) {
    case "SET_payto":
      return { ...state, payto: action.payload };
    case "SET_date":
      return { ...state, date: action.payload };
    case "SET_notes":
      return { ...state, notes: action.payload };
    case "SET_category":
      return { ...state, category: action.payload };
    case "SET_amount":
      return { ...state, amount: action.payload };
    default:
      return state;
  }
};

const CreateNewExpansesPage = () => {
  const history = useHistory();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expenses, dispatch] = useReducer(formReducer, initialExpensesState);

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
    console.log(expenses);
  };

  const handleCancleButton = () => {
    history.push(routes.expansesPage);
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
        <NavbarBrand className="fw-bold px-4">New Expense</NavbarBrand>
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
                  value={expenses.date}
                  onChange={handleInput("SET_date")}
                  className="form-control form-control-sm"
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="payto">PayTo</Label>
                <Input
                  bsSize="sm"
                  id="payto"
                  name="payto"
                  type="select"
                  value={expenses.payto}
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
                <Label for="amount">Amount</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  id="amount"
                  name="amount"
                  placeholder="$"
                  value={expenses.amount}
                  onChange={handleInput("SET_amount")}
                  className="form-control form-control-sm"
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="category">Category</Label>
                <Input
                  bsSize="sm"
                  id="category"
                  name="category"
                  type="select"
                  value={expenses.category}
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
            <Col lg={6} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="notes">Notes</Label>
                <Input
                  bsSize="sm"
                  rows="2"
                  type="textarea"
                  id="notes"
                  name="notes"
                  value={expenses.notes}
                  onChange={handleInput("SET_notes")}
                  className="form-control form-control-sm"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-5">
            <Col lg={6} md={6} sm={12}></Col>
            <Col
              lg={6}
              md={6}
              sm={12}
              className="px-3 d-flex justify-content-center mt-5"
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

export default CreateNewExpansesPage;
