import { useContext } from "react";
import { CustomerAddContext } from "./customer.context";
import { API } from "../../../services/api-helper/api.services";
import { API_CUSTOMER } from "../../../services/api-helper/api.constant";
import { ICustomerObject } from "./customer.types";



export const useCustomerContext = () => {

    const { state , setState } = useContext(CustomerAddContext);

    if (setState === undefined) {
        throw new Error("Must have setState defined");
    }

    const saveCustomer = async (ddCustomer: ICustomerObject ) => {
        setState((draft) => {
            draft.customerLoading = true;
          });
          console.log(ddCustomer)
          try {
              const customerData : ICustomerObject[] = await API.post(API_CUSTOMER.addCustomer , ddCustomer);
               return customerData;
               
            // setState((draft) => {
            //     draft.newCustmer = customerData;
            //     draft.customerLoading = false;
            // })
             
          } catch (error: any) {
              console.log(error);
          }
     }

    return {
        ... state,
        saveCustomer,
    }

}

