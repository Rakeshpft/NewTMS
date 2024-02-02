import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Col,
  Collapse,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Nav,
  Navbar,
  NavbarBrand,
  Row,
} from "reactstrap";
import { Header, SideBar } from "../header";
import { BsSearch, BsSliders2 } from "react-icons/bs";
import Profile from "../pofile";
import { PiGearDuotone } from "react-icons/pi";
import GenericTable from "../table/custom-table";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

const columns = [
  "#",
  "Date",
  "Driver",
  "Type",
  "Attachment",
  "Status",
  "Load",
  "Notes",
  "Actions",
  <PiGearDuotone />,
];

const Tabledata = [
  {
    "#": 1001,
    Date: "07/14/23",
    Driver: "abc@mGmail.com",
    Type: "002063564 ONTARIO",
    Attachment: "Lumper",
    Status: "Active",
    Load: "Lumper",
    Notes: "Notes",
    
  },
];
const DocExchange = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(Tabledata);
  const [isOpen, setIsOpen] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");

  // const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleSearchFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filteredData = Tabledata.filter((item) => {
      return columns.some((column) =>
        String(item[column as keyof object])
          .toLowerCase()
          .includes(value)
      );
    });
    setFilter(value);
    setFilteredData(filteredData);
  };

  const searchToggle = (): void => {
    setIsOpen((isOpen) => !isOpen);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <>
      <Navbar color="light" className="py-0">
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        />
        <NavbarBrand className="fw-bold px-4">Documents Exchange</NavbarBrand>
        <Nav className="me-auto" navbar>
          <div className="d-flex gap-1 align-items-center">
            {/* <div className="x-small fw-bold">Period</div> */}
            {/* <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
              <DropdownToggle
                variant="secondary"
                size="sm"
                className="border-0 p-0 px-2 d-flex column-gap-2 align-items-center"
              >
                All ▼
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>This Year</DropdownItem>
                <DropdownItem>This Month</DropdownItem>
                <DropdownItem>This Week</DropdownItem>
              </DropdownMenu>
            </Dropdown> */}
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

          {/* <Button color="primary" onClick={() => setModalState(true)}>
            Invite User
            <AiOutlinePlus />
          </Button> */}
          <Profile />
        </div>
      </Navbar>

      <div className="content d-flex">
        <SideBar isSidebarOpen={!isSidebarOpen} activePageId={1} />
        <div className="aria-content">
          {isOpen && (
            <Collapse isOpen={isOpen}>
              <Card className="card-search mb-3">
                <CardBody>
                  <Form
                    onSubmit={handleSearchSubmit}
                    className="loadsSearchForm"
                  >
                    <Row className="mb-2">
                      <Col>
                        <h5 className="text-info mt-2 fw-bold">
                          Search Filters
                        </h5>
                      </Col>
                    </Row>
                    <div className="ps-lg-5">
                      <Row className="mb-2">
                        <Col lg={2} md={6} sm={12} className="px-3">
                          <FormGroup>
                            <Label> Start Date </Label>
                            <Input
                              bsSize="sm"
                              id="exampleSelect"
                              name="select"
                              type="date"
                              className="form-control form-control-sm"
                            />
                          </FormGroup>

                          <FormGroup>
                            <Label>Type </Label>
                            <Input
                              bsSize="sm"
                              id="exampleSelect"
                              name="select"
                              type="select"
                              className="form-control form-control-sm"
                            >
                              <option>BOL</option>
                              <option>Lumper</option>
                              <option>Receipt</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col lg={2} md={6} sm={12} className="px-3">
                          <FormGroup>
                            <Label> End Date </Label>
                            <Input
                              bsSize="sm"
                              id="exampleSelect"
                              name="select"
                              type="date"
                              className="form-control form-control-sm"
                            />
                          </FormGroup>

                          <FormGroup>
                            <Label> Driver </Label>
                            <Input
                              bsSize="sm"
                              id="exampleSelect"
                              name="select"
                              type="select"
                              className="form-control form-control-sm"
                            >
                              <option>BOL</option>
                              <option>Lumper</option>
                              <option>Receipt</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col lg={2} md={6} sm={12} className="px-3">
                          <FormGroup>
                            <Label> Status </Label>
                            <Input
                              bsSize="sm"
                              id="exampleSelect"
                              name="select"
                              type="select"
                              className="form-control form-control-sm"
                            >
                              <option>New </option>
                              <option>Rejected</option>
                              <option>Accepted</option>
                            </Input>
                          </FormGroup>
                          <FormGroup>
                            <Label> Load #</Label>
                            <Input
                              bsSize="sm"
                              id="exampleSelect"
                              name="select"
                              type="select"
                              className="form-control form-control-sm"
                            >
                              <option>New </option>
                              <option>Rejected</option>
                              <option>Accepted</option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md="6">
                          <Row className=" d-flex h-100">
                            <Col
                              md="6"
                              className="d-flex justify-content-end align-items-end"
                            >
                              <Button size="sm" className="me-3 save-button">
                                <BiCheck fontSize={"16px"} />
                                Apply
                              </Button>
                              <Button className="cancel-button" size="sm">
                                <RxCross2 fontSize={"16px"} color="red" /> Clear
                              </Button>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Collapse>
          )}
          <GenericTable
            tableData={filteredData}
            tableHeaders={columns}
            defaultSortColumn="Name"
            canEditRow={false}
            
          />
        </div>
      </div>
    </>
  );
};

export default DocExchange;
