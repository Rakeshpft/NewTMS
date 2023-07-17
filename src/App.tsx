import React, { Suspense, useState } from "react";
import { ForgetPassword } from "./components/login-page";
import { Route, Switch } from "react-router-dom";
import Cookies from "js-cookie";
import { LoginContext, PrivateRoute } from "./components/private-routes";
import { IdleTimerProvider } from "react-idle-timer";
import { handleLogout, session_Time_Logout } from "./components/auth";
import { DashboardPage } from "./components/dashboard";
import LoginPage from "./components/login-page/login-page";
import { DriverPage } from "./components/driver-page";
import { LoadPage } from "./components/load-page";
import Vendors from "./components/partners/vendors/vendors";

function App() {
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
                path="/dashboard"
                component={DashboardPage}
              />
              <Route exact={true} path="/">
                <LoginPage loginStatus={setLogin} />
              </Route>
              <Route path="/forgetpassword">
                <ForgetPassword />
              </Route>
              <Route path="/driverpage">
                <DriverPage />
              </Route>
              <Route path="/loadpage">
                <LoadPage />
              </Route>
              <Route path="/vendors">
                <Vendors/>
                </Route>
            </IdleTimerProvider>
          </Switch>
        </LoginContext.Provider>
      </Suspense>
    </>
  );
}

export default App;
