import { useContext } from "react";
import { API } from "../api-helper/api.services";
import { API_VENDOR } from "../api-helper/api.constant";
import { VendorUpdateContext } from "../context/vendor.context";
import { IVendorDetails, IVendorDetailsResponse, IVendorDocument } from "../tms-objects/vendor.types";
import { IAPIResponse } from "../tms-objects/response.types";
import { toastify } from "../../features/notification/toastify";



export const useVendorContext = () => {

    const { state , setState } = useContext(VendorUpdateContext);

    if (setState === undefined) {
        throw new Error("Must have setState defined");
    }

    const getVendorDetails = async () => {
        setState((draft) => {
            draft.VendorLoading = true;
          });
          
          try {
             
            const vendorList : IVendorDetailsResponse = await API.get(API_VENDOR.getVendor );
             const newVendorList = vendorList.value.map((vendor)=>{
              // vendor.full_name = `${vendor.first_name} ${vendor.last_name}`;
              // vendor.address = `${vendor.suite_number} ${vendor.street_number} ${vendor.city} ${vendor.state_id} ${vendor.zipcode}`;
            return vendor;
        })
            setState((draft) => {
                draft.VendorDetails = newVendorList;
                draft.VendorLoading = false;
            });
             
          } catch (error: any) {
              console.log(error);
          }
          setState((draft) => {
            draft.VendorLoading = false;
          });


     }
     

     const getIdividualVendorDetails = async (CustomerId: number) => {
        setState((draft) => {
          draft.VendorLoading = true;
        });
    
        try {
          const response: IAPIResponse = await API.get(
            `${API_VENDOR.getIndividualVendor}/${CustomerId}`
          );
    
          setState((draft) => {
            draft.selectedVendor = response.value;
            draft.VendorLoading = false;
          });
        } catch (error: any) {
          console.log(error);
          setState((draft) => {
            draft.VendorLoading = false;
          });
        }
      };
    
      const saveVendor = async (newCustomer: IVendorDetails) => {
        setState((draft) => {
          draft.VendorLoading = true;
        });
        clearSuccessAndFailure();
        try {
          const response: IAPIResponse = await API.post(
            API_VENDOR.postNewVendorData,
            newCustomer
          );
    
          setState((draft) => {
            draft.is_error = response.is_error ? true : false;
            draft.saveVendorSuccess = response.success ? true : false;
            draft.selectedVendor = null;
          });
          return response;
        } catch (error: any) {
          console.log(error);
          setState((draft) => {
            draft.saveVendorFailed = true;
          });
        }
      };
    
      const deleteVendor = async (customerToDeleted: IVendorDetails[]) => {
        setState((draft) => {draft.VendorLoading = true;});    
        clearSuccessAndFailure();    
        try {
            customerToDeleted.forEach((customer) => {
            API.del(`${API_VENDOR.deleteVendor}/${customer.vendor_id}`); 
          });    
          setTimeout(() => getVendorDetails(), 200);
        } catch (error: any) {
          console.log(error);
          setState((draft) => {
            draft.VendorLoading = false;
          });
        }
      };
      const getVendorDocument = async (vendor_id:number) => {
        setState((draft) => {
          draft.VendorLoading = true;
        });      
        try {
          const documentList: IAPIResponse = await API.get(`${API_VENDOR.getVendor}/${vendor_id}${API_VENDOR.getVendorDocument}`); 
          setState((draft) => {
            draft.DocumentList = documentList.value;
            draft.VendorLoading = false;
          });      
          return documentList.value;
        } catch (error: any) {
          console.log(error);
        }      
        setState((draft) => {
          draft.VendorLoading = false;
        });
      }
      const postVendorDocument =async (vendor_id:number,payload : IVendorDocument) => {
        setState(draft => {
          draft.VendorLoading = true;
        })      
        clearSuccessAndFailure();      
        try {      
          debugger;
          const response = await API.postForm(`${API_VENDOR.getVendor}/${vendor_id}${API_VENDOR.postVendorDocument}`, payload);
          response.value = response && response.value && response.value+'?id='+Math.random()
          return response;
        } catch (error: any) {
          console.log(error);
          setState((draft) => {
            draft.VendorLoading = false;
          });
        }
      };


      const deleteDocument = async (vendor_id: number, document_ids: number[]) => {
        setState((draft) => {
          draft.VendorLoading = true;
        });
      
        clearSuccessAndFailure();
      
        try {
        let response = await API.del(`${API_VENDOR.getVendor}/${vendor_id}/documents${API_VENDOR.deleteDocuments}`, document_ids);
          setTimeout(() => getVendorDocument(vendor_id), 200);
          response && toastify({ message: response.message, type: (response.success ? "success" : "error") });

        } catch (error: any) {
          console.log(error);
          setState((draft) => {
            draft.VendorLoading = false;
          });
        }
      };


      const clearSuccessAndFailure = () => {
        setState((draft) => {
          draft.saveVendorFailed = false;
          draft.saveVendorSuccess = false;
        });
      };

    return {
        ... state,
        getVendorDetails,
        deleteVendor,
        saveVendor,
        getIdividualVendorDetails,
        getVendorDocument,
        postVendorDocument,
        deleteDocument,
    }

}

