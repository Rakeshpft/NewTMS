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
import {
  additionsPage,
  initialAdditionsPageState,
} from "../../tms-object/accountspage";
// import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { routes } from "../../routes/routes";

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
      return { ...state, vendor: action.payload };
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

const CreateNewAdditionsPage = () => {
  // const history = useHistory();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [state, dispatch] = useReducer(formReducer, initialAdditionsPageState);

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
    //     ? history.push(routes.additions)
    //     : history.goBack();
    // }
    {
      navigate(routes.additions);
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
        <NavbarBrand className="fw-bold px-4">New Additions Entry</NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-3">
          <Profile />
        </div>
      </Navbar>
      <div className="m-2 load-itemmain">
        <Form onSubmit={handleSubmit} className="load-item container p-4">
          <Row className="px-5">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup tag="fieldset">
                <legend className="col-form-label col-sm-2 fw-bold">
                  Type
                </legend>
                <Col sm={10}>
                  <FormGroup check inline>
                    <Input
                      name="radio2"
                      type="radio"
                      value="Addition"
                      checked={state.type === "Addition"}
                      onChange={handleInput("SET_type")}
                    />
                    <Label check>Addition</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input
                      name="radio2"
                      type="radio"
                      value="Deduction"
                      checked={state.type === "Deduction"}
                      onChange={handleInput("SET_type")}
                    />
                    <Label check>Deduction</Label>
                  </FormGroup>
                </Col>
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
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
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="vendor">Vendor</Label>
                <Input
                  bsSize="sm"
                  id="vendor"
                  name="vendor"
                  type="select"
                  value={state.vendor}
                  onChange={handleInput("SET_vendor")}
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
                  value={state.amount}
                  onChange={handleInput("SET_amount")}
                  className="form-control form-control-sm"
                />
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
            <Col lg={3} md={6} sm={12} className="px-3">
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
            <Col lg={6} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="notes">Notes</Label>
                <Input
                  bsSize="sm"
                  rows="2"
                  type="textarea"
                  id="notes"
                  name="notes"
                  value={state.notes}
                  onChange={handleInput("SET_notes")}
                  className="form-control form-control-sm"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-5">
            <Col lg={6} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="settlement">Settlement Description(Optional)</Label>
                <Input
                  bsSize="sm"
                  rows="2"
                  type="textarea"
                  id="settlement"
                  name="settlement"
                  value={state.settlement}
                  onChange={handleInput("SET_settlement")}
                  className="form-control form-control-sm"
                />
              </FormGroup>
            </Col>
            <Col
              lg={4}
              md={6}
              sm={12}
              className="px-3 mt-3 d-flex justify-content-end align-items-end"
            >
              <FormGroup>
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
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default CreateNewAdditionsPage;
