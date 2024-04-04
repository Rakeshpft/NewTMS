import React, { useEffect, useState } from 'react'
import { IDriverCdl, TDriverProps, initialDriverCdl } from '../../../../../../services/tms-objects/driver.types'
import moment from 'moment';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { AiOutlinePlus } from 'react-icons/ai';
import { CustomTable } from '../../../../../../features/data-table/CustomTable';
import { useDriverContext } from '../../../../../../services/reducer/driver.reducer';
import { RxCross2 } from 'react-icons/rx';
import { toastify } from '../../../../../../features/notification/toastify';
import { useListContext } from '../../../../../../services/reducer/list.reducer';

const DocumentCdl = ( prop : TDriverProps) => {

  const {  driver_id = 0 } = prop
  const { getDriverCdlList , driverCdlLists, postDriverCdl ,driverLoading } = useDriverContext()

   const { getStateList, stateList } = useListContext();

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [driverCdl, setDriverCdl] = useState<IDriverCdl>(initialDriverCdl);
  const [driverCdlList, setDriverCdlList] = useState<IDriverCdl[]>([]);

  const handleEditCdl = (id:number) => {
    const filteredData = driverCdlList?.filter(l=>l.cdl_id == id)
    if (filteredData && filteredData.length>0) {      
      setDriverCdl(filteredData[0])
    }
    setUploadModalOpen(true);

  }
  const handleDriverInput = (prop: keyof IDriverCdl) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setDriverCdl({ ...driverCdl, [prop]: event.target.value });
  }

  const UploadModalClose = () => {
    setUploadModalOpen(false);
    setDriverCdl(initialDriverCdl);
  }

  const handleFileUpload = async(event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {      
      setDriverCdl({
        ...driverCdl,
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
    if(!driverLoading && driverCdlLists){
      setDriverCdlList(driverCdlLists);
    }
  },[driverLoading,driverCdlLists])

  const handleSaveDriverCdl = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(driverCdl.file){
      await postDriverCdl( driver_id, driverCdl).then((data : any ) => {
        data?.value && data && toastify({ message: data.message, type: data.success ? "success" : "error", });
        
       
      })
    }
    getDriverCdlList(driver_id)
    UploadModalClose();
  }

  useEffect(() => {
    if(driver_id > 0){
      getDriverCdlList(driver_id) 
    }
    getStateList();
   
  }, [])

  


  const columns: CustomTableColumn[] = [

    {
      id: 'status_id',
      name: 'Number',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverCdl) => row.cdl_number,
     
    },
    {
      id: 'state',
      name: 'State',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverCdl) => row.state_name,
     

    },
    {
      id: 'issue_date',
      name: 'Issue Date',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverCdl) => row.issue_date,
      format: (row: IDriverCdl) =>  moment(row.issue_date).format('L')
    },
    {
      id: 'exp_date',
      name: 'Exp Date',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverCdl) => row.exp_date,
      format: (row: IDriverCdl) =>  moment(row.exp_date).format('L')
    },
    
    {
      id: 'attachment',
      name: 'Attachment',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverCdl) => row.attachment
    },
    {
      id : "action",
      name : "Action",
      style : {width : "10%"},
      sortable : true,
      selector : (row : IDriverCdl) => row.cdl_id,
      cell: (row: IDriverCdl) => <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={()=>{ handleEditCdl(row.cdl_id) }} />

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
      <CustomTable columns={columns} data={driverCdlList} noRecordMessage="No Document found." />
      <Modal isOpen={uploadModalOpen} onClose={UploadModalClose}>

      <ModalHeader close={closeBtn}
                 onClose={() => UploadModalClose()}>
          <h6 className="mb-0 fw-bold">Edit Application </h6>
        </ModalHeader>
      <ModalBody className="square border border-info-rounded">
      <Form onSubmit={handleSaveDriverCdl} >
     
      <Row>
        <Col md={6}>
        <FormGroup>
        <Label for="application_date">Number</Label>
       <Input bsSize="sm" className="form-control form-control-sm" type="text" id="application_date" name="application_date" value={driverCdl.cdl_number} onChange={handleDriverInput('cdl_number')} />
        </FormGroup> 
        </Col>
        <Col md={6}>
        <FormGroup>
          <Label for="name">State</Label>
          <Input bsSize="sm" className="form-control form-control-sm" type="select" id="user" name="user"  value={driverCdl.state_id} onChange={handleDriverInput('state_id')}>
            <option value="">Select State</option>
            {stateList?.map((state) => (
              <option key={state.state_id} value={state.state_id}>
                {state.state_name}
              </option>
            ))}
            
            </Input>
          </FormGroup>
        </Col>
       </Row>
       <Row>
        <Col md={6}>
        <FormGroup>
        <Label for="application_date">Issue Date</Label>
       <Input bsSize="sm" className="form-control form-control-sm" type="date" id="application_date" name="application_date" value={driverCdl.issue_date} onChange={handleDriverInput('issue_date')} />
        </FormGroup> 
        </Col>
        <Col md={6}>
        <FormGroup>
        <Label for="application_date">Exp Date</Label>
       <Input bsSize="sm" className="form-control form-control-sm" type="date" id="application_date" name="application_date" value={driverCdl.exp_date} onChange={handleDriverInput('exp_date')} />
        </FormGroup>
        </Col>
       </Row>
       <Row>
       <FormGroup>
       <Label>Upload File</Label>
       <Input type="file" name="file" id="file" onChange={handleFileUpload}  /> 
           </FormGroup>
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

export default DocumentCdl