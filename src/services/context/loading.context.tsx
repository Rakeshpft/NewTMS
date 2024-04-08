import React, { createContext } from "react";
import { useImmer } from "use-immer";

type LoadingContextType = {
  loader: boolean;
  setLoader: (f: boolean) => void;
};

const LoadingContext = createContext<LoadingContextType>({
  loader: false,
  setLoader: () => undefined,
});

const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [loader, setLoader] = useImmer<boolean>(false);
  return (
    <LoadingContext.Provider value={{ loader, setLoader }}>
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingProvider, LoadingContext };
