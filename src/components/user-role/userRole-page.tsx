import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Container,
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
  Nav,
  Navbar,
  NavbarBrand,
} from "reactstrap";
import { Header, SideBar } from "../header";
import { BsSearch } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import Profile from "../pofile";

import { debounce, includes, isEmpty } from "lodash";
// import { IUserDetails } from "../context/User/user.types";

// import { BasicTable } from "../../services/Table/BasicTable";
import { tableCells, tableHeadCells } from "./userRole.constants";


import { InputAdornment, TextField } from "@mui/material";
import Notification  from "../../features/notification/Notification"
import { IUserRoleFormState, initialUserRoleFormState } from "./userRole.types";
import { IUserRoleDetails } from "../context/UserRole/userRole.types";
import { useUserRoleContext } from "../context/UserRole/userRole.reducer";
import NewUserRoleModal from "./newUserRolemodal";
import { BasicTable } from "../../features/table/BasicTable";


const UserRolePage = () => {
  const {
    getUserRoleDetails,
    userRoleDetails,
    getIndividualUserRoleDetails,
    slectedUserRole,
    saveUserRole,
    deleteUserRole,
    clearSuccessAndFailure,
    saveUserRoleSuccess,
    saveUserRoleFailed,
   is_error,
    userRoleLoading,
      
  } = useUserRoleContext();
 
  const inputRef = useRef<HTMLInputElement>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<IUserRoleDetails[] | []>([]);
  const [noUserRole, setNoUserRole] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState(true);
  const [userRoleNewDetails, setNewUserRoleDetails] =
    useState<IUserRoleFormState>(initialUserRoleFormState);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUserRoles, setSelectedUserRoles] = useState<IUserRoleDetails[] | []>([]);

  const handleInputChange =
    (prop: keyof IUserRoleFormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewUserRoleDetails({ ...userRoleNewDetails, [prop]: event.target.value });
    };

  useEffect(() => {
    if (slectedUserRole) {
      setNewUserRoleDetails({
        ...userRoleDetails,
        role_id: slectedUserRole.role_id,
        role_name: slectedUserRole.role_name,
        company_id : slectedUserRole.company_id,
        description: slectedUserRole.description,
        active : slectedUserRole.active
        
      });
    }
  }, [slectedUserRole]);
  console.log("selectedUser", slectedUserRole);

  const handleSearch = debounce((searchValue: string) => {
    const searchResults =
      userRoleDetails &&
      userRoleDetails.filter((user) => {
        if (
          includes(
            user.role_name.toLowerCase(),
            searchValue.toLowerCase()
          )
        ) {
          return user;
        }
      });
    searchResults && setFilteredData(searchResults);
  }, 500);

  const handleNewUserRole = () => {
    setModalOpen(true);
    setNewUserRoleDetails(initialUserRoleFormState );
    setTitle(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    getUserRoleDetails().then((data) => { 
      data && setFilteredData(data);
    });
  };

  const handleEditRole = (user: IUserRoleDetails) => {
    getIndividualUserRoleDetails(user.role_id);
    setModalOpen(true);
    setTitle(false);
  };

  useEffect(() => {
    if (userRoleLoading && userRoleDetails) {
      setFilteredData(userRoleDetails);
      setNoUserRole(isEmpty(userRoleDetails));
    }
  }, [userRoleLoading, userRoleDetails]);

  useEffect(() => {
    if (isEmpty(filteredData)) {
      setNoUserRole(true);
    } else {
      setNoUserRole(false);
    }
  }, [filteredData]);
  useEffect(() => {
    if (!userRoleLoading) {
      setDeleteModalOpen(false);
      setSelectedUserRoles([]);
    }
  }, [userRoleLoading]);

  const handleCloseAlert = () => {
    clearSuccessAndFailure();
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedUserRoles([]);
    setDeleteModalOpen(false);
  };

  const handleDeleteUserRoles = () => {
    selectedUserRoles && deleteUserRole(selectedUserRoles);
   
    getUserRoleDetails ().then((data) => {
      data && setFilteredData(data);
    });
    setDeleteModalOpen(false)
    console.log("clicked")
  };
 
  

  const handleCheckBox = ()=>{
    setNewUserRoleDetails({...userRoleNewDetails, active: !userRoleNewDetails.active});
  }

  useEffect(() => {
    getUserRoleDetails()
  }, []);

  const handleSaveUserRole = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    await saveUserRole(userRoleNewDetails);
    getUserRoleDetails()
    setModalOpen(false);
  };

  return (
    <>
      <Navbar color="light" className="py-0">
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        />
        <NavbarBrand className="fw-bold px-4">User Role</NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-3">
          <div className="d-flex justify-content-end ms-auto align-items-center column-gap-2">
            {/* <InputGroup className="shadow-sm border-secondary">
              <InputGroupText className="bg-white">
                <BsSearch size={16} />
              </InputGroupText>
              <Input
                placeholder="Search"
                className="border-start-0 border-end-0 search"
                inputRef={inputRef}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </InputGroup> */}
            <TextField
            id="search-bar"
            inputRef={inputRef}
            variant="outlined"
            placeholder="Search Users"
            onChange={e => handleSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BsSearch />
                </InputAdornment>
              ),
            }}
          />

          </div>
          <NewUserRoleModal
            modalOpen={modalOpen}
            closeModal={handleCloseModal}
            userRoleNewDetails={userRoleNewDetails}
            setUserRoleDetails={setNewUserRoleDetails}
            handleInputChange={handleInputChange}
            slectedUserRole={slectedUserRole}
            handleSaveUserRole={handleSaveUserRole}
            title={title}
            handleCheckBox={handleCheckBox}
          />
          <div className="user-info-btn-wrapper">
            {!isEmpty(selectedUserRoles) && (
              <div className="user-info-btn">
                <Button
                  color="primary"
                  className="px-4  shadow save-button "
                  onClick={() => setDeleteModalOpen(true)}
                >
                
                  Delete
                </Button>
              </div>
            )}
          </div>
          <Button color="primary" onClick={handleNewUserRole}>
            New User Role
            <AiOutlinePlus />
          </Button>
          <Profile />
        </div>
      </Navbar>
      <div className="content d-flex">
        <SideBar isSidebarOpen={!isSidebarOpen} />
        <div className="aria-content">
          <BasicTable
            emptyState={noUserRole}
            canSelectRows={true}
            selectedTableRows={selectedUserRoles}
            setSelectionTableRows={setSelectedUserRoles}
            tableData={filteredData}
            tableHeadCells={tableHeadCells}
            loading={userRoleLoading}
            tableCells={tableCells}
            canEditRow={true}
            editRow={handleEditRole}
          />
        </div>
      </div>
      <div className="notification-container">
        <div>
         
          {saveUserRoleSuccess && 
            (<Notification type="success" 
            message="Role Registered successfully" 
            closeAlert={handleCloseAlert} 
            />)
          }
          {saveUserRoleFailed && (
            <Notification
              type="error"
              message="The Role Name is required."
              closeAlert={handleCloseAlert}
            />
          )}
          {is_error && saveUserRoleSuccess && (
            <Notification
              type="error"
              message="The Role is already exist."
              closeAlert={handleCloseAlert}
            />
          )}
        </div>
      </div>
      <Modal isOpen={deleteModalOpen} onClose={closeDeleteModal}>
      <ModalHeader>
          <h6 className="mb-0 fw-bold"> Delete </h6>
        </ModalHeader>
        <ModalBody>
          <Container>
            {!isEmpty(selectedUserRoles) && (
              <div className=" my-3 " >
                {selectedUserRoles.length > 1
                  ? `Are you sure you want to delete ${selectedUserRoles.length} Roles?`
                  : `Are you sure you want to delete role  " ${selectedUserRoles[0].role_name}"?`}
              </div>
            )}
            <FormGroup className=" d-flex justify-content-end mt-3 column-gap-2 ">
              <Button
                color="primary"
                className="px-4 mr-3 shadow save-button  "
                onClick={() => closeDeleteModal()}
              >
                Cancel
              </Button>
              <Button
                color="primary"
                className="px-4  shadow save-button "
                onClick={() => handleDeleteUserRoles()}
              >
                Delete
              </Button>
              </FormGroup>
          </Container>
        </ModalBody>
          
  
      </Modal>
    </>
  );
};

export default UserRolePage;
