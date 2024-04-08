import React, { createContext } from "react";
import { Draft } from "immer";
import { ILoadingObject } from "../tms-objects/loading.types";
import { useImmer } from "use-immer";

export interface ILoadingStatus {
  loadingStatus: ILoadingObject | null;
}

const initialState: ILoadingStatus = {
  loadingStatus: null,
};

type LoadingContextType = {
  state: ILoadingStatus;
  setState: (
    f: (draft: Draft<ILoadingStatus>) => void | ILoadingStatus
  ) => void;
};

const LoadingContext = createContext<LoadingContextType>({
  state: initialState,
  setState: () => undefined,
});

const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useImmer<ILoadingStatus>(initialState);
  return (
    <LoadingContext.Provider value={{ state, setState }}>
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingProvider, LoadingContext, initialState };
