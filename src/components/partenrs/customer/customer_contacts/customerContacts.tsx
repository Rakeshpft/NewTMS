import { isEmpty } from 'lodash'

import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
// import { BsSearch } from 'react-icons/bs'
import { Button, Label, Container, FormGroup, Modal, ModalBody, ModalHeader, Col } from 'reactstrap'
// import { BasicTable } from '../../../../features/table/BasicTable'
// import { tableHeadCells, tableCells } from '../customer.constants'
import CustomerContactsModal from './customerContactsModal'
import { useCustomerContext } from '../../../../services/reducer/customer.reducer'
// import { IUserRoleDetails } from '../../../../services/tms-objects/userRole.types'
import { ICustomerContacts, TCustomerProps, initialCustomerContacts } from '../../../../services/tms-objects/customer.types'
// import CustomerDetails from '../customer_detail/customerDetails'
import { HiCheckCircle, HiOutlinePencilAlt } from 'react-icons/hi'
import { CustomTable } from '../../../../features/data-table/CustomTable'
import { toastify } from '../../../../features/notification/toastify'
import { MdCancel } from 'react-icons/md'

const CustomerContacts = (prop: TCustomerProps) => {
  const {
    customer_id = 0
  } = prop;
  console.log(customer_id);

  const {
    selectedContact,
    ContactList,
    customerLoading,

    getContacts,
    saveContact,
    deleteContact,
    getIndividualContacts,

  } = useCustomerContext();


  const [filteredData, setFilteredData] = useState<ICustomerContacts[]>([]);;
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState(true);
  const [contactNewDetails, setcontactNewDetails] = useState<ICustomerContacts>(initialCustomerContacts);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<ICustomerContacts[] | []>([]);

  // const inputRef = useRef<HTMLInputElement>(null);

  const handleInputContactChange =
    (prop: keyof ICustomerContacts) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setcontactNewDetails({ ...contactNewDetails, [prop]: event.target.value });

      };
  useEffect(() => {
    if (selectedContact) {
      setcontactNewDetails({
        ...ContactList,
        contact_id: selectedContact.contact_id,
        name: selectedContact.name,
        email: selectedContact.email,
        phone: selectedContact.description,
        notes: selectedContact.notes,
        is_default: selectedContact.is_default,
        is_default_billing: selectedContact.is_default_billing,
        customer_id: selectedContact.customer_id,
        company_id: selectedContact.company_id,

      });
    }
  }, [selectedContact]);


  // const handleSearch = debounce((searchValue: string) => {
  //   const searchResults =
  //     ContactDetails &&
  //     ContactDetails.filter((contacts) => {
  //       if (
  //         includes(
  //           contacts.name.toLowerCase(),
  //           searchValue.toLowerCase()
  //         )
  //       ) {
  //         return contacts;
  //       }
  //     });
  //   searchResults && setFilteredData(searchResults);
  // }, 500);

  const handleNewContacts = () => {
    setModalOpen(true);
    setcontactNewDetails(initialCustomerContacts);
    setTitle(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    getContacts(customer_id).then((data) => {
      data && setFilteredData(data);
    });
  };

  const handleEditContact = (contact: ICustomerContacts) => {
    getIndividualContacts(contact.contact_id);
    setcontactNewDetails(contact)
    setModalOpen(true);
    setTitle(false);
  };

  useEffect(() => {
    if (customerLoading && ContactList) {
      setFilteredData(ContactList);
      //setNoUserRole(isEmpty(userRoleDetails));
    }
  }, [customerLoading, ContactList]);

  useEffect(() => {
    if (!customerLoading) {
      setDeleteModalOpen(false);
      setSelectedContacts([]);
    }
  }, [customerLoading]);



  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedContacts([]);
    
  };

  const handleDeleteContacts = () => {
    selectedContacts && deleteContact(selectedContacts);

    getContacts(customer_id).then((data) => {
      data && setFilteredData(data);
    });
    setDeleteModalOpen(false);
    console.log("clicked");
  };
  const handleDefaultCheckBox = () => {
    if (!contactNewDetails.is_default_billing){
      setcontactNewDetails({ ...contactNewDetails,is_default : true});
    }else
    setcontactNewDetails({ ...contactNewDetails, is_default: !contactNewDetails.is_default });

  };
  const handleDefaultBillingCheckBox = () => {
    if (!contactNewDetails.is_default){
      setcontactNewDetails({ ...contactNewDetails,is_default_billing : true});
    }else
    setcontactNewDetails({ ...contactNewDetails, is_default_billing: !contactNewDetails.is_default_billing });
  };

  useEffect(() => {
    if(customer_id>0){
    getContacts(customer_id).then((data) => {
      data && setFilteredData(data);
    })};
  }, []);

  const handleSaveContact = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
  
    await saveContact(customer_id, contactNewDetails).then((response: any) => {
      
      console.log("getdata", response);
      setModalOpen(false);
      getContacts(customer_id).then((data) => {
        data && setFilteredData(data);
      });
      response && toastify({ message: response.message, type: (response.success ? "success" : "error") });

    })
  };


  const columns: CustomTableColumn[] = [
    {
      id: 'name',
      name: 'CONTACT',
      style: { width: '15%' },
      sortable: true,
      selector: (row: ICustomerContacts) => row.name,
      format: (row: ICustomerContacts) => (<Label>{row.name} {row.company_id > 0 ? '' : <Label className="text-danger">*</Label>}</Label>),
    },
    {
      id: 'is_default',
      name: 'DEFAULT',
      style: { width: '15%' },
      sortable: true,
      selector: (row: ICustomerContacts) => 
       row.is_default,
       cell:(row:ICustomerContacts)=>(row.is_default ? <HiCheckCircle size={20} className="text-success" /> : <MdCancel size={20} className="text-danger" />)
    },
    {
      id: 'is_default_billing',
      name: 'DEFAULT BILLING',
      style: { width: '15%' },
      sortable: true,
      selector: (row: ICustomerContacts) => 
      row.is_default_billing,
      cell:(row:ICustomerContacts)=>(row.is_default_billing ? <HiCheckCircle size={20} className="text-success" /> : <MdCancel size={20} className="text-danger" />)
    },
    {
      id: 'phone',
      name: 'PHONE',
      style: { width: '15%' },
      sortable: true,
      selector: (row: ICustomerContacts) => row.phone
    },
    {
      id: 'email',
      name: 'EMAIL',
      style: { width: '15%' },
      sortable: true,
      selector: (row: ICustomerContacts) => row.email
    },
    {
      id: 'notes',
      name: 'NOTES',
      style: { width: '15%' },
      sortable: true,
      selector: (row: ICustomerContacts) => row.notes
    },

    {
      id: 'action',
      name: 'ACTION',
      style: { width: '5%' },
      sortable: false,
      align: 'center',
      selector: (row: ICustomerContacts) => row.contact_id,
      cell: (row: ICustomerContacts) => (row.company_id == 0 ? '' : <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={() => handleEditContact(row)} />)
    },
  ]
  return (
    <>
     <div className="d-flex justify-content-end m-3">
  <Col md={3} className="d-flex justify-content-end align-items-end pb-3">
    <label className="page-subtitle d-flex align-items-end">

      {!isEmpty(selectedContacts) && (
        <div className="user-info-btn me-2">
          <Button
            color="primary"
            className="px-4 shadow save-button"
            onClick={() => setDeleteModalOpen(true)}
          >
            Delete
          </Button>
        </div>
      )}
      <Button color="success" outline={true} onClick={handleNewContacts}>
        <AiOutlinePlus /> New Contacts
      </Button>
    </label>
  </Col>
</div>

      <div className="d-flex align-items-center gap-1">
        <CustomerContactsModal
          modalOpen={modalOpen}
          closeModal={handleCloseModal}
          contactNewDetails={contactNewDetails}
          setcontactNewDetails={setcontactNewDetails}
          setContactDetails={setcontactNewDetails}
          handleInputContactChange={handleInputContactChange}
          selectedContact={selectedContact}
          handleSaveContact={handleSaveContact}
          title={title}
          handleDirectCheckBox={handleDefaultCheckBox}
          handleDirectBillingCheckBox={handleDefaultBillingCheckBox}
        />

      </div>


      <div>
        <CustomTable columns={columns} data={filteredData} noRecordMessage="No Contacts found." canSelectRows={true} selectedTableRows={selectedContacts} setSelectionTableRows={setSelectedContacts}/>

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
        <Modal isOpen={deleteModalOpen} onClose={closeDeleteModal}>
          <ModalHeader>
            <h6 className="mb-0 fw-bold"> Delete </h6>
          </ModalHeader>
          <ModalBody>
            <Container>
              {!isEmpty(selectedContacts) && (
                <div className=" my-3 " >
                  {selectedContacts.length > 1
                    ? `Are you sure you want to delete ${selectedContacts.length} Roles?`
                    : `Are you sure you want to delete role  " ${selectedContacts[0].name}"?`}
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
                  onClick={() => handleDeleteContacts()}
                >
                  Delete
                </Button>
              </FormGroup>
            </Container>
          </ModalBody>
        </Modal>
      </div>
    </>
  )
}

export default CustomerContacts