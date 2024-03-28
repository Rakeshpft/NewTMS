import { useContext } from "react";
import { TrailerAddContext } from "../context/trailer.context"
import { API } from "../api-helper/api.services";
import { API_TRAILER } from "../api-helper/api.constant";



export const useTrailerContext = () => {
   const  {state , setState } =  useContext(TrailerAddContext)
   
   if(setState === undefined){
      throw new Error("Must have setState defined");
   }


   const getTrailer  = async ( ) => {
    setState((draft) => {
        draft.trailerLoading = true;
      });

     try {
        const trailerData = await API.get(API_TRAILER.getTrailer) ; 

        setState((draft) => {
            draft.trailerListStatus = trailerData.value;
            draft.trailerLoading = false;
          });
     }
     catch (error: any) {
        console.log(error);
     }
             
   }

   return {
    ... state ,
    getTrailer,
   }
}