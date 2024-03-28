import { useContext } from "react";
import { CustomerUpdateContext } from "../context/customer.context";
import { API } from "../api-helper/api.services";
import { API_CUSTOMER } from "../api-helper/api.constant";
import { ICustomerDetails, ICustomerDetailsResponse} from "../tms-objects/customer.types";
import { IAPIResponse } from "../tms-objects/response.types";



export const useCustomerContext = () => {

    const { state , setState } = useContext(CustomerUpdateContext);

    if (setState === undefined) {
        throw new Error("Must have setState defined");
    }

    const getCustomerDetails = async () => {
        setState((draft) => {
            draft.customerLoading = true;
          });
          
          try {
             
            const customerList : ICustomerDetailsResponse = await API.get(API_CUSTOMER.getCustomer );
             const newCustomerList = customerList.value.map((customer)=>{
              customer.full_name = `${customer.first_name} ${customer.last_name}`;
              customer.address = `${customer.suite_number} ${customer.street_number} ${customer.city} ${customer.state_id} ${customer.zipcode}`;
            return customer;
        })
            setState((draft) => {
                draft.CustomerDetails = customerList.value;
                draft.customerLoading = false;
            });
            return newCustomerList;
            
             
          } catch (error: any) {
              console.log(error);
          }
          setState((draft) => {
            draft.customerLoading = false;
          });


     }
     

     const getIdividualCustomerDetails = async (CustomerId: number) => {
        setState((draft) => {
          draft.customerLoading = true;
        });
    
        try {
          const response: IAPIResponse = await API.get(
            `${API_CUSTOMER.getIndividualCustomer}/${CustomerId}`
          );
    
          setState((draft) => {
            draft.selectedCustomer = response.value;
            draft.customerLoading = false;
          });
        } catch (error: any) {
          console.log(error);
          setState((draft) => {
            draft.customerLoading = false;
          });
        }
      };
    
      const saveCustomer = async (newCustomer: ICustomerDetails) => {
        setState((draft) => {
          draft.customerLoading = true;
        });
        clearSuccessAndFailure();
        try {
          const response: IAPIResponse = await API.post(
            API_CUSTOMER.postNewCustomerData,
            newCustomer
          );
    
          setState((draft) => {
            draft.is_error = response.is_error ? true : false;
            draft.saveCustomerSuccess = response.success ? true : false;
            draft.selectedCustomer = null;
          });
          return response;
        } catch (error: any) {
          console.log(error);
          setState((draft) => {
            draft.saveCustomerFailed = true;
          });
        }
      };
    
      const deleteCustomer = async (customerToDeleted: ICustomerDetails[]) => {
        setState((draft) => {
          draft.customerLoading = true;
        });
    
        clearSuccessAndFailure();
    
        try {
            customerToDeleted.forEach((customer) => {
            API.del(`${API_CUSTOMER.deleteCustomer}/${customer.customer_id}`); 
          });
    
          setTimeout(() => getCustomerDetails(), 200);
        } catch (error: any) {
          console.log(error);
          setState((draft) => {
            draft.customerLoading = false;
          });
        }
      };
      const getCustomerStatus = async () => {
        setState((draft) => {
          draft.customerLoading = true;
        });
      
        try {
          const StatusList: ICustomerDetailsResponse = await API.get(API_CUSTOMER.getCustomerstatus);
          const newStatusList = StatusList.value;
      
          setState((draft) => {
            draft.CustomerDetails = newStatusList;
            draft.customerLoading = false;
          });
      
          return newStatusList;
        } catch (error: any) {
          console.log(error);
        }
      
        setState((draft) => {
          draft.customerLoading = false;
        });
      }
    
      const clearSuccessAndFailure = () => {
        setState((draft) => {
          draft.saveCustomerFailed = false;
          draft.saveCustomerSuccess = false;
        });
      };
    
      

    return {
        ... state,
        getCustomerDetails,
        deleteCustomer,
        saveCustomer,
        getIdividualCustomerDetails,
        getCustomerStatus,
        
        
    }

}

