import { useContext } from "react";
import { StateUpdateContext } from "../context/state.context";
import { IStateDetails, IStateDetailsResponse } from "../tms-objects/state.types";
import {  API_STATE } from "../api-helper/api.constant";
import { API } from "../api-helper/api.services";
import { IAPIResponse } from "../tms-objects/response.types";

export const useStateContext = () => {
    const { state , setState } = useContext(StateUpdateContext);

    if (setState === undefined) {
        throw new Error("Must have setState defined");
    }
    const getState = async () => {
        setState((draft) => {
          draft.stateLoading = true;
        });
      
        try {
          const StateList: IStateDetailsResponse = await API.get(API_STATE.getState);
          
      
          setState((draft) => {
            draft.stateDetails = StateList.value;
            draft.stateLoading = false;
          });
      
          return StateList;
        } catch (error: any) {
          console.log(error);
        }
      
        setState((draft) => {
          draft.stateLoading = false;
        });
      }
      const saveState = async (newCustomer: IStateDetails) => {
        setState((draft) => {
          draft.stateLoading = true;
        });
        clearSuccessAndFailure();
        try {
          const response: IAPIResponse = await API.post(
            API_STATE.postState,
            newCustomer
          );
    
          setState((draft) => {
            draft.is_error = response.is_error ? true : false;
            draft.saveStateSuccess = response.success ? true : false;
            draft.selectedState = null;
          });
          return response;
        } catch (error: any) {
          console.log(error);
          setState((draft) => {
            draft.saveStateFailed = true;
          });
        }
      };
      const clearSuccessAndFailure = () => {
        setState((draft) => {
          draft.saveStateFailed = false;
          draft.saveStateSuccess = false;
        });
      };
    
      return {
        ...state,
        getState,
        saveState,
        
      }
}