import React, { createContext }   from "react";
import { Draft } from "immer";
import { IInviteUserDetails, IUserDetails, IUserRole } from "../tms-objects/user.types";
import { useImmer } from "use-immer";


export interface IUserData {
   userDetails : IUserDetails[] | null 
   userLoading : boolean;
   is_error : boolean;
   saveUserSuccess : boolean;
   saveUserFailed : boolean;
   selectedUser : IInviteUserDetails | null
   userRole : IUserRole[] | null

}

const InitialState : IUserData = {
    userDetails : null,
    is_error : false,
    userLoading : false,
    saveUserSuccess : false,
    saveUserFailed : false,
    selectedUser : null,
    userRole : null
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