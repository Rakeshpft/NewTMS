import { useContext } from "react";
import { DriverAddContext } from "../context/driver.context";
import { API } from "../api-helper/api.services";
import { API_DRIVER } from "../api-helper/api.constant";
import { IAPIResponse } from "../tms-objects/response.types";
import { IDriverCdl, IDriverDoc, IDriverDrugTest, IDriverEmpVerify, IDriverMedical, IDriverMvr, IDriverObject, IDriverOther, IDriverPayRatesOject, IDriverSSn, IDriverSchedulePayee } from "../tms-objects/driver.types";

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

const postDriverImage  = async ( file : File , driver_id : number ) => {
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

const getDriverDocAppList = async ( driver_id : number) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const driverDocAppData : IAPIResponse = await API.get( `${API_DRIVER.getDriver}/${driver_id}${API_DRIVER.getDiverDocApp}` );
    setState((draft) => {
      draft.driverDocAppList = driverDocAppData.value;
      draft.driverLoading = false;
    });
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}

const postApplication = async (driver_id : number , payload : IDriverDoc  ) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const response  = await API.postForm( `${API_DRIVER.getDriver}/${driver_id}${API_DRIVER.getDiverDocApp}` , payload );
    response.value = response && response.value && response.value+'?id='+Math.random()

    return response
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}

const getDriverCdlList = async (driver_id : number) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const driverCdlData : IAPIResponse = await API.get( `${API_DRIVER.getDriver}/${driver_id}${API_DRIVER.getDriverCdl}` );
    setState((draft) => {
      draft.driverCdlLists = driverCdlData.value;
      draft.driverLoading = false;
    });
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}

const postDriverCdl = async (  driver_id : number , payload : IDriverCdl ) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const SaveDriverCdl : IAPIResponse = await API.postForm( `${API_DRIVER.getDriver}/${driver_id}${API_DRIVER.getDriverCdl}` , payload );
    return SaveDriverCdl ;
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}

const getDriverMedicalList = async (driver_id : number) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const driverMedicalData : IAPIResponse = await API.get(`${API_DRIVER.getDriver}/${driver_id}${API_DRIVER.getDriverMedical}` );
    setState((draft) => {
      draft.driverMedicalLists = driverMedicalData.value;
      draft.driverLoading = false;
    });
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}

const postDriverMedical = async (  driver_id : number , payload : IDriverMedical ) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const SaveDriverMedical : IAPIResponse = await API.postForm( `${API_DRIVER.getDriver}/${driver_id}${API_DRIVER.getDriverMedical}` , payload );
    return SaveDriverMedical ;
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}

const getDriverDrugList = async ( driver_id : number) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const driverDrugData : IAPIResponse = await API.get( `${API_DRIVER.getDriver}/${driver_id}${API_DRIVER.getDriverDrugList}` );
    setState((draft) => {
      draft.driverDrugLists = driverDrugData.value;
      draft.driverLoading = false;
    });
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}

const postDriverDrugTest = async (  driver_id : number , payload : IDriverDrugTest ) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const SaveDriverDrugTest : IAPIResponse = await API.postForm( `${API_DRIVER.getDriver}/${driver_id}${API_DRIVER.getDriverDrugList}` , payload );
    return SaveDriverDrugTest ;
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}

const getDriverMvr = async ( driver_id : number) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const driverMvrData : IAPIResponse = await API.get( `${API_DRIVER.getDriver}/${driver_id}${API_DRIVER.getDriverMvr}` );
    setState((draft) => {
      draft.driverMvrLists = driverMvrData.value;
      draft.driverLoading = false;
    });
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}
const postDriverMvr = async (  driver_id : number , payload : IDriverMvr ) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const SaveDriverMvr : IAPIResponse = await API.postForm( `${API_DRIVER.getDriver}/${driver_id}${API_DRIVER.getDriverMvr}` , payload );
    return SaveDriverMvr ;
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}

const getDriverSsn = async ( driver_id : number) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const driverSsnData : IAPIResponse = await API.get( `${API_DRIVER.getDriver}/${driver_id}${API_DRIVER.getDriverSsn}` );
    setState((draft) => {
      draft.driverSsnListsData = driverSsnData.value;
      draft.driverLoading = false;
    });
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
} 

const postDriverSsn = async (  driver_id : number , payload : IDriverSSn ) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const SaveDriverSsn : IAPIResponse = await API.postForm( `${API_DRIVER.getDriver}/${driver_id}${API_DRIVER.getDriverSsn}` , payload );
    return SaveDriverSsn ;
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}
const getDriverEmpVerify = async ( driver_id : number) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const driverEmpVerifyData : IAPIResponse = await API.get( `${API_DRIVER.getDriver}/${driver_id}${API_DRIVER.getDriverEmpVerify}` );
    setState((draft) => {
      draft.driverEmpVerifyList = driverEmpVerifyData.value;
      draft.driverLoading = false;
    });
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}

const postDriverEmpVerify = async (  driver_id : number , payload : IDriverEmpVerify ) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const SaveDriverEmpVerify : IAPIResponse = await API.postForm( `${API_DRIVER.getDriver}/${driver_id}${API_DRIVER.getDriverEmpVerify}` , payload );
    return SaveDriverEmpVerify ;
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}

const getDriverOther = async ( driver_id : number) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const driverOtherData : IAPIResponse = await API.get( `${API_DRIVER.getDriver}/${driver_id}${API_DRIVER.getDriverOther}` );
    setState((draft) => {
      draft.driverOtherListsData = driverOtherData.value;
      draft.driverLoading = false;
    });
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}

const postDriverOther = async (  driver_id : number , payload : IDriverOther ) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const SaveDriverOther : IAPIResponse = await API.postForm( `${API_DRIVER.getDriver}/${driver_id}${API_DRIVER.getDriverOther}` , payload );
    return SaveDriverOther ;
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}

const getDriverSchedule = async ( driver_id : number) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const driverScheduleData : IAPIResponse = await API.get( `${API_DRIVER.getDriver}/${driver_id}${API_DRIVER.getDriverSchedulePayee}` );
    setState((draft) => {
      draft.driverScheduleLists = driverScheduleData.value;
      draft.driverLoading = false;
    });
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}

const getIndividualSchedulePayee = async ( driver_id : number, schedule_id : number) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const driverIndividualdata : IAPIResponse = await API.get( `${API_DRIVER.getDriver}/${driver_id}${API_DRIVER.getDriverSchedulePayee}/${schedule_id}` );
    setState((draft) => {
      draft.selectedScheduleDriver = driverIndividualdata.value
      draft.driverLoading = false;
    });
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}

const postDriverSchedulePayee= async (  driver_id : number , payload : IDriverSchedulePayee ) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const SaveDriverSchedule : IAPIResponse = await API.post( `${API_DRIVER.getDriver}/${driver_id}${API_DRIVER.getDriverSchedulePayee}` , payload );
    return SaveDriverSchedule ;
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}

const driverDelete = async ( driver_id : number[]) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const driverDeleteData : IAPIResponse = await API.del( `${API_DRIVER.deleteDriver}` , driver_id );
    return driverDeleteData ;
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}

const deleteDriverAppliaction  = async ( driver_id : number , application_id : number[] ) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const driverDeleteData : IAPIResponse = await API.del( `${API_DRIVER.getDriver}/${driver_id}${API_DRIVER.deleteApplication}` , application_id );
    return driverDeleteData ;
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}

const deleteDriverCdl  = async ( driver_id : number , cdl_id : number[] ) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const driverDeleteData : IAPIResponse = await API.del( `${API_DRIVER.getDriver}/${driver_id}${API_DRIVER.deleteCdl}` , cdl_id );
    return driverDeleteData ;
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}

const deleteDriveMedical = async ( driver_id : number , medical_id : number[] ) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const driverDeleteData : IAPIResponse = await API.del( `${API_DRIVER.getDriver}/${driver_id}${API_DRIVER.deleteMedical}` , medical_id );
    return driverDeleteData ;
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}

const deleteDriverDrugTest = async ( driver_id : number , drug_test_id : number[] ) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const driverDeleteData : IAPIResponse = await API.del( `${API_DRIVER.getDriver}/${driver_id}${API_DRIVER.deleteDrugTest}` , drug_test_id );
    return driverDeleteData ;
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}
const deleteDriverMvr = async ( driver_id : number , mvr_id : number[] ) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const driverDeleteData : IAPIResponse = await API.del( `${API_DRIVER.getDriver}/${driver_id}${API_DRIVER.deleteMvr}` , mvr_id );
    return driverDeleteData ;
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}

const deleteDriverSsn = async ( driver_id : number , ssn_id : number[] ) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const driverDeleteData : IAPIResponse = await API.del( `${API_DRIVER.getDriver}/${driver_id}${API_DRIVER.deleteSsn}` , ssn_id );
    return driverDeleteData ;
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}

const deleteDriverEmpVerify = async ( driver_id : number , verification_id : number[] ) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const driverDeleteData : IAPIResponse = await API.del( `${API_DRIVER.getDriver}/${driver_id}${API_DRIVER.deleteEmpVerify}` , verification_id );
    return driverDeleteData ;
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}

const deleteDriverOther = async ( driver_id : number , other_id : number[] ) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const driverDeleteData : IAPIResponse = await API.del( `${API_DRIVER.getDriver}/${driver_id}${API_DRIVER.deleteOther}` , other_id );
    return driverDeleteData ;
  } catch (error: any) {
    console.log(error);
    setState((draft) => {
      draft.driverLoading = false;
    });
  }
}

const deleteDriverSchedule = async ( driver_id : number , schedule_id : number[] ) => {
  setState((draft) => {
    draft.driverLoading = true;
  });
  try {
    const driverDeleteData : IAPIResponse = await API.del( `${API_DRIVER.getDriver}/${driver_id}${API_DRIVER.deleteSchedule}` , schedule_id );
    return driverDeleteData ;
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
    postDriverImage,
    getDriverDocAppList,
    postApplication,
    getDriverCdlList,
    postDriverCdl,
    getDriverMedicalList,
    postDriverMedical,
    getDriverDrugList,
    postDriverDrugTest,
    getDriverMvr,
    postDriverMvr,
    getDriverSsn,
    postDriverSsn,
    getDriverEmpVerify,
    postDriverEmpVerify,
    getDriverOther,
    postDriverOther,
    getDriverSchedule,
    getIndividualSchedulePayee,
    postDriverSchedulePayee,
    driverDelete,
    deleteDriverAppliaction,
    deleteDriverCdl,
    deleteDriveMedical,
    deleteDriverDrugTest,
    deleteDriverMvr,
    deleteDriverSsn,
    deleteDriverEmpVerify,
    deleteDriverOther,
    deleteDriverSchedule
  }
};
