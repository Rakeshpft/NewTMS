// import { startsWith } from 'lodash';
import lscache from "lscache";

// const env = window.location.href;

export let apiURL = "http://tms-api.eduxus.com/api";//"http://localhost:53207/api";// 
let environment = "Prod";
export const platformId = 1;
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
  postRegistration: "/registration",
  getCompanyVerify: "/login/verification",
  companyVerifyPassword: "/login/Verification",
  comapanyLogin: "/login",
  getForgotPassword: "/login/forgot-password",  
  postForgotPassword: "/login/forgot-password",
  leftMenuList:"/menu",
};

export const API_PROFILE = {
  // House Profile API endpoints here
  getProfile: "/user",
  postProfile: "/user",
  postProfilePassword: "/user/reset-password",
  postProfileImage:"/user/image"
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

  getCustomer: "/customer",
  getIndividualCustomer : "/Customer",
  postNewCustomerData: "/Customer",
  deleteCustomer: "/Customer",
  getCustomerstatus :"/Customer/status",
  getBillingType : "/billing/types",
  uploadDocuments : "/upload-document",
  getContacts : "/contacts",
  postContacts : "/contacts",
  deleteContacts :"/delete",
  getIndividualContacts :"/customer/contacts",
  getCustomerDocument : "/documents",
 postCustomerDocument : "/upload-document"
};
export const API_STATE = {
  getState : "/state",
  postState : "/state",
}

export const API_DRIVER = {
  // House Driver API endpoints here
  getDriver: "/driver",
  getDriverType : "/driver/types",
  getDriverStatus : "/driver/status",
  getPayRates : "/pay-rates",
  postDriverImage : "/image",
  getDiverDocApp : "/application",
  getDriverCdl : "/cdl",
  
  
};

export const API_TRUCK = {
  // House Truck API endpoints here
  getTruck: "/trucks",
};

export const API_TRAILER = {
  // House Trailer API endpoints here
  getTrailer: "/Trailers",
  getTrailerStatus: "/Trailers",
  getIndividualTrailer : "/Trailers",
  postNewTrailerData: "/Trailers",
  deleteTrailer: "/Trailers",
};
export const API_USER = {
  // House Staff API endpoints here
  getUser: "/Staff",
  getIndividualUser : "/Staff",
  postNewUserData: "/Staff",
  deleteUsers: "/Staff",
  userRoleList: "/Role",
}
export const API_USER_Role = {
  // House Staff API endpoints here
  getUserRole: "/Role",
  getIndividualUserRole : "/Role",
  postNewUserRoleData: "/Role",
  deleteUsersRole: "/Role",
}

export const API_ADMIN_PERMISSIONS = {
  // House API endpoints here
  getAdminRole : "/Permission"
}

export const API_VENDOR = {
  // House VENDOR API endpoints here
  getVendor: "/Vendor",
  getIndividualVendor : "/Vendor",
  postNewVendorData: "/Vendor",
  deleteVendor: "/Vendor",
  getVendorDocument : "/documents",
  postVendorDocument : "/upload-document"
}

export const API_LIST = {
  // House LIST API endpoints here
  getMenuList:"/menu",
  getBillingStatus:"/list/billing-status",
  getBillingType:"/list/billing-types",
  getCustomerStatus:"/list/customer-status",
  getDriverStatus:'/list/driver-status',
  getDriverType:"/list/driver-types",
  getLoadStatus:"/list/load-status",
  getStates:'/list/states',
  getCredits:'/list/credits',
  getOwnershipType:'/list/ownership-types',
  getDocumentStatus:'/list/document-status',
  getFactors:'/list/factors',
}

export const API_FUEL_CARD = {
  getFuelCard:'/fuelcard' 
}