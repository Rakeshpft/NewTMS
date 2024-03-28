import { useContext } from "react"
import { LoadContext } from "../context/load.context"
import { API } from "../api-helper/api.services";
import { API_LOAD } from "../api-helper/api.constant";
import { IAPIResponse } from "../tms-objects/response.types";

export const useLoadContext = () => {
  const { state, setState } = useContext(LoadContext)

  if (setState === undefined) {
    throw new Error("Must have setState defined");
  }

  const getStatusList = async () => {
    setState(draft => { draft.statusLoading = true; });
    try {
      const dataLoad: IAPIResponse = await API.get(API_LOAD.loadStatus);
      setState(draft => { draft.loadStatus = dataLoad.value; });
      //console.log( 'status list : ',dataLoad)
    } catch (error: any) {
      console.log(error);
    } finally {
      setState((draft) => { draft.statusLoading = false; });
    }
  }

  const getBillingStatusList = async () => {
    setState(draft => { draft.statusLoading = true; });
    try {
      const billingList: IAPIResponse = await API.get(API_LOAD.billingStatusList);
      setState(draft => { draft.loadBillingStatus = billingList.value; });
      //console.log( 'billing status list : ', billingList)
    } catch (error: any) {
      console.log(error);
    } finally {
      setState((draft) => { draft.statusLoading = false; });
    }
  }

  const getDispatcherStatusList = async () => {
    setState(draft => { draft.statusLoading = true; });
    try {
      const dispatcherList: IAPIResponse = await API.get(API_LOAD.dispatcherLoadList);
      setState(draft => { draft.loadDispatcherStatus = dispatcherList.value; });
      //console.log( 'dispatcher list : ', dispatcherList)
    } catch (error: any) {
      console.log(error);
    } finally {
      setState((draft) => { draft.statusLoading = false; });
    }
  }

  const getStateStatusList = async () => {
    setState(draft => { draft.statusLoading = true; });
    try {
      const stateList: IAPIResponse = await API.get(API_LOAD.stateLoadList);
      setState(draft => { draft.loadStateStatus = stateList.value; });
      //console.log( 'state list : ', stateList)
    } catch (error: any) {
      console.log(error);
    } finally {
      setState((draft) => { draft.statusLoading = false; });
    }
  }

  return {
    ...state,
    getStatusList,
    getBillingStatusList,
    getDispatcherStatusList,
    getStateStatusList
  }
}