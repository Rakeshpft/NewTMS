import React, { createContext } from "react";
import { Draft } from "immer";
import { IDispatcherLoadObject, ILoadStatusObject, IStateObject } from "../tms-objects/load.type";
import { useImmer } from "use-immer";
import { IBillingLoadObject } from "../tms-objects/billing.types";

export interface ILoadStatus {
  statusLoading: boolean;
  loadStatus: ILoadStatusObject[] | null;
  loadBillingStatus: IBillingLoadObject[] | null;
  loadDispatcherStatus: IDispatcherLoadObject[] | null;
  loadStateStatus: IStateObject[] | null;
}



const initialState : ILoadStatus = {
    statusLoading: false,
    loadStatus: null,
    loadBillingStatus: null,
    loadDispatcherStatus: null,
    loadStateStatus: null,
}

type LoadContextType = {
    state : ILoadStatus;
    setState : (f: (draft: Draft<ILoadStatus>) => void | ILoadStatus) => void;
};



const LoadContext = createContext<LoadContextType>({
    state : initialState,
    setState :() => undefined,
    
});

const LoadProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useImmer<ILoadStatus>(initialState);
    return (
        <LoadContext.Provider value={{ state, setState }}>{children}</LoadContext.Provider>
    );
};

export {LoadProvider, LoadContext , initialState}





