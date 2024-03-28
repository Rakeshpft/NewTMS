import React from "react";
import { Modal, ModalHeader, ModalBody, Container } from "reactstrap";
import CreateNewDriverForm from "../../driver-page/createNewDriverForm";
import { IDriverManagenetProps } from "../../../services/tms-objects/driver.types";



interface DriverModalPageProps {
  isDriverOpen: boolean;
  toggle: () => void;
}

const DriverModalPage = ({ isDriverOpen, toggle }: DriverModalPageProps ,prop : IDriverManagenetProps ) => {

  const {  newDriver ,
    handleInputChange ,
    handleCloseForm , 
    driverType ,
    driverStatus ,
    handleCheckboxChange,
    SaveDriverIndividual,
    vendorList,
    truckListStatus,
    trailerListStatus,
    driverPayRates,
    handleInputDriverPayRates,
    handleImageChange
   
  } = prop
  

  return (
    <>
      <Modal isOpen={isDriverOpen} toggle={toggle} size="xl" backdrop="static">
        <ModalHeader toggle={toggle} className="py-2">
          <h6 className="mb-0 fw-bold">New Driver</h6>
        </ModalHeader>
        <ModalBody>
          <Container>
             <CreateNewDriverForm
             
             newDriver = {newDriver}
             handleInputChange = {handleInputChange}
             handleCloseForm = {handleCloseForm}
             driverType = {driverType}
             driverStatus={driverStatus}
             handleCheckboxChange = {handleCheckboxChange}
             SaveDriverIndividual = {SaveDriverIndividual}
             vendorList = {vendorList}
             truckListStatus = {truckListStatus}
             trailerListStatus = {trailerListStatus}
             driverPayRates = {driverPayRates}
             handleInputDriverPayRates = {handleInputDriverPayRates}
             handleImageChange = {handleImageChange}
            /> 
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};

export default DriverModalPage;
