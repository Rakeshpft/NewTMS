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
import { Header, SideBar } from "../../shared";
import Profile from "../../pofile";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import {
  grossProfitReportPage,
  initialGrossProfitReportPageState,
} from "../../tms-object/reports";

type FormAction =
  | { type: "SET_period"; payload: string }
  | { type: "SET_driver"; payload: string }
  | { type: "SET_truck"; payload: string };

const formReducer = (
  state: grossProfitReportPage,
  action: FormAction
): grossProfitReportPage => {
  switch (action.type) {
    case "SET_period":
      return { ...state, period: action.payload };
    case "SET_driver":
      return { ...state, driver: action.payload };
    case "SET_truck":
      return { ...state, truck: action.payload };
    default:
      return state;
  }
};

const GrossProfitReportPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [state, dispatch] = useReducer(
    formReducer,
    initialGrossProfitReportPageState
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
          Gross Profit Report
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
              <Col lg={6} md={6} sm={12}>
                <Row>
                  <Col lg={4} md={4} sm={12}>
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
                  <Col lg={4} md={4} sm={12}>
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
                  <Col lg={4} md={4} sm={12}>
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
              </Col>
              <Col lg={6} md={6} sm={12}>
                <Row>
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    className="d-flex justify-content-end align-items-end mt-4"
                  >
                    <Button
                      size="sm"
                      style={{
                        color: "black",
                        border: "1px solid #1E5367",
                        backgroundColor: "#8FF086",
                      }}
                      className="me-3"
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
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
};

export default GrossProfitReportPage;
