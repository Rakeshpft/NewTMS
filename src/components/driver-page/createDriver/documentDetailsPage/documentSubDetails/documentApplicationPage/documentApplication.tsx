import React, { useEffect, useState } from "react";
import { IDriverDoc, TDriverProps, initialDriverDoc } from "../../../../../../services/tms-objects/driver.types";
import moment from "moment";
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from "reactstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { CustomTable } from "../../../../../../features/data-table/CustomTable";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { useDriverContext } from "../../../../../../services/reducer/driver.reducer";
import { RxCross2 } from "react-icons/rx";
import { toastify } from "../../../../../../features/notification/toastify";
import { useListContext } from "../../../../../../services/reducer/list.reducer";


const DocumentApplication = ( props: TDriverProps) => {

  const { driver_id = 0 } = props
const { getDriverDocAppList  , driverDocAppList , driverLoading ,postApplication } = useDriverContext()
const {getFactorList , factorList } = useListContext()
  
const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [driverDocument, setDriverDocument] = useState<IDriverDoc>(initialDriverDoc);
  const [driverDocumentList, setDriverDocumentList] = useState<IDriverDoc[]>([]);
  
  const handleEditDocument = (id:number) => {
    const filteredData = driverDocumentList?.filter(l=>l.application_id == id)
    if (filteredData && filteredData.length>0) {      
      setDriverDocument(filteredData[0])
    }
    setUploadModalOpen(true);
  }

  useEffect(()=>{
    if(!driverLoading && driverDocAppList){
      setDriverDocumentList(driverDocAppList);
    }
  },[driverLoading,driverDocAppList])


  useEffect(() => {
    if(driver_id > 0)
    getDriverDocAppList(driver_id) 
    
  }, [])

  useEffect(() => {
    getFactorList()
  },[])

  const UploadModalClose = () => {
    setUploadModalOpen(false);
    setDriverDocument(initialDriverDoc);
  }

  const handleDriverInput = (prop: keyof IDriverDoc) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setDriverDocument({ ...driverDocument, [prop]: event.target.value });
  }

  const handleFileUpload = async(event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {      
      setDriverDocument({
        ...driverDocument,
        file : event.target.files[0]
      })
    }
  }

  const  handleSaveDocument = async(event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if(driverDocument.file){
      await postApplication(driverDocument , driver_id).then((data : any ) => {
        data &&
        toastify({
          message: data.message,
          type: data.success ? "success" : "error",
        });
      })
    }
    getDriverDocAppList(driver_id);
    UploadModalClose();
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
      id: 'status_id',
      name: 'Status',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverDoc) => row.status_id,
     
    },
    {
      id: 'application_date',
      name: 'Application Date',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverDoc) => row.application_date,
      format: (row: IDriverDoc) =>  moment(row.application_date).format('L')

    },
    {
      id: 'hire_date',
      name: 'Hire Date',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverDoc) => row.hire_date,
      format: (row: IDriverDoc) =>  moment(row.hire_date).format('L')
    },
    {
      id: 'termination_date',
      name: 'Termination Date',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverDoc) => row.termination_date,
      format: (row: IDriverDoc) =>  moment(row.termination_date).format('L')
    },
    {
      id: 'attachment',
      name: 'Attachment',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverDoc) => row.attachment,
      cell:(row:IDriverDoc)=><a href={row.attachment} target='_blank' download={true}>{row.attachment}</a>

    },
    {
      id : "action",
      name : "Action",
      style : {width : "10%"},
      sortable : true,
      selector : (row : IDriverDoc) => row.application_id,
      cell: (row: IDriverDoc) => <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={()=>{ handleEditDocument(row.application_id) }} />

    }
  
  ]

  return (

    <>
      <div className="d-flex justify-content-end m-3">
        <Col md={3} className=" d-flex justify-content-end align-items-end pb-3">
          <label className="page-subtitle">
            <Button color="success"  outline={true}  onClick={() => setUploadModalOpen(true)}><AiOutlinePlus />Add</Button>
          </label>
        </Col>
      </div>
      <CustomTable columns={columns} data={driverDocumentList} noRecordMessage="No Document found." />
      <Modal isOpen={uploadModalOpen} onClose={UploadModalClose}>
         
      <ModalHeader close={closeBtn}
                 onClose={() => UploadModalClose()}>
          <h6 className="mb-0 fw-bold">Edit Application </h6>
        </ModalHeader>
        <ModalBody className="square border border-info-rounded">
       
       <Form onSubmit={handleSaveDocument}>
       
       <Row>
        <Col md={6}>
          <FormGroup>
          <Label for="name">Status</Label>
          <Input bsSize="sm" className="form-control form-control-sm" type="select" id="user" name="user"  value={driverDocument.status_id} onChange={handleDriverInput('status_id')}>
      {
        factorList  && factorList.map((factor) => {
          return (
            <option value={factor.factor_id}>{factor.factor_name}</option>
          )
        })
      }
            </Input>
          
          </FormGroup>
        </Col>
        <Col md={6}>
        <FormGroup>
        <Label for="application_date">Application Date</Label>
       <Input bsSize="sm" className="form-control form-control-sm" type="date" id="application_date" name="application_date" value={driverDocument.application_date} onChange={handleDriverInput('application_date')} />
       
        </FormGroup>
        </Col>
       </Row>
       <Row>
       <Col md={6}>
        <FormGroup>
        <Label for="Hire_date">Hire Date</Label>
       <Input bsSize="sm" className="form-control form-control-sm" type="date" id="Hire_date" name="Hire_date" value={driverDocument.hire_date} onChange={handleDriverInput('hire_date')} />
       
        </FormGroup>
        </Col>
        <Col md={6}>
        <FormGroup>
        <Label for="termination_date">Termination Date</Label>
        <Input bsSize="sm" className="form-control form-control-sm" type="date" id="termination_date" value={driverDocument.termination_date} name="termination_date" onChange={handleDriverInput('termination_date')}  />
       
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
    </>

  );
}

export default DocumentApplication;
