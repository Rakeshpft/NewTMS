import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { RxCross2 } from 'react-icons/rx';
import { Col, Form,Button, Modal, ModalHeader, ModalBody, Label, Row, FormGroup, Input, Container } from 'reactstrap';
import { ITruckDocument, initialStateTruckDocument } from '../../../../../services/tms-objects/truck.types';
import { CustomTable } from '../../../../../features/data-table/CustomTable';
import { toastify } from '../../../../../features/notification/toastify';
import { useTruckContext } from '../../../../../services/reducer/truck.reducer';
import ReactDatePicker from 'react-datepicker';
import { Dictionary, Convert } from '../../../../../features/validation/general-helper';


export type ITruckProps = {
    truck_id?: number,
    handleSubmit?: (obj: any) => void,
  }

const Other = (props:ITruckProps) =>    {
  const{
    truck_id= 0,
  }=props

  const{getOtherDocument, postOtherDocument, deleteOtherDocument, documentOtherList } = useTruckContext();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const[title,setTitle] = useState(true);
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
      getOtherDocument(truck_id);
    }
    else{
      setTruckDocumentList([]);
    }
  },[truck_id]);
    
  useEffect(()=>{
    if(documentOtherList && truck_id>0){
        setTruckDocumentList(documentOtherList);
        setDeleteModalOpen(false)
    }
  },[documentOtherList])
    
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
    if(new Date(truckDocument.expiry_date) < new Date(truckDocument.issue_date)){
      toastify({ message: "Expiry date must be after the issue date", type: "error", });
    }
    else if(truckDocument.file || truckDocument.document_id> 0) {
      postOtherDocument(truck_id,truckDocument).then((data : any ) => {
        data && toastify({ message: data.message, type: data.success ? "success" : "error", });
        data.success && getOtherDocument(truck_id);
        UploadModalClose();
      });
    }
  }
    
  const handleDeleteDocuments = () => {       
    const deletedDocumentIds = selectedDocuments.map(doc => doc.document_id);      
    deleteOtherDocument(truck_id, deletedDocumentIds).then(response => {
      response && toastify({ message: response.message, type: response.success ? "success" : "error", });
      response.success && getOtherDocument(truck_id);
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
    setTitle(false);
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
    format: (row: ITruckDocument) =>  moment(row.issue_date).format('L')
  },
  {
    id: 'expiry_date',
    name: 'EXPIRY DATE',
    style: { width: '10%' },
    sortable: true,
    selector: (row: ITruckDocument) => row.expiry_date,
    format: (row: ITruckDocument) =>  moment(row.expiry_date).format('L')
  },
  {
    id: 'attachment',
    name: 'ATTACHMENT',
    style: { width: '30%' },
    sortable: true,
    selector: (row: ITruckDocument) => row.attachment,
    cell:(row:ITruckDocument)=><a href={row.attachment} target='_blank' download={true}>{row.attachment}</a>
  },    
  {
    id: 'Name',
    name: 'NAME',
    style: { width: '10%' },
    sortable: true,
    selector: (row: ITruckDocument) => row.name,
  },
  {
    id: 'notes',
    name: 'NOTES',
    style: { width: '30%' },
    sortable: true,
    selector: (row: ITruckDocument) => row.notes,      
  },
  {
    id: "action",
    name: "Action",
    style: { width: "5%" },
    sortable: true,
    selector: (row: ITruckDocument) => row.document_id,
    cell: (row: ITruckDocument) => <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={()=>{ handleEditDocument(row.document_id) }} />
  }];
   
  return (
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
            <Button color="success" outline={true} onClick={()=>{setUploadModalOpen(true),setTitle(true)}}>
              <AiOutlinePlus /> Upload
            </Button>
          </label>
        </Col>
      </div>
            <CustomTable columns={columns} data={truckDocumentList} noRecordMessage="No Document found." canSelectRows={true} selectedTableRows={selectedDocuments} setSelectionTableRows={setSelectedDocuments}/>
          
            <Modal isOpen={uploadModalOpen} onClose={UploadModalClose}>
            <ModalHeader close={closeBtn}
                       onClose={() => UploadModalClose()}>
                          <h6 className="mb-0 fw-bold">  {title ? "New Document " : "Edit Document"} </h6>

              </ModalHeader>
              <ModalBody
              className="square border border-info-rounded">
                <Form onSubmit={handleSaveDocument} encType="multipart/form-data" >
               
                <Row>
              <Col md={6}>
                <FormGroup>
                <Label for="Hire_date">Issue Date</Label>
              {/* <Input bsSize="sm" className="form-control form-control-sm" type="date" id="issue_date" name="issue_date" value={truckDocument.issue_date} onChange={handleDocumentInput('issue_date')}  */}
              <ReactDatePicker showYearDropdown showMonthDropdown placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="issue_date" className="form-control form-control-sm" onChange={(date)=>{setTruckDocument({...truckDocument,issue_date: Convert.ToISODate(date) })}} selected={Convert.ToDate(truckDocument.issue_date)} 

              required/>
              
                </FormGroup>
                </Col>
                <Col md={6}>
                <FormGroup>
                <Label for="expiry_date">Expiry Date</Label>
                {/* <Input bsSize="sm" className="form-control form-control-sm" type="date" id="expiry_date" value={truckDocument.expiry_date} name="expiry_date" onChange={handleDocumentInput('expiry_date')} */}
                <ReactDatePicker showYearDropdown showMonthDropdown placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="expiry_date" className="form-control form-control-sm" onChange={(date)=>{setTruckDocument({...truckDocument,expiry_date: Convert.ToISODate(date) })}} selected={Convert.ToDate(truckDocument.expiry_date)} 

                required  />
              
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
                pattern='[A-Za-z ]*' title="Only alphabets are allowed"
                required/>   
                </FormGroup>
                </Col>
       </Row>
       <Row>
            
            <Col md={12}>
               <FormGroup>
               <Label for="exampleText">Notes</Label>
             <Input id="notes" name="notes" type="textarea" value={truckDocument.notes} onChange={handleDocumentInput("notes")} />   
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
                    {!isEmpty(selectedDocuments) && (
                      <div className=" my-3 " >
                        {selectedDocuments.length > 1
                          ? `Are you sure you want to delete ${selectedDocuments.length} Documents?`
                          : `Are you sure you want to delete document  " ${selectedDocuments[0].name}"?`}
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


export default Other;