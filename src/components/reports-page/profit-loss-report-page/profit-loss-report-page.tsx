import React, { useReducer, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Navbar,
  NavbarBrand,
  Row,
} from "reactstrap";
import { Header, SideBar } from "../../header";
import Profile from "../../pofile";
import {
  profitLossReportPage,
  initialProfitLossReportPageState,
} from "../../tms-object/reports";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

type FormAction =
  | { type: "SET_period"; payload: string }
  | { type: "SET_driver"; payload: string }
  | { type: "SET_truck"; payload: string }
  | { type: "SET_radioValue1"; payload: string };

const formReducer = (
  state: profitLossReportPage,
  action: FormAction
): profitLossReportPage => {
  switch (action.type) {
    case "SET_period":
      return { ...state, period: action.payload };
    case "SET_driver":
      return { ...state, driver: action.payload };
    case "SET_truck":
      return { ...state, truck: action.payload };
    case "SET_radioValue1":
      return { ...state, radioValue1: action.payload };
    default:
      return state;
  }
};

const ProfitLossReportPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [state, dispatch] = useReducer(
    formReducer,
    initialProfitLossReportPageState
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

  const handleReset = () => {
    console.log("reset");
  };

  return (
    <>
      <Navbar color="light" className="formpagenavbar" container={false}>
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        />
        <NavbarBrand className="fw-bold px-4 me-auto">
          Profit and Loss Report
        </NavbarBrand>
        <div className="d-flex align-items-center gap-3">
          <Profile />
        </div>
      </Navbar>
      <div className="content d-flex">
        <SideBar isSidebarOpen={!isSidebarOpen} activePageId={8} />
        <div className="load-itemmain m-2">
          <Form className="load-item container p-5" onSubmit={handleSubmit}>
            <Row>
              <Col lg={3} md={3} sm={12}>
                <FormGroup>
                  <Label for="periodSelect">Period</Label>
                  <Input
                    id="periodSelect"
                    name="period"
                    type="select"
                    className="form-control form-control-sm"
                    value={state.period}
                    onChange={handleInput("SET_period")}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col lg={3} md={3} sm={12}>
                <FormGroup>
                  <Label for="driverSelect">Driver</Label>
                  <Input
                    id="driverSelect"
                    name="driver"
                    type="select"
                    className="form-control form-control-sm"
                    value={state.driver}
                    onChange={handleInput("SET_driver")}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col lg={3} md={3} sm={12}>
                <FormGroup>
                  <Label for="truckSelect">Truck</Label>
                  <Input
                    id="truckSelect"
                    name="truck"
                    type="select"
                    className="form-control form-control-sm"
                    value={state.truck}
                    onChange={handleInput("SET_truck")}
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
              <Col lg={3} md={3} sm={12} className="px-3">
                <Row>
                  <Col md={12}>
                    <FormGroup check>
                      <Input
                        name="radio1"
                        type="radio"
                        value="By Pickup Date"
                        checked={state.radioValue1 === "By Pickup Date"}
                        onChange={handleInput("SET_radioValue1")}
                      />
                      <Label check>By Pickup Date</Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input
                        name="radio1"
                        type="radio"
                        value={"By Delivery Date"}
                        checked={state.radioValue1 === "By Delivery Date"}
                        onChange={handleInput("SET_radioValue1")}
                      />
                      <Label check>By Delivery Date</Label>
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col
                lg={9}
                md={9}
                sm={12}
                className="d-flex justify-content-end align-items-end"
              >
                <Button
                  size="sm"
                  className="me-3"
                  style={{
                    color: "black",
                    border: "1px solid #1E5367",
                    backgroundColor: "#8FF086",
                  }}
                >
                  <BiCheck fontSize={"16px"} />
                  Run Report
                </Button>
                <Button
                  size="sm"
                  style={{
                    color: "black",
                    border: "1px solid #1E5367",
                    backgroundColor: "#B7D1E6",
                  }}
                  onClick={handleReset}
                >
                  <RxCross2 fontSize={"16px"} color="black" />
                  Set to Default
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ProfitLossReportPage;
