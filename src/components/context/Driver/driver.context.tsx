import React ,  { createContext } from "react";
import { Draft } from "immer";
import { IDriverObject } from "./driver.types";

import { useImmer } from "use-immer";


export interface   IDriverAdd {
    driverLoading : boolean,
    driverAddList : IDriverObject[] | null,
}

 const initialState : IDriverAdd = {
    driverLoading : false,
    driverAddList : null
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
 
export { DriverAddProvider, DriverAddContext , initialState }
 ;

