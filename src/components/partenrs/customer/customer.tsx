import React, { useState } from "react";
import {
  Input,
  InputGroup,
  InputGroupText,
  Nav,
  NavItem,
  Navbar,
  NavbarBrand,
  TabPane,
} from "reactstrap";
import { Header, SideBar } from "../../header";
import { MdOutgoingMail } from "react-icons/md";
import { AiOutlineFileExcel, AiOutlinePlus } from "react-icons/ai";
import { PiFilePdfDuotone, PiGearDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";
import Profile from "../../pofile";
import { TabPage } from "../../driver-page";
import { routes } from "../../routes/routes";
import { BsSearch } from "react-icons/bs";
import { GenericTable } from "../../table";

const tableHeaders = [
  "#",
  "Name",
  "address",
  "Phone",
  "MC",
  "Pay-method",
  "Credit",
  "Avg. DTP",
  "Status",
  "Action",
  <PiGearDuotone />,
];

const tableRowData = [
  {
    "#": "1001",
    Name: "Max payne",
    address: "XYZABC",
    Phone: "1234567890",
    MC: "1234",
    "Pay-method": "credit",
    Credit: "12345",
    "Avg. DTP": "best",
    Status: "Lumper",
    Action: "[options]",
  },
  {
    "#": "1002",
    Name: "Max payne",
    address: "XYZABC",
    Phone: "1234567890",
    MC: "1234",
    "Pay-method": "credit",
    Credit: "12345",
    "Avg. DTP": "best",
    Status: "Lumper",
    Action: "[options]",
  },
];

const Customer = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const [filteredData, setFilteredData] = useState(tableRowData);

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

  return (
    <>
      <Navbar color="light" className="py-0">
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        />
        <NavbarBrand className="fw-bold px-4">Customers</NavbarBrand>
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
            </InputGroup>
          </div>
          <Link
            className="btn btn-sm btn-outline-primary"
            to={routes.createNewCustomer}
          >
            <AiOutlinePlus />
            New Customer
          </Link>
          <Profile />
        </div>
      </Navbar>
      <div className="content d-flex">
        <SideBar isSidebarOpen={!isSidebarOpen} activePageId={3} />
        <div className="aria-content container-fluid my-1">
          <TabPage tabTitles={["Brokers", "Shippers/Receivers"]}>
            <TabPane tabId={1} className="m-2">
              <GenericTable
                tableHeaders={tableHeaders}
                tableData={filteredData}
                defaultSortColumn="Name"
              />
            </TabPane>
            <TabPane tabId={2} className="m-2">
              <GenericTable
                tableHeaders={tableHeaders}
                tableData={filteredData}
                defaultSortColumn="Name"
              />
            </TabPane>
          </TabPage>
        </div>
      </div>
    </>
  );
};

export default Customer;
