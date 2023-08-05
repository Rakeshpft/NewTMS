import React, { useState } from "react";
import { AiOutlineFileExcel, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Navbar, NavbarBrand, Nav, NavItem, Table } from "reactstrap";
import { Header, SideBar } from "../../header";
import Profile from "../../pofile";
import SearchPage from "../../search-page";

const FuelPage = () => {
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
        <NavbarBrand>Fuel Cards</NavbarBrand>
        <Nav className="me-auto" navbar>
          <div className="d-flex">
            <NavItem>Export</NavItem>
            <Link to={"#"}>
              <AiOutlineFileExcel className="text-success fs-4" />
            </Link>
          </div>
        </Nav>
        <div className="d-flex align-items-center gap-3">
          <SearchPage />
          <Link
            className="btn btn-secondary"
            style={{ backgroundColor: "#B7D1E6", color: "black" }}
            to="/createfuelpage"
          >
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
                <th>#</th>
                <th>Card Number</th>
                <th>Card Status</th>
                <th>Expiration Date</th>
                <th>Assigned To</th>
                <th>Assigned On</th>
                <th>Truck</th>
                <th>Notes</th>
                <th>Actions</th>
                <th>*</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
                <td>Otto</td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default FuelPage;
