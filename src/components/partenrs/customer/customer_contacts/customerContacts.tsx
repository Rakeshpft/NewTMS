import { isEmpty } from 'lodash'

import React, { useContext, useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Button, Label, Container, FormGroup, Modal, ModalBody, ModalHeader, Col, Form, Input, Row } from 'reactstrap'

import { useCustomerContext } from '../../../../services/reducer/customer.reducer'

import { ICustomerContacts, TCustomerProps, initialCustomerContacts } from '../../../../services/tms-objects/customer.types'
import { HiCheckCircle, HiOutlinePencilAlt } from 'react-icons/hi'
import { CustomTable } from '../../../../features/data-table/CustomTable'
import { toastify } from '../../../../features/notification/toastify'
import { MdCancel } from 'react-icons/md'
import { BiCheck } from 'react-icons/bi'
import { RxCross2 } from 'react-icons/rx'
import { IMaskInput } from 'react-imask';
import { Validate, mask } from '../../../../features/shared/validate';
import { LoadingContext } from '../../../../services/context/loading.context'

const CustomerContacts = (prop: TCustomerProps) => {
  const {
    customer_id = 0
  } = prop;


  const {

    ContactList,
    customerLoading,

    getContacts,
    saveContact,
    deleteContact,


  } = useCustomerContext();

  const { setLoader } = useContext(LoadingContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [customerContact, setcustomerContact] = useState<ICustomerContacts>(initialCustomerContacts);
  const [customerContactList, setcustomerContactList] = useState<ICustomerContacts[]>([])
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<ICustomerContacts[] | []>([]);


  const handleInputContactChange =
    (prop: keyof ICustomerContacts) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setcustomerContact({ ...customerContact, [prop]: event.target.value });

      };


      const handleInputMaskChange =
  (prop: keyof ICustomerContacts,unMasked:string) => {
    setcustomerContact({ ...customerContact, [prop]: unMasked });
      };

  const ContactModalClose = () => {
    setModalOpen(false);
    setcustomerContact(initialCustomerContacts)
  }

  const handleEditContact = (id: number) => {
    const filteredData = customerContactList?.filter(l => l.contact_id == id)
    if (filteredData && filteredData.length > 0) {
      setcustomerContact(filteredData[0])
    }
    setModalOpen(true);
   
  };

  useEffect(() => {
    if (!customerLoading && ContactList) {
      setcustomerContactList(ContactList)
      setDeleteModalOpen(false);

    }
  }, [customerLoading, ContactList]);





  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedContacts([]);

  };

  const handleDeleteContacts = async () => {

      const deletedDocumentIds = selectedContacts.map(doc => doc.contact_id);

      await deleteContact(customer_id, deletedDocumentIds)
        .then(response => {
          console.log(response);
          response &&
            toastify({
              message: response.message,
              type: response.success ? "success" : "error",
            })

            setDeleteModalOpen(false)
          setSelectedContacts([])
          

        });

    }
    const handleCustomerContactType =
    (prop: keyof ICustomerContacts) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (prop == "is_default" && !event.target.checked && !customerContact.is_default_billing) {
        setcustomerContact({ ...customerContact, is_default_billing : true, is_default:false });
      } else if (prop == "is_default_billing" && !event.target.checked && !customerContact.is_default) {
        setcustomerContact({ ...customerContact, is_default : true, is_default_billing:false });
      } else {
        setcustomerContact({ ...customerContact, [prop]: event.target.checked });
      }
  };
  const closeBtn = (
    <button
      className="border-0 bg-transparent text-white"
      type="button"
      onClick={() => setModalOpen(false)}
    >

      <RxCross2 />
    </button>
  );

  useEffect(() => {
    if (customer_id > 0) {
      getContacts(customer_id)
    }
  }, []);

  const handleSaveContact = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setLoader(true);

    await saveContact(customer_id, customerContact).then((response: any) => {

      console.log("getdata", response);
      response &&
        toastify({
          message: response.message,
          type: (response.success ? "success" : "error")
         
        });
      getContacts(customer_id)
      ContactModalClose();
      setLoader(false)

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
      cell: (row: ICustomerContacts) => (row.is_default ? <HiCheckCircle size={20} className="text-success" /> : <MdCancel size={20} className="text-danger" />)
    },
    {
      id: 'is_default_billing',
      name: 'DEFAULT BILLING',
      style: { width: '15%' },
      sortable: true,
      selector: (row: ICustomerContacts) =>
        row.is_default_billing,
      cell: (row: ICustomerContacts) => (row.is_default_billing ? <HiCheckCircle size={20} className="text-success" /> : <MdCancel size={20} className="text-danger" />)
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
      cell: (row: ICustomerContacts) => (row.company_id == 0 ? '' : <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={() => handleEditContact(row.contact_id)} />)
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
            <Button color="success" outline={true} onClick={() => { setModalOpen(true) }}>
              <AiOutlinePlus /> New Contacts
            </Button>
          </label>
        </Col>
      </div>
      <div className="d-flex align-items-center gap-1">
        <Modal isOpen={modalOpen} >
          <ModalHeader close={closeBtn}
            onClose={() => ContactModalClose()}>
            <h6 className="mb-0 fw-bold ">
            <h6 className="mb-0 fw-bold">{customerContact.contact_id > 0 ? "Edit Contact" : "Add Contact" } </h6>
            </h6>
          </ModalHeader>
          <ModalBody>
            <Form className="page-content" onSubmit={handleSaveContact}>
              <Row className="page-content align-items-center">
                <Col md={6}>
                  <FormGroup>
                    <Label for="first Name">Name</Label>
                    <Input bsSize="sm" className="form-control" type="text" id="name" name="name" value={customerContact.name} onChange={handleInputContactChange("name")} pattern='^[a-zA-Z]+$' title="Only alphabets are allowed" onKeyDownCapture={Validate} validation="chars" length="50" required autoComplete='off' />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup className="d-flex align-items-center mt-3">
                    <FormGroup check className="checkbox-inline me-3">
                      <Input type="checkbox" id="default"
                        checked={customerContact.is_default}
                        onChange={handleCustomerContactType("is_default")} />
                      <Label for="defaultCheckbox" check className="checkbox-label">
                        Default
                      </Label>
                    </FormGroup>
                    <FormGroup check className="checkbox-inline">
                      <Input type="checkbox" id="default_billing"
                        checked={customerContact.is_default_billing}
                        onChange={handleCustomerContactType("is_default_billing")} />
                      <Label for="default_billing" check className="checkbox-label">
                        Default Billing
                      </Label>
                    </FormGroup>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="phone">Phone</Label>
                    
                      <IMaskInput mask={mask.phone} placeholder='___ ___-__-__' id="phone" name="phone" className="form-control form-control-sm" value={customerContact.phone} unmask={true} onAccept={(unmasked)=>{handleInputMaskChange('phone',unmasked)}} required autoComplete='off' ></IMaskInput>
                    
                    
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="email"> Email </Label>
                    <Input bsSize="sm" className="form-control form-control-sm" id="description" name="email" type="email"
                      value={customerContact.email}
                      onChange={handleInputContactChange("email")}
                      pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' title="Please enter valid email"
                      required autoComplete='off'
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <FormGroup>
                    <Label for="exampleText">
                      Notes
                    </Label>
                    <Input
                      id="notes"
                      name="text"
                      type="textarea"
                      value={customerContact.notes}
                      onChange={handleInputContactChange("notes")}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col className="d-flex justify-content-end align-items-end">
                  <Button color="primary" size="sm" onClick={() => { }} type="submit">
                    <BiCheck fontSize={"16px"} /> Save
                  </Button>
                </Col>
              </Row>
            </Form>
          </ModalBody>
        </Modal>

      </div>


      <div>
        <CustomTable columns={columns} data={customerContactList} noRecordMessage="No Contacts found." canSelectRows={true} selectedTableRows={selectedContacts} setSelectionTableRows={setSelectedContacts} />

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
            <h6 className="mb-0 fw-bold">Delete Contact</h6>
          </ModalHeader>
          <ModalBody>
            <Container>
              {!isEmpty(selectedContacts) && (
                <div className=" my-3 " >
                   {selectedContacts.length > 1?(<div>You have selected {selectedContacts.length} contacts.<br /></div>):null}
                  Are you sure you want to delete?
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