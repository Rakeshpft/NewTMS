import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Nav,
  Navbar,
  NavbarBrand,
  Row,
} from "reactstrap";
import SearchPage from "../search-page";
import Profile from "../pofile";
import { Header } from "../header";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

const LaodNewPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Navbar
        style={{ border: "1px solid #1B56AE", height: "100px" }}
        color="light"
        className="py-0"
      >
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        />
        <NavbarBrand>Loads</NavbarBrand>
        <Nav className="me-auto d-flex flex-row gap-2" navbar></Nav>
        <div className="d-flex  gap-3">
          <SearchPage />
          <Profile />
        </div>
      </Navbar>
      <Form className="m-4">
        <Container
          fluid
          style={{ backgroundColor: "#E9F3FB" }}
          className="mt-1 px-5 py-3"
        >
          <Row>
            <Col sm={3}>
              <div className="item">
                <h3 style={{ color: "rgb(66 111 177)", fontWeight: "bold" }}>
                  Create New Load
                </h3>

                <FormGroup>
                  <Label for="loadSelect" className="mb-0">
                    Status
                  </Label>
                  <Input
                    id="loadSelect"
                    name="select"
                    type="select"
                    className="form-select form-select-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
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
                  <Label for="BillingSelect" className="mb-0">
                    Billing Status
                  </Label>
                  <Input
                    id="BillingSelect"
                    name="select"
                    type="select"
                    className="form-select form-select-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
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
                  <Label for="dispatcherSelect" className="mb-0">
                    Dispatcher
                  </Label>
                  <Input
                    id="dispatcherSelect"
                    name="select"
                    type="select"
                    className="form-select form-select-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
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
            </Col>

            <Col sm={3}>
              <div className="item">
                <h5 style={{ color: "black" }}> Pickup </h5>

                <FormGroup>
                  <Label for="pickupDate" className="mb-0">
                    Date
                  </Label>
                  <Input
                    id="pickDate"
                    name="date"
                    type="date"
                    className="form-control form-control-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="city">City</Label>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    className="form-control form-control-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="pickupState" className="mb-0">
                    State
                  </Label>
                  <Input
                    id="pickupState"
                    name="state"
                    type="text"
                    className="form-control form-control-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="pickupZip" className="mb-0">
                    ZIP
                  </Label>
                  <Input
                    id="pickupZip"
                    name="zip"
                    className="form-control form-control-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
                  />
                </FormGroup>
              </div>
            </Col>

            <Col sm={3}>
              <div className="item">
                <h5 style={{ color: "black" }}> Delivery</h5>

                <FormGroup>
                  <Label for="pickupDate" className="mb-0">
                    Date
                  </Label>
                  <Input
                    id="pickDate"
                    name="date"
                    type="date"
                    className="form-control form-control-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="city" className="mb-0">
                    City
                  </Label>
                  <Input
                    id="city"
                    name="city"
                    type="text"
                    className="form-control form-control-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="pickupState" className="mb-0">
                    State
                  </Label>
                  <Input
                    id="pickupState"
                    name="state"
                    className="form-control form-control-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
                  />
                </FormGroup>

                <FormGroup>
                  <Label for="pickupZip" className="mb-0">
                    ZIP
                  </Label>
                  <Input
                    id="pickupZip"
                    name="zip"
                    className="form-control form-control-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
                  />
                </FormGroup>
              </div>
            </Col>
            <Col sm={3}>
              <div className="item">
                <div>
                  <h5 style={{ color: "black" }}> Notes </h5>
                  <FormGroup>
                    <Label for="Note" className="mb-0">
                      Notes
                    </Label>
                    <Input
                      id="Note"
                      name="Note"
                      type="textarea"
                      rows="3"
                      className="form-control form-control-sm"
                      style={{ color: "black", border: "1px solid #418ECB" }}
                    />
                  </FormGroup>
                </div>
                <FormGroup>
                  <Label for="fileAttachment" className="mb-0">
                    Attachment
                  </Label>
                  <Input
                    id="fileAttachment"
                    name="file"
                    type="file"
                    style={{ color: "black", border: "1px solid #418ECB" }}
                  />
                </FormGroup>
              </div>
            </Col>
          </Row>
          <Row>
            <Col sm={3}> </Col>
            <Col sm={3}>
              <div className="item">
                <h5 style={{ color: "black" }}> Broker </h5>

                <FormGroup>
                  <Label for="loadSelect" className="mb-0">
                    Broker
                  </Label>
                  <Input
                    id="loadSelect"
                    name="select"
                    type="select"
                    className="form-select form-select-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
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
                  <Label for="po" className="mb-0">
                    {" "}
                    PO #{" "}
                  </Label>
                  <Input
                    id="po"
                    name="po"
                    type="text"
                    className="form-control form-control-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="rate" className="mb-0">
                    Rate
                  </Label>
                  <Input
                    id="rate"
                    name="rate"
                    type="text"
                    className="form-control form-control-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
                  />
                </FormGroup>
              </div>
            </Col>
            <Col sm={3}>
              <div className="item">
                <h5 style={{ color: "black" }}> Driver </h5>
                <FormGroup>
                  <Label for="loadSelect" className="mb-0">
                    Driver
                  </Label>
                  <Input
                    id="loadSelect"
                    name="select"
                    type="select"
                    className="form-select form-select-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
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
                  <Label for="BillingSelect" className="mb-0">
                    Truck
                  </Label>
                  <Input
                    id="BillingSelect"
                    name="select"
                    type="select"
                    className="form-select form-select-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
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
                  <Label for="dispatcherSelect" className="mb-0">
                    Trailer
                  </Label>
                  <Input
                    id="dispatcherSelect"
                    name="select"
                    type="select"
                    className="form-select form-select-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
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
            </Col>
            <Col sm={3} className="align-self-end">
              <FormGroup
                className="d-flex justify-content-bottom mb-1 me-4"
                style={{ bottom: "0", right: "0" }}
              >
                <Button
                  className="me-3  ps-3 pe-3"
                  style={{
                    color: "black",
                    border: "1px solid #1E5367",
                    backgroundColor: "#418ECB",
                  }}
                >
                  <BiCheck fontSize={"24px"} />
                  Save
                </Button>
                <Button
                  style={{
                    color: "red",
                    border: "1px solid red",
                    backgroundColor: "white",
                  }}
                >
                  <RxCross2 fontSize={"21px"} color="red" /> Cancel
                </Button>
              </FormGroup>
            </Col>
          </Row>
        </Container>
      </Form>
    </>
  );
};

export default LaodNewPage;
