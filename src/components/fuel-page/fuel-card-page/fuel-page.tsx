import React, { useState } from "react";
import { AiOutlineFileExcel, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Input,
  InputGroup,
  InputGroupText,
} from "reactstrap";
import { Header, SideBar } from "../../shared";
import Profile from "../../pofile";
import { PiGearDuotone } from "react-icons/pi";
import { routes } from "../../routes/routes";
import { BsSearch } from "react-icons/bs";
import { GenericTable } from "../../table";

const tableHeaders = [
  "#",
  "Card Number",
  "Card Status",
  "Expiration Date",
  "Assigned To",
  "Assigned On",
  "Truck",
  "Notes",
  "Actions",
  <PiGearDuotone />,
];
const tableRowData = [
  {
    "#": "1001",
    "Card Number": "1111-2222-3333-4444",
    "Card Status": "Active",
    "Expiration Date": "01/01/2021",
    "Assigned To": "Max Payne",
    "Assigned On": "01/01/2021",
    Truck: "Truck 1",
    Notes: "Notes",
    Actions: "icon",
  },
  {
    "#": "1002",
    "Card Number": "1111-2222-3333-4445",
    "Card Status": "InActive",
    "Expiration Date": "01/01/2021",
    "Assigned To": "Max Payne",
    "Assigned On": "01/01/2021",
    Truck: "Truck 1",
    Notes: "Notes",
    Actions: "icon",
  },
];

const FuelPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(tableRowData);
  const [filter, setFilter] = useState("");

  const handleSearchFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    const filteredData = tableRowData.filter((item) => {
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
        <NavbarBrand className="fw-bold px-4">Fuel Cards</NavbarBrand>
        <Nav className="me-auto" navbar>
          <div className="d-flex gap-2 align-items-center">
            <NavItem className="small h6 mb-0">Export</NavItem>
            <Link to={"#"}>
              <AiOutlineFileExcel className="text-success fs-4" />
            </Link>
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
            </InputGroup>
          </div>
          <Link
            className="btn btn-sm btn-outline-primary"
            to={routes.createNewFuelPage}
          >
            <AiOutlinePlus />
            New Fuel Card
          </Link>
          <Profile />
        </div>
      </Navbar>
      <div className="content d-flex">
        <SideBar isSidebarOpen={!isSidebarOpen} activePageId={5} />
        <div className="aria-content">
          <GenericTable
            tableHeaders={tableHeaders}
            tableData={filteredData}
            defaultSortColumn="Card Status"
          />
        </div>
      </div>
    </>
  );
};

export default FuelPage;
