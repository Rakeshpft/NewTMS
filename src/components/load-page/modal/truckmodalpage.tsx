import React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Container
  
} from "reactstrap";
// import { initialTruckState, truckType } from "../../tms-object/equipmenrs";

import CreateNewTruckForm from "../../equipment-page/trucks-page/createNewTruckForm";

// type FormAction =
//   | { type: "SET_unit"; payload: string }
//   | { type: "SET_vin"; payload: string }
//   | { type: "SET_ELDprovider"; payload: string }
//   | { type: "SET_ELDid"; payload: string }
//   | { type: "SET_year"; payload: string }
//   | { type: "SET_make"; payload: string }
//   | { type: "SET_ownership"; payload: string }
//   | { type: "SET_modal"; payload: string }
//   | { type: "SET_purchaseDate"; payload: string }
//   | { type: "SET_purchasePrice"; payload: string }
//   | { type: "SET_driver"; payload: string }
//   | { type: "SET_plate"; payload: string }
//   | { type: "SET_plateState"; payload: string }
//   | { type: "SET_notes"; payload: string }
//   | { type: "SET_history"; payload: string };

// const formReducer = (state: truckType, action: FormAction): truckType => {
//   switch (action.type) {
//     case "SET_unit":
//       return { ...state, unit: action.payload };
//     case "SET_vin":
//       return { ...state, vin: action.payload };
//     case "SET_ELDprovider":
//       return { ...state, ELDprovider: action.payload };
//     case "SET_ELDid":
//       return { ...state, ELDid: action.payload };
//     case "SET_year":
//       return { ...state, year: action.payload };
//     case "SET_make":
//       return { ...state, make: action.payload };
//     case "SET_ownership":
//       return { ...state, ownership: action.payload };
//     case "SET_modal":
//       return { ...state, modal: action.payload };
//     case "SET_purchaseDate":
//       return { ...state, purchaseDate: action.payload };
//     case "SET_purchasePrice":
//       return { ...state, purchasePrice: action.payload };
//     case "SET_driver":
//       return { ...state, driver: action.payload };
//     case "SET_plate":
//       return { ...state, plate: action.payload };
//     case "SET_plateState":
//       return { ...state, plateState: action.payload };
//     case "SET_notes":
//       return { ...state, notes: action.payload };
//     case "SET_history":
//       return { ...state, history: action.payload };
//     default:
//       return state;
//   }
// };

interface TruckModalPageProps {
  isTruckOpen: boolean;
  toggle: () => void;
}

const TruckModalPage = ({ isTruckOpen, toggle }: TruckModalPageProps) => {

  // const [state, dispatch] = useReducer(formReducer, initialTruckState);

  // const handleInput =
  //   (type: FormAction["type"]) =>
  //   (
  //     event: React.ChangeEvent<
  //       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  //     >
  //   ) => {
  //     dispatch({ type, payload: event.target.value });
  //   };


 

  return (
    <>
      <Modal isOpen={isTruckOpen} toggle={toggle} size="xl" backdrop="static">
        <ModalHeader toggle={toggle} className="py-2">
          <h6 className="fw-bold mb-0"> New Truck</h6>
        </ModalHeader>
        <ModalBody>
          <Container>
            <CreateNewTruckForm
         isFromTruckPage = {false}
         toggle = {toggle}
         />
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};

export default TruckModalPage;
