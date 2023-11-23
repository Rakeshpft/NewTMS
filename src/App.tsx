import React, { Suspense, useState } from "react";
import { routes } from "./components/routes/routes";
import {
  ForgetPassword,
  RagistrationPage,
  LoginPage,
} from "./components/login-page";
import { Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";
import { LoginContext, PrivateRoute } from "./components/private-routes";
import { IdleTimerProvider } from "react-idle-timer";
import { handleLogout, session_Time_Logout } from "./components/auth";
import { DashboardPage } from "./components/dashboard";
import { DriverPage, CreateNewDriverPage } from "./components/driver-page";
import { LoadPage, CreateNewLaodPage } from "./components/load-page";
import {
  Customer,
  Vendors,
  CreateNewCustomerPage,
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

const App = () => {
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    JSON.parse(Cookies.get("loggedIn") || "false")
  );

  const setLogin = (data: boolean) => {
    const status = data.toString();
    Cookies.set("loggedIn", status);
    setIsLoggedIn(data);
  };

  return (
    <>
      <Suspense fallback="Loading...">
        <LoginContext.Provider
          value={{
            isLoggedIn,
            setIsLoggedIn,
            loading,
            setLoading,
          }}
        >
          <Switch>
            <IdleTimerProvider
              timeout={session_Time_Logout}
              onIdle={handleLogout}
            >
              <PrivateRoute
                exact={true}
                path={routes.dashboard}
                component={DashboardPage}
              />
              <Route exact={true} path={routes.login}>
                <LoginPage loginStatus={setLogin} />
              </Route>
              <Route path={routes.forgotPassword} component={ForgetPassword} />
              <Route
                path={routes.registrationForm}
                component={RagistrationPage}
              />
              <Route path={routes.driverpageAll} component={DriverPage} />
              <Route
                path={routes.createNewDriver}
                component={CreateNewDriverPage}
              />
              <Route path={routes.loadpageAll} component={LoadPage} />
              <Route
                path={routes.createNewLoad}
                component={CreateNewLaodPage}
              />
              <Route path={routes.vendorsAll} component={Vendors} />
              <Route
                path={routes.createNewVendor}
                component={CreateNewVendorPage}
              />
              <Route path={routes.customersAll} component={Customer} />
              <Route
                path={routes.createNewCustomer}
                component={CreateNewCustomerPage}
              />
              <Route path={routes.driverPayRoll} component={DriverPayRoll} />
              <Route
                path={routes.createNewDriverPayRoll}
                component={CreateNewDriverPayrollPage}
              />
              <Route path={routes.billingPage} component={BillingPage} />
              <Route
                path={routes.createNewBillingPage}
                component={CreateNewBillingPage}
              />
              <Route path={routes.vendorBalance} component={VendorBalance} />
              <Route path={routes.fuelPage} component={FuelPage} />
              <Route
                path={routes.createNewFuelPage}
                component={CreateNewFuelPage}
              />
              <Route path={routes.fuelImport} component={FuelImport} />
              <Route
                path={routes.fuelTransaction}
                component={FuelTransaction}
              />
              <Route
                path={routes.createNewFuelTransaction}
                component={CreateNewFuelTransactionPage}
              />
              <Route path={routes.trucks} component={TrucksPage} />
              <Route
                path={routes.createNewTruck}
                component={CreateNewTruckPage}
              />
              <Route path={routes.trailers} component={TrailersPage} />
              <Route
                path={routes.createNewTailers}
                component={CreateNewTrailerPage}
              />
              <Route path={routes.additions} component={AdditionsPage} />
              <Route
                path={routes.createNewAdditions}
                component={CreateNewAdditionsPage}
              />
              <Route path={routes.scheduledPage} component={ScheduledPage} />
              <Route
                path={routes.createNewScheduledPage}
                component={CreateNewScheduledPage}
              />
              <Route
                path={routes.chartOfAccounts}
                component={ChartofAccounts}
              />
              <Route
                path={routes.createNewChartOfAccounts}
                component={CreateNewChartofAccounts}
              />
              <Route path={routes.expansesPage} component={ExpansesPage} />
              <Route
                path={routes.createNewExpansesPage}
                component={CreateNewExpansesPage}
              />
              <Route
                path={routes.createNewExpensesSchedulePage}
                component={CreateNewExpensesSchedulePage}
              />
              <Route
                path={routes.factoringReport}
                component={FactoringReport}
              />
              <Route
                path={routes.createNewFactoringReport}
                component={CreateNewFactoringReport}
              />
              <Route path={routes.paymentsPage} component={PaymentsPage} />
              <Route
                path={routes.createNewPaymentsPage}
                component={CreateNewPaymentsPage}
              />
              <Route
                path={routes.driverPaymentsPage}
                component={DriverPaymentsPage}
              />
              <Route
                path={routes.expensesReportPage}
                component={ExpensesReportPage}
              />
              <Route
                path={routes.grossProfitLoadPage}
                component={GrossProfitLoadPage}
              />
              <Route
                path={routes.grossProfitReportPage}
                component={GrossProfitReportPage}
              />
              <Route
                path={routes.profitLossReportPage}
                component={ProfitLossReportPage}
              />
              <Route
                path={routes.rateMileReportPage}
                component={RateMileReportPage}
              />
              <Route
                path={routes.revenueDispatcherPage}
                component={RevenueDispatcherPage}
              />
              <Route
                path={routes.totalRevenuePage}
                component={TotalRevenuePage}
              />
              <Route
                path={routes.dispatchedBoard}
                component={DispatchedBoardPage}
              />
            </IdleTimerProvider>
          </Switch>
        </LoginContext.Provider>
      </Suspense>
    </>
  );
};

export default App;
