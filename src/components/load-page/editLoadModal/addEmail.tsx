import React from "react";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
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

interface EditLumperModalProps {
  isOpen: boolean;
  toggle: () => void;
}
const AddEditEmail = ({ isOpen, toggle }: EditLumperModalProps) => {
    

  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader className="py-2" toggle={() => toggle()}>
        <h6 className="mb-0 fw-bold"> New Email </h6>
      </ModalHeader>
      <ModalBody>
        <Container>
          <Form>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="emall"> To </Label>
                  <Input
                    bsSize="sm"
                    className="form-control form-control-sm"
                    type="email"
                    name="emall"
                    id="emall"
                    // value={addNewCustomer.company_name}
                    // onChange={handleCutomerInput("company_name")}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup>
                  <Label for="subject"> Subject </Label>
                  <Input
                    bsSize="sm"
                    className="form-control form-control-sm"
                    type="text"
                    name="subject"
                    id="subject"
                    // value={addNewCustomer.company_name}
                    // onChange={handleCutomerInput("company_name")}
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row>
              <Col md={12}>
                <FormGroup>
                  <Label for="notes">Body</Label>
                  <Input
                    bsSize="sm"
                    className="form-control form-control-sm"
                    type="textarea"
                    name="notes"
                    id="notes"
                    // value={formState.notes}
                    // onChange={handleInput("SET_notes")}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row> 
                <Col>
<Link  to={""}  >
                Add Attachment
                </Link>
                </Col>
            </Row>
            <Row>
              <Col>
                <FormGroup
                  className="d-flex justify-content-end align-self-center mt-1"
                  style={{ bottom: "0", right: "0" }}
                >
                     <Button className="me-3  save-preview "  color="success"
                      outline size="sm" >
                   
                    Priview
                  </Button>
                  <Button className="me-3 save-button" size="sm">
                    <BiCheck fontSize={"16px"} />
                    Send
                  </Button>
                  <Button size="sm" className="cancel-button">
                    <RxCross2 fontSize={"16px"} color="red" /> Cancel
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </Container>
      </ModalBody>
    </Modal>
  );
};

export default AddEditEmail;
