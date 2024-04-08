import React , { createContext } from "react"
import { Draft } from "immer"
import { useImmer } from "use-immer"
import { ITruckObject} from "../tms-objects/truck.types"


export interface ITruckStatus {
    truckList : ITruckObject[] | null
    truckLoading : boolean
    is_error :  boolean
    saveTruckSuccess : boolean
    saveTruckFailed : boolean
    selectedTruck: ITruckObject | null
    
}

const initialState : ITruckStatus = {
    truckLoading : false,
    truckList : null,
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