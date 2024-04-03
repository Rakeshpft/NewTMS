import { Draft } from "immer";
import { INewStateDetails, IStateDetails } from "../tms-objects/state.types";

import React, { createContext } from "react";
import { useImmer } from "use-immer";

export interface IStateData {
    stateDetails : IStateDetails[] | null
    stateLoading : boolean;
   is_error : boolean;
  saveStateSuccess :boolean;
  saveStateFailed : boolean;
  selectedState : INewStateDetails | null;
}

const InitialState : IStateData = {
    stateDetails:null,
    is_error : false,
    stateLoading : false,
    saveStateSuccess :false,
    saveStateFailed : false,
    selectedState : null
}

type StateUpdateContextType = {
    state: IStateData;
    setState: (
      f: (draft: Draft<IStateData>) => void | IStateData
    ) => void;
  };
  const StateUpdateContext = createContext<StateUpdateContextType>({
    state: InitialState,
    setState: () => undefined,
  });
  const StateProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useImmer<IStateData>(InitialState);
  
    return (  
      <StateUpdateContext.Provider value={{ state, setState }}>
        {children}
      </StateUpdateContext.Provider>
    );
  };
  
  export { StateUpdateContext, StateProvider, InitialState };
  