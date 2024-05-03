export interface IFuelTransactionObject {
    driver_name: string
    truck_name: string
    card_number: string
    product_code: string
    state_name: string
    payment_status: number
    company_id: number
    fuel_transaction_id: number
    fuel_transaction_date: string
    driver_id: number
    truck_id: number
    fuel_card_id: number
    product_code_id: number
    unit: number
    amount: number
    city: string
    state_id: number
    zipcode: string
    location: string;
    notes: string
    included_in_ifta: boolean
}

export const fuelTransactionInitialState: IFuelTransactionObject = {
    driver_name: "",
    truck_name: "",
    card_number: "",
    product_code: "",
    state_name: "",
    payment_status: 0,
    company_id: 0,
    fuel_transaction_id: 0,
    fuel_transaction_date: "",
    driver_id: 0,
    truck_id: 0,
    fuel_card_id: 0,
    product_code_id: 0,
    unit: 0,
    amount: 0,
    city: "",
    state_id: 0,
    zipcode: "",
    location: "",
    notes: "",
    included_in_ifta: false
}