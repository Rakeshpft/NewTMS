import { useContext } from "react";
import { DriverAddContext } from "./driver.context";
import { API } from "../../../services/api-helper/api.services";
import { API_DRIVER } from "../../../services/api-helper/api.constant";
// import { IDriverObject } from "./driver.types";
import { IAPIResponse } from "../../../services/tms-objects/response.types";

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

      return driverData;
      
  

      // setState((draft) => {
      //   draft.driverAddList = driverData;
      //   draft.driverLoading = false;
      // });

    } catch (error: any) {
      console.log(error);
      setState((draft) => {
        draft.driverLoading = false;
      });
    }
  };

  return {
    ...state,
    getDriverList,
  }
};
