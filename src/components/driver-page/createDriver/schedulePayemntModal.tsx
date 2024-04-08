// import React from 'react'
// import { RxCross2 } from 'react-icons/rx';
// import { Form } from 'react-router-dom'
// import { Modal, ModalHeader, ModalBody, Row, Col, FormGroup, Label, Input, Button } from 'reactstrap'
// import { IDriverSchedulePayee } from '../../../services/tms-objects/driver.types';

// interface ISchedulePayemntModal {
//     modalOpen : boolean
//     closeModal : () => void
//     handleInputSchedulePayeeChange : (prop: keyof IDriverSchedulePayee ) => (event: React.ChangeEvent<HTMLInputElement>) => void
//     driverNewSchedulePayee : IDriverSchedulePayee
//     // handleCheckBox : () => void
// }
    
// const SchedulePayemntModal = ({handleInputSchedulePayeeChange  , driverNewSchedulePayee ,modalOpen , closeModal } : ISchedulePayemntModal) => {
    
//     const closeBtn = (
//         <button
//           className="border-0 bg-transparent text-white"
//           type="button"
//           onClick={() => closeModal()}
//         >
           
//           <RxCross2 />
//         </button>
//     );

//   return (
//     <div>

// <Modal isOpen={modalOpen} >
//       <ModalHeader close={closeBtn}
//                   onClose={() => closeModal()}>
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
//           <Label for="name">Schedule Type </Label>
//           <Input bsSize="sm" className="form-control form-control-sm" type="select" id="user" name="user"  value={1}>
//             <option value="1">Catego</option>
//             </Input>
          
//           </FormGroup>
//         </Col>
//        </Row>
//        <Row>
//         <Col md={6}>
//           <FormGroup>
//           <Label for="name">Schedule Date </Label>
//           <Input bsSize="sm" className="form-control form-control-sm" type="date" id="application_date" name="application_date"  />

           
          
//           </FormGroup>
//         </Col>
//         <Col md={6}>
        
//         <FormGroup>
//         <Label for="amount">Amount</Label>
//        <Input bsSize="sm" className="form-control form-control-sm" type="text" id="amount" name="amount" value={driverNewSchedulePayee.amount} onChange={handleInputSchedulePayeeChange('amount')} />
       
//         </FormGroup>
//         </Col>
//        </Row>
//        <Row>
//        <Col md={6}>
//         <FormGroup>
//         <Label for="application_date">Notes</Label>
//        <Input bsSize="sm" className="form-control form-control-sm" type="text" id="application_date" name="application_date"  />
       
//         </FormGroup>
//         </Col>
//         <Col md={6}>
//                   <Label for="Active">Active</Label>
//                   <FormGroup switch>
//                     <Input type="switch" checked={driverNewSchedulePayee.is_active} onChange= {handleInputSchedulePayeeChange('is_active')} />
//                   </FormGroup>
//                 </Col>
//        </Row>
//        <FormGroup className=" d-flex justify-content-end mt-3 column-gap-2 ">
//               <Button color="primary" className="px-4 mr-3 shadow save-button" type="submit">Save</Button>
//             </FormGroup>
//         </Form>

//         </ModalBody>
//         </Modal>
//     </div>
//   )
// }

// export default SchedulePayemntModal