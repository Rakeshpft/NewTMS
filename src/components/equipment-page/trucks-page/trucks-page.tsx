import React from "react";
// import { AiOutlinePlus } from "react-icons/ai";
// // import { MdOutgoingMail } from "react-icons/md";
// // import { PiFilePdfDuotone, PiGearDuotone } from "react-icons/pi";
// import { Link } from "react-router-dom";
// import {
 
//   FormGroup,
//   Input,
//   InputGroup,
//   InputGroupText,

//   Container,
//   Modal,
//   ModalBody,
//   ModalHeader,
//   TabPane,
// } from "reactstrap";
// // import { Header, SideBar } from "../../shared";
// // import Profile from "../../pofile";
// // import { BiCheck } from "react-icons/bi";
// import { BsSearch } from "react-icons/bs";
// // import { RxCross2 } from "react-icons/rx";
// import { routes } from "../../routes/routes";

// import { isEmpty } from "lodash";
// import { HiOutlinePencilAlt } from "react-icons/hi";
// import CommonLayOut from "../../../layout";
// import { ICustomerDetails } from "../../../services/tms-objects/customer.types";
// import { TabPage } from "../../driver-page";
// import CustomTable from "../../table/custom-table";


 const TrucksPage = () => {




//   const columns: CustomTableColumn[] = [
//     {
//       id: "full_name",
//       name: "NAME",
//       style: { width: "25%" },
//       sortable: true,
//       selector: (row: ICustomerDetails) => row.full_name,
//       format:(row:ICustomerDetails)=>(`${row.first_name} ${row.last_name}`)
//     },
//     {
//       id: "address",
//       name: "ADDRESS",
//       style: { width: "25%" },
//       sortable: true,
//       selector: (row: ICustomerDetails) => row.address,
//       format:(row :ICustomerDetails)=>(`${row.suite_number} ${row.street} ${row.city} ${row.state_name} ${row.zipcode}`)
//     },
//     {
//       id: "phone",
//       name: "PHONE",
//       style: { width: "20%" },
//       sortable: true,
//       selector: (row: ICustomerDetails) => row.phone
//     },
//     {
//       id: "mc_number",
//       name: "MC",
//       style: { width: "20%" },
//       sortable: true,
//       selector: (row: ICustomerDetails) => row.mc_number
//     },
//     {
//       id: "billing_type_id",
//       name: "PAY METHOD",
//       style: { width: "20%" },
//       sortable: true,
//       selector: (row: ICustomerDetails) => row.billing_type_name
//     },
//     {
//       id: "credit_id",
//       name: "CREDIT",
//       style: { width: "20%" },
//       sortable: true,
//       selector: (row: ICustomerDetails) => row.credit_name
//     },
//     {
//       id: "avg_days_to_pay",
//       name: "AVG. DTP",
//       style: { width: "20%" },
//       sortable: true,
//       selector: (row: ICustomerDetails) => row.avg_days_to_pay
//     },
//     {
//       id: "active",
//       name: "STATUS",
//       style: { width: "20%" },
//       sortable: true,
//       selector: (row: ICustomerDetails) => row.status_name
//     },
//     {
//       id: "action",
//       name: "ACTION",
//       style: { width: "5%" },
//       sortable: false,
//       selector: (row: ICustomerDetails) => row.customer_id,
//       cell: (row: ICustomerDetails) => <HiOutlinePencilAlt size={20} style={{ cursor: "pointer" }} onClick={()=>{ navigate(`${routes.createNewCustomer}/${row.customer_id}`) }} />
//     }
//   ]
   return (
    <div></div>
//           <>
//             <CommonLayOut>
//             <div className=" d-flex justify-content-between">
//           <div className="page-title">Trucks</div>
//           <div>
//             <div className="d-flex align-items-center gap-3">
//               <div className="d-flex justify-content-end ms-auto align-items-center column-gap-2">
//                           <InputGroup className="shadow-sm border-secondary">
//                             <InputGroupText className="bg-white">
//                               <BsSearch size={16} />
//                             </InputGroupText>
//                             <Input
//                               placeholder="Search"
//                               className="border-start-0 search"
//                               inputRef={inputRef} onChange={(e: any) =>
//                                 handleSearch(e.target.value)}
//                             />
//                           </InputGroup>
//                         </div>

//                         <div className="user-info-btn-wrapper">
//                           {!isEmpty(selectedCustomers) && (
//                             <div className="user-info-btn">

//                               <Button color="primary" onClick={() => setDeleteModalOpen(true)}>Delete</Button>
//                             </div>
//                           )}
//                         </div>
//                         <Link to={routes.createNewCustomer}>
//                         <Button color="primary" >
//                           <AiOutlinePlus />
//                           New Customer
//                         </Button>
//                         </Link>
//                       </div>
//                     </div>
//                   </div>
//                   <TabPage tabTitles={["Brokers", "Shippers/Receivers"]}>

//                     <TabPane tabId={1} className="m-2">
//                     <CustomTable columns={columns} data={filteredData} noRecordMessage="No Customer found." canSelectRows={true} selectedTableRows={selectedCustomers} setSelectionTableRows={setSelectedCustomers} />
//                     </TabPane>
//                     <TabPane tabId={2} className="m-2">
//                     <CustomTable columns={columns} data={filteredData} noRecordMessage="No Customer found." canSelectRows={true} selectedTableRows={selectedCustomers} setSelectionTableRows={setSelectedCustomers} />
//                     </TabPane>

//                   </TabPage>
                

//             </CommonLayOut>
//             <Modal isOpen={deleteModalOpen} onClose={closeDeleteModal}>
//               <ModalHeader>
//                 <h6 className="mb-0 fw-bold"> Delete </h6>
//               </ModalHeader>
//               <ModalBody>
//                 <Container>
//                   {!isEmpty(selectedCustomers) && (
//                     <div className=" my-3 ">
//                       {selectedCustomers.length > 1
//                         ? `Are you sure you want to delete ${selectedCustomers.length} customers?`
//                         : `Are you sure you want to delete customer "${selectedCustomers[0].first_name} ${selectedCustomers[0].last_name}"?`}
//                     </div>
//                   )}
//                   <FormGroup className=" d-flex justify-content-end mt-3 column-gap-2 ">
//                     <Button
//                       color="primary"
//                       className="px-4 mr-3 shadow save-button  "
//                       onClick={() => closeDeleteModal()}
//                     >
//                       Cancel
//                     </Button>

//                     <Button
//                       color="primary"
//                       className="px-4  shadow save-button "
//                       onClick={() => handleDeleteCustomers()}
//                     >
//                       Delete
//                     </Button>
//                   </FormGroup>
//                 </Container>
//               </ModalBody>
//             </Modal>

//           </>
   );
};

export default TrucksPage;
