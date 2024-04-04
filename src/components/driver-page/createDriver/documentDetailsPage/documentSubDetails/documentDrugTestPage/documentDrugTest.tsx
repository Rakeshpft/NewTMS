import React, { useEffect, useState } from 'react'
import { IDriverDrugTest, TDriverProps, initialDriverDrugTest } from '../../../../../../services/tms-objects/driver.types';
import moment from 'moment';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { AiOutlinePlus } from 'react-icons/ai';
import { Col, Button, Modal, ModalHeader, ModalBody, Form, Row, FormGroup, Input, Label } from 'reactstrap';
import { CustomTable } from '../../../../../../features/data-table/CustomTable';
import { RxCross2 } from 'react-icons/rx';
import { useDriverContext } from '../../../../../../services/reducer/driver.reducer';
import { toastify } from '../../../../../../features/notification/toastify';



const DocumentDrugTest = ( props : TDriverProps) => {

  const { driver_id = 0 } = props
 
  const { getDriverDrugList ,driverDrugLists, postDriverDrugTest , driverLoading } = useDriverContext();
  
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [driverDrugTest, setdriverDrugTest] = useState<IDriverDrugTest>(initialDriverDrugTest);
  const [driverDrugTestList, setDriverDrugTestList] = useState<IDriverDrugTest[]>([]);

  

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
        <Col md={3} className=" d-flex justify-content-end align-items-end pb-3">
          <label className="page-subtitle">
            <Button color="success"  outline={true}  onClick={() => setUploadModalOpen(true)}><AiOutlinePlus />Add</Button>
          </label>
        </Col>
      </div>
      <CustomTable columns={columns} data={driverDrugTestList} noRecordMessage="No Document found." />
      <Modal isOpen={uploadModalOpen} onClose={UploadModalClose}>
      <ModalHeader close={closeBtn}
                 onClose={() => UploadModalClose()}>
          <h6 className="mb-0 fw-bold">Edit Application </h6>
        </ModalHeader>

        <ModalBody className="square border border-info-rounded">
        <Form onSubmit={handleDriverSubmit}>
           
        <Row>
        <Col md={6}>
        <FormGroup>
        <Label for="application_date">Status</Label>
       <Input bsSize="sm" className="form-control form-control-sm" type="text" id="application_date" name="application_date" value={driverDrugTest.status_id} onChange={handleDriverInput('status_id')} />
        </FormGroup> 
        </Col>
        
        <Col md={6}>
        <FormGroup>
        <Label for="application_date"> Date</Label>
       <Input bsSize="sm" className="form-control form-control-sm" type="date" id="application_date" name="application_date" value={driverDrugTest.date} onChange={handleDriverInput('date')} />
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
       <Label>Upload File</Label>
       <Input type="file" name="file" id="file" onChange={handleFileUpload}  /> 
           </FormGroup>
        </Col>
       </Row>

        </Form>
        </ModalBody>
        </Modal>

   </>
  )
}

export default DocumentDrugTest