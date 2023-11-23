import React, { useState } from "react";
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
import { Header, SideBar } from "../../header";
import Profile from "../../pofile";
import { AiOutlineFileExcel, AiOutlinePlus } from "react-icons/ai";
import { MdOutgoingMail } from "react-icons/md";
import { PiFilePdfDuotone } from "react-icons/pi";
import { routes } from "../../routes/routes";
import { BsSearch } from "react-icons/bs";
import { GenericTable } from "../../table";

const tableHeaders = [
  "Id",
  "Date",
  "Partner",
  "Amount",
  "status",
  "Notes",
  "Actions",
];
const tableData = [
  {
    Id: "1001",
    Date: "1/1/2021",
    Partner: "Max",
    Amount: "100",
    status: "true",
    Notes: "Max",
    Actions: "abcd",
  },
  {
    Id: "1002",
    Date: "1/1/2021",
    Partner: "Max",
    Amount: "100",
    status: "true",
    Notes: "Max",
    Actions: "abc",
  },
];

const FactoringReport = () => {
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
        <NavbarBrand className="fw-bold px-4">Factoring Reports</NavbarBrand>
        <Nav className="me-auto" navbar>
          <div className="d-flex gap-2 align-items-center">
            <NavItem className="small h6 mb-0">Export</NavItem>
            <div className="d-flex justify-content-between gap-2">
              <Link to={"#!"}>
                <PiFilePdfDuotone className="text-danger fs-4" />
              </Link>
              <Link to={"#"}>
                <AiOutlineFileExcel className="text-success fs-4" />
              </Link>
              <Link to={"#!"}>
                <MdOutgoingMail className="fs-4" />
              </Link>
            </div>
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
            to={routes.createNewFactoringReport}
          >
            <AiOutlinePlus />
            New Factoring Report
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
            defaultSortColumn="Partner"
          />
        </div>
      </div>
    </>
  );
};

export default FactoringReport;
