import React, { useReducer, useState } from "react";
import { expenses } from "../../tms-object/accountspage";
import {
  Navbar,
  NavbarBrand,
  Nav,
  Container,
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

const initialState: expenses = {
  payto: "",
  date: "",
  notes: "",
  category: "",
  amount: "",
};

const CreateExpansesPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expenses, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(expenses);
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
        <NavbarBrand className="fw-bold">New Expense</NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-3">
          <Profile />
        </div>
      </Navbar>
      <div className="py-2 accountmain">
        <Container className="mt-4 px-5 py-2">
          <Form onSubmit={handleSubmit} className="accountitem">
            <Row>
              <Col>
                <Row className="px-5">
                  <Col md={3}>
                    <FormGroup>
                      <Label for="exampledate">Date</Label>
                      <Input
                        bsSize="sm"
                        id="exampledate"
                        type="date"
                        value={expenses.date}
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
                  <Col md={3}>
                    <FormGroup>
                      <Label for="exampleSelect">PayTo</Label>
                      <Input
                        bsSize="sm"
                        id="exampleSelect"
                        name="select"
                        type="select"
                        value={expenses.payto}
                        onChange={(e) => {
                          dispatch({
                            type: "SET_payto",
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
                  <Col md={3}>
                    <FormGroup>
                      <Label for="exampleAmount">Amount</Label>
                      <Input
                        bsSize="sm"
                        type="text"
                        id="exampleAmount"
                        name="amount"
                        placeholder="$"
                        value={expenses.amount}
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
                  <Col md={3}>
                    <FormGroup>
                      <Label for="exampleSelect">Category</Label>
                      <Input
                        bsSize="sm"
                        id="exampleSelect"
                        name="select"
                        type="select"
                        value={expenses.category}
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
                  <Col md={6}>
                    <FormGroup>
                      <Label for="exampleNote">Notes</Label>
                      <Input
                        bsSize="sm"
                        rows="2"
                        type="textarea"
                        id="exampleNote"
                        name="note"
                        value={expenses.notes}
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
                  <Col md={6}></Col>
                  <Col md={3} className="d-flex justify-content-end mt-5">
                    <Button
                      size="sm"
                      className="me-3"
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
                      <RxCross2 fontSize={"16px"} color="red" /> Cancel
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default CreateExpansesPage;
