// import { startsWith } from 'lodash';
import lscache from "lscache";

// const env = window.location.href;

export let apiURL = "http://tms-api.eduxus.com/api";
let environment = "Prod";

export const getAPIConfig = () => {
  const config = {
    headers: {
      Authorization: "Bearer " + lscache.get("auth")?.data.access_token,
    },
  };
  return config;
};

export const API_DEFAULT_OPTIONS = {
  apiURL,
  environment,
  headers: {
    "Content-Type": "application/json",
  },
};

export const API_REG = {
  // House Registration and Login Request API endpoints here
  postRegistration: "/Registration",
  getCompanyVerify: "/Verification",
  companyVerifyPassword: "/Verification",
  comapanyLogin: "/Login",
  getForgotPassword: "/ForgotPassword",
  postForgotPassword: "/ForgotPassword",
};

export const API_PROFILE = {
  // House Profile API endpoints here
  getProfile: "/User",
  postProfile: "/User",
  postProfilePassword: "/ResetPassword",
};

export const API_LOAD = {
  // House Create Load API endpoints here
  loadStatus: "/LoadStatus",
  billingStatusList: "/BillingStatus",
  dispatcherLoadList: "/LoadDispatchers",
  stateLoadList: "/State",
};

export const API_CUSTOMER = {
  // House CUSTOMER API endpoints here

  addCustomer: "/Partners",
};

export const API_DRIVER = {
  // House Driver API endpoints here
  addDriver: "/Driver",
};

export const API_TRUCK = {
  // House Truck API endpoints here
  addTruck: "/Trucks",
};

export const API_TRAILER = {
  // House Trailer API endpoints here
  addTrailer: "/Trailers",
};
