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
  deleteDocuments : "/delete",
  getContacts : "/contacts",
  postContacts : "/contacts",
  deleteContacts :"/delete",
  getIndividualContacts :"/contacts",
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
  getDriverMedical :"/medical-card",
  getDriverDrugList : "/drug-test",
  getDriverMvr : "/mvr",
  getDriverSsn:"/ssn-card",
  getDriverEmpVerify :"/employee-verification",
  getDriverOther : "/other-documents",
  getDriverSchedulePayee : "/schedule",
  deleteDriver: "/delete",
  deleteApplication: "/application/delete",
  deleteCdl: "/cdl/delete",
  deleteMedical: "/medical-card/delete",
  deleteDrugTest: "/drug-test/delete",
  deleteMvr: "/mvr/delete",
  deleteSsn: "/ssn-card/delete",
  deleteEmpVerify: "/employee-verification/delete",
  deleteOther: "/other-documents/delete",
  deleteSchedule: "/schedule/delete",
};

export const API_TRUCK = {
  // House Truck API endpoints here
  getTruck: "/truck",
  postTruck: "/truck",
  getIndividualTruck: "/truck",
  deleteTruck: "/truck/delete",
  getannualInspectionDocument: "/annual-inspection-document",
  postannualInspectionDocument: "/annual-inspection-document",
  getIndividualannualInspectionDocument: "/annual-inspection-document",
  deleteannualInspectionDocument: "/annual-inspection-document/delete",
  getregistrationDocument: "/registration-document",
  postregistrationDocument: "/registration-document",
  getIndividualregistrationDocument: "/registration-document",
  deleteregistrationDocument: "/registration-document/delete",
  getrepairmaintanceDocument: "/repair-maintenance-document",
  postrepairmaintanceDocument: "/repair-maintenance-document",
  getIndividualrepairmaintanceDocument: "/repair-maintenance-document",
  deleterepairmaintanceDocument: "/repair-maintenance-document/delete",
  postotherDocument: "/other-document",
  getotherDocument: "/other-document",
  getIndividualotherDocument: "/other-document",
  deleteotherDocument: "/other-document/delete",
};

export const API_TRAILER = {
  // House Trailer API endpoints here
  getTrailer: "/equipment/trailer",
  getTrailerStatus: "/equipment/trailer",
  getIndividualTrailer : "/equipment/trailer",
  postNewTrailerData: "/equipment/trailer",
  deleteTrailer: "/equipment/trailer/delete",

  getAnnualInspectionDocument: "/annual-inspection-document",
  postAnnualInspectionDocument: "/annual-inspection-document",
  deleteAnnualInspectionDocument: "/annual-inspection-document/delete",

  getRegistraionDocument: "/registration-document",
  postRegistraionDocument: "/registration-document",
  deleteRegistraionDocument: "/registration-document/delete",

  getOtherDocument: "/other-document",
  postOtherDocument: "/other-document",
  deleteOtherDocument: "/other-document/delete",

  getRepairMaintenanceDocument: "/repair-maintenance-document",
  postRepairMaintenanceDocument: "/repair-maintenance-document",
  deleteRepairMaintenanceDocument: "/repair-maintenance-document/delete",
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
  postVendorDocument : "/upload-document",
  deleteDocuments : "/delete",
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
  getTrailerType:'/list/trailer-types',
  getPaymentCategory:'/list/payment-categories',
  getProductCodes:'/list/product-codes',
  getScheduleFrequency:'/list/schedule-frequencies',
  getScheduleType:'/list/schedule-types',
  getScheduleRepeat:'/list/schedule-repeats',
  getELDProvider:'/list/eld-providers',
  getDrivers:'/list/drivers',
}

export const API_FUEL_CARD = {
  getFuelCard:'/fuelcard' 
}