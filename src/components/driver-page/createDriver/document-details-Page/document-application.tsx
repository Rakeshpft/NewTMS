import React, { useEffect, useState } from "react";
import { IDriverDoc, TDriverProps, initialDriverDoc } from "../../../../services/tms-objects/driver.types";
import moment from "moment";
import { Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { CustomTable } from "../../../../features/data-table/CustomTable";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useDriverContext } from "../../../../services/reducer/driver.reducer";
import { RxCross2 } from "react-icons/rx";
import { toastify } from "../../../../features/notification/toastify";
import { useListContext } from "../../../../services/reducer/list.reducer";
import { isEmpty } from "lodash";
import ReactDatePicker from "react-datepicker";
import { Convert, Dictionary } from "../../../../features/validation/general-helper";


const DocumentApplication = ( props: TDriverProps) => {

const { driver_id = 0 } = props
const { getDriverDocAppList  , driverDocAppList , driverLoading ,postApplication , deleteDriverAppliaction } = useDriverContext()
const {getDocumentStatusList , documentStatusList } = useListContext()
  
const [uploadModalOpen, setUploadModalOpen] = useState(false);
const [driverDocument, setDriverDocument] = useState<IDriverDoc>(initialDriverDoc);
const [driverDocumentList, setDriverDocumentList] = useState<IDriverDoc[]>([]);
const [selectedDriver, setSelectedDriver] = useState<IDriverDoc[] | []>([]);
const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  
  const handleEditDocument = (id:number) => {
    const filteredData = driverDocumentList?.filter(l=>l.application_id == id)
    if (filteredData && filteredData.length>0) {      
      setDriverDocument(filteredData[0])
    }
    setUploadModalOpen(true);
  }

  useEffect(()=>{
    if(!driverLoading && driverDocAppList){
      setDriverDocumentList(driverDocAppList);
    }
  },[driverLoading,driverDocAppList])


  useEffect(() => {
    if(driver_id > 0)
    getDriverDocAppList(driver_id) 
    
  }, [])

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedDriver([]);
  };

  useEffect(() => {
    getDocumentStatusList()
  },[])

  const UploadModalClose = () => {
    setUploadModalOpen(false);
    setDriverDocument(initialDriverDoc);
  }

  const handleDriverInput = (prop: keyof IDriverDoc) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setDriverDocument({ ...driverDocument, [prop]: event.target.value });
  }

  const handleFileUpload = async(event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {      
      setDriverDocument({
        ...driverDocument,
        file : event.target.files[0]
      })
    }
  }
useEffect(() => {
  setDriverDocument({
    ...driverDocument,
    status_id : 1
  }) 
})


  const  handleSaveDocument = async(event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    console.log("application id value ", driverDocument.application_id)

    if(driverDocument.file || driverDocument.application_id > 0){
      await postApplication(driver_id ,driverDocument  ).then((data : any ) => {
        data &&
        toastify({
          message: data.message,
          type: data.success ? "success" : "error",
        });
      })
    }
    getDriverDocAppList(driver_id);
    UploadModalClose();
  }

  const handleDeleteDriver = async () => {
    
    const  deleteDriverAppId = selectedDriver.map(driverId => driverId.application_id)

   await deleteDriverAppliaction( driver_id , deleteDriverAppId).then((response) => {
    response &&  response.message && toastify({ message: response.message, type: (response.success ? "success" : "error") })
   }

   )
    closeDeleteModal();
    getDriverDocAppList(driver_id);
    setSelectedDriver([]);
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

  const columns: CustomTableColumn[] = [

   {
      id: 'status_id',
      name: 'Status',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverDoc) => row.status_name,
     
    },
    {
      id: 'application_date',
      name: 'Application Date',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverDoc) => row.application_date,
      format: (row: IDriverDoc) =>  moment(row.application_date).format('L')

    },
    {
      id: 'hire_date',
      name: 'Hire Date',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverDoc) => row.hire_date,
      format: (row: IDriverDoc) =>  moment(row.hire_date).format('L')
    },
    {
      id: 'termination_date',
      name: 'Termination Date',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverDoc) => row.termination_date,
      format: (row: IDriverDoc) =>  moment(row.termination_date).format('L')
    },
    {
      id: 'attachment',
      name: 'Attachment',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverDoc) => row.attachment,
      cell:(row:IDriverDoc)=><a href={row.attachment_url} target='_blank' download={true}>{row.attachment}</a>

    },
    {
      id : "action",
      name : "Action",
      style : {width : "10%"},
      sortable : true,
      selector : (row : IDriverDoc) => row.application_id,
      cell: (row: IDriverDoc) => <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={()=>{ handleEditDocument(row.application_id) }} />

    }
  
  ]

  return (

    <>
      <div className="d-flex justify-content-end m-3">
        <Col md={3} className=" d-flex justify-content-end align-items-end pb-3" column-gap={3}>
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
     
      <CustomTable columns={columns} data={driverDocumentList} noRecordMessage="No Document found."  canSelectRows={true} selectedTableRows={selectedDriver} setSelectionTableRows={setSelectedDriver} />
      <Modal isOpen={uploadModalOpen} onClose={UploadModalClose}>
         
      <ModalHeader close={closeBtn}
                 onClose={() => UploadModalClose()}>
          <h6 className="mb-0 fw-bold">Edit Application </h6>
        </ModalHeader>
        <ModalBody className="square border border-info-rounded">
       
       <Form onSubmit={handleSaveDocument}>
       
       <Row>
        <Col md={6}>
          <FormGroup>
          <Label for="name">STATUS</Label>
          <Input bsSize="sm" className="form-control form-control-sm" type="select" id="user" name="user"  value={driverDocument.status_id} onChange={handleDriverInput('status_id')}>
    {
      documentStatusList && documentStatusList.map((status) => (
        <option key={status.status_id} value={status.status_id}>{status.status_name}</option>
      ))
    }
            </Input>
          
          </FormGroup>
        </Col>
        <Col md={6}>
        <FormGroup>
        <Label for="application_date">APPLICATION DATE</Label>
       <ReactDatePicker showYearDropdown showMonthDropdown placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="purchase_date" className="form-control form-control-sm" onChange={(date)=>{setDriverDocument({...driverDocument, application_date: Convert.ToISODate(date) })}} selected={Convert.ToDate(driverDocument.application_date)} ></ReactDatePicker>

        </FormGroup>
        </Col>
       </Row>
       <Row>
       <Col md={6}>
        <FormGroup>
        <Label for="Hire_date">HIRE DATE</Label>
        <ReactDatePicker showYearDropdown showMonthDropdown placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="purchase_date" className="form-control form-control-sm" onChange={(date)=>{setDriverDocument({...driverDocument, hire_date: Convert.ToISODate(date) })}} selected={Convert.ToDate(driverDocument.hire_date)} ></ReactDatePicker>
       
        </FormGroup>
        </Col>
        <Col md={6}>
        <FormGroup>
        <Label for="termination_date">TERMINATION DATE</Label>
        <ReactDatePicker showYearDropdown showMonthDropdown placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="purchase_date" className="form-control form-control-sm" onChange={(date)=>{setDriverDocument({...driverDocument, termination_date: Convert.ToISODate(date) })}} selected={Convert.ToDate(driverDocument.termination_date)} ></ReactDatePicker>
       
        </FormGroup>
        </Col>
       </Row>
       <Row>
       <FormGroup>
       <Label>ATTACHMENTS</Label>
       <Input type="file" name="file" id="file" onChange={handleFileUpload}  /> 
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
                    <div className=" my-3 ">
                      {selectedDriver.length > 1
                        ? `Are you sure you want to delete ${selectedDriver.length} customers?`
                        : `Are you sure you want to delete customer "${selectedDriver[0].application_id} "?`}
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

  );
}

export default DocumentApplication 
