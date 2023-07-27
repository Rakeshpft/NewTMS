import React, { useState } from "react";
import { Header, SideBar } from "../header";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  Table,
} from "reactstrap";
import SearchPage from "../search-page";
import Profile from "../pofile";
import { Link } from "react-router-dom";

const LoadPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <>
      <Navbar style={{ border: "1px solid #1B56AE" }} color="light" className="py-0">
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        />
        <NavbarBrand>Loads</NavbarBrand>
        <Nav className="me-auto" navbar>
          <div className="">
            <span className="x-small fw-bold">Period</span>
            <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
              <DropdownToggle
                variant="secondary"
                size="sm"
                className="border-0 p-0 px-2 d-flex column-gap-2 align-items-center"
              >
                All
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>This Year</DropdownItem>
                <DropdownItem>This Month</DropdownItem>
                <DropdownItem>This Week</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </Nav>
        <div className="d-flex align-items-center gap-3">
          <SearchPage />
          <Link className="btn btn-secondary " to="/createload">
            New Load
          </Link>
          <Profile />
        </div>
      </Navbar>
      <div className="d-flex">
        <SideBar isSidebarOpen={!isSidebarOpen} />
        <hr></hr>
        <Table borderless>
          <thead>
            <tr>
              <th>Load</th>
              <th>Date</th>
              <th>Driver</th>
              <th>Broker</th>
              <th>PO</th>
              <th>Pickup</th>
              <th>Delivery</th>
              <th>Rate</th>
              <th>Completed</th>
              <th>Status</th>
              <th>Billing</th>
              <th>Notes</th>
              <th>Attachments</th>
              <th>Actions</th>
              <th>*</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>12/07/23</td>
              <td>Otto</td>
              <td>@abc</td>
              <td>@jhon</td>
              <td>@kat</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};

export default LoadPage;
