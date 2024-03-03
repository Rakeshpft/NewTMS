import { useContext } from "react";
import { UserUpdateContext } from "./user.context";
import { API } from "../../../services/API/api.services";
import { API_USER } from "../../../services/API/api.constant";
import { IUserDetailsResponse } from "./user.types";

export const useUserContext = () => {
  const { state, setState } = useContext(UserUpdateContext);
  if (setState === undefined) {
    throw new Error("Must have setState defined");
  }

  const getUserDetails = async () => {
    setState((draft) => {
      draft.userLoading = true;
    });
    try {
      const userList :IUserDetailsResponse = await API.get(API_USER.getUser);

      const newUserContacts = userList.value.map((user) => {
          user.full_name = `${user.first_name} ${user.last_name}`;
          return user;
      })
      return newUserContacts
    //   setState((draft) => {
    //     draft.userDetails   = newUserContacts;
    //   });
    } catch (error: any) {
      console.log(error);
    }
    setState((draft) => {
      draft.userLoading = false;
    });
  };

  return {
    ...state,
    getUserDetails,
  };
};
