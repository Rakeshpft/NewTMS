import React, { useEffect, useState } from 'react'
import { IDriverDrugTest, TDriverProps, initialDriverDrugTest } from '../../../../services/tms-objects/driver.types';
import moment from 'moment';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { AiOutlinePlus } from 'react-icons/ai';
import { Col, Button, Modal, ModalHeader, ModalBody, Form, Row, FormGroup, Input, Label, Container } from 'reactstrap';
import { CustomTable } from '../../../../features/data-table/CustomTable';
import { RxCross2 } from 'react-icons/rx';
import { useDriverContext } from '../../../../services/reducer/driver.reducer';
import { toastify } from '../../../../features/notification/toastify';
import { isEmpty } from 'lodash';
import ReactDatePicker from 'react-datepicker';
import { Dictionary, Convert } from '../../../../features/validation/general-helper';



const DocumentDrugTest = ( props : TDriverProps) => {

  const { driver_id = 0 } = props
 
  const { getDriverDrugList ,driverDrugLists, postDriverDrugTest ,deleteDriverDrugTest, driverLoading } = useDriverContext();
  
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [driverDrugTest, setdriverDrugTest] = useState<IDriverDrugTest>(initialDriverDrugTest);
  const [driverDrugTestList, setDriverDrugTestList] = useState<IDriverDrugTest[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<IDriverDrugTest[] | []>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  

  

  const UploadModalClose = () => {
    setUploadModalOpen(false);
    setdriverDrugTest(initialDriverDrugTest);
  }

  useEffect(()=>{
    if(!driverLoading && driverDrugLists){
      setDriverDrugTestList(driverDrugLists);
    }
  },[driverLoading, driverDrugLists])

  const handleEditDrugTest = (id:number) => {
    const filteredData = driverDrugTestList?.filter(l=>l.drug_test_id == id)
    if (filteredData && filteredData.length>0) {      
      setdriverDrugTest(filteredData[0])
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
  if(driverDrugTest.file){
    await postDriverDrugTest(driver_id, driverDrugTest).then((data : any ) => {
      data?.value && data && toastify({ message: data.message, type: data.success ? "success" : "error", });
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
  if(driver_id > 0){
    getDriverDrugList(driver_id)
  }

}, [])

const columns: CustomTableColumn[] = [

  {
    id: 'status_id',
    name: 'STATUS',
    style: { width: '10%' },
    sortable: true,
    selector: (row: IDriverDrugTest) => row.status_id,
   
  },
  {
    id: 'date',
    name: ' DATE',
    style: { width: '10%' },
    sortable: true,
    selector: (row: IDriverDrugTest) => row.date,
    format: (row: IDriverDrugTest) =>  moment(row.date).format('L')
   
  },
  {
    id: 'note',
    name: 'NOTES',
    style: { width: '10%' },
    sortable: true,
    selector: (row: IDriverDrugTest) => row.note,
    format: (row: IDriverDrugTest) =>  moment(row.note).format('L')
  },
  {
    id: 'attachment',
    name: 'ATTACHMENTS',
    style: { width: '10%' },
    sortable: true,
    selector: (row: IDriverDrugTest) => row.attachment,
    cell:(row:IDriverDrugTest)=><a href={row.attachment_url} target='_blank' download={true}>{row.attachment}</a>

  },
  {
    id : "action",
    name : "",
    style : {width : "10%"},
    sortable : true,
    selector : (row : IDriverDrugTest) => row.drug_test_id,
    cell: (row: IDriverDrugTest ) => <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={()=>{ handleEditDrugTest(row.drug_test_id) }} />

  }
]
  return (
    <>
   <div className="d-flex justify-content-end m-3">
        <Col md={3} className=" d-flex justify-content-end align-items-end pb-3" column-gap="3">
        {!isEmpty(selectedDriver) && (
                  <div className="user-info-btn">

                    <Button color="primary" onClick={() => setDeleteModalOpen(true)}>Delete</Button>
                  </div>
                )}
          <label className="page-subtitle">
            <Button color="success"  outline={true}  onClick={() => setUploadModalOpen(true)}><AiOutlinePlus />Add</Button>
          </label>
        </Col>
      </div>
      <div className="user-info-btn-wrapper">
                {!isEmpty(selectedDriver) && (
                  <div className="user-info-btn">

                    <Button color="primary" onClick={() => setDeleteModalOpen(true)}>Delete</Button>
                  </div>
                )}
              </div>
      <CustomTable columns={columns} data={driverDrugTestList} noRecordMessage="No Document found." canSelectRows={true} selectedTableRows={selectedDriver} setSelectionTableRows={setSelectedDriver} />
      <Modal isOpen={uploadModalOpen} onClose={UploadModalClose}>
      <ModalHeader close={closeBtn}
                 onClose={() => UploadModalClose()}>
          <h6 className="mb-0 fw-bold">Edit Drug TEst </h6>
        </ModalHeader>

        <ModalBody className="square border border-info-rounded">
        <Form onSubmit={handleDriverSubmit}>
           
        <Row>
        <Col md={6}>
        <FormGroup>
        <Label for="application_date">STATUS</Label>
       <Input bsSize="sm" className="form-control form-control-sm" type="text" id="application_date" name="application_date" value={driverDrugTest.status_id} onChange={handleDriverInput('status_id')} />
        </FormGroup> 
        </Col>
        
        <Col md={6}>
        <FormGroup>
        <Label for="application_date"> DATE</Label>
        <ReactDatePicker showYearDropdown showMonthDropdown placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="purchase_date" className="form-control form-control-sm" onChange={(date)=>{setdriverDrugTest({...driverDrugTest, date: Convert.ToISODate(date) })}} selected={Convert.ToDate(driverDrugTest.date)} ></ReactDatePicker>
        </FormGroup>
        </Col>
       </Row>
       <Row>
        <Col md={6}>
        <FormGroup>
        <Label for="application_date">NOTES</Label>
       <Input bsSize="sm" className="form-control form-control-sm" type="text" id="application_date" name="application_date" value={driverDrugTest.note} onChange={handleDriverInput('note')} />
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
                    <div className=" my-3 ">
                      {selectedDriver.length > 1
                        ? `Are you sure you want to delete ${selectedDriver.length} customers?`
                        : `Are you sure you want to delete customer "${selectedDriver[0].drug_test_id} "?`}
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