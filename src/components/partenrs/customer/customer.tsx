import React, { useState } from "react";
import { Nav, NavItem, Navbar, NavbarBrand, TabPane, Table } from "reactstrap";
import { Header, SideBar } from "../../header";
import { MdOutgoingMail } from "react-icons/md";
import { AiOutlineFileExcel, AiOutlinePlus } from "react-icons/ai";
import { PiFilePdfDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";
import SearchPage from "../../search-page";
import Profile from "../../pofile";
import { TabPage } from "../../driver-page";

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
        <NavbarBrand>Customers</NavbarBrand>
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
          <Link
            className="btn btn-secondary"
            style={{ backgroundColor: "#B7D1E6", color: "black" }}
            to="/createcustomer"
          >
            New Customer
            <AiOutlinePlus />
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
                    <th>#</th>
                    <th>Name</th>
                    <th>ddress</th>
                    <th>MC</th>
                    <th>Phone</th>
                    <th>Email</th>
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
            </TabPane>
          </TabPage>
        </div>
      </div>
    </>
  );
};

export default Customer;
