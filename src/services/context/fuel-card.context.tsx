import { Draft } from "immer";
import React, { createContext } from "react";
import { useImmer } from "use-immer";
import { IFuelCardAssigneeObject, IFuelCardObject } from "../tms-objects/fuel-card.types";

export interface IFuelCardData {
  fuelCardList: IFuelCardObject[] | null;
  fuelCardDetail: IFuelCardObject | null;
  fuelCardCurrentAssigneeDetail: IFuelCardAssigneeObject | null;
  fuelCardAssigneeList: IFuelCardAssigneeObject[] | null;
  isLoading: boolean;
  is_error: boolean;
}

const fuelCardInitialData: IFuelCardData = {
  fuelCardList: null,
  fuelCardDetail: null,
  fuelCardCurrentAssigneeDetail: null,
  fuelCardAssigneeList: null,
  isLoading: false,
  is_error: false,
}

type FuelCardUpdateContextType = {
  state: IFuelCardData;
  setState: (
    f: (draft: Draft<IFuelCardData>) => void | IFuelCardData
  ) => void;
};
const FuelCardUpdateContext = createContext<FuelCardUpdateContextType>({
  state: fuelCardInitialData,
  setState: () => undefined,
});
const FuelCardProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, setState] = useImmer<IFuelCardData>(fuelCardInitialData);

  return (
    <FuelCardUpdateContext.Provider value={{ state, setState }}>
      {children}
    </FuelCardUpdateContext.Provider>
  );
};

export { FuelCardUpdateContext, FuelCardProvider, fuelCardInitialData };
