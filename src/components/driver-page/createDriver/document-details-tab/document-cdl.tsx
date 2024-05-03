import React, { useEffect, useState } from 'react'
import { IDriverCdl, TDriverProps, initialDriverCdl } from '../../../../services/tms-objects/driver.types'
import { HiOutlineDocumentDownload, HiOutlinePencilAlt } from 'react-icons/hi';
import { Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { AiOutlinePlus } from 'react-icons/ai';
import { CustomTable } from '../../../../features/data-table/CustomTable';
import { useDriverContext } from '../../../../services/reducer/driver.reducer';
import { RxCross2 } from 'react-icons/rx';
import { toastify } from '../../../../features/notification/toastify';
import { useListContext } from '../../../../services/reducer/list.reducer';
import { isEmpty } from 'lodash';
import ReactDatePicker from 'react-datepicker';
import { Convert, Dictionary, Helper } from '../../../../features/shared/helper';

const DocumentCdl = ( prop : TDriverProps) => {

  const {  driver_id = 0 } = prop
  const { getDriverCdlList , driverCdlLists, postDriverCdl , deleteDriverCdl , driverLoading } = useDriverContext()

   const { getStateList, stateList } = useListContext();

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [driverCdl, setDriverCdl] = useState<IDriverCdl>(initialDriverCdl);
  const [driverCdlList, setDriverCdlList] = useState<IDriverCdl[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<IDriverCdl[] | []>([]);
const [deleteModalOpen, setDeleteModalOpen] = useState(false);


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

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedDriver([]);
  };

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
        
    if(driverCdl.file || driverCdl.cdl_id > 0){
      await postDriverCdl( driver_id, driverCdl).then((data : any ) => {
        data?.value && data && toastify({ message: data.message, type: data.success ? "success" : "error", });
        
       
      })
    }
    getDriverCdlList(driver_id)
    UploadModalClose();
  }

  const handleDeleteDriver = async () => {
    
    const  deleteDrivercdlId = selectedDriver.map(driverId => driverId.cdl_id)

   await deleteDriverCdl( driver_id , deleteDrivercdlId).then((response) => {
    response &&  response.message && toastify({ message: response.message, type: (response.success ? "success" : "error") })
   }

   )
    closeDeleteModal();
    getDriverCdlList(driver_id);
    setSelectedDriver([]);
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
      name: 'NUMBER',
      style: { width: '20%' },
      sortable: true,
      selector: (row: IDriverCdl) => row.cdl_number,     
    },
    {
      id: 'state',
      name: 'STATE',
      style: { width: '20%' },
      sortable: true,
      selector: (row: IDriverCdl) => row.state_name,
    },
    {
      id: 'issue_date',
      name: 'ISSUE DATE',
      style: { width: '20%' },
      sortable: true,
      selector: (row: IDriverCdl) => row.issue_date,
      format: (row: IDriverCdl) =>  Convert.ToUserDate(row.issue_date)
    },
    {
      id: 'exp_date',
      name: 'EXP DATE',
      style: { width: '20%' },
      sortable: true,
      selector: (row: IDriverCdl) => row.exp_date,
      format: (row: IDriverCdl) =>  Convert.ToUserDate(row.exp_date)
    },
    {
      id : "action",
      name : "",
      style : {width : "15%"},
      sortable : false,
      align:'center',
      selector : (row : IDriverCdl) => row.cdl_id,
      cell: (row: IDriverCdl) => 
      <>
        <HiOutlineDocumentDownload className='me-2' size={22} style={{ cursor: "pointer" }} onClick={()=>{Helper.FileDownload(row.attachment_url)}} />
        <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={()=>{ handleEditCdl(row.cdl_id) }} />
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
          <label className="page-subtitle mb-0" >
            <Button color="success"  outline={true}  onClick={() => setUploadModalOpen(true)}><AiOutlinePlus />Add</Button>
          </label>
        </Col>
      </div>
  
      <CustomTable columns={columns} data={driverCdlList} noRecordMessage="No Document found." canSelectRows={true} selectedTableRows={selectedDriver} setSelectionTableRows={setSelectedDriver}  />
      <Modal isOpen={uploadModalOpen} onClose={UploadModalClose}>

      <ModalHeader close={closeBtn}
                 onClose={() => UploadModalClose()}>
          <h6 className="mb-0 fw-bold">{ driverCdl.cdl_id > 0 ? "Edit CDL" : "Add CDL"}</h6>
        </ModalHeader>
      <ModalBody className="square border border-info-rounded">
      <Form onSubmit={handleSaveDriverCdl} >
     
      <Row>
        <Col md={6}>
        <FormGroup>
        <Label for="number">Number</Label>
       <Input bsSize="sm" className="form-control form-control-sm" type="text" id="number" name="number" value={driverCdl.cdl_number} onChange={handleDriverInput('cdl_number')} required />
        </FormGroup> 
        </Col>
        <Col md={6}>
        <FormGroup>
          <Label for="state">State</Label>
          <Input bsSize="sm" className="form-control form-control-sm" type="select" id="state" name="state"  value={driverCdl.state_id} onChange={handleDriverInput('state_id')} required>
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
        <Label for="issue_date">Issue Date </Label>
        <ReactDatePicker  showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event)=>{event.preventDefault()}} placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="purchase_date" className="form-control form-control-sm" onChange={(date)=>{setDriverCdl({...driverCdl, issue_date: Convert.ToISODate(date) })}} selected={Convert.ToDate(driverCdl.issue_date)} required />
        
        </FormGroup> 
        </Col>
        <Col md={6}>
        <FormGroup>
        <Label for="exp_date">Exp Date </Label>
        <ReactDatePicker  showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event)=>{event.preventDefault()}} placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="purchase_date" className="form-control form-control-sm" onChange={(date)=>{setDriverCdl({...driverCdl, exp_date: Convert.ToISODate(date) })}} selected={Convert.ToDate(driverCdl.exp_date)} required />
        </FormGroup>
        </Col>
       </Row>
       <Row>
       <FormGroup>
       <Label>Attachments </Label>
       <Input type="file" name="file" id="file" onChange={handleFileUpload} required  /> 
           </FormGroup>
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
                     {selectedDriver.length > 1?(<div>You have selected {selectedDriver.length} CDL.<br /></div>):null}
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

export default DocumentCdl