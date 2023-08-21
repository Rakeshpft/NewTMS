export interface accountPage {
  partner: string;
  driver: string;
  date: string;
  amount: string;
  category: string;
  notes: string;
  settlement: string;
}

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
}

export interface Chartofaccount {
  accountType: string;
  parentAccount: string;
  notes: string;
  name: string;
  subAccount: string;
}

export interface factoringReport {
  partner: string;
  factoringreportstatus: string;
  notes: string;
  date: string;
}

export interface payments {
  payee: string;
  payto: string;
  description: string;
  date: string;
  type: string;
  amount: string;
}

export interface expenses {
  date: string;
  payto: string;
  amount: string;
  category: string;
  notes: string;
}

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
