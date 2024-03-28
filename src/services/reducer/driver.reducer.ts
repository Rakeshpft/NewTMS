import { useContext } from "react";
import { DriverAddContext } from "../context/driver.context";
import { API } from "../api-helper/api.services";
import { API_DRIVER } from "../api-helper/api.constant";
import { IAPIResponse } from "../tms-objects/response.types";
import { IDriverObject, IDriverPayRatesOject } from "../tms-objects/driver.types";

export const useDriverContext = () => {
  const { state, setState } = useContext(DriverAddContext);

  if (setState === undefined) {
    throw new Error("Must have setState defined");
  }

  const getDriverList = async () => {
    setState((draft) => {
      draft.driverLoading = true;
    });
    try {
      const driverData : IAPIResponse = await API.get(API_DRIVER.getDriver);
       
      const driverListData = driverData.value.map((driver : IDriverObject )  => {
        driver.full_name = `${driver.first_name} ${driver.last_name}`;
        driver.str_active = driver.status_id ? "Active" : "Inactive";
        return driver ;
      })

      setState((draft) => {
        draft.driverAddList = driverListData ;
        draft.driverLoading = false;
      });

      console.log( "driver list" , driverListData )

    } catch (error: any) {
      console.log(error);
      setState((draft) => {
        draft.driverLoading = false;
      });
    }
  };

 const getIdividualDriver  =  async ( driverId : number) => {

    setState((draft) => {
      draft.driverLoading = true;
    });
  
    try {

      const driverIndividualdata : IAPIResponse = await API.get( `${API_DRIVER.getDriver}/${driverId}`)
    
      setState((draft) => {
       draft.selectedDriver = driverIndividualdata.value 
       draft.driverLoading = false;
      })
      
      
      } catch (error: any) {
        console.log(error);
        setState((draft) => {
          draft.driverLoading = false;
        });
      }

    }
 const getDriverType = async () => {

  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const driverTypeData : IAPIResponse = await API.get(API_DRIVER.getDriverType);
    setState((draft) => {
      draft.driverType = driverTypeData.value;
      draft.driverLoading = false;
    });
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
 } 
 
 const getDriverStatus = async () => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const driverStatusData : IAPIResponse = await API.get(API_DRIVER.getDriverStatus);
    setState((draft) => {
      draft.driverStatus = driverStatusData.value;
      draft.driverLoading = false;
    });
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
 }

 const postSaveDriverData = async ( driverData : IDriverObject ) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const SaveDriverData : IAPIResponse = await API.post( API_DRIVER.getDriver, driverData );
     return SaveDriverData ;
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}

const getDriverPayRateList = async (id : number) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const driverPayRateData : IAPIResponse = await API.get( `${API_DRIVER.getDriver}/${id}${API_DRIVER.getPayRates}`);
    setState((draft) => {
      draft.selectedPayRates = driverPayRateData.value;
      draft.driverLoading = false;
    });
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}

const postPayRates = async ( driverPayRates : IDriverPayRatesOject ,  driver_id : number  ) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const SaveDriverParRates : IAPIResponse = await API.post( `${API_DRIVER.getDriver}/${driver_id}${API_DRIVER.getPayRates}` , driverPayRates );
     return SaveDriverParRates ;
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}

const postDriverImage = async ( file : File , driver_id : number ) => {
  setState((draft) => {
    draft.driverLoading = true;
  });

  const formData = new FormData();
  file && formData.append('file', file);

  try {
    const SaveDriverImage : IAPIResponse = await API.postFormData( `${API_DRIVER.getDriver}/${driver_id}${API_DRIVER.postDriverImage}` , formData );
    SaveDriverImage.value = SaveDriverImage && SaveDriverImage.value && SaveDriverImage.value+'?id='+Math.random()
     
    return SaveDriverImage ;

  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}

  return {
    ...state,
    getDriverList,
    getIdividualDriver,
    getDriverType,
    getDriverStatus,
    postSaveDriverData,
    getDriverPayRateList,
    postPayRates,
    postDriverImage

  }
};
