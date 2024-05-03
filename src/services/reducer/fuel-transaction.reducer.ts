import { useContext } from "react";
import {API_FUEL_TRANSACTION } from "../api-helper/api.constant";
import { API } from "../api-helper/api.services";
import { FuelTransactionUpdateContext } from "../context/fuel-transaction.context";
import { IAPIResponse } from "../tms-objects/response.types";
import { IFuelTransactionObject } from "../tms-objects/fuel-transaction.types";

export const useFuelTransactionContext = () => {
    const { state, setState } = useContext(FuelTransactionUpdateContext);
    if (setState === undefined) {
      throw new Error("Must have setState defined");
    }
    const getFuelTransactionList = async () => {
      setState((draft) => { draft.isLoading = true; });
      try {
          const response: IAPIResponse = await API.get(API_FUEL_TRANSACTION.getFuelTransaction);
          console.log(response.value);
          setState((draft) => { draft.fuelTransactionList = response.value; draft.isLoading = false; });
          return response.value;
      }
      catch (error: any) { console.log(error); }
      setState((draft) => { draft.isLoading = false; });
    }
  
    const getFuelTransactionDetail = async (id:number) => {
      setState((draft) => { draft.isLoading = true; });
        try {
          const response: IAPIResponse = await API.get(`${API_FUEL_TRANSACTION.getFuelTransaction}/${id}`);
          setState((draft) => { draft.fuelTransactionDetail = response.value; draft.isLoading = false; });
          return response.value;
        }
        catch (error: any) { console.log(error); }
        setState((draft) => { draft.isLoading = false; });
    }
  
    const saveFuelTransaction = async (newTransaction: IFuelTransactionObject) => {
      setState((draft) => { draft.isLoading = true; });
      try {
        const response: IAPIResponse = await API.post(API_FUEL_TRANSACTION.postNewFuelTransaction,newTransaction);
        setState((draft) => { draft.isLoading = false; });
        return response;
      } catch (error: any) {
        console.log(error);
        setState((draft) => { draft.isLoading=false; });
      }
    };
  
    const deleteFuelTransaction = async (fuelTransactionIdsToDelete: number[]) => {
      setState((draft) => { draft.isLoading = true; });
      try {
        let response = await API.del(`${API_FUEL_TRANSACTION.deleteFuelTransaction}`, fuelTransactionIdsToDelete);
        setState((draft) => { draft.isLoading = false; });
        return response;
      } catch (error: any) {
        console.log(error);
        setState((draft) => { draft.isLoading = false; });
      }
    };
  
   
  
    return {
      ...state,
      getFuelTransactionList,
      getFuelTransactionDetail,
      deleteFuelTransaction,
      saveFuelTransaction,
    }
  }