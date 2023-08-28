import React, { useState } from "react";
import { Nav, NavItem, Navbar, NavbarBrand, TabPane, Table } from "reactstrap";
import { Header, SideBar } from "../../header";
import { MdOutgoingMail } from "react-icons/md";
import { AiOutlineFileExcel, AiOutlinePlus } from "react-icons/ai";
import { PiFilePdfDuotone, PiGearDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";
import SearchPage from "../../search-page";
import Profile from "../../pofile";
import { TabPage } from "../../driver-page";
import TableSortIcon from "../../load-page/tableSortIcon";

const tableData = {
  tableHeaders: [
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
  ],
  tableRowData: [
    [
      "1001",
      "Max payne",
      "XYZABC",
      "1234567890",
      "1234",
      "credit",
      "12345",
      "best",
      "Lumper",
      "Invoiced",
      "[options]",
    ],
    [
      "1001",
      "Max payne",
      "XYZABC",
      "1234567890",
      "1234",
      "credit",
      "12345",
      "best",
      "Lumper",
      "Invoiced",
      "[options]",
    ],
    [
      "1001",
      "Max payne",
      "XYZABC",
      "1234567890",
      "1234",
      "credit",
      "12345",
      "best",
      "Lumper",
      "Invoiced",
      "[options]",
    ],
  ],
};

const Customer = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Navbar
        style={{ border: "1px solid #1B56AE" }}
        color="light"
        className="py-0"
      >
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        />
        <NavbarBrand className="fw-bold ps-4">Customers</NavbarBrand>
        <Nav className="me-auto" navbar>
          <div className="d-flex gap-2">
            <NavItem>Export</NavItem>
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
          <SearchPage />
          <Link className="btn btn-sm btn-outline-primary" to="/createcustomer">
            <AiOutlinePlus />
            New Customer
          </Link>
          <Profile />
        </div>
      </Navbar>
      <div className="content d-flex">
        <SideBar isSidebarOpen={!isSidebarOpen} />
        <div className="aria-content container-fluid my-1">
          <TabPage tabTitles={["Brokers", "Shippers/Recivers"]}>
            <TabPane tabId={1} className="m-4">
              <Table responsive hover className="table-data text-nowrap">
                <thead>
                  <tr>
                    {tableData.tableHeaders.map((item, index) => (
                      <th key={index}>
                        <span>{item}</span>

                        <TableSortIcon />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.tableRowData?.map((row, index) => (
                    <tr key={index}>
                      {row.map((item, index) => (
                        <td key={index}>{item}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TabPane>
            <TabPane tabId={2} className="m-4">
              <Table responsive hover className="table-data text-nowrap">
                <thead>
                  <tr>
                    {tableData.tableHeaders.map((item, index) => (
                      <th key={index}>
                        <span>{item}</span>

                        <TableSortIcon />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableData.tableRowData?.map((row, index) => (
                    <tr key={index}>
                      {row.map((item, index) => (
                        <td key={index}>{item}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </TabPane>
          </TabPage>
        </div>
      </div>
    </>
  );
};

export default Customer;
