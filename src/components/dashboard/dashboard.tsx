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
      title: "Loads",
      data: {
        New: 12,
        "En-Route": 15,
        Delivered: 21,
      },
      icon: require("../../../public/assets/conveyor-belt.svg"),
      options: [
        {
          title: null,
          icon: null,
          options: [
            {
              title: "Create A Load",
              icon: require("../../../public/assets/create-a-load.svg"),
              link: "/createload",
            },
            {
              title: "View Existing Loads",
              icon: require("../../../public/assets/view-existing-loads.svg"),
              link: "/loadpage",
            },
          ],
        },
      ],
    },
    {
      title: "Drivers",
      data: {
        Hired: 83,
        Terminated: 21,
      },
      icon: require("../../../public/assets/truck-driver.svg"),
      options: [
        {
          title: null,
          icon: null,
          options: [
            {
              title: "Create a Profile",
              icon: "./assets/create-a-load.svg",
              link: "/createdriver",
            },
            {
              title: "View Drivers",
              icon: "./assets/view-existing-loads.svg",
              link: "/driverpage",
            },
          ],
        },
      ],
    },
    {
      title: "Partners",
      data: {
        Customers: 12,
        Vendors: 15,
      },
      icon: "./assets/partner-exchange-rounded.svg",
      options: [
        {
          title: "Customers",
          icon: "./assets/partners-s.svg",
          options: [
            {
              title: "Add New Customer",
              icon: "./assets/create-a-load.svg",
              link: "/createcustomer",
            },
            {
              title: "View All Customers",
              icon: "./assets/view-existing-loads.svg",
              link: "/partners/customers",
            },
          ],
        },
        {
          title: "Vendors",
          icon: "./assets/partners-vendors.svg",
          options: [
            {
              title: "Add New Vendor",
              icon: "./assets/create.svg",
              link: "/createvendor",
            },
            {
              title: "View All Vendors",
              icon: "./assets/view-existing-vendors.svg",
              link: "/partners/vendors",
            },
          ],
        },
      ],
    },
    {
      title: "Equipments",
      data: {
        Trucks: 19,
        Trailers: 24,
      },
      icon: "./assets/mdi_tools.svg",
      options: [
        {
          title: "Trucks",
          icon: "./assets/create-a-load.svg",
          options: [
            {
              title: "Add New Truck",
              icon: "./assets/create-a-load.svg",
              link: "/createnewtruck",
            },
            {
              title: "View All Trucks",
              icon: "./assets/view-existing-loads.svg",
              link: "/equipments/trucks",
            },
          ],
        },
        {
          title: "Trailers",
          icon: "./assets/view-existing-loads.svg",
          options: [
            {
              title: "Add New Trailer",
              icon: "./assets/create.svg",
              link: "/createnewtrailers",
            },
            {
              title: "View All Trailers",
              icon: "./assets/view-existing-vendors.svg",
              link: "/equipments/trailers",
            },
          ],
        },
      ],
    },
  ],
  mediumTiles: [
    {
      title: "Fuel",
      icon: "./assets/fuel.svg",
      options: [
        {
          title: "Fuel Card",
          icon: "./assets/create-a-load.svg",
          options: [
            {
              title: "Add New Fuel Card",
              icon: "./assets/create-a-load.svg",
              link: "/createfuelpage",
            },
            {
              title: "View All Fuel Card",
              icon: "./assets/view-existing-loads.svg",
              link: "/fuel/fuelcard",
            },
          ],
        },
        {
          title: "Fuel Transactions",
          icon: "./assets/create-a-load.svg",
          options: [
            {
              title: "Add New Fuel Transaction",
              icon: "./assets/create-a-load.svg",
              link: "/createfueltransaction",
            },
            {
              title: "View All Fuel Transaction",
              icon: "./assets/view-existing-loads.svg",
              link: "/fuel/fueltransaction",
            },
          ],
        },
        {
          title: "Fuel Import",
          icon: "./assets/create-a-load.svg",
          options: [
            {
              title: "View All Fuel Import",
              icon: "./assets/view-existing-loads.svg",
              link: "/fuel/fuelimport",
            },
          ],
        },
      ],
    },
    {
      title: "Driver Payroll",
      icon: "./assets/driver-payroll.svg",
      options: [
        {
          title: null,
          icon: null,
          options: [
            {
              title: "Add New Driver Payroll",
              icon: "./assets/create-a-load.svg",
              link: "/createdriverpayroll",
            },
            {
              title: "View All Driver Payroll",
              icon: "./assets/view-existing-loads.svg",
              link: "/driverpayroll",
            },
          ],
        },
      ],
    },
    {
      title: "Accounts",
      icon: "./assets/accounts.svg",
      options: [
        {
          title: "Billing Entries",
          icon: "./assets/create-a-load.svg",
          options: [
            {
              title: "Add New Billing Entry",
              icon: "./assets/create-a-load.svg",
              link: "/createbillingpage",
            },
            {
              title: "View All Billing Entry",
              icon: "./assets/view-existing-loads.svg",
              link: "/accounts/billing",
            },
          ],
        },
        {
          title: "Vendor Balances",
          icon: "./assets/view-existing-loads.svg",
          options: [
            {
              title: "View All Vendor Balance",
              icon: "./assets/view-existing-loads.svg",
              link: "/accounts/vendorbalance",
            },
          ],
        },
      ],
    },
    {
      title: "Reports",
      icon: "./assets/reports.svg",
      options: [
        {
          title: null,
          icon: null,
          options: [
            {
              title: "Add New Report",
              icon: "./assets/create-a-load.svg",
              link: "/",
            },
            {
              title: "View All Report",
              icon: "./assets/view-existing-loads.svg",
              link: "/",
            },
          ],
        },
      ],
    },
  ],

  smallTiles: [
    {
      name: "Users",
      icon: require("../../../public/assets/users.svg"),
      link: "/users",
    },
    {
      name: "Data Library",
      icon: require("../../../public/assets/data-library.svg"),
      link: "/data-library",
    },
    {
      name: "Doc Exchange",
      icon: require("../../../public/assets/docs-exchange.svg"),
      link: "/docs-exchange",
    },
    {
      name: "IFTA",
      icon: require("../../../public/assets/agreement.svg"),
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
                color="outline-info"
                size="sm"
                className="d-flex align-items-center gap-1 px-3 shadow-lg rounded-pill"
              >
                <img
                  src={require("../../../public/assets/help.svg")}
                  alt=""
                  height={24}
                  width={24}
                ></img>
                <span>Help</span>
              </Button>
              <Button
                color="outline-info"
                size="sm"
                className="d-flex align-items-center gap-1 px-3 shadow-lg rounded-pill"
              >
                <img
                  src="./assets/safety.svg"
                  alt=""
                  height={24}
                  width={24}
                ></img>
                <span>Safety</span>
              </Button>
              <Button
                color="outline-info"
                size="sm"
                className="d-flex align-items-center gap-1 px-3 shadow-lg rounded-pill"
              >
                <img
                  src="./assets/settings.svg"
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
              title={tile.title}
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
                      src="../assets/Ic-Overview.svg"
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
                  <MediumTiles
                    key={index}
                    title={tile.title}
                    icon={tile.icon}
                    options={tile.options}
                  />
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
      <Modal isOpen={modal} toggle={toggle} centered className="TilePopUp">
        <ModalHeader toggle={toggle} className="border-0">
          {title}
        </ModalHeader>
        <ModalBody>
          <Row className={title.toLowerCase()}>
            {options?.map((option, index) => (
              <Col sm="12" key={index} className="mb-3 opt">
                {option.title && (
                  <>
                    <h6 className="mb-0 fw-bold text-info">{option.title}</h6>
                    <hr className="mt-1" />
                  </>
                )}
                <Row>
                  {option.options?.map((item) => (
                    <Col sm="6">
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
            <div className="tile-icon d-flex align-items-center">
              <img src={icon} height={32} width={32} alt="Image"></img>
            </div>
            <div className="fw-bold tile-name mb-0 ms-2 d-flex align-items-center">
              {title}
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggle} centered className="TilePopUp">
        <ModalHeader toggle={toggle} className="border-0">
          {title}
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
                  {option.options?.map((item) => (
                    <Col sm="6">
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
