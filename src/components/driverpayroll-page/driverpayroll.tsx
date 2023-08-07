import React, { useState } from "react";
import { AiOutlineFileExcel, AiOutlinePlus } from "react-icons/ai";
import { MdOutgoingMail } from "react-icons/md";
import { PiFilePdfDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
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
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { Header, SideBar } from "../header";
import Profile from "../pofile";
import { BsSearch, BsSliders2 } from "react-icons/bs";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

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
      <Navbar
        style={{ border: "1px solid #1B56AE" }}
        color="light"
        className="py-0"
      >
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        />
        <NavbarBrand>Driver Payroll</NavbarBrand>
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
          <Link
            className="btn btn-secondary"
            style={{ backgroundColor: "#B7D1E6", color: "black" }}
            to="/createdriverpayroll"
          >
            <AiOutlinePlus />
            New Driver Payroll
          </Link>
          <Profile />
        </div>
      </Navbar>
      <div className="content d-flex">
        <SideBar isSidebarOpen={!isSidebarOpen} />
        <div className="aria-content">
          {isOpen && (
            <Collapse isOpen={isOpen}>
              <Card style={{ backgroundColor: "#E9F3FB" }} className="mb-3">
                <CardBody>
                  <Form onSubmit={handleSearchSubmit}>
                    <div className="align-items-center justify-content-between">
                      <div className="align-items-center gap-4">
                        <h4 className="text-info mt-2">Search Filter</h4>
                        <div className="d-flex align-items-center gap-4">
                          <FormGroup>
                            <Label for="exampleSelect">Status</Label>
                            <Input
                              id="exampleSelect"
                              name="select"
                              type="select"
                              style={{
                                color: "black",
                                border: "1px solid #418ECB",
                                width: "220px",
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
                            <Label for="exampleSelect">Settlement</Label>
                            <Input
                              id="exampleSelect"
                              name="select"
                              type="text"
                              style={{
                                color: "black",
                                border: "1px solid #418ECB",
                                width: "220px",
                              }}
                            ></Input>
                          </FormGroup>
                          <FormGroup>
                            <Label for="exampleSelect">Amount Range:To</Label>
                            <Input
                              id="exampleSelect"
                              name="select"
                              type="text"
                              style={{
                                color: "black",
                                border: "1px solid #418ECB",
                                width: "220px",
                              }}
                            ></Input>
                          </FormGroup>
                          <FormGroup>
                            <Label for="exampleSelect">Amount Range:Form</Label>
                            <Input
                              id="exampleSelect"
                              name="select"
                              type="text"
                              style={{
                                color: "black",
                                border: "1px solid #418ECB",
                                width: "220px",
                              }}
                            ></Input>
                          </FormGroup>
                        </div>

                        <div className="d-flex align-items-center gap-4">
                          <FormGroup>
                            <Label for="exampleSelect">Date Range:To</Label>
                            <Input
                              id="exampleSelect"
                              name="select"
                              type="date"
                              style={{
                                color: "black",
                                border: "1px solid #418ECB",
                                width: "220px",
                              }}
                            ></Input>
                          </FormGroup>

                          <FormGroup>
                            <Label for="exampleSelect">Date Range:Form</Label>
                            <Input
                              id="exampleSelect"
                              name="select"
                              type="date"
                              style={{
                                color: "black",
                                border: "1px solid #418ECB",
                                width: "220px",
                              }}
                            ></Input>
                          </FormGroup>

                          <FormGroup>
                            <Label for="exampleSelect">Partner</Label>
                            <Input
                              id="exampleSelect"
                              name="select"
                              type="select"
                              style={{
                                color: "black",
                                border: "1px solid #418ECB",
                                width: "220px",
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
                            <Label for="exampleSelect">Driver</Label>
                            <Input
                              id="exampleSelect"
                              name="select"
                              type="select"
                              style={{
                                color: "black",
                                border: "1px solid #418ECB",
                                width: "220px",
                              }}
                            >
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                              <option>5</option>
                            </Input>
                          </FormGroup>
                          <div className="align-items-center justify-content-between">
                            <Button
                              className="me-3  ps-3 pe-3"
                              style={{
                                color: "black",
                                border: "1px solid #1E5367",
                                backgroundColor: "#B7D1E6",
                              }}
                            >
                              <BiCheck fontSize={"24px"} />
                              Apply
                            </Button>
                            <Button
                              style={{
                                color: "red",
                                border: "1px solid red",
                                backgroundColor: "white",
                              }}
                            >
                              <RxCross2 fontSize={"21px"} color="red" /> Clear
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Collapse>
          )}
          <Form>
            <FormGroup check>
              <Input type="checkbox" />
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle style={{ backgroundColor: "#0B8E00" }} caret>
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
                <th>#</th>
                <th>Date</th>
                <th>Payable To</th>
                <th>Driver</th>
                <th>Settlement Total</th>
                <th>Email</th>
                <th>Status</th>
                <th>Notes</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>Actions</th>
                <th>*</th>
              </tr>
            </thead>
            <tbody>
              <p>No records</p>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default DriverPayRoll;
