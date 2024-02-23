import React from "react";
// import { BiCheck } from "react-icons/bi";
// import { RxCross2 } from "react-icons/rx";
import { Modal, ModalHeader, ModalBody, Container } from "reactstrap";
 import CreateNewDriverForm from "../../driver-page/createNewDriverForm";

// import { driverpage, initialDriverState } from "../../tms-object/driverpage";
// import { IDriverObject, initialStateDriver } from "../../context/Driver/driver.types";
// import { useDriverContext } from "../../context/Driver/driver.reducer";

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
//   | { type: "imageUrl"; payload: string | null };

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
//     case "imageUrl":
//       return { ...state, imageUrl: action.payload };
//     default:
//       return state;
//   }
// };

interface DriverModalPageProps {
  isDriverOpen: boolean;
  toggle: () => void;
}

const DriverModalPage = ({ isDriverOpen, toggle }: DriverModalPageProps) => {
  // const [state, dispatch] = useReducer(formReducer, initialDriverState);
  // const [selectedImage, setSelectedImage] = useState<string>("");

  //  const { saveDriver}  = useDriverContext()

  // const [addNewDriver , setAddNewDriver] = useState<IDriverObject>(initialStateDriver)

  // const handleAddDriverInput = (  prop : keyof IDriverObject) => (event: React.ChangeEvent<HTMLInputElement>) => (
  //   setAddNewDriver({ ...addNewDriver, [prop]: event.target.value })
  // )

  // const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   const file = e.target.files && e.target.files[0];
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = () => {
  //       if (file) {
  //         setSelectedImage(reader.result as string);
  //       }
  //     };
  //     reader.readAsDataURL(file);
  //     dispatch({ type: "imageUrl", payload: file.name as unknown as string });
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

  // const handleDriverSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   saveDriver(addNewDriver)
  //   console.log(addNewDriver);
  // };

  return (
    <>
      <Modal isOpen={isDriverOpen} toggle={toggle} size="xl" backdrop="static">
        <ModalHeader toggle={toggle} className="py-2">
          <h6 className="mb-0 fw-bold">New Driver</h6>
        </ModalHeader>
        <ModalBody>
          <Container>
             <CreateNewDriverForm
             isDriverFormOpen= {false}
             toggle={toggle}
            /> 
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};

export default DriverModalPage;
