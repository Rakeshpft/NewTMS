import React, { useEffect, useState } from 'react'
import { IDriverMvr, TDriverProps, initialDriverMvr } from '../../../../../../services/tms-objects/driver.types'
import { AiOutlinePlus } from 'react-icons/ai'
import { Col, Button, Modal, ModalHeader, ModalBody, FormGroup, Input, Label, Row, Form } from 'reactstrap'
import moment from 'moment'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { CustomTable } from '../../../../../../features/data-table/CustomTable'
import { RxCross2 } from 'react-icons/rx'
import { useDriverContext } from '../../../../../../services/reducer/driver.reducer'
import { toastify } from '../../../../../../features/notification/toastify'

const DocumentMvr = ( prop : TDriverProps) => {

  const { driver_id = 0 } = prop;
  const { getDriverMvr , driverMvrLists , postDriverMvr ,driverLoading  } = useDriverContext()
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [driverMvr, setDriverMvr] = useState<IDriverMvr>(initialDriverMvr);
  const [driverMvrList , setDriverMvrList] = useState<IDriverMvr[]>([]);

const UploadModalClose = () => {
  setUploadModalOpen(false);
  setDriverMvr(initialDriverMvr);
}

useEffect(()=>{
  if(!driverLoading && driverMvrLists){
    setDriverMvrList(driverMvrLists);
  }
},[driverLoading, driverMvrLists])

const handleDriverInput = (prop: keyof IDriverMvr) => (event: React.ChangeEvent<HTMLInputElement>) => {
  setDriverMvr({ ...driverMvr, [prop]: event.target.value });
}
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

useEffect(() => {
  if (driver_id>0) {
    getDriverMvr(driver_id)
  }
}, [])
  const columns: CustomTableColumn[] = [

    {
      id: 'date',
      name: ' DATE',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverMvr) => row.date,
      format: (row: IDriverMvr) =>  moment(row.date).format('L')
     
    },
    
    {
      id: 'attachment',
      name: 'ATTACHMENTS',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverMvr) => row.attachment,
      cell:(row:IDriverMvr)=><a href={row.attachment_url} target='_blank' download={true}>{row.attachment}</a>

    },
    {
      id : "action",
      name : "",
      style : {width : "10%"},
      sortable : true,
      selector : (row : IDriverMvr) => row.mvr_id,
      cell: (row: IDriverMvr ) => <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={()=>{ handleEditMvr(row.mvr_id) }} />
  
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
      <CustomTable columns={columns} data={driverMvrList} noRecordMessage="No Document found." />
      <Modal isOpen={uploadModalOpen} onClose={UploadModalClose}>
      <ModalHeader close={closeBtn}
                 onClose={() => UploadModalClose()}>
          <h6 className="mb-0 fw-bold">Edit MVR </h6>
        </ModalHeader>
        <ModalBody className="square border border-info-rounded">
          <Form onSubmit={handleSaveMvr}>
        <Row>
        <Col md={6}>
        <FormGroup>
        <Label for="application_date">Status</Label>
       <Input bsSize="sm" className="form-control form-control-sm" type="text" id="application_date" name="application_date" value={driverMvr.date} onChange={handleDriverInput('date')} />
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

export default DocumentMvr