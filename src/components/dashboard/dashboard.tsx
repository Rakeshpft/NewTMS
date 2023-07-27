import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Dropdown,
  Modal,
  ModalBody,
  ModalHeader,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";
import NavigationBar from "../navigation-bar";
import { FiDownload } from "react-icons/fi";
const dashboardTiles = {
  mainTiles: [
    {
      name: "Loads",
      data: {
        New: 12,
        "En-Route": 15,
        Delivered: 21,
      },
      icon: "/icons/conveyor-belt.svg",
      options: [
        {
          title: "Create A Load",
          icon: "/icons/create-a-load.svg",
          link: "/createload",
        },
        {
          title: "View Existing Loads",
          icon: "/icons/view-existing-loads.svg",
          link: "/loadpage",
        },
      ],
    },
    {
      name: "Drivers",
      data: {
        // Applicants: 12,
        Hired: 83,
        Terminated: 21,
      },
      icon: "/icons/truck-driver.svg",
      options: [
        {
          title: "Create a Profile",
          icon: "/icons/create-a-load.svg",
          link: "/createdriver",
        },
        {
          title: "View Drivers",
          icon: "/icons/view-existing-loads.svg",
          link: "/driverpage",
        },
      ],
    },
    {
      name: "Partners",
      data: {
        Customers: 12,
        Vendors: 15,
      },
      icon: "/icons/partner-exchange-rounded.svg",
      options: [
        {
          title: "Customers",
          icon: "/icons/partners-customers.svg",
          link: "/partners/customers",
        },
        {
          title: "Vendors",
          icon: "/icons/partners-vendors.svg",
          link: "/partners/vendors",
        },
      ],
    },
    {
      name: "Equipments",
      data: {
        Trucks: 19,
        Trailers: 24,
      },
      icon: "/icons/mdi_tools.svg",
      options: [
        {
          title: "Trucks",
          icon: "/icons/create-a-load.svg",
          link: "/trucks",
        },
        {
          title: "Trailers",
          icon: "/icons/view-existing-loads.svg",
          link: "/trailers",
        },
      ],
    },
  ],
  mediumTiles: [
    {
      name: "Fuel",
      icon: "/icons/fuel.svg",
      link: "/fuel",
    },
    {
      name: "Driver Payroll",
      icon: "/icons/driver-payroll.svg",
      link: "/driver-payroll",
    },
    {
      name: "Accounts",
      icon: "/icons/accounts.svg",
      link: "/accounts",
    },
    {
      name: "Reports",
      icon: "/icons/reports.svg",
      link: "/reports",
    },
  ],
  smallTiles: [
    {
      name: "Users",
      icon: "/icons/users.svg",
      link: "/users",
    },
    {
      name: "Data Library",
      icon: "/icons/data-library.svg",
      link: "/data-library",
    },
    {
      name: "Doc Exchange",
      icon: "/icons/docs-exchange.svg",
      link: "/docs-exchange",
    },
    {
      name: "IFTA",
      icon: "/icons/agreement.svg",
      link: "/ifta",
    },
  ],
};
export default function DashboardPage() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  return (
    <section className="main-dashboard">
      <NavigationBar />
      <Container className="main-content py-2 px-4" fluid>
        <Row className="mb-3">
          <Col className="d-flex justify-content-between">
            <h4 className="text-info fw-bold mb-0">Dashboard</h4>
            <div className="db-options d-flex gap-2">
              <Button
                variant="outline-info"
                size="sm"
                className="d-flex align-items-center gap-1 px-3 shadow-lg rounded-pill"
              >
                <img src="icons/help.svg" alt="" height={24} width={24}></img>
                <span>Help</span>
              </Button>
              <Button
                variant="outline-info"
                size="sm"
                className="d-flex align-items-center gap-1 px-3 shadow-lg rounded-pill"
              >
                <img src="icons/safety.svg" alt="" height={24} width={24}></img>
                <span>Safety</span>
              </Button>
              <Button
                variant="outline-info"
                size="sm"
                className="d-flex align-items-center gap-1 px-3 shadow-lg rounded-pill"
              >
                <img
                  src="icons/settings.svg"
                  alt=""
                  height={24}
                  width={24}
                ></img>
                <span>Settings</span>
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="mb-3 gy-2">
          {dashboardTiles.mainTiles.map((tile, index) => (
            <MainTile
              key={index}
              name={tile.name}
              icon={tile.icon}
              data={tile.data}
              options={tile.options}
            />
          ))}
        </Row>
        <Row>
          <Col md="6">
            <h4 className="text-info fw-bold mb-3">Analytics</h4>

            <Card style={{ border: "1px solid #418ecb" }}>
              <Card>
                <div className="section-header d-flex justify-content-between p-2">
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src="./icons/Ic-Overview.svg"
                      alt="Image"
                      width={32}
                      height={32}
                    />
                    <h5 className="text-info fw-bold mb-0">Sales Report</h5>
                  </div>

                  <div className="d-flex gap-3">
                    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                      <DropdownToggle
                        caret
                        style={{ color: "#418ECB", background: "transparent" }}
                      >
                        Monthly
                      </DropdownToggle>
                      <DropdownMenu>
                        <DropdownItem header>Header</DropdownItem>
                        <DropdownItem>Some Action</DropdownItem>
                        <DropdownItem text>Dropdown Item Text</DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                    <Button
                      style={{ color: "#418ECB", background: "transparent" }}
                      className="d-flex gap-2 align-items-center"
                    >
                      Download Report
                      <FiDownload />
                    </Button>
                  </div>
                </div>
                <section style={{ minHeight: "300px" }}></section>
              </Card>
            </Card>
          </Col>
          <Col md="6">
            <h4 className="text-info fw-bold mb-3">Manage</h4>
            <Row className="gy-3 mb-3">
              {dashboardTiles.mediumTiles.map((tile, index) => (
                <Col md="6" key={index}>
                  <Link
                    to={tile.link}
                    className="btn btn-outline-info px-4 d-flex w-100 align-items-center medium_tile"
                  >
                    <img
                      src={tile.icon}
                      alt="Image"
                      width={32}
                      height={32}
                      className="me-3"
                    />
                    <h5 className="mb-0 fw-bold">{tile.name}</h5>
                  </Link>
                </Col>
              ))}
            </Row>
            <Row className="gy-3">
              <Col xs="12">
                <h4 className="text-info fw-bold mb-0">More</h4>
              </Col>
              {dashboardTiles.smallTiles.map((tile, index) => (
                <Col md="3" key={index}>
                  <Link
                    to={tile.link}
                    className="btn btn-outline-info d-flex w-100 align-items-center small_tile"
                  >
                    <img
                      src={tile.icon}
                      alt="Image"
                      width={24}
                      height={24}
                      className="me-1"
                    />
                    <h6 className="mb-0">{tile.name}</h6>
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
  name: string;
  data: object;
  icon: string;
  options?: { title: string; icon: string; link: string }[];
};
function MainTile({ name, icon, data, options }: TileProps) {
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
                {name}
              </h5>
            </div>
            <div className="total-data">
              <h5 className="mb-0 fw-bold">
                {Object.values(data).reduce(
                  (acc, curr) => (acc as number) + (curr as number),
                  0
                )}
              </h5>
            </div>
          </div>
          <div className="tile-body pt-4">
            <span className="tile-count d-flex gap-3">
              {Object.keys(data).map((key, index) => (
                <div
                  key={index}
                  className={`tile-count-item ${name.toLowerCase()}-${key.toLowerCase()}`}
                >
                  <p className="mb-0 count">{data[key as keyof object]}</p>
                  <p className="mb-0 name">{key}</p>
                </div>
              ))}
            </span>
          </div>
        </div>
      </Col>
      <Modal isOpen={modal} toggle={toggle} centered className="TilePopUp">
        <ModalHeader toggle={toggle} className="border-0">
          {name}
        </ModalHeader>
        <ModalBody>
          <Row>
            {options?.map((option, index) => (
              <Col sm="6" key={index}>
                <Link
                  to={option.link}
                  className="w-100 d-flex flex-column btn btn-outline-info modaltile"
                >
                  <img
                    src={option.icon}
                    height={48}
                    width={48}
                    alt="Image"
                    className="mb-4"
                  ></img>

                  <h6 className="mb-0 text-start fw-bold">{option.title}</h6>
                </Link>
              </Col>
            ))}
          </Row>
        </ModalBody>
      </Modal>
    </>
  );
}
