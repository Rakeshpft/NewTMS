import React, { useReducer, useState } from "react";
import {
  schedulePage,
  initialSchedulePageState,
} from "../../tms-object/accountspage";
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
  Table,
} from "reactstrap";
import { Header } from "../../shared";
import Profile from "../../pofile";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
// import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { routes } from "../../routes/routes";

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
  | { type: "SET_notes"; payload: string }
  | { type: "SET_numberOfTimes"; payload: string }
  | { type: "SET_untilDate"; payload: string };

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
    case "SET_numberOfTimes":
      return { ...state, numberOfTimes: action.payload };
    case "SET_untilDate":
      return { ...state, untilDate: action.payload };
    default:
      return state;
  }
};

const CreateNewScheduledPage = () => {
  // const history = useHistory();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [state, dispatch] = useReducer(formReducer, initialSchedulePageState);
  const [showTextBox, setShowTextBox] = useState(false);
  const [selectedOption, setSelectedOption] = useState("active");
  const [activeTime, setActiveTime] = useState(false);
  const [activeDate, setActiveDate] = useState(false);

  const handleInput =
    (type: FormAction["type"]) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      dispatch({ type, payload: event.target.value });
    };

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

  const handleCancleButton = () => {
    // {
    //   history.location.pathname === routes.dashboard
    //     ? history.push(routes.scheduledPage)
    //     : history.goBack();
    // }
    {
      navigate(routes.scheduledPage);
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
        <NavbarBrand className="fw-bold px-4">New Schedule</NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-3">
          <Profile />
        </div>
      </Navbar>
      <div className="m-2 load-itemmain">
        <Form onSubmit={handleSubmit} className="load-item container p-4">
          <Row>
            <Col lg={6} md={6} sm={12}>
              <Row>
                <Col lg={6} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="driver">Driver</Label>
                    <Input
                      bsSize="sm"
                      disabled={selectedOption !== "active"}
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
                <Col lg={6} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="vendor">Vendor</Label>
                    <Input
                      bsSize="sm"
                      disabled={selectedOption !== "active"}
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
              <Row>
                <Col lg={12} md={12} sm={12} className="px-3">
                  <FormGroup tag="fieldset">
                    <h6 className="fw-bold">Type</h6>

                    <FormGroup check inline>
                      <Input
                        name="radio2"
                        type="radio"
                        disabled={selectedOption !== "active"}
                        value={"Addition"}
                        checked={state.type === "Addition"}
                        onChange={handleInput("SET_type")}
                      />
                      <Label check>Addition</Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        name="radio2"
                        type="radio"
                        disabled={selectedOption !== "active"}
                        value={"Deduction"}
                        checked={state.type === "Deduction"}
                        onChange={handleInput("SET_type")}
                      />
                      <Label check>Deduction</Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        name="radio2"
                        type="radio"
                        disabled={selectedOption !== "active"}
                        onClick={handleRadioChange}
                        value={"Driver Loan"}
                        checked={state.type === "Driver Loan"}
                        onChange={handleInput("SET_type")}
                      />
                      <Label check>Driver Loan</Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        name="radio2"
                        type="radio"
                        disabled={selectedOption !== "active"}
                        onClick={handleRadioChange}
                        value={"Escrow"}
                        checked={state.type === "Escrow"}
                        onChange={handleInput("SET_type")}
                      />
                      <Label check>Escrow</Label>
                    </FormGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="amount">Amount</Label>
                    <Input
                      bsSize="sm"
                      disabled={selectedOption !== "active"}
                      type="text"
                      id="amount"
                      name="amount"
                      value={state.amount}
                      onChange={handleInput("SET_amount")}
                      className="form-control form-control-sm"
                    />
                  </FormGroup>
                </Col>
                <Col lg={6} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="category">Category</Label>
                    <Input
                      bsSize="sm"
                      disabled={selectedOption !== "active"}
                      type="select"
                      id="category"
                      name="category"
                      value={state.category}
                      onChange={handleInput("SET_category")}
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
              <Row>
                <Col lg={6} md={6} sm={12} className="px-3">
                  {showTextBox && (
                    <FormGroup>
                      <Label for="deductBy">Deduct By</Label>
                      <Input
                        bsSize="sm"
                        disabled={selectedOption !== "active"}
                        type="text"
                        id="deductBy"
                        name="deductBy"
                        value={state.deductBy}
                        onChange={handleInput("SET_deductBy")}
                        className="form-control form-control-sm"
                      />
                    </FormGroup>
                  )}
                </Col>
              </Row>
              <Row>
                <Col lg={12} md={12} sm={12} className="px-3">
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
                          value={"Every Day"}
                          checked={state.schedule === "Every Day"}
                          onChange={handleInput("SET_schedule")}
                        />
                        <Label check>Every Day</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input
                          name="radio3"
                          type="radio"
                          disabled={selectedOption !== "active"}
                          value={"Every week"}
                          checked={state.schedule === "Every week"}
                          onChange={handleInput("SET_schedule")}
                        />
                        <Label check>Every week</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input
                          name="radio3"
                          type="radio"
                          disabled={selectedOption !== "active"}
                          value={"Every Month"}
                          checked={state.schedule === "Every Month"}
                          onChange={handleInput("SET_schedule")}
                        />
                        <Label check>Every Month</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input
                          name="radio3"
                          type="radio"
                          disabled={selectedOption !== "active"}
                          value={"Every Other Week"}
                          checked={state.schedule === "Every Other Week"}
                          onChange={handleInput("SET_schedule")}
                        />
                        <Label check>Every Other Week</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input
                          name="radio3"
                          type="radio"
                          disabled={selectedOption !== "active"}
                          value={"Annually"}
                          checked={state.schedule === "Annually"}
                          onChange={handleInput("SET_schedule")}
                        />
                        <Label check>Annually</Label>
                      </FormGroup>
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg={6} md={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="startOn">Start On</Label>
                    <Input
                      bsSize="sm"
                      disabled={selectedOption !== "active"}
                      id="startOn"
                      name="startOn"
                      type="date"
                      value={state.startOn}
                      onChange={handleInput("SET_startOn")}
                      className="form-control form-control-sm"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg={12} md={12} sm={12} className="px-3">
                  <FormGroup row tag="fieldset">
                    <legend className="col-form-label col-sm-2 fw-bold">
                      Repeat
                    </legend>
                    <Col sm={12}>
                      <FormGroup check inline>
                        <Input
                          name="radio4"
                          type="radio"
                          defaultChecked
                          disabled={selectedOption !== "active"}
                          onClick={() => {
                            setActiveTime(false);
                            setActiveDate(false);
                          }}
                          value={"Always"}
                          onChange={handleInput("SET_repeat")}
                        />
                        <Label checked>Always</Label>
                      </FormGroup>
                      <FormGroup check inline>
                        <Input
                          name="radio4"
                          type="radio"
                          disabled={selectedOption !== "active"}
                          onClick={() => {
                            setActiveDate(false);
                            setActiveTime(true);
                          }}
                          value={"No. of Times"}
                          checked={state.repeat === "No. of Times"}
                          onChange={handleInput("SET_repeat")}
                        />
                        <Label check>No. of Times</Label>
                      </FormGroup>

                      <FormGroup check inline>
                        <Input
                          name="radio4"
                          type="radio"
                          disabled={selectedOption !== "active"}
                          onClick={() => {
                            setActiveDate(true);
                            setActiveTime(false);
                          }}
                          value={"Until the Date"}
                          checked={state.repeat === "Until the Date"}
                          onChange={handleInput("SET_repeat")}
                        />
                        <Label check>Until the Date</Label>
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
                          id="nunmberOfTimes"
                          name="numberOfTimes"
                          className="form-control form-control-sm"
                          value={state.numberOfTimes}
                          onChange={handleInput("SET_numberOfTimes")}
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
                          name="untilDate"
                          id="untilDate"
                          value={state.untilDate}
                          className="form-control form-control-sm"
                          onChange={handleInput("SET_untilDate")}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                )}
              </Row>
            </Col>
            <Col lg={3} md={3} sm={12}>
              <Row>
                <Col lg={12} md={12} sm={12} className="px-3">
                  <h6 className="fw-bold">Driver Settlement Description</h6>
                  <h6 className="fw-bold small" style={{ color: "#1B56AE" }}>
                    What Period is the Deduction For?
                  </h6>
                </Col>
              </Row>
              <Row>
                <Col lg={12} md={12} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="lastDay">
                      Last Day of the period for this transaction
                    </Label>
                    <Input
                      bsSize="sm"
                      disabled={selectedOption !== "active"}
                      type="date"
                      id="lastDay"
                      name="lastDay"
                      value={state.lastDay}
                      onChange={handleInput("SET_lastDay")}
                      className="form-control form-control-sm"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg={12} md={12} sm={12} className="mt-4 px-3">
                  <FormGroup>
                    <Label for="customDescription">Custom Description</Label>
                    <Input
                      bsSize="sm"
                      disabled={selectedOption !== "active"}
                      rows="2"
                      type="textarea"
                      id="customDescription"
                      name="customDescription"
                      value={state.customDescription}
                      onChange={handleInput("SET_customDescription")}
                      className="form-control form-control-sm"
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg={12} md={12} sm={12} className="mt-3 px-3">
                  <span className="fw-bold small" style={{ color: "#1B56AE" }}>
                    Preview of Weekly Settlement Description:
                  </span>
                  <div className="fw-bold small">Weekly, Every Friday</div>
                </Col>
              </Row>
              <Row>
                <Col lg={12} md={12} sm={12} className="mt-4 px-3">
                  <FormGroup>
                    <Label for="notes">Notes</Label>
                    <Input
                      bsSize="sm"
                      disabled={selectedOption !== "active"}
                      type="textarea"
                      row="3"
                      id="notes"
                      name="notes"
                      value={state.notes}
                      onChange={handleInput("SET_notes")}
                      className="form-control form-control-sm"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Col>
            <Col lg={3} md={3} sm={12}>
              <Row>
                <Col lg={12} md={12} sm={12} className="px-3">
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
                      <Label check>Active</Label>
                    </FormGroup>
                    <FormGroup check inline>
                      <Input
                        name="radio1"
                        type="radio"
                        value="inactive"
                        onChange={handleActiveRadioChange}
                      />
                      <Label check>Inactive</Label>
                    </FormGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col lg={12} md={12} sm={12} className="fw-bold mt-3 px-3">
                  Schedule
                  <div className="mt-2">
                    <Label className="small">
                      Next transaction will be create on 07/12/2022
                    </Label>
                    <Table
                      striped
                      hover
                      className="table-data text-nowrap mt-2"
                    >
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Amount</th>
                          <th>Period</th>
                          <th>Descripton</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <th scope="row">1</th>
                          <td>Mark</td>
                          <td>Otto</td>
                          <td>@mdo</td>
                        </tr>
                        <tr>
                          <th scope="row">2</th>
                          <td>Jacob</td>
                          <td>Thornton</td>
                          <td>@fat</td>
                        </tr>
                        <tr>
                          <th scope="row">3</th>
                          <td>Larry</td>
                          <td>the Bird</td>
                          <td>@twitter</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col className="d-flex justify-content-end me-5 mt-5">
              <Button
                size="sm"
                disabled={selectedOption !== "active"}
                className="me-3 save-button"
              >
                <BiCheck fontSize={"16px"} />
                Save
              </Button>
              <Button
                size="sm"
                disabled={selectedOption !== "active"}
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

export default CreateNewScheduledPage;
