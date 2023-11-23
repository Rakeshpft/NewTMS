import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  // Dropdown,
  Modal,
  ModalBody,
  ModalHeader,
  // DropdownItem,
  // DropdownMenu,
  // DropdownToggle,
  CardBody,
  Table,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
  UncontrolledDropdown,
} from "reactstrap";
import NavigationBar from "../navigation-bar";
import { FaUserCircle, FaRegCalendar } from "react-icons/fa";
import { dashboardTiles } from "./dashboard-Title";
import { routes } from "../routes/routes";
import { initialDispatchData } from "../dispatched-board/dispatched-board-page";
import { PiCaretUpDownFill } from "react-icons/pi";
import { BsExclamationCircle } from "react-icons/bs";
import { CiViewList } from "react-icons/ci";
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DispatchedHeaders = [
  "Driver Name",
  "Container #",
  "Truck Type",
  "Load",
  "Status",
  "Date",
];

export default function DashboardPage() {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [filteredData, setFilteredData] = useState([
    ...initialDispatchData.slice(0, 5),
  ]);
  const [selectedDate, setSelectedDate] = useState<Date | any>("");
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  const handleSort = (key: any) => {
    const sortedData = [...filteredData].sort((a, b) =>
      a[key as keyof object] > b[key as keyof object] ? 1 : -1
    );
    setFilteredData(sortedData);
    setSortKey(key);
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
  };

  return (
    <section className="main-dashboard">
      <NavigationBar />
      <Container className="main-content py-2 px-4" fluid>
        <Row className="mb-3">
          <Col className="d-flex justify-content-between align-items-center">
            <h4 className="text-info fw-bold mb-0">Dashboard</h4>
            <div className="db-options d-flex gap-2 ">
              <Button
                color="outline-info"
                size="sm"
                className="d-flex align-items-center gap-1 px-md-3 shadow-lg rounded-pill"
              >
                <img
                  src={require("../../../public/icons//help.png")}
                  alt=""
                  height={24}
                  width={24}
                ></img>
                <span className="d-none d-md-inline">Help</span>
              </Button>
              <Button
                color="outline-info"
                size="sm"
                className="d-flex align-items-center gap-1 px-md-3 shadow-lg rounded-pill"
              >
                <img
                  src={require("../../../public/icons/safety.png")}
                  alt=""
                  height={24}
                  width={24}
                ></img>
                <span className="d-none d-md-inline">Safety</span>
              </Button>
              <Button
                color="outline-info"
                size="sm"
                className="d-flex align-items-center gap-1 px-md-3 shadow-lg rounded-pill"
              >
                <img
                  src={require("../../../public/icons/setting-one.png")}
                  alt=""
                  height={24}
                  width={24}
                ></img>
                <span className="d-none d-md-inline">Settings</span>
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="mb-3 gy-2">
          {dashboardTiles.mainTiles.map((tile, index) => (
            <MainTile
              key={index}
              title={tile.title}
              icon={tile.icon}
              data={tile.data}
              options={tile.options}
            />
          ))}
        </Row>
        <Row>
          <Col md="6" className="order-1 order-md-0">
            <h4 className="text-info fw-bold mb-3">Dispatch Board</h4>
            <Card className="dashboard-card rounded">
              <CardBody>
                <div className="section-header">
                  <div className="container-fluid d-flex flex-wrap justify-content-between align-items-center">
                    <div className="d-flex flex-row gap-3">
                      <span>
                        <UncontrolledDropdown>
                          <DropdownToggle
                            caret
                            color="transparent"
                            className="p-0"
                          >
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
                          <DropdownToggle
                            caret
                            color="transparent"
                            className="p-0"
                          >
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
                    </div>
                    <div className="d-flex gap-2 align-items-center">
                      <Button
                        size="sm"
                        outline
                        className="form-control dispatch-load-button text-nowrap"
                        style={{ borderRadius: "30px" }}
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
                  <div>
                    <Table
                      responsive
                      hover
                      className="table-data text-nowrap py-3"
                    >
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
                        {filteredData.map((item, index) => (
                          <tr key={index}>
                            <td
                              className="fw-bold"
                              style={{ color: "#418ECB" }}
                            >
                              <FaUserCircle size={18} /> {item.driverName}
                              <span onClick={toggle} className="px-2">
                                <BsExclamationCircle />
                              </span>
                            </td>
                            <td
                              className="fw-bold"
                              style={{ color: "#418ECB" }}
                            >
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
                            <td
                              className="fw-bold"
                              style={{ color: "#418ECB" }}
                            >
                              {item.date.toString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                  <Modal isOpen={modal} toggle={toggle} size="lg">
                    <ModalHeader toggle={toggle}>John Doe (Drv)</ModalHeader>
                    <ModalBody>
                      <Table
                        responsive
                        hover
                        className="table-data text-nowrap"
                      >
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
                  <span className="d-flex justify-content-end">
                    <Link
                      to={routes.dispatchedBoard}
                      style={{ color: "#418ECB" }}
                    >
                      <CiViewList size={20} />
                      View all
                    </Link>
                  </span>

                  {/* <div className="d-flex align-items-center gap-2">
                    <img
                      src={require("../../../public/icons/Ic-Overview.png")}
                      alt="Image"
                      width={32}
                      height={32}
                    />
                    <h5 className="text-info fw-bold mb-0 ">Sales Report</h5>
                  </div> */}

                  {/* <div className="d-flex gap-3">
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                      <DropdownToggle
                        caret
                        className="dropdownDashboard "
                        color="outline-light"
                      >
                        <span className="d-none d-lg-inline">Monthly</span>
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem>Some Action</DropdownItem>
                        <DropdownItem text>Dropdown Item Text</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <Button
                      color="light"
                      className="d-flex gap-2 align-items-center TilePopUpBtn fw-bold"
                    >
                      <FiDownload />
                      <span className=" d-none d-lg-inline">
                        Download Report
                      </span>
                    </Button>
                  </div> */}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md="6">
            <h4 className="text-info fw-bold mb-3">Manage</h4>
            <Row className="gy-3 mb-3">
              {dashboardTiles.fuelTiles.map((tile, index) => (
                <Col sm="6" key={index}>
                  <AccountTiles
                    key={index}
                    title={tile.title}
                    icon={tile.icon}
                    options={tile.options}
                  />
                </Col>
              ))}
              {dashboardTiles.mediumTiles.map((tile, index) => (
                <Col sm="6" key={index}>
                  <MediumTiles
                    key={index}
                    title={tile.title}
                    icon={tile.icon}
                    options={tile.options}
                  />
                </Col>
              ))}
              {dashboardTiles.reportTiles.map((tile, index) => (
                <Col sm="6" key={index}>
                  <ReportTiles
                    key={index}
                    title={tile.title}
                    icon={tile.icon}
                    options={tile.options}
                  />
                </Col>
              ))}
              {dashboardTiles.accountTiles.map((tile, index) => (
                <Col sm="6" key={index}>
                  <AccountTiles
                    key={index}
                    title={tile.title}
                    icon={tile.icon}
                    options={tile.options}
                  />
                </Col>
              ))}
            </Row>
            <Row className="gy-3 mb-3 mt-5">
              <Col xs="12">
                <h4 className="text-info fw-bold mb-0">More</h4>
              </Col>
              {dashboardTiles.smallTiles.map((tile, index) => (
                <Col xs={6} xl={3} key={index}>
                  <Link
                    to={tile.link}
                    className="btn btn-outline-info d-flex w-100 align-items-center small_tile text-start"
                  >
                    <img
                      src={tile.icon}
                      alt="Image"
                      width={24}
                      height={24}
                      className="me-2"
                    />
                    <h6 className="mb-0 small">{tile.name}</h6>
                  </Link>
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

type TileProps = {
  title: string;
  data?: object;
  icon: string;
  link?: string;
  options?: {
    title: string | null;
    icon: string | null;
    options: {
      title: string;
      icon: string;
      link: string;
    }[];
  }[];
};
function MainTile({ title, icon, data, options }: TileProps) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <Col lg="4" xl="3" md="6">
        <div
          className="tile p-4 shadow-sm border border-info rounded"
          onClick={toggle}
        >
          <div className="tile-title text-info d-flex justify-content-between align-items-center">
            <div className="d-flex">
              <div className="tile-icon d-flex align-items-center">
                <img src={icon} height={32} width={32} alt="Image"></img>
              </div>
              <h5 className="fw-bold tile-name mb-0 ms-2 d-flex align-items-center">
                {title}
              </h5>
            </div>
            <div className="total-data">
              <h5 className="mb-0 fw-bold">
                {data &&
                  Object.values(data).reduce(
                    (acc, curr) => (acc as number) + (curr as number),
                    0
                  )}
              </h5>
            </div>
          </div>
          <div className="tile-body pt-4">
            <span className="tile-count d-flex gap-3">
              {data &&
                Object.keys(data).map((key, index) => (
                  <div
                    key={index}
                    className={`tile-count-item ${title?.toLowerCase()}-${key.toLowerCase()}`}
                  >
                    <p className="mb-0 count">{data[key as keyof object]}</p>
                    <p className="mb-0 name">{key}</p>
                  </div>
                ))}
            </span>
          </div>
        </div>
      </Col>
      <Modal isOpen={modal} toggle={toggle} centered className="TilePopUp ">
        <ModalHeader toggle={toggle} className="border-0 pb-4 fs-5">
          <div className="d-flex align-items-center gap-2">
            <img src={icon} alt="" height={32} width={32} />
            <div className="fw-bold text-info ms-2 fs-4"> {title}</div>
          </div>
        </ModalHeader>
        <ModalBody>
          <Row className={`${title.toLowerCase()} row-gap-4`}>
            {options?.map((option, index) => (
              <Col sm="12" key={index} className=" opt">
                {option.title && (
                  <>
                    <div className="d-flex gap-1 align-items-center">
                      <img
                        src={option.icon as string}
                        height={24}
                        width={24}
                      ></img>
                      <h6 className="mb-0 fw-bold text-info fs-5">
                        {option.title}
                      </h6>
                    </div>

                    <hr className="mt-1" />
                  </>
                )}
                <Row>
                  {option.options?.map((item, index) => (
                    <Col sm="6" className="mb-3" key={index}>
                      <Link
                        to={`${item.link}`}
                        className="w-100 d-flex flex-column btn btn-outline-info modaltile p-3 row-gap-3"
                      >
                        <img
                          src={item?.icon}
                          height={48}
                          width={48}
                          alt="Image"
                          className=""
                        ></img>

                        <h6 className="mb-0 text-start fs-6">{item.title}</h6>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </Col>
            ))}
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
}

type MediumTilesProps = {
  title: string;
  data?: object;
  icon: string;
  link?: string;
  options?: {
    title: string | null;
    icon: string | null;
    options: {
      title: string;
      icon: string;
      link: string;
    }[];
  }[];
};
function MediumTiles({ title, icon, options }: MediumTilesProps) {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <div
        className="btn btn-outline-info px-4 d-flex w-100 align-items-center medium_tile db"
        onClick={toggle}
      >
        <div className="tile-title d-flex justify-content-between align-items-center">
          <div className="d-flex">
            <div className="tile-icon d-flex align-items-center me-2">
              <img src={icon} height={32} width={32} alt="Image"></img>
            </div>
            <div className="fw-bold tile-name mb-0 d-flex align-items-center text-start">
              {title}
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle} centered className="TilePopUp">
        <ModalHeader toggle={toggle} className="border-0 pb-4 fs-5">
          <div className="d-flex align-items-center gap-2">
            <img src={icon} alt="" height={32} width={32} />
            <div className="fw-bold text-info ms-2 fs-4"> {title}</div>
          </div>
        </ModalHeader>
        <ModalBody>
          <Row>
            {options?.map((option, index) => (
              <Col sm="12" key={index} className="mb-3">
                {option.title && (
                  <>
                    <h6 className="mb-0 fw-bold text-info">{option.title}</h6>
                    <hr className="mt-1" />
                  </>
                )}
                <Row>
                  {option.options?.map((item, index) => (
                    <Col sm="6" key={index}>
                      <Link
                        to={`${item.link}`}
                        className="w-100 d-flex flex-column btn btn-outline-info modaltile"
                      >
                        <img
                          src={item?.icon}
                          height={48}
                          width={48}
                          alt="Image"
                          className="mb-4"
                        ></img>

                        <h6 className="mb-0 text-start fw-bold">
                          {item.title}
                        </h6>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </Col>
            ))}
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
}

type AccountTilesProps = {
  title: string;
  data?: object;
  icon: string;
  link?: string;
  options?: {
    title: string | null;
    icon: string | null;
    options: {
      title: string;
      icon: string;
      link: string;
    }[];
  }[];
};
function AccountTiles({ title, icon, options }: AccountTilesProps) {
  const [modal, setModal] = useState(false);
  const optionsLength = options?.length;
  const toggle = () => setModal(!modal);

  return (
    <>
      <div
        className="btn btn-outline-info px-4 d-flex w-100 align-items-center medium_tile db"
        onClick={toggle}
      >
        <div className="tile-title d-flex justify-content-between align-items-center">
          <div className="d-flex">
            <div className="tile-icon d-flex align-items-center me-2">
              <img src={icon} height={32} width={32} alt="Image"></img>
            </div>
            <div className="fw-bold tile-name mb-0 d-flex align-items-center text-start">
              {title}
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modal}
        toggle={toggle}
        centered
        className="TilePopUp"
        size={optionsLength == 3 ? "lg" : "xl"}
      >
        <ModalHeader toggle={toggle} className="border-0 pb-4 fs-5">
          <div className="d-flex align-items-center gap-2">
            <img src={icon} alt="" height={32} width={32} />
            <div className="fw-bold text-info ms-2 fs-4"> {title}</div>
          </div>
        </ModalHeader>
        <ModalBody>
          <Container>
            <Row>
              {options?.map((option, index) => (
                <Col
                  md={6}
                  xl={optionsLength == 3 ? 4 : 3}
                  xs={12}
                  key={index}
                  className="mb-3"
                >
                  {option.title && (
                    <>
                      <h6 className="mb-0 fw-bold text-info">{option.title}</h6>
                      <hr className="mt-1" />
                    </>
                  )}
                  {option.options?.map((item, index) => (
                    <Link
                      to={`${item.link}`}
                      key={index}
                      className="btn btn-outline-info p-2 d-flex w-100 align-items-center mb-3 column-gap-2 medium_tile db"
                    >
                      <img
                        src={item?.icon}
                        height={32}
                        width={32}
                        alt="Image"
                      ></img>

                      <div className="mb-0 text-start fs-6 small">
                        {item.title}
                      </div>
                    </Link>
                  ))}
                </Col>
              ))}
            </Row>
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
}

type ReportTilesProps = {
  title: string;
  data?: object;
  icon: string;
  link?: string;
  options?: {
    title: string | null;
    icon: string | null;
    options: {
      title: string;
      icon: string;
      link: string;
    }[];
  }[];
};
function ReportTiles({ title, icon, options }: ReportTilesProps) {
  const [modal, setModal] = useState(false);
  const optionsLength = options?.length;
  const toggle = () => setModal(!modal);

  return (
    <>
      <div
        className="btn btn-outline-info px-4 d-flex w-100 align-items-center medium_tile db"
        onClick={toggle}
      >
        <div className="tile-title d-flex justify-content-between align-items-center">
          <div className="d-flex">
            <div className="tile-icon d-flex align-items-center me-2">
              <img src={icon} height={32} width={32} alt="Image"></img>
            </div>
            <div className="fw-bold tile-name mb-0 d-flex align-items-center text-start">
              {title}
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={modal}
        toggle={toggle}
        centered
        className="TilePopUp"
        size={optionsLength == 3 ? "lg" : "xl"}
      >
        <ModalHeader toggle={toggle} className="border-0 pb-4 fs-5">
          <div className="d-flex align-items-center gap-2">
            <img src={icon} alt="" height={32} width={32} />
            <div className="fw-bold text-info ms-2 fs-4"> {title}</div>
          </div>
        </ModalHeader>
        <ModalBody>
          <Container>
            <Row>
              {options?.map((option, index) => (
                <Col
                  md={6}
                  xl={optionsLength == 3 ? 4 : 3}
                  xs={12}
                  key={index}
                  className="mb-3"
                >
                  {option.title && (
                    <>
                      <h6 className="mb-0 fw-bold text-info">{option.title}</h6>
                      <hr className="mt-1" />
                    </>
                  )}
                  {option.options?.map((item, index) => (
                    <Link
                      to={`${item.link}`}
                      key={index}
                      className="btn btn-outline-info p-2 d-flex w-100 align-items-center mb-3 column-gap-2 medium_tile db"
                    >
                      <img
                        src={item?.icon}
                        height={32}
                        width={32}
                        alt="Image"
                      ></img>

                      <div className="mb-0 text-start fs-6 small">
                        {item.title}
                      </div>
                    </Link>
                  ))}
                </Col>
              ))}
            </Row>
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
}
