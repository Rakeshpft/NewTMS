import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Container,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  // Input,
  // InputGroup,
  // InputGroupText,
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
import InviteUserModal from "./inviteusermodal";
import { debounce, includes, isEmpty } from "lodash";
import { IUserDetails } from "../context/User/user.types";
import { useUserContext } from "../context/User/user.reducer";
import { BasicTable } from "../../features/table/BasicTable";
import { tableCells, tableHeadCells } from "./user.constants";
import { IUserFormState, initialUserFormState } from "./user.types";
// import { Modal } from "@mui/material";
import Notification from "../../features/notification/Notification";
// import { InputAdornment, TextField } from "@mui/material";

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
    userRole,
    getUserRole,
  } = useUserContext();

  const inputRef = useRef<HTMLInputElement>(null);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filteredData, setFilteredData] = useState<IUserDetails[] | []>([]);
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

  const handleCheckBox = () => {
    setNewUserDetails({ ...userNewDetails, active: !userNewDetails.active });
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
        active: slectedUser.active,
      });
    }
  }, [slectedUser]);

  const handleSearch = debounce((searchValue: string) => {
    const searchResults =
      userDetails &&
      userDetails.filter((user) => {
        if (includes(user.full_name.toLowerCase(), searchValue.toLowerCase())) {
          return user;
        }
      });
    searchResults && setFilteredData(searchResults);
    console.log("search result", searchResults);
  }, 500);

  const handleInviteUser = () => {
    setModalOpen(true);
    setNewUserDetails(initialUserFormState);
    setTitle(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    getUserDetails();
  };

  const handleEditContact = (user: IUserDetails) => {
    getIdividualUserDetails(user.staff_id);
    setModalOpen(true);
    setTitle(false);
  };

  useEffect(() => {
    if (userLoading && userDetails) {
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
    if (!userLoading) {
      setDeleteModalOpen(false);
      setSelectedUsers([]);
    }
  }, [userLoading]);

  const handleCloseAlert = () => {
    clearSuccessAndFailure();
  };

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedUsers([]);
    setDeleteModalOpen(false);
  };

  const handleDeleteUsers = () => {
    selectedUsers && deleteUserContact(selectedUsers);
    getUserDetails();
    setDeleteModalOpen(false);
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleSaveUser = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    await saveUser(userNewDetails).then((data) => {
      data?.success && setModalOpen(false);
    });
    getUserDetails();
    setNewUserDetails(initialUserFormState);
  };

  useEffect(() => {
    getUserRole();
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
              <Input
                placeholder="Search"
                className="border-start-0 border-end-0 search"
                inputRef={inputRef}
                onChange={(e : any) => handleSearch(e.target.value)}
              />

            </InputGroup>
            {/* <TextField
              id="search-bar"
              inputRef={inputRef}
              variant="outlined"
              placeholder="Search Users"
              onChange={(e) => handleSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <BsSearch />
                  </InputAdornment>
                ),
              }}
            /> */}
          </div>
          <InviteUserModal
            modalOpen={modalOpen}
            closeModal={handleCloseModal}
            userNewDetails={userNewDetails}
            setUserDetails={setNewUserDetails}
            handleInputChange={handleInputChange}
            slectedUser={slectedUser}
            handleSaveUser={handleSaveUser}
            userRole={userRole}
            title={title}
            handleCheckBox={handleCheckBox}
          />
          <div className="user-info-btn-wrapper">
            {!isEmpty(selectedUsers) && (
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
          {saveUserSuccess && (
            <Notification
              type="success"
              message="Staff registered successfully"
              closeAlert={handleCloseAlert}
            />
          )}

          {saveUserFailed && (
            <Notification
              type="error"
              message="The email field is required."
              closeAlert={handleCloseAlert}
            />
          )}
          {is_error && saveUserSuccess && (
            <Notification
              type="error"
              message="The email  is already in registered."
              closeAlert={handleCloseAlert}
            />
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

      <Modal isOpen={deleteModalOpen} onClose={closeDeleteModal}>
        <ModalHeader>
          <h6 className="mb-0 fw-bold"> Delete </h6>
        </ModalHeader>
        <ModalBody>
          <Container>
            {!isEmpty(selectedUsers) && (
              <div className=" my-3 ">
                {selectedUsers.length > 1
                  ? `Are you sure you want to delete ${selectedUsers.length} contacts?`
                  : `Are you sure you want to delete contact "${selectedUsers[0].first_name} ${selectedUsers[0].last_name}"?`}
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
                onClick={() => handleDeleteUsers()}
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

export default UserPage;
