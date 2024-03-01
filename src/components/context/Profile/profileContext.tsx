import React, { createContext } from "react";
import { Draft } from "immer";
import {  IProfileDetailsResponse, IProfileResetPassword } from "./profileTypes";
import { useImmer } from "use-immer";

export interface IProfileAccount {
  profileDetails: IProfileDetailsResponse | null;
  profileLoading: boolean;
  profileResetPassword : IProfileResetPassword | null
}

const initialState: IProfileAccount = {
  profileDetails: null,
  profileLoading: false,
  profileResetPassword : null
};

type ProfileUpdateContextType = {
  state: IProfileAccount;
  setState: (
    f: (draft: Draft<IProfileAccount>) => void | IProfileAccount
  ) => void;
};

const ProfileUpdateContext = createContext<ProfileUpdateContextType>({
  state: initialState,
  setState: () => undefined,
});

const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useImmer<IProfileAccount>(initialState);
  return (
    <ProfileUpdateContext.Provider value={{ state, setState }}>
      {children}
    </ProfileUpdateContext.Provider>
  );
};

export { ProfileUpdateContext, ProfileProvider, initialState };
