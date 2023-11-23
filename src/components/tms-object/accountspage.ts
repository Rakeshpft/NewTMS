export interface billingEntryPage {
  partner: string;
  driver: string;
  date: string;
  amount: number;
  category: string;
  notes: string;
  settlement: string;
}

export const initialBillingState: billingEntryPage = {
  partner: "",
  driver: "",
  date: "",
  amount: 0,
  category: "",
  notes: "",
  settlement: "",
};

export interface additionsPage {
  type: string;
  vendor: string;
  driver: string;
  date: string;
  amount: string;
  category: string;
  notes: string;
  settlement: string;
}

export const initialAdditionsPageState: additionsPage = {
  type: "",
  vendor: "",
  driver: "",
  date: "",
  amount: "",
  category: "",
  notes: "",
  settlement: "",
};

export interface schedulePage {
  driver: string;
  vendor: string;
  type: string;
  amount: string;
  category: string;
  deductBy: string;
  schedule: string;
  startOn: string;
  repeat: string;
  status: string;
  lastDay: string;
  customDescription: string;
  notes: string;
  numberOfTimes: string;
  untilDate: string;
}

export const initialSchedulePageState: schedulePage = {
  driver: "",
  vendor: "",
  type: "",
  amount: "",
  category: "",
  deductBy: "",
  schedule: "",
  startOn: "",
  repeat: "Always",
  status: "",
  lastDay: "",
  customDescription: "",
  notes: "",
  numberOfTimes: "",
  untilDate: "",
};

export interface Chartofaccount {
  accountType: string;
  parentAccount: string;
  notes: string;
  name: string;
  subAccount: boolean;
}

export const initialChartofaccountState: Chartofaccount = {
  accountType: "",
  parentAccount: "",
  notes: "",
  name: "",
  subAccount: false,
};

export interface factoringReport {
  partner: string;
  factoringreportstatus: string;
  notes: string;
  date: string;
}

export const initialFactoringReportState: factoringReport = {
  partner: "",
  factoringreportstatus: "",
  notes: "",
  date: "",
};

export interface payments {
  payee: string;
  payto: string;
  description: string;
  date: string;
  type: string;
  amount: string;
}

export const initialPaymentState: payments = {
  payee: "",
  payto: "",
  date: "",
  description: "",
  type: "",
  amount: "",
};

export interface expenses {
  date: string;
  payto: string;
  amount: string;
  category: string;
  notes: string;
}

export const initialExpensesState: expenses = {
  payto: "",
  date: "",
  notes: "",
  category: "",
  amount: "",
};

export interface ExpensesSchedulePage {
  driver: string;
  scheduleName: string;
  payTo: string;
  amount: string;
  category: string;
  trailer: string;
  schedule: string;
  startOn: string;
  repeat: string;
  truck: string;
  notes: string;
}

export const initialExpensesSchedulePageState: ExpensesSchedulePage = {
  driver: "",
  scheduleName: "",
  payTo: "",
  category: "",
  amount: "",
  notes: "",
  trailer: "",
  truck: "",
  startOn: "",
  repeat: "",
  schedule: "",
};
