import { useContext } from "react";
import { ProfileUpdateContext } from "./profileContext";
import { IProfilePassword } from "../../pofile/profileForm";
import { API } from "../../../services/API/api.services";
import { API_PROFILE } from "../../../services/API/api.constant";
import {  IProfileDetailsResponse } from "./profileTypes";
import { IProfileUpdate } from "../../pofile/profileType";

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

  const getProfileDetails = async ( ) => {
    setState(draft => {
      draft.profileLoading = true;
    });
    try {
      const profileDetails : IProfileDetailsResponse = await API.get( API_PROFILE.getProfile );
       return profileDetails ;
      // setState(draft => {
      //   draft.profileDetails = profileDetails;
      //   draft.profileLoading = false;
      // });
    }catch (error: any) {
      console.log(error);
    }
    setState((draft) => {
      draft.profileLoading = false;
    });
   

  }

const postProfileDetails = async ( profileDetails : IProfileUpdate ) => {
  setState(draft => {
    draft.profileLoading = true;
  })
   const formData = new FormData();
   formData.append('first_name', profileDetails.first_name);
   formData.append('last_name', profileDetails.last_name);
   formData.append('email', profileDetails.email);
   formData.append('contact_number', profileDetails.contact_number);
   formData.append('image_File', profileDetails.image_name);
   debugger;
  try {
    const updateProfileDetails = await API.post( API_PROFILE.postProfile , formData );
    setState(draft => {
      draft.profileDetails = updateProfileDetails;
     
      draft.profileLoading = false;
    })
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.profileLoading = false;
    });
  }
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
    profileResetPass,
    getProfileDetails,
    postProfileDetails
  }
};
