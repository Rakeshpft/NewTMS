import React, { useEffect, useState } from 'react'
import { IDriverDrugTest, TDriverProps, initialDriverDrugTest } from '../../../../services/tms-objects/driver.types';

import { HiOutlineDocumentDownload, HiOutlinePencilAlt } from 'react-icons/hi';
import { AiOutlinePlus } from 'react-icons/ai';
import { Col, Button, Modal, ModalHeader, ModalBody, Form, Row, FormGroup, Input, Label, Container } from 'reactstrap';
import { CustomTable } from '../../../../features/data-table/CustomTable';
import { RxCross2 } from 'react-icons/rx';
import { useDriverContext } from '../../../../services/reducer/driver.reducer';
import { toastify } from '../../../../features/notification/toastify';
import { isEmpty } from 'lodash';
import ReactDatePicker from 'react-datepicker';
import { useListContext } from '../../../../services/reducer/list.reducer';
import { IDocumentStatusObject } from '../../../../services/tms-objects/list.types';
import { Convert, Dictionary, Helper } from '../../../../features/shared/helper';



const DocumentDrugTest = ( props : TDriverProps) => {
  const { driver_id = 0 } = props 
  const { getDriverDrugList ,driverDrugLists, postDriverDrugTest ,deleteDriverDrugTest } = useDriverContext();
  const {getDocumentStatusList , documentStatusList } = useListContext();  
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [driverDrugTest, setdriverDrugTest] = useState<IDriverDrugTest>(initialDriverDrugTest);
  const [driverDrugTestList, setDriverDrugTestList] = useState<IDriverDrugTest[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<IDriverDrugTest[] | []>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const UploadModalClose = () => {
    setUploadModalOpen(false);
  }

  useEffect(()=>{
    if( driverDrugLists){
      setDriverDrugTestList(driverDrugLists);
    }
  },[ driverDrugLists])

  useEffect(() => {
    if( documentStatusList && documentStatusList.length > 0 && driverDrugTest.status_id == 0){
      setdriverDrugTest({...driverDrugTest, status_id : documentStatusList[0].status_id})
    }  
  } , [driverDrugTest]);

  const handleEditDrugTest = (id:number) => {
    if(id>0){
      const filteredData = driverDrugTestList?.filter(l=>l.drug_test_id == id)
      if (filteredData && filteredData.length>0) {      
        setdriverDrugTest(filteredData[0])
      }
    }
    else{
      setdriverDrugTest(initialDriverDrugTest);
    }
    setUploadModalOpen(true);
  }

  const handleDriverInput = (prop: keyof IDriverDrugTest) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setdriverDrugTest({ ...driverDrugTest, [prop]: event.target.value });
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

const handleFileUpload = async(event: React.ChangeEvent<HTMLInputElement>) => {
  if (event.target.files) {      
    setdriverDrugTest({
      ...driverDrugTest,
      file : event.target.files[0]
    })
  }
}
const handleDriverSubmit  = async (event: React.ChangeEvent<HTMLFormElement>) => {

  event.preventDefault();
   
  


  let drugDetails  :IDriverDrugTest = driverDrugTest 
  
  drugDetails.status_id = documentStatusList && documentStatusList.length > 0 && driverDrugTest.status_id == 0 ? documentStatusList[0].status_id : driverDrugTest.status_id

  if(drugDetails.file || drugDetails.drug_test_id > 0){
    await postDriverDrugTest(driver_id, drugDetails).then((response : any ) => {
      response?.value && drugDetails && toastify({ message: response.message, type: response.success ? "success" : "error", });
      UploadModalClose();
      getDriverDrugList(driver_id)
    })
  }
}

const handleDeleteDriver = async () => {
    
  const  deleteDriverDrugIdId = selectedDriver.map(driverId => driverId.drug_test_id)

 await deleteDriverDrugTest( driver_id , deleteDriverDrugIdId).then((response) => {
  response &&  response.message && toastify({ message: response.message, type: (response.success ? "success" : "error") })
 }

 )
  closeDeleteModal();
  getDriverDrugList(driver_id);
  setSelectedDriver([]);
}


useEffect(() => {
  getDocumentStatusList()
},[])

useEffect(() => {
  if(driver_id > 0){
    getDriverDrugList(driver_id)
  }

}, [])



const columns: CustomTableColumn[] = [
  {
    id: 'status_id',
    name: 'STATUS',
    style: { width: '20%' },
    sortable: true,
    selector: (row: IDriverDrugTest) => row.status_name,   
  },
  {
    id: 'date',
    name: ' DATE',
    style: { width: '20%' },
    sortable: true,
    selector: (row: IDriverDrugTest) => row.date,
    format: (row: IDriverDrugTest) =>  Convert.ToUserDate(row.date)   
  },
  {
    id: 'note',
    name: 'NOTES',
    style: { width: '40%' },
    sortable: true,
    selector: (row: IDriverDrugTest) => row.note,
  },    
  {
    id : "action",
    name : "",
    style : {width : "15%"},
    sortable : false,
    align:'center',
    selector : (row : IDriverDrugTest) => row.drug_test_id,
    cell: (row: IDriverDrugTest ) => 
    <>
    <HiOutlineDocumentDownload className='me-2' size={22} style={{ cursor: "pointer" }} onClick={()=>{Helper.FileDownload(row.attachment_url)}} />
    <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={()=>{ handleEditDrugTest(row.drug_test_id) }} />
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
    
      <CustomTable columns={columns} data={driverDrugTestList} noRecordMessage="No Document found." canSelectRows={true} selectedTableRows={selectedDriver} setSelectionTableRows={setSelectedDriver} />
      <Modal isOpen={uploadModalOpen} onClose={UploadModalClose}>
      <ModalHeader close={closeBtn}
                 onClose={() => UploadModalClose()}>
          <h6 className="mb-0 fw-bold">{ driverDrugTest.drug_test_id > 0 ? "Edit drug test" : "Add drug test"} </h6>
        </ModalHeader>

        <ModalBody className="square border border-info-rounded">
        <Form onSubmit={handleDriverSubmit}>
           
        <Row>
        <Col md={6}>
        <FormGroup>
        <Label for="status">Status</Label>
       <Input bsSize="sm" className="form-control form-control-sm" type="select" id="status" name="status" value={driverDrugTest.status_id} onChange={handleDriverInput('status_id')} required >
        <option >Select Status</option>
         {
            documentStatusList && documentStatusList.map((status : IDocumentStatusObject) => (
              <option key={status.status_id} value={status.status_id}>{status.status_name}</option>
            ))
          }
       </Input>
        </FormGroup> 
        </Col>
        
        <Col md={6}>
        <FormGroup>
        <Label for="drug_date"> Date</Label>
        <ReactDatePicker  showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event)=>{event.preventDefault()}} placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="drug_date" className="form-control form-control-sm" onChange={(date) => { setdriverDrugTest({ ...driverDrugTest, date: Convert.ToISODate(date) }) }} selected={Convert.ToDate(driverDrugTest.date)} required  />       
         </FormGroup>
        </Col>
       </Row>
       <Row>
        <Col md={6}>
        <FormGroup>
        <Label for="application_date">Notes</Label>
       <Input bsSize="sm" className="form-control form-control-sm" type="text" id="application_date" name="application_date" value={driverDrugTest.note} onChange={handleDriverInput('note')} />
        </FormGroup> 
        </Col>
        
        <Col md={6}>
        <FormGroup>
         <Label>Attachments</Label>
         <Input type="file" name="file" id="file" onChange={handleFileUpload} required  /> 
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
                     {selectedDriver.length > 1?(<div>You have selected {selectedDriver.length} drug tests.<br /></div>):null}
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

export default DocumentDrugTest