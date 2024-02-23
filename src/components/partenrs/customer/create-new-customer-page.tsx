import React, { useState } from "react";
import { Nav, Navbar, NavbarBrand } from "reactstrap";

import { Header } from "../../header";
import Profile from "../../pofile";
//  import { customer, initialCustomerState } from "../../tms-object/partners";
//  import { useNavigate } from "react-router-dom";
// import { routes } from "../../routes/routes";
// import { useCustomerContext } from "../../context/Customer/customer.reducer";
// import {
//   ICustomerObject,
//   initialStateCustomer,
// } from "../../context/Customer/customer.types";
import CreateNewCustomerForm from "./createNewCustomerForm";
// import { routes } from "../../routes/routes";
// import { RxCross2 } from "react-icons/rx";
// import { ICustomerObject } from "../../context/Customer/customer.types";

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


const CreateNewCustomerPage = ( {toggle} : any  ) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [formState, dispatch] = useReducer(formReducer, initialCustomerState);
  // const [addNewCustomer, setAddNewCustomer] =
  //   useState<ICustomerObject>(initialStateCustomer);

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

  // const handleSubmit =  ( e: React.FormEvent) => {
  //   e.preventDefault();
  //   saveCustomer(addNewCustomer)

  // };

  //  const handleCutomerInput =
  //    (prop: keyof ICustomerObject) =>
  //    (event: React.ChangeEvent<HTMLInputElement>) => {
  //      setAddNewCustomer({ ...addNewCustomer, [prop]: event.target.value });
  //    };

  // console.log(' customer',addNewCustomer)


  return (
    <>
      <Navbar className="formpagenavbar" color="light">
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
          showHambuger={false}
        />
        <NavbarBrand className="fw-bold px-4">New Customer</NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-3">
          <Profile />
        </div>
      </Navbar>
      <div className="m-2 load-itemmain">
        <CreateNewCustomerForm 
        toggle={toggle}
        fromCustomer= {true}
        />
      </div>
    </>
  );
};

export default CreateNewCustomerPage;
