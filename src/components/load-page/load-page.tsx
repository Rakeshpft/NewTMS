import React, { useState } from "react";
import { Header, SideBar } from "../header";
import {
  Button,
  Card,
  CardBody,
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
  Table,
} from "reactstrap";
import Profile from "../pofile";
import { Link } from "react-router-dom";
import { BiCheck } from "react-icons/bi";
import { BsSearch, BsSliders2 } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";

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
        <NavbarBrand>Loads</NavbarBrand>
        <Nav className="me-auto" navbar>
          <div className="">
            <span className="x-small fw-bold">Period</span>
            <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
              <DropdownToggle
                variant="secondary"
                size="sm"
                className="border-0 p-0 px-2 d-flex column-gap-2 align-items-center"
              >
                All
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
            to="/createload"
          >
            New Load
            <AiOutlinePlus />
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
                      <div className="flex-item py-3 px-2">
                        <h4 className="text-info">Search Filter</h4>
                      </div>
                      <div className="flex-item">
                        <FormGroup>
                          <Label for="exampleSelect">Period</Label>
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
                          <Label for="exampleSelect">Pickup Date</Label>
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
                          <Label for="exampleSelect">Delivery Date</Label>
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
                      </div>
                      <div className="flex-item">
                        <FormGroup>
                          <Label for="exampleSelect">Broker</Label>
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
                          <Label for="exampleSelect">City</Label>
                          <Input
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
                        <FormGroup>
                          <Label for="exampleSelect">City</Label>
                          <Input
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
                        <FormGroup>
                          <Label for="exampleSelect">State</Label>
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
                          <Label for="exampleSelect">State</Label>
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
                      <div className="flex-item">
                        <FormGroup>
                          <Label for="exampleSelect">Dispatcher</Label>
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
                          <Label for="exampleSelect">Truck</Label>
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
                          <Label for="exampleSelect">Trailer</Label>
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
                      </div>
                      <div className="flex-item position-relative">
                        <FormGroup>
                          <Label for="exampleSelect">
                            Direct Billing/Factoring
                          </Label>
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
                        <div
                          className="position-absolute"
                          style={{ bottom: "-90px" }}
                        >
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
                    <div style={{ paddingLeft: "12rem" }}>
                      <div>
                        <FormGroup className="d-flex gap-3">
                          <h6 className="fw-bold">Status</h6>
                          <FormGroup check>
                            <Input id="checkbox2" type="checkbox" />
                            <Label check>New</Label>
                          </FormGroup>
                          <FormGroup check>
                            <Input id="checkbox2" type="checkbox" />
                            <Label check>Dispatched</Label>
                          </FormGroup>
                          <FormGroup check>
                            <Input id="checkbox2" type="checkbox" />
                            <Label check>TOUN</Label>
                          </FormGroup>
                          <FormGroup check>
                            <Input id="checkbox2" type="checkbox" />
                            <Label check>Cancelled</Label>
                          </FormGroup>
                          <FormGroup check>
                            <Input id="checkbox2" type="checkbox" />
                            <Label check>En-Route</Label>
                          </FormGroup>
                          <FormGroup check>
                            <Input id="checkbox2" type="checkbox" />
                            <Label check>Picked-up</Label>
                          </FormGroup>
                          <FormGroup check>
                            <Input id="checkbox2" type="checkbox" />
                            <Label check>Delivered</Label>
                          </FormGroup>
                          <FormGroup check>
                            <Input id="checkbox2" type="checkbox" />
                            <Label check>Close</Label>
                          </FormGroup>
                        </FormGroup>
                      </div>
                      <div>
                        <FormGroup className="d-flex gap-3">
                          <h6 className="fw-bold">Billing Status</h6>
                          <FormGroup check>
                            <Input id="checkbox2" type="checkbox" />
                            <Label check>Pending</Label>
                          </FormGroup>
                          <FormGroup check>
                            <Input id="checkbox2" type="checkbox" />
                            <Label check>Cancelled</Label>
                          </FormGroup>
                          <FormGroup check>
                            <Input id="checkbox2" type="checkbox" />
                            <Label check>BOL Received</Label>
                          </FormGroup>
                          <FormGroup check>
                            <Input id="checkbox2" type="checkbox" />
                            <Label check>Invoiced</Label>
                          </FormGroup>
                          <FormGroup check>
                            <Input id="checkbox2" type="checkbox" />
                            <Label check>Sent to Factoring</Label>
                          </FormGroup>
                          <FormGroup check>
                            <Input id="checkbox2" type="checkbox" />
                            <Label check>Funded</Label>
                          </FormGroup>
                          <FormGroup check>
                            <Input id="checkbox2" type="checkbox" />
                            <Label check>Paid</Label>
                          </FormGroup>
                        </FormGroup>
                      </div>
                      <div>
                        <FormGroup className="d-flex gap-3">
                          <h6 className="fw-bold">Location Status</h6>
                          <FormGroup check>
                            <Input id="checkbox2" type="checkbox" />
                            <Label check>No</Label>
                          </FormGroup>
                          <FormGroup check>
                            <Input id="checkbox2" type="checkbox" />
                            <Label check>Yes</Label>
                          </FormGroup>
                        </FormGroup>
                      </div>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Collapse>
          )}
          <Table responsive hover className="table-data text-nowrap">
            <thead>
              <tr>
                <th>Load</th>
                <th>Date</th>
                <th>Driver</th>
                <th>Broker</th>
                <th>PO</th>
                <th>Pickup</th>
                <th>Delivery</th>
                <th>Rate</th>
                <th>Completed</th>
                <th>Status</th>
                <th>Billing</th>
                <th>Notes</th>
                <th>Attachments</th>
                <th>Actions</th>
                <th>*</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>12/07/23</td>
                <td>Otto</td>
                <td>@abc</td>
                <td>@jhon</td>
                <td>@kat</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default LoadPage;
