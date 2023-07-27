import React, { useState } from "react";
import { MdOutgoingMail } from "react-icons/md";
import { AiOutlineFileExcel } from "react-icons/ai";
import { PiFilePdfDuotone } from "react-icons/pi";
import { Header, SideBar } from "../../header";
import { Nav, NavItem, Navbar, NavbarBrand, Table } from "reactstrap";
import { Link } from "react-router-dom";
import SearchPage from "../../search-page";
import Profile from "../../pofile";

const Vendors = () => {
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
        <NavbarBrand>Vendors</NavbarBrand>
        <Nav className="me-auto" navbar>
          <div className="d-flex">
            <NavItem className="px-2">Export</NavItem>
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
          <Link className="btn btn-secondary " to="/createvendor">
            New Vendor
          </Link>
          <Profile />
        </div>
      </Navbar>
      <div className="d-flex">
        <SideBar isSidebarOpen={!isSidebarOpen} />
        <hr></hr>
        <Table responsive borderless>
          <thead>
            <tr>
              <th> # </th>
              <th> Name </th>
              <th> Address </th>
              <th> MC </th>
              <th> Phone </th>
              <th> Email </th>
              <th>type</th>
              <th>Action</th>
              <th>*</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Otto</td>
              <td> XYZABC</td>
              <td>Dont Know </td>
              <td>987654321</td>
              <td>Otto@mdo</td>
              <td>Animal</td>
              <td>Very Good</td>
              <td></td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default Vendors;
