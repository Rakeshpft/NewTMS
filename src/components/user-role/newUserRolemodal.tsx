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
import { IUserRoleManagementProps } from "./userRole.types";

const NewUserRoleModal = (props: IUserRoleManagementProps) => {
  const {
    modalOpen,
    closeModal,
    slectedUserRole,
    userRoleNewDetails,
    handleInputChange,
    handleSaveUserRole,
    handleCheckBox,
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

  console.log("slectedUser", slectedUserRole);

  return (
    <>
      <div>
        <Modal isOpen={modalOpen} onClose={() => closeModal()}>
          <ModalHeader
            onClose={() => closeModal()}
            close={closeBtn}
            className="modalColor"
          >
            <h6 className="mb-0 fw-bold ">
              {title ? "New Role " : "Edit User Role"}
            </h6>
          </ModalHeader>
          <ModalBody>
            <Container>
              <Form onSubmit={handleSaveUserRole}>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="name" className="fw-bold">
                        Role Name
                      </Label>
                      <Input
                        bsSize="sm"
                        className="form-control form-control-sm"
                        id="name"
                        name="name"
                        type="text"
                        value={userRoleNewDetails.role_name}
                        onChange={handleInputChange("role_name")}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="name" className="fw-bold">
                        Role Description
                      </Label>
                      <Input
                        bsSize="sm"
                        className="form-control form-control-sm"
                        id="description"
                        name="name"
                        type="text"
                        value={userRoleNewDetails.description}
                        onChange={handleInputChange("description")}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  {!title &&
                    <Col md={6}>
                      <Label for="phone" className="fw-bold">
                        Active
                      </Label>
                      <FormGroup switch>
                        <Input
                          type="switch"
                          checked={userRoleNewDetails.active}
                          onChange={handleCheckBox}
                           
                        />
                      </FormGroup>
                    </Col>
                  }


                </Row>
                <Row>
                  <Col className="d-flex justify-content-end align-items-end">
                    <Button
                      color="primary"
                      size="sm"
                      className="me-3 save-button"
                      onClick={() => { }}
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
    </>
  )
}
export default NewUserRoleModal



