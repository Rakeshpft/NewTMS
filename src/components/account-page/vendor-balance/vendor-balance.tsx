import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  Table,
  Card,
  CardBody,
  Collapse,
  Button,
  Input,
  InputGroup,
  InputGroupText,
  FormGroup,
  Label,
  Form,
  Col,
  Row,
} from "reactstrap";
import { Header, SideBar } from "../../header";
import Profile from "../../pofile";
import { BsSearch, BsSliders2 } from "react-icons/bs";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { PiFilePdfDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";

const VendorBalance = () => {
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
        <NavbarBrand className="fw-bold ps-4">Vendor Balance</NavbarBrand>
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
                    <Row className="px-5">
                      <Col>
                        <h5 className="fw-bold text-info mt-4">
                          Search Filter
                        </h5>
                      </Col>
                      <Col lg={2} md={6} sm={12} className="px-3">
                        <FormGroup>
                          <Label for="exampleSelect">Vendor Type</Label>
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
                      <Col lg={2} md={6} sm={12} className="px-3">
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
                      <Col lg={2} md={6} sm={12} className="px-3"></Col>
                      <Col md={3} className=" mt-4">
                        <Button
                          size="sm"
                          className="me-3"
                          style={{
                            color: "black",
                            border: "1px solid #1E5367",
                            backgroundColor: "#B7D1E6",
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
          <div className="d-flex gap-4">
            <Link to={"#!"} style={{ textDecoration: "none" }}>
              <PiFilePdfDuotone className="me-2 text-danger fs-4" />
              Downlaod as pdf
            </Link>
            <Form>
              <FormGroup check>
                <Input type="checkbox" /> <Label check>Show Zero Balance</Label>
              </FormGroup>
            </Form>
          </div>

          <Table responsive hover className="table-data text-nowrap">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Type</th>
                <th>Category</th>
                <th>status</th>
                <th>Partner</th>
                <th>Driver</th>
                <th>Amount</th>
                <th>Load Number</th>
                <th>Driver Settlement</th>
                <th>Notes</th>
                <th>Actions</th>
                <th>*</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
                <td>Otto</td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default VendorBalance;
