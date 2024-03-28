import React, { useReducer, useState } from "react";
import {
  ExpensesSchedulePage,
  initialExpensesSchedulePageState,
} from "../../tms-object/accountspage";
import {
  Navbar,
  NavbarBrand,
  Nav,
  Form,
  Col,
  Row,
  FormGroup,
  Label,
  Input,
  Button,
  Table,
  TabPane,
} from "reactstrap";
import { Header } from "../../shared";
import Profile from "../../pofile";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { TabPage } from "../../driver-page";
import { routes } from "../../routes/routes";
import { useNavigate } from 'react-router-dom';

type FormAction =
  | { type: "SET_driver"; payload: string }
  | { type: "SET_scheduleName"; payload: string }
  | { type: "SET_payTo"; payload: string }
  | { type: "SET_category"; payload: string }
  | { type: "SET_amount"; payload: string }
  | { type: "SET_notes"; payload: string }
  | { type: "SET_trailer"; payload: string }
  | { type: "SET_truck"; payload: string }
  | { type: "SET_startOn"; payload: string }
  | { type: "SET_repeat"; payload: string }
  | { type: "SET_schedule"; payload: string };

const formReducer = (
  state: ExpensesSchedulePage,
  action: FormAction
): ExpensesSchedulePage => {
  switch (action.type) {
    case "SET_driver":
      return { ...state, driver: action.payload };
    case "SET_scheduleName":
      return { ...state, scheduleName: action.payload };
    case "SET_payTo":
      return { ...state, payTo: action.payload };
    case "SET_category":
      return { ...state, category: action.payload };
    case "SET_amount":
      return { ...state, amount: action.payload };
    case "SET_notes":
      return { ...state, notes: action.payload };
    case "SET_trailer":
      return { ...state, trailer: action.payload };
    case "SET_truck":
      return { ...state, truck: action.payload };
    case "SET_startOn":
      return { ...state, startOn: action.payload };
    case "SET_repeat":
      return { ...state, repeat: action.payload };
    case "SET_schedule":
      return { ...state, schedule: action.payload };
    default:
      return state;
  }
};

const CreateNewExpensesSchedulePage = () => {
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [state, dispatch] = useReducer(
    formReducer,
    initialExpensesSchedulePageState
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
    navigate(routes.expansesPage);
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
        <NavbarBrand className="fw-bold px-4">
          New Recurring Schedule
        </NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-3">
          <Profile />
        </div>
      </Navbar>
      <div className="m-2 load-itemmain">
        <Form onSubmit={handleSubmit} className="load-item container p-4">
          <Row className="px-4">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="scheduleName">Schedule Name</Label>
                <Input
                  type="text"
                  name="scheduleName"
                  id="scheduleName"
                  bsSize="sm"
                  value={state.scheduleName}
                  onChange={handleInput("SET_scheduleName")}
                  className="form-control form-control-sm"
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3"></Col>
            <Col lg={6} md={6} sm={12} className="px-3">
              <FormGroup row tag="fieldset">
                <legend className="col-form-label col-sm-2 fw-bold">
                  Schedule
                </legend>
                <Col sm={12}>
                  <FormGroup check inline>
                    <Input
                      name="radio1"
                      type="radio"
                      value="Every Day"
                      checked={state.schedule === "Every Day"}
                      onChange={handleInput("SET_schedule")}
                    />
                    <Label check>Every Day</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input
                      name="radio1"
                      type="radio"
                      value="Every week"
                      checked={state.schedule === "Every week"}
                      onChange={handleInput("SET_schedule")}
                    />
                    <Label check>Every week</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input
                      name="radio1"
                      type="radio"
                      value="Every Month"
                      checked={state.schedule === "Every Month"}
                      onChange={handleInput("SET_schedule")}
                    />
                    <Label check>Every Month</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input
                      name="radio1"
                      type="radio"
                      value="Every Other Week"
                      checked={state.schedule === "Every Other Week"}
                      onChange={handleInput("SET_schedule")}
                    />
                    <Label check>Every Other Week</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input
                      name="radio1"
                      type="radio"
                      value="Annually"
                      checked={state.schedule === "Annually"}
                      onChange={handleInput("SET_schedule")}
                    />
                    <Label check>Annually</Label>
                  </FormGroup>
                </Col>
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-4">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="amount">Amount</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="amount"
                  id="amount"
                  value={state.amount}
                  onChange={handleInput("SET_amount")}
                  className="form-control form-control-sm"
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="payTo">Pay To</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="payTo"
                  id="payTo"
                  value={state.payTo}
                  onChange={handleInput("SET_payTo")}
                  className="form-control form-control-sm"
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="startOn">Start On</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="startOn"
                  id="startOn"
                  value={state.startOn}
                  onChange={handleInput("SET_startOn")}
                  className="form-control form-control-sm"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-4">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="category">Category</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  name="category"
                  id="category"
                  value={state.category}
                  onChange={handleInput("SET_category")}
                  className="form-control form-control-sm"
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3"></Col>
            <Col lg={6} md={6} sm={12} className="px-3">
              <FormGroup tag="fieldset">
                <legend className="col-form-label col-sm-2 fw-bold">
                  Repeat
                </legend>
                <Col sm={12}>
                  <FormGroup check inline>
                    <Input
                      name="radio2"
                      type="radio"
                      value="Always"
                      checked={state.repeat === "Always"}
                      onChange={handleInput("SET_repeat")}
                    />
                    <Label checked>Always</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input
                      name="radio2"
                      type="radio"
                      value="No. of Terms"
                      checked={state.repeat === "No. of Terms"}
                      onChange={handleInput("SET_repeat")}
                    />
                    <Label check>No. of Terms</Label>
                  </FormGroup>

                  <FormGroup check inline>
                    <Input
                      name="radio2"
                      type="radio"
                      value="Until the Date"
                      checked={state.repeat === "Until the Date"}
                      onChange={handleInput("SET_repeat")}
                    />
                    <Label check>Until the Date</Label>
                  </FormGroup>
                </Col>
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-4">
            <Col lg={6} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="notes">Notes</Label>
                <Input
                  type="textarea"
                  rows="3"
                  name="notes"
                  id="notes"
                  bsSize="sm"
                  value={state.notes}
                  onChange={handleInput("SET_notes")}
                  className="form-control form-control-sm"
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="driver">Driver</Label>
                <Input
                  type="text"
                  name="driver"
                  id="driver"
                  bsSize="sm"
                  value={state.driver}
                  onChange={handleInput("SET_driver")}
                  className="form-control form-control-sm"
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="trailer">Trailer</Label>
                <Input
                  type="text"
                  name="trailer"
                  id="trailer"
                  bsSize="sm"
                  value={state.trailer}
                  onChange={handleInput("SET_trailer")}
                  className="form-control form-control-sm"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-4 justify-content-end">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="truck">Truck</Label>
                <Input
                  type="text"
                  name="truck"
                  id="truck"
                  bsSize="sm"
                  value={state.truck}
                  onChange={handleInput("SET_truck")}
                  className="form-control form-control-sm"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-4">
            <Col lg={12} md={12} sm={12} className="px-3">
              <TabPage tabTitles={["Expenses"]}>
                <TabPane>
                  <div className="fw-bold small my-3">Payments</div>
                  <div className="bg-white p-3">
                    <Table
                      responsive
                      hover
                      size="sm"
                      className="table-data text-nowrap"
                    >
                      <thead>
                        <tr className="text-capitalize">
                          <th>Date</th>
                          <th>Payment#</th>
                          <th>Description</th>

                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td colSpan={4} align="center">
                            No records
                          </td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr>
                          <td colSpan={3}>Balance DUE</td>
                          <td align="right">0.00</td>
                        </tr>
                      </tfoot>
                    </Table>
                  </div>
                </TabPane>
              </TabPage>
            </Col>
          </Row>
          <Row className="px-4">
            <Col className="d-flex justify-content-end me-5 mt-5">
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

export default CreateNewExpensesSchedulePage;
