import React ,  { createContext } from "react";
import { Draft } from "immer";
import { IDriverCdl, IDriverDoc, IDriverDrugTest, IDriverMedical, IDriverMvr, IDriverObject, IDriverPayRatesOject, IDriverStatus, IDriverType } from "../tms-objects/driver.types";

import { useImmer } from "use-immer";


export interface   IDriverAdd {
    driverLoading : boolean,
    driverAddList : IDriverObject[] | null,
    selectedDriver : IDriverObject | null
    driverType : IDriverType[] | null
    driverStatus : IDriverStatus[]  | null
    driverPayRatesList : IDriverPayRatesOject[] | null
    selectedPayRates : IDriverPayRatesOject | null
    driverDocAppList : IDriverDoc[] | null
    driverCdlLists : IDriverCdl[] | null
    driverMedicalLists : IDriverMedical[] | null
    driverDrugLists : IDriverDrugTest[] | null
    driverMvrLists:IDriverMvr[]|null
    
}

 const initialState : IDriverAdd = {
    driverLoading : false,
    driverAddList : null,
    selectedDriver: null,
    driverType : null ,
    driverStatus : null ,
    driverPayRatesList : null,
    selectedPayRates : null,
    driverDocAppList : null,
    driverCdlLists : null,
    driverMedicalLists : null,
    driverDrugLists : null,
    driverMvrLists:null
}

type DriverContextType =  {
    state: IDriverAdd;
    setState : (f: (draft: Draft<IDriverAdd>) => void | IDriverAdd) => void;
}

const DriverAddContext = createContext<DriverContextType>({
    state : initialState,
    setState : () => undefined
})

const DriverAddProvider = ({children}: {children: React.ReactNode}) => {
    const [state, setState] = useImmer<IDriverAdd>(initialState);
    return (
        <DriverAddContext.Provider value={{state, setState}}>
            {children}
        </DriverAddContext.Provider>
    )
};
 
export { DriverAddProvider, DriverAddContext , initialState } ;

