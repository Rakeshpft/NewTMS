export interface ISettlementObject{
    settlement_id:number,
    settlement_number:string,
    driver_id:number,
    driver_name:string,
    vendor_id:number,
    vendor_name:string,
    total_amount:number,
    paid_amount:number,
    payment_status_id:number,
    all_transactions:ISettlementTransaction[],
    settled_transactions:ISettlementTransaction[],
    settled_payments:ISettlementPayment[],
    created_date:string,
}

export const initialSettlementObject:ISettlementObject = {
    settlement_id:0,
    settlement_number:"",
    driver_id:0,
    driver_name:"",
    vendor_id:0,
    vendor_name:"",
    total_amount:0,
    paid_amount:0,
    payment_status_id:0,
    all_transactions:[],
    settled_transactions:[],
    settled_payments:[],
    created_date:"",
}

export interface ISettlementTransaction{
    transaction_id: number,
    settlement_id:number,
    transaction_type_id: number,
    transaction_type_name: string,
    description: number,
    amount: number
}

export const initialSettlementTransaction : ISettlementTransaction={
    transaction_id: 0,
    settlement_id:0,
    transaction_type_id: 0,
    transaction_type_name: "",
    description: 0,
    amount: 0
}

export interface ISettlementPayment{
    settlement_id:number;
    payment_date: string;
    payment_method_id: number;
    payment_method_name: string;
    transaction_number: string;
    notes: string;
    amount:number;
}
export const initialSettlementPayment: ISettlementPayment={
    settlement_id:0,
    payment_date: "",
    payment_method_id: 0,
    payment_method_name: "",
    transaction_number: "",
    notes: "",
    amount:0
}

