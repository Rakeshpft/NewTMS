import { useContext } from "react";
import { DriverAddContext } from "./driver.context";
import { API } from "../../../services/API/api.services";
import { API_DRIVER } from "../../../services/API/api.constant";
import { IDriverObject } from "./driver.types";

export const useDriverContext = () => {
  const { state, setState } = useContext(DriverAddContext);

  if (setState === undefined) {
    throw new Error("Must have setState defined");
  }

  const saveDriver = async (drive: IDriverObject) => {
    setState((draft) => {
      draft.driverLoading = true;
    });
    try {
      const driverData : IDriverObject[] = await API.post(API_DRIVER.addDriver, drive);
       return driverData
    //   setState((draft) => {
    //     draft.driverAddList = driverData;
    //     draft.driverLoading = false;
    //   });
    } catch (error: any) {
      console.log(error);
    }
  };

  return {
    ...state,
    saveDriver,
  }
};
