import React, { useEffect, useState } from 'react'
import { IDriverMedical, TDriverProps, initialDriverMedical } from '../../../../services/tms-objects/driver.types'
import { HiOutlineDocumentDownload, HiOutlinePencilAlt } from 'react-icons/hi'
import { Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { AiOutlinePlus } from 'react-icons/ai'
import { CustomTable } from '../../../../features/data-table/CustomTable'
import { RxCross2 } from 'react-icons/rx'
import { useDriverContext } from '../../../../services/reducer/driver.reducer'
import { toastify } from '../../../../features/notification/toastify'
import { isEmpty } from 'lodash'
import ReactDatePicker from 'react-datepicker'
import { Dictionary, Convert, Helper } from '../../../../features/shared/helper'

const DocumentMedical = ( prop : TDriverProps) => {

  const {driver_id = 0} = prop

  const { getDriverMedicalList ,driverMedicalLists , postDriverMedical , deleteDriveMedical ,driverLoading } = useDriverContext()

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [driverMedical, setDriverMedical] = useState<IDriverMedical>(initialDriverMedical);
  const [driverMedicalList, setDriverMedicalList] = useState<IDriverMedical[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<IDriverMedical[] | []>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const UploadModalClose = () => {
    setUploadModalOpen(false);
    setDriverMedical(initialDriverMedical);
  }
const handleEditMedical = (id:number) => {
  const filteredData = driverMedicalList?.filter(l=>l.card_id == id)
  if (filteredData && filteredData.length>0) {      
    setDriverMedical(filteredData[0])
  }
  setUploadModalOpen(true);
 }

 const closeDeleteModal = () => {
  setDeleteModalOpen(false);
  setSelectedDriver([]);
};

 const handleFileUpload = async(event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files) {      
    setDriverMedical({
      ...driverMedical,
      file : event.target.files[0]
    })
  }
}

useEffect(()=>{
  if(!driverLoading && driverMedicalLists){
    setDriverMedicalList(driverMedicalLists);
  }
},[driverLoading,driverMedicalLists])

const handleDriverInput = (prop: keyof IDriverMedical) => (event: React.ChangeEvent<HTMLInputElement>) => {
  setDriverMedical({ ...driverMedical, [prop]: event.target.value });
}

const handleDriverMedicalSubmit = async (event: React.ChangeEvent<HTMLFormElement>) => {
  event.preventDefault();
  if(driverMedical.file || driverMedical.card_id > 0){
    await postDriverMedical(driver_id,driverMedical).then((data : any ) => {
      data?.value && data && toastify({ message: data.message, type: data.success ? "success" : "error", });
      UploadModalClose();
      getDriverMedicalList(driver_id)
    })
  }
}

const handleDeleteDriverMedical = async () => {
    
  const  deleteDrivercdlId = selectedDriver.map(driverId => driverId.card_id)

 await deleteDriveMedical( driver_id , deleteDrivercdlId).then((response ) => {
  response &&  response.message && toastify({ message: response.message, type: (response.success ? "success" : "error") })
 }

 )
  closeDeleteModal();
  getDriverMedicalList(driver_id);
  setSelectedDriver([]);
}

useEffect(() => {
  if(driver_id > 0){
    getDriverMedicalList(driver_id)
  }
}, [])

 const closeBtn = (
  <button
    className="border-0 bg-transparent text-white"
    type="button"
    onClick={() => UploadModalClose()}
  >
     
    <RxCross2 />
  </button>
);


  const columns: CustomTableColumn[] = [
    {
      id: 'card_number',
      name: 'NUMBER',
      style: { width: '30%' },
      sortable: true,
      selector: (row: IDriverMedical) => row.card_number,     
    },
    {
      id: 'issue_date',
      name: 'ISSUE DATE',
      style: { width: '25%' },
      sortable: true,
      selector: (row: IDriverMedical) => row.issue_date,
      format: (row: IDriverMedical) =>  Convert.ToUserDate(row.issue_date)     
    },
    {
      id: 'exp_date',
      name: 'EXP DATE',
      style: { width: '25%' },
      sortable: true,
      selector: (row: IDriverMedical) => row.exp_date,
      format: (row: IDriverMedical) =>  Convert.ToUserDate(row.exp_date)
    },
    {
      id : "action",
      name : "",
      style : {width : "15%"},
      sortable : false,
      align:'center',
      selector : (row : IDriverMedical) => row.card_id,
      cell: (row: IDriverMedical ) => 
      <>
        <HiOutlineDocumentDownload className='me-2' size={22} style={{ cursor: "pointer" }} onClick={()=>{Helper.FileDownload(row.attachment_url)}} />
        <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={()=>{ handleEditMedical(row.card_id) }} />
      </>  

    }
  ]

  return (
    <>
      <div className="d-flex justify-content-end m-3">
        <Col md={3} className=" d-flex justify-content-end align-items-end pb-3 column-gap-3" >
        {!isEmpty(selectedDriver) && (
                  <div className="user-info-btn">

                    <Button color="primary" onClick={() => setDeleteModalOpen(true)}>Delete</Button>
                  </div>
                )}
          <label className="page-subtitle mb-0">
            <Button color="success"  outline={true}  onClick={() => setUploadModalOpen(true)}><AiOutlinePlus />Add</Button>
          </label>
        </Col>
      </div>
      <CustomTable columns={columns} data={driverMedicalList} noRecordMessage="No Document found." canSelectRows={true} selectedTableRows={selectedDriver} setSelectionTableRows={setSelectedDriver} />
      <Modal isOpen={uploadModalOpen} onClose={UploadModalClose}>

      <ModalHeader close={closeBtn}
                 onClose={() => UploadModalClose()}>
          <h6 className="mb-0 fw-bold">{ driverMedical.card_id > 0 ? "Edit medical card" : "Add medical card" }</h6>
        </ModalHeader>
        <ModalBody className="square border border-info-rounded">
        <Form onSubmit={handleDriverMedicalSubmit} >

        <Row>
        <Col md={6}>
        <FormGroup>
        <Label for="number">Number</Label>
       <Input bsSize="sm" className="form-control form-control-sm" type="text" id="application_date" name="application_date" value={driverMedical.card_number} onChange={handleDriverInput('card_number')} required  />
        </FormGroup> 
        </Col>
        
        <Col md={6}>
        <FormGroup>
        <Label for="issue_date">Issue Date</Label>
        <ReactDatePicker  showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event)=>{event.preventDefault()}} placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="purchase_date" className="form-control form-control-sm" onChange={(date)=>{setDriverMedical({...driverMedical, issue_date: Convert.ToISODate(date) })}} selected={Convert.ToDate(driverMedical.issue_date)}  required />
        </FormGroup>
        </Col>
       </Row>
       <Row>
        <Col md={6}>
        <FormGroup>
        <Label for="exp_date">Exp Date</Label>
        <ReactDatePicker  showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event)=>{event.preventDefault()}} placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="purchase_date" className="form-control form-control-sm" onChange={(date)=>{setDriverMedical({...driverMedical, exp_date: Convert.ToISODate(date) })}} selected={Convert.ToDate(driverMedical.exp_date)} required />
        </FormGroup> 
        </Col>
       
        <Col md={6}>
        <FormGroup>
       <Label>Attachments</Label>
          <Input type="file" name="file" id="file" onChange={handleFileUpload} required /> 
        </FormGroup>
        </Col>
       </Row>

       <FormGroup className=" d-flex justify-content-end mt-3 column-gap-2 ">
          <Button color="primary" className="px-4 mr-3 shadow save-button" type="submit">Save</Button>
       </FormGroup>

        </Form>
        </ModalBody>

        </Modal>

        <Modal isOpen={deleteModalOpen} onClose={closeDeleteModal}>
              <ModalHeader>
                <h6 className="mb-0 fw-bold"> Delete </h6>
              </ModalHeader>
              <ModalBody>
                <Container>
                  {!isEmpty(selectedDriver) && (
                     <div className=" dle my-3 ">                      
                      {selectedDriver.length > 1?(<div>You have selected {selectedDriver.length} medical cards.<br /></div>):null}
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
                      onClick={() => handleDeleteDriverMedical()}
                    >
                      Delete
                    </Button>
                  </FormGroup>
                </Container>
              </ModalBody>
            </Modal>
   </>
  )
}

export default DocumentMedical