export interface IDriverPayrollObject {
    driver_payroll_id: number;
    date: string;
    payable_to : string;
    driver_id: number;
    driver_name: string;
    settlement_total: number;
    balance_due: number;
    email: string;
    notes: string;
  

    is_active: boolean
}
export const initialDriverPayroll: IDriverPayrollObject = {
    driver_payroll_id: 0,
    date: '',
    payable_to : '',
    driver_id: 0,
    driver_name: '',
    settlement_total: 0,
    balance_due: 0,
    email: '', 
    notes: '',
    is_active: true 
}
