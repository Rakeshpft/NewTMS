import React , { createContext } from "react"
import { Draft } from "immer"
import { ITruckObject } from "./truck.types"
import { useImmer } from "use-immer"


export interface ITruckStatus {
    truckLoading : boolean
    truckListStatus : ITruckObject[] | null
}

const initialState : ITruckStatus = {
    truckLoading : false,
    truckListStatus : null
}


type TruckStatusType = {
    state : ITruckStatus
    setState : (f : (draft : Draft<ITruckStatus>) => void | ITruckStatus) => void
}


const truckAddContext = createContext<TruckStatusType>({
    state : initialState,
    setState : () => undefined
})

const TruckStatusProvider = ({children} : {children : React.ReactNode}) => {
    const [state, setState] = useImmer<ITruckStatus>(initialState); 

    return (
        <truckAddContext.Provider value={{state, setState}}>{children}</truckAddContext.Provider>

    )

}

export {TruckStatusProvider  , truckAddContext , initialState}