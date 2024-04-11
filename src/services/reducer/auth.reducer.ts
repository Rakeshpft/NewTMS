import { useContext } from "react";
import { RegContext } from "../context/auth.contxt";
import { IAuthObject, IRegistration, authInitialState } from "../tms-objects/auth.types";
import { API } from "../api-helper/api.services";
// import { API_REG, platformId } from "../../../services/API/api.constant";
import { IResetPassword } from "../../components/login-page/resetPassword";
import { LoginFormSate } from "../../components/login-page/login-page";
import lscache from "lscache";
import { useNavigate } from 'react-router-dom';

import { routes } from "../../components/routes/routes";
import { IForgotResetPassword } from "../../components/login-page/forgetResetPassword";
import { API_REG, platformId } from "../api-helper/api.constant";
import { useListContext } from "./list.reducer";

export const useRegContext = () => {    
    const navigate = useNavigate();
    const { state, setState } = useContext(RegContext);
    const { getBillingStatusList, getBillingTypeList, getCustomerStatusList, getDriverStatusList, getDriverTypeList, getLoadStatusList,
       getStateList, getCreditList, getOwnershipTypeList, getDocumentStatusList, getFactorList , getPaymentCategoryList, getProductCodeList,
        getScheduleFrequencyList, getScheduleTypeList, getScheduleRepeatList, getELDProviderList, getDriverList } = useListContext();
    if (setState === undefined) {
      throw new Error("Must have setState defined");
    }
    const login = async ( userData : LoginFormSate ) => {    
      const loginObject = {
          user_name :userData.email,
          password: userData.password,
          platform_id: platformId
      };    
      try{
        const authData : IAuthObject  = await API.post(API_REG.comapanyLogin, loginObject);        
        setAuthSession(authData);
        setGlobalList(authData);
        navigate(routes.dashboard);
        setState(draft => { draft.regLoading = false;});
      } 
      catch (error: any) { 
        console.log("resonese error " , error.massage);        
        setState(draft => {
          draft.auth = error
          draft.regLoading = false;           
      })        
    }
  };

  const setAuthSession = ( data : IAuthObject ) => {   
      const authenticated = data.access_token !== '' && data.access_token !== null ;
      //console.log('login ',authenticated)
      setState(draft => {
          draft.auth = data;
          draft.authenticated = authenticated;
          draft.regLoading = false;
      });
      authenticated ? lscache.set('auth', { authenticated, data }) :  lscache.flush();
      //lscache.set('auth', { authenticated, data });
  }

  const setGlobalList = ( data : IAuthObject ) => {   
    const authenticated = data.access_token !== '' && data.access_token !== null ;    
    if(authenticated){      
      getBillingStatusList(true);
      getBillingTypeList(true);
      getCustomerStatusList(true);
      getDriverStatusList(true);
      getDriverTypeList(true);
      getLoadStatusList(true);
      getStateList(true);
      getCreditList(true);
      getOwnershipTypeList(true);
      getDocumentStatusList(true);
      getFactorList(true);
      getPaymentCategoryList(true);
      getProductCodeList(true);
      getScheduleFrequencyList(true);
      getScheduleTypeList(true);
      getScheduleRepeatList(true);
      getELDProviderList(true);
      getDriverList(true);
    }    
  }

  const regist = async (newreg: IRegistration) => {
      setState((draft) => { draft.regLoading = true; });
      //console.log(newreg);
      try {
          const regData = await API.post(API_REG.postRegistration, newreg);
          return regData ;
      } 
      catch (error: any) { console.log(error); }
      setState((draft) => { draft.regLoading = false; });    
  };

  const rePass = async (  id?:any ) => {
    setState((draft) => { draft.regLoading = true; });    
    try {
      const veriData = await API.get(`${API_REG.getCompanyVerify}/${id}`);
      return veriData;
    } 
    catch (error: any) { console.log(error); }
    setState((draft) => { draft.regLoading = false; });
  };

  const verifyFirstPass = async ( initialVerifyPass :IResetPassword , id?: any   ) => {
    setState((draft) => { draft.regLoading = true ; });    
    if(id){
        const verifyPasswordObject  = {
            password:initialVerifyPass.password,
            confirm_password:initialVerifyPass.confirmPassword,
            company_guid:id
        };
        //console.log( 'verifyPass', verifyPasswordObject) ;
        try {
            const latestPass = await API.post( API_REG.companyVerifyPassword , verifyPasswordObject );
            return latestPass ;         
        } 
        catch (error: any) { console.log(error); }
        setState((draft) => { draft.regLoading = false; });
    }
  }

  const getForgotPass = async ( email: string ) => {
    setState((draft) => { draft.regLoading = true ; });
    try{
        const forgotPass = await API.get( `${API_REG.getForgotPassword}/${email}`);
        return forgotPass ;
    }
    catch (error: any) { console.log(error); }
    setState((draft) => { draft.regLoading = false; });
  }
  const verifyForgotPasswordLink = async ( id?: any ) => {
    setState((draft) => { draft.regLoading = true ; });
    try{
        const forgotPass = await API.get( `${API_REG.getForgotPassword}/${id}`);
        return forgotPass ;
    }
    catch (error: any) { console.log(error); }
    setState((draft) => { draft.regLoading = false; });
  }

  const postForgotPassword = async (initialForgotPass: IForgotResetPassword  , id?: any) => {
    setState((draft) => { draft.regLoading = true ; });
    if(id){
        const forgotPasswordObject  = {
            password:initialForgotPass.password,
            confirm_password:initialForgotPass.confirmPassword,
            company_guid:id
        };
        //console.log( 'verifyPass', forgotPasswordObject) ;
        try {
            const latestForgotPass = await API.post( API_REG.postForgotPassword , forgotPasswordObject );
            return latestForgotPass ;         
        } 
        catch (error: any) { console.log(error); }
        setState((draft) => { draft.regLoading = false; });
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








