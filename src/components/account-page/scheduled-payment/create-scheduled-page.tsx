import React, { useReducer, useState } from "react";
import { schedulePage } from "../../tms-object/accountspage";
import {
  Navbar,
  NavbarBrand,
  Nav,
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { Header } from "../../header";
import Profile from "../../pofile";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

type FormAction =
  | { type: "SET_driver"; payload: string }
  | { type: "SET_vendor"; payload: string }
  | { type: "SET_type"; payload: string }
  | { type: "SET_amount"; payload: string }
  | { type: "SET_category"; payload: string }
  | { type: "SET_deductBy"; payload: string }
  | { type: "SET_schedule"; payload: string }
  | { type: "SET_startOn"; payload: string }
  | { type: "SET_repeat"; payload: string }
  | { type: "SET_status"; payload: string }
  | { type: "SET_lastDay"; payload: string }
  | { type: "SET_customDescription"; payload: string }
  | { type: "SET_notes"; payload: string };

const formReducer = (state: schedulePage, action: FormAction) => {
  switch (action.type) {
    case "SET_driver":
      return { ...state, driver: action.payload };
    case "SET_vendor":
      return { ...state, vendor: action.payload };
    case "SET_type":
      return { ...state, type: action.payload };
    case "SET_amount":
      return { ...state, amount: action.payload };
    case "SET_category":
      return { ...state, category: action.payload };
    case "SET_deductBy":
      return { ...state, deductBy: action.payload };
    case "SET_schedule":
      return { ...state, schedule: action.payload };
    case "SET_startOn":
      return { ...state, startOn: action.payload };
    case "SET_repeat":
      return { ...state, repeat: action.payload };
    case "SET_status":
      return { ...state, status: action.payload };
    case "SET_lastDay":
      return { ...state, lastDay: action.payload };
    case "SET_customDescription":
      return { ...state, customDescription: action.payload };
    case "SET_notes":
      return { ...state, notes: action.payload };
    default:
      return state;
  }
};

const initialState: schedulePage = {
  driver: "",
  vendor: "",
  type: "",
  amount: "",
  category: "",
  deductBy: "",
  schedule: "",
  startOn: "",
  repeat: "",
  status: "",
  lastDay: "",
  customDescription: "",
  notes: "",
};

const CreateScheduledPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [showTextBox, setShowTextBox] = useState(false);
  const [selectedOption, setSelectedOption] = useState("active");
  const [activeTime, setActiveTime] = useState(false);
  const [activeDate, setActiveDate] = useState(false);

  const handleRadioChange = (event: any) => {
    setShowTextBox(event.target.value);
  };

  const handleActiveRadioChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

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
        <NavbarBrand className="fw-bold px-4">New Schedule</NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-3">
          <Profile />
        </div>
      </Navbar>
      <div className="m-2 load-itemmain" style={{ backgroundColor: "#E9F3FB" }}>
        <Form onSubmit={handleSubmit} className="load-item container p-4">
          <Row>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label>Driver</Label>
                <Input
                  bsSize="sm"
                  disabled={selectedOption !== "active"}
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
                  style={{
                    color: "black",
                    border: "1px solid #418ECB",
                  }}
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
                <Label>Vendor</Label>
                <Input
                  bsSize="sm"
                  disabled={selectedOption !== "active"}
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
                  style={{
                    color: "black",
                    border: "1px solid #418ECB",
                  }}
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
              <h6 className="fw-bold">Driver Settlement Description</h6>
              <h6 className="fw-bold small" style={{ color: "#1B56AE" }}>
                What Period is the Deduction For?
              </h6>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup tag="fieldset">
                <h6 className="fw-bold">Status</h6>

                <FormGroup check inline>
                  <Input
                    name="radio1"
                    type="radio"
                    value="active"
                    checked={selectedOption === "active"}
                    onChange={handleActiveRadioChange}
                  />
                  <Label
                    check
                    style={{
                      marginBottom: "0px",
                      fontSize: "small",
                    }}
                  >
                    Active
                  </Label>
                </FormGroup>
                <FormGroup check inline>
                  <Input
                    name="radio1"
                    type="radio"
                    value="inactive"
                    onChange={handleActiveRadioChange}
                  />
                  <Label
                    check
                    style={{
                      marginBottom: "0px",
                      fontSize: "small",
                    }}
                  >
                    Inactive
                  </Label>
                </FormGroup>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={6} sm={12} className="px-3">
              <FormGroup tag="fieldset">
                <h6 className="fw-bold">Type</h6>

                <FormGroup check inline>
                  <Input
                    name="radio2"
                    type="radio"
                    disabled={selectedOption !== "active"}
                  />
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
                  <Input
                    name="radio2"
                    type="radio"
                    disabled={selectedOption !== "active"}
                  />
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
                <FormGroup check inline>
                  <Input
                    name="radio2"
                    type="radio"
                    disabled={selectedOption !== "active"}
                    onChange={handleRadioChange}
                  />
                  <Label
                    check
                    style={{
                      marginBottom: "0px",
                      fontSize: "small",
                    }}
                  >
                    Driver Loan
                  </Label>
                </FormGroup>
                <FormGroup check inline>
                  <Input
                    name="radio2"
                    type="radio"
                    disabled={selectedOption !== "active"}
                    onChange={handleRadioChange}
                  />
                  <Label
                    check
                    style={{
                      marginBottom: "0px",
                      fontSize: "small",
                    }}
                  >
                    Escrow
                  </Label>
                </FormGroup>
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="examplelastDay">
                  Last Day of the period for this transaction
                </Label>
                <Input
                  bsSize="sm"
                  disabled={selectedOption !== "active"}
                  type="date"
                  id="examplelastDay"
                  name="lastDay"
                  value={state.lastDay}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_lastDay",
                      payload: e.target.value,
                    });
                  }}
                  style={{
                    color: "black",
                    border: "1px solid #418ECB",
                  }}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3 fw-bold mt-3">
              Schedule
            </Col>
          </Row>
          <Row>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="exampleamount">Amount</Label>
                <Input
                  bsSize="sm"
                  disabled={selectedOption !== "active"}
                  type="text"
                  value={state.amount}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_amount",
                      payload: e.target.value,
                    });
                  }}
                  style={{
                    color: "black",
                    border: "1px solid #418ECB",
                  }}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="exampleselect">Category</Label>
                <Input
                  bsSize="sm"
                  disabled={selectedOption !== "active"}
                  type="select"
                  value={state.category}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_category",
                      payload: e.target.value,
                    });
                  }}
                  style={{
                    color: "black",
                    border: "1px solid #418ECB",
                  }}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </Input>
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="exampleNote">Custom Description</Label>
                <Input
                  bsSize="sm"
                  disabled={selectedOption !== "active"}
                  rows="2"
                  type="textarea"
                  id="exampleNote"
                  value={state.customDescription}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_customDescription",
                      payload: e.target.value,
                    });
                  }}
                  style={{
                    color: "black",
                    border: "1px solid #418ECB",
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg={3} md={6} sm={12} className="px-3">
              {showTextBox && (
                <FormGroup>
                  <Label for="examplededuct">Deduct By</Label>
                  <Input
                    bsSize="sm"
                    disabled={selectedOption !== "active"}
                    type="text"
                    id="examplededuct"
                    name="deduct"
                    value={state.deductBy}
                    onChange={(e) => {
                      dispatch({
                        type: "SET_deductBy",
                        payload: e.target.value,
                      });
                    }}
                    style={{
                      color: "black",
                      border: "1px solid #418ECB",
                    }}
                  />
                </FormGroup>
              )}
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={6} sm={12} className="px-3">
              <FormGroup tag="fieldset">
                <legend className="col-form-label col-sm-2 fw-bold">
                  Schedule
                </legend>
                <Col sm={12}>
                  <FormGroup check inline>
                    <Input
                      name="radio3"
                      type="radio"
                      disabled={selectedOption !== "active"}
                    />
                    <Label
                      check
                      style={{
                        marginBottom: "0px",
                        fontSize: "small",
                      }}
                    >
                      Every Day
                    </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input
                      name="radio3"
                      type="radio"
                      disabled={selectedOption !== "active"}
                    />
                    <Label
                      check
                      style={{
                        marginBottom: "0px",
                        fontSize: "small",
                      }}
                    >
                      Every week
                    </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input
                      name="radio3"
                      type="radio"
                      disabled={selectedOption !== "active"}
                    />
                    <Label
                      check
                      style={{
                        marginBottom: "0px",
                        fontSize: "small",
                      }}
                    >
                      Every Month
                    </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input
                      name="radio3"
                      type="radio"
                      disabled={selectedOption !== "active"}
                    />
                    <Label
                      check
                      style={{
                        marginBottom: "0px",
                        fontSize: "small",
                      }}
                    >
                      Every Other Week
                    </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input
                      name="radio3"
                      type="radio"
                      disabled={selectedOption !== "active"}
                    />
                    <Label
                      check
                      style={{
                        marginBottom: "0px",
                        fontSize: "small",
                      }}
                    >
                      Annually
                    </Label>
                  </FormGroup>
                </Col>
              </FormGroup>
            </Col>
            <Col lg={6} md={6} sm={12} className="px-3">
              <span className="fw-bold small" style={{ color: "#1B56AE" }}>
                Preview of Weekly Settlement Description:
              </span>
              <div className="fw-bold small">Weekly, Every Friday</div>
            </Col>
          </Row>
          <Row>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="exampledate">Start On</Label>
                <Input
                  bsSize="sm"
                  disabled={selectedOption !== "active"}
                  type="date"
                  value={state.startOn}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_startOn",
                      payload: e.target.value,
                    });
                  }}
                  style={{
                    color: "black",
                    border: "1px solid #418ECB",
                  }}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3"></Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="examplenotes">Notes</Label>
                <Input
                  bsSize="sm"
                  disabled={selectedOption !== "active"}
                  type="textarea"
                  row="3"
                  value={state.notes}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_notes",
                      payload: e.target.value,
                    });
                  }}
                  style={{
                    color: "black",
                    border: "1px solid #418ECB",
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={6} sm={12} className="px-3">
              <FormGroup row tag="fieldset">
                <legend className="col-form-label col-sm-2 fw-bold">
                  Repeat
                </legend>
                <Col sm={12}>
                  <FormGroup check inline>
                    <Input
                      name="radio3"
                      type="radio"
                      checked
                      disabled={selectedOption !== "active"}
                    />
                    <Label
                      checked
                      style={{
                        marginBottom: "0px",
                        fontSize: "small",
                      }}
                    >
                      Always
                    </Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input
                      name="radio3"
                      type="radio"
                      disabled={selectedOption !== "active"}
                      onChange={(event: any) =>
                        setActiveTime(event.target.value)
                      }
                    />
                    <Label
                      check
                      style={{
                        marginBottom: "0px",
                        fontSize: "small",
                      }}
                    >
                      No. of Terms
                    </Label>
                  </FormGroup>

                  <FormGroup check inline>
                    <Input
                      name="radio3"
                      type="radio"
                      disabled={selectedOption !== "active"}
                      onChange={(event: any) =>
                        setActiveDate(event.target.value)
                      }
                    />
                    <Label
                      check
                      style={{
                        marginBottom: "0px",
                        fontSize: "small",
                      }}
                    >
                      Until the Date
                    </Label>
                  </FormGroup>
                </Col>
              </FormGroup>
            </Col>
            {activeTime && (
              <Row>
                <Col lg={3} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Input
                      bsSize="sm"
                      disabled={selectedOption !== "active"}
                      placeholder="1"
                      type="text"
                      style={{
                        color: "black",
                        border: "1px solid #418ECB",
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
            )}
            {activeDate && (
              <Row>
                <Col lg={3} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Input
                      bsSize="sm"
                      placeholder="1"
                      disabled={selectedOption !== "active"}
                      type="date"
                      style={{
                        color: "black",
                        border: "1px solid #418ECB",
                      }}
                    />
                  </FormGroup>
                </Col>
              </Row>
            )}
          </Row>
          <Row>
            <Col className="d-flex justify-content-end me-5 mt-5">
              <Button
                size="sm"
                disabled={selectedOption !== "active"}
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
                disabled={selectedOption !== "active"}
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

export default CreateScheduledPage;
