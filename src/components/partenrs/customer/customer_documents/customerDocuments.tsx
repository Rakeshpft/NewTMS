import React, { useContext, useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader } from 'reactstrap'
import { useCustomerContext } from '../../../../services/reducer/customer.reducer'
import { CustomerDocumentInitialState, ICustomerDocument, TCustomerProps } from '../../../../services/tms-objects/customer.types'
import { CustomTable } from '../../../../features/data-table/CustomTable'
import moment from 'moment'
import { HiOutlineDocumentDownload, HiOutlinePencilAlt } from 'react-icons/hi'
import { toastify } from '../../../../features/notification/toastify'
import { RxCross2 } from 'react-icons/rx'
import { isEmpty } from 'lodash'
import { Helper } from '../../../../features/shared/helper'
import { LoadingContext } from '../../../../services/context/loading.context'


const CustomerDocuments = (prop: TCustomerProps) => {
  const {
    customer_id = 0
  } = prop;
  const { postCustomerDocument, DocumentList, getCustomerDocument, deleteDocument } = useCustomerContext();
  const { setLoader } = useContext(LoadingContext);

  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [customerDocument, setCustomerDocument] = useState<ICustomerDocument>(CustomerDocumentInitialState);
  const [customerDocumentList, setCustomerDocumentList] = useState<ICustomerDocument[]>([]);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState<ICustomerDocument[] | []>([]);

  const UploadModalClose = () => {
    setUploadModalOpen(false);
    setCustomerDocument(CustomerDocumentInitialState)
  }

  useEffect(() => {
    if (customer_id > 0) {
      getCustomerDocument(customer_id);
    }
  }, []);

  useEffect(() => {
    if (DocumentList) {
      setCustomerDocumentList(DocumentList);
      setDeleteModalOpen(false);
    }
  }, [DocumentList])

  const handleDocumentInput =
    (prop: keyof ICustomerDocument) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setCustomerDocument({...customerDocument,[prop]: event.target.value, });
    };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setCustomerDocument({...customerDocument,file: event.target.files[0] })
    }
  }

  const handleSaveDocument = async (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: ICustomerDocument = { ...customerDocument };
    data.file = customerDocument.file == null ? new File([], "") : customerDocument.file;
    if (data.file.size == 0 && data.document_id == 0) {
      toastify({ message: "Please upload document.", type: "error", });
      return;
    }
    if (data.file.size > 0 || data.document_id > 0) {
      setLoader(true);
      await postCustomerDocument(customer_id, data).then((response: any) => {
        response && toastify({ message: response.message, type: response.success ? "success" : "error", });
        getCustomerDocument(customer_id)
        UploadModalClose();
        setLoader(false);
      });
    }
  }

  const handleDeleteDocuments = async () => {
    const deletedDocumentIds = selectedDocuments.map(doc => doc.document_id);
    setLoader(true);
    await deleteDocument(customer_id, deletedDocumentIds).then(response => {
        response && toastify({ message: response.message, type: response.success ? "success" : "error", });
        setDeleteModalOpen(false);
        setSelectedDocuments([]);
        setLoader(false);
      });
  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false);
    setSelectedDocuments([]);
  };

  const handleEditDocument = (id: number) => {
    const filteredData = customerDocumentList?.filter(l => l.document_id == id)
    if (filteredData && filteredData.length > 0) {
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
      style: { width: '20%' },
      sortable: true,
      selector: (row: ICustomerDocument) => row.created_date,
      format: (row: ICustomerDocument) => moment(row.created_date).format('L')
    },

    {
      id: 'notes',
      name: 'NOTES',
      style: { width: '65%' },
      sortable: true,
      selector: (row: ICustomerDocument) => row.notes
    },
    {
      id: "action",
      name: "Action",
      style: { width: "10%" },
      sortable: true,
      selector: (row: ICustomerDocument) => row.document_id,
      cell: (row: ICustomerDocument) =>
        <>
          <HiOutlineDocumentDownload className='me-2' size={22} style={{ cursor: "pointer" }} onClick={() => { Helper.FileDownload(row.document_url) }} />
          <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={() => { handleEditDocument(row.document_id) }} />
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
            <Button color="success" outline={true} onClick={() => { setUploadModalOpen(true) }
            }>
              <AiOutlinePlus /> Upload
            </Button>
          </label>
        </Col>
      </div>
      <CustomTable columns={columns} data={customerDocumentList} noRecordMessage="No Document found." canSelectRows={true} selectedTableRows={selectedDocuments} setSelectionTableRows={setSelectedDocuments} />

      <Modal isOpen={uploadModalOpen} onClose={UploadModalClose}>
        <ModalHeader close={closeBtn}
          onClose={() => UploadModalClose()}>
          <h6 className="mb-0 fw-bold">{customerDocument.document_id > 0 ? "Edit Document" : "Add Document"} </h6>
        </ModalHeader>
        <ModalBody
          className="square border border-info-rounded">
          <Form onSubmit={handleSaveDocument} encType="multipart/form-data" >
            <Label>Upload File</Label>
            <FormGroup>

              <Input type="file" name="file" id="file" onChange={handleFileUpload}
              />

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
          <h6 className="mb-0 fw-bold">Delete Document</h6>
        </ModalHeader>
        <ModalBody>
          <Container>
            {!isEmpty(selectedDocuments) && (
              <div className=" my-3 " >
                {selectedDocuments.length > 1 ? (<div>You have selected {selectedDocuments.length} documents.<br /></div>) : null}
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


