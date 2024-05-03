import { isEmpty } from 'lodash';
import React, { useContext, useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { HiOutlineDocumentDownload, HiOutlinePencilAlt } from 'react-icons/hi';
import { RxCross2 } from 'react-icons/rx';
import { Col,Form, Button, Modal, ModalHeader, ModalBody, Label, Row, FormGroup, Input, Container } from 'reactstrap';
import { ITruckDocument, initialStateTruckDocument } from '../../../../../services/tms-objects/truck.types';
import { CustomTable } from '../../../../../features/data-table/CustomTable';
import { toastify } from '../../../../../features/notification/toastify';
import { useTruckContext } from '../../../../../services/reducer/truck.reducer';
import ReactDatePicker from 'react-datepicker';
import { Convert, Dictionary, Helper } from '../../../../../features/shared/helper';
import { LoadingContext } from '../../../../../services/context/loading.context';

export type ITruckProps = {
    truck_id?: number,
    handleSubmit?: (obj: any) => void,
}

const RepairAndMaintance = (props:ITruckProps) => {
  const{
    truck_id= 0,
  }=props;

  const{ getRepairMaintanceDocument, postRepairMaintanceDocument, deleteRepairMaintanceDocument, documentRepairMaintenanceList } = useTruckContext();  
  const { setLoader } = useContext(LoadingContext);
  
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [truckDocument, setTruckDocument] = useState<ITruckDocument>(initialStateTruckDocument);
  const [truckDocumentList, setTruckDocumentList] = useState<ITruckDocument[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState<ITruckDocument[] | []>([]);
  
  const UploadModalClose = () => {
    setUploadModalOpen(false);
    setTruckDocument(initialStateTruckDocument)
  }
  
  useEffect(()=>{    
    if(truck_id>0){
      getRepairMaintanceDocument(truck_id);
    }    
  },[truck_id]);
    
  useEffect(()=>{
    if(documentRepairMaintenanceList){
        setTruckDocumentList(documentRepairMaintenanceList);
        setDeleteModalOpen(false)
    }
  },[documentRepairMaintenanceList])

  useEffect(() => {
    setTruckDocument({ ...truckDocument, 
    
      file : truckDocument.file == null ? new File([], "") : truckDocument.file,
    })
  } , [truckDocument.file])
    
  const handleDocumentInput =
      (prop: keyof ITruckDocument) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
          setTruckDocument({
            ...truckDocument,
            [prop]: event.target.value,
        });
  };
    
  const handleFileUpload = async(event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {      
        setTruckDocument({
          ...truckDocument,
          file : event.target.files[0]
        })
      }
  }
    
  const handleSaveDocument = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: ITruckDocument = { ...truckDocument };
    data.file = truckDocument.file == null ? new File([], "") : truckDocument.file;
    if(data.file.size==0 && data.document_id == 0){
      toastify({ message: "Please upload document.", type:"error", });
      return;
    }
    if(new Date(data.expiry_date) < new Date(data.issue_date)){
      toastify({ message: "Expiry date must be after the issue date", type: "error"});
    }
    else if(data.file || data.document_id> 0){
      setLoader(true);
      postRepairMaintanceDocument(truck_id,truckDocument).then((data : any ) => {    
        data && toastify({ message: data.message, type: data.success ? "success" : "error" });
        data.success && getRepairMaintanceDocument(truck_id);
        UploadModalClose();
        setLoader(false);
      });
    }
  }
    
  const handleDeleteDocuments = () => {       
    const deletedDocumentIds = selectedDocuments.map(doc => doc.document_id);   
    setLoader(true);   
    deleteRepairMaintanceDocument(truck_id, deletedDocumentIds).then(response => {      
      response && toastify({ message: response.message, type: response.success ? "success" : "error" })
      response.success && getRepairMaintanceDocument(truck_id);
      setLoader(false);
    }) 
    setDeleteModalOpen(false);
    setSelectedDocuments([]);
  };      
      
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedDocuments([]);
  };
  
  const handleEditDocument = (id:number) => {
    const filteredData = truckDocumentList?.filter(l=>l.document_id == id)
    if (filteredData && filteredData.length>0) {      
      setTruckDocument(filteredData[0])
    }
    setUploadModalOpen(true);
   
  }
      
  const closeBtn = (
    <button className="border-0 bg-transparent text-white" type="button" onClick={() => UploadModalClose()}>
        <RxCross2 />
    </button>
  );
  
  const columns: CustomTableColumn[] = [     
    {
      id: 'issue_date',
      name: 'ISSUE DATE',
      style: { width: '10%' },
      sortable: true,
      selector: (row: ITruckDocument) => row.issue_date,
      format: (row: ITruckDocument) =>  Convert.ToUserDate(row.issue_date)
    },
    {
      id: 'expiry_date',
      name: 'EXPIRY DATE',
      style: { width: '10%' },
      sortable: true,
      selector: (row: ITruckDocument) => row.expiry_date,
      format: (row: ITruckDocument) =>  Convert.ToUserDate(row.expiry_date)
    },
    {
      id: 'Name',
      name: 'NAME',
      style: { width: '20%' },
      sortable: true,
      selector: (row: ITruckDocument) => row.name,
    },
    {
      id: 'notes',
      name: 'NOTES',
      style: { width: '20%' },
      sortable: true,
      selector: (row: ITruckDocument) => row.notes,       
    },
    {
      id: 'attachment',
      name: 'ATTACHMENT',
      style: { width: '20%' },
      sortable: true,
      selector: (row: ITruckDocument) => row.attachment,      
    },
    {
      id: "action",
      name: "ACTION",
      style: { width: "15%" },
      sortable: false,
      selector: (row: ITruckDocument) => row.document_id,
      cell: (row: ITruckDocument) => 
      <>
        <HiOutlineDocumentDownload className='me-2' size={22} style={{ cursor: "pointer" }} onClick={()=>{Helper.FileDownload(row.attachment_url)}} />
        <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={()=>{ handleEditDocument(row.document_id) }} />
      </>
    }
  ];
  
  
   
  return  (
    <>
     <div className="d-flex justify-content-end m-3">
       <Col md={3} className="d-flex justify-content-end align-items-end pb-3">
       <label className="page-subtitle d-flex align-items-end">
      {!isEmpty(selectedDocuments) && (
        <div className="user-info-btn me-2">
          <Button
            color="primary"
            className="px-4 shadow save-button"
            onClick={() => setDeleteModalOpen(true)}
          >
            Delete
          </Button>
        </div>
      )}
      <Button color="success" outline={true} onClick={()=>{setUploadModalOpen(true)}}>
        <AiOutlinePlus /> Upload
      </Button>
    </label>
  </Col>
</div>
      <CustomTable columns={columns} data={truckDocumentList} noRecordMessage="No Document found." canSelectRows={true} selectedTableRows={selectedDocuments} setSelectionTableRows={setSelectedDocuments}/>
    
      <Modal isOpen={uploadModalOpen} onClose={UploadModalClose}>
      <ModalHeader close={closeBtn}
                 onClose={() => UploadModalClose()}>
                     <h6 className="mb-0 fw-bold">{truckDocument.document_id > 0 ? "Edit Repair & Maintenance Document " : "Add Repair & Maintenance Document " } </h6>

        </ModalHeader>
        <ModalBody
        className="square border border-info-rounded">
          <Form onSubmit={handleSaveDocument} encType="multipart/form-data" >
         
          <Row>
        <Col md={6}>
          <FormGroup>
          <Label for="issue_date">Issue Date</Label>
          <ReactDatePicker  showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event)=>{event.preventDefault()}} placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="issue_date" className="form-control form-control-sm" onChange={(date)=>{setTruckDocument({...truckDocument,issue_date: Convert.ToISODate(date) })}} selected={Convert.ToDate(truckDocument.issue_date)} 
        required autoComplete='off'/>
        
          </FormGroup>
          </Col>
          <Col md={6}>
          <FormGroup>
          <Label for="expiry_date">Expiry Date</Label>
          <ReactDatePicker  showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event)=>{event.preventDefault()}} placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="expiry_date" className="form-control form-control-sm" onChange={(date)=>{setTruckDocument({...truckDocument,expiry_date: Convert.ToISODate(date) })}} selected={Convert.ToDate(truckDocument.expiry_date)} 
          required  autoComplete='off'/>
        
        </FormGroup>
        </Col>
       </Row>
       <Row>
       <Col md={6}>
       <FormGroup>
       <Label>Upload File</Label>
       <Input type="file" name="file" id="file" onChange={handleFileUpload}  /> 
           </FormGroup>
           </Col>
           <Col md={6}>
                <FormGroup>
                <Label for="exampleText">Name</Label>
              <Input id="name" name="name" type="text" value={truckDocument.name} onChange={handleDocumentInput("name")} 
              pattern='[a-zA-Z0-9\s]*' title="Only alphanumeric are allowed"
                 required autoComplete='off'/>   
                </FormGroup>
                </Col>
       </Row>
       <Row>
            
             <Col md={12}>
                <FormGroup>
                <Label for="exampleText">Notes</Label>
              <Input id="notes" name="notes" type="textarea" value={truckDocument.notes} onChange={handleDocumentInput("notes")} 
              autoComplete='off'/>   
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
            <h6 className="mb-0 fw-bold">Delete Document</h6>
          </ModalHeader>
          <ModalBody>
            <Container>
              {!isEmpty(selectedDocuments) && (
                <div className=" my-3 " >
                  {selectedDocuments.length > 1?(<div>You have selected {selectedDocuments.length} documents.<br /></div>):null}
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
                  onClick={() => handleDeleteDocuments()}
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
  

export default RepairAndMaintance