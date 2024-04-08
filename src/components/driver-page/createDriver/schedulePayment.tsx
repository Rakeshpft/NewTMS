import React, { useEffect, useState } from 'react'
import { IDriverSchedulePayee, TDriverProps, initialDriverSchedule } from '../../../services/tms-objects/driver.types'
import moment from 'moment'
import { HiOutlinePencilAlt } from 'react-icons/hi'
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import { CustomTable } from '../../../features/data-table/CustomTable'
import { AiOutlinePlus } from 'react-icons/ai'
import { useDriverContext } from '../../../services/reducer/driver.reducer'
import { RxCross2 } from 'react-icons/rx'
import { useListContext } from '../../../services/reducer/list.reducer'
import { toastify } from '../../../features/notification/toastify'
// import SchedulePayemntModal from './schedulePayemntModal'


const SchedulePayment = ( props : TDriverProps) => {


  const { driver_id = 0 } = props

const {getDriverSchedule , driverScheduleLists ,getIndividualSchedulePayee  ,postDriverSchedulePayee ,driverLoading  }   = useDriverContext();
const { getPaymentCategoryList , paymentCategoryList ,getScheduleFrequencyList  , scheduleFrequencyList } = useListContext()

const [uploadModalOpen, setUploadModalOpen] = useState(false);
const [driverSchedulePayee, setDriverSchedulePayee] = useState<IDriverSchedulePayee>(initialDriverSchedule);
const [driverSchedulePayeeList , setDriverSchedulePayeeList] = useState<IDriverSchedulePayee[]>([]);
  


 
    const handleCheckBox = () => {
      setDriverSchedulePayee({ ...driverSchedulePayee, is_active: !driverSchedulePayee.is_active });
    };
  

  

  const UploadModalClose = () => {
    setUploadModalOpen(false);
    setDriverSchedulePayee(initialDriverSchedule);
  }

  useEffect(() => {
    if (!driverLoading && driverScheduleLists ) {
      setDriverSchedulePayeeList(driverScheduleLists);
     
    }
  }, [driverLoading, driverScheduleLists]);

  
  const handleInputSchedulePayeeChange =
    (prop: keyof IDriverSchedulePayee ) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setDriverSchedulePayee({ ...driverSchedulePayee, [prop]: event.target.value });

      };

      const handleEditSchedulePayee = ( schedule_id : number ) => {
       
        const filteredData = driverScheduleLists?.filter(l=>l.schedule_id == schedule_id)
        if (filteredData && filteredData.length>0) {      
          setDriverSchedulePayee(filteredData[0])
        }
        getIndividualSchedulePayee(driver_id , schedule_id)
        setUploadModalOpen(true)
        
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
      const handleSchedulePayeeSave = async ( event: React.ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
     await  postDriverSchedulePayee(driver_id, driverSchedulePayee).then((response ) => {
          response &&  response.message && toastify({ message: response.message, type: (response.success ? "success" : "error") })
        })

      }


useEffect(() => {
  getDriverSchedule(driver_id)
  getPaymentCategoryList()
  getScheduleFrequencyList()
  
}, [])

  const columns: CustomTableColumn[] = [

    {
       id: 'categgory',
       name: 'CATEGORY',
       style: { width: '10%' },
       sortable: true,
       selector: (row: IDriverSchedulePayee) => row.payment_category_name,
      
     },
     {
      id: 'amount',
      name: 'AMOUNT',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverSchedulePayee) => row.amount,
     
    },
    {
      id: 'schedule',
      name: 'SCHEDULE',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverSchedulePayee) => row.schedule_frequency_name,
      format: (row: IDriverSchedulePayee) =>  moment(row.schedule_frequency_name).format('L')
    },
     {
       id: 'last',
       name: 'LAST',
       style: { width: '10%' },
       sortable: true,
       selector: (row: IDriverSchedulePayee) => row.last_date_of_trans,
       format: (row: IDriverSchedulePayee) =>  moment(row.last_date_of_trans).format('L')
 
     },
     {
      id: 'last',
      name: 'NEXT',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverSchedulePayee) => row.next_date_of_trans,
      format: (row: IDriverSchedulePayee) =>  moment(row.next_date_of_trans).format('L')

    },
   
    {
      id: 'is_active',
      name: 'ACTIVE',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverSchedulePayee) => row.is_active,
     
    },
    {
      id: 'notes',
      name: 'NOTES',
      style: { width: '10%' },
      sortable: true,
      selector: (row: IDriverSchedulePayee) => row.notes,
     
    },
    
     {
       id : "action",
       name : "",
       style : {width : "10%"},
       sortable : true,
       selector : (row : IDriverSchedulePayee) => row.driver_id,
       cell: (row: IDriverSchedulePayee) => ( <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={() => handleEditSchedulePayee(row.schedule_id)} />)
 
     }
   
   ]

  return (
    <div>
    <div className="d-flex justify-content-end m-3">
        <Col md={3} className=" d-flex justify-content-end align-items-end pb-3">
          <label className="page-subtitle">
            <Button color="success"  outline={true}  onClick={() => setUploadModalOpen(true)}><AiOutlinePlus />Add</Button>
          </label>
        </Col>
      </div>
      <div className="d-flex align-items-center gap-1">

      
      </div>
      <CustomTable columns={columns} data={driverSchedulePayeeList} noRecordMessage="No Document found." />
      <Modal isOpen={uploadModalOpen} onClose={UploadModalClose} >
       <ModalHeader close={closeBtn}
                  onClose={() => UploadModalClose()}>
          <h6 className="mb-0 fw-bold">Edit Application </h6>
        </ModalHeader>
        <ModalBody className="square border border-info-rounded">
        <Form onSubmit={handleSchedulePayeeSave}>
        <Row>
        <Col md={6}>
          <FormGroup>
          <Label for="name">Category</Label>
          <Input bsSize="sm" className="form-control form-control-sm" type="select" id="user" name="user"  value={driverSchedulePayee.payment_category_id} onChange={handleInputSchedulePayeeChange('payment_category_id')}>
           {paymentCategoryList && paymentCategoryList.length>0 && paymentCategoryList.map((item, index) => (
             <option key={index} value={item.payment_category_id}>{item.payment_category_name}</option>
           ))}
            </Input>
          
          </FormGroup>
        </Col>
        <Col md={6}>
        <FormGroup>
          <Label for="name">Schedule Type </Label>
          <Input bsSize="sm" className="form-control form-control-sm" type="select" id="user" name="user"  value={1}>
           {
            scheduleFrequencyList && scheduleFrequencyList.length>0 && scheduleFrequencyList.map((item, index) => (
              <option key={index} value={item.schedule_frequency_id}>{item.schedule_frequency_name}</option>
            ))
           }
            </Input>
          
          </FormGroup>
        </Col>
       </Row>
       <Row>
        <Col md={6}>
          <FormGroup>
          <Label for="name">Schedule Date </Label>
          <Input bsSize="sm" className="form-control form-control-sm" type="date" id="application_date" name="application_date"  />

           
          
          </FormGroup>
        </Col>
        <Col md={6}>
        
        <FormGroup>
        <Label for="amount">Amount</Label>
       <Input bsSize="sm" className="form-control form-control-sm" type="text" id="amount" name="amount" value={driverSchedulePayee.amount} onChange={handleInputSchedulePayeeChange('amount')} />
       
        </FormGroup>
        </Col>
       </Row>
       <Row>
       <Col md={6}>
        <FormGroup>
        <Label for="application_date">Notes</Label>
       <Input bsSize="sm" className="form-control form-control-sm" type="text" id="application_date" name="application_date"  />
       
        </FormGroup>
        </Col>
        <Col md={6}>
                  <Label for="Active">Active</Label>
                  <FormGroup switch>
                    <Input type="switch" checked={driverSchedulePayee.is_active} onChange= {handleCheckBox} />
                  </FormGroup>
                </Col>
       </Row>
       <FormGroup className=" d-flex justify-content-end mt-3 column-gap-2 ">
              <Button color="primary" className="px-4 mr-3 shadow save-button" type="submit">Save</Button>
            </FormGroup>
        </Form>

        </ModalBody>
        </Modal>
</div>
  )
}

export default SchedulePayment