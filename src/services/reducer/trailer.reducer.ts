import { useContext } from "react";
import { API } from "../api-helper/api.services";
import { IAPIResponse } from "../tms-objects/response.types";
import { TrailerUpdateContext } from "../context/trailer.context";
import { API_TRAILER } from "../api-helper/api.constant";
import { ITrailerDocument, ITrailerObject } from "../tms-objects/trailer.types";



export const useTrailerContext = () => {

  const { state, setState } = useContext(TrailerUpdateContext);

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
  const getTrailerDetail = async (id: number) => {
    setState((draft) => { draft.isLoading = true; });
    try {
      const response: IAPIResponse = await API.get(`${API_TRAILER.getIndividualTrailer}/${id}`);
      setState((draft) => {
        draft.trailerDetail = response.value;
        draft.isLoading = false;
      })
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

  const deleteTrailer = async (trailerIdsToDelete: number[]) => {
    setState((draft) => {
      draft.isLoading = true;
    });
    clearSuccessAndFailure();
    try {
      let response = await API.del(`${API_TRAILER.deleteTrailer}`, trailerIdsToDelete);
      setTimeout(() => getTrailerList(), 200);
     
      return response;
    } catch (error: any) {
      console.log(error);
      setState((draft) => {
        draft.isLoading = false;
      });
    }
  };


  const getAnnualInspectionDocument = async (tailer_id: number) => {

    setState((draft) => {
      draft.isLoading = true;
    });
    try {
      const documentList: IAPIResponse = await API.get(`${API_TRAILER.getTrailer}/${tailer_id}${API_TRAILER.getAnnualInspectionDocument}`);
      setState((draft) => {
        draft.AnnualInspectionDocumentList = documentList.value;
        draft.isLoading = false;
      });
      return documentList.value;
    } catch (error: any) {
      console.log(error);
    }
    setState((draft) => {
      draft.isLoading = false;
    });
  }

  const postAnnualInspectionDocument = async (trailer_id: number, payload: ITrailerDocument) => {

    setState(draft => {
      draft.isLoading = true;
    })
    clearSuccessAndFailure();
    try {
      const response = await API.postForm(`${API_TRAILER.getTrailer}/${trailer_id}${API_TRAILER.postAnnualInspectionDocument}`, payload);
      response.value = response && response.value && response.value + '?id=' + Math.random()
      return response;
    } catch (error: any) {
      console.log(error);
      setState((draft) => {
        draft.isLoading = false;
      });
    }
  };


  const deleteAnnualInspectionDocument = async (trailer_id: number, document_ids: number[]) => {
    setState((draft) => {
      draft.isLoading = true;
    });
    clearSuccessAndFailure();
    try {
      let response = await API.del(`${API_TRAILER.getTrailer}/${trailer_id}${API_TRAILER.deleteAnnualInspectionDocument}`, document_ids);
      return response;
    } 
    catch (error: any) {
      console.log(error);
      setState((draft) => {
        draft.isLoading = false;
      });
    }
  };


  const getRegistraionDocument = async (tailer_id: number) => {

    setState((draft) => {
      draft.isLoading = true;
    });
    try {
      const documentList: IAPIResponse = await API.get(`${API_TRAILER.getTrailer}/${tailer_id}${API_TRAILER.getRegistraionDocument}`);
      setState((draft) => {
        draft.RegistrationDocumentList = documentList.value;
        draft.isLoading = false;
      });
      return documentList.value;
    } catch (error: any) {
      console.log(error);
    }
    setState((draft) => {
      draft.isLoading = false;
    });
  }
  const postRegistraionDocument = async (trailer_id: number, payload: ITrailerDocument) => {

    setState(draft => {
      draft.isLoading = true;
    })
    clearSuccessAndFailure();
    try {

      const response = await API.postForm(`${API_TRAILER.getTrailer}/${trailer_id}${API_TRAILER.postRegistraionDocument}`, payload);
      response.value = response && response.value && response.value + '?id=' + Math.random()
      return response;
    } catch (error: any) {
      console.log(error);
      setState((draft) => {
        draft.isLoading = false;
      });
    }
  };


  const deleteRegistraionDocument = async (trailer_id: number, document_ids: number[]) => {
    setState((draft) => {
      draft.isLoading = true;
    });
    clearSuccessAndFailure();
    try {
      let response = await API.del(`${API_TRAILER.getTrailer}/${trailer_id}${API_TRAILER.deleteRegistraionDocument}`, document_ids);
      return response;
    } catch (error: any) {
      console.log(error);
      setState((draft) => {
        draft.isLoading = false;
      });
    }
  };



  const getOtherDocument = async (tailer_id: number) => {
    setState((draft) => {
      draft.isLoading = true;
    });
    try {
      const documentList: IAPIResponse = await API.get(`${API_TRAILER.getTrailer}/${tailer_id}${API_TRAILER.getOtherDocument}`);
      setState((draft) => {
        draft.OtherDocumentList = documentList.value;
        draft.isLoading = false;
      });
      return documentList.value;
    } catch (error: any) {
      console.log(error);
    }
    setState((draft) => {
      draft.isLoading = false;
    });
  }
  const postOtherDocument = async (trailer_id: number, payload: ITrailerDocument) => {
    setState(draft => {
      draft.isLoading = true;
    })
    clearSuccessAndFailure();
    try {

      const response = await API.postForm(`${API_TRAILER.getTrailer}/${trailer_id}${API_TRAILER.postOtherDocument}`, payload);
      response.value = response && response.value && response.value + '?id=' + Math.random()
      return response;
    } catch (error: any) {
      console.log(error);
      setState((draft) => {
        draft.isLoading = false;
      });
    }
  };

  const deleteOtherDocument = async (trailer_id: number, document_ids: number[]) => {
    setState((draft) => {
      draft.isLoading = true;
    });
    clearSuccessAndFailure();
    try {
      let response = await API.del(`${API_TRAILER.getTrailer}/${trailer_id}${API_TRAILER.deleteOtherDocument}`, document_ids);
      return response;
    } catch (error: any) {
      console.log(error);
      setState((draft) => {
        draft.isLoading = false;
      });
    }
  };



  const getRepairMaintenanceDocument = async (tailer_id: number) => {
    setState((draft) => {
      draft.isLoading = true;
    });
    try {
      const documentList: IAPIResponse = await API.get(`${API_TRAILER.getTrailer}/${tailer_id}${API_TRAILER.getRepairMaintenanceDocument}`);
      setState((draft) => {
        draft.RepairMaintenanceDocumentList = documentList.value;
        draft.isLoading = false;
      });
      return documentList.value;
    } catch (error: any) {
      console.log(error);
    }
    setState((draft) => {
      draft.isLoading = false;
    });
  }
  const postRepairMaintenanceDocument = async (trailer_id: number, payload: ITrailerDocument) => {
    setState(draft => {
      draft.isLoading = true;
    })
    clearSuccessAndFailure();
    try {

      const response = await API.postForm(`${API_TRAILER.getTrailer}/${trailer_id}${API_TRAILER.postRepairMaintenanceDocument}`, payload);
      response.value = response && response.value && response.value + '?id=' + Math.random()
      return response;
    } catch (error: any) {
      console.log(error);
      setState((draft) => {
        draft.isLoading = false;
      });
    }
  };


  const deleteRepairMaintenanceDocument = async (trailer_id: number, document_ids: number[]) => {
    setState((draft) => {
      draft.isLoading = true;
    });
    clearSuccessAndFailure();
    try {
      let response = await API.del(`${API_TRAILER.getTrailer}/${trailer_id}${API_TRAILER.deleteRepairMaintenanceDocument}`, document_ids);
      return response;
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
    ...state,
    getTrailerList,
    deleteTrailer,
    saveTrailer,
    getTrailerDetail,
    getTrailerStatus,
    getAnnualInspectionDocument,
    postAnnualInspectionDocument,
    deleteAnnualInspectionDocument,
    getRegistraionDocument,
    postRegistraionDocument,
    deleteRegistraionDocument,
    getOtherDocument,
    postOtherDocument,
    deleteOtherDocument,
    getRepairMaintenanceDocument,
    postRepairMaintenanceDocument,
    deleteRepairMaintenanceDocument,
  }

}

