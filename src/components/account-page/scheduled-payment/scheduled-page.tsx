import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
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
import { AiOutlinePlus } from "react-icons/ai";
import { routes } from "../../routes/routes";
import { GenericTable } from "../../table";

const tableHeaders = [
  "Id",
  "Driver",
  "Payable To",
  "Type",
  "Category",
  "Amount",
  "Schedule",
  "Last",
  "Next",
  "status",
  "Notes",
  "Actions",
];

const tableData = [
  {
    Id: "1001",
    Driver: "Max",
    "Payable To": "Max",
    Type: "Max",
    Category: "Max",
    Amount: "100",
    Schedule: "1/1/2021",
    Last: "1/1/2021",
    Next: "1/1/2021",
    status: "true",
    Notes: "Max",
    Actions: "abcd",
  },
  {
    Id: "1002",
    Driver: "Max",
    "Payable To": "Max",
    Type: "Max",
    Category: "Max",
    Amount: "100",
    Schedule: "1/1/2021",
    Last: "1/1/2021",
    Next: "1/1/2021",
    status: "true",
    Notes: "Max",
    Actions: "abc",
  },
];

const ScheduledPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(tableData);
  const [filter, setFilter] = useState("");

  const handleSearchFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filteredData = tableData.filter((item) => {
      return tableHeaders.some((column) =>
        String(item[column as keyof object])
          .toLowerCase()
          .includes(value)
      );
    });
    setFilter(value);
    setFilteredData(filteredData);
  };

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
        <NavbarBrand className="fw-bold px-4">
          Scheduled Payment/Deductions
        </NavbarBrand>
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
                value={filter}
                onChange={handleSearchFilterChange}
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
            className="btn btn-sm btn-outline-primary"
            to={routes.createNewScheduledPage}
          >
            <AiOutlinePlus />
            New Scheduled Payment
          </Link>
          <Profile />
        </div>
      </Navbar>
      <div className="content d-flex">
        <SideBar isSidebarOpen={!isSidebarOpen} activePageId={7} />
        <div className="aria-content">
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
                                className="form-control form-control-sm"
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
                                className="form-control form-control-sm"
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
                              <Label>Type</Label>
                              <Input
                                bsSize="sm"
                                id="exampleSelect"
                                name="select"
                                type="select"
                                className="form-control form-control-sm"
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
                              <Label>Category</Label>
                              <Input
                                bsSize="sm"
                                id="exampleSelect"
                                name="select"
                                type="text"
                                className="form-control form-control-sm"
                              />
                            </FormGroup>
                          </Col>
                          <Col lg={2} md={6} sm={12} className="px-3">
                            <FormGroup>
                              <Label>Active</Label>
                              <Input
                                bsSize="sm"
                                id="exampleSelect"
                                name="select"
                                type="text"
                                className="form-control form-control-sm"
                              />
                            </FormGroup>
                          </Col>
                          <Col
                            lg={2}
                            md={6}
                            sm={12}
                            className="px-3 d-flex justify-content-end align-items-end gap-2 mb-3"
                          >
                            <Button
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

          <GenericTable
            tableData={filteredData}
            tableHeaders={tableHeaders}
            defaultSortColumn="Driver"
          />
        </div>
      </div>
    </>
  );
};

export default ScheduledPage;
