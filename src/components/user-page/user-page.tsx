import React, { useState } from "react";
import {
  Button,
  Input,
  InputGroup,
  InputGroupText,
  Nav,
  Navbar,
  NavbarBrand,
} from "reactstrap";
import { Header, SideBar } from "../header";
import { BsSearch } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import Profile from "../pofile";
// import { PiGearDuotone } from "react-icons/pi";
import GenericTable from "../table/custom-table";
import InviteUserModal from "./inviteusermodal";

const columns = [
  "#",
  "Name",
  "Email",
  "Phone",
  "Status",
  
];

const Tabledata = [
  {
    '#': 1001,
    Name: "07/14/23",
    Email: "abc@mGmail.com",
    Phone: "002063564 ONTARIO",
    Status: "Active",
    
  },
  {
    '#': 1002,
    Name: "07/14/23",
    Email: "abc@mGmail.com",
    Phone: "002063564 ONTARIO",
    Status: "Active",
   
  },
  {
    '#': 1003,
    Name: "07/14/23",
    Email: "abc@mGmail.com",
    Phone: "002063564 ONTARIO",
    Status: "InActive",
 
  },
];
const UserPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(Tabledata);
  const [modalState, setModalState] = useState(false);
  // const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("");

  // const toggle = () => setDropdownOpen((prevState) => !prevState);

  const handleEditbroker = ( ) => {
    setModalState(true);
    //  setInitialRow(row);
    

  };
  const handleSearchFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filteredData = Tabledata.filter((item) => {
      return columns.some((column) =>
        String(item[column as keyof object])
          .toLowerCase()
          .includes(value)
      );
    });
    setFilter(value);
    setFilteredData(filteredData);
  };

  // const searchToggle = (): void => {
  //   setIsOpen((isOpen) => !isOpen);
  // };

  return (
    <>
      <Navbar color="light" className="py-0">
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        />
        <NavbarBrand className="fw-bold px-4">Users</NavbarBrand>
        <Nav className="me-auto" navbar>
          <div className="d-flex gap-1 align-items-center">
            {/* <div className="x-small fw-bold">Period</div> */}
            {/* <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
              <DropdownToggle
                variant="secondary"
                size="sm"
                className="border-0 p-0 px-2 d-flex column-gap-2 align-items-center"
              >
                All ▼
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem>This Year</DropdownItem>
                <DropdownItem>This Month</DropdownItem>
                <DropdownItem>This Week</DropdownItem>
              </DropdownMenu>
            </Dropdown> */}
          </div>
        </Nav>
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex justify-content-end ms-auto align-items-center column-gap-2">
            <InputGroup className="shadow-sm border-secondary">
              <InputGroupText className="bg-white">
                <BsSearch size={16} />
              </InputGroupText>
              <Input
                placeholder="Search"
                className="border-start-0 border-end-0 search"
                value={filter}
                onChange={handleSearchFilterChange}
              />
              {/* <InputGroupText className="bg-white">
                <Button
                  color="link"
                  size="sm"
                  className="p-0"
                  onClick={() => searchToggle()}
                >
                  <BsSliders2 size={16} />
                </Button>
              </InputGroupText> */}
            </InputGroup>
          </div>
          <InviteUserModal
            isOpen={modalState}
            toggle={() => setModalState(false)}
          />
          <Button color="primary" onClick={() => setModalState(true)}>
            Invite User
            <AiOutlinePlus />
          </Button>
          <Profile />
        </div>
      </Navbar>
      <div className="content d-flex">
        <SideBar isSidebarOpen={!isSidebarOpen}  />
        <div className="aria-content">
        <GenericTable
          tableData={filteredData}
          tableHeaders={columns}
          defaultSortColumn="Name"
          canEditRow={true}
            editRow={handleEditbroker}
          
        />
        </div>
        
      </div>
    </>
  );
};

export default UserPage;
