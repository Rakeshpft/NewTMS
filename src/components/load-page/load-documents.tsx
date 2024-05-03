import React, { useEffect, useState } from 'react'
import { ILoadDocuments, ILoadProps, initialLoadDocuments } from '../../services/tms-objects/load.type'
import { Convert } from '../../features/shared/helper';
import { CustomTable } from '../../features/data-table/CustomTable';
import { useLoadContext } from '../../services/reducer/load.reducer';
import { Modal, ModalHeader, ModalBody, Row, Col, Label, FormGroup, Input, Button ,Form } from 'reactstrap';
import { HiOutlinePencilAlt } from 'react-icons/hi';
import { RxCross2 } from 'react-icons/rx';
import { AiOutlinePlus } from 'react-icons/ai';
import { toastify } from '../../features/notification/toastify';

const LoadDocuments = ( props: ILoadProps) => {
    const { load_id = 0 } = props;

    const { getLoadDocumentsList ,loadDocumentsList , postLoadDocuments } = useLoadContext();

    const [ uploadModalOpen , setUploadModalOpen ] = useState(false)
    const [documnetsData , setDocumnetsData] = useState<ILoadDocuments>(initialLoadDocuments)
    const [ documentsLists , setDocumentsLists ] = useState<ILoadDocuments[]>([]);

    useEffect(() => {
       if(loadDocumentsList) {
        setDocumentsLists(loadDocumentsList)
       }
    } , [loadDocumentsList])

    useEffect(() => {
        if( load_id > 0 )
        getLoadDocumentsList( load_id );
    }, [])

   const handleEditDocument = (id: number) => {

    if(id > 0) {
         const filteredData = documentsLists?.filter(l => l.load_document_id == id)
        if (filteredData && filteredData.length > 0) {
            setDocumnetsData(filteredData[0])
        }
    }
    else{
        setDocumnetsData(initialLoadDocuments)
    }

    setUploadModalOpen(true);
       
    }

    const closeBtn = (
        <button className="border-0 bg-transparent text-white" type="button" onClick={() => UploadModalClose()}>
          <RxCross2 />
        </button>
      );

      const UploadModalClose = () => {
        setUploadModalOpen(false);
      }

      const handleInputChange = (prop : keyof ILoadDocuments) => (event : React.ChangeEvent<HTMLInputElement>) => {
        setDocumnetsData({ ...documnetsData , [prop]: event.target.value })
      }

      const handleNewChargeFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       if(event.target.files){
        setDocumnetsData({ ...documnetsData ,  file : event.target.files[0] })
       }
      }

      const saveLoadDocuments = ( event : React.ChangeEvent<HTMLFormElement>) => {

        event.preventDefault()

        postLoadDocuments(load_id , documnetsData ).then((response) => {

            response && toastify({ message : response.message , type : (response.success ? "success" : "error") })
        })
          
        getLoadDocumentsList(load_id)
        UploadModalClose()
      }

    const columns: CustomTableColumn[] = 
    [
        {
            id: "created_date",
            name: "CREATED DATE" ,
            style: { width: "20%" },
            sortable:true, 
            selector: (row:ILoadDocuments ) => row.created_date,
            format: (row: ILoadDocuments) =>  Convert.ToUserDate(row.created_date),

        },
        {
            id:"type",
            name:"TYPE",
            style: { width: "20%" },
            sortable:true, 
            selector: (row:ILoadDocuments ) => row.type,
            
        },
        {
            id:"notes",
            name: "NOTES",
            style: { width: "60%" },
            selector: (row:ILoadDocuments ) => row.notes,
        },

        {
            id:"action",
            name: "",
            style: { width: "10%" },
            selector: (row:ILoadDocuments ) => row.load_document_id,
            cell: (row: ILoadDocuments) => ( <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={() => { handleEditDocument(row.load_document_id) }} /> ),
        }

    ]

  return (

    <>

<div className="d-flex justify-content-end m-3">
        <Col md={3} className=" d-flex justify-content-end align-items-end pb-3 column-gap-3" >
          <label className="page-subtitle mb-0" >
            <Button color="success"  outline={true}  onClick={() => setUploadModalOpen(true)} > <AiOutlinePlus /> Upload Documents </Button>
          </label>
        </Col>
      </div>


           <CustomTable columns = {columns} data={documentsLists} noRecordMessage="No Document found." />
             
           <Modal isOpen={uploadModalOpen} onClose={UploadModalClose}>
             <ModalHeader close={closeBtn} onClose={() => UploadModalClose()}>
          <h6 className="mb-0 fw-bold"> New Detention </h6>
        </ModalHeader>
        <ModalBody className="square border border-info-rounded">
          <Form on onSubmit={saveLoadDocuments} >
          
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="deliveryZip"> Type </Label>
                  <Input id="deliveryZip" name="deliveryZip" bsSize="sm" type="text" className="form-control form-control-sm" value={documnetsData.type}  onChange={handleInputChange("type")} />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>ATTACHMENTS</Label>
                  <Input type="file" name="file" id="file" onChange = {handleNewChargeFileChange}  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="notes">Notes</Label>
                  <Input bsSize="sm" className="form-control form-control-sm" type="textarea" id="notes" name="notes" value={documnetsData.notes} onChange={handleInputChange("notes")}  />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup className=" d-flex justify-content-end mt-3 column-gap-2 ">
              <Button color="primary" className="px-4 mr-3 shadow save-button" type ="submit">
                Save
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
         
   </>

  )
}

export default LoadDocuments
