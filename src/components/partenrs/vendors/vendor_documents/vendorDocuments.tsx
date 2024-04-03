import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { IVendorDocument, TVendorProps, vendorDocumentInitialState } from '../../../../services/tms-objects/vendor.types'
import { useVendorContext } from '../../../../services/reducer/vendor.reducer'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { CustomTable } from '../../../../features/data-table/CustomTable'
import moment from 'moment'

const CustomerDocuments = (props: TVendorProps) => {
  const {
    vendor_id = 0
  } = props;
  const { getVendorDocument, DocumentList, postVendorDocument, VendorLoading } = useVendorContext();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);  
  const [vendorDocument, setVendorDocument] = useState<IVendorDocument>(vendorDocumentInitialState);
  const [vendorDocumentList, setVendorDocumentList] = useState<IVendorDocument[]>([]);

  const UploadModalClose = () => {    
    setUploadModalOpen(false);
    setVendorDocument(vendorDocumentInitialState);
  }
  
  useEffect(()=>{
    if(vendor_id>0){
      getVendorDocument(vendor_id);
    }
  },[])
  
  useEffect(()=>{
    if(!VendorLoading && DocumentList){
      setVendorDocumentList(DocumentList);
    }
  },[VendorLoading,DocumentList])

  const handleDocumentInput =
  (prop: keyof IVendorDocument) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setVendorDocument({
        ...vendorDocument,
        [prop]: event.target.value,
      });
    };

  const handleFileUpload = async(event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {      
      setVendorDocument({
        ...vendorDocument,
        file : event.target.files[0]
      })
    }
  }  

  const handleSaveDocument = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(vendorDocument.file){
      postVendorDocument(vendor_id,vendorDocument).then((data : any ) => {
          console.log("getdata", data);
          getVendorDocument(vendor_id);
          UploadModalClose();
      });
    }
  }

  const handleEditDocument = (id:number) => {
    const filteredData = vendorDocumentList?.filter(l=>l.document_id == id)
    if (filteredData && filteredData.length>0) {      
      setVendorDocument(filteredData[0])
    }
    setUploadModalOpen(true);
  }

  const columns:CustomTableColumn[]=[
    {
      id: "created_date",
      name: "Date",
      style: { width: "10%" },
      sortable: true,
      selector: (row: IVendorDocument) => row.created_date,
      format:(row:IVendorDocument) => moment(row.created_date).format('L')
    },
    {
      id: "document_name",
      name: "Name",
      style: { width: "30%" },
      sortable: true,
      selector: (row: IVendorDocument) => row.document_name,
      cell:(row:IVendorDocument)=><a href={row.document_url} target='_blank' download={true}>{row.document_name}</a>
    },
    {
      id: "notes",
      name: "Notes",
      style: { width: "50%" },
      sortable: true,
      selector: (row: IVendorDocument) => row.notes
    },
    {
      id: "action",
      name: "Action",
      style: { width: "5%" },
      sortable: true,
      selector: (row: IVendorDocument) => row.document_id,
      cell: (row: IVendorDocument) => <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={()=>{ handleEditDocument(row.document_id); }} />
    }
  ]

  return (
    <>
      <div className="d-flex justify-content-end m-3">
        <Col md={3} className=" d-flex justify-content-end align-items-end">
          <Button color="success" outline={true} onClick={() => setUploadModalOpen(true)}><AiOutlinePlus />Upload</Button>
        </Col>
      </div>
      <CustomTable columns={columns} data={vendorDocumentList} noRecordMessage="No document found" />
      <Modal isOpen={uploadModalOpen} onClose={UploadModalClose}>
        <ModalHeader>
          <h6 className="mb-0 fw-bold">Edit Document </h6>
        </ModalHeader>
        <ModalBody
          className="square border border-info-rounded">
          <Form onSubmit={handleSaveDocument} encType="multipart/form-data" >
            <Label>Upload File</Label>
            <FormGroup>              
                  <Input type="file" name="file" id="file" onChange={handleFileUpload} />
            </FormGroup>
            <Label for="exampleText">Notes</Label>
            <Input id="notes" name="notes" type="textarea" value={vendorDocument.notes} onChange={handleDocumentInput("notes")} />
            <FormGroup className=" d-flex justify-content-end mt-3 column-gap-2 ">
              <Button color="primary" className="px-4 mr-3" type="submit">Save</Button>
              <Button color="danger" outline={true} className="px-4 mr-3" onClick={() => UploadModalClose()}>Cancel</Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  )
}

export default CustomerDocuments