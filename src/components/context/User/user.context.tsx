import React, { createContext }   from "react";
import { Draft } from "immer";
import { IUserDetailsResponse } from "./user.types";
import { useImmer } from "use-immer";


export interface IUserData {
   userDetails : IUserDetailsResponse[] | null 
   userLoading : boolean;

}

const InitialState : IUserData = {
    userDetails : null,
    userLoading : false
}

type UserUpdateContextType = {
    state : IUserData;
    setState : (
        f : (draft : Draft<IUserData>) => void | IUserData
    ) => void;
};
 
const UserUpdateContext = createContext<UserUpdateContextType>({
    state : InitialState,
    setState : () => undefined
})

const UserProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useImmer<IUserData>(InitialState);
    return (
        <UserUpdateContext.Provider value={{ state, setState }}>
            {children}
        </UserUpdateContext.Provider>
    );
};

export { UserUpdateContext, UserProvider , InitialState }