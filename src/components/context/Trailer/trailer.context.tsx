import React, { createContext } from "react";
import { Draft } from "immer";
import { ITrailerObject  } from "./trailer.types";
import { useImmer } from "use-immer";

export interface ITrailerStatus {
  trailerLoading: boolean;
  trailerListStatus: ITrailerObject[] | null;
}

const initialState: ITrailerStatus = {
  trailerLoading: false,
  trailerListStatus: null,
};

type TrailerSattusType = {
  state: ITrailerStatus;
  setState: (
    f: (draft: Draft<ITrailerStatus>) => void | ITrailerStatus
  ) => void;
};

const TrailerAddContext = createContext<TrailerSattusType>({
  state: initialState,
  setState: () => undefined,
});

const TrailerStatusProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useImmer<ITrailerStatus>(initialState);

  return (
    <TrailerAddContext.Provider value={{ state, setState }}>
      {" "}
      {children}
    </TrailerAddContext.Provider>
  );
};

export { TrailerStatusProvider, TrailerAddContext, initialState };
