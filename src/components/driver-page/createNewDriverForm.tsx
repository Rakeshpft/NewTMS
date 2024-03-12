// import { Form, useNavigate } from "react-router-dom";
// import { routes } from "../routes/routes";
import React from "react";
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Form,
  TabPane,
  Button,
} from "reactstrap";
import TabPage from "./tab-page";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

const CreateNewDriverForm = () => {
  // const navigate = useNavigate();

  // {
  //   navigate(routes.driverpageAll);
  // }
  return (
    <Form className=" p-4" onSubmit={() => {}}>
      <Row className="driver-title">
        <h5>Create New Driver</h5>
      </Row>

      <Row className="driver-basic-details">
        <Row className="driver-title-detail">
          <h6>Basic Details</h6>
        </Row>

        <Col md={9}>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="unit">Full Name</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                  id="unit"
                  name="unit"
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="unit">Last Name</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                  id="unit"
                  name="unit"
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="unit">D.O.B</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                  id="unit"
                  name="unit"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="unit">E-mail</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                  id="unit"
                  name="unit"
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="unit">Phone</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                  id="unit"
                  name="unit"
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="unit">Address</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                  id="unit"
                  name="unit"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="unit">Loacation</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                  id="unit"
                  name="unit"
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="unit">State</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="select"
                  id="unit"
                  name="unit"
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="unit">ZIP</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                  id="unit"
                  name="unit"
                />
              </FormGroup>
            </Col>
          </Row>
        </Col>
        <Col md={3} className="mt-4">
          
          <div className="d-flex align-items-center ">
            <div className="user-avatar me-2">
              <img width="120" height="120" className="rounded-circle" />
            </div>
            <FormGroup>
              <Input type="file" name="file" id="file" accept="image/*" />
            </FormGroup>
          </div>
          <Label className="driver-title-detail"> Set profile picture</Label>
        </Col>
      </Row>

      <Row className="driver-basic-details">
        <Row className="driver-title-detail">
          <h6>Employement Details</h6>
        </Row>
        <Col md={9}>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="ELDprovider">Driver Type</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="select"
                  id="ELDprovider"
                  name="ELDprovider"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="vendor">Vendor</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="select"
                  id="vendor"
                  name="vendor"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="ELDprovider">ELD Provider</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="select"
                  id="ELDprovider"
                  name="ELDprovider"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="ELDprovider">Status</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="select"
                  id="ELDprovider"
                  name="ELDprovider"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="unit">Application Date</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                  id="unit"
                  name="unit"
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="unit">Hire Date</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                  id="unit"
                  name="unit"
                />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <FormGroup>
                <Label for="unit">Truck</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                  id="unit"
                  name="unit"
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="unit">Trailer</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                  id="unit"
                  name="unit"
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <FormGroup>
                <Label for="ELDprovider">Fuel Card #</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="select"
                  id="ELDprovider"
                  name="ELDprovider"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
        </Col>

        <Col md={3}></Col>
      </Row>

      <Row className="driver-basic-details">
        <Row className="driver-title-detail">
          <h6>Payment Details</h6>
        </Row>
        <Col md={9}>
          <TabPage tabTitles={["Services", "Documents", "Billing", "History"]}>
            <TabPane tabId={1} className="">
              <Row className="driver-basic-details ps-3 ">
                <Col className="d-flex gap-2 mt-2">
                  <FormGroup check>
                    <Input name="radio2" type="radio" />
                    <Label check>Per Mile</Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input name="radio2" type="radio" />
                    <Label check>Per Mile</Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input name="radio2" type="radio" />
                    <Label check>Per Mile</Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input name="radio2" type="radio" />
                    <Label check>Per Mile</Label>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="driver-basic-details mt-2 ps-3">
                <Col md={4}>
                  <FormGroup>
                    <Label for="unit">Unit</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      id="unit"
                      name="unit"
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="unit">Unit</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      id="unit"
                      name="unit"
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="unit">Unit</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      id="unit"
                      name="unit"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </TabPane>
          </TabPage>
        </Col>

        <Col
          md={3}
          className=" d-flex justify-content-end align-items-end pb-3"
        >
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
          <Button className="cancel-button" size="sm">
            <RxCross2 fontSize={"16px"} color="red" />
            Close
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default CreateNewDriverForm;
