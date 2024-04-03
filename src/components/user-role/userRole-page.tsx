import React, { useState, useRef, useEffect } from "react";
import {
  Label,
  Button,
  Container,
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
  InputGroup,
  InputGroupText,
  Input
} from "reactstrap";
import { BsSearch } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { debounce, includes, isEmpty } from "lodash";
import { IUserRoleFormState, initialUserRoleFormState } from "./userRole.types";
import { IUserRoleDetails } from "../../services/tms-objects/userRole.types";
import { useUserRoleContext } from "../../services/reducer/userRole.reducer";
import NewUserRoleModal from "./newUserRolemodal";
import CommonLayOut from "../../layout";
import { HiOutlinePencilAlt, HiCheckCircle } from "react-icons/hi";
import { CustomTable } from "../../features/data-table/CustomTable";
import { Checkbox } from "@mui/material";
import { MdCancel } from "react-icons/md";
import { toastify } from "../../features/notification/toastify";

const UserRolePage = () => {
  const {
    getUserRoleDetails,
    userRoleDetails,
    getIndividualUserRoleDetails,
    selectedUserRole,
    saveUserRole,
    deleteUserRole,
    userRoleLoading,

  } = useUserRoleContext();

  const inputRef = useRef<HTMLInputElement>(null);

  const [filteredData, setFilteredData] = useState<IUserRoleDetails[] | []>([]);
  //const [noUserRole, setNoUserRole] = useState(false);
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
    if (selectedUserRole) {
      setNewUserRoleDetails({
        ...userRoleDetails,
        role_id: selectedUserRole.role_id,
        role_name: selectedUserRole.role_name,
        company_id: selectedUserRole.company_id,
        description: selectedUserRole.description,
        active: selectedUserRole.active

      });
    }
  }, [selectedUserRole]);
  console.log("selectedUser", selectedUserRole);

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
    setNewUserRoleDetails(initialUserRoleFormState);
    setTitle(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
    getUserRoleDetails().then((data) => {
      data && setFilteredData(data);
    });
  };

  const handleEditRole = (role_id: number) => {
    getIndividualUserRoleDetails(role_id);
    setModalOpen(true);
    setTitle(false);
  };

  useEffect(() => {
    if (userRoleLoading && userRoleDetails) {
      setFilteredData(userRoleDetails);
      //setNoUserRole(isEmpty(userRoleDetails));
    }
  }, [userRoleLoading, userRoleDetails]);

  // useEffect(() => {
  //   if (isEmpty(filteredData)) {
  //     setNoUserRole(true);
  //   } else {
  //     setNoUserRole(false);
  //   }
  // }, [filteredData]);
  useEffect(() => {
    if (!userRoleLoading) {
      setDeleteModalOpen(false);
      setSelectedUserRoles([]);
    }
  }, [userRoleLoading]);

  

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedUserRoles([]);
    setDeleteModalOpen(false);
  };

  const handleDeleteUserRoles = () => {
    selectedUserRoles && deleteUserRole(selectedUserRoles);

    getUserRoleDetails().then((data) => {
      data && setFilteredData(data);
    });
    setDeleteModalOpen(false)
    console.log("clicked")
  };

  const handleCheckBox = () => {
    setNewUserRoleDetails({ ...userRoleNewDetails, active: !userRoleNewDetails.active });
  }

  useEffect(() => {
    getUserRoleDetails()
  }, []);

  const handleSaveUserRole = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    
   let response =  await saveUserRole(userRoleNewDetails);
    response && toastify({ message: response.message, type: (response.success ? "success" : "error") });

    getUserRoleDetails()
    setModalOpen(false);
  };
  const handleSelectRole = (event: React.ChangeEvent<HTMLInputElement>, row: any) => {
    const checked = event.target.checked;
    if (checked && selectedUserRoles) {
      setSelectedUserRoles && setSelectedUserRoles([...selectedUserRoles, row]);
    } else {
      setSelectedUserRoles &&
        selectedUserRoles &&
        setSelectedUserRoles(selectedUserRoles.filter(selectedRow => selectedRow !== row));
    }
  };
  
const columns: CustomTableColumn[] = [
  {
    id: 'select_role',
    name: '',    
    style: { width: '5%' },
    sortable: false,
    align:'center',
    selector: (row: IUserRoleDetails) => row.role_id,
    cell:(row: IUserRoleDetails) => (row.company_id==0 ? '' : <Checkbox id={`checkbox-${row.role_id}`} value={row.role_id} checked={includes(selectedUserRoles, row)} onChange={e => handleSelectRole(e, row)} />)    
  },
  {
    id: 'role_name',
    name: 'Role Name',
    style: { width: '30%' },
    sortable: true,
    selector: (row: IUserRoleDetails) => row.role_name,
    format:(row: IUserRoleDetails) => (<Label>{row.role_name} {row.company_id>0?'':<Label className="text-danger">*</Label>}</Label>),
  },
  {
    id: 'description',
    name: 'Description',
    style: { width: '50%' },
    sortable: true,
    selector: (row: IUserRoleDetails) => row.description
  },
  {
    id: 'active',
    name: 'Active',
    style: { width: '10%' },
    align:'center',
    selector: (row: IUserRoleDetails) => row.str_active,
    cell:(row:IUserRoleDetails)=>(row.active ? <HiCheckCircle size={20} className="text-success" /> : <MdCancel size={20} className="text-danger" />)
  },
  {
    id: 'action',
    name: 'Action',
    style: { width: '5%' },
    sortable: false,
    align:'center',
    selector: (row: IUserRoleDetails) => row.role_id,
    cell: (row: IUserRoleDetails) => (row.company_id==0?'':<HiOutlinePencilAlt size={20} style={{cursor:"pointer"}} onClick={() => handleEditRole(row.role_id)} />)
  },
]

  return (
    < >
      <CommonLayOut>
        <div className="d-flex justify-content-between">
          <div className="page-title">User Role</div>
          <div>
            <div className="d-flex align-items-center gap-1">
              <div className="d-flex justify-content-end ms-auto align-items-center column-gap-2">
                <InputGroup className="shadow-sm border-secondary">
                  <InputGroupText className="bg-white">
                    <BsSearch size={16} />
                  </InputGroupText>
                  <Input
                    id="search-bar"
                    placeholder="Search"
                    className="border-start-0 search"
                    inputRef={inputRef}
                    onChange={(e) => handleSearch(e.target.value)}
                  />
                </InputGroup>
              </div>

              <NewUserRoleModal
                modalOpen={modalOpen}
                closeModal={handleCloseModal}
                userRoleNewDetails={userRoleNewDetails}
                setUserRoleDetails={setNewUserRoleDetails}
                handleInputChange={handleInputChange}
                selectedUserRole={selectedUserRole}
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
                <AiOutlinePlus />
                New User Role
              </Button>
            </div>
          </div>
        </div>
        {/* <BasicTable
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
        /> */}
        <CustomTable columns={columns} data={filteredData} noRecordMessage="No user  role found." />
        {/* <div className="notification-container">
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
        </div> */}
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
      </CommonLayOut>
    </>
  );
};

export default UserRolePage;
