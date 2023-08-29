import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, Table } from "reactstrap";
import { Header, SideBar } from "../../header";
import Profile from "../../pofile";
import { AiOutlinePlus } from "react-icons/ai";
import SearchPage from "../../search-page/search-page";
import TableSortIcon from "../../load-page/tableSortIcon";

const tableData = {
  tableHeaders: ["Name", "Type", "Description", "Active", "Notes", "Actions"],
  tableRowData: [
    ["Max Payne", "Driver", "Joliet, IL", "true", "None", "options"],
    ["Max Payne", "Driver", "Joliet, IL", "true", "None", "options"],
    ["Max Payne", "Driver", "Joliet, IL", "true", "None", "options"],
  ],
};

const ChartofAccounts = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Navbar color="light" className="py-0">
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        />
        <NavbarBrand className="fw-bold px-4">Charts Of Accounts</NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-3">
          <SearchPage />
          <Link
            className="btn btn-sm btn-outline-primary"
            to="/createchartofaccounts"
          >
            <AiOutlinePlus />
            New Charts Of Account
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

export default ChartofAccounts;
