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
  revenueByDispatcherReport,
  initialRevenueByDispatcherReportState,
} from "../../tms-object/reports";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

type FormAction =
  | { type: "SET_period"; payload: string }
  | { type: "SET_dispatcher"; payload: string }
  | { type: "SET_detailedReport"; payload: boolean }
  | { type: "SET_new"; payload: boolean }
  | { type: "SET_canelledStatus"; payload: boolean }
  | { type: "SET_cancelledBillingStatus"; payload: boolean }
  | { type: "SET_TOUN"; payload: boolean }
  | { type: "SET_dispatched"; payload: boolean }
  | { type: "SET_enRoute"; payload: boolean }
  | { type: "SET_pickedUp"; payload: boolean }
  | { type: "SET_delivered"; payload: boolean }
  | { type: "SET_closed"; payload: boolean }
  | { type: "SET_pending"; payload: boolean }
  | { type: "SET_bolReceived"; payload: boolean }
  | { type: "SET_invoiced"; payload: boolean }
  | { type: "SET_sentToFactoring"; payload: boolean }
  | { type: "SET_funded"; payload: boolean }
  | { type: "SET_paid"; payload: boolean };

const formReducer = (
  state: revenueByDispatcherReport,
  action: FormAction
): revenueByDispatcherReport => {
  switch (action.type) {
    case "SET_period":
      return { ...state, period: action.payload };
    case "SET_dispatcher":
      return { ...state, dispatcher: action.payload };
    case "SET_detailedReport":
      return { ...state, detailedReport: !state.detailedReport };
    case "SET_new":
      return { ...state, new: !state.new };
    case "SET_canelledStatus":
      return { ...state, canelledStatus: !state.canelledStatus };
    case "SET_cancelledBillingStatus":
      return {
        ...state,
        cancelledBillingStatus: !state.cancelledBillingStatus,
      };
    case "SET_TOUN":
      return { ...state, TOUN: !state.TOUN };
    case "SET_dispatched":
      return { ...state, dispatched: !state.dispatched };
    case "SET_enRoute":
      return { ...state, enRoute: !state.enRoute };
    case "SET_pickedUp":
      return { ...state, pickedUp: !state.pickedUp };
    case "SET_delivered":
      return { ...state, delivered: !state.delivered };
    case "SET_closed":
      return { ...state, closed: !state.closed };
    case "SET_pending":
      return { ...state, pending: !state.pending };
    case "SET_bolReceived":
      return { ...state, bolReceived: !state.bolReceived };
    case "SET_invoiced":
      return { ...state, invoiced: !state.invoiced };
    case "SET_sentToFactoring":
      return { ...state, sentToFactoring: !state.sentToFactoring };
    case "SET_funded":
      return { ...state, funded: !state.funded };
    case "SET_paid":
      return { ...state, paid: !state.paid };
    default:
      return state;
  }
};

const RevenueDispatcherPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [state, dispatch] = useReducer(
    formReducer,
    initialRevenueByDispatcherReportState
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
          Revenue By Dispatcher Report
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
                  <Label for="dispatcherSelect">Dispatcher</Label>
                  <Input
                    id="dispatcherSelect"
                    name="dispatcher"
                    type="select"
                    className="form-control form-control-sm"
                    value={state.dispatcher}
                    onChange={handleInput("SET_dispatcher")}
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </FormGroup>
              </Col>
              <Col lg={3} md={3} sm={12} className="mt-4 px-3">
                <FormGroup check>
                  <Input
                    type="checkbox"
                    checked={state.detailedReport}
                    onChange={handleCheckboxChange("SET_detailedReport")}
                  />
                  <Label check>Detailed Report</Label>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg={3} md={3} sm={12} className="px-3">
                <Label>Status</Label>
                <FormGroup check>
                  <Input
                    type="checkbox"
                    checked={state.new}
                    onChange={handleCheckboxChange("SET_new")}
                  />
                  <Label check>New</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    type="checkbox"
                    checked={state.canelledStatus}
                    onChange={handleCheckboxChange("SET_canelledStatus")}
                  />
                  <Label check>Cancelled</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    type="checkbox"
                    checked={state.TOUN}
                    onChange={handleCheckboxChange("SET_TOUN")}
                  />
                  <Label check>TOUN</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    type="checkbox"
                    checked={state.dispatched}
                    onChange={handleCheckboxChange("SET_dispatched")}
                  />
                  <Label check>Dispatched</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    type="checkbox"
                    checked={state.enRoute}
                    onChange={handleCheckboxChange("SET_enRoute")}
                  />
                  <Label check>En-Route</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    type="checkbox"
                    checked={state.pickedUp}
                    onChange={handleCheckboxChange("SET_pickedUp")}
                  />
                  <Label check>Picked-up</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    type="checkbox"
                    checked={state.delivered}
                    onChange={handleCheckboxChange("SET_delivered")}
                  />
                  <Label check>Delivered</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    type="checkbox"
                    checked={state.closed}
                    onChange={handleCheckboxChange("SET_closed")}
                  />
                  <Label check>Close</Label>
                </FormGroup>
              </Col>
              <Col lg={3} md={3} sm={12} className="px-3">
                <Label>Billing Status</Label>
                <FormGroup check>
                  <Input
                    type="checkbox"
                    checked={state.pending}
                    onChange={handleCheckboxChange("SET_pending")}
                  />
                  <Label check>Pending</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    type="checkbox"
                    checked={state.cancelledBillingStatus}
                    onChange={handleCheckboxChange(
                      "SET_cancelledBillingStatus"
                    )}
                  />
                  <Label check>Cancelled</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    type="checkbox"
                    checked={state.bolReceived}
                    onChange={handleCheckboxChange("SET_bolReceived")}
                  />
                  <Label check>BOL Recieved</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    type="checkbox"
                    checked={state.invoiced}
                    onChange={handleCheckboxChange("SET_invoiced")}
                  />
                  <Label check>Invoiced</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    type="checkbox"
                    checked={state.sentToFactoring}
                    onChange={handleCheckboxChange("SET_sentToFactoring")}
                  />
                  <Label check>Sent to Factoring</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    type="checkbox"
                    checked={state.funded}
                    onChange={handleCheckboxChange("SET_funded")}
                  />
                  <Label check>Funded</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    type="checkbox"
                    checked={state.paid}
                    onChange={handleCheckboxChange("SET_paid")}
                  />
                  <Label check>Paid</Label>
                </FormGroup>
              </Col>
              <Col
                lg={6}
                md={6}
                sm={12}
                className="px-3 d-flex justify-content-end align-items-end"
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

export default RevenueDispatcherPage;
