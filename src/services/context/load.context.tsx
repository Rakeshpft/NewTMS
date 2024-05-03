import React, { createContext } from "react";
import { Draft } from "immer";
import { useImmer } from "use-immer";
import { ILoadDocuments, ILoadNotesObject, ILoadObject, ILoadServices } from "../tms-objects/load.type";

export interface ILoadStatus {
  statusLoading: boolean;
  loadList : ILoadObject[] | null;
  selectedLoad : ILoadObject | null
  loadNotesList : ILoadNotesObject[] | null;
  loadServicesList : ILoadServices[] | null;
  loadDocumentsList : ILoadDocuments[] | null;
  
}


const initialState : ILoadStatus = {
    statusLoading: false,   
    loadList : null ,
    selectedLoad : null,
    loadNotesList : null,
    loadServicesList : null,
    loadDocumentsList : null,

}

type LoadContextType = {
    state : ILoadStatus;
    setState : (f: (draft: Draft<ILoadStatus>) => void | ILoadStatus) => void;
};



const LoadAddContext = createContext<LoadContextType>({
    state : initialState,
    setState :() => undefined,
    
});

const LoadProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useImmer<ILoadStatus>(initialState);
    return (
        <LoadAddContext.Provider value={{ state, setState }}>{children}</LoadAddContext.Provider>
    );
};

export {LoadProvider, LoadAddContext , initialState}





