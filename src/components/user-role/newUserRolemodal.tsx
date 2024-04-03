import React from "react";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import {
  Button,
  Col,
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
    selectedUserRole,
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
      className="border-0 bg-transparent text-white"
      onClick={closeModal}
      type="button"
    >
      <RxCross2 />
    </button>
  );

  console.log("slectedUser", selectedUserRole);

  return (
    <>
      <div>
        <Modal isOpen={modalOpen} onClose={() => closeModal()}>
          <ModalHeader
            onClose={() => closeModal()}
            close={closeBtn}
          >
            <h6 className="mb-0 fw-bold ">
              {title ? "New Role " : "Edit User Role"}
            </h6>
          </ModalHeader>
          <ModalBody>
              <Form className="page-content" onSubmit={handleSaveUserRole}>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="name">Role Name</Label>
                      <Input bsSize="sm" className="form-control form-control-sm" id="name"
                       name="name" type="text" 
                       value={userRoleNewDetails.role_name} onChange={handleInputChange("role_name")} />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="name"> Role Description </Label>
                      <Input bsSize="sm" className="form-control form-control-sm" id="description" name="name" type="text" value={userRoleNewDetails.description} onChange={handleInputChange("description")} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  {!title &&
                    <Col md={6}>
                      <Label for="phone">Active</Label>
                      <FormGroup switch>
                        <Input type="switch" checked={userRoleNewDetails.active} onChange={handleCheckBox} />
                      </FormGroup>
                    </Col>
                  }
                </Row>
                <Row className="mt-2">
                  <Col className="d-flex justify-content-end align-items-end">
                    <Button color="primary" className="me-3" size="sm" onClick={() => { }} type="submit">
                      <BiCheck fontSize={"16px"} /> Save
                    </Button>
                    <Button size="sm" color="danger" outline={true} onClick={() => handleCancelModal()} >
                      <RxCross2 fontSize={"16px"} /> Close
                    </Button>
                  </Col>
                </Row>
              </Form>
          </ModalBody>
        </Modal>
      </div>
    </>
  )
}
export default NewUserRoleModal



