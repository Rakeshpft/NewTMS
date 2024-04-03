import React, { createContext } from "react";
import { Draft } from "immer";
import { IDispatcherLoadObject } from "../tms-objects/load.type";
import { useImmer } from "use-immer";

export interface ILoadStatus {
  statusLoading: boolean;
  loadDispatcherStatus: IDispatcherLoadObject[] | null;
}



const initialState : ILoadStatus = {
    statusLoading: false,
    loadDispatcherStatus: null,
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





