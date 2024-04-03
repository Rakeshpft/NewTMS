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

  return {
    ...state,
    getDispatcherStatusList,
  }
}