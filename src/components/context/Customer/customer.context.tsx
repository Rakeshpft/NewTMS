import React, { createContext } from "react";
import { ICustomerObject } from "./customer.types";
import { Draft } from "immer";

import { useImmer } from "use-immer";

export interface INewCustomerAdd {
  customerLoading: boolean;
  newCustmer: ICustomerObject[] | null;
}

const initialState: INewCustomerAdd = {
  customerLoading: false,
  newCustmer: null,
};

type CustomerAddContextType = {
  state: INewCustomerAdd;
  setState: (
    f: (draft: Draft<INewCustomerAdd>) => void | INewCustomerAdd
  ) => void;
};

const CustomerAddContext = createContext<CustomerAddContextType>({
  state: initialState,
  setState: () => undefined,
});

const CustomerAddProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useImmer<INewCustomerAdd>(initialState);

  return (
    <CustomerAddContext.Provider value={{ state, setState }}>
      {children}
    </CustomerAddContext.Provider>
  );
};

export { CustomerAddProvider, CustomerAddContext, initialState };
