import React, {  useEffect, useState } from "react";
import { ILoadProps, ILoadServiceDetention, ILoadServiceLumper, ILoadServiceOther, ILoadServices, ILoadServicesDriverPayable, loadServicesInitialState } from "../../services/tms-objects/load.type";

import { Modal, ModalHeader, ModalBody, Row, Col, FormGroup, Label, Input, Button , Form} from "reactstrap";
import { AiOutlinePlus } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import { useLoadContext } from "../../services/reducer/load.reducer";
import { CustomTable } from "../../features/data-table/CustomTable";
import { HiOutlinePencilAlt } from "react-icons/hi";
import LoadServicesNewCharge from "./load-services-new-charge";
import { toastify } from "../../features/notification/toastify";
import { useListContext } from "../../services/reducer/list.reducer";
import { Convert } from "../../features/shared/helper";
// import { Convert } from "../../features/shared/helper";

const LoadServices = (props: ILoadProps) => {
  const { load_id = 0 } = props;

  console.log(load_id);

  const { getLoadServiceList , loadServicesList , postServicesLumper , postServiceDetention , postServiceNewCharge , postLoadServicesDriverPayable} = useLoadContext();
  const { getPaymentCategoryList, paymentCategoryList , getLoadStopList , loadStopList } = useListContext(); 

  const [uploadModalOpen , setUploadModalOpen] = useState(0);
  const [serviceData , setServiceData] = useState<ILoadServices>(loadServicesInitialState);
  const [servicesList , setServicesList] = useState<ILoadServices[]>([]);

  useEffect(() => {
      if(loadServicesList){
        setServicesList(loadServicesList)
      }
  }, [loadServicesList])


useEffect(() => {
 if(load_id > 0) {
     getLoadServiceList(load_id);
 }

}, []);

useEffect(() => {
  getPaymentCategoryList()
  getLoadStopList(load_id) 
} , [])



const handleInputChange = (prop : keyof ILoadServices) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setServiceData({ ...serviceData, [prop]: event.target.value })
}

const handleEditLoadService = (service_type_id:number, service_id:number=0) => {
   
    if(service_id>0){
        if(loadServicesList){         
            const filteredData = loadServicesList?.filter(l=>l.load_service_id == service_id)
            if (filteredData && filteredData.length>0) {  
                setServiceData(filteredData[0])
            }
        }
    }      
    else { 
        setServiceData(loadServicesInitialState)
  }  
  setUploadModalOpen(service_type_id);
}


  const UploadModalClose = () => {
    setUploadModalOpen(0);
   
  }

  const handleFileUpload = async(event: React.ChangeEvent<HTMLInputElement>) => {
    if(event.target.files) {
     setServiceData({
       ...serviceData, file : event.target.files[0]
     })
    }
  }

  const closeBtn = (
    <button className="border-0 bg-transparent text-white" type="button" onClick={() => UploadModalClose()}>
      <RxCross2 />
    </button>
  );

  const handleSaveLumper = ( event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
   let lumperData : ILoadServiceLumper = {
     paid_by : serviceData.paid_by,
     amount : serviceData.amount,
     stop_id : serviceData.stop_id,
     notes : serviceData.notes,
     file : serviceData.file == null ? new File([] , "") : serviceData.file
      
   }

      if( lumperData.file.size == 0 &&  load_id > 0) {
        toastify({ message: "Please upload file", type: "error" });
        return ;
      }

      if( lumperData.file.size == 0 || load_id > 0 ) {
        postServicesLumper(load_id , lumperData).then((response ) => {
          response && toastify({ message: response.message,  type: (response.success ? "success" : "error") });
        })
      }

  }

  const handleSaveDetention = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let servicesDetention : ILoadServiceDetention =  {

      detention_amount : serviceData.amount,
      amount_payable_to_driver : serviceData.driver_payable,
      notes : serviceData.notes ,
      stop_id : serviceData.stop_id ,
      status : serviceData.status ,
      file : serviceData.file == null ? new File([] , "") : serviceData.file

    }

    if( servicesDetention.file.size == 0 &&  load_id > 0) {
      toastify({ message: "Please upload file", type: "error" });
      return ;
    }

    if ( servicesDetention.file.size == 0 ||  load_id > 0) {
      postServiceDetention(load_id , servicesDetention).then((response) => {
        response && toastify({ message: response.message, type: response.success ? "success" : "error" });
      });
    }
  };

  const handleDetentionStatus = ( ) => {
    setServiceData({ ...serviceData, status : !serviceData.status })
  }

  const handleSaveNewCharge = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

  let newChargeData : ILoadServiceOther = {

    payment_category_id : serviceData.payment_category_id,
    amount : serviceData.amount,
    notes : serviceData.notes,
    stop_id : serviceData.stop_id, 
    schedule_type_id : serviceData.schedule_type_id,
    file : serviceData.file == null ? new File([] , "") : serviceData.file
    
  }

  if(newChargeData.file.size == 0 &&  load_id > 0) {
    toastify({ message: "Please upload file", type: "error" });
    return ;
  }

    if ( newChargeData.file.size == 0 ||  load_id > 0) {
        postServiceNewCharge(load_id , newChargeData   ).then((response) => {
            response && toastify({ message: response.message, type: response.success ? "success" : "error" });
        })
    }
  }


  const handleSaveDriverPayable = (event : React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();

    let driverPayableData : ILoadServicesDriverPayable  = {

      payment_category_id : serviceData.payment_category_id,
      stop_id : serviceData.stop_id,
      amount_payable_to_driver : serviceData.driver_payable,
      notes : serviceData.notes,
      file : serviceData.file == null ? new File([] , "") : serviceData.file ,
      
    }

    if(driverPayableData.file.size==0 && load_id > 0) {
      toastify({ message: "Please upload file", type: "error" });
      return ;
    }

    if( driverPayableData.file.size == 0 || load_id > 0 ) 
      {
        postLoadServicesDriverPayable( load_id , driverPayableData ).then((response) => {
      response && toastify({ message: response.message, type: response.success ? "success" : "error" });
      })
     }
  }



 const  columns : CustomTableColumn[]  = [

    {
        id: "category",
        name: "CATEGORY",
        style: { width: "10%" },
        sortable:true,
        selector: (row:ILoadServices ) => row.payment_category_name,
       
      },

      { 
        id: "amount",
        name: "AMOUNT",
        style: { width: "10%" },
        sortable:true,
        selector: (row: ILoadServices) => row.amount,
       format: (row: ILoadServices) =>  Convert.ToUserAmount(row.amount)

      },

      {
        id: "paid_by",
        name: "PAID BY",
        style: { width: "10%" },
        sortable:true,
        selector: (row:ILoadServices ) => row.paid_by,
       
      },

      {
        id: "stop_name",
        name: "STOP",
        style: { width: "10%" },
        sortable:true,
        selector: (row:ILoadServices ) => row.stop_name,
       
      },
      {
        id: "notes",
        name: "NOTES",
        style: { width: "10%" },
        sortable:true,
        selector: (row:ILoadServices ) => row.notes,
      },

      {
        id : "action",
        name : "",
        style : {width : "15%"},
        sortable : false,
        align:'center',
        selector : (row : ILoadServices) => row.service_type_id,
        cell: (row: ILoadServices) => 
        <>
          <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={()=>{ handleEditLoadService(row.service_type_id,row.load_service_id) }} />
        </>
      }  

 ]


  return (
    <>
      <div className="d-flex justify-content-end m-3">
        <Col md={8} className=" d-flex justify-content-end align-items-end pb-3 column-gap-3">
          <label className="page-subtitle mb-0">
            <Button color="success" outline={true} onClick={() => handleEditLoadService(1)}>
              <AiOutlinePlus /> New Lumper
            </Button>
          </label>
          <label className="page-subtitle mb-0">
            <Button color="success" outline={true} onClick={() => handleEditLoadService(2)}>
              <AiOutlinePlus /> New Detention
            </Button>
          </label>
          <label className="page-subtitle mb-0">
            <Button color="success" outline={true} onClick={() => handleEditLoadService(3)}>
              <AiOutlinePlus /> Other Addition/Deductions
            </Button>
          </label>
          <label className="page-subtitle mb-0">
            <Button color="success" outline={true} onClick={() => handleEditLoadService(4)}>
              <AiOutlinePlus /> Driver Payable
            </Button>
          </label>
        </Col>
      </div>
      <CustomTable data={servicesList} columns={columns} noRecordMessage="No Services Added." />

      <Modal isOpen={uploadModalOpen == 1} onClose={UploadModalClose} >
        <ModalHeader close={closeBtn} onClose={() => UploadModalClose()}>
          <h6 className="mb-0 fw-bold"> New Lumper </h6>
        </ModalHeader>
        <ModalBody className="square border border-info-rounded">
          <Form onSubmit={handleSaveLumper}>
            <Row>
              <Row>
                <Col md={12}> Paid by </Col>
              </Row>
              <Row>
                <Col md={3} className="gap-2 my-2">
                    <Input name="radio2" type="radio" checked={serviceData.paid_by == 1} value={1} onChange={handleInputChange("paid_by")}/>
                    <Label for="notes">Company</Label>
                </Col>
                <Col md={3} className="gap-2 my-2">
                    <Input name="radio2" type="radio" checked={serviceData.paid_by == 2} value={2}   onChange={handleInputChange("paid_by")}/>
                    <Label for="notes">Broker</Label>
                </Col>
                <Col md={3} className="gap-2 my-2">
                    <Input name="radio2" type="radio"  checked={serviceData.paid_by == 3} value={3}  onChange={handleInputChange("paid_by")}/>
                    <Label for="notes">Driver</Label>
                </Col>
                
                
              </Row>
            </Row>

            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="deliveryZip">Amount </Label>
                  <Input id="deliveryZip" name="deliveryZip" bsSize="sm" type="text" className="form-control form-control-sm" value={serviceData.amount} onChange={handleInputChange("amount")} />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="deliveryZip">Stop</Label>
                  <Input id="deliveryZip" name="deliveryZip" bsSize="sm" type="select" className="form-control form-control-sm" value={serviceData.stop_id} onChange={handleInputChange("stop_id")} >
                   <option value={0}>Select Stop</option>
                   {
                     loadStopList && loadStopList.length > 0 && loadStopList.map((stopItem ) => 
                      <option value = {stopItem.load_stop_id}>{  stopItem.load_stop_name} </option>
                      )
                   }
                 </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="notes">Notes</Label>
                  <Input bsSize="sm" className="form-control form-control-sm" type="textarea" id="notes" name="notes" value={serviceData.notes} onChange={handleInputChange("notes")} />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>ATTACHMENTS</Label>
                  <Input type="file" name="file" id="file" onChange={handleFileUpload} />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup className=" d-flex justify-content-end mt-3 column-gap-2 ">
              <Button color="primary" className="px-4 mr-3 shadow save-button" type="submit">
                Save
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
      <Modal isOpen={uploadModalOpen == 2} onClose={UploadModalClose}>
        <ModalHeader close={closeBtn} onClose={() => UploadModalClose()}>
          <h6 className="mb-0 fw-bold"> New Detention </h6>
        </ModalHeader>
        <ModalBody className="square border border-info-rounded">
          <Form onSubmit={handleSaveDetention}>
            <Row>
              <Col md={6}>
              <Label for="status">Status</Label>
              <FormGroup switch>
                <Input name="checkBox" type="switch"  checked={serviceData.status}  onChange={handleDetentionStatus} />
              </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={6} >
                <FormGroup>
                  <Label for="deliveryZip"> Detention Amount </Label>
                  <Input id="deliveryZip" name="deliveryZip" bsSize="sm" type="text" className="form-control form-control-sm" value={serviceData.amount} onChange={handleInputChange("amount")} />
                </FormGroup>
              </Col>
              <Col  md={6}>
                <FormGroup>
                  <Label for="deliveryZip">Stop</Label>
                  <Input id="deliveryZip" name="deliveryZip" bsSize="sm" type="select" className="form-control form-control-sm" value={serviceData.stop_id} onChange={handleInputChange("stop_id")} >
                <option value = {0}>Select Stop</option>
                {
                  loadStopList && loadStopList.length > 0  && loadStopList.map((stopItem) => 
                  <option  value = {stopItem.load_stop_id}> {stopItem.load_stop_name}</option>
                  
                  )
                }
                </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="deliveryZip"> Amount Payable to the Driver </Label>
                  <Input id="deliveryZip" name="deliveryZip" bsSize="sm" type="text" className="form-control form-control-sm" value={serviceData.driver_payable} onChange={handleInputChange("driver_payable")} />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>ATTACHMENTS</Label>
                  <Input type="file" name="file" id="file" onChange={handleFileUpload} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="notes">Notes</Label>
                  <Input bsSize="sm" className="form-control form-control-sm" type="textarea" id="notes" name="notes" value={serviceData.notes} onChange={handleInputChange("notes")} />
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
      <LoadServicesNewCharge modalOpen={uploadModalOpen == 3} modalClose={UploadModalClose} closeBtn={closeBtn} serviceData={serviceData} handleSaveNewCharge={handleSaveNewCharge} handleInputChange={handleInputChange} handleNewChargeFileChange = {handleFileUpload} />
    
      <Modal isOpen={uploadModalOpen == 4} onClose={UploadModalClose}>
        <ModalHeader close={closeBtn} onClose={() => UploadModalClose()}>
          <h6 className="mb-0 fw-bold"> Driver Payable </h6>
        </ModalHeader>
        <ModalBody className="square border border-info-rounded">
          <Form onSubmit={handleSaveDriverPayable}>
            
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="deliveryZip">Category </Label>
                  <Input id="deliveryZip" name="deliveryZip" bsSize="sm" type="select" className="form-control form-control-sm" value={serviceData.payment_category_id} onChange={handleInputChange("payment_category_id")}>
                    <option value={0}> Select Category</option>
                    {paymentCategoryList &&
                      paymentCategoryList.length > 0 &&
                      paymentCategoryList.map((item) => (
                        <option key={item.payment_category_id} value={item.payment_category_id}>
                          {item.payment_category_name}
                        </option>
                      ))}
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="deliveryZip">Amount</Label>
                  <Input id="deliveryZip" name="deliveryZip" bsSize="sm" type="text" className="form-control form-control-sm" value={serviceData.driver_payable} onChange={handleInputChange("driver_payable")} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="deliveryZip">Stop </Label>
                  <Input id="deliveryZip" name="deliveryZip" bsSize="sm" type="select" className="form-control form-control-sm" value={serviceData.stop_id} onChange={handleInputChange("stop_id")} >
                  <option value={0}>Select Stop</option>
                    {
                      loadStopList && loadStopList.length > 0 && loadStopList.map((stopItem) =>
                      <option value = {stopItem.load_stop_id}> {stopItem.load_stop_name}</option>
                      )
                 
                  }
                  </Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Upload Charge Document </Label>
                  <Input id="file" name="file" bsSize="sm" type="file" className="form-control form-control-sm" onChange={handleFileUpload} />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="deliveryZip">Notes</Label>
                  <Input id="deliveryZip" name="deliveryZip" bsSize="sm" type="textarea" className="form-control form-control-sm" value={serviceData.notes} onChange={handleInputChange("notes")} />
                </FormGroup>
              </Col>
            </Row>
            <FormGroup className=" d-flex justify-content-end mt-3 column-gap-2 ">
              <Button color="primary" className="px-4 mr-3 shadow save-button" type='submit'>
                Save
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </>
  );
};

export default LoadServices;
