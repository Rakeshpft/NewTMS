import React, { useReducer, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  Form,
  Row,
  FormGroup,
  Input,
  Label,
  Col,
  Button,
} from "reactstrap";
import { Header } from "../header";
import Profile from "../pofile";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import {
  driverpayrollPage,
  initialDriverPayRollPageState,
} from "../tms-object/driverpayrollpage";
import { PiGearDuotone } from "react-icons/pi";
// import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { routes } from "../routes/routes";
import { GenericTable } from "../table";

type FormAction =
  | { type: "SET_driver"; payload: string }
  | { type: "SET_partner"; payload: string }
  | { type: "SET_dateRangeTo"; payload: string }
  | { type: "SET_dateRangeFrom"; payload: string }
  | { type: "SET_radiovalue"; payload: string };

const formReducer = (
  state: driverpayrollPage,
  action: FormAction
): driverpayrollPage => {
  switch (action.type) {
    case "SET_driver":
      return { ...state, driver: action.payload };
    case "SET_partner":
      return { ...state, partner: action.payload };
    case "SET_dateRangeTo":
      return { ...state, dateRangeTo: action.payload };
    case "SET_dateRangeFrom":
      return { ...state, dateRangeFrom: action.payload };
    case "SET_radiovalue":
      return { ...state, radiovalue: action.payload };
    default:
      return state;
  }
};

const tableHeaders = [
  "#",
  "Driver",
  "Assign On",
  "Returned On",
  "Equipment Owner",
  <PiGearDuotone />,
];

const tableData = [
  {
    "#": "1",
    Driver: "Max payne",
    "Assign On": "06/14/23",
    "Returned On": "06/14/23",
    "Equipment Owner": "Max payne",
  },
  {
    "#": "2",
    Driver: "Max payne",
    "Assign On": "06/14/23",
    "Returned On": "06/14/23",
    "Equipment Owner": "Max payne",
  },
];

const CreateNewDriverPayrollPage = () => {
  // const history = useHistory();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formState, dispatch] = useReducer(
    formReducer,
    initialDriverPayRollPageState
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
    console.log(formState);
  };

  const handleCancleButton = () => {
    // {
    //   history.location.pathname === routes.dashboard
    //     ? history.push(routes.driverPayRoll)
    //     : history.goBack();
    // }
    {
      navigate(routes.driverPayRoll);
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
        <NavbarBrand className="fw-bold px-4">New Driver Payroll</NavbarBrand>
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
                <Label for="driver">Driver</Label>
                <Input
                  name="driver"
                  id="driver"
                  type="select"
                  value={formState.driver}
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
          </Row>
          <Row className="px-5">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="partner">Partner</Label>
                <Input
                  id="partner"
                  name="partner"
                  type="select"
                  value={formState.partner}
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
          <Row className="px-5 mt-3">
            <Col lg={2} md={4} className="mt-2">
              <h5 style={{ color: "#5E5E5E" }} className="fw-bold mt-3">
                Open Balance
              </h5>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="dateRangeFrom">Date Range:From</Label>
                <Input
                  id="dateRangeFrom"
                  type="date"
                  name="dateRangeFrom"
                  value={formState.dateRangeFrom}
                  onChange={handleInput("SET_dateRangeFrom")}
                  className="form-control form-control-sm"
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="dateRangeTo">Date Range:To</Label>
                <Input
                  id="dateRangeTo"
                  type="date"
                  name="dateRangeTo"
                  value={formState.dateRangeTo}
                  onChange={handleInput("SET_dateRangeTo")}
                  className="form-control form-control-sm"
                />
              </FormGroup>
            </Col>
            <Col
              lg={4}
              md={6}
              sm={12}
              className="d-flex px-3 mt-4 gap-2 align-items-center"
            >
              <FormGroup check>
                <Input
                  name="radio2"
                  type="radio"
                  value="By Pickup Date"
                  checked={formState.radiovalue === "By Pickup Date"}
                  onChange={handleInput("SET_radiovalue")}
                />
                <Label check>By Pickup Date</Label>
              </FormGroup>
              <FormGroup check>
                <Input
                  name="radio2"
                  type="radio"
                  value="By Delivery Date"
                  checked={formState.radiovalue === "By Delivery Date"}
                  onChange={handleInput("SET_radiovalue")}
                />
                <Label check>By Delivery Date</Label>
              </FormGroup>

              <Button className="me-3" size="sm" color="success">
                <BiCheck fontSize={"16px"} />
                Apply
              </Button>
            </Col>
          </Row>
          <Row className="px-5 mt-4">
            <Col sm={12}>
              <GenericTable
                tableData={tableData}
                tableHeaders={tableHeaders}
                defaultSortColumn="Driver"
              />
            </Col>
          </Row>
          <Row className="px-5">
            <Col className="d-flex justify-content-end mt-5 px-3">
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

export default CreateNewDriverPayrollPage;
