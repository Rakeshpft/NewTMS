export interface driverPaymentsReportPage {
  period: string;
}

export const initialDriverPaymentsReportPageState: driverPaymentsReportPage = {
  period: "",
};

export interface revenueByDispatcherReport {
  period: string;
  dispatcher: string;
  detailedReport: boolean;
  new: boolean;
  canelledStatus: boolean;
  cancelledBillingStatus: boolean;
  TOUN: boolean;
  dispatched: boolean;
  enRoute: boolean;
  pickedUp: boolean;
  delivered: boolean;
  closed: boolean;
  pending: boolean;
  bolReceived: boolean;
  invoiced: boolean;
  sentToFactoring: boolean;
  funded: boolean;
  paid: boolean;
}

export const initialRevenueByDispatcherReportState: revenueByDispatcherReport =
  {
    period: "",
    dispatcher: "",
    detailedReport: false,
    new: false,
    canelledStatus: false,
    cancelledBillingStatus: false,
    TOUN: false,
    dispatched: false,
    enRoute: false,
    pickedUp: false,
    delivered: false,
    closed: false,
    pending: false,
    bolReceived: false,
    invoiced: false,
    sentToFactoring: false,
    funded: false,
    paid: false,
  };

export interface grossProfitReportPage {
  period: string;
  driver: string;
  truck: string;
}

export const initialGrossProfitReportPageState: grossProfitReportPage = {
  period: "",
  driver: "",
  truck: "",
};

export interface grossProfitLoadPage {
  period: string;
  driver: string;
  truck: string;
  broker: string;
  radioValue1: string;
  radioValue2: string;
  new: boolean;
  canelledStatus: boolean;
  cancelledBillingStatus: boolean;
  TOUN: boolean;
  dispatched: boolean;
  enRoute: boolean;
  pickedUp: boolean;
  delivered: boolean;
  closed: boolean;
  pending: boolean;
  bolReceived: boolean;
  invoiced: boolean;
  sentToFactoring: boolean;
  funded: boolean;
  paid: boolean;
}

export const initialGrossProfitLoadPageState: grossProfitLoadPage = {
  period: "",
  driver: "",
  truck: "",
  broker: "",
  radioValue1: "",
  radioValue2: "",
  new: false,
  canelledStatus: false,
  cancelledBillingStatus: false,
  TOUN: false,
  dispatched: false,
  enRoute: false,
  pickedUp: false,
  delivered: false,
  closed: false,
  pending: false,
  bolReceived: false,
  invoiced: false,
  sentToFactoring: false,
  funded: false,
  paid: false,
};

export interface profitLossReportPage {
  period: string;
  driver: string;
  truck: string;
  radioValue1: string;
}

export const initialProfitLossReportPageState: profitLossReportPage = {
  period: "",
  driver: "",
  truck: "",
  radioValue1: "",
};

export interface rateMileReportPage {
  period: string;
  driver: string;
  truck: string;
  broker: string;
  dispatcher: string;
  radioValue1: string;
  radioValue2: string;
  changeToOverriddenRate: boolean;
  new: boolean;
  canelledStatus: boolean;
  cancelledBillingStatus: boolean;
  TOUN: boolean;
  dispatched: boolean;
  enRoute: boolean;
  pickedUp: boolean;
  delivered: boolean;
  closed: boolean;
  pending: boolean;
  bolReceived: boolean;
  invoiced: boolean;
  sentToFactoring: boolean;
  funded: boolean;
  paid: boolean;
}

export const initialRateMileReportPageState: rateMileReportPage = {
  period: "",
  driver: "",
  truck: "",
  broker: "",
  dispatcher: "",
  radioValue1: "",
  radioValue2: "",
  changeToOverriddenRate: false,
  new: false,
  canelledStatus: false,
  cancelledBillingStatus: false,
  TOUN: false,
  dispatched: false,
  enRoute: false,
  pickedUp: false,
  delivered: false,
  closed: false,
  pending: false,
  bolReceived: false,
  invoiced: false,
  sentToFactoring: false,
  funded: false,
  paid: false,
};

export interface expensesReportPage {
  period: string;
  category: string;
  detailedReport: boolean;
}

export const initialExpensesReportPageState: expensesReportPage = {
  period: "",
  category: "",
  detailedReport: false,
};

export interface totalRevenuePage {
  period: string;
  driver: string;
  truck: string;
  broker: string;
  paidToDriver: string;
  radioValue1: string;
  radioValue2: string;
  changeToOverriddenRate: boolean;
  new: boolean;
  canelledStatus: boolean;
  cancelledBillingStatus: boolean;
  TOUN: boolean;
  dispatched: boolean;
  enRoute: boolean;
  pickedUp: boolean;
  delivered: boolean;
  closed: boolean;
  pending: boolean;
  bolReceived: boolean;
  invoiced: boolean;
  sentToFactoring: boolean;
  funded: boolean;
  paid: boolean;
  pickupDate: boolean;
  completeDate: boolean;
  load: boolean;
  route: boolean;
  brokerName: boolean;
  po: boolean;
  shipper: boolean;
  receiver: boolean;
  rateAmount: boolean;
  truckReport: boolean;
  driverName: boolean;
  driverPayAmount: boolean;
  paidToDriverDate: boolean;
  settlement: boolean;
}

export const initialTotalRevenuePageState: totalRevenuePage = {
  period: "",
  driver: "",
  truck: "",
  broker: "",
  paidToDriver: "",
  radioValue1: "",
  radioValue2: "",
  changeToOverriddenRate: false,
  new: false,
  canelledStatus: false,
  cancelledBillingStatus: false,
  TOUN: false,
  dispatched: false,
  enRoute: false,
  pickedUp: false,
  delivered: false,
  closed: false,
  pending: false,
  bolReceived: false,
  invoiced: false,
  sentToFactoring: false,
  funded: false,
  paid: false,
  pickupDate: false,
  completeDate: false,
  load: false,
  route: false,
  brokerName: false,
  po: false,
  shipper: false,
  receiver: false,
  rateAmount: false,
  truckReport: false,
  driverName: false,
  driverPayAmount: false,
  paidToDriverDate: false,
  settlement: false,
};
