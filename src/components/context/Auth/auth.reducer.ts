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

export const useRegContext = () => {
    
    const navigate = useNavigate();
  const { state, setState } = useContext(RegContext);

  if (setState === undefined) {
    throw new Error("Must have setState defined");
  }

  const login = async ( userData : LoginFormSate ) => {
    
    const loginObject = {
        user_name :userData.email,
        password: userData.password
    };
    try{
        const authData : IAuthObject  = await  API.post(API_REG.comapanyLogin, loginObject);
        
        setAuthSession( authData );
        navigate(routes.dashboard);
        setState(draft => {
            draft.regLoading = false;
          });
    } catch (error: any) {
        console.log(error);
        setState(draft => {
            draft.regLoading = false;
          });
        }
  };

  const setAuthSession = ( data : IAuthObject ) => {
      const  authenticated = data.access_token !== '';

      setState(draft => {
          draft.auth = data;
          draft.authenticated = authenticated;
          draft.regLoading = false;
      });

   
    lscache.set('auth', { authenticated, data });
  }


  const regist = async (newreg: IRegistration) => {
    setState((draft) => {
      draft.regLoading = true;
    });

    console.log(newreg);
    try {
      const regData = await API.post(API_REG.registration, newreg);
      return regData;
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
    console.log(`${API_REG.companyVerify}/${id}`)
    try {
      const veriData = await API.get(`${API_REG.companyVerify}/${id}`);  
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
  };
};
