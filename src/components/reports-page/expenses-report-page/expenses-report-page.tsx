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
import {
  expensesReportPage,
  initialExpensesReportPageState,
} from "../../tms-object/reports";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

type FormAction =
  | { type: "SET_period"; payload: string }
  | { type: "SET_category"; payload: string }
  | { type: "SET_detailedReport"; payload: boolean };

const formReducer = (
  state: expensesReportPage,
  action: FormAction
): expensesReportPage => {
  switch (action.type) {
    case "SET_period":
      return { ...state, period: action.payload };
    case "SET_category":
      return { ...state, category: action.payload };
    case "SET_detailedReport":
      return { ...state, detailedReport: !state.detailedReport };
    default:
      return state;
  }
};

const ExpensesReportPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [state, dispatch] = useReducer(
    formReducer,
    initialExpensesReportPageState
  );

  const handleInput =
    (type: FormAction["type"]) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      dispatch({ type, payload: event.target.value } as FormAction);
    };

  const handleCheckboxChange =
    (type: FormAction["type"]) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type,
        payload: event.target.checked,
      } as unknown as FormAction);
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
          Expenses Report
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
              <Col lg={3} md={3} sm={12} className="px-3">
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
              <Col lg={3} md={3} sm={12} className="px-3">
                <FormGroup>
                  <Label for="categorySelect">Category</Label>
                  <Input
                    id="categorySelect"
                    name="category"
                    type="select"
                    className="form-control form-control-sm"
                    value={state.category}
                    onChange={handleInput("SET_category")}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col lg={2} md={2} sm={12} className="mt-4 px-3">
                <FormGroup check>
                  <Input
                    type="checkbox"
                    checked={state.detailedReport}
                    onChange={handleCheckboxChange("SET_detailedReport")}
                  />
                  <Label check>Detailed Report</Label>
                </FormGroup>
              </Col>
              <Col lg={4} md={4} sm={12} className="px-3 mt-4">
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
          </Form>
        </div>
      </div>
    </>
  );
};

export default ExpensesReportPage;
