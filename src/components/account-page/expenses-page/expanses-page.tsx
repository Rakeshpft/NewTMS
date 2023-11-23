import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
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
  NavItem,
  TabPane,
} from "reactstrap";
import { Header, SideBar } from "../../header";
import Profile from "../../pofile";
import { BiCheck } from "react-icons/bi";
import { BsSearch, BsSliders2 } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineFileExcel, AiOutlinePlus } from "react-icons/ai";
import { MdOutgoingMail } from "react-icons/md";
import { PiFilePdfDuotone } from "react-icons/pi";
import { TabPage } from "../../driver-page";
import TableSortIcon from "../../load-page/tableSortIcon";
import { routes } from "../../routes/routes";

const tableData = {
  tableHeadersAll: [
    "#",
    "Recurring Transaction",
    "Date",
    "Amount",
    "Category",
    "Payable To",
    "Driver",
    "Truck",
    "Trailer",
    "Driver Charge",
    "Notes",
    "Actions",
  ],

  tableHeadersRecuring: [
    "Name",
    "Created",
    "Amount",
    "Category",
    "Payable To",
    "Schedule",
    "Status",
    "Driver",
    "Truck",
    "Trailer",
    "Notes",
    "Actions",
  ],

  tableRowData: [
    [
      "1001",
      "06/14/23",
      "Load",
      "Load",
      "Completed",
      "Max Payne",
      "Max Payne",
      "002063566 ONTARIO",
      "-",
      "options",
      "none",
      "options",
    ],
  ],
};

const ExpansesPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState(1);

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
        <NavbarBrand className="fw-bold px-4">Expenses</NavbarBrand>
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
          {name === 1 ? (
            <Link
              className="btn btn-sm btn-outline-primary"
              to={routes.createNewExpensesSchedulePage}
            >
              <AiOutlinePlus />
              New Schedule
            </Link>
          ) : (
            <Link
              className="btn btn-sm btn-outline-primary"
              to={routes.createNewExpansesPage}
            >
              <AiOutlinePlus />
              New Expense
            </Link>
          )}
          <Profile />
        </div>
      </Navbar>
      <div className="content d-flex">
        <SideBar isSidebarOpen={!isSidebarOpen} activePageId={7} />
        <div className="aria-content">
          <TabPage tabTitles={["All", "Recurring Schedule"]} onclick={setName}>
            <TabPane tabId={1} className="m-2">
              {isOpen && (
                <Collapse isOpen={isOpen}>
                  <Card className="card-search mb-3">
                    <CardBody>
                      <Form onSubmit={handleSearchSubmit}>
                        <Row className="px-5">
                          <Col>
                            <h5 className="fw-bold text-info">Search Filter</h5>
                            <Row>
                              <Col lg={2} md={6} sm={12} className="px-3">
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
                              </Col>
                              <Col lg={2} md={6} sm={12} className="px-3">
                                <FormGroup>
                                  <Label>Gallery</Label>
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
                                </FormGroup>
                              </Col>
                              <Col lg={2} md={6} sm={12} className="px-3">
                                <FormGroup>
                                  <Label>Truck</Label>
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
                            </Row>
                            <Row>
                              <Col lg={2} md={6} sm={12} className="px-3">
                                <FormGroup>
                                  <Label>Amount Range:To</Label>
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
                              <Col lg={2} md={6} sm={12} className="px-3">
                                <FormGroup>
                                  <Label>Amount Range:Form</Label>
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
                              <Col lg={2} md={6} sm={12} className="px-3">
                                <FormGroup>
                                  <Label>Date Range:To</Label>
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
                              </Col>
                              <Col lg={2} md={6} sm={12} className="px-3">
                                <FormGroup>
                                  <Label>Date Range:Form</Label>
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
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={2} md={6} sm={12} className="px-3">
                                <FormGroup>
                                  <Label>Recurring Transaction</Label>
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
                                  <Label>Category</Label>
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
                                    <option>Yes</option>
                                    <option>No</option>
                                  </Input>
                                </FormGroup>
                              </Col>
                              <Col lg={2} md={6} sm={12} className="px-3"></Col>
                              <Col lg={2} md={6} sm={12} className="px-3"></Col>
                              <Col lg={2} md={6} sm={12} className="px-3 mt-4">
                                <Button size="sm" className="me-3 save-button">
                                  <BiCheck fontSize={"16px"} />
                                  Apply
                                </Button>
                                <Button size="sm" className="cancel-button">
                                  <RxCross2 fontSize={"16px"} color="red" />
                                  Clear
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
              <Table responsive hover className="table-data text-nowrap">
                <thead>
                  <tr>
                    {tableData.tableHeadersAll.map((headeritem, index) => (
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
            </TabPane>
            <TabPane tabId={2} className="m-2">
              {isOpen && (
                <Collapse isOpen={isOpen}>
                  <Card className="card-search mb-3">
                    <CardBody>
                      <Form onSubmit={handleSearchSubmit}>
                        <Row className="px-5">
                          <Col>
                            <h5 className="fw-bold text-info">Search Filter</h5>
                            <Row>
                              <Col lg={2} md={6} sm={12} className="px-3">
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
                              </Col>
                              <Col lg={2} md={6} sm={12} className="px-3">
                                <FormGroup>
                                  <Label>Gallery</Label>
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
                                </FormGroup>
                              </Col>
                              <Col lg={2} md={6} sm={12} className="px-3">
                                <FormGroup>
                                  <Label>Truck</Label>
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
                            </Row>
                            <Row>
                              <Col lg={2} md={6} sm={12} className="px-3">
                                <FormGroup>
                                  <Label>Amount Range:To</Label>
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
                              <Col lg={2} md={6} sm={12} className="px-3">
                                <FormGroup>
                                  <Label>Amount Range:Form</Label>
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
                              <Col lg={2} md={6} sm={12} className="px-3"></Col>
                              <Col lg={2} md={6} sm={12} className="px-3"></Col>
                              <Col lg={2} md={6} sm={12} className="px-3 mt-4">
                                <Button size="sm" className="me-3 save-button">
                                  <BiCheck fontSize={"16px"} />
                                  Apply
                                </Button>
                                <Button size="sm" className="cancel-button">
                                  <RxCross2 fontSize={"16px"} color="red" />
                                  Clear
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
              <Table responsive hover className="table-data text-nowrap">
                <thead>
                  <tr>
                    {tableData.tableHeadersRecuring.map((headeritem, index) => (
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
            </TabPane>
          </TabPage>
        </div>
      </div>
    </>
  );
};

export default ExpansesPage;
