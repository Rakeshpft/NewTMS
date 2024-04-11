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
  const getMenuList = async (isRefresh: boolean = false) => {
    setList((draft) => { draft.listLoading = true; });
    if (!lscache.get("menuList") || isRefresh) {
      try {
        const menuListResponse: IAPIResponse = await API.get(API_LIST.getMenuList);
        setList((draft) => { draft.menuList = menuListResponse.value; draft.listLoading = false; });
        lscache.set("menuList", menuListResponse.value);
        return menuListResponse.value;
      }
      catch (error: any) { console.log(error); }
      setList((draft) => { draft.listLoading = false; });
    }
    else {
      setList((draft) => { draft.menuList = lscache.get("menuList"); draft.listLoading = false; });
      return lscache.get("menuList");
    }
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
  const getOwnershipTypeList = async (isRefresh: boolean = false) => {

    setList((draft) => { draft.listLoading = true; });
    if (!lscache.get("ownershipTypeList") || isRefresh) {
      try {
        const ownershipTypeResponse: IAPIResponse = await API.get(API_LIST.getOwnershipType);
        setList((draft) => { draft.ownershipTypeList = ownershipTypeResponse.value; draft.listLoading = false; });
        lscache.set("ownershipTypeList", ownershipTypeResponse.value);
        return ownershipTypeResponse.value;
      }
      catch (error: any) { console.log(error); }
      setList((draft) => { draft.listLoading = false; });
    }
    else {
      setList((draft) => { draft.ownershipTypeList = lscache.get("ownershipTypeList"); draft.listLoading = false; });
      return lscache.get("ownershipTypeList");
    }
  }
  const getDocumentStatusList = async (isRefresh: boolean = false) => {
    
    setList((draft) => { draft.listLoading = true; });
    if (!lscache.get("documentStatusList") || isRefresh) {
      try {
        const documentStatusResponse: IAPIResponse = await API.get(API_LIST.getDocumentStatus);
        setList((draft) => { draft.documentStatusList = documentStatusResponse.value; draft.listLoading = false; });
        lscache.set("documentStatusList", documentStatusResponse.value);
        return documentStatusResponse.value;
      }
      catch (error: any) { console.log(error); }
      setList((draft) => { draft.listLoading = false; });
    }
    else {
      setList((draft) => { draft.documentStatusList = lscache.get("documentStatusList"); draft.listLoading = false; });
      return lscache.get("documentStatusList");
    }
  }
  const getFactorList = async (isRefresh: boolean = false) => {
    
    setList((draft) => { draft.listLoading = true; });
    if (!lscache.get("factorList") || isRefresh) {
      try {
        const factorResponse: IAPIResponse = await API.get(API_LIST.getFactors);
        setList((draft) => { draft.factorList = factorResponse.value; draft.listLoading = false; });
        lscache.set("factorList", factorResponse.value);
        return factorResponse.value;
      }
      catch (error: any) { console.log(error); }
      setList((draft) => { draft.listLoading = false; });
    }
    else {
      setList((draft) => { draft.factorList = lscache.get("factorList"); draft.listLoading = false; });
      return lscache.get("factorList");
    }
  }
  const getTrailerTypeList = async (isRefresh: boolean = false) => {
  
    setList((draft) => { draft.listLoading = true; });
    if (!lscache.get("trailerTypeList") || isRefresh) {
      try {
        const trailerTypeResponse: IAPIResponse = await API.get(API_LIST.getTrailerType);
        setList((draft) => { draft.trailerTypeList = trailerTypeResponse.value; draft.listLoading = false; });
        lscache.set("trailerTypeList", trailerTypeResponse.value);
        return trailerTypeResponse.value;
      }
      catch (error: any) { console.log(error); }
      setList((draft) => { draft.listLoading = false; });
    }
    else {
      setList((draft) => { draft.trailerTypeList = lscache.get("trailerTypeList"); draft.listLoading = false; });
      return lscache.get("trailerTypeList");
    }
  }
  const getPaymentCategoryList = async (isRefresh: boolean = false) => {
  
    setList((draft) => { draft.listLoading = true; });
    if (!lscache.get("paymentCategoryList") || isRefresh) {
      try {
        const paymentCategoryResponse: IAPIResponse = await API.get(API_LIST.getPaymentCategory);
        setList((draft) => { draft.paymentCategoryList = paymentCategoryResponse.value; draft.listLoading = false; });
        lscache.set("paymentCategoryList", paymentCategoryResponse.value);
        return paymentCategoryResponse.value;
      }
      catch (error: any) { console.log(error); }
      setList((draft) => { draft.listLoading = false; });
    }
    else {
      setList((draft) => { draft.paymentCategoryList = lscache.get("paymentCategoryList"); draft.listLoading = false; });
      return lscache.get("paymentCategoryList");
    }
  }
  const getProductCodeList = async (isRefresh: boolean = false) => {
    
    setList((draft) => { draft.listLoading = true; });
    if (!lscache.get("productCodeList") || isRefresh) {
      try {
        const productCodeResponse: IAPIResponse = await API.get(API_LIST.getProductCodes);
        setList((draft) => { draft.productCodeList = productCodeResponse.value; draft.listLoading = false; });
        lscache.set("productCodeList", productCodeResponse.value);
        return productCodeResponse.value;
      }
      catch (error: any) { console.log(error); }
      setList((draft) => { draft.listLoading = false; });
    }
    else {
      setList((draft) => { draft.productCodeList = lscache.get("productCodeList"); draft.listLoading = false; });
      return lscache.get("productCodeList");
    }
  }
  const getScheduleFrequencyList = async (isRefresh: boolean = false) => {

    setList((draft) => { draft.listLoading = true; });
    if (!lscache.get("scheduleFrequencyList") || isRefresh) {
      try {
        const scheduleFrequencyResponse: IAPIResponse = await API.get(API_LIST.getScheduleFrequency);
        setList((draft) => { draft.scheduleFrequencyList = scheduleFrequencyResponse.value; draft.listLoading = false; });
        lscache.set("scheduleFrequencyList", scheduleFrequencyResponse.value);
        return scheduleFrequencyResponse.value;
      }
      catch (error: any) { console.log(error); }
      setList((draft) => { draft.listLoading = false; });
    }
    else {
      setList((draft) => { draft.scheduleFrequencyList = lscache.get("scheduleFrequencyList"); draft.listLoading = false; });
      return lscache.get("scheduleFrequencyList");
    }
  }
  const getScheduleTypeList = async (isRefresh: boolean = false) => {
    setList((draft) => { draft.listLoading = true; });
    if (!lscache.get("scheduleTypeList") || isRefresh) {
      try {
        const scheduleTypeResponse: IAPIResponse = await API.get(API_LIST.getScheduleType);
        setList((draft) => { draft.scheduleTypeList = scheduleTypeResponse.value; draft.listLoading = false; });
        lscache.set("scheduleTypeList", scheduleTypeResponse.value);
        return scheduleTypeResponse.value;
      }
      catch (error: any) { console.log(error); }
      setList((draft) => { draft.listLoading = false; });
    }
    else {
      setList((draft) => { draft.scheduleTypeList = lscache.get("scheduleTypeList"); draft.listLoading = false; });
      return lscache.get("scheduleTypeList");
    }
  }
  const getScheduleRepeatList = async (isRefresh: boolean = false) => {
    setList((draft) => { draft.listLoading = true; });
    if (!lscache.get("scheduleRepeatList") || isRefresh) {
      try {
        const scheduleRepeatResponse: IAPIResponse = await API.get(API_LIST.getScheduleRepeat);
        setList((draft) => { draft.scheduleRepeatList = scheduleRepeatResponse.value; draft.listLoading = false; });
        lscache.set("scheduleRepeatList", scheduleRepeatResponse.value);
        return scheduleRepeatResponse.value;
      }
      catch (error: any) { console.log(error); }
      setList((draft) => { draft.listLoading = false; });
    }
    else {
      setList((draft) => { draft.scheduleRepeatList = lscache.get("scheduleRepeatList"); draft.listLoading = false; });
      return lscache.get("scheduleRepeatList");
    }
  }
  const getELDProviderList = async (isRefresh: boolean = false) => {
    setList((draft) => { draft.listLoading = true; });
    if (!lscache.get("eldProviderList") || isRefresh) {
      try {
        const eldProviderResponse: IAPIResponse = await API.get(API_LIST.getELDProvider);
        setList((draft) => { draft.eldProviderList = eldProviderResponse.value; draft.listLoading = false; });
        lscache.set("eldProviderList", eldProviderResponse.value);
        return eldProviderResponse.value;
      }
      catch (error: any) { console.log(error); }
      setList((draft) => { draft.listLoading = false; });
    }
    else {
      setList((draft) => { draft.eldProviderList = lscache.get("eldProviderList"); draft.listLoading = false; });
      return lscache.get("eldProviderList");
    }
  }
  const getDriverList = async (isRefresh: boolean = false) => {
    setList((draft) => { draft.listLoading = true; });
    if (!lscache.get("driverList") || isRefresh) {
      try {
        const driverResponse: IAPIResponse = await API.get(API_LIST.getDrivers);
        setList((draft) => { draft.driverList = driverResponse.value; draft.listLoading = false; });
        lscache.set("driverList", driverResponse.value);
        return driverResponse.value;
      }
      catch (error: any) { console.log(error); }
      setList((draft) => { draft.listLoading = false; });
    }
    else {
      setList((draft) => { draft.driverList = lscache.get("driverList"); draft.listLoading = false; });
      return lscache.get("driverList");
    }
  }
  return {
    ...list,
    getMenuList,
    getCreditList,
    getStateList,
    getBillingStatusList,
    getBillingTypeList,
    getCustomerStatusList,
    getDriverTypeList,
    getDriverStatusList,
    getLoadStatusList,
    getOwnershipTypeList,
    getDocumentStatusList,
    getFactorList,
    getTrailerTypeList,
    getPaymentCategoryList,
    getProductCodeList,
    getScheduleFrequencyList,
    getScheduleTypeList,
    getScheduleRepeatList,
    getELDProviderList,
    getDriverList
  }
}