import React, { useContext, useEffect, useState } from 'react'
import { ITruckDocument, initialStateTruckDocument } from '../../../../../services/tms-objects/truck.types';
import { HiOutlineDocumentDownload, HiOutlinePencilAlt } from 'react-icons/hi';
import { Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { isEmpty } from 'lodash';
import { AiOutlinePlus } from 'react-icons/ai';
import { RxCross2 } from 'react-icons/rx';
import { CustomTable } from '../../../../../features/data-table/CustomTable';
import { useTruckContext } from '../../../../../services/reducer/truck.reducer';
import { toastify } from '../../../../../features/notification/toastify';
import ReactDatePicker from 'react-datepicker';
import { Convert, Dictionary, Helper } from '../../../../../features/shared/helper';
import { LoadingContext } from '../../../../../services/context/loading.context';

export type ITruckProps = {
  truck_id?: number,
  handleSubmit?: (obj: any) => void,
}
const AnnualInspection = (props: ITruckProps) => {
  const{
    truck_id= 0,
  }=props
 

  const { setLoader } = useContext(LoadingContext);

  const{postAnnualInspectionDocument, documentAnnualInspectionList,getAnnualInspectionDocument,deleteAnnualInspectionDocument } = useTruckContext();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [truckDocument, setTruckDocument] = useState<ITruckDocument>(initialStateTruckDocument);
  const [truckDocumentList, setTruckDocumentList] = useState<ITruckDocument[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState<ITruckDocument[] | []>([]);
  
  useEffect(()=>{    
    if(truck_id>0 ){      
      getAnnualInspectionDocument(truck_id);    
    }
    else{
      setTruckDocumentList([]);
    }
  },[truck_id]);

  useEffect(()=>{   
    if(documentAnnualInspectionList && truck_id>0){
      setTruckDocumentList(documentAnnualInspectionList);
      setDeleteModalOpen(false)     
    }
  },[documentAnnualInspectionList])



  const UploadModalClose = () => {
    setUploadModalOpen(false);
    setTruckDocument(initialStateTruckDocument)
  } 

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
      toastify({message: "Expiry date must be after the issue date", type: "error" });
    }
   else if(data.file.size >0 || data.document_id> 0){
    setLoader(true);
     postAnnualInspectionDocument(truck_id,truckDocument).then((data : any ) => {
        data && toastify({ message: data.message, type: data.success ? "success" : "error", });
        data.success && getAnnualInspectionDocument(truck_id);
        UploadModalClose();
        setLoader(false);
      });
    }
  }

  const handleDeleteDocuments = () => {
    const deletedDocumentIds = selectedDocuments.map(doc => doc.document_id); 
    setLoader(true); 
    deleteAnnualInspectionDocument(truck_id, deletedDocumentIds).then(response => {
        response && toastify({ message: response.message, type: response.success ? "success" : "error" });
        response.success && getAnnualInspectionDocument(truck_id);
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
    id: 'issue_date',
    name: 'ISSUE DATE',
    style: { width: '40%' },
    sortable: true,
    selector: (row: ITruckDocument) => row.issue_date,
    format: (row: ITruckDocument) =>  Convert.ToUserDate(row.issue_date)
  },
  {
    id: 'expiry_date',
    name: 'EXPIRY DATE',
    style: { width: '40%' },
    sortable: true,
    selector: (row: ITruckDocument) => row.expiry_date,
    format: (row: ITruckDocument) =>  Convert.ToUserDate(row.expiry_date)
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
      <h6 className="mb-0 fw-bold">{truckDocument.document_id > 0 ? "Edit Annual Inspection" : "Add Annual Inspection" } </h6>
        </ModalHeader>
        <ModalBody
        className="square border border-info-rounded">
          <Form onSubmit={handleSaveDocument} encType="multipart/form-data" >
          
          <Row>
        <Col md={6}>
          <FormGroup>
          <Label for="Issue_date">Issue Date</Label>
        {/* <Input bsSize="sm" className="form-control form-control-sm" type="date" id="Hire_date" name="Hire_date" value={truckDocument.issue_date} onChange={handleDocumentInput('issue_date')} */}
        <ReactDatePicker  showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event)=>{event.preventDefault()}} placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="issue_date" className="form-control form-control-sm" onChange={(date)=>{setTruckDocument({...truckDocument,issue_date: Convert.ToISODate(date) })}} selected={Convert.ToDate(truckDocument.issue_date)} 

       required autoComplete='off' />
        
          </FormGroup>
          </Col>
          <Col md={6}>
          <FormGroup>
          <Label for="Expiry_date">Expiry Date</Label>
          {/* <Input bsSize="sm" className="form-control form-control-sm" type="date" id="termination_date" value={truckDocument.expiry_date} name="expiry_date" onChange={handleDocumentInput('expiry_date')} */}
          <ReactDatePicker  showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event)=>{event.preventDefault()}} placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="expiry_date" className="form-control form-control-sm" onChange={(date)=>{setTruckDocument({...truckDocument,expiry_date: Convert.ToISODate(date) })}} selected={Convert.ToDate(truckDocument.expiry_date)} 

          required autoComplete='off'/>
        
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

export default AnnualInspection