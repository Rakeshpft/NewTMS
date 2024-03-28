import React, { createContext } from "react";
import { Draft } from "immer";
import { IAuthObject, authInitialState } from "../tms-objects/auth.types";
import { useImmer } from "use-immer";

export interface IAuth {
  regLoading: boolean;
  authenticated: boolean;
  auth: IAuthObject ;
}

const initialState: IAuth = {
  regLoading: false,
  authenticated: false,
  auth: authInitialState,
};

type RegContextType = {
  state: IAuth;
  setState: (f: (draft: Draft<IAuth>) => void | IAuth) => void;
};

const RegContext = createContext<RegContextType>({
  state: initialState,
  setState: () => undefined,
});

const RegProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useImmer<IAuth>(initialState);

  return (
    <RegContext.Provider value={{ state, setState }}>
      {children}
    </RegContext.Provider>
  );
};

export { RegProvider, RegContext, initialState };
