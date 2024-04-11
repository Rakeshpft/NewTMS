import { useContext } from "react"
import { truckUpdateContext } from "../context/truck.context";
import { API } from "../api-helper/api.services";
import { API_TRUCK } from "../api-helper/api.constant";
import { IAPIResponse } from "../tms-objects/response.types";
import { ITruckDocument, ITruckObject } from "../tms-objects/truck.types";


export const useTruckContext = () => {
    const {state , setState} = useContext(truckUpdateContext)

    if (setState === undefined) {
        throw new Error("Must have setState defined");
    }

    const getTruckList = async () => {
        setState((draft) => {
          draft.truckLoading = true;
        });
        try {
          const truckList : IAPIResponse = await API.get( `/equipment${API_TRUCK.getTruck}`);
    
          setState((draft) => {
          draft.truckList = truckList.value;
          draft.truckLoading = false;
          });
        } catch (error: any) {
          console.log(error);
        }
      };

      const getIndividualtruck = async (id:number) => {
        setState((draft) => { draft.truckLoading = true;

         });
          try {
            const response: IAPIResponse = await API.get(`/equipment${API_TRUCK.getIndividualTruck}/${id}`);
            setState((draft) => { 
              draft.selectedTruck = response.value;
               draft.truckLoading = false; });
            return response.value;
          }
          catch (error: any) { console.log(error); }
          setState((draft) => { draft.truckLoading = false; });
      }
      
        const saveTruck = async (newTruck: ITruckObject) => {
          setState((draft) => {
            draft.truckLoading = true;
          });
          clearSuccessAndFailure();
          try {
            const response: IAPIResponse = await API.post(
              `/equipment${API_TRUCK.postTruck}`,
              newTruck
            );
      
            setState((draft) => {
              draft.is_error = response.is_error ? true : false;
               draft.saveTruckSuccess = response.success ? true : false;
               draft.selectedTruck = null;
            });
            return response;
          } catch (error: any) {
            console.log(error);
            setState((draft) => {
              draft.is_error = draft.is_error ? true : false;
              draft.saveTruckFailed = true;
            });
          }
        };
      
        const deleteTruck = async (truck_ids :number[]) => {
          setState((draft) => {
            draft.truckLoading = true;
          });
      
          clearSuccessAndFailure();
      
          try {
           let response = await API.del(  `/equipment${API_TRUCK.deleteTruck}`,truck_ids); 
            
      
            setTimeout(() => getTruckList(), 200);
            return response;
          } catch (error: any) {
            console.log( error);
            setState((draft) => {
              draft.truckLoading = false;
            });
          }
        };

        const clearSuccessAndFailure = () => {
          setState((draft) => {
            draft.saveTruckFailed = false;
            draft.saveTruckSuccess = false;
          });
        };
  
        const getAnnualInspectionDocument = async (truck_id:number)  => {
          setState((draft) => {
            draft.truckLoading = true;
          });      
          try {
            const documentList: IAPIResponse = await API.get(`/equipment${API_TRUCK.getTruck}/${truck_id}${API_TRUCK.getannualInspectionDocument}`);      
            setState((draft) => {
              draft.documentAnnualInspectionList = documentList.value;
              draft.truckLoading = false;
            });      
            return documentList.value;
          } catch (error: any) {
            console.log(error);
          }      
          setState((draft) => {
            draft.truckLoading = false;
          });
        }
        const postAnnualInspectionDocument =async (truck_id:number,payload : ITruckDocument) => {
          setState(draft => {
            draft.truckLoading = true;
          })      
          clearSuccessAndFailure();      
          try {  
            const response = await API.postForm(`/equipment${API_TRUCK.getTruck}/${truck_id}${API_TRUCK.postannualInspectionDocument}`, payload);
            return response;
          } catch (error: any) {
            console.log(error);
            setState((draft) => {
              draft.truckLoading = false;
            });
          }
        };
  
        const deleteAnnualInspectionDocument = async (truck_id: number, document_ids: number[]) => {
          setState((draft) => {
            draft.truckLoading = true;
          });
        
          clearSuccessAndFailure();
        
          try {
       let response = await API.del(`/equipment${API_TRUCK.getTruck}/${truck_id}${API_TRUCK.deleteannualInspectionDocument}`, document_ids);
          return response
  
          } catch (error: any) {
            console.log(error);
            setState((draft) => {
              draft.truckLoading = false;
            });
          }
        };

        const getRegistrationDocument = async (truck_id:number)  => {
          setState((draft) => {
            draft.truckLoading = true;
          });      
          try {
            const documentList: IAPIResponse = await API.get(`/equipment${API_TRUCK.getTruck}/${truck_id}${API_TRUCK.getregistrationDocument}`);      
            setState((draft) => {
              draft.documentRegistrationList = documentList.value;
              draft.truckLoading = false;
            });      
            return documentList.value;
          } catch (error: any) {
            console.log(error);
          }      
          setState((draft) => {
            draft.truckLoading = false;
          });
        }
        const postRegistrationDocument =async (truck_id:number,payload : ITruckDocument) => {
          setState(draft => {
            draft.truckLoading = true;
          })      
          clearSuccessAndFailure();      
          try {  
            const response = await API.postForm(`/equipment${API_TRUCK.getTruck}/${truck_id}${API_TRUCK.postregistrationDocument}`, payload);
            return response;
          } catch (error: any) {
            console.log(error);
            setState((draft) => {
              draft.truckLoading = false;
            });
          }
        };
  
        const deleteRegistrationDocument = async (truck_id: number, document_ids: number[]) => {
          setState((draft) => {
            draft.truckLoading = true;
          });
        
          clearSuccessAndFailure();
        
          try {
           let response = await API.del(`/equipment${API_TRUCK.getTruck}/${truck_id}${API_TRUCK.deleteregistrationDocument}`, document_ids);          
           return response;
          } catch (error: any) {
            console.log(error);
            setState((draft) => {
              draft.truckLoading = false;
            });
          }
        };

        const getRepairMaintanceDocument = async (truck_id:number)  => {
          setState((draft) => {
            draft.truckLoading = true;
          });      
          try {
            const documentList: IAPIResponse = await API.get(`/equipment${API_TRUCK.getTruck}/${truck_id}${API_TRUCK.getrepairmaintanceDocument}`);      
            setState((draft) => {
              draft.documentRepairMaintenanceList = documentList.value;
              draft.truckLoading = false;
            });      
            return documentList.value;
          } catch (error: any) {
            console.log(error);
          }      
          setState((draft) => {
            draft.truckLoading = false;
          });
        }
        const postRepairMaintanceDocument =async (truck_id:number,payload : ITruckDocument) => {
          setState(draft => {
            draft.truckLoading = true;
          })      
          clearSuccessAndFailure();      
          try {      
  
            const response = await API.postForm(`/equipment${API_TRUCK.getTruck}/${truck_id}${API_TRUCK.postrepairmaintanceDocument}`, payload);
            return response;
          } catch (error: any) {
            console.log(error);
            setState((draft) => {
              draft.truckLoading = false;
            });
          }
        };
  
        const deleteRepairMaintanceDocument = async (truck_id: number, document_ids: number[]) => {
          setState((draft) => {
            draft.truckLoading = true;
          });
        
          clearSuccessAndFailure();
        
          try {
        let response = await API.del(`/equipment${API_TRUCK.getTruck}/${truck_id}${API_TRUCK.deleterepairmaintanceDocument}`, document_ids);
              return response;
          } catch (error: any) {
            console.log(error);
            setState((draft) => {
              draft.truckLoading = false;
            });
          }
        };

        const getOtherDocument = async (truck_id:number)  => {
          setState((draft) => {
            draft.truckLoading = true;
          });      
          try {
            const documentList: IAPIResponse = await API.get(`/equipment${API_TRUCK.getTruck}/${truck_id}${API_TRUCK.getotherDocument}`);      
            setState((draft) => {
              draft.documentOtherList = documentList.value;
              draft.truckLoading = false;
            });      
            return documentList.value;
          } catch (error: any) {
            console.log(error);
          }      
          setState((draft) => {
            draft.truckLoading = false;
          });
        }
        const postOtherDocument =async (truck_id:number,payload : ITruckDocument) => {
          setState(draft => {
            draft.truckLoading = true;
          })      
          clearSuccessAndFailure();      
          try {  
            const response = await API.postForm(`/equipment${API_TRUCK.getTruck}/${truck_id}${API_TRUCK.postotherDocument}`, payload);
            return response;
          } catch (error: any) {
            console.log(error);
            setState((draft) => {
              draft.truckLoading = false;
            });
          }
        };
  
        const deleteOtherDocument = async (truck_id: number, document_ids: number[]) => {
          setState((draft) => {
            draft.truckLoading = true;
          });
        
          clearSuccessAndFailure();
        
          try {
           let response = await API.del(`/equipment${API_TRUCK.getTruck}/${truck_id}${API_TRUCK.deleteotherDocument}`, document_ids);            
           return response;  
          } catch (error: any) {
            console.log(error);
            setState((draft) => {
              draft.truckLoading = false;
            });
          }
        };
           
    
        
    return {
        ...state,
        getTruckList,
        getIndividualtruck,
        saveTruck,
        deleteTruck,
        getAnnualInspectionDocument,
        postAnnualInspectionDocument,
        deleteAnnualInspectionDocument,
        getRepairMaintanceDocument,
        postRepairMaintanceDocument,
        deleteRepairMaintanceDocument,
        getOtherDocument,
        postOtherDocument,
        deleteOtherDocument,
        getRegistrationDocument,
        postRegistrationDocument,
        deleteRegistrationDocument,
        

    }
}