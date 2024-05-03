import { useContext } from "react";
import { API_FUEL_CARD } from "../api-helper/api.constant";
import { API } from "../api-helper/api.services";
import { IAPIResponse } from "../tms-objects/response.types";
import { FuelCardUpdateContext } from "../context/fuel-card.context";
import { IAssignFuelCardObject, ICancelFuelCardObject, IFuelCardObject, IReturnFuelCardObject } from "../tms-objects/fuel-card.types";

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

  const saveFuelCard = async (newCustomer: IFuelCardObject) => {
    setState((draft) => { draft.isLoading = true; });
    try {
      const response: IAPIResponse = await API.post(API_FUEL_CARD.postNewFuelCard,newCustomer);
      setState((draft) => { draft.isLoading = false; });
      return response;
    } catch (error: any) {
      console.log(error);
      setState((draft) => { draft.isLoading=false; });
    }
  };

  const deleteFuelCard = async (fuelCardIdsToDelete: number[]) => {
    setState((draft) => { draft.isLoading = true; });
    try {
      let response = await API.del(`${API_FUEL_CARD.deleteFuelCard}`, fuelCardIdsToDelete);
      setState((draft) => { draft.isLoading = false; });
      return response;
    } catch (error: any) {
      console.log(error);
      setState((draft) => { draft.isLoading = false; });
    }
  };

  const assignFuelCard =async (fuel_card_id:number,payload : IAssignFuelCardObject) => {
    setState(draft => { draft.isLoading = true; })
    try {      
      const response = await API.post(`${API_FUEL_CARD.getFuelCard}/${fuel_card_id}${API_FUEL_CARD.postNewAssignFuelCard}`, payload);
      setState((draft) => { draft.isLoading = false; });
      return response;
    } catch (error: any) {
      console.log(error);
      setState((draft) => { draft.isLoading = false; });
    }
  };

  const returnAssignedFuelCard =async (fuel_card_id:number,payload : IReturnFuelCardObject) => {
    setState(draft => { draft.isLoading = true; })      
    try {      
      const response = await API.post(`${API_FUEL_CARD.getFuelCard}/${fuel_card_id}${API_FUEL_CARD.postNewReturnAssignFuelCard}`, payload);
      return response;
    } catch (error: any) {
      console.log(error);
      setState((draft) => { draft.isLoading = false; });
    }
  };

  const cancelAssignedFuelCard =async (fuel_card_id:number,payload : ICancelFuelCardObject) => {
    setState(draft => { draft.isLoading = true; })
    try {
      const response = await API.post(`${API_FUEL_CARD.getFuelCard}/${fuel_card_id}${API_FUEL_CARD.postNewCancelAssignFuelCard}`, payload);
      return response;
    } catch (error: any) {
      console.log(error);
      setState((draft) => { draft.isLoading = false; });
    }
  };

  const getFuelCardCurrentAssigneeDetail = async (fuel_card_id:number) => {
    debugger;
    setState((draft) => { draft.isLoading = true; });
      try {
        const response: IAPIResponse = await API.get(`${API_FUEL_CARD.getFuelCard}/${fuel_card_id}${API_FUEL_CARD.getFuelCardCurrentAssign}`);  
        setState((draft) => { draft.fuelCardCurrentAssigneeDetail = response.value; draft.isLoading = false; });
        return response;
      }
      catch (error: any) { console.log(error); }
      setState((draft) => { draft.isLoading = false; });
  }

  const getFuelCardAssigneeList = async (fuel_card_id:number) => {
    debugger;
    setState((draft) => { draft.isLoading = true; });
      try {
        const response: IAPIResponse = await API.get(`${API_FUEL_CARD.getFuelCard}/${fuel_card_id}${API_FUEL_CARD.getFuelCardAssign}`);  
        setState((draft) => { draft.fuelCardAssigneeList = response.value; draft.isLoading = false; });
        return response;
      }
      catch (error: any) { console.log(error); }
      setState((draft) => { draft.isLoading = false; });
  }

  return {
    ...state,
    getFuelCardList,
    getFuelCardDetail,
    getFuelCardAssigneeList,
    getFuelCardCurrentAssigneeDetail,
    deleteFuelCard,
    saveFuelCard,
    assignFuelCard,
    returnAssignedFuelCard,
    cancelAssignedFuelCard,
  }
}