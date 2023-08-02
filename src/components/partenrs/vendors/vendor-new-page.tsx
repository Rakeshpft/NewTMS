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
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { GrFormAdd } from "react-icons/gr";
import { Header } from "../../header";
import Profile from "../../pofile";
import SearchPage from "../../search-page";

const VendorNewPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Navbar
        style={{ border: "1px solid #1B56AE" }}
        color="light"
        className="py-0"
      >
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
          showHambuger={false}
        />
        <NavbarBrand>Vendor</NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-3">
          <SearchPage />
          <Profile />
        </div>
      </Navbar>
      <div className="m-2">
        <Container
          fluid
          style={{ backgroundColor: "#E9F3FB" }}
          className="px-5 py-2 mt-1"
        >
          <h3 style={{ color: "rgb(66 111 177)", fontWeight: "bold" }}>
            Create New Vendor
          </h3>
          <Form>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="companyName" className="mb-0">
                    Company Name
                  </Label>
                  <Input
                    id="companyName"
                    name="text"
                    type="text"
                    className="form-control form-control-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="companyAddress" className="mb-0">
                    Address Line 1
                  </Label>
                  <Input
                    id="companyAddress"
                    name="text"
                    type="text"
                    className="form-control form-control-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="companyAddress" className="mb-0">
                    Address Line 2
                  </Label>
                  <Input
                    id="companyAddress"
                    name="text"
                    type="text"
                    className="form-control form-control-sm"
                    style={{ color: "black", border: "1px solid #418ECB" }}
                  />
                </FormGroup>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="phone" className="mb-0">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        name="text"
                        type="text"
                        className="form-control form-control-sm"
                        style={{
                          color: "black",
                          border: "1px solid #418ECB",
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="companyEmail" className="mb-0">
                        Email
                      </Label>
                      <Input
                        id="companyEmail"
                        name="email"
                        type="email"
                        className="form-control form-control-sm"
                        style={{
                          color: "black",
                          border: "1px solid #418ECB",
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="city" className="mb-0">
                        city
                      </Label>
                      <Input
                        id="city"
                        name="text"
                        type="text"
                        className="form-control form-control-sm"
                        style={{
                          color: "black",
                          border: "1px solid #418ECB",
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="state" className="mb-0">
                        State
                      </Label>
                      <Input
                        id="state"
                        name="text"
                        type="text"
                        className="form-control form-control-sm"
                        style={{
                          color: "black",
                          border: "1px solid #418ECB",
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="cityZip" className="mb-0">
                        Zip
                      </Label>
                      <Input
                        id="cityZip"
                        name="text"
                        type="text"
                        className="form-control form-control-sm"
                        style={{
                          color: "black",
                          border: "1px solid #418ECB",
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="fid" className="mb-0">
                        FID/EIN
                      </Label>
                      <Input
                        id="fid"
                        name="text"
                        type="text"
                        className="form-control form-control-sm"
                        style={{
                          color: "black",
                          border: "1px solid #418ECB",
                        }}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={6}>
                    <FormGroup>
                      <Label for="mc" className="mb-0">
                        MC
                      </Label>
                      <Input
                        id="mc"
                        name="text"
                        type="text"
                        className="form-control form-control-sm"
                        style={{
                          color: "black",
                          border: "1px solid #418ECB",
                        }}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col>
                <Col md={6} className="ps-5">
                  <FormGroup>
                    <Label for="exampleSelect" className="d-flex">
                      Vendor Type
                    </Label>
                    <Button
                      style={{
                        color: "black",
                        backgroundColor: "#418ECB",
                        border: "1px solid #1E5367",
                      }}
                    >
                      <GrFormAdd fontSize={"21px"} /> Vendor Type
                    </Button>
                  </FormGroup>
                  <FormGroup>
                    <h4 className="d-flex align-items-start"> Billing </h4>
                  </FormGroup>
                  <FormGroup check inline>
                    <Input type="checkbox" />
                    <Label check className="mb-0">
                      Additional Payee
                    </Label>
                  </FormGroup>
                </Col>
              </Col>
              <Row>
                <Col>
                  <FormGroup>
                    <Label for="Notes" className="mb-0">
                      Notes
                    </Label>
                    <Input
                      id="Notes"
                      name="text"
                      type="textarea"
                      className="form-control form-control-sm"
                      style={{ color: "black", border: "1px solid #418ECB" }}
                    />
                  </FormGroup>
                </Col>
                <Col
                  className="align-self-start "
                  style={{ marginTop: "auto" }}
                >
                  <FormGroup
                    className="d-flex justify-content-end  me-4"
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
            </Row>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default VendorNewPage;
