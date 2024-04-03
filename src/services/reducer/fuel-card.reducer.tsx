import { useContext } from "react";
import { API_FUEL_CARD } from "../api-helper/api.constant";
import { API } from "../api-helper/api.services";
import { IAPIResponse } from "../tms-objects/response.types";
import { FuelCardUpdateContext } from "../context/fuel-card.context";

export const useFuelCardContext = () => {
  const { state, setState } = useContext(FuelCardUpdateContext);
  if (setState === undefined) {
    throw new Error("Must have setState defined");
  }
  const getFuelCardList = async () => {
    setState((draft) => { draft.isLoading = true; });
      try {
        const response: IAPIResponse = await API.get(API_FUEL_CARD.getFuelCard);
        setState((draft) => { draft.fuelCardList = response.value; draft.isLoading = false; });
        return response.value;
      }
      catch (error: any) { console.log(error); }
      setState((draft) => { draft.isLoading = false; });
  }
  const getFuelCardDetail = async (id:number) => {
    setState((draft) => { draft.isLoading = true; });
      try {
        const response: IAPIResponse = await API.get(`${API_FUEL_CARD.getFuelCard}/${id}`);
        setState((draft) => { draft.fuelCardDetail = response.value; draft.isLoading = false; });
        return response.value;
      }
      catch (error: any) { console.log(error); }
      setState((draft) => { draft.isLoading = false; });
  }
  return {
    ...state,
    getFuelCardList,
    getFuelCardDetail
  }
}