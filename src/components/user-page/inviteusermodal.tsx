import React from "react";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { IUserManagementProps } from "./user.types";

const InviteUserModal = (props: IUserManagementProps) => {
  const {
    modalOpen,
    closeModal,
    slectedUser,
    userNewDetails,
    handleInputChange,
    handleSaveUser,
    title,
  } = props;

  const handleCancelModal = () => {
    closeModal();
  };

  const closeBtn = (
    <button
      className="border-0 bg-transparent"
      onClick={closeModal}
      type="button"
    >
      <RxCross2 />
    </button>
  );

  console.log("slectedUser", slectedUser);
  return (
    <div>
      <Modal isOpen={modalOpen} onClose={() => closeModal()}>
        <ModalHeader
          onClose={() => closeModal()}
          close={closeBtn}
          className="modalColor"
        >
          <h6 className="mb-0 fw-bold ">
            {title ? "Invite User" : "Edit User"}
          </h6>
        </ModalHeader>
        <ModalBody>
          <Container>
            <Form onSubmit={handleSaveUser}>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="name" className="fw-bold">
                      First Name
                    </Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      id="name"
                      name="name"
                      type="text"
                      value={userNewDetails.first_name}
                      onChange={handleInputChange("first_name")}
                    />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="name" className="fw-bold">
                      Last Name
                    </Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      id="name"
                      name="name"
                      type="text"
                      value={userNewDetails.last_name}
                      onChange={handleInputChange("last_name")}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Email" className="fw-bold">
                      Email
                    </Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      id="Email"
                      name="email"
                      type="email"
                      value={userNewDetails.email}
                      disabled={title ? false : true}
                      onChange={handleInputChange("email")}
                    />
                  </FormGroup>
                </Col>

                <Col md={6}>
                  <FormGroup>
                    <Label for="phone" className="fw-bold">
                      Phone
                    </Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      id="phone"
                      name="phone"
                      type="text"
                      value={userNewDetails.contact_number}
                      onChange={handleInputChange("contact_number")}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="mb-4">
                <Col>
                  <Label className="fw-bold"> User Role </Label>
                  <br />
                  <FormGroup check inline>
                    <Input
                      type="checkbox"
                      checked={false}
                      name="Admin"
                      onChange={() => {}}
                    />
                    <Label check>Broker</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input
                      type="checkbox"
                      checked={false}
                      name="Dispatcher"
                      onChange={() => {}}
                    />
                    <Label check>Dispatcher</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input
                      type="checkbox"
                      checked={false}
                      name="Accountant"
                      onChange={() => {}}
                    />
                    <Label check>Accountant</Label>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input
                      type="checkbox"
                      checked={false}
                      name="Safety"
                      onChange={() => {}}
                    />
                    <Label check>Safety</Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className=" d-flex justify-content-end align-items-end">
                  <Button
                    color="primary"
                    size="sm"
                    className="me-3 save-button"
                    onClick={() => {}}
                    type="submit"
                  >
                    <BiCheck fontSize={"16px"} />
                    Save
                  </Button>
                  <Button
                    className="cancel-button"
                    size="sm"
                    onClick={() => handleCancelModal()}
                  >
                    <RxCross2 fontSize={"16px"} color="red" />
                    Close
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default InviteUserModal;
