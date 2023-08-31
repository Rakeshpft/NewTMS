import React, { useState } from "react";
import { AiOutlineFileExcel, AiOutlinePlus } from "react-icons/ai";
import { MdOutgoingMail } from "react-icons/md";
import { PiFilePdfDuotone, PiGearDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Table,
  Button,
  Input,
  Card,
  CardBody,
  Collapse,
  FormGroup,
  Label,
  Form,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Col,
  Row,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { Header, SideBar } from "../header";
import Profile from "../pofile";
import { BsSearch, BsSliders2 } from "react-icons/bs";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import TableSortIcon from "../load-page/tableSortIcon";

const tableData = {
  tableHeaders: [
    "#",
    "Date",
    "Payable To",
    "Driver",
    "Settlement Total",
    "Email",
    "Status",
    "Notes",
    "Actions",
    <PiGearDuotone />,
  ],
  tableRowData: [
    [
      "1",
      "06/14/23",
      "Max payne [drv]",
      "002063566 ONTARIO",
      "100.00",
      "Max payne [drv]",
      "Active",
      "options",
      "options",
      "options",
    ],
    [
      "1",
      "06/14/23",
      "Max payne [drv]",
      "002063566 ONTARIO",
      "100.00",
      "Max payne [drv]",
      "Active",
      "options",
      "options",
      "options",
    ],
    [
      "1",
      "06/14/23",
      "Max payne [drv]",
      "002063566 ONTARIO",
      "100.00",
      "Max payne [drv]",
      "Active",
      "options",
      "options",
      "options",
    ],
  ],
};

const DriverPayRoll = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

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
        <NavbarBrand className="fw-bold px-4">Driver Payroll</NavbarBrand>
        <Nav className="me-auto" navbar>
          <div className="d-flex gap-2 align-items-center">
            <NavItem className="small h6 mb-0">Export</NavItem>
            <div className="d-flex justify-content-between gap-2">
              <Link to={"#!"}>
                <PiFilePdfDuotone className="text-danger fs-4" />
              </Link>
              <Link to={"#"}>
                <AiOutlineFileExcel className="text-success fs-4" />
              </Link>
              <Link to={"#!"}>
                <MdOutgoingMail className="fs-4" />
              </Link>
            </div>
          </div>
        </Nav>
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex justify-content-end ms-auto align-items-center column-gap-2">
            <InputGroup
              bssize="sm"
              Group
              className="shadow-sm border-secondary"
            >
              <InputGroupText bssize="sm" GroupText className="bg-white">
                <BsSearch size={16} />
              </InputGroupText>
              <Input
                bssize="sm"
                placeholder="Search"
                className="border-start-0 border-end-0"
              />
              <InputGroupText bssize="sm" GroupText className="bg-white">
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
            to="/createdriverpayroll"
          >
            <AiOutlinePlus />
            New Driver Payroll
          </Link>
          <Profile />
        </div>
      </Navbar>
      <div className="content d-flex">
        <SideBar isSidebarOpen={!isSidebarOpen} activePageId={6} />
        <div className="aria-content">
          {isOpen && (
            <Collapse isOpen={isOpen}>
              <Card style={{ backgroundColor: "#E9F3FB" }} className="mb-3">
                <CardBody>
                  <Form onSubmit={handleSearchSubmit}>
                    <Row className="px-5">
                      <Col>
                        <h5 className="fw-bold text-info">Search Filter</h5>
                        <Row>
                          <Col lg={2} md={6} sm={12} className="px-3">
                            <FormGroup>
                              <Label for="exampleSelect">Status</Label>
                              <Input
                                bssize="sm"
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
                          <Col lg={2} md={6} sm={12} className="px-3">
                            <FormGroup>
                              <Label for="exampleSelect">Settlement</Label>
                              <Input
                                bssize="sm"
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
                          <Col lg={2} md={6} sm={12} className="px-3">
                            <FormGroup>
                              <Label for="exampleSelect">Amount Range:To</Label>
                              <Input
                                bssize="sm"
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
                          <Col lg={2} md={6} sm={12} className="px-3">
                            <FormGroup>
                              <Label for="exampleSelect">
                                Amount Range:Form
                              </Label>
                              <Input
                                bssize="sm"
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
                        </Row>
                        <Row>
                          <Col lg={2} md={6} sm={12} className="px-3">
                            <FormGroup>
                              <Label for="exampleSelect">Date Range:To</Label>
                              <Input
                                bssize="sm"
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
                          <Col lg={2} md={6} sm={12} className="px-3">
                            <FormGroup>
                              <Label for="exampleSelect">Date Range:Form</Label>
                              <Input
                                bssize="sm"
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
                          <Col lg={2} md={6} sm={12} className="px-3">
                            <FormGroup>
                              <Label for="exampleSelect">Partner</Label>
                              <Input
                                bssize="sm"
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
                          <Col lg={2} md={6} sm={12} className="px-3">
                            <FormGroup>
                              <Label for="exampleSelect">Driver</Label>
                              <Input
                                bssize="sm"
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
                          <Col lg={2} md={6} sm={12} className="px-3 mt-4">
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
                  </Form>
                </CardBody>
              </Card>
            </Collapse>
          )}
          <Form>
            <FormGroup check>
              <Input
                bssize="sm"
                type="checkbox"
                style={{
                  width: "20px",
                  height: "20px",
                  color: "black",
                  border: "1px solid #418ECB",
                }}
              />
              <Dropdown isOpen={dropdownOpen} toggle={toggle} size="sm">
                <DropdownToggle
                  style={{ backgroundColor: "#0B8E00" }}
                  caret
                  size="sm"
                >
                  Batch Actions
                </DropdownToggle>
                <DropdownMenu>
                  <DropdownItem header>Header</DropdownItem>
                  <DropdownItem>Some Action</DropdownItem>
                  <DropdownItem text>Dropdown Item Text</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </FormGroup>
          </Form>
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

export default DriverPayRoll;
