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
  CardBody,
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
      icon: require("../../../public/icons/conveyor-belt.png"),
      options: [
        {
          title: null,
          icon: null,
          options: [
            {
              title: "Create A Load",
              icon: require("../../../public/icons//create-a-load.png"),
              link: "/createload",
            },
            {
              title: "View Existing Loads",
              icon: require("../../../public/icons//view-existing-loads.png"),
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
      icon: require("../../../public/icons/truck-driver.png"),
      options: [
        {
          title: null,
          icon: null,
          options: [
            {
              title: "Create a Profile",
              icon: require("../../../public/icons/create-a-load.png"),
              link: "/createdriver",
            },
            {
              title: "View Drivers",
              icon: require("../../../public/icons/view-existing-loads.png"),
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
      icon: require("../../../public/icons/partner-exchange-rounded.png"),
      options: [
        {
          title: "Customers",
          icon: require("../../../public/icons/users.png"),
          options: [
            {
              title: "Add New Customer",
              icon: require("../../../public/icons/create-a-load.png"),
              link: "/createcustomer",
            },
            {
              title: "View All Customers",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/partners/customers",
            },
          ],
        },
        {
          title: "Vendors",
          icon: require("../../../public/icons/partners-vendors.png"),
          options: [
            {
              title: "Add New Vendor",
              icon: require("../../../public/icons/create.png"),
              link: "/createvendor",
            },
            {
              title: "View All Vendors",
              icon: require("../../../public/icons/view-existing-vendors.png"),
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
      icon: require("../../../public/icons/mdi_tools.png"),
      options: [
        {
          title: "Trucks",
          icon: require("../../../public/icons/create-a-load.png"),
          options: [
            {
              title: "Add New Truck",
              icon: require("../../../public/icons/create-a-load.png"),
              link: "/createnewtruck",
            },
            {
              title: "View All Trucks",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/equipments/trucks",
            },
          ],
        },
        {
          title: "Trailers",
          icon: require("../../../public/icons/view-existing-loads.png"),
          options: [
            {
              title: "Add New Trailer",
              icon: require("../../../public/icons/create.png"),
              link: "/createnewtrailers",
            },
            {
              title: "View All Trailers",
              icon: require("../../../public/icons/view-existing-vendors.png"),
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
      icon: require("../../../public/icons/fuel.png"),
      options: [
        {
          title: "Fuel Card",
          icon: require("../../../public/icons/create-a-load.png"),
          options: [
            {
              title: "Add New Fuel Card",
              icon: require("../../../public/icons/create-a-load.png"),
              link: "/createfuelpage",
            },
            {
              title: "View All Fuel Card",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/fuel/fuelcard",
            },
          ],
        },
        {
          title: "Fuel Transactions",
          icon: require("../../../public/icons/create-a-load.png"),
          options: [
            {
              title: "Add New Fuel Transaction",
              icon: require("../../../public/icons/create-a-load.png"),
              link: "/createfueltransaction",
            },
            {
              title: "View All Fuel Transaction",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/fuel/fueltransaction",
            },
          ],
        },
        {
          title: "Fuel Import",
          icon: require("../../../public/icons/create-a-load.png"),
          options: [
            {
              title: "View All Fuel Import",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/fuel/fuelimport",
            },
          ],
        },
      ],
    },
    {
      title: "Driver Payroll",
      icon: require("../../../public/icons/driver-payroll.png"),
      options: [
        {
          title: null,
          icon: null,
          options: [
            {
              title: "Add New Driver Payroll",
              icon: require("../../../public/icons/create-a-load.png"),
              link: "/createdriverpayroll",
            },
            {
              title: "View All Driver Payroll",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/driverpayroll",
            },
          ],
        },
      ],
    },
    {
      title: "Reports",
      icon: require("../../../public/icons/reports.png"),
      options: [
        {
          title: null,
          icon: null,
          options: [
            {
              title: "Add New Report",
              icon: require("../../../public/icons/create-a-load.png"),
              link: "/",
            },
            {
              title: "View All Report",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/",
            },
          ],
        },
      ],
    },
  ],

  accountTiles: [
    {
      title: "Accounts",
      icon: require("../../../public/icons/accounts.png"),
      options: [
        {
          title: "Billing Entries",
          icon: require("../../../public/icons/create-a-load.png"),
          options: [
            {
              title: "Add New Billing Entry",
              icon: require("../../../public/icons/create-a-load.png"),
              link: "/createbillingpage",
            },
            {
              title: "View All Billing Entry",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/accounts/billing",
            },
          ],
        },
        {
          title: "Additions/Deductions",
          icon: require("../../../public/icons/accounts.png"),
          options: [
            {
              title: "Add New Entry",
              icon: require("../../../public/icons/create-a-load.png"),
              link: "/createadditions",
            },
            {
              title: "View All Additions/Deductions",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/accounts/additions",
            },
          ],
        },
        {
          title: "Charts of Accounts",
          icon: require("../../../public/icons/accounts.png"),
          options: [
            {
              title: "Add New Chart of Account",
              icon: require("../../../public/icons/create-a-load.png"),
              link: "/createchartofaccounts",
            },
            {
              title: "View All Chart of Accounts",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/accounts/chartofaccounts",
            },
          ],
        },
        {
          title: "Factoring Report",
          icon: require("../../../public/icons/accounts.png"),
          options: [
            {
              title: "Add New Factoring Report",
              icon: require("../../../public/icons/create-a-load.png"),
              link: "/createfactoringreport",
            },
            {
              title: "View All Factoring Reports",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/accounts/factoringreport",
            },
          ],
        },
        {
          title: "Vendor Balances",
          icon: require("../../../public/icons/view-existing-loads.png"),
          options: [
            {
              title: "View All Vendor Balance",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/accounts/vendorbalance",
            },
          ],
        },
        {
          title: "Schedule Payments/Dedutions",
          icon: require("../../../public/icons/accounts.png"),
          options: [
            {
              title: "Add New Schedule Payment/Deduction",
              icon: require("../../../public/icons/create-a-load.png"),
              link: "/createscheduledpage",
            },
            {
              title: "View All Schedule Payments/Deductions",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/accounts/scheduledpage",
            },
          ],
        },
        {
          title: "Expenses",
          icon: require("../../../public/icons/view-existing-loads.png"),
          options: [
            {
              title: "View All Expenses",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/accounts/expensespage",
            },
          ],
        },
        {
          title: "Payment",
          icon: require("../../../public/icons/accounts.png"),
          options: [
            {
              title: "Add New Payment",
              icon: require("../../../public/icons/create-a-load.png"),
              link: "/createpaymentspage",
            },
            {
              title: "View All Payments",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/accounts/paymentspage",
            },
          ],
        },
      ],
    },
  ],

  smallTiles: [
    {
      name: "Users",
      icon: require("../../../public/icons//users.png"),
      link: "/users",
    },
    {
      name: "Data Library",
      icon: require("../../../public/icons//data-library.png"),
      link: "/data-library",
    },
    {
      name: "Doc Exchange",
      icon: require("../../../public/icons//docs-exchange.png"),
      link: "/docs-exchange",
    },
    {
      name: "IFTA",
      icon: require("../../../public/icons//agreement.png"),
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
                  src={require("../../../public/icons//help.png")}
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
                  src={require("../../../public/icons/safety.png")}
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
                  src={require("../../../public/icons/setting-one.png")}
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
            <Card className="dashboard-card h-100">
              <CardBody>
                <div className="section-header d-flex justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={require("../../../public/icons/Ic-Overview.png")}
                      alt="Image"
                      width={32}
                      height={32}
                    />
                    <h5 className="text-info fw-bold mb-0 ">Sales Report</h5>
                  </div>

                  <div className="d-flex gap-3">
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
                  </div>
                </div>
                <section></section>
              </CardBody>
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
              {dashboardTiles.accountTiles.map((tile, index) => (
                <Col md="6" key={index}>
                  <AccountTiles
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
                <Col md={6} xl={3} key={index}>
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
        size="xl"
      >
        <ModalHeader toggle={toggle} className="border-0">
          {title}
        </ModalHeader>
        <ModalBody>
          <Container>
            <Row>
              {options?.map((option, index) => (
                <Col md={3} key={index} className="mb-3">
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
                      className="btn btn-outline-info px-4 d-flex w-100 align-items-center mb-3 column-gap-2 medium_tile db"
                    >
                      <img
                        src={item?.icon}
                        height={32}
                        width={32}
                        alt="Image"
                      ></img>

                      <h6 className="mb-0 text-start fw-bold small">
                        {item.title}
                      </h6>
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
