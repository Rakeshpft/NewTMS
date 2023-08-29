import React, { useState } from "react";
import { AiOutlineFileExcel, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, Table } from "reactstrap";
import { Header, SideBar } from "../../header";
import Profile from "../../pofile";
import SearchPage from "../../search-page";
import { PiGearDuotone } from "react-icons/pi";
import TableSortIcon from "../../load-page/tableSortIcon";

const tableData = {
  tableHeaders: [
    "#",
    "Card Number",
    "Card Status",
    "Expiration Date",
    "Assigned To",
    "Assigned On",
    "Truck",
    "Notes",
    "Actions",
    <PiGearDuotone />,
  ],
  tableRowData: [
    [
      "1",
      "123456789",
      "Active",
      "06/14/23",
      "Max payne [drv]",
      "002063566 ONTARIO",
      "Joliet, IL",
      "Cameron, IL",
      "Lumper",
      "options",
    ],
    [
      "1",
      "123456789",
      "Active",
      "06/14/23",
      "Max payne [drv]",
      "002063566 ONTARIO",
      "Joliet, IL",
      "Cameron, IL",
      "Lumper",
      "options",
    ],
    [
      "1",
      "123456789",
      "Active",
      "06/14/23",
      "Max payne [drv]",
      "002063566 ONTARIO",
      "Joliet, IL",
      "Cameron, IL",
      "Lumper",
      "options",
    ],
    [
      "1",
      "123456789",
      "Active",
      "06/14/23",
      "Max payne [drv]",
      "002063566 ONTARIO",
      "Joliet, IL",
      "Cameron, IL",
      "Lumper",
      "options",
    ],
  ],
};

const FuelPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Navbar color="light" className="py-0">
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        />
        <NavbarBrand className="fw-bold px-4">Fuel Cards</NavbarBrand>
        <Nav className="me-auto" navbar>
          <div className="d-flex gap-2 align-items-center">
            <NavItem className="small h6 mb-0">Export</NavItem>
            <Link to={"#"}>
              <AiOutlineFileExcel className="text-success fs-4" />
            </Link>
          </div>
        </Nav>
        <div className="d-flex align-items-center gap-3">
          <SearchPage />
          <Link className="btn btn-sm btn-outline-primary" to="/createfuelpage">
            <AiOutlinePlus />
            New Fuel Card
          </Link>
          <Profile />
        </div>
      </Navbar>
      <div className="content d-flex">
        <SideBar isSidebarOpen={!isSidebarOpen} />
        <div className="aria-content">
          <Table responsive hover className="table-data text-nowrap">
            <thead>
              <tr>
                {tableData.tableHeaders.map((headeritem, index) => (
                  <th key={index}>
                    <span>{headeritem}</span>

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
        </div>
      </div>
    </>
  );
};

export default FuelPage;
