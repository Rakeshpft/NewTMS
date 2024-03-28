import React, { useState } from "react";
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Nav,
  Navbar,
  NavbarBrand,
  Row,
} from "reactstrap";
import { Header, SideBar } from "../shared";

import Profile from "../pofile";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

const SettingPage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Navbar color="light" className="py-0">
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        />
        <NavbarBrand className="fw-bold px-4"> Setting </NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-3">
          <Profile />
        </div>
      </Navbar>

      <div className="content d-flex">
        <SideBar isSidebarOpen={!isSidebarOpen} activePageId={1} />
        <div className="aria-content">
          <h3 className=" settingTittle"> General </h3>
          <Row>
            <Col lg={3} md={3} sm={12} className="px-3">
              <FormGroup>
                <Label for="periodSelect">Time Zone </Label>
                <Input
                  id="periodSelect"
                  name="period"
                  type="select"
                  className="form-control form-control-sm"
                  value={""}
                  onChange={() => {}}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
            </Col>
            <Col lg={3} md={3} sm={12} className="px-3">
              <FormGroup>
                <Label for="periodSelect">Theme</Label>
                <Input
                  id="periodSelect"
                  name="period"
                  type="select"
                  className="form-control form-control-sm"
                  value={""}
                  onChange={() => {}}
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
          <h3 className="settingTittle"> My Company </h3>

          <Row>
            <Col lg={3} md={3} sm={12} className="px-3">
              <FormGroup>
                <Label for="periodSelect"> Default </Label>
                <Input
                  id="periodSelect"
                  name="period"
                  type="select"
                  className="form-control form-control-sm"
                  value={""}
                  onChange={() => {}}
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

          <Row className=" d-flex justify-content-end   ">
            <Col lg={8} md={8} sm={12} className="px-3 mt-4   ">
              <Button
                size="sm"
                style={{
                  color: "black",
                  border: "1px solid #1E5367",
                  backgroundColor: "#8FF086",
                }}
                className="me-3  ms-4 "
              >
                <BiCheck fontSize={"16px"} />
                Apply
              </Button>

              <Button
                size="sm"
                style={{
                  color: "black",
                  border: "1px solid #1E5367",
                  backgroundColor: "#B7D1E6",
                }}
              >
                <RxCross2 fontSize={"16px"} color="black" />
                Cancel
              </Button>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default SettingPage;
