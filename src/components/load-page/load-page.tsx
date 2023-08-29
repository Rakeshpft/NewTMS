import React, { useState } from "react";
import { Header, SideBar } from "../header";
import {
  Button,
  Card,
  CardBody,
  Col,
  Collapse,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Nav,
  Navbar,
  NavbarBrand,
  Row,
  Table,
} from "reactstrap";
import Profile from "../pofile";
import { Link } from "react-router-dom";
import { BiCheck } from "react-icons/bi";
import { BsSearch, BsSliders2 } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
import { PiGearDuotone } from "react-icons/pi";
import TableSortIcon from "./tableSortIcon";

const tableData = {
  tableHeaders: [
    "Load",
    "Date",
    "Driver",
    "Broker",
    "PO#",
    "Pickup",
    "Delivery",
    "Rate",
    "Completed",
    "Status",
    "Billing",
    "Notes",
    "Attachments",
    "Actions",
    <PiGearDuotone />,
  ],
  tableRowData: [
    [
      "1001",
      "06/14/23",
      "Max payne [drv]",
      "002063566 ONTARIO",
      "-",
      "Joliet, IL",
      "Cameron, IL",
      "$500.00",
      "06/25/23",
      "Delivered - badge",
      "Invoiced",
      "Lumper: $50.00 :: Detention: $50.00",
      "[file-icon]",
      "Lumper",
      "[options]",
    ],
    [
      "1002",
      "06/15/23",
      "Max payne [drv]",
      "002063566 ONTARIO",
      "-",
      "Joliet, IL",
      "Cameron, IL",
      "$500.00",
      "06/25/23",
      "Delivered - badge",
      "Invoiced",
      "Lumper: $50.00 :: Detention: $50.00",
      "[file-icon]",
      "Lumper",
      "[options]",
    ],
    [
      "1004",
      "06/14/23",
      "Max payne [drv]",
      "002063566 ONTARIO",
      "-",
      "Joliet, IL",
      "Cameron, IL",
      "$500.00",
      "06/25/23",
      "Delivered - badge",
      "Invoiced",
      "Lumper: $50.00 :: Detention: $50.00",
      "[file-icon]",
      "Lumper",
      "[options]",
    ],
    [
      "1007",
      "06/14/23",
      "Max payne [drv]",
      "002063566 ONTARIO",
      "-",
      "Joliet, IL",
      "Cameron, IL",
      "$500.00",
      "06/25/23",
      "Delivered - badge",
      "Invoiced",
      "Lumper: $50.00 :: Detention: $50.00",
      "[file-icon]",
      "Lumper",
      "[options]",
    ],
  ],
};

const LoadPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  function searchToggle(): void {
    console.log("search");
    setIsOpen((isOpen) => !isOpen);
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("search");
  };
  return (
    <>
      <Navbar color="light" className="py-0">
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        />
        <NavbarBrand className="fw-bold px-4">Loads</NavbarBrand>
        <Nav className="me-auto" navbar>
          <div className="d-flex gap-1 align-items-center">
            <div className="x-small fw-bold">Period</div>
            <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
              <DropdownToggle
                variant="secondary"
                size="sm"
                className="border-0 p-0 px-2 d-flex column-gap-2 align-items-center"
              >
                All ▼
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>This Year</DropdownItem>
                <DropdownItem>This Month</DropdownItem>
                <DropdownItem>This Week</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Nav>
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex justify-content-end ms-auto align-items-center column-gap-2">
            <InputGroup className="shadow-sm border-secondary">
              <InputGroupText className="bg-white">
                <BsSearch size={16} />
              </InputGroupText>
              <Input placeholder="Search" className=" search" />
              <InputGroupText className="bg-white">
                <Button
                  color="link"
                  size="sm"
                  className="p-0"
                  onClick={() => searchToggle()}
                >
                  <BsSliders2 size={16} />
                </Button>
              </InputGroupText>
            </InputGroup>
          </div>

          <Link className="btn btn-sm btn-outline-primary" to="/createload">
            <AiOutlinePlus />
            New Load
          </Link>
          <Profile />
        </div>
      </Navbar>
      <div className="content d-flex">
        <SideBar isSidebarOpen={!isSidebarOpen} />
        <div className="aria-content">
          {isOpen && (
            <Collapse isOpen={isOpen}>
              <Card style={{ backgroundColor: "#E9F3FB" }}>
                <CardBody>
                  <Form
                    onSubmit={handleSearchSubmit}
                    className="loadsSearchForm"
                  >
                    <Row className="mb-2">
                      <Col>
                        <h5 className="text-info mt-2 fw-bold">
                          Search Filter
                        </h5>
                      </Col>
                    </Row>
                    <div className="ps-lg-5">
                      <Row className="mb-2">
                        <Col lg={2} md={4} sm={12}>
                          <FormGroup>
                            <Label for="exampleSelect">Period</Label>
                            <Input
                              bsSize="sm"
                              id="exampleSelect"
                              name="select"
                              type="select"
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
                          <FormGroup>
                            <Label for="exampleSelect">Pickup Date</Label>
                            <Input
                              bsSize="sm"
                              id="exampleSelect"
                              name="select"
                              type="date"
                              style={{
                                color: "black",
                                border: "1px solid #418ECB",
                              }}
                            ></Input>
                          </FormGroup>
                          <FormGroup>
                            <Label for="exampleSelect">Delivery Date</Label>
                            <Input
                              bsSize="sm"
                              id="exampleSelect"
                              name="select"
                              type="date"
                              style={{
                                color: "black",
                                border: "1px solid #418ECB",
                              }}
                            ></Input>
                          </FormGroup>
                        </Col>
                        <Col lg={2} md={4} sm={12}>
                          <FormGroup>
                            <Label for="exampleSelect">Broker</Label>
                            <Input
                              bsSize="sm"
                              id="exampleSelect"
                              name="select"
                              type="select"
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
                          <FormGroup>
                            <Label for="exampleSelect">City</Label>
                            <Input
                              bsSize="sm"
                              id="exampleSelect"
                              name="text"
                              type="text"
                              style={{
                                color: "black",
                                border: "1px solid #418ECB",
                              }}
                            ></Input>
                          </FormGroup>
                          <FormGroup>
                            <Label for="exampleSelect">City</Label>
                            <Input
                              bsSize="sm"
                              id="exampleSelect"
                              name="text"
                              type="text"
                              style={{
                                color: "black",
                                border: "1px solid #418ECB",
                              }}
                            ></Input>
                          </FormGroup>
                        </Col>
                        <Col lg={2} md={4} sm={12}>
                          <FormGroup>
                            <Label for="exampleSelect">Driver</Label>
                            <Input
                              bsSize="sm"
                              id="exampleSelect"
                              name="select"
                              type="select"
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
                          <FormGroup>
                            <Label for="exampleSelect">State</Label>
                            <Input
                              bsSize="sm"
                              id="exampleSelect"
                              name="select"
                              type="text"
                              style={{
                                color: "black",
                                border: "1px solid #418ECB",
                              }}
                            ></Input>
                          </FormGroup>
                          <FormGroup>
                            <Label for="exampleSelect">State</Label>
                            <Input
                              bsSize="sm"
                              id="exampleSelect"
                              name="select"
                              type="text"
                              style={{
                                color: "black",
                                border: "1px solid #418ECB",
                              }}
                            ></Input>
                          </FormGroup>
                        </Col>
                        <Col lg={2} md={4} sm={12}>
                          <FormGroup>
                            <Label for="exampleSelect">Dispatcher</Label>
                            <Input
                              bsSize="sm"
                              id="exampleSelect"
                              name="select"
                              type="select"
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
                          <FormGroup>
                            <Label for="exampleSelect">Truck</Label>
                            <Input
                              bsSize="sm"
                              id="exampleSelect"
                              name="select"
                              type="select"
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
                          <FormGroup>
                            <Label for="exampleSelect">Trailer</Label>
                            <Input
                              bsSize="sm"
                              id="exampleSelect"
                              name="select"
                              type="select"
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
                        <Col lg={2} md={4} sm={12}>
                          <FormGroup>
                            <Label for="exampleSelect">
                              Direct Billing/Factoring
                            </Label>
                            <Input
                              bsSize="sm"
                              id="exampleSelect"
                              name="select"
                              type="select"
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
                      <Row className="small">
                        <Col md="8">
                          <Table
                            borderless
                            responsive
                            size="sm"
                            className="checkboxTable"
                          >
                            <tbody>
                              <tr>
                                <th>
                                  <Label className="fw-bold me-3 _fixWidth">
                                    Status
                                  </Label>
                                </th>
                                <td>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>New</Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>Dispatched</Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>TOUN</Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>Cancelled</Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>En-Route</Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>Picked-up</Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>Delivered</Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>Close</Label>
                                  </FormGroup>
                                </td>
                              </tr>
                              <tr>
                                <th>
                                  <Label className="fw-bold me-3 _fixWidth">
                                    Billing Status
                                  </Label>
                                </th>
                                <td>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>Pending</Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>Cancelled</Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>BOL Received</Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>Invoiced</Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>Sent to Factoring</Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>Funded</Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>Paid</Label>
                                  </FormGroup>
                                </td>
                              </tr>
                              <tr>
                                <th>
                                  <Label className="fw-bold me-3 _fixWidth">
                                    Location Status
                                  </Label>
                                </th>
                                <td>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>No</Label>
                                  </FormGroup>
                                  <FormGroup check inline>
                                    <Input id="checkbox2" type="checkbox" />
                                    <Label check>Yes</Label>
                                  </FormGroup>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                        </Col>
                        <Col md="4">
                          <Row className="align-items-center d-flex h-100">
                            <Col
                              md="6"
                              className="d-flex justify-content-end align-items-end"
                            >
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
                                Apply
                              </Button>
                              <Button
                                size="sm"
                                style={{
                                  color: "red",
                                  border: "1px solid red",
                                  backgroundColor: "white",
                                }}
                              >
                                <RxCross2 fontSize={"16px"} color="red" /> Clear
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Collapse>
          )}
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
        </div>
      </div>
    </>
  );
};

export default LoadPage;
