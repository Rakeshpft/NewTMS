import React, { useEffect, useState } from "react";
import { HiOutlineDocumentDownload, HiOutlinePencilAlt } from "react-icons/hi";
import { IDriverEmpVerify, TDriverProps, initialDriverEmpVerify } from "../../../../services/tms-objects/driver.types";
import { Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { CustomTable } from "../../../../features/data-table/CustomTable";
import { RxCross2 } from "react-icons/rx";
import { useDriverContext } from "../../../../services/reducer/driver.reducer";
import { toastify } from "../../../../features/notification/toastify";
import { isEmpty } from "lodash";
import ReactDatePicker from "react-datepicker";
import { Dictionary, Convert, Helper } from "../../../../features/shared/helper";
import { useListContext } from "../../../../services/reducer/list.reducer";


const DocumentEmpVerify = ( props : TDriverProps) => {

  const { driver_id= 0 } = props

const { driverEmpVerifyList , getDriverEmpVerify,  driverLoading ,deleteDriverEmpVerify , postDriverEmpVerify} = useDriverContext();
const {getDocumentStatusList , documentStatusList } = useListContext()
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [driverEmpVerification, setDriverEmpVerification] = useState<IDriverEmpVerify>(initialDriverEmpVerify);
  const [driverEmpVerificationList, setDriverEmpVerificationList] = useState<IDriverEmpVerify[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<IDriverEmpVerify[] | []>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

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
  getDocumentStatusList()
},[])

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

const closeDeleteModal = () => {
  setDeleteModalOpen(false);
  setSelectedDriver([]);
};

const handleDriverInput = (prop: keyof IDriverEmpVerify) => (event: React.ChangeEvent<HTMLInputElement>) => {
  setDriverEmpVerification({ ...driverEmpVerification, [prop]: event.target.value })
}

const handleSaveDrverEmp = async (event: React.ChangeEvent<HTMLFormElement>) => {
   
  

  let employeeDetails : IDriverEmpVerify = driverEmpVerification;

  employeeDetails.status_id = documentStatusList && documentStatusList.length > 0 &&  driverEmpVerification.status_id == 0  ? documentStatusList[0].status_id : driverEmpVerification.status_id

  event.preventDefault();
  if(employeeDetails.file || employeeDetails.verification_id > 0){
    await postDriverEmpVerify( driver_id, employeeDetails).then((response : any ) => {
      response?.value && employeeDetails && toastify({ message: response.message, type: response.success ? "success" : "error", });  
     
    })
  }
  getDriverEmpVerify(driver_id)
  UploadModalClose();
}

const handleDeleteDriver = async () => {
    
  const  deleteDriverDrugIdId = selectedDriver.map(driverId => driverId.verification_id)

 await deleteDriverEmpVerify( driver_id , deleteDriverDrugIdId).then((response) => {
  response &&  response.message && toastify({ message: response.message, type: (response.success ? "success" : "error") })
 }

 )
  closeDeleteModal();
  getDriverEmpVerify(driver_id);
  setSelectedDriver([]);
}

useEffect(() => {
  if (driver_id > 0) {
    getDriverEmpVerify(driver_id)
  }
} ,[])

  const columns: CustomTableColumn[] = [
    {
      id: 'status_name',
      name: ' STATUS',
      style: { width: '20%' },
      sortable: true,
      selector: (row: IDriverEmpVerify) => row.status_name,
    },  
    {
      id: 'date',
      name: 'DATE',
      style: { width: '20%' },
      sortable: true,
      selector: (row: IDriverEmpVerify) => row.date,
      format: (row: IDriverEmpVerify) =>  Convert.ToUserDate(row.date)     
    },
    {
      id: 'notes',
      name: 'NOTES',
      style: { width: '40%' },
      sortable: true,
      selector: (row: IDriverEmpVerify) => row.note,
    },
    {
      id : "action",
      name : "",
      style : {width : "15%"},
      sortable : false,
      align:'center',
      selector : (row : IDriverEmpVerify) => row.verification_id,
      cell: (row: IDriverEmpVerify ) => 
      <>
        <HiOutlineDocumentDownload className='me-2' size={22} style={{ cursor: "pointer" }} onClick={()=>{Helper.FileDownload(row.attachment_url)}} />
        <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={()=>{ handleEditEmpVerify(row.verification_id) }} />
      </>  
    },
  ]

  return (
    <>
      <div className="d-flex justify-content-end m-3">
        <Col md={3} className=" d-flex justify-content-end align-items-end pb-3 column-gap-3">
          {!isEmpty(selectedDriver) && (
            <div className="user-info-btn">
              <Button color="primary" onClick={() => setDeleteModalOpen(true)}>
                Delete
              </Button>
            </div>
          )}
          <label className="page-subtitle mb-0">
            <Button color="success" outline={true} onClick={() => setUploadModalOpen(true)}>
              <AiOutlinePlus />
              Add
            </Button>
          </label>
        </Col>
      </div>

      <CustomTable columns={columns} data={driverEmpVerificationList} noRecordMessage="No Document found." canSelectRows={true} selectedTableRows={selectedDriver} setSelectionTableRows={setSelectedDriver} />
      <Modal isOpen={uploadModalOpen} onClose={UploadModalClose}>
        <ModalHeader close={closeBtn} onClose={() => UploadModalClose()}>
          <h6 className="mb-0 fw-bold">{driverEmpVerification.verification_id ? "Edit employee verification" : "Add employee verification"}</h6>
        </ModalHeader>
        <ModalBody className="square border border-info-rounded">
          <Form onSubmit={handleSaveDrverEmp}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="application_date">Status</Label>
                  <Input bsSize="sm" className="form-control form-control-sm" type="select" id="application_date" name="application_date" value={driverEmpVerification.status_id} onChange={handleDriverInput("status_id")}>
                    <option value={0}> Select Status</option>
                    {documentStatusList &&  documentStatusList.length > 0 &&  documentStatusList.map((status) => (                    
                        <option key={status.status_id} value={status.status_id}>{status.status_name} </option>
                      ))}
                  </Input>
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label for="application_date">Date</Label>
                  <ReactDatePicker showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event) => {  event.preventDefault(); }} placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="purchase_date"  className="form-control form-control-sm"  onChange={(date) => { setDriverEmpVerification({ ...driverEmpVerification, date: Convert.ToISODate(date) }); }} selected={Convert.ToDate(driverEmpVerification.date)}/>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="application_date">Notes</Label>
                  <Input bsSize="sm" className="form-control form-control-sm" type="text" id="application_date" name="application_date" value={driverEmpVerification.note} onChange={handleDriverInput("note")} />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label>Attachments</Label>
                  <Input type="file" name="file" id="file" onChange={handleFileUpload} />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup className=" d-flex justify-content-end mt-3 column-gap-2 ">
              <Button color="primary" className="px-4 mr-3 shadow save-button" type="submit">
                Save
              </Button>
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
                {selectedDriver.length > 1 ? (
                  <div>
                    You have selected {selectedDriver.length} employee verifications.
                    <br />
                  </div>
                ) : null}
                Are you sure you want to delete?
              </div>
            )}
            <FormGroup className=" d-flex justify-content-end mt-3 column-gap-2 ">
              <Button color="primary" className="px-4 mr-3 shadow save-button  " onClick={() => closeDeleteModal()}>
                Cancel
              </Button>

              <Button color="primary" className="px-4  shadow save-button " onClick={() => handleDeleteDriver()}>
                Delete
              </Button>
            </FormGroup>
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};

export default DocumentEmpVerify;
