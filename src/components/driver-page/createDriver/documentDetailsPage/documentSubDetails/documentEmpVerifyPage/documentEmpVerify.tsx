import React, { useEffect, useState } from "react";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { IDriverEmpVerify, TDriverProps, initialDriverEmpVerify } from "../../../../../../services/tms-objects/driver.types";
import moment from "moment";
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { CustomTable } from "../../../../../../features/data-table/CustomTable";
import { RxCross2 } from "react-icons/rx";
import { useDriverContext } from "../../../../../../services/reducer/driver.reducer";
import { toastify } from "../../../../../../features/notification/toastify";


const DocumentEmpVerify = ( props : TDriverProps) => {

  const { driver_id= 0 } = props

const { driverEmpVerifyList , getDriverEmpVerify,  driverLoading , postDriverEmpVerify} = useDriverContext();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [driverEmpVerification, setDriverEmpVerification] = useState<IDriverEmpVerify>(initialDriverEmpVerify);
  const [driverEmpVerificationList, setDriverEmpVerificationList] = useState<IDriverEmpVerify[]>([]);

  const UploadModalClose = () => {
    setUploadModalOpen(false);
    setDriverEmpVerification(initialDriverEmpVerify);
  }
const handleEditEmpVerify = (id:number) => {
  const filteredData = driverEmpVerificationList?.filter(l=>l.verification_id == id)
  if (filteredData && filteredData.length>0) {      
    setDriverEmpVerification(filteredData[0])
  }
  setUploadModalOpen(true);
 }

 const handleFileUpload = async(event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files) {      
    setDriverEmpVerification({
      ...driverEmpVerification,
      file : event.target.files[0]
    })
  }
}

useEffect(()=>{
  if(!driverLoading && driverEmpVerifyList ){
    setDriverEmpVerificationList(driverEmpVerifyList);
  }
},[driverLoading, driverEmpVerifyList])

const closeBtn = (
  <button
    className="border-0 bg-transparent text-white"
    type="button"
    onClick={() => UploadModalClose()}
  >
     
    <RxCross2 />
  </button>
);

const handleDriverInput = (prop: keyof IDriverEmpVerify) => (event: React.ChangeEvent<HTMLInputElement>) => {
  setDriverEmpVerification({ ...driverEmpVerification, [prop]: event.target.value })
}

const handleSaveDrverEmp = async (event: React.ChangeEvent<HTMLFormElement>) => {
  event.preventDefault();
  if(driverEmpVerification.file){
    await postDriverEmpVerify( driver_id, driverEmpVerification).then((data : any ) => {
      data?.value && data && toastify({ message: data.message, type: data.success ? "success" : "error", });
      
     
    })
  }
  getDriverEmpVerify(driver_id)
  UploadModalClose();
}
useEffect(() => {
  if (driver_id > 0) {
    getDriverEmpVerify(driver_id)
  }
} ,[])

  const columns: CustomTableColumn[] = [

    {
      id: 'status_id',
      name: ' STATUS',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverEmpVerify) => row.status_name,
      
     
    },
  
    {
      id: 'date',
      name: 'DATE',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverEmpVerify) => row.date,
      format: (row: IDriverEmpVerify) =>  moment(row.date).format('L')
     
    },
    {
      id: 'notes',
      name: 'NOTES',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverEmpVerify) => row.note,
     
     
    },
    {
      id: 'attachment',
      name: 'ATTACHMENTS',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverEmpVerify) => row.attachment,
    },
    {
      id : "action",
      name : "",
      style : {width : "10%"},
      sortable : true,
      selector : (row : IDriverEmpVerify) => row.verification_id,
      cell: (row: IDriverEmpVerify ) => <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={()=>{ handleEditEmpVerify(row.verification_id) }} />
  
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
      <CustomTable columns={columns} data={driverEmpVerificationList} noRecordMessage="No Document found." />
      <Modal isOpen={uploadModalOpen} onClose={UploadModalClose}>
      <ModalHeader close={closeBtn}
                 onClose={() => UploadModalClose()}>
          <h6 className="mb-0 fw-bold">Edit Employee Verification </h6>
        </ModalHeader>
        <ModalBody className="square border border-info-rounded">
        <Form onSubmit={handleSaveDrverEmp}>    
        <Row>
        <Col md={6}>
        <FormGroup>
        <Label for="application_date">Status</Label>
       <Input bsSize="sm" className="form-control form-control-sm" type="text" id="application_date" name="application_date" value={driverEmpVerification.status_id} onChange={handleDriverInput('status_id')} />
        </FormGroup> 
        </Col>
        
        <Col md={6}>
        <FormGroup>
        <Label for="application_date"> Date</Label>
       <Input bsSize="sm" className="form-control form-control-sm" type="date" id="application_date" name="application_date" value={driverEmpVerification.date} onChange={handleDriverInput('date')} />
        </FormGroup>
        </Col>
       </Row>
       <Row>
        <Col md={6}>
        <FormGroup>
        <Label for="application_date">Notes</Label>
       <Input bsSize="sm" className="form-control form-control-sm" type="text" id="application_date" name="application_date" value={driverEmpVerification.note} onChange={handleDriverInput('note')} />
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
  );
};

export default DocumentEmpVerify;
