import React, { useEffect, useState } from 'react'
import {  IDriverOther, TDriverProps, initialDriverOther } from '../../../../../../services/tms-objects/driver.types'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import moment from 'moment'
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { CustomTable } from '../../../../../../features/data-table/CustomTable'
import { RxCross2 } from 'react-icons/rx'
import { AiOutlinePlus } from 'react-icons/ai'
import { useDriverContext } from '../../../../../../services/reducer/driver.reducer'
import { toastify } from '../../../../../../features/notification/toastify'

const DocumentOther = (props : TDriverProps) => {
  const { driver_id = 0} = props
  console.log("driver_id", driver_id)
 const { getDriverOther , driverOtherListsData ,postDriverOther, driverLoading} = useDriverContext()
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [driverOtherDoc, setDriverOtherDoc] = useState<IDriverOther>(initialDriverOther);
  const [driverOtherDocList , setDriverOtherDocList] = useState<IDriverOther[]>([]);

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
useEffect(() => {
  if(driver_id > 0){
    getDriverOther(driver_id)
  }
})
  
const columns: CustomTableColumn[] = [

  {
    id: 'name',
    name: ' NAME',
    style: { width: '10%' },
    sortable: true,
    selector: (row: IDriverOther) => row.name,
    
   
  },

  {
    id: 'expiry_date',
    name: 'EXP DATE',
    style: { width: '10%' },
    sortable: true,
    selector: (row: IDriverOther) => row.expiry_date,
    format: (row: IDriverOther) =>  moment(row.expiry_date).format('L')
   
  },
  {
    id: 'notes',
    name: 'NOTES',
    style: { width: '10%' },
    sortable: true,
    selector: (row: IDriverOther) => row.notes,
   
   
  },
  {
    id: 'attachment',
    name: 'ATTACHMENTS',
    style: { width: '10%' },
    sortable: true,
    selector: (row: IDriverOther) => row.attachment,
  },
  {
    id : "action",
    name : "",
    style : {width : "10%"},
    sortable : true,
    selector : (row : IDriverOther) => row.file,
    cell: (row: IDriverOther ) => <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={()=>{ handleEditOther(row.doc_id) }} />

  },

]
  return (
    <>
      <div className="d-flex justify-content-end m-3">
        <Col md={3} className=" d-flex justify-content-end align-items-end pb-3">
          <label className="page-subtitle">
            <Button color="success"  outline={true}  onClick={() => setUploadModalOpen(true)}><AiOutlinePlus />Add</Button>
          </label>
        </Col>
      </div>
      <CustomTable columns={columns} data={driverOtherDocList} noRecordMessage="No Document found." />
      <Modal isOpen={uploadModalOpen} onClose={UploadModalClose}>
      <ModalHeader close={closeBtn}
                 onClose={() => UploadModalClose()}>
          <h6 className="mb-0 fw-bold">Edit Other </h6>
        </ModalHeader>
        <ModalBody className="square border border-info-rounded">
        <Form onSubmit={handleOtherSave} >    
        <Row>
        <Col md={6}>
        <FormGroup>
        <Label for="application_date">Name</Label>
       <Input bsSize="sm" className="form-control form-control-sm" type="text" id="application_date" name="application_date" value={driverOtherDoc.name } onChange={handleDriverInput('name')} />
        </FormGroup> 
        </Col>
        
        <Col md={6}>
        <FormGroup>
        <Label for="application_date"> Date</Label>
       <Input bsSize="sm" className="form-control form-control-sm" type="date" id="application_date" name="application_date" value={driverOtherDoc.expiry_date} onChange={handleDriverInput('expiry_date')} />
        </FormGroup>
        </Col>
       </Row>
       <Row>
        <Col md={6}>
        <FormGroup>
        <Label for="application_date">Status</Label>
       <Input bsSize="sm" className="form-control form-control-sm" type="text" id="application_date" name="application_date" value={ driverOtherDoc.notes} onChange={handleDriverInput('notes')} />
        </FormGroup> 
        </Col>
        
        <Col md={6}>
        <FormGroup>
       <Label>Upload File</Label>
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
    
    </>
  )
}

export default DocumentOther