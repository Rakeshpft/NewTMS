import React, { useEffect, useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { Button, Col, Container, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import moment from 'moment'
import { isEmpty } from 'lodash'
import { ITrailerDocument, TtrailerProps, trailerDocumentInitialState } from '../../../../../services/tms-objects/trailer.types'
import { useTrailerContext } from '../../../../../services/reducer/trailer.reducer'
import { CustomTable } from '../../../../../features/data-table/CustomTable'
import ReactDatePicker from 'react-datepicker'
import { Convert, Dictionary } from '../../../../../features/validation/general-helper'
import { toastify } from '../../../../../features/notification/toastify'


const RepairsMaintenanceDocuments = (props: TtrailerProps) => {
    const {
        trailer_id = 0
    } = props;
    const { getRepairMaintenanceDocument, RepairMaintenanceDocumentList, postRepairMaintenanceDocument, deleteRepairMaintenanceDocument } = useTrailerContext();
    const [uploadModalOpen, setUploadModalOpen] = useState(false);
    const [trailerDocument, setTrailerDocument] = useState<ITrailerDocument>(trailerDocumentInitialState);
    const [trailerDocumentList, setTrailerDocumentList] = useState<ITrailerDocument[]>([]);
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedDocuments, setSelectedDocuments] = useState<ITrailerDocument[] | []>([]);

    useEffect(() => {
        if (trailer_id > 0) {
            getRepairMaintenanceDocument(trailer_id);
        }
        else{
            setTrailerDocumentList([]);
        }
    }, [trailer_id]);

    useEffect(() => {
        if (RepairMaintenanceDocumentList && trailer_id>0) {
            setTrailerDocumentList(RepairMaintenanceDocumentList);
            setDeleteModalOpen(false)
        }
    }, [RepairMaintenanceDocumentList])
    
    const UploadModalClose = () => {
        setUploadModalOpen(false);
        setTrailerDocument(trailerDocumentInitialState);
    }

    const handleDocumentInput =
        (prop: keyof ITrailerDocument) =>
            (event: React.ChangeEvent<HTMLInputElement>) => {
                setTrailerDocument({
                    ...trailerDocument,
                    [prop]: event.target.value,
                });
            };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setTrailerDocument({
                ...trailerDocument,
                file: event.target.files[0]
            })
        }
    }

    const handleSaveDocument = (event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(new Date(trailerDocument.expiry_date) < new Date(trailerDocument.issue_date)){
            toastify({message: "Expiry date must be after the issue date", type: "error"});
        }
        else if (trailerDocument.file) {
            postRepairMaintenanceDocument(trailer_id, trailerDocument).then((data: any) => {
                data && toastify({ message: data.message, type: data.success ? "success" : "error" });
                data.success && getRepairMaintenanceDocument(trailer_id);
                UploadModalClose();
            });
        }
    }

    const handleDeleteDocuments = () => {
        const deletedDocumentIds = selectedDocuments.map(doc => doc.document_id);
        deleteRepairMaintenanceDocument(trailer_id, deletedDocumentIds).then(response => {
            response && toastify({ message: response.message, type: (response.success ? "success" : "error") });
            response.success && getRepairMaintenanceDocument(trailer_id);
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
            id: "created_date",
            name: "ISSUE DATE",
            style: { width: "10%" },
            sortable: true,
            selector: (row: ITrailerDocument) => row.issue_date,
            format: (row: ITrailerDocument) => moment(row.issue_date).format('L')
        },
        {
            id: "created_date",
            name: "EXP DATE",
            style: { width: "10%" },
            sortable: true,
            selector: (row: ITrailerDocument) => row.expiry_date,
            format: (row: ITrailerDocument) => moment(row.expiry_date).format('L')
        },
        {
            id: "attachment",
            name: "Attachment",
            style: { width: "30%" },
            sortable: true,
            selector: (row: ITrailerDocument) => row.attachment,
            cell: (row: ITrailerDocument) => <a href={row.attachment} target='_blank' download={true}>{row.name}</a>
        },

        {
            id: "name",
            name: "Name",
            style: { width: "10%" },
            sortable: true,
            selector: (row: ITrailerDocument) => row.name,
        },
        {
            id: "notes",
            name: "NOTES",
            style: { width: "10%" },
            sortable: true,
            selector: (row: ITrailerDocument) => row.notes,
        },

        {
            id: "action",
            name: "Action",
            style: { width: "5%" },
            sortable: true,
            selector: (row: ITrailerDocument) => row.document_id,
            cell: (row: ITrailerDocument) => <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={() => { handleEditDocument(row.document_id); }} />
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
                    <h6 className="mb-0 fw-bold">Edit Document </h6>
                </ModalHeader>
                <ModalBody
                    className="square border border-info-rounded">
                    <Form onSubmit={handleSaveDocument} encType="multipart/form-data" >


                        <Row className="page-content align-items-center">
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="issue_date">ISSUE Date</Label>
                                    <ReactDatePicker showYearDropdown showMonthDropdown placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="issue_date" className="form-control form-control-sm" onChange={(date) => { setTrailerDocument({ ...trailerDocument, issue_date: Convert.ToISODate(date) }) }} selected={Convert.ToDate(trailerDocument.issue_date)} >

                                    </ReactDatePicker>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="expiry_date">EXP Date</Label>
                                    <ReactDatePicker showYearDropdown showMonthDropdown placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="expiry_date" className="form-control form-control-sm" onChange={(date) => { setTrailerDocument({ ...trailerDocument, expiry_date: Convert.ToISODate(date) }) }} selected={Convert.ToDate(trailerDocument.expiry_date)} >

                                    </ReactDatePicker>
                                </FormGroup>
                            </Col>
                        </Row>

                        <Row className="page-content align-items-center">
                            <Col md={6}>
                                <Label>Upload File</Label>
                                <FormGroup>
                                    <Input type="file" name="file" id="file" onChange={handleFileUpload} />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label>Name</Label>
                                    <FormGroup>
                                        <Input bsSize="sm" className="form-control" type="text" id="name" name="name"
                                            value={trailerDocument.name} onChange={handleDocumentInput("name")} />
                                    </FormGroup>
                                </FormGroup>
                            </Col>

                        </Row>

                        <Label for="exampleText">Notes</Label>
                        <Input id="notes" name="notes" type="textarea" value={trailerDocument.notes} onChange={handleDocumentInput("notes")} />
                        <FormGroup className=" d-flex justify-content-end mt-3 column-gap-2 ">

                            <Button color="primary" className="px-4 mr-3" type="submit">Save</Button>
                            <Button color="danger" outline={true} className="px-4 mr-3" onClick={() => UploadModalClose()}>Cancel</Button>
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
                                    : `Are you sure you want to delete   " ${selectedDocuments[0].name}"?`}
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

export default RepairsMaintenanceDocuments