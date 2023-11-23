import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
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
import { PiFilePdfDuotone, PiGearDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";
import { GenericTable } from "../../table";

const tableHeaders = [
  "#",
  "Date",
  "Type",
  "Category",
  "status",
  "Partner",
  "Driver",
  "Amount",
  "Load Number",
  "Driver Settlement",
  "Notes",
  "Actions",
  <PiGearDuotone />,
];

const tableData = [
  {
    "#": "1001",
    Date: "1/1/2021",
    Type: "Load",
    Category: "Load",
    status: "true",
    Partner: "Max",
    Driver: "Max",
    Amount: "100",
    "Load Number": "1001",
    "Driver Settlement": "100",
    Notes: "Max",
    Actions: "abcd",
  },
  {
    "#": "1002",
    Date: "1/1/2021",
    Type: "Load",
    Category: "Load",
    status: "true",
    Partner: "Max",
    Driver: "Max",
    Amount: "100",
    "Load Number": "1001",
    "Driver Settlement": "100",
    Notes: "Max",
    Actions: "abc",
  },
];

const VendorBalance = () => {
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
        <NavbarBrand className="fw-bold px-4">Vendor Balance</NavbarBrand>
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
                onChange={handleSearchFilterChange}
                value={filter}
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
        <SideBar isSidebarOpen={!isSidebarOpen} activePageId={7} />
        <div className="aria-content">
          {isOpen && (
            <Collapse isOpen={isOpen}>
              <Card className="card-search mb-3">
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
                          <Label>Vendor Type</Label>
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
                          <Label>Driver Type</Label>
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
                        <Button size="sm" className="me-3 save-button">
                          <BiCheck fontSize={"16px"} />
                          Apply
                        </Button>
                        <Button size="sm" className="cancel-button">
                          <RxCross2 fontSize={"16px"} color="red" /> Clear
                        </Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Collapse>
          )}
          <div className="d-flex gap-4 mb-3">
            <Link to={"#!"} style={{ textDecoration: "none" }}>
              <PiFilePdfDuotone className="me-2 text-danger fs-4" />
              <span className="small">Downlaod as pdf</span>
            </Link>
            <Form>
              <FormGroup check>
                <Input type="checkbox" />
                <Label check className="text-primary">
                  Show Zero Balance
                </Label>
              </FormGroup>
            </Form>
          </div>

          <GenericTable
            tableData={filteredData}
            tableHeaders={tableHeaders}
            defaultSortColumn="Partner"
          />
        </div>
      </div>
    </>
  );
};

export default VendorBalance;
