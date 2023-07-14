import React, { Dispatch, SetStateAction } from "react";

type ContextProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
};

export const LoginContext = React.createContext<Partial<ContextProps>>({});
