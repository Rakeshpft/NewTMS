import { useContext } from "react";
import { ListUpdateContext } from "../context/list.context";
import { API_LIST } from "../api-helper/api.constant";
import { API } from "../api-helper/api.services";
import { IAPIResponse } from "../tms-objects/response.types";
import lscache from "lscache";

export const useListContext = () => {
  const { list, setList } = useContext(ListUpdateContext);
  if (setList === undefined) {
    throw new Error("Must have setState defined");
  }
  const getCreditList = async (isRefresh: boolean = false) => {
    setList((draft) => { draft.listLoading = true; });
    if (!lscache.get("creditList") || isRefresh) {
      try {
        const creditResponse: IAPIResponse = await API.get(API_LIST.getCredits);
        setList((draft) => { draft.creditList = creditResponse.value; draft.listLoading = false; });
        lscache.set("creditList", creditResponse.value);
        return creditResponse.value;
      }
      catch (error: any) { console.log(error); }
      setList((draft) => { draft.listLoading = false; });
    }
    else {
      setList((draft) => { draft.creditList = lscache.get("creditList"); draft.listLoading = false; });
      return lscache.get("creditList");
    }
  }
  const getStateList = async (isRefresh: boolean = false) => {
    setList((draft) => { draft.listLoading = true; });
    if (!lscache.get("stateList") || isRefresh) {
      try {
        const stateResponse: IAPIResponse = await API.get(API_LIST.getStates);
        setList((draft) => { draft.stateList = stateResponse.value; draft.listLoading = false; });
        lscache.set("stateList", stateResponse.value);
        return stateResponse.value;
      }
      catch (error: any) { console.log(error); }
      setList((draft) => { draft.listLoading = false; });
    }
    else {
      setList((draft) => { draft.stateList = lscache.get("stateList"); draft.listLoading = false; });
      return lscache.get("stateList");
    }
  }
  const getBillingStatusList = async (isRefresh: boolean = false) => {
    debugger;
    setList((draft) => { draft.listLoading = true; });
    if (!lscache.get("billingStatusList") || isRefresh) {
      try {
        const billingStatusResponse: IAPIResponse = await API.get(API_LIST.getBillingStatus);
        setList((draft) => { draft.billingStatusList = billingStatusResponse.value; draft.listLoading = false; });
        lscache.set("billingStatusList", billingStatusResponse.value);
        return billingStatusResponse.value;
      }
      catch (error: any) { console.log(error); }
      setList((draft) => { draft.listLoading = false; });
    }
    else {
      setList((draft) => { draft.billingStatusList = lscache.get("billingStatusList"); draft.listLoading = false; });
      return lscache.get("billingStatusList");
    }
  }
  const getBillingTypeList = async (isRefresh: boolean = false) => {
    setList((draft) => { draft.listLoading = true; });
    if (!lscache.get("billingTypeList") || isRefresh) {
      try {
        const billingTypeResponse: IAPIResponse = await API.get(API_LIST.getBillingType);
        setList((draft) => { draft.billingTypeList = billingTypeResponse.value; draft.listLoading = false; });
        lscache.set("billingTypeList", billingTypeResponse.value);
        return billingTypeResponse.value;
      }
      catch (error: any) { console.log(error); }
      setList((draft) => { draft.listLoading = false; });
    }
    else {
      setList((draft) => { draft.billingTypeList = lscache.get("billingTypeList"); draft.listLoading = false; });
      return lscache.get("billingTypeList");
    }
  }
  const getCustomerStatusList = async (isRefresh: boolean = false) => {
    setList((draft) => { draft.listLoading = true; });
    if (!lscache.get("customerStatusList") || isRefresh) {
      try {
        const customerStatusResponse: IAPIResponse = await API.get(API_LIST.getCustomerStatus);
        setList((draft) => { draft.customerStatusList = customerStatusResponse.value; draft.listLoading = false; });
        lscache.set("customerStatusList", customerStatusResponse.value);
        return customerStatusResponse.value;
      }
      catch (error: any) { console.log(error); }
      setList((draft) => { draft.listLoading = false; });
    }
    else {
      setList((draft) => { draft.customerStatusList = lscache.get("customerStatusList"); draft.listLoading = false; });
      return lscache.get("customerStatusList");
    }
  }
  const getDriverStatusList = async (isRefresh: boolean = false) => {
    setList((draft) => { draft.listLoading = true; });
    if (!lscache.get("driverStatusList") || isRefresh) {
      try {
        const driverStatusResponse: IAPIResponse = await API.get(API_LIST.getDriverStatus);
        setList((draft) => { draft.driverStatusList = driverStatusResponse.value; draft.listLoading = false; });
        lscache.set("driverStatusList", driverStatusResponse.value);
        return driverStatusResponse.value;
      }
      catch (error: any) { console.log(error); }
      setList((draft) => { draft.listLoading = false; });
    }
    else {
      setList((draft) => { draft.driverStatusList = lscache.get("driverStatusList"); draft.listLoading = false; });
      return lscache.get("driverStatusList");
    }
  }
  const getDriverTypeList = async (isRefresh: boolean = false) => {
    setList((draft) => { draft.listLoading = true; });
    if (!lscache.get("driverTypeList") || isRefresh) {
      try {
        const driverTypeResponse: IAPIResponse = await API.get(API_LIST.getDriverType);
        setList((draft) => { draft.driverTypeList = driverTypeResponse.value; draft.listLoading = false; });
        lscache.set("driverTypeList", driverTypeResponse.value);
        return driverTypeResponse.value;
      }
      catch (error: any) { console.log(error); }
      setList((draft) => { draft.listLoading = false; });
    }
    else {
      setList((draft) => { draft.driverTypeList = lscache.get("driverTypeList"); draft.listLoading = false; });
      return lscache.get("driverTypeList");
    }
  }
  const getLoadStatusList = async (isRefresh: boolean = false) => {
    debugger;
    setList((draft) => { draft.listLoading = true; });
    if (!lscache.get("loadStatusList") || isRefresh) {
      try {
        const loadStatusResponse: IAPIResponse = await API.get(API_LIST.getLoadStatus);
        setList((draft) => { draft.loadStatusList = loadStatusResponse.value; draft.listLoading = false; });
        lscache.set("loadStatusList", loadStatusResponse.value);
        return loadStatusResponse.value;
      }
      catch (error: any) { console.log(error); }
      setList((draft) => { draft.listLoading = false; });
    }
    else {
      setList((draft) => { draft.loadStatusList = lscache.get("loadStatusList"); draft.listLoading = false; });
      return lscache.get("loadStatusList");
    }
  }
  return {
    ...list,
    getCreditList,
    getStateList,
    getBillingStatusList,
    getBillingTypeList,
    getCustomerStatusList,
    getDriverTypeList,
    getDriverStatusList,
    getLoadStatusList
  }
}