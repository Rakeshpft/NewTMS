// import React , { createContext } from "react";

// import { Draft } from "immer";
// import { IBillingLoadObject } from "./billing.types";
// import { useImmer } from "use-immer";

// export interface IBillingStatus {
//   billingStatus: boolean;
//   loadBillingStatus: IBillingLoadObject[] | null;
// }

// const billingInitialStatus: IBillingStatus = {
//   billingStatus: false,
//   loadBillingStatus: null,
// };

// type BillinsStatusType = {
//   state: IBillingStatus;
//   setState: (
//     f: (draft: Draft<IBillingStatus>) => void | IBillingStatus) => void;
// };

// const billingStatusContext = createContext<BillinsStatusType>({
//     state: billingInitialStatus,
//     setState: () => undefined,
// }) ;

// const BillingStatusProvider = ({ children }: { children: React.ReactNode }) => {
//     const [state, setState] = useImmer<IBillingStatus>(billingInitialStatus);
//     return(
//         <billingStatusContext.Provider value={{ state, setState }}>{children}</billingStatusContext.Provider>
//     );
// };
// export { billingStatusContext, BillingStatusProvider , billingInitialStatus };

