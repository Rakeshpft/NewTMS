import React, { useState, useRef , useEffect } from "react";
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
import InviteUserModal from "./inviteusermodal";
import { debounce, includes, isEmpty } from "lodash";
import { IUserDetails } from "../context/User/user.types";
import { useUserContext } from "../context/User/user.reducer";
import { CiSearch } from "react-icons/ci";
import { BasicTable } from "../../services/Table/BasicTable";
import { tableCells, tableHeadCells } from "./user.constants";

const UserPage = () => {
  const {getUserDetails , userDetails  ,getIdividualUserDetails, userLoading} = useUserContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<IUserDetails[] | any>([]);
  const [noUser, setNoUser] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  

 

  const handleSearchFilterChange = debounce((searchValue: string) => {
    const searchResults =
      userDetails &&
      userDetails.filter((user) => {
        if (
          includes(
            user.value[0].first_name.toLowerCase(),
            searchValue.toLowerCase()
          )
        ) {
          return user;
        }
      });
    searchResults && setFilteredData(searchResults);
  }, 500);

  const handleCloseModal = () => {
    setModalOpen(false);
  }

  const handleEditContact = (user: IUserDetails) => {   
    getIdividualUserDetails(user.staff_id);
    setModalOpen(true);
  };


  useEffect(() => {
    if (!userLoading && userDetails) {
      setFilteredData(userDetails);
      setNoUser(isEmpty(userDetails));
    }
  }, [userLoading, userDetails]);

  useEffect(() => {
    if (isEmpty(filteredData)) {
      setNoUser(true);
    } else {
      setNoUser(false);
    }
  }, [filteredData]);

  useEffect(() => {
    getUserDetails().then(( data) => {
      console.log("data",data)
     data && setFilteredData(data)
    });
    console.log("user details",userDetails)
    console.log("loading",)
  }, []);

  return (
    <>
      <Navbar color="light" className="py-0">
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        />
        <NavbarBrand className="fw-bold px-4">Users</NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex justify-content-end ms-auto align-items-center column-gap-2">
            <InputGroup className="shadow-sm border-secondary">
              <InputGroupText className="bg-white">
                <BsSearch size={16} />
              </InputGroupText>
              <div className="user-info-refresh">{!noUser && <CiSearch onClick={() => handleSearchFilterChange("")} />}</div>

              <Input
                placeholder="Search"
                className="border-start-0 border-end-0 search"
                inputRef={inputRef}
                onChange={(e) => handleSearchFilterChange(e.target.value)} 
              />
            </InputGroup>
          </div>
          <InviteUserModal
            modalOpen={modalOpen}
            closeModal={handleCloseModal}
          />
          <Button color="primary" onClick={() => setModalOpen(true)}>
            Invite User
            <AiOutlinePlus />
          </Button>
          <Profile />
        </div>
      </Navbar>
      <div className="content d-flex">
        <SideBar isSidebarOpen={!isSidebarOpen} />
        <div className="aria-content">

        <BasicTable 
        emptyState={noUser}
        tableData={filteredData} 
        tableHeadCells={tableHeadCells}
        loading={userLoading}
        tableCells={tableCells}
        canEditRow={true}
        editRow={handleEditContact}
        

        />
        </div>
      </div>
    </>
  );
};

export default UserPage;

