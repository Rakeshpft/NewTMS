import { Draft } from "immer";
import React, { createContext } from "react";
import { useImmer } from "use-immer";
import { ICredits } from "../tms-objects/credit.types";
import { IStateDetails } from "../tms-objects/state.types";
import { IDriverStatus, IDriverType } from "../tms-objects/driver.types";
import { IBillingStatusObject, IBillingTypeObject } from "../tms-objects/billing.types";
import { ICustomerStatusObject } from "../tms-objects/customer.types";
import { ILoadStatusObject } from "../tms-objects/load.type";

export interface IListData {
    creditList : ICredits[] | null;
    stateList : IStateDetails[] | null;
    billingTypeList : IBillingTypeObject[] | null;    
    billingStatusList: IBillingStatusObject[] | null;
    driverTypeList: IDriverType[] | null;
    driverStatusList: IDriverStatus[] | null;
    customerStatusList: ICustomerStatusObject[] | null;
    loadStatusList:ILoadStatusObject[] | null;
    listLoading : boolean;
    is_error : boolean;
}

const listInitialData : IListData = {
    creditList:null,
    stateList:null,
    billingTypeList:null,
    billingStatusList:null,
    driverTypeList:null,
    driverStatusList:null,
    customerStatusList:null,
    loadStatusList:null,
    listLoading : false,
    is_error : false,
}

type ListUpdateContextType = {
    list: IListData;
    setList: (
      f: (draft: Draft<IListData>) => void | IListData
    ) => void;
  };
  const ListUpdateContext = createContext<ListUpdateContextType>({
    list: listInitialData,
    setList: () => undefined,
  });
  const ListProvider = ({ children }: { children: React.ReactNode }) => {
    const [list, setList] = useImmer<IListData>(listInitialData);
  
    return (  
      <ListUpdateContext.Provider value={{ list, setList }}>
        {children}
      </ListUpdateContext.Provider>
    );
  };
  
  export { ListUpdateContext, ListProvider, listInitialData };
  