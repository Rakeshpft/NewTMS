import React from "react";
import { RegProvider } from "../context/auth.contxt";
import { LoadProvider } from "../context/load.context";
import { CustomerProvider } from "../context/customer.context";
import { TruckStatusProvider } from "../context/truck.context";
import { TrailerStatusProvider } from "../context/trailer.context";
import { DriverAddProvider } from "../context/driver.context";
import { ProfileProvider } from "../context/profileContext";
import { UserProvider } from "../context/user.context";
import { UserRoleProvider } from "../context/userRole.context";
import { UserAdminRoleProvider } from "../context/userAdminRole.context";
import { VendorProvider } from "../context/vendor.context";
import { StateProvider } from "../context/state.context";

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <RegProvider>
    <LoadProvider>
      <CustomerProvider>
        <StateProvider>
        <TruckStatusProvider>
          <TrailerStatusProvider>
            <DriverAddProvider>
              <ProfileProvider>
                <UserProvider>
                  <UserRoleProvider>
                    <UserAdminRoleProvider>
                      <VendorProvider>{children}</VendorProvider>
                    </UserAdminRoleProvider>
                  </UserRoleProvider>
                </UserProvider>
              </ProfileProvider>
            </DriverAddProvider>
          </TrailerStatusProvider>
        </TruckStatusProvider>
        </StateProvider>
      </CustomerProvider>
    </LoadProvider>
  </RegProvider>
);
