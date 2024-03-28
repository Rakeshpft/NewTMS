import  { useContext } from 'react'
import { VendorContext } from '../context/vendor.context';
import { IAPIResponse } from '../tms-objects/response.types';
import { API } from '../api-helper/api.services';
import { API_VENDOR } from '../api-helper/api.constant';

const useVendorContext = () => {
    const { state, setState } = useContext(VendorContext);
  if (setState === undefined) {
    throw new Error("Must have setState defined");
  }

   const getVendorList = async () => {
    setState((draft) => {
      draft.vendorLoading = true;
    });
    try {
      const vendorList: IAPIResponse = await API.get(API_VENDOR.getVendor);
      setState((draft) => {
        draft.vendorList = vendorList.value;
        draft.vendorLoading = false;
      });
    } catch (error: any) {
      console.log(error);
    }

 
    
 
}
return {
    ...state,
    getVendorList
  }
}

export default useVendorContext