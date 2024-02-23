import { useContext } from "react";
import { TrailerAddContext } from "./trailer.context"
import { API } from "../../../services/API/api.services";
import { API_TRAILER } from "../../../services/API/api.constant";



export const useTrailer = () => {
   const  {state , setState } =  useContext(TrailerAddContext)
   
   if(setState === undefined){
      throw new Error("Must have setState defined");
   }


   const saveTrailer  = async ( ) => {
    setState((draft) => {
        draft.trailerLoading = true;
      });

     try {
        const trailerData = await API.post(API_TRAILER.addTrailer) ; 
        return trailerData;
     }
     catch (error: any) {
        console.log(error);
     }
             
   }

   return {
    ... state ,
    saveTrailer,
   }
}