import { useContext } from "react";
import { LoadAddContext } from "../context/load.context";
import { API } from "../api-helper/api.services";
import { API_LOAD } from "../api-helper/api.constant";
import { IAPIResponse } from "../tms-objects/response.types";
import { ILoadDocuments, ILoadNotesObject, ILoadObject, ILoadServiceDetention, ILoadServiceLumper, ILoadServiceOther, ILoadServicesDriverPayable } from "../tms-objects/load.type";

export const useLoadContext = () => {
  const { state, setState } = useContext(LoadAddContext);

  if (setState === undefined) {
    throw new Error("Must have setState defined");
  }

  const getLaodList = async () => {
    setState((draft) => {
      draft.statusLoading = true;
    });

    try {
     
      const loadListData: IAPIResponse = await API.get(API_LOAD.getLoad);
      
      setState((draft) => {
        draft.loadList = loadListData.value;
        draft.statusLoading = false;
      });

    } catch (error: any) {
      console.log(error);
      setState((draft) => {
        draft.statusLoading = false;
      });
    }
  };

 const  getLoadNotes = async (load_id : number) => {
    setState((draft) => {
      draft.statusLoading = true;
    });

    try{
          
        const notesList : IAPIResponse = await API.get(`${API_LOAD.getLoad}/${load_id}${API_LOAD.getLoadNotes}`);
        
        setState((draft) => {
         draft.loadNotesList = notesList.value;
         draft.statusLoading = false;

        }) ;   
    }catch(error: any){
      console.log(error);
      setState((draft) => {
        draft.statusLoading = false;
      });
    }
  };

  const postNotesData = ( load_id : number , notes :ILoadNotesObject ) => {
     setState((draft) => {
      draft.statusLoading = true
    })
    try{
      const notesPost   = API.post(`${API_LOAD.getLoad}/${load_id}${API_LOAD.getLoadNotes}` , notes);

      return notesPost
    }catch(error: any){
      console.log(error);
      setState((draft) => {
        draft.statusLoading = false;
      });
  
     }
    }

    const deleteLoadNotes = async ( load_id : number , deleteNotesId : number[] ) => {
      setState((draft) => {
        draft.statusLoading = true;
      });
      try {
        const NotesDeleteData : IAPIResponse = await API.del( `${API_LOAD.getLoad}/${load_id}${API_LOAD.deleteLoadNotes}` , deleteNotesId );
        return NotesDeleteData ;
      } catch (error: any) {
        console.log(error);
        setState((draft) => {
          draft.statusLoading = false;
        });
      }
    }
    
    const getIndividualLoad = async (load_id : number) => {
      setState((draft) => {
        draft.statusLoading = true;
      });
      try {
        const selectedLoadData : IAPIResponse = await API.get( `${API_LOAD.getLoad}/${load_id}` );
        setState((draft) => {
          draft.selectedLoad = selectedLoadData.value;
          draft.statusLoading = false;
        });
      } catch (error: any) {
        console.log(error);
        setState((draft) => {
          draft.statusLoading = false;
        });
      }
    }

    const getLoadServiceList = async (load_id : number) => {

      setState((draft) => {
        draft.statusLoading = true;
      });
   
      try{
        const loadServiceList : IAPIResponse = await API.get(`${API_LOAD.getLoad}/${load_id}${API_LOAD.loadServices}`)

      setState((draft) => {
        draft.loadServicesList = loadServiceList.value;
        draft.statusLoading = false;
      })}catch(error: any){
        console.log(error);
        setState((draft) => {
          draft.statusLoading = false;
        });
      }
    
    }

    const postServicesLumper = async (load_id: number , payload : ILoadServiceLumper ) => {
      setState((draft) => {
        draft.statusLoading = true;
      });
      try {
        const serviceLumper = API.postForm(`${API_LOAD.getLoad}/${load_id}${API_LOAD.postServicesLumper}` , payload );

        return serviceLumper;
      } catch (error: any) {
        console.log(error);
        setState((draft) => {
          draft.statusLoading = false;
        });
      }
    };

    const postServiceDetention = async (load_id: number , payload : ILoadServiceDetention ) => {
      setState((draft) => {
        draft.statusLoading = true;
      });
      try {
        const serviceDetention = API.post(`${API_LOAD.getLoad}/${load_id}${API_LOAD.postServicesDetention}` , payload);

        return serviceDetention;
      } catch (error: any) {
        console.log(error);
        setState((draft) => {
          draft.statusLoading = false;
        });
      }
    }


  const postServiceNewCharge = async (load_id: number , payload : ILoadServiceOther) => {
    setState((draft) => {
      draft.statusLoading = true;
    });
    try {
      const serviceNewCharge = API.post(`${API_LOAD.getLoad}/${load_id}${API_LOAD.postServicesNewCharges}` , payload);

      return serviceNewCharge;

    } catch (error: any) {
      console.log(error);
      setState((draft) => {
        draft.statusLoading = false;
      });
    }
  };

  const getLoadDocumentsList = async (load_id: number) => {
    setState((draft) => {
      draft.statusLoading = true;
    });
    try {
      const loadDocumentList: IAPIResponse = await API.get(`${API_LOAD.getLoad}/${load_id}${API_LOAD.getLoadDocumentsList}`);

      setState((draft) => {
        draft.loadDocumentsList = loadDocumentList.value;
        draft.statusLoading = false;
      });
    } catch (error: any) {
      console.log(error);
      setState((draft) => {
        draft.statusLoading = false;
      });
    }
  };

  const postLoadServicesDriverPayable = async (load_id: number , payload : ILoadServicesDriverPayable ) => {
    setState((draft) => {
      draft.statusLoading = true;
    });
    try {
      const serviceDriverPayable = await API.post(`${API_LOAD.getLoad}/${load_id}${API_LOAD.postLoadServicesDriverPayable}` , payload);

       return  serviceDriverPayable 

    } catch (error: any) {
      console.log(error);
      setState((draft) => {
        draft.statusLoading = false;
      });
    }
  }


  const postLoad = async (payload: ILoadObject) => {
    setState((draft) => {
      draft.statusLoading = true;
    });
    try {
      const loadPost = await API.post(API_LOAD.getLoad, payload);
      return loadPost;
    } catch (error: any) {
      console.log(error);
      setState((draft) => {
        draft.statusLoading = false;
      });
    }
  };


  const postLoadDocuments = async (load_id: number, payload: ILoadDocuments) => {
    setState((draft) => {
      draft.statusLoading = true;
    });

    try {
      const loadDocuments = await API.postForm(`${API_LOAD.getLoad}/${load_id}${API_LOAD.getLoadDocumentsList}`, payload);

      return loadDocuments;
    } catch (error: any) {
      console.log(error);
      setState((draft) => {
        draft.statusLoading = false;
      });
    }
  };




  return {
    ...state,

    getLaodList,
    getLoadNotes,
    postNotesData,
    deleteLoadNotes,
    getIndividualLoad ,
    getLoadServiceList , 
    postServicesLumper ,
    postServiceDetention ,
    postServiceNewCharge ,
    getLoadDocumentsList ,
    postLoadDocuments,
    postLoadServicesDriverPayable ,
    postLoad
          
  };
};
