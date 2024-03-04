import { useContext } from "react";
import { RegContext } from "./auth.contxt";
import { IAuthObject, IRegistration, authInitialState } from "./auth.types";
import { API } from "../../../services/API/api.services";
import { API_REG } from "../../../services/API/api.constant";
import { IResetPassword } from "../../login-page/resetPassword";
import { LoginFormSate } from "../../login-page/login-page";
import lscache from "lscache";
import { useNavigate } from 'react-router-dom';

import { routes } from "../../routes/routes";
import { IForgotResetPassword } from "../../login-page/forgetResetPassword";

export const useRegContext = () => {
    
    const navigate = useNavigate();
  const { state, setState } = useContext(RegContext);

  if (setState === undefined) {
    throw new Error("Must have setState defined");
  }

  const login = async ( userData : LoginFormSate ) => {
    
    const loginObject = {
        user_name :userData.email,
        password: userData.password,
        platform_id: 1
    };
    
    try{
        const authData : IAuthObject  = await  API.post(API_REG.comapanyLogin, loginObject);
        
        setAuthSession( authData );
        navigate(routes.dashboard);
        setState(draft => {
            draft.regLoading = false;
          });
          

    } catch (error: any) {

        console.log("resonese error " , error.massage);
        
        setState(draft => {
          draft.auth = error
            draft.regLoading = false;
           
          });
        
        }
  };

  const setAuthSession = ( data : IAuthObject ) => {
   
     const  authenticated = data.access_token !== '' && data.access_token !== null ;
      console.log('login ',authenticated)
      setState(draft => {
          draft.auth = data;
          draft.authenticated = authenticated;
          draft.regLoading = false;
      });

      authenticated ? lscache.set('auth', { authenticated, data }) :  lscache.flush();
    // lscache.set('auth', { authenticated, data });

  }
  


  const regist = async (newreg: IRegistration) => {
    setState((draft) => {
      draft.regLoading = true;
    });

    console.log(newreg);
    try {
      const regData = await API.post(API_REG.postRegistration, newreg);
      return regData ;
      

    } catch (error: any) {
        
      console.log(error);
      
    }
    setState((draft) => {
      draft.regLoading = false;
    });
    
  };

  const rePass = async (  id?:any ) => {
    setState((draft) => {
      draft.regLoading = true;
    });
    console.log(`${API_REG.getCompanyVerify}/${id}`)
    try {
      const veriData = await API.get(`${API_REG.getCompanyVerify}/${id}`);  
      // const veriData = await API.get(`${API_REG.getCompanyVerify}?email=${id}`); 
      return veriData;
    } catch (error: any) {
      console.log(error);
    }
    setState((draft) => {
      draft.regLoading = false;
    });
  };

  const verifyFirstPass = async ( initialVerifyPass :IResetPassword , id?: any   ) => {
    setState((draft) => {
      draft.regLoading = true ;  
    });
    
    if(id){
        const verifyPasswordObject  = {
            password:initialVerifyPass.password,
            confirm_password:initialVerifyPass.confirmPassword,
            company_guid:id

        };
        console.log( 'verifyPass', verifyPasswordObject) ;
        try {
            const latestPass = await API.post( API_REG.companyVerifyPassword , verifyPasswordObject );
            return latestPass ; 
        
        } catch (error: any) {
            console.log(error);
          }
          setState((draft) => {
            draft.regLoading = false;
          });
    }

  }

  const getForgotPass = async ( email: string ) => {

    setState((draft) => {
      draft.regLoading = true ;  
    });
    try{
        const forgotPass = await API.get( `${API_REG.getForgotPassword}/${email}`  );
   return forgotPass ;
    }catch (error: any) {
      console.log(error);
    }
    setState((draft) => {
      draft.regLoading = false;
    });
  }
  const verifyForgotPasswordLink = async ( id?: any ) => {
    setState((draft) => {
      draft.regLoading = true ;  
    });
    try{
        const forgotPass = await API.get( `${API_REG.getForgotPassword}/${id}`  );
   return forgotPass ;
    }catch (error: any) {
      console.log(error);
    }
    setState((draft) => {
      draft.regLoading = false;
    });
  }

  const postForgotPassword = async (initialForgotPass: IForgotResetPassword  , id?: any) => {
    setState((draft) => {
      draft.regLoading = true ;  
    });
    if(id){
        const forgotPasswordObject  = {
            password:initialForgotPass.password,
            confirm_password:initialForgotPass.confirmPassword,
            company_guid:id
        };
        console.log( 'verifyPass', forgotPasswordObject) ;
        try {
            const latestForgotPass = await API.post( API_REG.postForgotPassword , forgotPasswordObject );
            return latestForgotPass ; 
        
        } catch (error: any) {
            console.log(error);
          }
          setState((draft) => {
            draft.regLoading = false;
          });
    }


  }

   const logout = () => {
    lscache.flush();
    clearState();
    window.location.reload();
  };

  const clearState = () => {
    setState(draft => {
      draft.regLoading = false;
      draft.auth = authInitialState;
    });
  };


  return {
    ...state,
    regist,
    rePass,
    verifyFirstPass,
    login,
    logout,
    getForgotPass,
    postForgotPassword,
    verifyForgotPasswordLink
  };
};
