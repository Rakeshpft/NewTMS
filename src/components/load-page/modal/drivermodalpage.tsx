import React from "react";
import { Modal, ModalHeader, ModalBody, Container } from "reactstrap";
import CreateNewDriverForm from "../../driver-page/createNewDriverForm";



interface DriverModalPageProps {
  isDriverOpen: boolean;
  toggle: () => void;
}

const DriverModalPage = ({ isDriverOpen, toggle }: DriverModalPageProps  ) => {

 
  

  return (
    <>
      <Modal isOpen={isDriverOpen} toggle={toggle} size="xl" backdrop="static">
        <ModalHeader toggle={toggle} className="py-2">
          <h6 className="mb-0 fw-bold">New Driver</h6>
        </ModalHeader>
        <ModalBody>
          <Container>
             <CreateNewDriverForm
             
            
            /> 
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};

export default DriverModalPage;
