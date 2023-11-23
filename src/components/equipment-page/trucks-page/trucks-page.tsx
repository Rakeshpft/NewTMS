import React, { useState } from "react";
import { AiOutlineFileExcel, AiOutlinePlus } from "react-icons/ai";
import { MdOutgoingMail } from "react-icons/md";
import { PiFilePdfDuotone, PiGearDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
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
import { routes } from "../../routes/routes";
import { GenericTable } from "../../table";

const tableHeaders = [
  "#",
  "Unit",
  "Make",
  "Model",
  "Vin",
  "Plate",
  "Plate State",
  "Registration Date",
  "Ownership",
  "Driver",
  "ELD Provider",
  "Location",
  "Warnings",
  "Status",
  "Actions",
  <PiGearDuotone />,
];

const tableRowData = [
  {
    "#": 1,
    Unit: "Unit 1",
    Make: "Make 1",
    Model: "Model 1",
    Vin: "Vin 1",
    Plate: "Plate 1",
    "Plate State": "Plate State 1",
    "Registration Date": "Registration Date 1",
    Ownership: "Ownership 1",
    Driver: "Driver 1",
    "ELD Provider": "ELD Provider 1",
    Location: "Location 1",
    Warnings: "Warnings 1",
    Status: "Status 1",
    Actions: <AiOutlineFileExcel />,
  },
  {
    "#": 2,
    Unit: "Unit 2",
    Make: "Make 1",
    Model: "Model 1",
    Vin: "Vin 1",
    Plate: "Plate 1",
    "Plate State": "Plate State 1",
    "Registration Date": "Registration Date 1",
    Ownership: "Ownership 1",
    Driver: "Driver 1",
    "ELD Provider": "ELD Provider 1",
    Location: "Location 1",
    Warnings: "Warnings 1",
    Status: "Status 1",
    Actions: <AiOutlineFileExcel />,
  },
];

const TrucksPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(tableRowData);
  const [filter, setFilter] = useState("");

  const handleSearchFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filteredData = tableRowData.filter((item) => {
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
        <NavbarBrand className="fw-bold px-4">Trucks</NavbarBrand>
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
                className="border-start-0 border-end-0 search"
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
            to={routes.createNewTruck}
          >
            <AiOutlinePlus />
            New Truck
          </Link>
          <Profile />
        </div>
      </Navbar>
      <div className="content d-flex">
        <SideBar isSidebarOpen={!isSidebarOpen} activePageId={4} />
        <div className="aria-content">
          {isOpen && (
            <Collapse isOpen={isOpen}>
              <Card className="card-search mb-3">
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
                          <Label>Status</Label>
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
                      <Col lg={2} md={6} sm={12}>
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
                      <Col lg={2} md={6} sm={12}>
                        <FormGroup>
                          <Label>OwnerShip</Label>
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
                      <Col md={2}></Col>
                      <Col lg={2} md={6} sm={12} className="mt-4">
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
          <GenericTable
            tableHeaders={tableHeaders}
            tableData={filteredData}
            defaultSortColumn="Unit"
          />
        </div>
      </div>
    </>
  );
};

export default TrucksPage;
