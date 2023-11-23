import React, { useReducer, useState } from "react";
import { MdOutgoingMail } from "react-icons/md";
import { AiOutlineFileExcel, AiOutlinePlus } from "react-icons/ai";
import { PiFilePdfDuotone } from "react-icons/pi";
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
  NavItem,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Header, SideBar } from "../header";
import Profile from "../pofile";
import { BiCheck } from "react-icons/bi";
import { BsSearch, BsSliders2 } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { PiGearDuotone } from "react-icons/pi";
import {
  initialSearchDriverState,
  searchDriverPage,
} from "../tms-object/driverpage";
import { routes } from "../routes/routes";
import { GenericTable } from "../table";

const tableHeaders = [
  "#",
  "Name",
  "Type",
  "Status",
  "Hire Date",
  "Term Date",
  "Phone",
  "Email",
  "Truck",
  "Trailer",
  "Payable To",
  "Warnings",
  "Driver App",
  "Actions",
  <PiGearDuotone />,
];

const tableData = [
  {
    "#": "1001",
    Name: "Max payne [drv]",
    Type: "driver",
    Status: "Delivered - badge",
    "Hire Date": "14/07/2023",
    "Term Date": "23/06/2023",
    Phone: "1234567890",
    Email: "demo@gmail.com",
    Truck: "Delivered - badge",
    Trailer: "Delivered",
    "Payable To": "Invoiced",
    Warnings: "Lumper: $50.00 :: Detention: $50.00",
    "Driver App": "Lumper",
    Actions: "Lumper",
  },
  {
    "#": "1002",
    Name: "Max payne [drv]",
    Type: "driver",
    Status: "Delivered - badge",
    "Hire Date": "14/07/2023",
    "Term Date": "23/06/2023",
    Phone: "1234567890",
    Email: "demo@gmail.com",
    Truck: "Delivered - badge",
    Trailer: "Delivered",
    "Payable To": "Invoiced",
    Warnings: "Lumper: $50.00 :: Detention: $50.00",
    "Driver App": "Lumper",
    Actions: "Lumper",
  },
  {
    "#": "1003",
    Name: "Max payne [drv]",
    Type: "driver",
    Status: "Delivered - badge",
    "Hire Date": "14/07/2023",
    "Term Date": "23/06/2023",
    Phone: "1234567890",
    Email: "demo@gmail.com",
    Truck: "Delivered - badge",
    Trailer: "Delivered",
    "Payable To": "Invoiced",
    Warnings: "Lumper: $50.00 :: Detention: $50.00",
    "Driver App": "Lumper",
    Actions: "Lumper",
  },
];

type FormAction =
  | { type: "SET_TYPE"; payload: string }
  | { type: "SET_STATUS"; payload: string };

const filteredSearchForm = (state: searchDriverPage, action: FormAction) => {
  switch (action.type) {
    case "SET_TYPE":
      return { ...state, type: action.payload };
    case "SET_STATUS":
      return { ...state, status: action.payload };
    default:
      return state;
  }
};

const DriverPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(tableData);
  const [filter, setFilter] = useState("");
  const [formState, dispatch] = useReducer(
    filteredSearchForm,
    initialSearchDriverState
  );

  const handleSearchInput =
    (type: FormAction["type"], dispatch: React.Dispatch<FormAction>) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      dispatch({ type, payload: event.target.value });
    };

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
    console.log(formState);
  };

  return (
    <>
      <Navbar color="light" className="formpagenavbar" container={false}>
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        />
        <NavbarBrand className="fw-bold px-4">Drivers</NavbarBrand>
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
            to={routes.createNewDriver}
          >
            <AiOutlinePlus />
            New Driver
          </Link>
          <Profile />
        </div>
      </Navbar>
      <div className="content d-flex">
        <SideBar isSidebarOpen={!isSidebarOpen} activePageId={2} />
        <div className="aria-content">
          {isOpen && (
            <Collapse isOpen={isOpen}>
              <Card className="card-search mb-3">
                <CardBody>
                  <Form onSubmit={handleSearchSubmit}>
                    <Row className="px-5 justify-content-start">
                      <Col lg={2} md={6} sm={12}>
                        <h5 className="text-info mt-4 fw-bold ">
                          Search Filter
                        </h5>
                      </Col>
                      <Col lg={2} md={6} sm={12}>
                        <FormGroup>
                          <Label>Type</Label>
                          <Input
                            bsSize="sm"
                            id="exampleSelect"
                            name="type"
                            type="select"
                            className="form-control form-control-sm"
                            value={formState.type}
                            onChange={handleSearchInput("SET_TYPE", dispatch)}
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
                          <Label>Status</Label>
                          <Input
                            bsSize="sm"
                            id="exampleSelect"
                            name="status"
                            type="select"
                            className="form-control form-control-sm"
                            value={formState.status}
                            onChange={handleSearchInput("SET_STATUS", dispatch)}
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
                      <Col lg={2} md={6} sm={12}></Col>
                      <Col
                        lg={2}
                        md={6}
                        sm={12}
                        className="mt-4 justify-content-end"
                      >
                        <Button className="me-3 save-button" size="sm">
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
            tableData={filteredData}
            tableHeaders={tableHeaders}
            defaultSortColumn="Name"
          />
        </div>
      </div>
    </>
  );
};

export default DriverPage;
