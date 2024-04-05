import React, { useEffect, useState } from 'react'
import { IDriverMedical, TDriverProps, initialDriverMedical } from '../../../../../../services/tms-objects/driver.types'
import moment from 'moment'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { AiOutlinePlus } from 'react-icons/ai'
import { CustomTable } from '../../../../../../features/data-table/CustomTable'
import { RxCross2 } from 'react-icons/rx'
import { useDriverContext } from '../../../../../../services/reducer/driver.reducer'
import { toastify } from '../../../../../../features/notification/toastify'

const DocumentMedical = ( prop : TDriverProps) => {

  const {driver_id = 0} = prop

  const { getDriverMedicalList ,driverMedicalLists , postDriverMedical ,driverLoading } = useDriverContext()

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [driverMedical, setDriverMedical] = useState<IDriverMedical>(initialDriverMedical);
  const [driverMedicalList, setDriverMedicalList] = useState<IDriverMedical[]>([]);

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
  if(driverMedical.file){
    await postDriverMedical(driver_id,driverMedical).then((data : any ) => {
      data?.value && data && toastify({ message: data.message, type: data.success ? "success" : "error", });
      UploadModalClose();
      getDriverMedicalList(driver_id)
    })
  }
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
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverMedical) => row.card_number,
     
    },
    {
      id: 'issue_date',
      name: 'ISSUE DATE',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverMedical) => row.issue_date,
      format: (row: IDriverMedical) =>  moment(row.issue_date).format('L')
     
    },
    {
      id: 'exp_date',
      name: 'EXP DATE',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverMedical) => row.exp_date,
      format: (row: IDriverMedical) =>  moment(row.exp_date).format('L')
    },
    {
      id: 'attachment',
      name: 'ATTACHMENTS',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverMedical) => row.attachment,
    },
    {
      id : "action",
      name : "",
      style : {width : "10%"},
      sortable : true,
      selector : (row : IDriverMedical) => row.card_id,
      cell: (row: IDriverMedical ) => <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={()=>{ handleEditMedical(row.card_id) }} />

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
      <CustomTable columns={columns} data={driverMedicalList} noRecordMessage="No Document found." />
      <Modal isOpen={uploadModalOpen} onClose={UploadModalClose}>

      <ModalHeader close={closeBtn}
                 onClose={() => UploadModalClose()}>
          <h6 className="mb-0 fw-bold">Edit Medical Card </h6>
        </ModalHeader>
        <ModalBody className="square border border-info-rounded">
        <Form onSubmit={handleDriverMedicalSubmit} >

        <Row>
        <Col md={6}>
        <FormGroup>
        <Label for="application_date">Number</Label>
       <Input bsSize="sm" className="form-control form-control-sm" type="text" id="application_date" name="application_date" value={driverMedical.card_number} onChange={handleDriverInput('card_number')} />
        </FormGroup> 
        </Col>
        
        <Col md={6}>
        <FormGroup>
        <Label for="application_date">Issue Date</Label>
       <Input bsSize="sm" className="form-control form-control-sm" type="date" id="application_date" name="application_date" value={driverMedical.issue_date} onChange={handleDriverInput('issue_date')} />
        </FormGroup>
        </Col>
       </Row>
       <Row>
        <Col md={6}>
        <FormGroup>
        <Label for="application_date">Exp Date</Label>
       <Input bsSize="sm" className="form-control form-control-sm" type="date" id="application_date" name="application_date" value={driverMedical.exp_date} onChange={handleDriverInput('exp_date')} />
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

export default DocumentMedical