import React from "react";
import { RegProvider } from "./Auth/auth.contxt";
import { LoadProvider } from "./Load/load.context";
import { CustomerAddProvider } from "./Customer/customer.context";
import { TruckStatusProvider } from "./Truck/truck.context";
import { TrailerStatusProvider } from "./Trailer/trailer.context";
import { DriverAddProvider } from "./Driver/driver.context";
import { ProfileProvider } from "./Profile/profileContext";
import { UserProvider } from "./User/user.context";

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <RegProvider>
    <LoadProvider>
      <CustomerAddProvider>
        <TruckStatusProvider>
          <TrailerStatusProvider>
            <DriverAddProvider>
              <ProfileProvider>
                <UserProvider>{children}</UserProvider>
              </ProfileProvider>
            </DriverAddProvider>
          </TrailerStatusProvider>
        </TruckStatusProvider>
      </CustomerAddProvider>
    </LoadProvider>
  </RegProvider>
);
