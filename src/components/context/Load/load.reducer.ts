import { useContext } from "react"
import { LoadContext } from "./load.context"
import { API } from "../../../services/API/api.services";
import { API_LOAD } from "../../../services/API/api.constant";
import { IDispatcherLoadObject, ILoadStatusObject, IStateObject } from "./load.type";
import { IBillingLoadObject } from "../BiliingLoad/billing.types";




export const useLoadContext = () => {
    const {state , setState} = useContext(LoadContext)

    if (setState === undefined) {
        throw new Error("Must have setState defined");
      }

      const getStatusList = async () => {
        setState(draft => {
            draft.statusLoading = true;            
          });
          try{
            const dataLoad : ILoadStatusObject[] = await API.get(API_LOAD.loadStatus );

            setState(draft => {
                draft.loadStatus = dataLoad;
                draft.statusLoading = false;
              }); 
              console.log( 'status data ',dataLoad)

          }catch (error: any) {
            console.log(error);
          }
          setState((draft) => {
            draft.statusLoading = false;
          });
       } 


       const getBillingStatusList = async () => {
        setState(draft => {
          draft.statusLoading = true;            
        });
        try{
          const billingList : IBillingLoadObject[] = await API.get(API_LOAD.billingStatusList );
          setState(draft => {
              draft.loadBillingStatus = billingList;
              draft.statusLoading = false;
          }) ;
          console.log( 'status biiling ', billingList)

        }catch (error: any) {
          console.log(error);
        }
        setState((draft) => {
          draft.statusLoading = false;
        });
       }

       const getDispatcherStatusList = async () => {
        setState(draft => {
          draft.statusLoading = true;            
        });
        try{
          const dispatcherList : IDispatcherLoadObject[] = await API.get(API_LOAD.dispatcherLoadList );
          setState(draft => {
              draft.loadDispatcherStatus = dispatcherList;
              draft.statusLoading = false;
          }) ;
          console.log( 'status biiling ', dispatcherList)

        }catch (error: any) {
          console.log(error);
        }
        setState((draft) => {
          draft.statusLoading = false;
        });
       }
       const getStateStatusList = async () => {
        setState(draft => {
          draft.statusLoading = true;            
        });
        try{
          const stateList : IStateObject[] = await API.get(API_LOAD.stateLoadList );
          setState(draft => {
              draft.loadStateStatus = stateList;
              draft.statusLoading = false;
          }) ;
          console.log( 'status biiling ', stateList)

        }catch (error: any) {
          console.log(error);
        }
        setState((draft) => {
          draft.statusLoading = false;
        });
       }

     return {
        ...state,
        getStatusList,
        getBillingStatusList,
        getDispatcherStatusList,
        getStateStatusList

     } 
}