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
  Card,
  CardBody,
  Collapse,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Form,
  Col,
  Row,
} from "reactstrap";
import { Header, SideBar } from "../../header";
import Profile from "../../pofile";
import { BiCheck } from "react-icons/bi";
import { BsSearch, BsSliders2 } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";

const TrailersPage = () => {
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
        <NavbarBrand className="fw-bold ps-4">Trailers</NavbarBrand>
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
          <Link className="btn buttonLink" to="/createnewtrailers">
            <AiOutlinePlus />
            New Trailer
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
                    <Row className="px-5">
                      <Col lg={2} md={6} sm={12}>
                        <h5 className="text-info mt-4 fw-bold ">
                          Search Filter
                        </h5>
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
                      <Col lg={2} md={6} sm={12}>
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
                      </Col>
                      <Col lg={2} md={6} sm={12}>
                        <FormGroup>
                          <Label for="exampleSelect">OwnerShip</Label>
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
                      <Col lg={2} md={6} sm={12} className="mt-4">
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
                  </Form>
                </CardBody>
              </Card>
            </Collapse>
          )}
          <Table responsive hover className="table-data text-nowrap">
            <thead>
              <tr>
                <th>#</th>
                <th>Unit</th>
                <th>Make</th>
                <th>Model</th>
                <th>Vin</th>
                <th>Plate</th>
                <th>Plate State</th>
                <th>Registration Date</th>
                <th>Ownership</th>
                <th>Driver</th>
                <th>ELD Provider</th>
                <th>Loacton</th>
                <th>Warnings</th>
                <th>Status</th>
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
                <td>@mdo</td>
                <td>Mark</td>
                <td>Mark</td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default TrailersPage;
