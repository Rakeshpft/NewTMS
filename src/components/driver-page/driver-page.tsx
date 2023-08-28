import React, { useState } from "react";
import { MdOutgoingMail } from "react-icons/md";
import { AiOutlineFileExcel, AiOutlinePlus } from "react-icons/ai";
import { PiFilePdfDuotone } from "react-icons/pi";
import {
  Button,
  Card,
  CardBody,
  Col,
  Collapse,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  Row,
  Table,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Header, SideBar } from "../header";
import Profile from "../pofile";
import { BiCheck } from "react-icons/bi";
import { BsSearch, BsSliders2 } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { PiGearDuotone } from "react-icons/pi";
import TableSortIcon from "../load-page/tableSortIcon";

const tableData = {
  tableHeaders: [
    "#",
    "Name",
    "Type",
    "Status",
    "Hire Date",
    "Term Date",
    "Phone",
    "Email",
    "Truck",
    "Trailer",
    "Payable To",
    "Warnings",
    "Driver App",
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

const DriverPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
      <Navbar color="light" className="py-0 formpagenavbar">
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        />
        <NavbarBrand className="fw-bold ps-4">Driver</NavbarBrand>
        <Nav className="me-auto" navbar>
          <div className="d-flex gap-2">
            <NavItem>Export</NavItem>
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
          <Link className="btn btn-sm btn-outline-primary" to="/createdriver">
            <AiOutlinePlus />
            New Driver
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
                  <Form onSubmit={handleSearchSubmit}>
                    <Row className="px-5 justify-content-start">
                      <Col lg={2} md={6} sm={12}>
                        <h5 className="text-info mt-4 fw-bold ">
                          Search Filter
                        </h5>
                      </Col>
                      <Col lg={2} md={6} sm={12}>
                        <FormGroup>
                          <Label for="exampleSelect">Type</Label>
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
                      <Col lg={2} md={6} sm={12}>
                        <FormGroup>
                          <Label for="exampleSelect">Status</Label>
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
                      <Col lg={2} md={6} sm={12}></Col>
                      <Col lg={2} md={6} sm={12}></Col>
                      <Col
                        lg={2}
                        md={6}
                        sm={12}
                        className="mt-4 justify-content-end"
                      >
                        <Button
                          className="me-3"
                          size="sm"
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

export default DriverPage;
