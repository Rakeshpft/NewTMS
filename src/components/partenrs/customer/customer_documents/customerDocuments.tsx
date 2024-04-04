import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { useCustomerContext } from '../../../../services/reducer/customer.reducer'
import { CustomerDocumentInitialState, ICustomerDocument, TCustomerProps} from '../../../../services/tms-objects/customer.types'
import { CustomTable } from '../../../../features/data-table/CustomTable'
import moment from 'moment'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { toastify } from '../../../../features/notification/toastify'
import { RxCross2 } from 'react-icons/rx'
import { isEmpty } from 'lodash'


const CustomerDocuments = (prop: TCustomerProps) => { 
  const {
    customer_id = 0
  }= prop;
  const { postCustomerDocument,DocumentList,customerLoading ,getCustomerDocument,deleteDocument} = useCustomerContext();

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [customerDocument, setCustomerDocument] = useState<ICustomerDocument>(CustomerDocumentInitialState);
  const [customerDocumentList, setCustomerDocumentList] = useState<ICustomerDocument[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState<ICustomerDocument[] | []>([]);

  const UploadModalClose = () => {
    setUploadModalOpen(false);
    setCustomerDocument(CustomerDocumentInitialState)
  }
  
  useEffect(()=>{
   if(customer_id>0){
    getCustomerDocument(customer_id);
   }
  },[]);

 

  useEffect(()=>{
    if(!customerLoading && DocumentList){
      setCustomerDocumentList(DocumentList);
      setDeleteModalOpen(false)
    }
  },[customerLoading,DocumentList])

  const handleDocumentInput =
  (prop: keyof ICustomerDocument) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setCustomerDocument({
        ...customerDocument,
        [prop]: event.target.value,
      });
    };
 

  const handleFileUpload = async(event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {      
      setCustomerDocument({
        ...customerDocument,
        file : event.target.files[0]
      })
    }
  }

  const handleSaveDocument = async(event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(customerDocument.file){
    await postCustomerDocument(customer_id,customerDocument).then((data : any ) => {
          console.log("getdata", data); 
          data &&
        toastify({
          message: data.message,
          type: data.success ? "success" : "error",
        });
          getCustomerDocument(customer_id)     
          UploadModalClose();
      });
    }
  }

  const handleDeleteDocuments = () => {
    const deletedDocumentIds = selectedDocuments.map(doc => doc.document_id);
  
    deleteDocument(customer_id, deletedDocumentIds)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error("Error:", error);
      });
  };
  
  
  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedDocuments([]);
    
  };
  const handleEditDocument = (id:number) => {
    const filteredData = customerDocumentList?.filter(l=>l.document_id == id)
    if (filteredData && filteredData.length>0) {      
      setCustomerDocument(filteredData[0])
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
      id: 'created_date',
      name: 'DATE',
      style: { width: '10%' },
      sortable: true,
      selector: (row: ICustomerDocument) => row.created_date,
      format: (row: ICustomerDocument) =>  moment(row.created_date).format('L')
    },
    {
      id: 'document_name',
      name: 'NAME',
      style: { width: '30%' },
      sortable: true,
      selector: (row: ICustomerDocument) => row.document_name,
      cell:(row:ICustomerDocument)=><a href={row.document_url} target='_blank' download={true}>{row.document_name}</a>
    },
    {
      id: 'notes',
      name: 'NOTES',
      style: { width: '15%' },
      sortable: true,
      selector: (row: ICustomerDocument) => row.notes
    },
    {
      id: "action",
      name: "Action",
      style: { width: "5%" },
      sortable: true,
      selector: (row: ICustomerDocument) => row.document_id,
      cell: (row: ICustomerDocument) => <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={()=>{ handleEditDocument(row.document_id) }} />
    }
  ]
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
      <CustomTable columns={columns} data={customerDocumentList} noRecordMessage="No Document found." canSelectRows={true} selectedTableRows={selectedDocuments} setSelectionTableRows={setSelectedDocuments}/>
    
      <Modal isOpen={uploadModalOpen} onClose={UploadModalClose}>
      <ModalHeader close={closeBtn}
                 onClose={() => UploadModalClose()}>
          <h6 className="mb-0 fw-bold">Upload Document </h6>
        </ModalHeader>
        <ModalBody
        className="square border border-info-rounded">
          <Form onSubmit={handleSaveDocument} encType="multipart/form-data" >
          <Label>Upload File</Label>
          <FormGroup>
              
                  <Input type="file" name="file" id="file" onChange={handleFileUpload}
                  required title='Please select file' />
                
           </FormGroup>
              <Label for="exampleText">Notes</Label>
              <Input id="notes" name="notes" type="textarea" value={customerDocument.notes} onChange={handleDocumentInput("notes")} />            
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
                    : `Are you sure you want to delete role  " ${selectedDocuments[0].document_name}"?`}
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

export default CustomerDocuments