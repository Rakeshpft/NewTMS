import React, { useState } from "react";
import {
  Input,
  InputGroup,
  InputGroupText,
  Nav,
  Navbar,
  NavbarBrand,
} from "reactstrap";
import { Header, SideBar } from "../shared";
import { BsSearch } from "react-icons/bs";
import Profile from "../pofile";
import GenericTable from "../table/custom-table";
import ViewBrokerModal from "./viewbrokermodal";


const columns = ["Name", "Address", "Phone", "MC", "DOT"];

const Tabledata = [
  {
    Name: "AutoTrans LLC",
    Address: "PO BOX 116 Ontario , VA 2212",
    Phone: "1234567",
    MC: "MC676764",
    DOT: "2e45r8889",
  },
  {
    Name: "Diamond Logistic Inc.",
    Address: "LO BOX 332 Cape Town, VA 2212",
    Phone: "002063564 ",
    MC: "MC567483",
    DOT: "3r456yre",
  }
];
const DataLibrary = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filteredData, setFilteredData] = useState(Tabledata);
  const [modalState, setModalState] = useState(false);
  const [filter, setFilter] = useState("");
   const [ initialRow, setInitialRow ] = useState({ 
    Name: "",
    Address: '',
    Phone: '',
    MC: '',
    DOT: ''
  });

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

  const handleEditbroker = (row: any  ) => {
    setModalState(true);
     setInitialRow(row);
    

  };
 

  return (
    <>
      <Navbar color="light" className="py-0">
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        />
        <NavbarBrand className="fw-bold px-4">Brokers</NavbarBrand>
        <Nav className="me-auto" navbar>
          <div className="d-flex gap-1 align-items-center"></div>
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

          <Profile />
        </div>
      </Navbar>
      <div className="content d-flex">
        <SideBar isSidebarOpen={!isSidebarOpen} activePageId={1} />
        <ViewBrokerModal
          isOpen={modalState}
          toggle={() => setModalState(false)}
          data={initialRow}

        />

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

export default DataLibrary;
