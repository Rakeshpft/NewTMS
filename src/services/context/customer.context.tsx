import React, { createContext } from "react";
import { ICustomerDetails,  INewCustomerDetails , INewCustomerContacts, ICustomerContacts, ICustomerDocument } from "../tms-objects/customer.types";
import { Draft } from "immer";

import { useImmer } from "use-immer";

export interface ICustomerData {
  CustomerDetails:ICustomerDetails[] | null
  ContactList :ICustomerContacts[] | null
  DocumentList: ICustomerDocument[] | null
  customerLoading: boolean;
  is_error : boolean;
  saveCustomerSuccess :boolean;
  saveCustomerFailed : boolean;
  selectedCustomer: INewCustomerDetails | null;
  selectedContact :INewCustomerContacts | null; 
}

 
const InitialState: ICustomerData = {
  CustomerDetails:null,
  ContactList:null,
  DocumentList:null,
  customerLoading: false,
  is_error : false,
  saveCustomerSuccess :false,
  saveCustomerFailed : false,
  selectedCustomer:null,
  selectedContact :null,
 
  
};

type CustomerUpdateContextType = {
  state: ICustomerData;
  setState: (
    f: (draft: Draft<ICustomerData>) => void | ICustomerData
  ) => void;
};

const CustomerUpdateContext = createContext<CustomerUpdateContextType>({
  state: InitialState,
  setState: () => undefined,
});

const CustomerProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useImmer<ICustomerData>(InitialState);

  return (  
    <CustomerUpdateContext.Provider value={{ state, setState }}>
      {children}
    </CustomerUpdateContext.Provider>
  );
};

export { CustomerUpdateContext, CustomerProvider, InitialState };
