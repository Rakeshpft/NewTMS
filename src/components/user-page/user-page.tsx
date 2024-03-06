import React, { useState, useRef, useEffect } from "react";
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
import { BasicTable } from "../../services/Table/BasicTable";
import { tableCells, tableHeadCells } from "./user.constants";
import { IUserFormState, initialUserFormState } from "./user.types";
import { Modal } from "@mui/material";
import  Notification  from "../../services/notification/Notification";

const UserPage = () => {
  const {
    getUserDetails,
    userDetails,
    getIdividualUserDetails,
    slectedUser,
    saveUser,
    deleteUserContact,
    clearSuccessAndFailure,
    saveUserSuccess,
    saveUserFailed,
    is_error,
    userLoading,  
  } = useUserContext();
 
  const inputRef = useRef<HTMLInputElement>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<IUserDetails[] | any>([]);
  const [noUser, setNoUser] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState(true);
  const [userNewDetails, setNewUserDetails] =
    useState<IUserFormState>(initialUserFormState);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<IUserDetails[] | []>([]);

  const handleInputChange =
    (prop: keyof IUserFormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewUserDetails({ ...userNewDetails, [prop]: event.target.value });
    };

  useEffect(() => {
    if (slectedUser) {
      setNewUserDetails({
        ...userDetails,
        
        first_name: slectedUser.first_name,
        last_name: slectedUser.last_name,
        full_name: slectedUser.full_name,
        email: slectedUser.email,
        contact_number: slectedUser.contact_number,
        role_id: slectedUser.role_id,
        staff_id: slectedUser.staff_id,
      });
    }
  }, [slectedUser]);
  console.log("selectedUser", slectedUser);

  const handleSearchFilterChange = debounce((searchValue: string) => {
    const searchResults =
      userDetails &&
      userDetails.filter((user) => {
        if (
          includes(
            user.value[0].full_name.toLowerCase(),
            searchValue.toLowerCase()
          )
        ) {
          return user;
        }
      });
    searchResults && setFilteredData(searchResults);
  }, 500);

  const handleInviteUser = () => {
    setModalOpen(true);
    setNewUserDetails(initialUserFormState);
    setTitle(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    getUserDetails().then((data) => {
      console.log("data", data);
      data && setFilteredData(data);
    });
  };

  const handleEditContact = (user: IUserDetails) => {
    getIdividualUserDetails(user.staff_id);
    setModalOpen(true);
    setTitle(false);
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

  const handleCloseAlert = () => {
    clearSuccessAndFailure();
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedUsers([]);
  };

  const handleDeleteUsers = () => {
    selectedUsers && deleteUserContact(selectedUsers);
  };

  useEffect(() => {
    getUserDetails().then((data) => {
      console.log("data", data);
      data && setFilteredData(data);
    });
    console.log("user details", userDetails);
    console.log("loading");
  }, []);

  const handleSaveUser = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    await saveUser(userNewDetails).then((data) => {         
      data?.success &&  setModalOpen(data.success);
    });
    getUserDetails().then((data) => {
      data && setFilteredData(data);      
    }); 
  };

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
            userNewDetails={userNewDetails}
            setUserDetails={setNewUserDetails}
            handleInputChange={handleInputChange}
            slectedUser={slectedUser}
            handleSaveUser={handleSaveUser}
            title={title}
          />
          <div className="user-info-btn-wrapper">
            {!isEmpty(selectedUsers) && (
              <div className="user-info-btn">
                <Button
                  variant="outlined"
                  className="user-info-white-btn"
                  onClick={() => setDeleteModalOpen(true)}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
          <Button color="primary" onClick={handleInviteUser}>
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
            canSelectRows={true}
            selectedTableRows={selectedUsers}
            setSelectionTableRows={setSelectedUsers}
            tableData={filteredData}
            tableHeadCells={tableHeadCells}
            loading={userLoading}
            tableCells={tableCells}
            canEditRow={true}
            editRow={handleEditContact}
          />
        </div>
      </div>
 <div className="notification-container">
 
          <div>
            {saveUserSuccess && <Notification type="success" message="Staff registered successfully" closeAlert={handleCloseAlert} />}

            {saveUserFailed && (
              <Notification type="error" message="The email field is required." closeAlert={handleCloseAlert} />
            )}
            {is_error &&  saveUserSuccess && (
              <Notification type="error" message="The email  is already in registered." closeAlert={handleCloseAlert} />
            )}

            {/* {deleteContactSuccess && (
              <Notification type="info" message="Contact Deleted" closeAlert={handleCloseAlert} />
            )}
            {saveContactFailure && (
              <Notification type="info" message="Failed to Save Contact" closeAlert={handleCloseAlert} />
            )}
            {deleteContactFailure && (
              <Notification type="error" message="Failed to Delete Contact" closeAlert={handleCloseAlert} />
            )} */}
          </div>
     
       
      </div>
      <Modal open={deleteModalOpen} onClose={closeDeleteModal}>
        <div className="contact-modal">
          <div className="modal-title"> Delete</div>
          <div className="form-container">
            {!isEmpty(selectedUsers) && (
              <div className="modal-text">
                {selectedUsers.length > 1
                  ? `Are you sure you want to delete ${selectedUsers.length} contacts?`
                  : `Are you sure you want to delete contact "${selectedUsers[0].first_name} ${selectedUsers[0].last_name}"?`}
              </div>
            )}
            <div className="modal-buttons">
              <Button
                className="modal-cancel"
                onClick={() => closeDeleteModal()}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                className="modal-confirm"
                loading={userLoading}
                onClick={() => handleDeleteUsers()}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UserPage;
