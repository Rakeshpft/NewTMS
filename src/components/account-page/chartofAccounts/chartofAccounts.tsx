import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, Table } from "reactstrap";
import { Header, SideBar } from "../../header";
import Profile from "../../pofile";
import { AiOutlinePlus } from "react-icons/ai";
import SearchPage from "../../search-page/search-page";

const ChartofAccounts = () => {
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
        <NavbarBrand className="fw-bold">Charts Of Accounts</NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-3">
          <SearchPage />
          <Link className="btn buttonLink" to="/createchartofaccounts">
            <AiOutlinePlus />
            New Charts Of Account
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
                <th>Name</th>
                <th>Type</th>
                <th>Description</th>
                <th>Active</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default ChartofAccounts;
