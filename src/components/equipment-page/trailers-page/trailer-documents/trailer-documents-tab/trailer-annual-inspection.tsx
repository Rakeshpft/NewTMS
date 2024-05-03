import React, { useContext, useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { HiOutlineDocumentDownload, HiOutlinePencilAlt } from 'react-icons/hi'
import { isEmpty } from 'lodash'
import { ITrailerDocument, TtrailerProps, trailerDocumentInitialState } from '../../../../../services/tms-objects/trailer.types'
import { useTrailerContext } from '../../../../../services/reducer/trailer.reducer'
import { CustomTable } from '../../../../../features/data-table/CustomTable'
import { toastify } from '../../../../../features/notification/toastify'
import ReactDatePicker from 'react-datepicker'
import { Convert, Dictionary, Helper } from '../../../../../features/shared/helper'
import { LoadingContext } from '../../../../../services/context/loading.context'


const AnnualInspectionDocuments = (props: TtrailerProps) => {
    const {
        trailer_id = 0
    } = props;
    const { getAnnualInspectionDocument, AnnualInspectionDocumentList, postAnnualInspectionDocument, deleteAnnualInspectionDocument } = useTrailerContext();
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const { setLoader } = useContext(LoadingContext);
    const [trailerDocument, setTrailerDocument] = useState<ITrailerDocument>(trailerDocumentInitialState);
    const [trailerDocumentList, setTrailerDocumentList] = useState<ITrailerDocument[]>([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedDocuments, setSelectedDocuments] = useState<ITrailerDocument[] | []>([]);

    useEffect(() => {
        if (trailer_id > 0) {
            getAnnualInspectionDocument(trailer_id);
        }
        else {
            setTrailerDocumentList([]);
        }
    }, [trailer_id]);

    useEffect(() => {
        if (AnnualInspectionDocumentList && trailer_id > 0) {
            setTrailerDocumentList(AnnualInspectionDocumentList);
            setDeleteModalOpen(false)
        }
    }, [AnnualInspectionDocumentList]);

    const UploadModalClose = () => {
        setUploadModalOpen(false);
        setTrailerDocument(trailerDocumentInitialState);
    }

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setTrailerDocument({
                ...trailerDocument,
                file: event.target.files[0]
            })
        }
    }

    const handleSaveDocument = async (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (new Date(trailerDocument.expiry_date) < new Date(trailerDocument.issue_date)) {
            toastify({ message: "Expiry date must be after the issue date", type: "error" });
            return;
        }
        const data: ITrailerDocument = { ...trailerDocument };
        data.file = trailerDocument.file == null ? new File([], "") : trailerDocument.file;
        if (data.file.size == 0 && data.document_id == 0) {
            toastify({ message: "Please upload document.", type: "error", });
            return;
        }
        if (data.file.size > 0 || data.document_id > 0) {
            setLoader(true);
            await postAnnualInspectionDocument(trailer_id, data).then((response: any) => {
                response && toastify({ message: response.message, type: response.success ? "success" : "error", });
                getAnnualInspectionDocument(trailer_id)
                UploadModalClose();
                setLoader(false);
            });
            
        }
    }

    const handleDeleteDocuments = () => {
        const deletedDocumentIds = selectedDocuments.map(doc => doc.document_id);
        setLoader(true)
        deleteAnnualInspectionDocument(trailer_id, deletedDocumentIds).then(response => {
            response && toastify({ message: response.message, type: (response.success ? "success" : "error") });
            response.success && getAnnualInspectionDocument(trailer_id);
            setLoader(false)
        })
        setSelectedDocuments([]);
    };

    const closeDeleteModal = () => {
        setDeleteModalOpen(false);
        setSelectedDocuments([]);
    };

    const handleEditDocument = (id: number) => {
        const filteredData = trailerDocumentList?.filter(l => l.document_id == id)
        if (filteredData && filteredData.length > 0) {
            setTrailerDocument(filteredData[0])
        }
        setUploadModalOpen(true);
    }

    const columns: CustomTableColumn[] = [
        {
            id: "issue_date",
            name: "ISSUE DATE",
            style: { width: "40%" },
            sortable: true,
            selector: (row: ITrailerDocument) => row.issue_date,
            format: (row: ITrailerDocument) => Convert.ToUserDate(row.issue_date)
        },
        {
            id: "expiry_date",
            name: "EXPIRY DATE",
            style: { width: "40%" },
            sortable: true,
            selector: (row: ITrailerDocument) => row.expiry_date,
            format: (row: ITrailerDocument) => Convert.ToUserDate(row.expiry_date)
        },
        {
            id: "action",
            name: "ACTION",
            style: { width: "15%" },
            sortable: false,
            selector: (row: ITrailerDocument) => row.document_id,
            cell: (row: ITrailerDocument) =>
                <>
                    <HiOutlineDocumentDownload className='me-2' size={22} style={{ cursor: "pointer" }} onClick={() => { Helper.FileDownload(row.attachment_url) }} />
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
            <CustomTable columns={columns} data={trailerDocumentList} noRecordMessage="No Document found." canSelectRows={true} selectedTableRows={selectedDocuments} setSelectionTableRows={setSelectedDocuments} />


            <Modal isOpen={uploadModalOpen} onClose={UploadModalClose}>
                <ModalHeader>
                    <h6 className="mb-0 fw-bold">{trailerDocument.trailer_id == 0 ? "Add Annual Inspection Document" : "Edit Annual Inspection Document"}</h6>
                </ModalHeader>
                <ModalBody
                    className="square border border-info-rounded">
                    <Form onSubmit={handleSaveDocument} encType="multipart/form-data" >
                        <Row className="page-content align-items-center">
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="issue_date">Issue Date</Label>
                                    <ReactDatePicker showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event) => { event.preventDefault() }} placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="issue_date" className="form-control form-control-sm" onChange={(date) => { setTrailerDocument({ ...trailerDocument, issue_date: Convert.ToISODate(date) }) }} selected={Convert.ToDate(trailerDocument.issue_date)} required autoComplete="off" />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="expiry_date">Expiry Date</Label>
                                    <ReactDatePicker showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event) => { event.preventDefault() }} placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="expiry_date" className="form-control form-control-sm" onChange={(date) => { setTrailerDocument({ ...trailerDocument, expiry_date: Convert.ToISODate(date) }) }} selected={Convert.ToDate(trailerDocument.expiry_date)} required autoComplete="off" />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Label>Upload File</Label>
                        <FormGroup>
                            <Input type="file" name="file" id="file" onChange={handleFileUpload} autoComplete="off" />
                        </FormGroup>
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

export default AnnualInspectionDocuments