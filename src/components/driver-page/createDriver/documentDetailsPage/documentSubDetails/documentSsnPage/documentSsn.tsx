
import React, { useEffect, useState } from 'react'
import { IDriverSSn, TDriverProps, initialDriverSsn } from '../../../../../../services/tms-objects/driver.types'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { AiOutlinePlus } from 'react-icons/ai'
import { Col, Button, Modal, ModalHeader, ModalBody, FormGroup, Input, Label, Row, Form } from 'reactstrap'
import { CustomTable } from '../../../../../../features/data-table/CustomTable'
import { RxCross2 } from 'react-icons/rx'
import { useDriverContext } from '../../../../../../services/reducer/driver.reducer'
import { toastify } from '../../../../../../features/notification/toastify'


const DocumentSsn = ( props : TDriverProps) => {

  const { driver_id = 0 } = props

  const { getDriverSsn ,driverLoading , driverSsnListsData , postDriverSsn} = useDriverContext();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [driverSsn, setDriverSsn] = useState<IDriverSSn>(initialDriverSsn);
  const [driverSsnList , setDriverSsnList] = useState<IDriverSSn[]>([]);

  const UploadModalClose = () => {
    setUploadModalOpen(false);
    setDriverSsn(initialDriverSsn);
  }

  const handleEditSsn = (id:number) => {
    const filteredData = driverSsnList?.filter(l=>l.ssn_id == id)
    if (filteredData && filteredData.length>0) {      
      setDriverSsn(filteredData[0])
    }
    setUploadModalOpen(true)
   }

   useEffect(()=>{
    if(!driverLoading && driverSsnListsData){
      setDriverSsnList(driverSsnListsData);
    }
  },[driverLoading, driverSsnListsData])

   const closeBtn = (
    <button
      className="border-0 bg-transparent text-white"
      type="button"
      onClick={() => UploadModalClose()}
    >  
      <RxCross2 />
    </button>
  
  );

  const handleDriverInput = (prop: keyof IDriverSSn) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setDriverSsn({ ...driverSsn, [prop]: event.target.value });
  };

  const handleFileUpload = async(event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {      
      setDriverSsn({
        ...driverSsn,
        file : event.target.files[0]
      })
    }
  }
  const handleDriverSave = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(driverSsn.file){
      await postDriverSsn(driver_id, driverSsn).then((data : any ) => {
        data?.value && data && toastify({ message: data.message, type: data.success ? "success" : "error", });
        UploadModalClose();
        getDriverSsn(driver_id)
      })
    }
  }

  useEffect(() => {
    if(driver_id > 0)
    getDriverSsn( driver_id);
}, [])

  const columns: CustomTableColumn[] = [

    {
      id: 'ss_number',
      name: ' NUMBER',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverSSn) => row.ss_number,
      
     
    },
    
    {
      id: 'attachment',
      name: 'ATTACHMENTS',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverSSn) => row.attachment,
    },
    {
      id : "action",
      name : "",
      style : {width : "10%"},
      sortable : true,
      selector : (row : IDriverSSn) => row.ssn_id,
      cell: (row: IDriverSSn ) => <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={()=>{ handleEditSsn(row.ssn_id) }} />
  
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
      <CustomTable columns={columns} data={driverSsnList} noRecordMessage="No Document found." />
      <Modal isOpen={uploadModalOpen} onClose={UploadModalClose}>
      <ModalHeader close={closeBtn}
                 onClose={() => UploadModalClose()}>
          <h6 className="mb-0 fw-bold">Edit SSN </h6>
        </ModalHeader>
        <ModalBody className="square border border-info-rounded">
          <Form onSubmit={handleDriverSave}>
        <Row>
        <Col md={6}>
        <FormGroup>
        <Label for="application_date">Number</Label>
       <Input bsSize="sm" className="form-control form-control-sm" type="text" id="application_date" name="application_date" value={driverSsn.ss_number} onChange={handleDriverInput('ss_number')} />
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

export default DocumentSsn