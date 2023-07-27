import React, { useState } from "react";
import { MdOutgoingMail } from "react-icons/md";
import { AiOutlineFileExcel } from "react-icons/ai";
import { PiFilePdfDuotone } from "react-icons/pi";
import { Nav, Navbar, NavbarBrand, NavItem, Table } from "reactstrap";
import SearchPage from "../search-page";
import { Link } from "react-router-dom";
import { Header, SideBar } from "../header";
import Profile from "../pofile";

const DriverPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Navbar style={{ border: "1px solid #1B56AE" }} color="light" className="py-0">
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        />
        <NavbarBrand>Driver</NavbarBrand>
        <Nav className="me-auto" navbar>
          <div className="d-flex">
            <NavItem>Export</NavItem>
            <Link to={"#!"}>
              <PiFilePdfDuotone className="me-2 text-danger fs-4" />
            </Link>
            <Link to={"#"}>
              <AiOutlineFileExcel className="text-success fs-4" />
            </Link>
            <Link to={"#!"}>
              <MdOutgoingMail className="fs-4" />
            </Link>
          </div>
        </Nav>
        <div className="d-flex align-items-center gap-3">
          <SearchPage />
          <Link className="btn btn-secondary " to="/createdriver">
            New Driver
          </Link>
          <Profile />
        </div>
      </Navbar>
      <div className="d-flex">
        <SideBar isSidebarOpen={!isSidebarOpen} />
        <div className="w-100">
          <Table responsive borderless>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Type</th>
                <th>Status</th>
                <th>Hire Date</th>
                <th>Term Date</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Truck</th>
                <th>Trailer</th>
                <th>Payable To</th>
                <th>Warnings</th>
                <th>Driver App</th>
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
                <td>@mdo</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>Mark</td>
                <td></td>
              </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default DriverPage;
