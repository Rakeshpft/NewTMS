import React from "react";
import { routes } from "./components/routes/routes";
import {
  ForgetPassword,
  LoginPage,
  RagistrationPage,
  // LoginPage,
  ResetPassword,
} from "./components/login-page";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import { PrivateRoute } from "./components/private-routes";
// import { IdleTimerProvider } from "react-idle-timer";
// import { handleLogout, session_Time_Logout } from "./components/auth";
// import { DashboardPage } from "./components/dashboard";
import { DriverPage } from "./components/driver-page";
import { LoadPage, CreateNewLaodPage } from "./components/load-page";
import {
  Customer,
  Vendors,
  // CreateNewCustomerPage,
  CreateNewVendorPage,
 
  
} from "./components/partenrs";
import {
  CreateNewDriverPayrollPage,
  DriverPayRoll,
} from "./components/driverpayroll-page";
import {
  TrucksPage,
  CreateNewTruckPage,
  TrailersPage,
  CreateNewTrailerPage,
} from "./components/equipment-page";
import {
  FuelPage,
  CreateNewFuelPage,
  FuelImport,
  FuelTransaction,
  CreateNewFuelTransactionPage,
} from "./components/fuel-page";
import {
  AdditionsPage,
  CreateNewAdditionsPage,
  BillingPage,
  CreateNewBillingPage,
  ChartofAccounts,
  CreateNewChartofAccounts,
  ExpansesPage,
  CreateNewExpansesPage,
  CreateNewExpensesSchedulePage,
  FactoringReport,
  CreateNewFactoringReport,
  PaymentsPage,
  CreateNewPaymentsPage,
  ScheduledPage,
  CreateNewScheduledPage,
  VendorBalance,
} from "./components/account-page";
import {
  DriverPaymentsPage,
  ExpensesReportPage,
  GrossProfitLoadPage,
  GrossProfitReportPage,
  ProfitLossReportPage,
  RateMileReportPage,
  RevenueDispatcherPage,
  TotalRevenuePage,
} from "./components/reports-page";
import { DispatchedBoardPage } from "./components/dispatched-board";
import UserPage from "./components/user-page/user-page";
import DocExchange from "./components/doc-exchange-page/docExchange";
import DataLibrary from "./components/data-library-page/dataLibrary";
import ReportPage from "./components/ift-report-page/reportPage";
import TaxRateByState from "./components/ift-report-page/taxRateByStatePage";
import SafetyPage from "./components/safety-page/safetyPage";
import SettingPage from "./components/setting-page/settingPage";
import { ContextProvider } from "./services/context-provider/ContextProvider";
import { DashboardPage } from "./components/dashboard";
import { PrivateRoute } from "./components/routes/PrivateRoute";
import { ProfileForm } from "./components/pofile";
import ForgotResetPassword from "./components/login-page/forgetResetPassword";
import UserRolePage from "./components/user-role/userRole-page";
import UserAdminRole from "./components/user-page/userAdminRole";
// import CreateNewCustomerPage from "./components/partenrs/customer/create-new-customer-page";

const App = () => {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<LoginPage />} path={routes.login} />
          <Route path={routes.forgotPassword} element={<ForgetPassword />} />
          <Route
            element={<ResetPassword />}
            path={`${routes.emailVerification}`}
          />
          <Route
            path={routes.registrationForm}
            element={<RagistrationPage />}
          />
          <Route path={routes.resetPassword} element={<ResetPassword />} />
          <Route element={<ForgotResetPassword/>} path={routes.forgotResetPassword}/>
          <Route
            path={routes.default}
            element={
              <PrivateRoute>
                <Routes>
                <Route element={<Navigate to={routes.dashboard} />} path={'*'} />
                  <Route element={<DashboardPage />} path={routes.dashboard} />
                  <Route path= {routes.profileForm} element={<ProfileForm/>}/>
                  <Route path={routes.driverpageAll} element={<DriverPage />} />
                  {/* <Route
                    path={routes.createNewDriver}
                    element={<CreateNewDriverPage />}
                  /> */}
                  <Route path={routes.loadpageAll} element={<LoadPage />} />
                  <Route
                    path={routes.createNewLoad}
                    element={<CreateNewLaodPage />}
                  />
                  <Route path={routes.vendorsAll} element={<Vendors />} />
                  <Route
                    path={routes.createNewVendor}
                    element={<CreateNewVendorPage />}
                  />
                  <Route path={routes.customersAll} element={<Customer />} />
                  {/* <Route
                    path={routes.createNewCustomer}
                    element={<CreateNewCustomerPage />}
                  /> */}
                  <Route
                    path={routes.driverPayRoll}
                    element={<DriverPayRoll />}
                  />
                  <Route
                    path={routes.createNewDriverPayRoll}
                    element={<CreateNewDriverPayrollPage />}
                  />
                  <Route path={routes.billingPage} element={<BillingPage />} />
                  <Route
                    path={routes.createNewBillingPage}
                    element={<CreateNewBillingPage />}
                  />
                  <Route
                    path={routes.vendorBalance}
                    element={<VendorBalance />}
                  />
                  <Route path={routes.fuelPage} element={<FuelPage />} />
                  <Route
                    path={routes.createNewFuelPage}
                    element={<CreateNewFuelPage />}
                  />
                  <Route path={routes.fuelImport} element={<FuelImport />} />
                  <Route
                    path={routes.fuelTransaction}
                    element={<FuelTransaction />}
                  />
                  <Route
                    path={routes.createNewFuelTransaction}
                    element={<CreateNewFuelTransactionPage />}
                  />
                  <Route path={routes.trucks} element={<TrucksPage />} />
                  <Route
                    path={routes.createNewTruck}
                    element={<CreateNewTruckPage />}
                  />
                  <Route path={routes.trailers} element={<TrailersPage />} />
                  <Route
                    path={routes.createNewTailers}
                    element={<CreateNewTrailerPage />}
                  />
                  <Route path={routes.additions} element={<AdditionsPage />} />
                  <Route
                    path={routes.createNewAdditions}
                    element={<CreateNewAdditionsPage />}
                  />
                  <Route
                    path={routes.scheduledPage}
                    element={<ScheduledPage />}
                  />
                  <Route
                    path={routes.createNewScheduledPage}
                    element={<CreateNewScheduledPage />}
                  />
                  <Route
                    path={routes.chartOfAccounts}
                    element={<ChartofAccounts />}
                  />
                  <Route
                    path={routes.createNewChartOfAccounts}
                    element={<CreateNewChartofAccounts />}
                  />
                  <Route
                    path={routes.expansesPage}
                    element={<ExpansesPage />}
                  />
                  <Route
                    path={routes.createNewExpansesPage}
                    element={<CreateNewExpansesPage />}
                  />
                  <Route
                    path={routes.createNewExpensesSchedulePage}
                    element={<CreateNewExpensesSchedulePage />}
                  />
                  <Route
                    path={routes.factoringReport}
                    element={<FactoringReport />}
                  />
                  <Route
                    path={routes.createNewFactoringReport}
                    element={<CreateNewFactoringReport />}
                  />
                  <Route
                    path={routes.paymentsPage}
                    element={<PaymentsPage />}
                  />
                  <Route
                    path={routes.createNewPaymentsPage}
                    element={<CreateNewPaymentsPage />}
                  />
                  <Route
                    path={routes.driverPaymentsPage}
                    element={<DriverPaymentsPage />}
                  />
                  <Route
                    path={routes.expensesReportPage}
                    element={<ExpensesReportPage />}
                  />
                  <Route
                    path={routes.grossProfitLoadPage}
                    element={<GrossProfitLoadPage />}
                  />
                  <Route
                    path={routes.grossProfitReportPage}
                    element={<GrossProfitReportPage />}
                  />
                  <Route
                    path={routes.profitLossReportPage}
                    element={<ProfitLossReportPage />}
                  />
                  <Route
                    path={routes.rateMileReportPage}
                    element={<RateMileReportPage />}
                  />
                  <Route
                    path={routes.revenueDispatcherPage}
                    element={<RevenueDispatcherPage />}
                  />
                  <Route
                    path={routes.totalRevenuePage}
                    element={<TotalRevenuePage />}
                  />
                  <Route
                    path={routes.dispatchedBoard}
                    element={<DispatchedBoardPage />}
                  />
                  <Route path={routes.UsersPage} element={<UserPage />} />
                  <Route path={routes.UsersRole} element={<UserRolePage />} />

                  <Route path={routes.docExchange} element={<DocExchange />} />

                  <Route path={routes.dataLibrary} element={<DataLibrary />} />
                  <Route path={routes.reportPage} element={<ReportPage />} />
                  <Route
                    path={routes.taxRateByStatePage}
                    element={<TaxRateByState />}
                  />
                  <Route path={routes.safetyPage} element={<SafetyPage />} />
                  <Route path={routes.settingPage} element={<SettingPage />} />
                  <Route path={routes.userAdminRole} element={<UserAdminRole />} />
                </Routes>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
};

export default App;
