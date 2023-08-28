import React, { useReducer, useState } from "react";
import { ExpensesSchedulePage } from "../../tms-object/accountspage";
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
import { Header } from "../../header";
import Profile from "../../pofile";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { TabPage } from "../../driver-page";

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

const initialState: ExpensesSchedulePage = {
  driver: "",
  scheduleName: "",
  payTo: "",
  category: "",
  amount: "",
  notes: "",
  trailer: "",
  truck: "",
  startOn: "",
  repeat: "",
  schedule: "",
};

const CreateExpensesSchedulePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [state, dispatch] = useReducer(formReducer, initialState);

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
        <NavbarBrand className="fw-bold ps-4">New Schedule</NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-3">
          <Profile />
        </div>
      </Navbar>
      <div className="m-2 load-itemmain" style={{ backgroundColor: "#E9F3FB" }}>
        <Form onSubmit={handleSubmit} className="load-item container p-4">
          <Row className="px-4">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="examplescheduleName">Schedule Name</Label>
                <Input
                  type="text"
                  name="scheduleName"
                  id="examplescheduleName"
                  bsSize="sm"
                  value={state.scheduleName}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_scheduleName",
                      payload: e.target.value,
                    })
                  }
                  style={{
                    color: "black",
                    border: "1px solid #418ECB",
                  }}
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
                    <Input name="radio3" type="radio" />
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
                    <Input name="radio3" type="radio" />
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
                    <Input name="radio3" type="radio" />
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
                    <Input name="radio3" type="radio" />
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
                    <Input name="radio3" type="radio" />
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
          </Row>
          <Row className="px-4">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="exampleamount">Amount</Label>
                <Input
                  bsSize="sm"
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
                <Label for="examplepayTo">Pay To</Label>
                <Input
                  bsSize="sm"
                  type="text"
                  value={state.payTo}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_payTo",
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
                <Label for="examplestarton">Start On</Label>
                <Input
                  bsSize="sm"
                  type="text"
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
          </Row>
          <Row className="px-4">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="examplecategory">Category</Label>
                <Input
                  bsSize="sm"
                  type="text"
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
                    <Input name="radio3" type="radio" />
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
                    <Input name="radio3" type="radio" />
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
                    <Input name="radio3" type="radio" />
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
          </Row>
          <Row className="px-4">
            <Col lg={6} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="exampleotes">Notes</Label>
                <Input
                  type="textarea"
                  rows="3"
                  name="notes"
                  id="examplenotes"
                  bsSize="sm"
                  value={state.notes}
                  onChange={(e) =>
                    dispatch({ type: "SET_notes", payload: e.target.value })
                  }
                  style={{
                    color: "black",
                    border: "1px solid #418ECB",
                  }}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="exampledriver">Driver</Label>
                <Input
                  type="text"
                  name="driver"
                  id="exampledriver"
                  bsSize="sm"
                  value={state.driver}
                  onChange={(e) =>
                    dispatch({ type: "SET_driver", payload: e.target.value })
                  }
                  style={{
                    color: "black",
                    border: "1px solid #418ECB",
                  }}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="exampletrailer">Trailer</Label>
                <Input
                  type="text"
                  name="trailer"
                  id="exampletrailer"
                  bsSize="sm"
                  value={state.trailer}
                  onChange={(e) =>
                    dispatch({ type: "SET_trailer", payload: e.target.value })
                  }
                  style={{
                    color: "black",
                    border: "1px solid #418ECB",
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-4 justify-content-end">
            {/* <Col lg={6} md={6} sm={12} className="px-3"></Col>
              <Col lg={3} md={6} sm={12} className="px-3"></Col> */}
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="exampletruck">Truck</Label>
                <Input
                  type="text"
                  name="truck"
                  id="exampletruck"
                  bsSize="sm"
                  value={state.truck}
                  onChange={(e) =>
                    dispatch({ type: "SET_truck", payload: e.target.value })
                  }
                  style={{
                    color: "black",
                    border: "1px solid #418ECB",
                  }}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-4">
            <Col lg={12} md={12} sm={12} className="px-3">
              <TabPage tabTitles={["Expenses"]}>
                <TabPane>
                  <span className="fw-bold small">Payments</span>
                  <Table
                    responsive
                    hover
                    size="sm"
                    className="table-data text-nowrap"
                  >
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Payment#</th>
                        <th>Description</th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>No records</tr>
                    </tbody>
                  </Table>
                </TabPane>
              </TabPage>
            </Col>
          </Row>
          <Row className="px-4">
            <Col className="d-flex justify-content-end me-5 mt-5">
              <Button
                size="sm"
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

export default CreateExpensesSchedulePage;
