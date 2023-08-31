import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, Table, NavItem } from "reactstrap";
import { Header, SideBar } from "../../header";
import Profile from "../../pofile";
import { AiOutlineFileExcel, AiOutlinePlus } from "react-icons/ai";
import { MdOutgoingMail } from "react-icons/md";
import { PiFilePdfDuotone } from "react-icons/pi";
import SearchPage from "../../search-page/search-page";
import TableSortIcon from "../../load-page/tableSortIcon";

const tableData = {
  tableHeaders: [
    "Id",
    "Date",
    "Partner",
    "Amount",
    "status",
    "Notes",
    "Actions",
  ],
  tableRowData: [
    [
      "1001",
      "06/14/23",
      "Max payne [drv]",
      "002063566 ONTARIO",
      "Completed",
      "none",
      "options",
    ],
    [
      "1001",
      "06/14/23",
      "Max payne [drv]",
      "002063566 ONTARIO",
      "Completed",
      "none",
      "options",
    ],
    [
      "1001",
      "06/14/23",
      "Max payne [drv]",
      "002063566 ONTARIO",
      "Completed",
      "none",
      "options",
    ],
    [
      "1001",
      "06/14/23",
      "Max payne [drv]",
      "002063566 ONTARIO",
      "Completed",
      "none",
      "options",
    ],
  ],
};

const FactoringReport = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Navbar color="light" className="py-0">
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        />
        <NavbarBrand className="fw-bold px-4">Factoring Reports</NavbarBrand>
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
          <SearchPage />
          <Link
            className="btn btn-sm btn-outline-primary"
            to="/createfactoringreport"
          >
            <AiOutlinePlus />
            New Factoring Report
          </Link>
          <Profile />
        </div>
      </Navbar>
      <div className="content d-flex">
        <SideBar isSidebarOpen={!isSidebarOpen} activePageId={7} />
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

export default FactoringReport;
