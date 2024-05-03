import React, { useEffect, useState } from "react";
import { IDriverDoc, TDriverProps, initialDriverDoc } from "../../../../services/tms-objects/driver.types";
import { Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { CustomTable } from "../../../../features/data-table/CustomTable";
import { HiOutlineDocumentDownload, HiOutlinePencilAlt } from "react-icons/hi";
import { useDriverContext } from "../../../../services/reducer/driver.reducer";
import { RxCross2 } from "react-icons/rx";
import { toastify } from "../../../../features/notification/toastify";
import { useListContext } from "../../../../services/reducer/list.reducer";
import { isEmpty } from "lodash";
import ReactDatePicker from "react-datepicker";
import { IDocumentStatusObject } from "../../../../services/tms-objects/list.types";
import { Convert, Dictionary, Helper } from "../../../../features/shared/helper";


const DocumentApplication = ( props: TDriverProps) => {
  const { driver_id = 0 } = props
  const { getDriverDocAppList  , driverDocAppList ,postApplication , deleteDriverAppliaction } = useDriverContext()
  const {getDocumentStatusList , documentStatusList } = useListContext()  
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [driverDocument, setDriverDocument] = useState<IDriverDoc>(initialDriverDoc);
  const [driverDocumentList, setDriverDocumentList] = useState<IDriverDoc[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<IDriverDoc[] | []>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(()=>{
    if(driverDocAppList){
      setDriverDocumentList(driverDocAppList);
    }
  },[driverDocAppList])


  useEffect(() => {
    if(driver_id > 0)
    getDriverDocAppList(driver_id)     
  }, [])

  useEffect(() => {
    getDocumentStatusList()
  },[])

  const handleEditDocument = (id:number) => {
    if(id>0){ 
      const filteredData = driverDocumentList?.filter(l=>l.application_id == id)
    if (filteredData && filteredData.length>0) {      
      setDriverDocument(filteredData[0])
    }
    else { 
      setDriverDocument(initialDriverDoc) }
    setUploadModalOpen(true);
  }}

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedDriver([]);
  };  

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

  const  handleSaveDocument = async(event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();    
    let data: IDriverDoc = {
      application_id: driverDocument.application_id,
      status_id: documentStatusList && documentStatusList.length > 0 && driverDocument.status_id == 0 ? documentStatusList[0].status_id : driverDocument.status_id,
      application_date: driverDocument.application_date,
      hire_date: driverDocument.hire_date,
      termination_date: driverDocument.termination_date,

      file : driverDocument.file == null ? new File([], "") : driverDocument.file,
    };    
    if(data.file.size==0 && data.application_id == 0){
      toastify({ message: "Please upload document.", type:"error", });
      return;
    }
    if(data.file.size>0 || data.application_id > 0){
      await postApplication(driver_id ,data  ).then((response : any ) => {
        response && toastify({ message: response.message, type: response.success ? "success" : "error", });
      })
    }
    getDriverDocAppList(driver_id);
    UploadModalClose();
  }

  const handleDeleteDriver = async () => {    
    const  deleteDriverAppId = selectedDriver.map(driverId => driverId.application_id)
    await deleteDriverAppliaction( driver_id , deleteDriverAppId).then((response) => {
      response &&  response.message && toastify({ message: response.message, type: (response.success ? "success" : "error") })
    })
    closeDeleteModal();
    getDriverDocAppList(driver_id);
    setSelectedDriver([]);
  }

  const closeBtn = (
    <button className="border-0 bg-transparent text-white" type="button" onClick={() => UploadModalClose()}>
      <RxCross2 />
    </button>
  );

  const columns: CustomTableColumn[] = [
   {
      id: 'status_id',
      name: 'STATUS',
      style: { width: '20%' },
      sortable: true,
      selector: (row: IDriverDoc) => row.status_name,     
    },
    {
      id: 'application_date',
      name: 'APPLICATION DATE',
      style: { width: '20%' },
      sortable: true,
      selector: (row: IDriverDoc) => row.application_date,
      format: (row: IDriverDoc) =>  Convert.ToUserDate(row.application_date)
    },
    {
      id: 'hire_date',
      name: 'HIRE DATE',
      style: { width: '20%' },
      sortable: true,
      selector: (row: IDriverDoc) => row.hire_date,
      format: (row: IDriverDoc) =>  Convert.ToUserDate(row.hire_date)
    },
    {
      id: 'termination_date',
      name: 'TERMINATION DATE',
      style: { width: '20%' },
      sortable: true,
      selector: (row: IDriverDoc) => row.termination_date,
      format: (row: IDriverDoc) =>  Convert.ToUserDate(row.termination_date)
    },
    {
      id : "action",
      name : "",
      style : {width : "15%"},
      sortable : false,
      align:'center',
      selector : (row : IDriverDoc) => row.application_id,
      cell: (row: IDriverDoc) => 
      <>
        <HiOutlineDocumentDownload className='me-2' size={22} style={{ cursor: "pointer" }} onClick={()=>{Helper.FileDownload(row.attachment_url)}} />
        <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={()=>{ handleEditDocument(row.application_id) }} />
      </>
    }  
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

      <CustomTable columns={columns} data={driverDocumentList} noRecordMessage="No Document found." canSelectRows={true} selectedTableRows={selectedDriver} setSelectionTableRows={setSelectedDriver} />
      <Modal isOpen={uploadModalOpen} onClose={UploadModalClose}>
        <ModalHeader close={closeBtn} onClose={() => UploadModalClose()}>
          <h6 className="mb-0 fw-bold">{driverDocument.application_id > 0 ? "Edit Application" : "Add Application"} </h6>
        </ModalHeader>
        <ModalBody className="square border border-info-rounded">
          <Form onSubmit={handleSaveDocument}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="name">Status</Label>
                  <Input bsSize="sm" className="form-control form-control-sm" type="select" id="user" name="user" value={driverDocument.status_id} onChange={handleDriverInput("status_id")} required>
                    <option value={0}> Select Status</option>
                    {documentStatusList &&
                      documentStatusList.map((status: IDocumentStatusObject) => (
                        <option key={status.status_id} value={status.status_id}>
                          {status.status_name}
                        </option>
                      ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="application_date">Application Date </Label>
                  <ReactDatePicker
                    required
                    showYearDropdown
                    showMonthDropdown
                    showIcon
                    fixedHeight
                    isClearable
                    onKeyDown={(event) => {
                      event.preventDefault();
                    }}
                    placeholderText={Dictionary.UserDateFormat.toUpperCase()}
                    dateFormat={Dictionary.UserDateFormat}
                    className="form-control form-control-sm"
                    onChange={(date) => {
                      setDriverDocument({ ...driverDocument, application_date: Convert.ToISODate(date) });
                    }}
                    selected={Convert.ToDate(driverDocument.application_date)}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="Hire_date">Hire Date</Label>
                  <ReactDatePicker
                    required
                    showYearDropdown
                    showMonthDropdown
                    showIcon
                    fixedHeight
                    isClearable
                    onKeyDown={(event) => {
                      event.preventDefault();
                    }}
                    placeholderText={Dictionary.UserDateFormat.toUpperCase()}
                    dateFormat={Dictionary.UserDateFormat}
                    name="purchase_date"
                    className="form-control form-control-sm"
                    onChange={(date) => {
                      setDriverDocument({ ...driverDocument, hire_date: Convert.ToISODate(date) });
                    }}
                    selected={Convert.ToDate(driverDocument.hire_date)}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="termination_date">Termination Date </Label>
                  <ReactDatePicker showYearDropdown showMonthDropdown showIcon fixedHeight isClearable  onKeyDown={(event) => { event.preventDefault(); }} placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} className="form-control form-control-sm"   onChange={(date) => {  setDriverDocument({ ...driverDocument, termination_date: Convert.ToISODate(date) }); }}  selected={Convert.ToDate(driverDocument.termination_date)} required />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <FormGroup>
                <Label>Attachments</Label>
                <Input type="file" name="file" id="file" onChange={handleFileUpload} />
              </FormGroup>
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
                    You have selected {selectedDriver.length} driver application.
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
}

export default DocumentApplication 
