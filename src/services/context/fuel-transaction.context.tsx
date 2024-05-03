import { Draft } from "immer";
import React, { createContext } from "react";
import { useImmer } from "use-immer";
import { IFuelTransactionObject } from "../tms-objects/fuel-transaction.types";

export interface IFuelTransactionData {
    fuelTransactionList: IFuelTransactionObject[] | null;
    fuelTransactionDetail: IFuelTransactionObject | null;
    isLoading: boolean;
    is_error: boolean;
}

const fuelTransactionInitialData: IFuelTransactionData = {
    fuelTransactionList: null,
    fuelTransactionDetail: null,
    isLoading: false,
    is_error: false,
}

type FuelTransactionUpdateContextType = {
    state: IFuelTransactionData;
    setState: (
        f: (draft: Draft<IFuelTransactionData>) => void | IFuelTransactionData
    ) => void;
};
const FuelTransactionUpdateContext = createContext<FuelTransactionUpdateContextType>({
    state: fuelTransactionInitialData,
    setState: () => undefined,
});
const FuelTransactionProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useImmer<IFuelTransactionData>(fuelTransactionInitialData);

    return (
        <FuelTransactionUpdateContext.Provider value={{ state, setState }}>
            {children}
        </FuelTransactionUpdateContext.Provider>
    );
};

export { FuelTransactionUpdateContext, FuelTransactionProvider, fuelTransactionInitialData };
