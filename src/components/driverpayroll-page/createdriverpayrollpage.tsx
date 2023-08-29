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
  Table,
} from "reactstrap";
import { Header } from "../header";
import Profile from "../pofile";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { driverpayrollPage } from "../tms-object/driverpayrollpage";
import { PiGearDuotone } from "react-icons/pi";
import TableSortIcon from "../load-page/tableSortIcon";

type FormAction =
  | { type: "SET_driver"; payload: string }
  | { type: "SET_partner"; payload: string }
  | { type: "SET_date"; payload: string }
  | { type: "SET_byDelivery"; payload: string }
  | { type: "SET_byPickup"; payload: string };

const formReducer = (
  state: driverpayrollPage,
  action: FormAction
): driverpayrollPage => {
  switch (action.type) {
    case "SET_driver":
      return { ...state, driver: action.payload };
    case "SET_partner":
      return { ...state, partner: action.payload };
    case "SET_date":
      return { ...state, date: action.payload };
    case "SET_byDelivery":
      return { ...state, byDelivery: action.payload };
    case "SET_byPickup":
      return { ...state, byPickup: action.payload };
    default:
      return state;
  }
};

const initialState: driverpayrollPage = {
  driver: "",
  partner: "",
  date: "",
  byDelivery: "",
  byPickup: "",
};

const tableData = {
  tableHeaders: [
    "#",
    "Driver",
    "Assign On",
    "Returned On",
    "Equipment Owner",
    <PiGearDuotone />,
  ],
  tableRowData: [
    ["1", "Max payne", "06/14/23", "06/14/23", "Max payne", "options"],
    ["1", "Max payne", "06/14/23", "06/14/23", "Max payne", "options"],
  ],
};

const CreateDriverPayrollPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [formState, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formState);
  };

  return (
    <>
      <Navbar color="light" className="py-0 formpagenavbar">
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
          showHambuger={false}
        />
        <NavbarBrand className="fw-bold ps-4">New Driver Payroll</NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-3">
          <Profile />
        </div>
      </Navbar>
      <div className="m-2 load-itemmain" style={{ backgroundColor: "#E9F3FB" }}>
        <Form onSubmit={handleSubmit} className="load-item container p-4">
          <Row className="px-5">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="exampleSelect">Driver</Label>
                <Input
                  name="select"
                  type="select"
                  value={formState.driver}
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
          </Row>
          <Row className="px-5">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="exampleSelect">Partner</Label>
                <Input
                  id="exampleSelect"
                  name="select"
                  type="select"
                  value={formState.partner}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_partner",
                      payload: e.target.value,
                    });
                  }}
                  style={{ color: "black", border: "1px solid #418ECB" }}
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
            <Col className="mt-2">
              <h5 style={{ color: "#5E5E5E" }} className="fw-bold mt-3">
                Open Balance
              </h5>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="exampleDate">Date Range:From</Label>
                <Input
                  id="exampleDate"
                  type="date"
                  placeholder="select date"
                  value={formState.date}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_date",
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
                <Label for="exampleDate">Date Range:To</Label>
                <Input
                  id="exampleDate"
                  type="date"
                  placeholder="select date"
                  value={formState.date}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_date",
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
            <Col lg={3} md={6} sm={12} className="d-flex px-3 mt-4 gap-3">
              <FormGroup check>
                <Input
                  name="radio2"
                  type="radio"
                  value={formState.byPickup}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_byPickup",
                      payload: e.target.value,
                    });
                  }}
                />
                <Label check style={{ marginBottom: "0", fontSize: "small" }}>
                  By Pickup Date
                </Label>
              </FormGroup>
              <FormGroup check>
                <Input
                  name="radio2"
                  type="radio"
                  value={formState.byDelivery}
                  onChange={(e) => {
                    dispatch({
                      type: "SET_byDelivery",
                      payload: e.target.value,
                    });
                  }}
                />
                <Label check style={{ marginBottom: "0", fontSize: "small" }}>
                  By Delivery Date
                </Label>
              </FormGroup>
            </Col>
            <Col lg={1} md={6} sm={12} className="px-2 mt-4">
              <Button
                className="me-3"
                size="sm"
                style={{
                  display: "flex",
                  color: "black",
                  border: "1px solid #1E5367",
                  backgroundColor: "#AAF6A4",
                }}
              >
                <BiCheck fontSize={"16px"} />
                Apply
              </Button>
            </Col>
          </Row>
          <Row className="px-5 mt-4">
            <Col lg={10} md={10} sm={12}>
              <Table responsive hover className="table-data text-nowrap">
                <thead>
                  <tr>
                    {tableData.tableHeaders.map((headeritem, index) => (
                      <th key={index}>
                        <span>{headeritem}</span>

                        <TableSortIcon />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.tableRowData?.map((row, index) => (
                    <tr key={index}>
                      {row.map((item, index) => (
                        <td key={index}>{item}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row className="px-5">
            <Col className="d-flex justify-content-end mt-5 px-3">
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
                <RxCross2 fontSize={"16px"} color="red" /> Close
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default CreateDriverPayrollPage;
