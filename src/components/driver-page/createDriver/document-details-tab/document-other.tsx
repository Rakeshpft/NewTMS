import React, { useEffect, useState } from 'react'
import {  IDriverOther, TDriverProps, initialDriverOther } from '../../../../services/tms-objects/driver.types'
import { HiOutlineDocumentDownload, HiOutlinePencilAlt } from 'react-icons/hi'
import { Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { CustomTable } from '../../../../features/data-table/CustomTable'
import { RxCross2 } from 'react-icons/rx'
import { AiOutlinePlus } from 'react-icons/ai'
import { useDriverContext } from '../../../../services/reducer/driver.reducer'
import { toastify } from '../../../../features/notification/toastify'
import { isEmpty } from 'lodash'
import ReactDatePicker from 'react-datepicker'
import { Dictionary, Convert, Helper } from '../../../../features/shared/helper'

const DocumentOther = (props : TDriverProps) => {
  const { driver_id = 0} = props
  console.log("driver_id", driver_id)
 const { getDriverOther , driverOtherListsData ,postDriverOther, deleteDriverOther ,driverLoading} = useDriverContext()
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [driverOtherDoc, setDriverOtherDoc] = useState<IDriverOther>(initialDriverOther);
  const [driverOtherDocList , setDriverOtherDocList] = useState<IDriverOther[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<IDriverOther[] | []>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const UploadModalClose = () => {
    setUploadModalOpen(false);
    setDriverOtherDoc(initialDriverOther);
  }
const handleEditOther = (id:number) => {
  const filteredData = driverOtherDocList?.filter(l=>l.doc_id == id)
  if (filteredData && filteredData.length>0) {      
    setDriverOtherDoc(filteredData[0])
  }
  setUploadModalOpen(true);
 }

 const handleFileUpload = async(event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files) {      
    setDriverOtherDoc({
      ...driverOtherDoc,
      file : event.target.files[0]
    })
  }
}
const closeBtn = (
  <button
    className="border-0 bg-transparent text-white"
    type="button"
    onClick={() => UploadModalClose()}
  >
     
    <RxCross2 />
  </button>
);

const closeDeleteModal = () => {
  setDeleteModalOpen(false);
  setSelectedDriver([]);
};


useEffect(()=>{
  if(!driverLoading && driverOtherListsData ){
    setDriverOtherDocList(driverOtherListsData);
  }
},[driverLoading, driverOtherListsData])

const handleDriverInput = (prop: keyof IDriverOther) => (event: React.ChangeEvent<HTMLInputElement>) => {
  setDriverOtherDoc({ ...driverOtherDoc, [prop]: event.target.value });
};

const handleOtherSave = async ( event: React.ChangeEvent<HTMLFormElement>) => {
  event.preventDefault();
  if(driverOtherDoc.file){
    await postDriverOther(driver_id, driverOtherDoc).then((data : any ) => {
      data?.value && data && toastify({ message: data.message, type: data.success ? "success" : "error", });
      UploadModalClose();
      getDriverOther(driver_id)
    })
  }
  
}

const handleDeleteDriver = async () => {
    
  const  deleteDriverOtherId = selectedDriver.map(driverId => driverId.doc_id)

 await deleteDriverOther( driver_id , deleteDriverOtherId).then((response) => {
  response &&  response.message && toastify({ message: response.message, type: (response.success ? "success" : "error") })
 }

 )
  closeDeleteModal();
  getDriverOther(driver_id);
  setSelectedDriver([]);
}

useEffect(() => {
  if(driver_id > 0){
    getDriverOther(driver_id)
  }
} , [])
  
const columns: CustomTableColumn[] = [
  {
    id: 'name',
    name: ' NAME',
    style: { width: '30%' },
    sortable: true,
    selector: (row: IDriverOther) => row.name,
  },
  {
    id: 'expiry_date',
    name: 'EXP DATE',
    style: { width: '10%' },
    sortable: true,
    selector: (row: IDriverOther) => row.expiry_date,
    format: (row: IDriverOther) =>  Convert.ToUserDate(row.expiry_date)   
  },
  {
    id: 'notes',
    name: 'NOTES',
    style: { width: '40%' },
    sortable: true,
    selector: (row: IDriverOther) => row.notes,
  },
  {
    id : "action",
    name : "",
    style : {width : "15%"},
    sortable : false,
    align:'center',
    selector : (row : IDriverOther) => row.attachment,
    cell: (row: IDriverOther ) => 
    <>
    <HiOutlineDocumentDownload className='me-2' size={22} style={{ cursor: "pointer" }} onClick={()=>{Helper.FileDownload(row.attachment_url)}} />
    <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={()=>{ handleEditOther(row.doc_id) }} />
  </>  
  },

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
      
      <CustomTable columns={columns} data={driverOtherDocList} noRecordMessage="No Document found." canSelectRows={true} selectedTableRows={selectedDriver} setSelectionTableRows={setSelectedDriver} />
      <Modal isOpen={uploadModalOpen} onClose={UploadModalClose}>
      <ModalHeader close={closeBtn}
                 onClose={() => UploadModalClose()}>
          <h6 className="mb-0 fw-bold">{ driverOtherDoc.doc_id ? "Edit other" : "Add other"}</h6>
        </ModalHeader>
        <ModalBody className="square border border-info-rounded">
        <Form onSubmit={handleOtherSave} >    
        <Row>
        <Col md={6}>
        <FormGroup>
        <Label for="application_date">NAME</Label>
       <Input bsSize="sm" className="form-control form-control-sm" type="text" id="application_date" name="application_date" value={driverOtherDoc.name } onChange={handleDriverInput('name')} />
        </FormGroup> 
        </Col>
        
        <Col md={6}>
        <FormGroup>
        <Label for="application_date"> EXP DATE</Label>
        <ReactDatePicker  showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event)=>{event.preventDefault()}} placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="purchase_date" className="form-control form-control-sm" onChange={(date)=>{setDriverOtherDoc({...driverOtherDoc, expiry_date: Convert.ToISODate(date) })}} selected={Convert.ToDate(driverOtherDoc.expiry_date)} ></ReactDatePicker>
        </FormGroup>
        </Col>
       </Row>
       <Row>
        <Col md={6}>
        <FormGroup>
        <Label for="application_date">NOTES</Label>
       <Input bsSize="sm" className="form-control form-control-sm" type="text" id="application_date" name="application_date" value={ driverOtherDoc.notes} onChange={handleDriverInput('notes')} />
        </FormGroup> 
        </Col>
        
        <Col md={6}>
        <FormGroup>
       <Label>ATTACHMENTS</Label>
       <Input type="file" name="file" id="file" onChange={handleFileUpload}  /> 
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
                    {selectedDriver.length > 1?(<div>You have selected {selectedDriver.length} documents.<br /></div>):null}
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
                      onClick={() => handleDeleteDriver()}
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

export default DocumentOther