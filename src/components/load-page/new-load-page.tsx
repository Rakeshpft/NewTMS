import React, { useState } from "react";
import { MdOutlineAdd } from "react-icons/md";
import {
  Button,
  Col,
  Collapse,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";

const NewLoadPage = () => {

    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    return (
      <>
       
        {/* <Button
            
              style={{
                color: "black",
                border: "2px solid #1E5367",
                backgroundColor: "#B7D1E6",
              }}
              onClick={toggle}
            >
              New Load
             
              <MdOutlineAdd />
            </Button> */}
        <Collapse isOpen={isOpen}>
          <Form>
            <div className="d-flex gap-2">
              <div className="item">
                <h3> New Load </h3>
  
                <FormGroup>
                  <Label for="loadSelect">Status</Label>
                  <Input
                    id="loadSelect"
                    name="select"
                    type="select"
                    className="form-select form-select-sm"
                    style={{ color: "black", border: "2px solid #B7D1E6" }}
                  >
                    <option>New</option>
                    <option>Canceled</option>
                    <option>TONU</option>
                    <option>Dispatched</option>
                    <option>EnRoute</option>
                    <option>Picked-up</option>
                    <option>Delivered</option>
                    <option>Closed</option>
                  </Input>
                </FormGroup>
  
                <FormGroup>
                  <Label for="BillingSelect">Billing Status</Label>
                  <Input
                    id="BillingSelect"
                    name="select"
                    type="select"
                    className="form-select form-select-sm"
                    style={{ color: "black", border: "2px solid #B7D1E6" }}
                  >
                    <option>Pending</option>
                    <option>Canceled</option>
                    <option>BOL received</option>
                    <option>Invoiced</option>
                    <option>Sent to factoring</option>
                    <option>Funded</option>
                    <option>Paid</option>
                    <option>Closed</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="dispatcherSelect">Dispatcher</Label>
                  <Input
                    id="dispatcherSelect"
                    name="select"
                    type="select"
                    className="form-select form-select-sm"
                    style={{ color: "black", border: "2px solid #B7D1E6" }}
                  >
                    <option>Pending</option>
                    <option>Canceled</option>
                    <option>BOL received</option>
                    <option>Invoiced</option>
                    <option>Sent to factoring</option>
                    <option>Funded</option>
                    <option>Paid</option>
                    <option>Closed</option>
                  </Input>
                </FormGroup>
              </div>
              <div className="item">
                <h3> Pick Up </h3>
  
                <FormGroup>
                  <Label for="pickupDate">Date</Label>
                  <Input
                    id="pickDate"
                    name="date"
                    type="date"
                    className="form-control form-control-sm"
                    style={{ color: "black", border: "2px solid #B7D1E6" }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    className="form-control form-control-sm"
                    style={{ color: "black", border: "2px solid #B7D1E6" }}
                  />
                </FormGroup>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for="pickupState">State</Label>
                      <Input
                        id="pickupState"
                        name="state"
                        type="text"
                        className="form-control form-control-sm"
                        style={{ color: "black", border: "2px solid #B7D1E6" }}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for="pickupZip">ZIP</Label>
                      <Input
                        id="pickupZip"
                        name="zip"
                        className="form-control form-control-sm"
                        style={{ color: "black", border: "2px solid #B7D1E6" }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </div>
              <div className="item">
                <h3> Delivery </h3>
                <Form>
                  <FormGroup>
                    <Label for="pickupDate">Date</Label>
                    <Input
                      id="pickDate"
                      name="date"
                      type="date"
                      className="form-control form-control-sm"
                      style={{ color: "black", border: "2px solid #B7D1E6" }}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      type="text"
                      className="form-control form-control-sm"
                      style={{ color: "black", border: "2px solid #B7D1E6" }}
                    />
                  </FormGroup>
                  <Row>
                    <Col>
                      <FormGroup>
                        <Label for="pickupState">State</Label>
                        <Input
                          id="pickupState"
                          name="state"
                          className="form-control form-control-sm"
                          style={{ color: "black", border: "2px solid #B7D1E6" }}
                        />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <Label for="pickupZip">ZIP</Label>
                        <Input
                          id="pickupZip"
                          name="zip"
                          className="form-control form-control-sm"
                          style={{ color: "black", border: "2px solid #B7D1E6" }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </div>
              <div className="item">
                <h3> Broker </h3>
  
                <FormGroup>
                  <Label for="loadSelect" className="mb-1">
                    Broker
                  </Label>
                  <Input
                    id="loadSelect"
                    name="select"
                    type="select"
                    className="form-select form-select-sm"
                    style={{ color: "black", border: "2px solid #B7D1E6" }}
                  >
                    <option>New</option>
                    <option>Canceled</option>
                    <option>TONU</option>
                    <option>Dispatched</option>
                    <option>EnRoute</option>
                    <option>Picked-up</option>
                    <option>Delivered</option>
                    <option>Closed</option>
                  </Input>
                </FormGroup>
  
                <FormGroup>
                  <Label for="po"> PO # </Label>
                  <Input
                    id="po"
                    name="po"
                    type="text"
                    className="form-control form-control-sm"
                    style={{ color: "black", border: "2px solid #B7D1E6" }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="rate"> Rate </Label>
                  <Input
                    id="rate"
                    name="rate"
                    type="text"
                    className="form-control form-control-sm"
                    style={{ color: "black", border: "2px solid #B7D1E6" }}
                  />
                </FormGroup>
              </div>
              <div className="item">
                <h3> Driver </h3>
  
                <FormGroup>
                  <Label for="loadSelect" className="mb-1">
                    Driver
                  </Label>
                  <Input
                    id="loadSelect"
                    name="select"
                    type="select"
                    className="form-select form-select-sm"
                    style={{ color: "black", border: "2px solid #B7D1E6" }}
                  >
                    <option>New</option>
                    <option>Canceled</option>
                    <option>TONU</option>
                    <option>Dispatched</option>
                    <option>EnRoute</option>
                    <option>Picked-up</option>
                    <option>Delivered</option>
                    <option>Closed</option>
                  </Input>
                </FormGroup>
  
                <FormGroup>
                  <Label for="BillingSelect">Truck</Label>
                  <Input
                    id="BillingSelect"
                    name="select"
                    type="select"
                    className="form-select form-select-sm"
                    style={{ color: "black", border: "2px solid #B7D1E6" }}
                  >
                    <option>Pending</option>
                    <option>Canceled</option>
                    <option>BOL received</option>
                    <option>Invoiced</option>
                    <option>Sent to factoring</option>
                    <option>Funded</option>
                    <option>Paid</option>
                    <option>Closed</option>
                  </Input>
                </FormGroup>
                <FormGroup>
                  <Label for="dispatcherSelect">Trailer</Label>
                  <Input
                    id="dispatcherSelect"
                    name="select"
                    type="select"
                    className="form-select form-select-sm"
                    style={{ color: "black", border: "2px solid #B7D1E6" }}
                  >
                    <option>Pending</option>
                    <option>Canceled</option>
                    <option>BOL received</option>
                    <option>Invoiced</option>
                    <option>Sent to factoring</option>
                    <option>Funded</option>
                    <option>Paid</option>
                    <option>Closed</option>
                  </Input>
                </FormGroup>
              </div>
              <div className="item">
                <h3> Notes </h3>
                <FormGroup>
                  <Label for="Note"> Notes </Label>
                  <Input
                    id="Note"
                    name="Note"
                    type="text"
                    className="form-control form-control-sm"
                    style={{ color: "black", border: "2px solid #B7D1E6" }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="fileAttachment">Attachment </Label>
                  <Input
                    id="fileAttachment"
                    name="file"
                    type="file"
                    style={{ color: "black", border: "2px solid #B7D1E6" }}
                  />
                </FormGroup>
                <FormGroup className="d-flex ">
                  <Button className="align-items-center "> Create Load </Button>
                  <Button color="link"> Close </Button>
                </FormGroup>
              </div>
            </div>
          </Form>
        </Collapse>
      </>
    );
  };


 export default NewLoadPage