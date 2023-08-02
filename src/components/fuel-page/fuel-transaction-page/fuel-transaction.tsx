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
} from "reactstrap";
import { Header, SideBar } from "../../header";
import Profile from "../../pofile";
import { BsSearch, BsSliders2 } from "react-icons/bs";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

const FuelTransaction = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function searchToggle(): void {
    console.log("search");
    setIsOpen(!isOpen);
  }

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
          <Link className="btn btn-secondary " to="/createfueltransaction">
            New Fuel Transaction
          </Link>
          <Profile />
        </div>
      </Navbar>
      <div className="content d-flex">
        <SideBar isSidebarOpen={!isSidebarOpen} />
        <div className="aria-content">
          <Collapse isOpen={isOpen}>
            <Card style={{ backgroundColor: "#E9F3FB" }} className="mb-3">
              <CardBody>
                <div className="align-items-center justify-content-between">
                  <div className="align-items-center gap-4">
                    <h3 className="text-info">Search Filter</h3>
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
                            width: "150px",
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
                            width: "150px",
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
                            width: "150px",
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
                            width: "150px",
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
                            width: "150px",
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
                            width: "150px",
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
                            width: "150px",
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
                            width: "150px",
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
              </CardBody>
            </Card>
          </Collapse>
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
