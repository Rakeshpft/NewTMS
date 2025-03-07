import { Draft } from "immer";
import React, { createContext } from "react";
import { useImmer } from "use-immer";
import { ICredits } from "../tms-objects/credit.types";
import { IStateDetails } from "../tms-objects/state.types";
import { IDriverStatus, IDriverType } from "../tms-objects/driver.types";
import { IBillingStatusObject, IBillingTypeObject } from "../tms-objects/billing.types";
import { ICustomerStatusObject } from "../tms-objects/customer.types";
import { ILoadStatusObject } from "../tms-objects/load.type";
import { ISideMenuObject } from "../tms-objects/side-menu.types";
import { IDocumentStatusObject, IFactorObject, IOwnershipTypeObject, ITrailerTypeObject, IPaymentCategoryObject, IProductCodeObject, IScheduleFrequencyObject, IScheduleTypeObject, IScheduleRepeatObject, IELDProviderObject, IDriverListObject, IPayRateTypeObject, IVendorListObject, ITruckListObject, ITrailerListObject, IDispatcherListObject, IFuelCardListObject, IPaymentMethodObject, ILoadStop } from "../tms-objects/list.types";

export interface IListData {
    menuList:ISideMenuObject[]|null;
    creditList : ICredits[] | null;
    stateList : IStateDetails[] | null;
    billingTypeList : IBillingTypeObject[] | null;    
    billingStatusList: IBillingStatusObject[] | null;
    driverTypeList: IDriverType[] | null;
    driverStatusList: IDriverStatus[] | null;
    customerStatusList: ICustomerStatusObject[] | null;
    loadStatusList:ILoadStatusObject[] | null;
    ownershipTypeList:IOwnershipTypeObject[]|null;
    documentStatusList:IDocumentStatusObject[]|null;
    factorList:IFactorObject[]|null;
    trailerTypeList:ITrailerTypeObject[]|null;
    paymentCategoryList:IPaymentCategoryObject[]|null;
    productCodeList:IProductCodeObject[]|null;
    scheduleFrequencyList:IScheduleFrequencyObject[]|null;
    scheduleTypeList:IScheduleTypeObject[]|null;
    scheduleRepeatList:IScheduleRepeatObject[]|null;
    eldProviderList:IELDProviderObject[]|null;
    payRateTypeList:IPayRateTypeObject[]|null;
    driverList:IDriverListObject[]|null;    
    vendorList:IVendorListObject[]|null;
    truckList:ITruckListObject[]|null;
    trailerList:ITrailerListObject[]|null;
    dispatcherList:IDispatcherListObject[]|null;
    fuelCardList:IFuelCardListObject[]|null;
    paymentMethodList:IPaymentMethodObject[]|null;
    loadStopList:ILoadStop[]|null;
    listLoading : boolean;
    is_error : boolean;
}

const listInitialData : IListData = {
    menuList:null,
    creditList:null,
    stateList:null,
    billingTypeList:null,
    billingStatusList:null,
    driverTypeList:null,
    driverStatusList:null,
    customerStatusList:null,
    loadStatusList:null,
    ownershipTypeList:null,
    documentStatusList:null,
    factorList:null,
    trailerTypeList:null,
    paymentCategoryList:null,
    productCodeList:null,
    scheduleFrequencyList:null,
    scheduleTypeList:null,
    scheduleRepeatList:null,
    eldProviderList:null,
    payRateTypeList:null,
    driverList:null,
    vendorList:null,
    truckList:null,
    trailerList:null,
    dispatcherList:null,
    fuelCardList:null,
    paymentMethodList:null,
    loadStopList:null,
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
  