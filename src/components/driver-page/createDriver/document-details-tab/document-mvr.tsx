import React, { useEffect, useState } from 'react'
import { IDriverMvr, TDriverProps, initialDriverMvr } from '../../../../services/tms-objects/driver.types'
import { AiOutlinePlus } from 'react-icons/ai'
import { Col, Button, Modal, ModalHeader, ModalBody, FormGroup, Input, Label, Row, Form, Container } from 'reactstrap'
import { HiOutlineDocumentDownload, HiOutlinePencilAlt } from 'react-icons/hi'
import { CustomTable } from '../../../../features/data-table/CustomTable'
import { RxCross2 } from 'react-icons/rx'
import { useDriverContext } from '../../../../services/reducer/driver.reducer'
import { toastify } from '../../../../features/notification/toastify'
import { isEmpty } from 'lodash'
import { Convert, Dictionary, Helper } from '../../../../features/shared/helper'
import ReactDatePicker from 'react-datepicker'

const DocumentMvr = ( prop : TDriverProps) => {

  const { driver_id = 0 } = prop;
  const { getDriverMvr , driverMvrLists , postDriverMvr , deleteDriverMvr ,driverLoading  } = useDriverContext()
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [driverMvr, setDriverMvr] = useState<IDriverMvr>(initialDriverMvr);
  const [driverMvrList , setDriverMvrList] = useState<IDriverMvr[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<IDriverMvr[] | []>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

const UploadModalClose = () => {
  setUploadModalOpen(false);
  setDriverMvr(initialDriverMvr);
}

useEffect(()=>{
  if(!driverLoading && driverMvrLists){
    setDriverMvrList(driverMvrLists);
  }
},[driverLoading, driverMvrLists])

// const handleDriverInput = (prop: keyof IDriverMvr) => (event: React.ChangeEvent<HTMLInputElement>) => {
//   setDriverMvr({ ...driverMvr, [prop]: event.target.value });
// }
const handleEditMvr = (id:number) => {
  const filteredData = driverMvrList?.filter(l=>l.mvr_id == id)
  if (filteredData && filteredData.length>0) {      
    setDriverMvr(filteredData[0])
  }
  setUploadModalOpen(true);
 }

 const handleFileUpload = async(event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files) {      
    setDriverMvr({
      ...driverMvr,
      file : event.target.files[0]
    })
  }
}

const closeDeleteModal = () => {
  setDeleteModalOpen(false);
  setSelectedDriver([]);
};

const closeBtn = (
  <button
    className="border-0 bg-transparent text-white"
    type="button"
    onClick={() => UploadModalClose()}
  >  
    <RxCross2 />
  </button>

);
const handleSaveMvr = async (event: React.ChangeEvent<HTMLFormElement>) => {
  event.preventDefault();
  if(driverMvr.file){
    await postDriverMvr(driver_id, driverMvr).then((data : any ) => {
      data?.value && data && toastify({ message: data.message, type: data.success ? "success" : "error", });
      
    })
  }
  UploadModalClose();
      getDriverMvr(driver_id);
}

const handleDeleteDriver = async () => {
    
  const  deleteDriverMvrId = selectedDriver.map(driverId => driverId.mvr_id)

 await deleteDriverMvr( driver_id , deleteDriverMvrId).then((response) => {
  response &&  response.message && toastify({ message: response.message, type: (response.success ? "success" : "error") })
 }

 )
  closeDeleteModal();
  getDriverMvr(driver_id);
  setSelectedDriver([]);
}

useEffect(() => {
  if (driver_id>0) {
    getDriverMvr(driver_id)
  }
}, [])
  const columns: CustomTableColumn[] = [
    {
      id: 'date',
      name: ' DATE',
      style: { width: '80%' },
      sortable: true,
      selector: (row: IDriverMvr) => row.date,
      format: (row: IDriverMvr) =>  Convert.ToUserDate(row.date)     
    },
    {
      id : "action",
      name : "",
      style : {width : "15%"},
      sortable : false,
      align:'center',
      selector : (row : IDriverMvr) => row.mvr_id,
      cell: (row: IDriverMvr ) => 
      <>
      <HiOutlineDocumentDownload className='me-2' size={22} style={{ cursor: "pointer" }} onClick={()=>{Helper.FileDownload(row.attachment_url)}} />
      <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={()=>{ handleEditMvr(row.mvr_id) }} />
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
    
      <CustomTable columns={columns} data={driverMvrList} noRecordMessage="No Document found." canSelectRows={true} selectedTableRows={selectedDriver} setSelectionTableRows={setSelectedDriver}/>
      <Modal isOpen={uploadModalOpen} onClose={UploadModalClose}>
      <ModalHeader close={closeBtn}
                 onClose={() => UploadModalClose()}>
          <h6 className="mb-0 fw-bold">{ driverMvr.mvr_id > 0 ? "Edit MVR" : "Add MVR"}</h6>
        </ModalHeader>
        <ModalBody className="square border border-info-rounded">
          <Form onSubmit={handleSaveMvr}>
        <Row>
        <Col md={6}>
        <FormGroup>
        <Label for="application_date">Date</Label>
          <ReactDatePicker required showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event)=>{event.preventDefault()}} placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="purchase_date" className="form-control form-control-sm" onChange={(date)=>{setDriverMvr({...driverMvr, date: Convert.ToISODate(date) })}} selected={Convert.ToDate(driverMvr.date)} ></ReactDatePicker>
        </FormGroup> 
        </Col>
        
        <Col md={6}>
        <FormGroup>
       <Label>Attachments</Label>
       <Input type="file" required name="file" id="file" onChange={handleFileUpload}  /> 
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
                     {selectedDriver.length > 1?(<div>You have selected {selectedDriver.length} MVR.<br /></div>):null}
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

export default DocumentMvr