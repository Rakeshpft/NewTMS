import React from 'react'
// import CommonLayOut from '../../../layout';
// import CreateNewCustomerForm from './createNewCustomerForm';
// import { ICustomerDetails, initialStateCustomer } from '../../../services/tms-objects/customer.types';
// import { useCustomerContext } from '../../../services/reducer/customer.reducer';
// import { useNavigate } from 'react-router-dom';
// import { routes } from '../../routes/routes';



const CreateNewCustomerPage = ( ) => {

//   const {
//     getCustomerDetails,
//     CustomerDetails,
//     selectedCustomer,
//     saveCustomer,
//   } = useCustomerContext();


//   const navigate = useNavigate();

//   const [customerNewDetails, setcustomerNewDetails] = useState<ICustomerDetails>(initialStateCustomer);
//   const [title, setTitle] = useState<boolean>(true);

 
// const handleInputChange = 
// (prop :keyof ICustomerDetails)=>
// (event: React.ChangeEvent<HTMLInputElement>) => {
//   setcustomerNewDetails({ ...customerNewDetails, [prop]: event.target.value });
// };


// const handleBillingTypeChange = () => {
//   setcustomerNewDetails({ ...customerNewDetails,  billing_type_id : !customerNewDetails.billing_type_id   });
// };

// const handleSaveCustomer = async (event: { preventDefault: () => void }) => {
//   event.preventDefault();
//   await saveCustomer(customerNewDetails).then((data) => {
//     data?.success ;
//   });
//   getCustomerDetails();
//   setcustomerNewDetails(initialStateCustomer);
//   navigate(routes.createNewCustomer)
 
// };



//   useEffect(() => {
//     if (selectedCustomer) {
//       setcustomerNewDetails({
//         ...CustomerDetails,

//         first_name: selectedCustomer.first_name,
//         last_name: selectedCustomer.last_name,
//         full_name: selectedCustomer.full_name,
//         customer_id: selectedCustomer.customer_id,
//         is_broker: selectedCustomer.is_broker,
//         is_shipper_receiver: selectedCustomer.is_shipper_receiver,
//         email: selectedCustomer.email,
//         phone: selectedCustomer.phone,
//         suite_number: selectedCustomer.suite_number,
//         street_number: selectedCustomer.street_number,
//         city: selectedCustomer.city,
//         state_id: selectedCustomer.state_id,
//         zipcode: selectedCustomer.zipcode,
//         description: selectedCustomer.description,
//         company_name: selectedCustomer.company_name,
//         fid_ein: selectedCustomer.fid_ein,
//         mc_number: selectedCustomer.mc_number,
//         billing_type_id: selectedCustomer.billing_type_id,
//         factor_id: selectedCustomer.factor_id,
//         quick_pay_fee: selectedCustomer.quick_pay_fee,
//         status_id: selectedCustomer.status_id,
//         credit_id: selectedCustomer.credit_id,
//         pay_terms: selectedCustomer.pay_terms,
//         avg_days_to_pay: selectedCustomer.avg_days_to_pay,
//         active: selectedCustomer.active,
//       });
//     }
//   }, [selectedCustomer]);

return(
    <>
{/* //       <CommonLayOut>
//         <CreateNewCustomerForm */}
{/* //           CustomerNewDetails={customerNewDetails}
//           setCustomerDetails={setcustomerNewDetails}
//           handleInputChange={handleInputChange}
//           selectedCustomer={selectedCustomer}
//           handleSaveCustomer={handleSaveCustomer}
//           handleBillingTypeChange= {handleBillingTypeChange}
//           title={title}
//           setTitle={setTitle}
//           setCustomerNewDetails={setcustomerNewDetails}
//         />
//       </CommonLayOut>
    */}</>
)}
// )};

export default CreateNewCustomerPage;