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
import { TrailersPage, TrucksPage } from "./components/equipment-page";
import VendorNewPage from "./components/partenrs/vendors/vendor-new-page";
import CustomerNewPage from "./components/partenrs/customer/customer-new-page";
import LaodNewPage from "./components/load-page/load-new-page";

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
              <Route path={routes.partnersvendorsAll} component={Vendors} />
              <Route path={routes.createvendor} component={VendorNewPage} />
              <Route path={routes.partnerscustomersAll} component={Customer} />
              <Route path={routes.createcustomer} component={CustomerNewPage} />
              <Route path={routes.trucks} component={TrucksPage} />
              <Route path={routes.trailers} component={TrailersPage} />
            </IdleTimerProvider>
          </Switch>
        </LoginContext.Provider>
      </Suspense>
    </>
  );
};

export default App;
