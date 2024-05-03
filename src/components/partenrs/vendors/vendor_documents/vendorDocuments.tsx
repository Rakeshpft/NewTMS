import React, { useContext, useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { IVendorDocument, TVendorProps, vendorDocumentInitialState } from '../../../../services/tms-objects/vendor.types'
import { useVendorContext } from '../../../../services/reducer/vendor.reducer'
import { HiOutlineDocumentDownload, HiOutlinePencilAlt } from 'react-icons/hi'
import { CustomTable } from '../../../../features/data-table/CustomTable'
import { isEmpty } from 'lodash'
import { toastify } from '../../../../features/notification/toastify'
import { Convert, Helper } from '../../../../features/shared/helper'
import { Validate } from '../../../../features/shared/validate'
import { LoadingContext } from '../../../../services/context/loading.context'

const CustomerDocuments = (props: TVendorProps) => {
  const {
    vendor_id = 0
  } = props;
  const { getVendorDocument, DocumentList, postVendorDocument, VendorLoading, deleteDocument } = useVendorContext();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const { setLoader } = useContext(LoadingContext);
  const [vendorDocument, setVendorDocument] = useState<IVendorDocument>(vendorDocumentInitialState);
  const [vendorDocumentList, setVendorDocumentList] = useState<IVendorDocument[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState<IVendorDocument[] | []>([]);

  const UploadModalClose = () => {
    setUploadModalOpen(false);
    setVendorDocument(vendorDocumentInitialState);
  }

  useEffect(() => {
    if (vendor_id > 0) {
      getVendorDocument(vendor_id);
    }
  }, [])

  useEffect(() => {
    if (!VendorLoading && DocumentList) {
      setVendorDocumentList(DocumentList);
      setDeleteModalOpen(false)
    }
  }, [VendorLoading, DocumentList])

  const handleDocumentInput =
    (prop: keyof IVendorDocument) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setVendorDocument({
          ...vendorDocument,
          [prop]: event.target.value,
        });
      };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setVendorDocument({
        ...vendorDocument,
        file: event.target.files[0]
      })
    }
  }

  const handleSaveDocument = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: IVendorDocument = { ...vendorDocument };
    data.file = vendorDocument.file == null ? new File([], "") : vendorDocument.file;
    if (data.file.size == 0 && data.document_id == 0) {
      toastify({ message: "Please upload document.", type: "error", });
      return;
    }
    if (data.file.size > 0 || data.document_id > 0) {
      setLoader(true)
      await postVendorDocument(vendor_id, data).then((response: any) => {
        response && toastify({ message: response.message, type: response.success ? "success" : "error", });
        getVendorDocument(vendor_id)
        UploadModalClose();
        setLoader(false)
      });
    }
  }



  const handleDeleteDocuments = () => {
    const deletedDocumentIds = selectedDocuments.map(doc => doc.document_id);
    setLoader(true)
    deleteDocument(vendor_id, deletedDocumentIds).then(response => {
      response &&
        toastify({
          message: response.message,
          type: response.success ? "success" : "error",
        })
        setDeleteModalOpen(false);
        setSelectedDocuments([]);
        setLoader(false)
    })
  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedDocuments([]);
  };

  const handleEditDocument = (id: number) => {
    const filteredData = vendorDocumentList?.filter(l => l.document_id == id)
    if (filteredData && filteredData.length > 0) {
      setVendorDocument(filteredData[0])
    }
    setUploadModalOpen(true);
  }

  const columns: CustomTableColumn[] = [
    {
      id: "created_date",
      name: "Date",
      style: { width: "20%" },
      sortable: true,
      selector: (row: IVendorDocument) => row.created_date,
      format: (row: IVendorDocument) => Convert.ToUserDate(row.created_date)
    },
    // {
    //   id: "document_name",
    //   name: "Name",
    //   style: { width: "30%" },
    //   sortable: true,
    //   selector: (row: IVendorDocument) => row.document_name,
    //   cell: (row: IVendorDocument) => <a href={row.document_url} target='_blank' download={true}>{row.document_name}</a>
    // },
    {
      id: "notes",
      name: "Notes",
      style: { width: "65%" },
      sortable: true,
      selector: (row: IVendorDocument) => row.notes
    },
    {
      id: "action",
      name: "Action",
      style: { width: "10%" },
      sortable: true,
      selector: (row: IVendorDocument) => row.document_id,
      cell: (row: IVendorDocument) => 
      <>
      <HiOutlineDocumentDownload className='me-2' size={22} style={{ cursor: "pointer" }} onClick={()=>{Helper.FileDownload(row.document_url)}} />
      <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={() => { handleEditDocument(row.document_id); }} />
    </>
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
            <Button color="success" outline={true} onClick={() => { setUploadModalOpen(true) }}>
              <AiOutlinePlus /> Upload
            </Button>
          </label>
        </Col>
      </div>
      <CustomTable columns={columns} data={vendorDocumentList} noRecordMessage="No Document found." canSelectRows={true} selectedTableRows={selectedDocuments} setSelectionTableRows={setSelectedDocuments} />


      <Modal isOpen={uploadModalOpen} onClose={UploadModalClose}>
        <ModalHeader>
        <h6 className="mb-0 fw-bold">{vendorDocument.vendor_id == 0 ? "Upload New Document" : "Edit Document"}</h6>
        </ModalHeader>
        <ModalBody
          className="square border border-info-rounded">
          <Form onSubmit={handleSaveDocument} encType="multipart/form-data" >
            <Label>Upload File</Label>
            <FormGroup>
              <Input type="file" name="file" id="file" onChange={handleFileUpload}  required/>
            </FormGroup>
            <Label for="exampleText">Notes</Label>
            <Input id="notes" name="notes" type="textarea" value={vendorDocument.notes} onChange={handleDocumentInput("notes")} pattern='^[a-zA-Z]+$' title="Only alphabets are allowed" onKeyDownCapture={Validate} validation="chars" length="50" autoComplete="off" />
            <FormGroup className=" d-flex justify-content-end mt-3 column-gap-2 ">
              <Button color="primary" className="px-4 mr-3" type="submit">Save</Button>
              <Button color="danger" outline={true} className="px-4 mr-3" onClick={() => UploadModalClose()}>Cancel</Button>
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

export default CustomerDocuments