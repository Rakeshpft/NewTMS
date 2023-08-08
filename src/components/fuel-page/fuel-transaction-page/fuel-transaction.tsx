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
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import { Header, SideBar } from "../../header";
import Profile from "../../pofile";
import { BsSearch, BsSliders2 } from "react-icons/bs";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
import { PiPencilBold } from "react-icons/pi";

const FuelTransaction = () => {
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
        <NavbarBrand>Fuel Transactions</NavbarBrand>
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
            className="btn btn-secondary"
            style={{ backgroundColor: "#B7D1E6", color: "black" }}
            to="/createfueltransaction"
          >
            <AiOutlinePlus />
            New Fuel Transaction
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
                    <div className="d-flex gap-3">
                      <div className="flex-item">
                        <h4 className="text-info mt-2">Search Filter</h4>
                      </div>
                      <div className="flex-item">
                        <FormGroup>
                          <Label for="exampleSelect">Start Date</Label>
                          <Input
                            bsSize="sm"
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
                          <Label for="exampleSelect">Product Code</Label>
                          <Input
                            bsSize="sm"
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
                          <Label for="exampleSelect">Billing</Label>
                          <Input
                            bsSize="sm"
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
                      </div>
                      <div className="flex-item">
                        <FormGroup>
                          <Label for="exampleSelect">End Date</Label>
                          <Input
                            bsSize="sm"
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
                          <Label for="exampleSelect">Additional Payee</Label>
                          <Input
                            bsSize="sm"
                            id="exampleSelect"
                            name="text"
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
                          <Label for="exampleSelect">
                            Included in IFTA Calculation
                          </Label>
                          <Input
                            bsSize="sm"
                            id="exampleSelect"
                            name="text"
                            type="text"
                            style={{
                              color: "black",
                              border: "1px solid #418ECB",
                              width: "220px",
                            }}
                          ></Input>
                        </FormGroup>
                      </div>
                      <div className="flex-item">
                        <FormGroup>
                          <Label for="exampleSelect">Imported Report</Label>
                          <Input
                            bsSize="sm"
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
                          <Label for="exampleSelect">Fuel Card</Label>
                          <Input
                            bsSize="sm"
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
                          <Label for="exampleSelect">Truck</Label>
                          <Input
                            bsSize="sm"
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
                      <div className="flex-item">
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
                          <Label for="exampleSelect">State</Label>
                          <Input
                            bsSize="sm"
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
                          <Label for="exampleSelect">Trailer</Label>
                          <Input
                            bsSize="sm"
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
                      </div>
                      <div className="flex-item">
                        <FormGroup>
                          <Label for="exampleSelect">Partner</Label>
                          <Input
                            bsSize="sm"
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
                          <Label for="exampleSelect">Driver Type</Label>
                          <Input
                            bsSize="sm"
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
                      </div>
                    </div>
                    <div style={{ paddingLeft: "35rem" }}>
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
                  </Form>
                </CardBody>
              </Card>
            </Collapse>
          )}
          <div>
            <Form>
              <FormGroup check>
                <Input
                  type="checkbox"
                  style={{
                    width: "20px",
                    height: "20px",
                    color: "black",
                    border: "1px solid #418ECB",
                  }}
                />
                <Dropdown
                  isOpen={dropdownOpen}
                  toggle={toggle}
                  className="d-flex gap-2"
                >
                  <DropdownToggle
                    style={{ backgroundColor: "#1B56AE" }}
                    caret
                    size="sm"
                  >
                    <PiPencilBold fontSize={"13px"} />
                    Generate Driver deductions
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem>Some Action</DropdownItem>
                    <DropdownItem text>Dropdown Item Text</DropdownItem>
                  </DropdownMenu>
                  <DropdownToggle
                    style={{ backgroundColor: "#0B8E00" }}
                    caret
                    size="sm"
                  >
                    <BiCheck fontSize={"20px"} />
                    Marks as 'Included in IFTA'
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem header>Header</DropdownItem>
                    <DropdownItem>Some Action</DropdownItem>
                    <DropdownItem text>Dropdown Item Text</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </FormGroup>
            </Form>
          </div>
          <Table responsive hover className="table-data text-nowrap">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Driver</th>
                <th>Fuel Card</th>
                <th>Truck</th>
                <th>Trailer</th>
                <th>Location</th>
                <th>Fuel Amount</th>
                <th>Fuel units, Gallons</th>
                <th>Product Code</th>
                <th>Included In IFTA</th>
                <th>Partner</th>
                <th>Billing</th>
                <th>Actions</th>
                <th>*</th>
              </tr>
            </thead>
            <tbody>
              <p>No Records</p>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default FuelTransaction;
