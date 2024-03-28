import React from "react";

import { Container, Modal, ModalBody, ModalHeader } from "reactstrap";
// import CreateNewCustomerForm from "../../partenrs/customer/createNewCustomerForm";
// import { ICustomerForm } from "../../partenrs/customer/customerForm.types";
// import { ICustomerObject, initialStateCustomer } from "../../context/Customer/customer.types";
// import { IDriverObject, initialStateDriver } from "../../context/Driver/driver.types";
// import { customer, initialCustomerState } from "../../tms-object/partners";

// type FormInput =
//   | { type: "SET_companyName"; payload: string }
//   | { type: "SET_addressLine1"; payload: string }
//   | { type: "SET_addressLine2"; payload: string }
//   | { type: "SET_city"; payload: string }
//   | { type: "SET_state"; payload: string }
//   | { type: "SET_zip"; payload: string }
//   | { type: "SET_phone"; payload: string }
//   | { type: "SET_email"; payload: string }
//   | { type: "SET_mc"; payload: string }
//   | { type: "SET_fid"; payload: string }
//   | { type: "SET_notes"; payload: string }
//   | { type: "SET_stauts"; payload: string }
//   | { type: "SET_quickPayFee"; payload: string }
//   | { type: "SET_factoring"; payload: string }
//   | { type: "SET_credit"; payload: string }
//   | { type: "SET_payTerms"; payload: string }
//   | { type: "SET_avgDaysToPay"; payload: string }
//   | { type: "SET_radiovalue"; payload: string }
//   | { type: "SET_broker"; payload: boolean }
//   | { type: "SET_shipperOrReceiver"; payload: boolean };

// const formReducer = (state: customer, action: FormInput): customer => {
//   switch (action.type) {
//     case "SET_companyName":
//       return { ...state, companyName: action.payload };
//     case "SET_addressLine1":
//       return { ...state, addressLine1: action.payload };
//     case "SET_addressLine2":
//       return { ...state, addressLine2: action.payload };
//     case "SET_city":
//       return { ...state, city: action.payload };
//     case "SET_state":
//       return { ...state, state: action.payload };
//     case "SET_zip":
//       return { ...state, zip: action.payload };
//     case "SET_phone":
//       return { ...state, phone: action.payload };
//     case "SET_email":
//       return { ...state, email: action.payload };
//     case "SET_mc":
//       return { ...state, mc: action.payload };
//     case "SET_fid":
//       return { ...state, fid: action.payload };
//     case "SET_notes":
//       return { ...state, notes: action.payload };
//     case "SET_stauts":
//       return { ...state, stauts: action.payload };
//     case "SET_quickPayFee":
//       return { ...state, quickPayFee: action.payload };
//     case "SET_factoring":
//       return { ...state, factoring: action.payload };
//     case "SET_credit":
//       return { ...state, credit: action.payload };
//     case "SET_payTerms":
//       return { ...state, payTerms: action.payload };
//     case "SET_avgDaysToPay":
//       return { ...state, avgDaysToPay: action.payload };
//     case "SET_radiovalue":
//       return { ...state, radiovalue: action.payload };
//     case "SET_shipperOrReceiver":
//       return { ...state, shipperOrReceiver: !state.shipperOrReceiver };
//     case "SET_broker":
//       return { ...state, broker: !state.broker };
//     default:
//       return state;
//   }
// };

interface BrokerModalPageProps {
  isCustomerOpen: boolean;
  toggle: () => void;
}

const BrokerModalPage = (
  { isCustomerOpen, toggle }: BrokerModalPageProps,
  
) => {
  


// const [addNewCustomer, setAddNewCustomer] =
//     useState<ICustomerObject>(initialStateCustomer);

    // const handleCutomerInput =
    // (prop: keyof ICustomerObject) =>
    // (event: React.ChangeEvent<HTMLInputElement>) => {
    //   setAddNewCustomer({ ...addNewCustomer, [prop]: event.target.value });
    // };
  // const [formState, dispatch] = useReducer(formReducer, initialCustomerState);

  // const handleInput =
  //   (type: FormInput["type"]) =>
  //   (
  //     event: React.ChangeEvent<
  //       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  //     >
  //   ) => {
  //     dispatch({ type, payload: event.target.value } as FormInput);
  //   };

  // const handleCheckboxChange =
  //   (type: FormInput["type"]) =>
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     dispatch({
  //       type,
  //       payload: event.target.checked,
  //     } as FormInput);
  //   };
  // const handleCustomerSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log(formState);
  // };
  return (
    <>
      <Modal
        isOpen={isCustomerOpen}
        toggle={toggle}
        size="xl"
        backdrop="static"
      >
        <ModalHeader toggle={toggle} className="py-2">
          <h6 className="mb-0 fw-bold">New Customer</h6>
        </ModalHeader>
        <ModalBody>
          <Container>

            {/* <CreateNewCustomerForm
            toggle={toggle}
            fromCustomer={false}
            /> */}
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};

export default BrokerModalPage;
