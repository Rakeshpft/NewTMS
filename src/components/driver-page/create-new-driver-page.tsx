import React from "react";
// import { Nav, Navbar, NavbarBrand } from "reactstrap";
// import TabPage from "./tab-page";
// import { RxCross2 } from "react-icons/rx";
// import { BiCheck } from "react-icons/bi";
// import { Header } from "../header";
// import Profile from "../pofile";
import CreateNewDriverForm from "./createNewDriverForm";
import CommonLayOut from "../../layout";
// import CreateNewDriverForm from "./createNewDriverForm";
// import { driverpage, initialDriverState } from "../tms-object/driverpage";
// import { routes } from "../routes/routes";
// import {  useNavigate } from 'react-router-dom';
// import CreateNewDriverForm from "./createNewDriverForm";

// import { useHistory } from "react-router-dom";

// type FormAction =
//   | { type: "SET_firstName"; payload: string }
//   | { type: "SET_Stauts"; payload: string }
//   | { type: "SET_lastName"; payload: string }
//   | { type: "SET_dob"; payload: string }
//   | { type: "SET_appDate"; payload: string }
//   | { type: "SET_payTo"; payload: string }
//   | { type: "SET_phone"; payload: string }
//   | { type: "SET_email"; payload: string }
//   | { type: "SET_hireDate"; payload: string }
//   | { type: "SET_coDriver"; payload: string }
//   | { type: "SET_addressline1"; payload: string }
//   | { type: "SET_addressline2"; payload: string }
//   | { type: "SET_truck"; payload: string }
//   | { type: "SET_city"; payload: string }
//   | { type: "SET_state"; payload: string }
//   | { type: "SET_zip"; payload: string }
//   | { type: "SET_trailer"; payload: string }
//   | { type: "SET_ifta" }
//   | { type: "SET_createNewPartner" }
//   | { type: "SET_fuelCard"; payload: string }
//   | { type: "SET_permiles"; payload: string }
//   | { type: "SET_perExtraStop"; payload: string }
//   | { type: "SET_perEmptyMiles"; payload: string }
//   | { type: "SET_radiovalue1"; payload: string }
//   | { type: "SET_radiovalue2"; payload: string }
//   | { type: "SET_image"; payload: string | null };

// const formReducer = (state: driverpage, action: FormAction): driverpage => {
//   switch (action.type) {
//     case "SET_firstName":
//       return { ...state, firstName: action.payload };
//     case "SET_Stauts":
//       return { ...state, Stauts: action.payload };
//     case "SET_lastName":
//       return { ...state, lastName: action.payload };
//     case "SET_dob":
//       return { ...state, dob: action.payload };
//     case "SET_appDate":
//       return { ...state, appDate: action.payload };
//     case "SET_payTo":
//       return { ...state, payTo: action.payload };
//     case "SET_phone":
//       return { ...state, phone: action.payload };
//     case "SET_email":
//       return { ...state, email: action.payload };
//     case "SET_hireDate":
//       return { ...state, hireDate: action.payload };
//     case "SET_coDriver":
//       return { ...state, coDriver: action.payload };
//     case "SET_addressline1":
//       return { ...state, addressline1: action.payload };
//     case "SET_addressline2":
//       return { ...state, addressline2: action.payload };
//     case "SET_truck":
//       return { ...state, truck: action.payload };
//     case "SET_city":
//       return { ...state, city: action.payload };
//     case "SET_state":
//       return { ...state, state: action.payload };
//     case "SET_zip":
//       return { ...state, zip: action.payload };
//     case "SET_trailer":
//       return { ...state, trailer: action.payload };
//     case "SET_permiles":
//       return { ...state, permiles: action.payload };
//     case "SET_perExtraStop":
//       return { ...state, perExtraStop: action.payload };
//     case "SET_perEmptyMiles":
//       return { ...state, perEmptyMiles: action.payload };
//     case "SET_ifta":
//       return { ...state, ifta: !state.ifta };
//     case "SET_createNewPartner":
//       return { ...state, createNewPartner: !state.createNewPartner };
//     case "SET_fuelCard":
//       return { ...state, fuelCard: action.payload };
//     case "SET_radiovalue1":
//       return { ...state, radiovalue1: action.payload };
//     case "SET_radiovalue2":
//       return { ...state, radiovalue2: action.payload };
//     case "SET_image":
//       return { ...state, imageUrl: action.payload };
//     default:
//       return state;
//   }
// };

const CreateNewDriverPage = () => {
  // const history = useHistory();

  // const [state, dispatch] = useReducer(formReducer, initialDriverState);
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files && e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       if (file) {
  //         setSelectedImage(reader.result as string);
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //     dispatch({ type: "SET_image", payload: file.name as unknown as string });
  //   }
  // };
  // const handleInput =
  //   (type: FormAction["type"]) =>
  //   (
  //     event: React.ChangeEvent<
  //       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  //     >
  //   ) => {
  //     dispatch({ type, payload: event.target.value } as FormAction);
  //   };

  // const handleCheckboxChange =
  //   (type: FormAction["type"]) =>
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     dispatch({
  //       type,
  //       payload: event.target.checked,
  //     } as FormAction);
  //   };

  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log(state);
  // };

  // const handleCancleButton = () => {
  //   // {
  //   //   history.location.pathname === routes.dashboard
  //   //     ? history.push(routes.driverpageAll)
  //   //     : history.goBack();
  //   // }
  //   {
  //     navigate(-1);
  //   }
  // };

  return (
    <>
    <CommonLayOut>
      {/* <Navbar
        style={{
          borderBottom: "1px solid #1B56AE",
        }}
        className="py-0"
        color="light"
      >
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
          showHambuger={false}
        />
        <NavbarBrand className="fw-bold px-4">New Driver</NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-2">
          <Profile />
        </div>
      </Navbar> */}
      

      <CreateNewDriverForm 
      
      
      />
     
     </CommonLayOut>
    </>
  );
};

export default CreateNewDriverPage;
