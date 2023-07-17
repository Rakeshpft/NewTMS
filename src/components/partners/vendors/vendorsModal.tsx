import React, { useState } from "react";
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
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { GrFormAdd } from "react-icons/gr";
const VendorsModal = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  return (
    <>
      <section>
        <Button onClick={toggle}>New Vendor</Button>
        <Modal isOpen={modal} toggle={toggle} size="lg">
          <ModalHeader toggle={toggle} className="headerAddPage">
            New Vendor
          </ModalHeader>
          <ModalBody className="px-4">
            <Form>
              <Row className="mb-3">
                <Col md={6}>
                  <FormGroup>
                    <Label for="companyName"> Company Name </Label>
                    <Input
                      id="companyName"
                      name="text"
                      type="text"
                      className="form-control form-control-sm"
                      style={{ color: "black", border: "2px solid #B7D1E6" }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="companyAddress"> Address Line 1 </Label>
                    <Input
                      id="companyAddress"
                      name="text"
                      type="text"
                      className="form-control form-control-sm"
                      style={{ color: "black", border: "2px solid #B7D1E6" }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="companyAddress"> Address Line 2 </Label>
                    <Input
                      id="companyAddress"
                      name="text"
                      type="text"
                      className="form-control form-control-sm"
                      style={{ color: "black", border: "2px solid #B7D1E6" }}
                    />
                  </FormGroup>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="phone"> Phone </Label>
                        <Input
                          id="phone"
                          name="text"
                          type="text"
                          className="form-control form-control-sm"
                          style={{
                            color: "black",
                            border: "2px solid #B7D1E6",
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="companyEmail"> Email </Label>
                        <Input
                          id="companyEmail"
                          name="email"
                          type="email"
                          className="form-control form-control-sm"
                          style={{
                            color: "black",
                            border: "2px solid #B7D1E6",
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="city"> city </Label>
                        <Input
                          id="city"
                          name="text"
                          type="text"
                          className="form-control form-control-sm"
                          style={{
                            color: "black",
                            border: "2px solid #B7D1E6",
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="state"> State </Label>
                        <Input
                          id="state"
                          name="text"
                          type="text"
                          className="form-control form-control-sm"
                          style={{
                            color: "black",
                            border: "2px solid #B7D1E6",
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="cityZip"> Zip </Label>
                        <Input
                          id="cityZip"
                          name="text"
                          type="text"
                          className="form-control form-control-sm"
                          style={{
                            color: "black",
                            border: "2px solid #B7D1E6",
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="fid"> FID/EIN </Label>
                        <Input
                          id="fid"
                          name="text"
                          type="text"
                          className="form-control form-control-sm"
                          style={{
                            color: "black",
                            border: "2px solid #B7D1E6",
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label for="mc">MC </Label>
                        <Input
                          id="mc"
                          name="text"
                          type="text"
                          className="form-control form-control-sm"
                          style={{
                            color: "black",
                            border: "2px solid #B7D1E6",
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row>
                    <FormGroup>
                      <Label for="Notes">Notes</Label>
                      <Input
                        id="Notes"
                        name="text"
                        type="textarea"
                        className="form-control form-control-sm"
                        style={{ color: "black", border: "2px solid #B7D1E6" }}
                      />
                    </FormGroup>
                  </Row>
                </Col>
                <Col md={6} className="ps-5">
                  <FormGroup>
                    <Label for="exampleSelect" className="d-flex">
                      Vendor Type
                    </Label>
                    <Button
                      style={{
                        color: "black",
                        backgroundColor: "#B7D1E6",
                        border: "2px solid #1E5367",
                      }}
                    >
                      {" "}
                      <GrFormAdd fontSize={"21px"} /> Vendor Type{" "}
                    </Button>
                  </FormGroup>
                  <FormGroup>
                    <h4 className="d-flex align-items-start"> Billing </h4>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input type="checkbox" />
                    <Label check className="">
                      Additional Payee
                    </Label>
                  </FormGroup>
                  <FormGroup
                    className="d-flex justify-content-end position-absolute mb-5 me-4"
                    style={{ bottom: "0", right: "0" }}
                  >
                    <Button
                      className="me-3  ps-3 pe-3"
                      style={{
                        color: "black",
                        border: "2px solid #1E5367",
                        backgroundColor: "#B7D1E6",
                      }}
                    >
                      <BiCheck fontSize={"24px"} />
                      Save
                    </Button>
                    <Button
                      style={{
                        color: "red",
                        border: "2px solid red",
                        backgroundColor: "white",
                      }}
                    >
                      <RxCross2 fontSize={"21px"} color="red" /> Cancel
                    </Button>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </ModalBody>
        </Modal>
      </section>
    </>
  );
};

export default VendorsModal;
