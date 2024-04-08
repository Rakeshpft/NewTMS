import React from 'react'
// import { AiOutlinePlus } from 'react-icons/ai'
import { BiCheck } from 'react-icons/bi'
import { RxCross2 } from 'react-icons/rx'
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import {  ICustomerContactsProps } from '../../../../services/tms-objects/customer.types'

const CustomerContactsModal = (props : ICustomerContactsProps) => {

    const {
        modalOpen,
        closeModal,
         title,
        contactNewDetails,
        handleInputContactChange,
        handleSaveContact,
        handleDirectCheckBox,
        handleDirectBillingCheckBox,
    }= props;


    const closeBtn = (
        <button
          className="border-0 bg-transparent text-white"
          type="button"
          onClick={() => closeModal()}
        >
           
          <RxCross2 />
        </button>
    );
    

    return (
        <>
            
            <Modal isOpen={modalOpen} >
                <ModalHeader close={closeBtn}
                 onClose={() => closeModal()}>
                    <h6 className="mb-0 fw-bold ">
                    {title ? "New Contact " : "Edit Contact"}
                    </h6>
                </ModalHeader>
                <ModalBody>
                    <Form className="page-content" onSubmit={handleSaveContact}>
                        <Row className="page-content align-items-center">
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="first Name">Name</Label>
                                    <Input
                                        bsSize="sm"
                                        className="form-control form-control-sm"
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={contactNewDetails.name} onChange={handleInputContactChange("name")} 
                                        pattern='[a-zA-Z]+( [a-zA-Z]+)*' title="Only alphabets are allowed"
                                        required
                                        />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup className="d-flex align-items-center mt-3">
                                    <FormGroup check className="checkbox-inline me-3">
                                        <Input type="checkbox" id="default" 
                                         checked={contactNewDetails.is_default}
                                        onChange={handleDirectCheckBox}  />
                                        <Label for="defaultCheckbox" check className="checkbox-label">
                                            Default
                                        </Label>
                                    </FormGroup>
                                    <FormGroup check className="checkbox-inline">
                                        <Input type="checkbox" id="default_billing" 
                                         checked={contactNewDetails.is_default_billing}
                                        onChange={handleDirectBillingCheckBox}  />
                                        <Label for="default_billing" check className="checkbox-label">
                                            Default Billing
                                        </Label>
                                    </FormGroup>
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="phone">Phone</Label>
                                    <Input bsSize="sm"
                                        className="form-control form-control-sm"
                                        id="phone" name="phone"
                                        type="text"
                                            value={contactNewDetails.phone}
                                            onChange={handleInputContactChange("phone")}
                                            pattern='^(\+\d{1,3}[- ]?)?\d{10}$' title="Please enter valid phone number"
                                            required
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="email"> Email </Label>
                                    <Input bsSize="sm" className="form-control form-control-sm" id="description" name="email" type="text" 
                                     value={contactNewDetails.email}
                                     onChange={handleInputContactChange("email")}
                                     pattern='[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$' title="Please enter valid email"
                                     required
                                     />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <FormGroup>
                                    <Label for="exampleText">
                                        Notes
                                    </Label>
                                    <Input
                                        id="notes"
                                        name="text"
                                        type="textarea"
                                        value={contactNewDetails.notes}
                                     onChange={handleInputContactChange("notes")}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row className="mt-2">
                            <Col className="d-flex justify-content-end align-items-end">
                                <Button color="primary" className="me-3" size="sm" onClick={() => { }} type="submit">
                                    <BiCheck fontSize={"16px"} /> Save
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                </ModalBody>
            </Modal>
        </>
    )
}

export default CustomerContactsModal;
