import React  from "react";
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
import { IUserManagementProps } from "./user.types";

const InviteUserModal = (props: IUserManagementProps) => {
  const {
    modalOpen,
    closeModal,
    userNewDetails,
    handleInputChange,
    handleSaveUser,
    title,
    handleCheckBox,
    userRole,
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

  return (
    <div>
      <Modal isOpen={modalOpen} onClose={() => closeModal()}>
        <ModalHeader
          onClose={() => closeModal()}
          close={closeBtn}
        >
          
          <h6 className="mb-0 fw-bold ">

            {title ? "Invite User" : "Edit User"}
          </h6>
        </ModalHeader>
        <ModalBody>
            <Form className="page-content" onSubmit={handleSaveUser}>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="name">First Name</Label>
                    <Input bsSize="sm" 
                    className="form-control form-control-sm"
                     id="name" 
                     name="name"
                      type="text"
                       value={userNewDetails.first_name} 
                       onChange={handleInputChange("first_name")} />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="name">Last Name</Label>
                    <Input bsSize="sm" className="form-control form-control-sm" id="name" name="name" type="text" value={userNewDetails.last_name} onChange={handleInputChange("last_name")} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                    <Label for="Email">Email</Label>
                    <Input bsSize="sm" className="form-control form-control-sm" id="Email" name="email" type="email" value={userNewDetails.email} disabled={!title} onChange={handleInputChange("email")} />
                  </FormGroup>
                </Col>
                <Col md={6}>
                  <FormGroup>
                    <Label for="phone">Phone</Label>
                    <Input bsSize="sm" className="form-control form-control-sm" id="phone" name="phone" type="text" value={userNewDetails.contact_number} onChange={handleInputChange("contact_number")} />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <FormGroup>
                  <Label>User Role</Label>
                    <Input bsSize="sm" className="form-control form-control-sm" type="select" id="user" name="user" value={userNewDetails.role_id} onChange={handleInputChange("role_id")}>
                      {userRole?.map((item) => {
                        return (
                          <option key={item.role_id} value={item.role_id}>
                            {item.role_name}
                          </option>
                        );
                      })}
                    </Input>                   
                  </FormGroup>
                </Col>
                { !title &&
                  <Col md={6}>
                  <Label for="Active">Active</Label>
                  <FormGroup switch>
                    <Input type="switch" checked={userNewDetails.active} onChange= {handleCheckBox} />
                  </FormGroup>
                </Col>
                }                
              </Row>
              <Row className="mt-2">
                <Col className=" d-flex justify-content-end align-items-end">
                  <Button color="primary" size="sm" className="me-3" onClick={() => {}} type="submit" >
                    <BiCheck fontSize={"16px"} />
                    Save
                  </Button>
                  <Button size="sm" color="danger" outline={true} onClick={() => handleCancelModal()}>
                    <RxCross2 fontSize={"16px"} />
                    Close
                  </Button>
                </Col>
              </Row>
            </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default InviteUserModal;
