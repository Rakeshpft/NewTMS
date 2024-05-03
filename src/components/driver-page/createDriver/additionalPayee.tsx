// import React, { useState } from 'react'
// import { IDriverSchedulePayee, initialDriverSchedule } from '../../../services/tms-objects/driver.types'
// import moment from 'moment'
// import { HiOutlinePencilAlt } from 'react-icons/hi'
// import { RxCross2 } from 'react-icons/rx'
// import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
// import { CustomTable } from '../../../features/data-table/CustomTable'
// import { AiOutlinePlus } from 'react-icons/ai'


// const AdditionalPayee = () => {

//   const [uploadModalOpen, setUploadModalOpen] = useState(false);
//   const [driverSchedulePayee, setDriverSchedulePayee] = useState<IDriverSchedulePayee>(initialDriverSchedule);
//   const [driverSchedulePayeeList, setDriverSchedulePayeeList] = useState<IDriverSchedulePayee[]>([]);
  
//   const handleEditSchedulePayee = (id:number) => {
//     const filteredData = driverSchedulePayeeList?.filter(l=>l.schedule_id == id)
//     if (filteredData && filteredData.length>0) {      
//       setDriverSchedulePayee(filteredData[0])
//     }
//     setUploadModalOpen(true);
//   }

//   const UploadModalClose = () => {
//     setUploadModalOpen(false);
//     setDriverSchedulePayee(initialDriverSchedule);
//   }

//   const closeBtn = (
//     <button
//       className="border-0 bg-transparent text-white"
//       type="button"
//       onClick={() => UploadModalClose()}
//     >
       
//       <RxCross2 />
//     </button>
// );

//   const columns: CustomTableColumn[] = [

//     {
//        id: 'categgory',
//        name: 'CATEGORY',
//        style: { width: '10%' },
//        sortable: true,
//        selector: (row: IDriverSchedulePayee) => row.categgory,
      
//      },
//      {
//       id: 'amount',
//       name: 'AMOUNT',
//       style: { width: '10%' },
//       sortable: true,
//       selector: (row: IDriverSchedulePayee) => row.amount,
     
//     },
//      {
//        id: 'last',
//        name: 'LAST',
//        style: { width: '10%' },
//        sortable: true,
//        selector: (row: IDriverSchedulePayee) => row.last,
//        format: (row: IDriverSchedulePayee) =>  moment(row.last).format('L')
 
//      },
//      {
//        id: 'schedule',
//        name: 'SCHEDULE',
//        style: { width: '10%' },
//        sortable: true,
//        selector: (row: IDriverSchedulePayee) => row.schedule,
//        format: (row: IDriverSchedulePayee) =>  moment(row.schedule).format('L')
//      },
     
    
//      {
//        id : "action",
//        name : "Action",
//        style : {width : "10%"},
//        sortable : true,
//        selector : (row : IDriverSchedulePayee) => row.schedule_id,
//        cell: (row: IDriverSchedulePayee) => <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={()=>{ handleEditSchedulePayee(row.schedule_id) }} />
 
//      }
   
//    ]
//   return (
//     <div>
//     <div className="d-flex justify-content-end m-3">
//         <Col md={3} className=" d-flex justify-content-end align-items-end pb-3">
//           <label className="page-subtitle">
//             <Button color="success"  outline={true}  onClick={() => setUploadModalOpen(true)}><AiOutlinePlus />Add</Button>
//           </label>
//         </Col>
//       </div>
//       <CustomTable columns={columns} data={driverSchedulePayeeList} noRecordMessage="No Document found." />
//       <Modal isOpen={uploadModalOpen} onClose={UploadModalClose}>
//       <ModalHeader close={closeBtn}
//                  onClose={() => UploadModalClose()}>
//           <h6 className="mb-0 fw-bold">Edit Application </h6>
//         </ModalHeader>
//         <ModalBody className="square border border-info-rounded">
//         <Form>
//         <Row>
//         <Col md={6}>
//           <FormGroup>
//           <Label for="name">Category</Label>
//           <Input bsSize="sm" className="form-control form-control-sm" type="select" id="user" name="user"  value={1}>
//             <option value="1">Catego</option>
//             </Input>
          
//           </FormGroup>
//         </Col>
//         <Col md={6}>
//         <FormGroup>
//         <Label for="application_date">Application Date</Label>
//        <Input bsSize="sm" className="form-control form-control-sm" type="date" id="application_date" name="application_date" value={driverDocument.application_date} onChange={handleDriverInput('application_date')} />
       
//         </FormGroup>
//         </Col>
//        </Row>
         
//         </Form>

//         </ModalBody>
//         </Modal>
// </div>
//   )
// }

// export default AdditionalPayee