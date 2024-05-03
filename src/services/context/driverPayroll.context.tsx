import { Draft } from "immer";
import { ISettlementObject } from "../tms-objects/driverPayroll.types";
import React , { createContext } from "react"
import { useImmer } from "use-immer";

export interface IDriverPayrollStatus{
    settlementList:ISettlementObject[]|null
    settlementDetail:ISettlementObject|null
    driverPayrollLoading:boolean
    is_error:boolean
    saveDriverPayrollSuccess:boolean
    saveDriverPayrollFailed:boolean
}
const initialState: IDriverPayrollStatus = {
    settlementList:null,
    settlementDetail:null,
    driverPayrollLoading: false,
    is_error: false,
    saveDriverPayrollSuccess: false,
    saveDriverPayrollFailed: false,
}

type DriverPayrollAddContextType = {
    state: IDriverPayrollStatus
    setState: (f : (draft : Draft<IDriverPayrollStatus>) => void | IDriverPayrollStatus) => void
}

const DriverPayrollUpdateContext = createContext<DriverPayrollAddContextType>({
    state: initialState,
    setState: () => undefined
})

const DriverPayrollProvider = ({children} : {children: React.ReactNode})=> {
    const [state, setState] = useImmer<IDriverPayrollStatus>(initialState);
    return (
        <DriverPayrollUpdateContext.Provider value={{state, setState}}>
            {children}
        </DriverPayrollUpdateContext.Provider>
    )
}
export{DriverPayrollProvider, DriverPayrollUpdateContext,initialState}