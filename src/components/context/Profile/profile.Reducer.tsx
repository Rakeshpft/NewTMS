import { useContext } from "react";
import { ProfileUpdateContext } from "./profileContext";
import { IProfilePassword } from "../../pofile/profileForm";
import { API } from "../../../services/API/api.services";
import { API_PROFILE } from "../../../services/API/api.constant";

export const useProfileContext = () => {

  const { state, setState } = useContext(ProfileUpdateContext);

  if (setState === undefined) {
    throw new Error("Must have setState defined");
  }

  const profileResetPass  = async ( profilePassword : IProfilePassword ) => {
    setState((draft) => {
      draft.profileLoading = true ;  
    });

    const profilePassObject = {
      password : profilePassword.password
    }
    try {
      const profilePass = await API.post( API_PROFILE.postProfilePassword ,profilePassObject );
      return profilePass ;
    }catch (error: any) {
              console.log(error);
            }
            setState((draft) => {
              draft.profileLoading = false;
            });


  }
//   if(id){
//     const verifyPasswordObject  = {
//         password:initialVerifyPass.password,
//         confirm_password:initialVerifyPass.confirmPassword,
//         company_guid:id

//     };
//     console.log( 'verifyPass', verifyPasswordObject) ;
//     try {
//         const latestPass = await API.post( API_REG.companyVerifyPassword , verifyPasswordObject );
//         return latestPass ; 
    
//     } catch (error: any) {
//         console.log(error);
//       }
//       setState((draft) => {
//         draft.regLoading = false;
//       });
// }

  return {
    ...state,
    profileResetPass
  }
};
