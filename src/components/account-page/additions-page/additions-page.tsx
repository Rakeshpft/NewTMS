import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";
import { BsSearch, BsSliders2 } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  InputGroup,
  InputGroupText,
  Input,
  Button,
  Collapse,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Table,
} from "reactstrap";
import { Header, SideBar } from "../../header";
import Profile from "../../pofile";

const AdditionsPage = () => {
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
        <NavbarBrand>Additions/Deductions</NavbarBrand>
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
          <Link className="btn buttonLink" to="/createadditions">
            <AiOutlinePlus />
            New Additions/Deductions Entry
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
                            <Label for="exampleSelect">Type</Label>
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
                            <Label for="exampleSelect">Load#</Label>
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
                        </div>
                        <div className="d-flex align-items-center gap-4">
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
                            <Label for="exampleSelect">Category</Label>
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
                              className="me-3"
                              style={{
                                color: "black",
                                border: "1px solid #1E5367",
                                backgroundColor: "#418ECB",
                              }}
                            >
                              <BiCheck fontSize={"16px"} />
                              Apply
                            </Button>
                            <Button
                              style={{
                                color: "red",
                                border: "1px solid red",
                                backgroundColor: "white",
                              }}
                            >
                              <RxCross2 fontSize={"16px"} color="red" /> Clear
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

          <Table responsive hover className="table-data text-nowrap">
            <thead>
              <tr>
                <th>#</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Partner</th>
                <th>Driver</th>
                <th>Load Number</th>
                <th>Driver Settlement</th>
                <th>Notes</th>
                <th>Actions</th>
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
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default AdditionsPage;
