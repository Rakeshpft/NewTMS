import { useContext } from "react"
import { truckUpdateContext } from "../context/truck.context";
import { API } from "../api-helper/api.services";
import { API_TRUCK } from "../api-helper/api.constant";
import { IAPIResponse } from "../tms-objects/response.types";



export const useTruckContext = () => {
    const {state , setState} = useContext(truckUpdateContext)

    if (setState === undefined) {
        throw new Error("Must have setState defined");
    }

    const getTruck = async () => {
        setState((draft) => {
          draft.truckLoading = true;
        });
        try {
          const truckList : IAPIResponse = await API.get( API_TRUCK.getTruck);
    
          setState((draft) => {
          draft.truckList = truckList.value;
          draft.truckLoading = false;
          });
        } catch (error: any) {
          console.log(error);
        }
      };

    return {
        ...state,
        getTruck
    }
}