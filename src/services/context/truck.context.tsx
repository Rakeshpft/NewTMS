import React , { createContext } from "react"
import { Draft } from "immer"
import { useImmer } from "use-immer"
import { ITruckDocument, ITruckObject} from "../tms-objects/truck.types"


export interface ITruckStatus {
    truckList : ITruckObject[] | null
    truckDetails : ITruckObject | null
    documentAnnualInspectionList : ITruckDocument[] | null
    documentRegistrationList : ITruckDocument[] | null
    documentRepairMaintenanceList : ITruckDocument[] | null
    documentOtherList: ITruckDocument[] | null
    truckLoading : boolean
    is_error :  boolean
    saveTruckSuccess : boolean
    saveTruckFailed : boolean
    selectedTruck: ITruckObject | null
    
}

const initialState : ITruckStatus = {
    truckLoading : false,
    truckList : null,
    truckDetails : null,
    documentAnnualInspectionList : null,
    documentRegistrationList : null,
    documentRepairMaintenanceList : null,
    documentOtherList : null,
    is_error : false,
    saveTruckSuccess : false,
    saveTruckFailed : false,
    selectedTruck : null,
}


type TruckAddContextType = {
    state : ITruckStatus
    setState : (f : (draft : Draft<ITruckStatus>) => void | ITruckStatus) => void
}


const truckUpdateContext = createContext<TruckAddContextType>({
    state : initialState,
    setState : () => undefined
})

const TruckProvider = ({children} : {children : React.ReactNode}) => {
    const [state, setState] = useImmer<ITruckStatus>(initialState); 

    return (
        <truckUpdateContext.Provider value={{state, setState}}>{children}</truckUpdateContext.Provider>

    )

}

export {TruckProvider  , truckUpdateContext , initialState}