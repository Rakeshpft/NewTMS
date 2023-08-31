import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  Table,
  Button,
  Input,
  InputGroup,
  InputGroupText,
  Card,
  CardBody,
  Collapse,
  FormGroup,
  Label,
  Form,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Col,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import { Header, SideBar } from "../../header";
import Profile from "../../pofile";
import { BsSearch, BsSliders2 } from "react-icons/bs";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
import { PiGearDuotone, PiPencilBold } from "react-icons/pi";
import TableSortIcon from "../../load-page/tableSortIcon";

const tableData = {
  tableHeaders: [
    "#",
    "Date",
    "Driver",
    "Fuel Card",
    "Truck",
    "Trailer",
    "Location",
    "Fuel Amount",
    "Fuel units, Gallons",
    "Product Code",
    "Included In IFTA",
    "Partner",
    "Billing",
    "Actions",
    <PiGearDuotone />,
    ,
  ],
  tableRowData: [
    [
      "1",
      "06/14/23",
      "Max payne [drv]",
      "123456789",
      "Joliet, IL",
      "Cameron, IL",
      "Lumper",
      "$500.00",
      "$500.00",
      "Lumper",
      "Lumper",
      "Lumper",
      "Lumper",
      "Lumper",
      "Lumper",
    ],
    [
      "1",
      "06/14/23",
      "Max payne [drv]",
      "123456789",
      "Joliet, IL",
      "Cameron, IL",
      "Lumper",
      "$500.00",
      "$500.00",
      "Lumper",
      "Lumper",
      "Lumper",
      "Lumper",
      "Lumper",
      "Lumper",
    ],
    [
      "1",
      "06/14/23",
      "Max payne [drv]",
      "123456789",
      "Joliet, IL",
      "Cameron, IL",
      "Lumper",
      "$500.00",
      "$500.00",
      "Lumper",
      "Lumper",
      "Lumper",
      "Lumper",
      "Lumper",
      "Lumper",
    ],
    [
      "1",
      "06/14/23",
      "Max payne [drv]",
      "123456789",
      "Joliet, IL",
      "Cameron, IL",
      "Lumper",
      "$500.00",
      "$500.00",
      "Lumper",
      "Lumper",
      "Lumper",
      "Lumper",
      "Lumper",
      "Lumper",
    ],
  ],
};

const FuelTransaction = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // const [dropdownOpen, setDropdownOpen] = useState(false);

  // const toggle = () => setDropdownOpen((prevState) => !prevState);

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
        <NavbarBrand className="fw-bold px-4">Fuel Transactions</NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex justify-content-end ms-auto align-items-center column-gap-2">
            <InputGroup className="shadow-sm border-secondary">
              <InputGroupText className="bg-white">
                <BsSearch size={16} />
              </InputGroupText>
              <Input
                placeholder="Search"
                className="border-start-0 border-end-0"
              />
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
          <Link
            className="btn btn-sm btn-outline-primary"
            to="/createfueltransaction"
          >
            <AiOutlinePlus />
            New Fuel Transaction
          </Link>
          <Profile />
        </div>
      </Navbar>
      <div className="content d-flex">
        <SideBar isSidebarOpen={!isSidebarOpen} activePageId={5} />
        <div className="aria-content">
          {isOpen && (
            <Collapse isOpen={isOpen}>
              <Card style={{ backgroundColor: "#E9F3FB" }} className="mb-3">
                <CardBody>
                  <Form onSubmit={handleSearchSubmit}>
                    <Row className="px-5">
                      <Col>
                        <Row>
                          <Col>
                            <h5 className="text-info fw-bold ">
                              Search Filter
                            </h5>
                          </Col>
                        </Row>
                        <Row>
                          <Col lg="2" md="6">
                            <FormGroup>
                              <Label>Start Date</Label>
                              <Input
                                bsSize="sm"
                                id="exampleSelect"
                                name="select"
                                type="date"
                                style={{
                                  color: "black",
                                  border: "1px solid #418ECB",
                                }}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label>Product Code</Label>
                              <Input
                                bsSize="sm"
                                id="exampleSelect"
                                name="select"
                                type="text"
                                style={{
                                  color: "black",
                                  border: "1px solid #418ECB",
                                }}
                              />
                            </FormGroup>

                            <FormGroup>
                              <Label>Billing</Label>
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
                          <Col lg="2" md="6">
                            <FormGroup>
                              <Label>End Date</Label>
                              <Input
                                bsSize="sm"
                                id="exampleSelect"
                                name="select"
                                type="date"
                                style={{
                                  color: "black",
                                  border: "1px solid #418ECB",
                                }}
                              />
                            </FormGroup>
                            <FormGroup>
                              <Label>Additional Payee</Label>
                              <Input
                                bsSize="sm"
                                id="exampleSelect"
                                name="text"
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
                              <Label>Included in IFTA Calculation</Label>
                              <Input
                                bsSize="sm"
                                id="exampleSelect"
                                name="text"
                                type="text"
                                style={{
                                  color: "black",
                                  border: "1px solid #418ECB",
                                }}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="2" md="6">
                            <FormGroup>
                              <Label>Imported Report</Label>
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
                              <Label>Fuel Card</Label>
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
                              <Label>Truck</Label>
                              <Input
                                bsSize="sm"
                                id="exampleSelect"
                                name="select"
                                type="text"
                                style={{
                                  color: "black",
                                  border: "1px solid #418ECB",
                                }}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="2" md="6">
                            {" "}
                            <FormGroup>
                              <Label>Driver</Label>
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
                            </FormGroup>{" "}
                            <FormGroup>
                              <Label>State</Label>
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
                            </FormGroup>{" "}
                            <FormGroup>
                              <Label>Trailer</Label>
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
                          <Col
                            lg="2"
                            md="6"
                            className="d-flex flex-column justify-content-between"
                          >
                            <div>
                              <FormGroup>
                                <Label>Partner</Label>
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
                                <Label>Driver Type</Label>
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
                            </div>

                            <FormGroup className="align-self-end">
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
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Collapse>
          )}
          <div className="mb-2">
            <Form className="d-flex gap-2">
              <FormGroup check>
                <Input type="checkbox" />
              </FormGroup>
              <UncontrolledDropdown>
                <DropdownToggle
                  color="primary"
                  caret
                  size="sm"
                  className="py-0"
                >
                  <PiPencilBold />
                  <span className="small">Generate Driver deductions</span>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem>Some Action</DropdownItem>
                  <DropdownItem text>Dropdown Item Text</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <UncontrolledDropdown>
                <DropdownToggle
                  color="success"
                  caret
                  size="sm"
                  className="py-0"
                >
                  <BiCheck />
                  <span className="small">Marks as 'Included in IFTA'</span>
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem>Some Action</DropdownItem>
                  <DropdownItem text>Dropdown Item Text</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Form>
          </div>
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

export default FuelTransaction;
