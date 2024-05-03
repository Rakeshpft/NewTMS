import { useContext } from "react";
import { CustomerUpdateContext } from "../context/customer.context";
import { API } from "../api-helper/api.services";
import { API_CUSTOMER } from "../api-helper/api.constant";
import { ICustomerContacts, ICustomerContactsResponse, ICustomerDetails, ICustomerDetailsResponse, ICustomerDocument, ICustomerFilter} from "../tms-objects/customer.types";
import { IAPIResponse } from "../tms-objects/response.types";

export const useCustomerContext = () => {
    const { state , setState } = useContext(CustomerUpdateContext);

    if (setState === undefined) {
        throw new Error("Must have setState defined");
    }

    const getCustomerDetails = async (payload:ICustomerFilter) => {
        setState((draft) => {
            draft.customerLoading = true;
          });
          
          debugger;
          try {
             
            const customerList : ICustomerDetailsResponse = await API.get(API_CUSTOMER.getCustomer,payload); 
             const newCustomerList = customerList.value.map((customer)=>{
              customer.full_name = `${customer.first_name} ${customer.last_name}`;
              customer.address = `${customer.suite_number} ${customer.street} ${customer.city} ${customer.state_name} ${customer.zipcode}`

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
    
      const deleteCustomer = async ( customer_ids: number[]) => {
        setState((draft) => {
          draft.customerLoading = true;
        });
      
        clearSuccessAndFailure();
      
        try {
        let response = await API.del(`${API_CUSTOMER.deleteCustomer}/delete`, customer_ids);
          
          return response;

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
      const getCustomerDocument = async (customer_id:number)  => {
        setState((draft) => {
          draft.customerLoading = true;
        });      
        try {
          const documentList: IAPIResponse = await API.get(`${API_CUSTOMER.getCustomer}/${customer_id}${API_CUSTOMER.getCustomerDocument}`);      
          setState((draft) => {
            draft.DocumentList = documentList.value;
            draft.customerLoading = false;
          });      
          return documentList.value;
        } catch (error: any) {
          console.log(error);
        }      
        setState((draft) => {
          draft.customerLoading = false;
        });
      }
      const postCustomerDocument =async (customer_id:number,payload : ICustomerDocument) => {
        setState(draft => {
          draft.customerLoading = true;
        })      
        clearSuccessAndFailure();      
        try {      

          const response = await API.postForm(`${API_CUSTOMER.getCustomer}/${customer_id}${API_CUSTOMER.uploadDocuments}`, payload);
          response.value = response && response.value && response.value+'?id='+Math.random()
          return response;
        } catch (error: any) {
          console.log(error);
          setState((draft) => {
            draft.customerLoading = false;
          });
        }
      };

      const deleteDocument = async (customer_id: number, document_ids: number[]) => {
        setState((draft) => {
          draft.customerLoading = true;
        });
      
        clearSuccessAndFailure();
      
        try {
        let response = await API.del(`${API_CUSTOMER.getCustomer}/${customer_id}/documents${API_CUSTOMER.deleteDocuments}`, document_ids);
          setTimeout(() => getCustomerDocument(customer_id), 200);
          return response;

        } catch (error: any) {
          console.log(error);
          setState((draft) => {
            draft.customerLoading = false;
          });
        }
      };
      

      const getContacts = async (customer_id:number) => {
        setState((draft) => {
            draft.customerLoading = true;
          });
          
          try {
             
            const contactList : ICustomerContactsResponse = await API.get(`${API_CUSTOMER.getCustomer}/${customer_id}${API_CUSTOMER.getContacts}`);
             const newCustomerContactList = contactList.value.map((contacts)=>{
          
            return contacts;
        })
            setState((draft) => {
                draft.ContactList = contactList.value;
                draft.customerLoading = false;
            });
            return newCustomerContactList;
            
             
          } catch (error: any) {
              console.log(error);
          }
          setState((draft) => {
            draft.customerLoading = false;
          });


     }
     

     const getIndividualContacts = async (Customer_id: number, Contact_id: number) => {
        setState((draft) => {
          draft.customerLoading = true;
        });
    
        try {
          const response: IAPIResponse = await API.get(
            `${API_CUSTOMER.getCustomer}/${Customer_id}${API_CUSTOMER.getIndividualContacts}/${Contact_id}`
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
    
      const saveContact = async (customer_id:number,newContact: ICustomerContacts) => {
        setState((draft) => {
          draft.customerLoading = true;
        });
        clearSuccessAndFailure();
        try {
          const response: IAPIResponse = await API.post(`${API_CUSTOMER.getCustomer}/${customer_id}${API_CUSTOMER.getContacts}`,newContact);
    
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
    
      const deleteContact = async (customer_id: number, contact_ids: number[]) => {
        setState((draft) => {
          draft.customerLoading = true;
        });
      
        clearSuccessAndFailure();
      
        try {
        let response = await API.del(`${API_CUSTOMER.getCustomer}/${customer_id}/contact${API_CUSTOMER.deleteContacts}`, contact_ids);
          setTimeout(() => getContacts(customer_id), 200);
          return response;

        } catch (error: any) {
          console.log(error);
          setState((draft) => {
            draft.customerLoading = false;
          });
        }
      };

    
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
        getCustomerDocument,
        postCustomerDocument,
        getContacts,
        saveContact,
        getIndividualContacts,
        deleteContact,
        clearSuccessAndFailure,
        deleteDocument,
        
    }

}

