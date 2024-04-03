import { Draft } from "immer";
import React, { createContext } from "react";
import { useImmer } from "use-immer";
import { ITrailerObject } from "../tms-objects/trailer.types";

export interface ITrailerData {
    trailerList : ITrailerObject[] | null;
    trailerDetail : ITrailerObject | null;
    isLoading : boolean;
    is_error : boolean;
    saveTrailerSuccess :boolean;
    saveTrailerFailed : boolean;
    selectedTrailer: ITrailerObject | null;
}

const trailerInitialData : ITrailerData = {
  trailerList:null,
  trailerDetail:null,
  isLoading : false,
  is_error : false,
  saveTrailerSuccess :false,
  saveTrailerFailed : false,
  selectedTrailer:null,
}

type TrailerUpdateContextType = {
    state: ITrailerData;
    setState: (
      f: (draft: Draft<ITrailerData>) => void | ITrailerData
    ) => void;
  };
  const TrailerUpdateContext = createContext<TrailerUpdateContextType>({
    state: trailerInitialData,
    setState: () => undefined,
  });
  const TrailerProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useImmer<ITrailerData>(trailerInitialData);
  
    return (  
      <TrailerUpdateContext.Provider value={{ state, setState }}>
        {children}
      </TrailerUpdateContext.Provider>
    );
  };
  
  export { TrailerUpdateContext, TrailerProvider, trailerInitialData };
  