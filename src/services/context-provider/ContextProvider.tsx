import React from "react";
import { RegProvider } from "../context/auth.contxt";
import { LoadProvider } from "../context/load.context";
import { CustomerProvider } from "../context/customer.context";
import { TruckProvider } from "../context/truck.context";
import { DriverAddProvider } from "../context/driver.context";
import { ProfileProvider } from "../context/profileContext";
import { UserProvider } from "../context/user.context";
import { UserRoleProvider } from "../context/userRole.context";
import { UserAdminRoleProvider } from "../context/userAdminRole.context";
import { VendorProvider } from "../context/vendor.context";
import { StateProvider } from "../context/state.context";
import { ListProvider } from "../context/list.context";
import { FuelCardProvider } from "../context/fuel-card.context";
import { TrailerProvider } from "../context/trailer.context";
import { LoadingProvider } from "../context/loading.context";

export const ContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <RegProvider>
  <LoadingProvider>
    <ListProvider>
      <LoadProvider>
        <CustomerProvider>
          <StateProvider>
           
        <TruckProvider>
              <TrailerProvider>
                <DriverAddProvider>
                  <ProfileProvider>
                    <UserProvider>
                      <UserRoleProvider>
                        <UserAdminRoleProvider>
                      
                          <VendorProvider>
                            <FuelCardProvider>
                              {children}                            </FuelCardProvider>
                          </VendorProvider>
                        </UserAdminRoleProvider>
                      </UserRoleProvider>
                    </UserProvider>
                  </ProfileProvider>
                </DriverAddProvider>
              </TrailerProvider>
            
        </TruckProvider>
          </StateProvider>
        </CustomerProvider>
      </LoadProvider>
    </ListProvider>
    </LoadingProvider>
  </RegProvider>
);
