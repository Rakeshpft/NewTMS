import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { Header, SideBar } from "../../shared";
import Profile from "../../pofile";
import { AiOutlinePlus } from "react-icons/ai";
import { routes } from "../../routes/routes";
import { BsSearch } from "react-icons/bs";
import { GenericTable } from "../../table";

const tableHeaders = [
  "Name",
  "Type",
  "Description",
  "Active",
  "Notes",
  "Actions",
];
const tableData = [
  {
    Name: "Max payne [drv]",
    Type: "driver",
    Description: "Max payne [drv]",
    Active: "true",
    Notes: "Max payne [drv]",
    Actions: "abcd",
  },
  {
    Name: "Max Raja",
    Type: "driver",
    Description: "Max payne [drv]",
    Active: "true",
    Notes: "Max payne [drv]",
    Actions: "abc",
  },
];

const ChartofAccounts = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(tableData);
  const [filter, setFilter] = useState("");
  
  const handleSearchFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filteredData = tableData.filter((item) => {
      return tableHeaders.some((column) =>
        String(item[column as keyof object])
          .toLowerCase()
          .includes(value)
      );
    });
    setFilter(value);
    setFilteredData(filteredData);
  };

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
            </InputGroup>
          </div>
          <Link
            className="btn btn-sm btn-outline-primary"
            to={routes.createNewChartOfAccounts}
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
          <GenericTable
            tableData={filteredData}
            tableHeaders={tableHeaders}
            defaultSortColumn="Name"
          />
        </div>
      </div>
    </>
  );
};

export default ChartofAccounts;
