import React, { useState } from "react";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { Button, Container, Modal, ModalBody, ModalHeader } from "reactstrap";
import NewCustomerDetailsModal from "./newCustomerDetails";

interface viewBrokerModalProps {
  isOpen: boolean;
  toggle: () => void;
  data:{ 
    Name: string;
    Address: string;
    Phone: string;
    MC: string;
    DOT: string;
  }
}
const ViewBrokerModal = ({ isOpen, toggle ,data }: viewBrokerModalProps) => {

    const [isEdit , setIsEdit] = useState(false)
  const closeBtn = (
    <button className="border-0 bg-transparent" onClick={toggle} type="button">
      <RxCross2 />
    </button>
  );
    const handlenewCustomerModal = () => {
        setIsEdit(!isEdit)
    }

  return (
    <div>
      <Modal isOpen={isOpen} toggle={() => toggle()} centered >
        <ModalHeader toggle={() => toggle()} close={closeBtn} className="modalColor">
          <h6 className="mb-0 fw-bold " > View Broker </h6>
        </ModalHeader>
        <ModalBody>
          <Container>
            <h6 className="mb-0 fw-bold mb-4" style={{ color: "#1B56AE" }}>
              1 Call Moving Solutions
            </h6>
            <div className="d-flex direction-row  d-inline-block">
              <span style={{ color: "#1B56AE" }}>Name</span>
              <div>{data.Name}</div>
            </div>
            <div className="d-flex direction-row  d-inline-block">
              <span style={{ color: "#1B56AE" }}>Address</span>
              <div>{data.Address}</div>
            </div>
            <div className="d-flex direction-row  d-inline-block">
              <span style={{ color: "#1B56AE" }}>Phone</span>
              <div>{data.Phone}</div>
            </div>
            <div className="d-flex direction-row  d-inline-block">
              <span style={{ color: "#1B56AE" }}>MC</span>
              <div>{data.MC}</div>
            </div>
            <div className="d-flex direction-row  d-inline-block">
              <span style={{ color: "#1B56AE" }}>DOT</span>
              <div>{data.DOT}</div>
            </div>
            <NewCustomerDetailsModal isOpen={isEdit} toggle={() => handlenewCustomerModal()} />
            <Button size="sm" color="success" onClick={handlenewCustomerModal}>
              <BiCheck fontSize={"16px"} />
              Approve
            </Button>

            
          </Container>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ViewBrokerModal;
