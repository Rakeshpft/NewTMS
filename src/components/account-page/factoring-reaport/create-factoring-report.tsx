import React, { useReducer, useState } from "react";
import { factoringReport } from "../../tms-object/accountspage";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import {
  Navbar,
  NavbarBrand,
  Nav,
  Container,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import { Header } from "../../header";
import Profile from "../../pofile";

type FormAction =
  | { type: "SET_partner"; payload: string }
  | { type: "SET_factoringreportstatus"; payload: string }
  | { type: "SET_notes"; payload: string }
  | { type: "SET_date"; payload: string };

const formReducer = (
  state: factoringReport,
  action: FormAction
): factoringReport => {
  switch (action.type) {
    case "SET_partner":
      return { ...state, partner: action.payload };
    case "SET_factoringreportstatus":
      return { ...state, factoringreportstatus: action.payload };
    case "SET_notes":
      return { ...state, notes: action.payload };
    case "SET_date":
      return { ...state, date: action.payload };
    default:
      return state;
  }
};

const initialState: factoringReport = {
  partner: "",
  factoringreportstatus: "",
  notes: "",
  date: "",
};

const CreateFactoringReport = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);
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
        <NavbarBrand className="fw-bold">New Report</NavbarBrand>
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
                      <Label for="exampleSelect">Partner</Label>
                      <Input
                        bsSize="sm"
                        id="exampleSelect"
                        name="select"
                        type="select"
                        value={state.partner}
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
                  <Col md={3}>
                    <FormGroup>
                      <Label for="exampleSelect">Factoring Report Status</Label>
                      <Input
                        bsSize="sm"
                        id="exampleSelect"
                        name="select"
                        type="select"
                        value={state.factoringreportstatus}
                        onChange={(e) => {
                          dispatch({
                            type: "SET_factoringreportstatus",
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
                  <Col md={3}>
                    <FormGroup>
                      <Label for="exampledate">Date</Label>
                      <Input
                        bsSize="sm"
                        id="exampledate"
                        name="date"
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
                </Row>
                <Row className="px-5">
                  <Col md={6}>
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
                  <Col md={3}>
                    <div className="chartofaccountbutton">
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
                    </div>
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

export default CreateFactoringReport;
