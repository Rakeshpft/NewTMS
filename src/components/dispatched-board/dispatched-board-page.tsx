import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { FaRegCalendar, FaUserCircle } from "react-icons/fa";
import {
  Button,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Navbar,
  NavbarBrand,
  Table,
  UncontrolledDropdown,
  Pagination as BootstrapPagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";
import { Header } from "../header";
import Profile from "../pofile";
import { BsExclamationCircle } from "react-icons/bs";
import { PiCaretUpDownFill } from "react-icons/pi";
import moment from "moment";
import DatePicker from "react-datepicker";
import SquareModalPage from "./square-modal-page";
import NewFilterPage from "./new-filter-page";

const DispatchedHeaders = [
  "#",
  "Driver Name",
  "Container #",
  "Truck Type",
  "Load",
  "Week",
  "Status",
  "Date",
];

export const initialDispatchData = [
  {
    id: 1,
    driverName: "John (Drv)",
    Container: "75R5",
    truckType: "Tomorrow Truck",
    load: "Ready now",
    week: "Monday",
    status: "En-Route",
    date: "10/12/2022",
  },
  {
    id: 2,
    driverName: "John Doe (Drv)",
    Container: "74R5",
    truckType: "Tomorrow Truck",
    load: "Ready now",
    week: "Monday",
    status: "En-Route",
    date: "12/12/2022",
  },
  {
    id: 3,
    driverName: "Max Payne (Drv)",
    Container: "7A6B",
    truckType: "Today Truck",
    load: "Scheduled",
    week: "Monday",
    status: "Delivered",
    date: "25/10/2023",
  },
  {
    id: 4,
    driverName: "Max Payne (Drv)",
    Container: "74R5",
    truckType: "Tomorrow Truck",
    load: "Unassigned",
    week: "Monday",
    status: "En-Route",
    date: "10/05/2021",
  },
  {
    id: 5,
    driverName: "Max Payne (Drv)",
    Container: "7A6B",
    truckType: "Tomorrow Truck",
    load: "Scheduled",
    week: "Monday",
    status: "Delivered",
    date: "26/06/2022",
  },
  {
    id: 6,
    driverName: "John Doe (Drv)",
    Container: "7A6B",
    truckType: "Today Truck",
    load: "Scheduled",
    week: "Monday",
    status: "En-Route",
    date: "19/10/2021",
  },
  {
    id: 7,
    driverName: "John Doe (Drv)",
    Container: "74R5",
    truckType: "Today Truck",
    load: "Scheduled",
    week: "Monday",
    status: "Delivered",
    date: "19/10/2021",
  },
  {
    id: 8,
    driverName: "John Doe (Drv)",
    Container: "7A6B",
    truckType: "Tomorrow Truck",
    load: "Scheduled",
    week: "Monday",
    status: "En-Route",
    date: "19/10/2021",
  },
  {
    id: 9,
    driverName: "John Doe (Drv)",
    Container: "74R5",
    truckType: "Today Truck",
    load: "Scheduled",
    week: "Monday",
    status: "Delivered",
    date: "19/10/2021",
  },
];

const DispatchedBoardPage = () => {
  const itemsPerPage = 5;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | any>("");
  const [filteredData, setFilteredData] = useState(initialDispatchData);
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [modal, setModal] = useState(false);
  const [squareModal, setSquareModal] = useState(false);
  const [newFilterPageModal, setNewFilterPageModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = initialDispatchData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const toggle = () => setModal(!modal);

  const toggleSquareModal = () => setSquareModal(!squareModal);

  const handleOptionChange = (event: any) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    {
      selectedValue === "NewFilterValue"
        ? setNewFilterPageModal(true)
        : setNewFilterPageModal(false);
    }
  };
  const handleSort = (key: any) => {
    const sortedData = [...filteredData].sort((a, b) =>
      a[key as keyof object] > b[key as keyof object] ? 1 : -1
    );
    setFilteredData(sortedData);
    setSortKey(key);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const category = e.target.value;
    setFilter(category);
    if (category === "All") {
      setFilteredData(initialDispatchData);
    } else {
      const filtered = initialDispatchData.filter(
        (item) =>
          item.load === category ||
          item.truckType === category ||
          item.status === category
      );
      setFilteredData(filtered);
    }
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      const filtered = initialDispatchData.filter((item) => {
        return item.date === moment(date).format("DD/MM/YYYY");
      });

      setFilteredData(filtered);
    } else {
      setFilteredData(initialDispatchData);
    }
    setSelectedDate(date);
  };

  const handleButtonFilter = (category: string) => {
    const filteredData = initialDispatchData.filter(
      (item) => item.status === category
    );
    setFilteredData(filteredData);
    setFilter(category);
  };

  return (
    <>
      <div>
        <Navbar className="formpagenavbar" color="light">
          <Header
            sidebarToggle={() => {
              setIsSidebarOpen(!isSidebarOpen);
            }}
          />
          <NavbarBrand className="fw-bold px-4 me-auto">
            Dispatch Board
          </NavbarBrand>
          <div className="d-flex  gap-3 px-3">
            <Profile />
          </div>
        </Navbar>
        <Container fluid className="py-4">
          <div className="container-fluid px-4 d-flex flex-row justify-content-between align-items-center">
            <div className="d-flex flex-row gap-3">
              <span>
                <UncontrolledDropdown>
                  <DropdownToggle caret color="transparent" className="p-0">
                    <FaUserCircle size={18} color="#418ECB" />
                  </DropdownToggle>
                  <DropdownMenu bottom="true" size={"sm"}>
                    <DropdownItem
                      onClick={() => {
                        handleSort("asc");
                      }}
                    >
                      Driver's Name
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        handleSort("desc");
                      }}
                    >
                      Driver's Name
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        handleSort("asc");
                      }}
                    >
                      Unit Number
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        handleSort("desc");
                      }}
                    >
                      Unit Number
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        handleSort("asc");
                      }}
                    >
                      Delivery Date
                    </DropdownItem>
                    <DropdownItem
                      onClick={() => {
                        handleSort("desc");
                      }}
                    >
                      Delivery Date
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </span>
              <span>
                <UncontrolledDropdown>
                  <DropdownToggle caret color="transparent" className="p-0">
                    <FaRegCalendar size={18} color="#418ECB" />
                  </DropdownToggle>
                  <DropdownMenu bottom="true" size={"sm"}>
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                    />
                  </DropdownMenu>
                </UncontrolledDropdown>
              </span>
              <div className="d-flex gap-3">
                <Input
                  id="exampleSelect"
                  name="select"
                  type="select"
                  bsSize="sm"
                  value={filter}
                  onChange={handleFilterChange}
                  className="form-control form-control-sm"
                >
                  <option value="All">Filter by: All</option>
                  <option value="Today Truck">Today's Trucks</option>
                  <option value="Tomorrow Truck">Tomorrow's Trucks</option>
                  <option value="Ready now">Ready Now</option>
                  <option value="Unsigned load">Unassigned Loads</option>
                </Input>
                <Input
                  id="exampleSelect"
                  name="select"
                  type="select"
                  bsSize="sm"
                  value={selectedOption}
                  onChange={handleOptionChange}
                  className="form-control form-control-sm"
                >
                  <option value="All">Drivers: Show All</option>
                  <option value="NewFilterValue">New Filter</option>
                </Input>
                <NewFilterPage
                  modal={newFilterPageModal}
                  toggle={() => {
                    setNewFilterPageModal(false);
                  }}
                  filteredData={filteredData}
                />
              </div>
            </div>
            <div className="d-flex gap-2 align-items-center px-3">
              <Button
                size="sm"
                outline
                className="form-control dispatch-load-button text-nowrap"
                style={{ borderRadius: "30px" }}
                onClick={() => handleButtonFilter("New Load")}
              >
                <span className="fw-bold" style={{ color: "#418ECB" }}>
                  New Load
                </span>
              </Button>
              <Button
                size="sm"
                outline
                className="form-control dispatch-deliverd-button text-nowrap"
                style={{ borderRadius: "30px" }}
                onClick={() => handleButtonFilter("Delivered")}
              >
                <span style={{ color: "#0b8e00" }} className="fw-bold">
                  Deliverd
                </span>
              </Button>
              <Button
                size="sm"
                className="form-control dispatch-enRoute-button text-nowrap"
                outline
                style={{ borderRadius: "30px" }}
                onClick={() => handleButtonFilter("En-Route")}
              >
                <span className="fw-bold" style={{ color: "#FF8761" }}>
                  En-Route
                </span>
              </Button>
            </div>
          </div>
          <div className="px-4 py-3">
            <Table responsive hover className="table-data text-nowrap py-3">
              <thead>
                <tr>
                  {DispatchedHeaders.map((item, index) => (
                    <th key={index}>
                      {item}
                      <span
                        onClick={() => handleSort(item)}
                        style={{ cursor: "pointer" }}
                      >
                        {sortKey === "name" ? (
                          <PiCaretUpDownFill />
                        ) : (
                          <PiCaretUpDownFill />
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredData.length !== 0 ? (
                  <>
                    {filteredData
                      .slice(startIndex, endIndex)
                      .map((item, index) => (
                        <tr key={index}>
                          <td className="fw-bold" style={{ color: "#418ECB" }}>
                            {item.id}
                          </td>
                          <td className="fw-bold" style={{ color: "#418ECB" }}>
                            <FaUserCircle size={18} /> {item.driverName}
                            <span onClick={toggle} className="px-2">
                              <BsExclamationCircle />
                            </span>
                          </td>
                          <td className="fw-bold" style={{ color: "#418ECB" }}>
                            {item.Container}
                          </td>
                          <td>
                            {item.truckType === "Today Truck" ? (
                              <img
                                src={require("../../../public/icons/equipments-trucks.png")}
                              />
                            ) : (
                              <img
                                src={require("../../../public/icons/equipments-trailers.png")}
                                height={32}
                                width={32}
                              />
                            )}
                            {/* {item.truckType} */}
                          </td>
                          <td
                            className="fw-bold"
                            style={{
                              color:
                                item.load === "Unassigned"
                                  ? "#FF8761"
                                  : item.load === "Ready now"
                                  ? "#0B8E00"
                                  : "#418ECB",
                            }}
                          >
                            {item.load}
                          </td>
                          <td className="fw-bold">
                            <div onClick={toggleSquareModal}>
                              {/* {renderSquare()} */}
                              <SquareModalPage />
                            </div>
                          </td>
                          <td
                            className="fw-bold"
                            style={{
                              color:
                                item.status === "Delivered"
                                  ? "#0B8E00"
                                  : "#FF8761",
                            }}
                          >
                            {item.status}
                          </td>
                          <td className="fw-bold" style={{ color: "#418ECB" }}>
                            {item.date.toString()}
                          </td>
                        </tr>
                      ))}
                  </>
                ) : (
                  <>
                    <div className="text-align-center fw-bold">
                      No data available
                    </div>
                  </>
                )}
              </tbody>
            </Table>
            <BootstrapPagination
              size="sm"
              className="d-flex justify-content-center"
            >
              <PaginationItem disabled={currentPage === 1}>
                <PaginationLink
                  previous
                  onClick={() => handlePageClick(currentPage - 1)}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => (
                <PaginationItem key={i} active={i + 1 === currentPage}>
                  <PaginationLink onClick={() => handlePageClick(i + 1)}>
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem disabled={currentPage === totalPages}>
                <PaginationLink
                  next
                  onClick={() => handlePageClick(currentPage + 1)}
                />
              </PaginationItem>
            </BootstrapPagination>
          </div>
          <Modal isOpen={modal} toggle={toggle} size="lg" backdrop="static">
            <ModalHeader toggle={toggle}>John Doe (Drv)</ModalHeader>
            <ModalBody>
              <Table responsive hover className="table-data text-nowrap">
                <thead>
                  <tr>
                    <th>PERIOD</th>
                    <th>TOTAL REVENUE</th>
                    <th>RATE PER MILE</th>
                    <th>LOADED,MI</th>
                    <th>EMPTY,MI</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>January</td>
                    <td>$100</td>
                    <td>$10</td>
                    <td>$100</td>
                    <td>$100</td>
                  </tr>
                </tbody>
              </Table>
            </ModalBody>
          </Modal>
        </Container>
      </div>
    </>
  );
};

export default DispatchedBoardPage;
