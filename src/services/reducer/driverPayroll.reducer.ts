import { useContext } from "react";
import { DriverPayrollUpdateContext } from "../context/driverPayroll.context";
import { API_DRIVER_PAYROLL } from "../api-helper/api.constant";
import { IAPIResponse } from "../tms-objects/response.types";
import { API } from "../api-helper/api.services";
import {  ISettlementPayment, initialSettlementObject } from "../tms-objects/driverPayroll.types";

export const useDriverPayrollContext = () => {
  const { state, setState } = useContext(DriverPayrollUpdateContext);

  if (setState === undefined) {
    throw new Error("Must have setState defined");
  }
  const getSettlementList = async () => {
    setState((draft) => { draft.driverPayrollLoading = true; });
    try {
      const settlementResponse: IAPIResponse = await API.get(API_DRIVER_PAYROLL.getPendingDriverPayroll);
      setState((draft) => { draft.settlementList = settlementResponse.value; draft.driverPayrollLoading = false; });
      return settlementResponse.value;
    }
    catch (error: any) { console.log(error); }
    setState((draft) => { draft.driverPayrollLoading = false; draft.settlementList=[] });
  }
  const getSettlementDetail = async (driver_id: number, settlement_id: number) => {
    setState((draft) => { draft.driverPayrollLoading = true; });
    try {
      const settlementResponse: IAPIResponse = await API.get(`${API_DRIVER_PAYROLL.getPendingDriverPayroll}/${settlement_id}/${driver_id}`);
      setState((draft) => { draft.settlementDetail = settlementResponse.value; draft.driverPayrollLoading = false; });
      return settlementResponse.value;
    }
    catch (error: any) { console.log(error); }
    setState((draft) => { draft.driverPayrollLoading = false; draft.settlementDetail= initialSettlementObject });
  }
  const saveSettlement = async (settlement_id: number, payload: { driver_id:number, transaction_ids: number[] }) => {
    setState((draft) => { draft.driverPayrollLoading = true; });
    try {
      const response: IAPIResponse = await API.post(`${API_DRIVER_PAYROLL.postSettlementDriverPayroll}/${settlement_id}`, payload);
      setState((draft) => { draft.is_error = response.is_error ? true : false; draft.saveDriverPayrollSuccess = response.success ? true : false; });
      return response;
    } catch (error: any) {
      console.log(error);
      setState((draft) => { draft.is_error = draft.is_error ? true : false; draft.saveDriverPayrollFailed = true; });
    }
  }
  const savePayment = async (settlement_id: number, payment_detail:ISettlementPayment) => {
    setState((draft) => { draft.driverPayrollLoading = true; });
    try {
      const response: IAPIResponse = await API.post(`${API_DRIVER_PAYROLL.postPaymentDriverPayroll}/${settlement_id}/payment`, payment_detail);
      setState((draft) => { draft.is_error = response.is_error ? true : false; draft.saveDriverPayrollSuccess = response.success ? true : false; });
      return response;
    } catch (error: any) {
      console.log(error);
      setState((draft) => { draft.is_error = draft.is_error ? true : false; draft.saveDriverPayrollFailed = true; });
    }
  }
  const deleteDriverPayroll = async (settlement_ids :number[]) => {
    setState((draft) => {
      draft.driverPayrollLoading = true;
    });

    clearSuccessAndFailure();

    try {
     let response = await API.del( API_DRIVER_PAYROLL.getPendingDriverPayroll,settlement_ids); 
      

      setTimeout(() => getSettlementList(), 200);
      return response;
    } catch (error: any) {
      console.log( error);
      setState((draft) => {
        draft.driverPayrollLoading = false;
      });
    }
    
  };
  const clearSuccessAndFailure = () => {
    setState((draft) => {
      draft.saveDriverPayrollFailed = false;
      draft.saveDriverPayrollSuccess = false;
    });
  };

  return {
    ...state,
    getSettlementList,
    getSettlementDetail,
    savePayment,
    saveSettlement,
    deleteDriverPayroll,
  }


}

