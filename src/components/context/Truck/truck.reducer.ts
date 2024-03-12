import { useContext } from "react"
import { truckAddContext } from "./truck.context";
import { API } from "../../../services/api-helper/api.services";
import { API_TRUCK } from "../../../services/api-helper/api.constant";



export const useTruckContext = () => {
    const {state , setState} = useContext(truckAddContext)

    if (setState === undefined) {
        throw new Error("Must have setState defined");
    }

    const saveTruck = async () => {
        setState((draft) => {
          draft.truckLoading = true;
        });
        try {
          const driverData = await API.post( API_TRUCK.addTruck);
    
          setState((draft) => {
          draft.truckListStatus = driverData;
          draft.truckLoading = false;
          });
        } catch (error: any) {
          console.log(error);
        }
      };

    return {
        ...state,
        saveTruck
    }
}