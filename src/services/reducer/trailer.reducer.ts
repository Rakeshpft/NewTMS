import { useContext } from "react";
import { API } from "../api-helper/api.services";
import { IAPIResponse } from "../tms-objects/response.types";
import { TrailerUpdateContext } from "../context/trailer.context";
import { API_TRAILER } from "../api-helper/api.constant";
import { ITrailerObject } from "../tms-objects/trailer.types";



export const useTrailerContext = () => {

    const { state , setState } = useContext(TrailerUpdateContext);

    if (setState === undefined) {
        throw new Error("Must have setState defined");
    }
    const getTrailerList = async () => {
      setState((draft) => { draft.isLoading = true; });
        try {
          const response: IAPIResponse = await API.get(API_TRAILER.getTrailer);
          setState((draft) => { draft.trailerList = response.value; draft.isLoading = false; });
          return response.value;
        }
        catch (error: any) { console.log(error); }
        setState((draft) => { draft.isLoading = false; });
    }
    const getTrailerDetail = async (id:number) => {
      setState((draft) => { draft.isLoading = true; });
        try {
          const response: IAPIResponse = await API.get(`${API_TRAILER.getTrailer}/${id}`);
          setState((draft) => { draft.trailerDetail = response.value; draft.isLoading = false; });
          return response.value;
        }
        catch (error: any) { console.log(error); }
        setState((draft) => { draft.isLoading = false; });
    }
    
      const saveTrailer = async (newTrailer: ITrailerObject) => {
        setState((draft) => {
          draft.isLoading = true;
        });
        clearSuccessAndFailure();
        try {
          const response: IAPIResponse = await API.post(
            API_TRAILER.postNewTrailerData,
            newTrailer
          );
    
          setState((draft) => {
            draft.is_error = response.is_error ? true : false;
             draft.saveTrailerSuccess = response.success ? true : false;
             draft.selectedTrailer = null;
          });
          return response;
        } catch (error: any) {
          console.log(error);
          setState((draft) => {
            draft.is_error = draft.is_error ? true : false;
            draft.saveTrailerFailed = true;
          });
        }
      };
    
      const deleteTrailer = async (trailerToDeleted: ITrailerObject[]) => {
        setState((draft) => {
          draft.isLoading = true;
        });
    
        clearSuccessAndFailure();
    
        try {
            trailerToDeleted.forEach((trailer) => {
            API.del(`${API_TRAILER.deleteTrailer}/${trailer.trailer_id}`); 
          });
    
          setTimeout(() => getTrailerList(), 200);
        } catch (error: any) {
          console.log(error);
          setState((draft) => {
            draft.isLoading = false;
          });
        }
      };
      const getTrailerStatus = async () => {
        setState((draft) => {
          draft.isLoading = true;
        });
      
        try {
          const StatusList: IAPIResponse = await API.get(API_TRAILER.getTrailerStatus);
          const newStatusList = StatusList.value;
      
          setState((draft) => {
            draft.trailerDetail = newStatusList;
            draft.isLoading = false;
          });
      
          return newStatusList;
        } catch (error: any) {
          console.log(error);
        }
      
        setState((draft) => {
          draft.isLoading = false;
        });
      }
    
      const clearSuccessAndFailure = () => {
        setState((draft) => {
          draft.saveTrailerFailed = false;
          draft.saveTrailerSuccess = false;
        });
      };
    

    return {
        ... state,
        getTrailerList,
        deleteTrailer,
        saveTrailer,
        getTrailerDetail,
        getTrailerStatus,
    }

}

