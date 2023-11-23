import React, { useReducer, useState } from "react";
import {
  factoringReport,
  initialFactoringReportState,
} from "../../tms-object/accountspage";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
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
import { Header } from "../../header";
import Profile from "../../pofile";
import { useHistory } from "react-router-dom";
import { routes } from "../../routes/routes";

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

const CreateNewFactoringReport = () => {
  const history = useHistory();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [state, dispatch] = useReducer(
    formReducer,
    initialFactoringReportState
  );

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
    {
      history.location.pathname === routes.dashboard
        ? history.push(routes.factoringReport)
        : history.goBack();
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
        <NavbarBrand className="fw-bold px-4">New Report</NavbarBrand>
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
          </Row>
          <Row className="px-5">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="factoringreportstatus">
                  Factoring Report Status
                </Label>
                <Input
                  bsSize="sm"
                  id="factoringreportstatus"
                  name="factoringreportstatus"
                  type="select"
                  value={state.factoringreportstatus}
                  onChange={handleInput("SET_factoringreportstatus")}
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
            <Col lg={6} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="notes">Notes</Label>
                <Input
                  bsSize="sm"
                  id="notes"
                  name="notes"
                  rows="3"
                  type="textarea"
                  value={state.notes}
                  onChange={handleInput("SET_notes")}
                  className="form-control form-control-sm"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-5">
            <Col lg={6} md={6} sm={12}></Col>
            <Col
              lg={4}
              md={4}
              sm={12}
              className="d-flex justify-content-end mt-3"
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

export default CreateNewFactoringReport;
