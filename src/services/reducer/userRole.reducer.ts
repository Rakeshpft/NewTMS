import { useContext } from "react";
import { UserRoleUpdateContext } from "../context/userRole.context";
import { API } from "../api-helper/api.services";
import { API_USER_Role } from "../api-helper/api.constant";
import {  IUserRoleDetails, IUserRoleDetailsResponse } from "../tms-objects/userRole.types";
import { IAPIResponse } from "../tms-objects/response.types";

import { IUserRoleFormState } from "../../components/user-role/userRole.types";

export const useUserRoleContext = () => {
  const { state, setState } = useContext(UserRoleUpdateContext);
  if (setState === undefined) {
    throw new Error("Must have setState defined");
  }

  const getUserRoleDetails = async () => {
    setState((draft) => {
      draft.userRoleLoading = true;
    });
    try {
      const userRoleList :IUserRoleDetailsResponse = await API.get(API_USER_Role.getUserRole);
          
      const newUserContacts = userRoleList.value.map((user) => {
        user.str_active = user.active ? "Active" : "Inactive";
        return user;
      });
  
      setState((draft) => {
        draft.userRoleDetails = newUserContacts;
      });
  
      return newUserContacts;
        

    
    
     
      // setState((draft) => {
      //   draft.userRoleDetails   = userRoleList;
      // });
      
    } 
    
    catch (error: any) {
      console.log(error);
    }
    setState((draft) => {
      draft.userRoleLoading = false;
    });
  };



  const getIndividualUserRoleDetails = async (RoleId: number) => {
    setState((draft) => {
      draft.userRoleLoading = true;
    })

    try {
      const response : IAPIResponse = await API.get(`${API_USER_Role.getIndividualUserRole}/${RoleId}`); 

      console.log("id data" , response )
     
      setState ((draft) => {
        draft.selectedUserRole = response.value
        draft.userRoleLoading = false
      })

     
    }catch (error: any) {
      console.log(error)
      setState((draft) => {
        draft.userRoleLoading = false
      })
    }
  };

  const saveUserRole = async ( newUserRole : IUserRoleFormState ) => {
    setState((draft) => {
      draft.userRoleLoading = true;
    })
   
    try{
      const response : IAPIResponse = await API.post(API_USER_Role.postNewUserRoleData, newUserRole);
      
      
       setState(draft => {
       
        draft.selectedUserRole = null;
      });
return response
    } catch (error: any) {
      console.log(error);
      setState((draft) => {
        draft.saveUserRoleFailed = true
      })
    }
  }

  const deleteUserRole = async (userToDeleted : IUserRoleDetails[]) => {
    setState((draft) => {
      draft.userRoleLoading = true;
    });
    
    try{
      await userToDeleted.forEach(user => {

        API.del(`${API_USER_Role.deleteUsersRole}/${user.role_id}`);
      })
      
    } catch (error: any) {
      console.log(error);
      setState((draft) => {
        draft.userRoleLoading = false
      })
    }
    
  }

  
  return {
    ...state,
    getUserRoleDetails,
    getIndividualUserRoleDetails,
    saveUserRole,
    deleteUserRole,
  };
};
