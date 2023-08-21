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
import { DriverPage, NewDriver } from "./components/driver-page";
import { LoadPage } from "./components/load-page";
import { Customer, Vendors } from "./components/partenrs";
import VendorNewPage from "./components/partenrs/vendors/vendor-new-page";
import CustomerNewPage from "./components/partenrs/customer/customer-new-page";
import LaodNewPage from "./components/load-page/load-new-page";
import {
  CreateDriverPayrollPage,
  DriverPayRoll,
} from "./components/driverpayroll-page";
import {
  BillingPage,
  CreateBillingPage,
} from "./components/account-page/billing-page";
import { VendorBalance } from "./components/account-page/vendor-balance";
import {
  CreateFuelPage,
  FuelPage,
} from "./components/fuel-page/fuel-card-page";
import {
  CreateTruckPage,
  TrucksPage,
} from "./components/equipment-page/trucks-page";
import {
  CreateTrailerPage,
  TrailersPage,
} from "./components/equipment-page/trailers-page";
import FuelImport from "./components/fuel-page/fuel-import-page";
import {
  CreateFuelTransactionPage,
  FuelTransaction,
} from "./components/fuel-page/fuel-transaction-page";
import {
  AdditionsPage,
  CreateAdditionsPage,
} from "./components/account-page/additions-page";
import {
  CreateScheduledPage,
  ScheduledPage,
} from "./components/account-page/scheduled-payment";
import {
  ChartofAccounts,
  CreateChartofAccounts,
} from "./components/account-page/chartofAccounts";
import {
  ExpansesPage,
  CreateExpansesPage,
  CreateExpensesSchedulePage,
} from "./components/account-page/expenses-page";
import {
  FactoringReport,
  CreateFactoringReport,
} from "./components/account-page/factoring-reaport";
import {
  PaymentsPage,
  CreatePaymentsPage,
} from "./components/account-page/payments-page";

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
              <Route path={routes.forgotpassword} component={ForgetPassword} />
              <Route
                path={routes.registrationform}
                component={RagistrationPage}
              />
              <Route path={routes.driverpageAll} component={DriverPage} />
              <Route path={routes.createdriver} component={NewDriver} />
              <Route path={routes.loadpageAll} component={LoadPage} />
              <Route path={routes.createload} component={LaodNewPage} />
              <Route path={routes.vendorsAll} component={Vendors} />
              <Route path={routes.createvendor} component={VendorNewPage} />
              <Route path={routes.customersAll} component={Customer} />
              <Route path={routes.createcustomer} component={CustomerNewPage} />
              <Route path={routes.driverpayroll} component={DriverPayRoll} />
              <Route
                path={routes.createdriverpayroll}
                component={CreateDriverPayrollPage}
              />
              <Route path={routes.billingpage} component={BillingPage} />
              <Route
                path={routes.createbillingpage}
                component={CreateBillingPage}
              />
              <Route path={routes.vendorbalance} component={VendorBalance} />
              <Route path={routes.fuelpage} component={FuelPage} />
              <Route path={routes.createfuelpage} component={CreateFuelPage} />
              <Route path={routes.fuelimport} component={FuelImport} />
              <Route
                path={routes.fueltransaction}
                component={FuelTransaction}
              />
              <Route
                path={routes.createfueltransaction}
                component={CreateFuelTransactionPage}
              />
              <Route path={routes.trucks} component={TrucksPage} />
              <Route path={routes.createnewtruck} component={CreateTruckPage} />
              <Route path={routes.trailers} component={TrailersPage} />
              <Route
                path={routes.createnewtrailers}
                component={CreateTrailerPage}
              />
              <Route path={routes.additions} component={AdditionsPage} />
              <Route
                path={routes.createadditions}
                component={CreateAdditionsPage}
              />
              <Route path={routes.scheduledpage} component={ScheduledPage} />
              <Route
                path={routes.createscheduledpage}
                component={CreateScheduledPage}
              />
              <Route
                path={routes.chartofaccounts}
                component={ChartofAccounts}
              />
              <Route
                path={routes.createchartofaccounts}
                component={CreateChartofAccounts}
              />
              <Route path={routes.expansespage} component={ExpansesPage} />
              <Route
                path={routes.createexpansespage}
                component={CreateExpansesPage}
              />
              <Route
                path={routes.createExpensesSchedulePage}
                component={CreateExpensesSchedulePage}
              />
              <Route
                path={routes.factoringreport}
                component={FactoringReport}
              />
              <Route
                path={routes.createfactoringreport}
                component={CreateFactoringReport}
              />
              <Route path={routes.paymentspage} component={PaymentsPage} />
              <Route
                path={routes.createpaymentspage}
                component={CreatePaymentsPage}
              />
            </IdleTimerProvider>
          </Switch>
        </LoginContext.Provider>
      </Suspense>
    </>
  );
};

export default App;
