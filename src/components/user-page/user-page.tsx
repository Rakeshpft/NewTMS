import React, { useState, useRef, useEffect } from "react";
import {
  Button,
  Container,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Modal,
  ModalBody,
  ModalHeader,
  } from "reactstrap";

import { BsSearch } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";

import InviteUserModal from "./inviteusermodal";
import { debounce, includes, isEmpty } from "lodash";
import { IUserDetails } from "../../services/tms-objects/user.types";
import { useUserContext } from "../../services/reducer/user.reducer";
import { BasicTable } from "../../features/table/BasicTable";
import { tableCells, tableHeadCells } from "./user.constants";
import { IUserFormState, initialUserFormState } from "./user.types";
// import { Modal } from "@mui/material";
import CommonLayOut from "../../layout";
import { toastify } from "../../features/notification/toastify";

const UserPage = () => {
  const {
    getUserDetails,
    userDetails,
    getIdividualUserDetails,
    selectedUser,
    saveUser,
    deleteUserContact,
    userLoading,
    userRole,
    getUserRole,
  } = useUserContext();



  const inputRef = useRef<HTMLInputElement>(null);
  
 

  const [filteredData, setFilteredData] = useState<IUserDetails[] | []>([]);
  const [noUser, setNoUser] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState(true);
 
  const [userNewDetails, setNewUserDetails] = useState<IUserFormState>(initialUserFormState);
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
    if (selectedUser) {
      setNewUserDetails({
        ...userDetails,
        first_name: selectedUser.first_name,
        last_name: selectedUser.last_name,
        full_name: selectedUser.full_name,
        email: selectedUser.email,
        contact_number: selectedUser.contact_number,
        role_id: selectedUser.role_id,
        staff_id: selectedUser.staff_id,
        active: selectedUser.active,
      });
    }
  }, [selectedUser]);

  const handleSearch = debounce((searchValue: string) => {
    const searchResults =
      userDetails &&
      userDetails.filter((user) => {
        if (includes(user.full_name.toLowerCase(), searchValue.toLowerCase())) {
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

  
  const handleDeleteUsers = () => {
    selectedUsers && deleteUserContact(selectedUsers);
    getUserDetails();
    setDeleteModalOpen(false);
    setSelectedUsers([]);
  };
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedUsers([]);
  };
 
  useEffect(() => {
    getUserDetails();
  }, []);

  const handleSaveUser = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // await  saveUser(userNewDetails).then((data) => {
    //   data?.success && setModalOpen(false);
    // });
    let response = await saveUser(userNewDetails);
    response && toastify({ message: response.message, type: (response.success ? "success" : "error") });
    setModalOpen(false)
    getUserDetails();

    setNewUserDetails(initialUserFormState);
  };

  useEffect(() => {
    getUserRole();
  }, []);

  return (
    <>
           <CommonLayOut>        
      <div className="d-flex justify-content-between">
        <div className="page-title">Users</div>
        <div className="d-flex align-items-center gap-1">
          <div className="d-flex justify-content-end ms-auto align-items-center column-gap-2">
            <InputGroup className="shadow-sm border-secondary">
             
              <InputGroupText className="bg-white">
                <BsSearch size={16} />
                </InputGroupText>
              <Input placeholder="Search"
               className="border-start-0 search" 
               inputRef={inputRef} onChange=
               {(e: any) => handleSearch(e.target.value)} />
            </InputGroup>
           
          </div>
          <InviteUserModal
            modalOpen={modalOpen}
            closeModal={handleCloseModal}
            userNewDetails={userNewDetails}
            setUserDetails={setNewUserDetails}
            handleInputChange={handleInputChange}
            selectedUser={selectedUser}
            handleSaveUser={handleSaveUser}
            userRole={userRole}
            title={title}
            handleCheckBox={handleCheckBox}
          />
          <div className="user-info-btn-wrapper">
            {!isEmpty(selectedUsers) && (
              <div className="user-info-btn">
                
                <Button color="primary" onClick={() => setDeleteModalOpen(true)}>Delete</Button>
              </div>
            )}
          </div>
          <Button color="primary" onClick={handleInviteUser}><AiOutlinePlus /> Invite User</Button>
        </div>
     
        </div>
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
       
      </CommonLayOut>

      

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
