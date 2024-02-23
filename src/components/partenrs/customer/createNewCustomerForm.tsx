import React, { useState } from "react";
import { BiCheck } from "react-icons/bi";
// import { RxCross2 } from "react-icons/rx";
import { Button, Form, Row, Label, Col, FormGroup, Input } from "reactstrap";
// import { ICustomerForm } from "./customerForm.types";
import {
  ICustomerObject,
  initialStateCustomer,
} from "../../context/Customer/customer.types";
import { useCustomerContext } from "../../context/Customer/customer.reducer";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";
// import { ICustomerObject } from "../../context/Customer/customer.types";
interface ICreateNewCustomerForm {
  toggle: () => void;
  fromCustomer: boolean;
}

const CreateNewCustomerForm = ({
  toggle,
  fromCustomer,
}: ICreateNewCustomerForm) => {
  const navigate = useNavigate();
  const { saveCustomer } = useCustomerContext();
  const [addNewCustomer, setAddNewCustomer] =
    useState<ICustomerObject>(initialStateCustomer);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveCustomer(addNewCustomer);
  };

  const handleCancleButton = () => {
    //   history.location.pathname === routes.dashboard
    //   //     ? history.push(routes.customersAll)
    //   //     : history.goBack();
    // }
    {
      navigate(routes.customersAll);
    }
  };
  const handleCutomerInput =
    (prop: keyof ICustomerObject) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setAddNewCustomer({ ...addNewCustomer, [prop]: event.target.value });
    };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        className="load-item container p-4"
        style={{ zoom: "0.9" }}
      >
        <Row className="px-5">
          <Col lg={6} md={6} sm={12} className="px-3">
            <FormGroup>
              <Label for="company_name">Company Name</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                type="text"
                name="company_name"
                id="company_name"
                value={addNewCustomer.company_name}
                onChange={handleCutomerInput("company_name")}
              />
            </FormGroup>
          </Col>
          <Col lg={3} md={6} sm={12} className="px-3">
            <h6 className="fw-bold">Customer Type</h6>
            <FormGroup check inline>
              <Input
                type="checkbox"
                // checked={formState.broker}
                name="broker"
                // onChange={handleCheckboxChange("SET_broker")}
              />
              <Label check>Broker</Label>
            </FormGroup>
            <FormGroup check inline>
              <Input
                type="checkbox"
                // checked={formState.shipperOrReceiver}
                name="shipperOrReceiver"
                // onChange={handleCheckboxChange("SET_shipperOrReceiver")}
              />
              <Label check>Shipper/Receiver</Label>
            </FormGroup>
          </Col>
          <Col lg={3} md={6} sm={12} className="px-3">
            <FormGroup tag="fieldset">
              <h6 className="fw-bold">Billing</h6>
              <div className="d-flex gap-2">
                <FormGroup check>
                  <Input
                    name="radio1"
                    type="radio"
                    value={"Direct Billing"}
                    // checked={formState.radiovalue === "Direct Billing"}
                    // onChange={handleInput("SET_radiovalue")}
                  />
                  <Label check>Direct Billing</Label>
                </FormGroup>
                <FormGroup check>
                  <Input
                    name="radio1"
                    type="radio"
                    value={"Factoring"}
                    // checked={formState.radiovalue === "Factoring"}
                    // onChange={handleInput("SET_radiovalue")}
                  />
                  <Label check>Factoring</Label>
                </FormGroup>
              </div>
            </FormGroup>
          </Col>
        </Row>
        <Row className="px-5">
          <Col lg={6} md={6} sm={12} className="px-3">
            <FormGroup>
              <Label for="addressLine1">Address Line1</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                type="text"
                name="addressLine1"
                id="addressLine1"
                value={addNewCustomer.address_line1}
                onChange={handleCutomerInput("address_line1")}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="px-5">
          <Col lg={6} md={6} sm={12} className="px-3">
            <FormGroup>
              <Label for="addressLine2">Address Line2</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                type="text"
                name="addressLine2"
                id="addressLine2"
                // value={formState.addressLine2}
                // onChange={handleInput("SET_addressLine2")}
              />
            </FormGroup>
          </Col>
          <Col lg={3} md={6} sm={12} className="px-3">
            <FormGroup>
              <Label for="quickPayFee">Quick Pay Fee</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                type="text"
                //  value={formState.quickPayFee}
                name="quickPayFee"
                id="quickPayFee"
                //  onChange={handleInput("SET_quickPayFee")}
              />
            </FormGroup>
          </Col>
          <Col lg={3} md={6} sm={12} className="px-3">
            <FormGroup>
              <Label for="factoring">Factoring</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                type="text"
                // value={formState.factoring}
                name="factoring"
                id="factoring"
                // onChange={handleInput("SET_factoring")}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="px-5">
          <Col lg={3} md={6} sm={12} className="px-3">
            <FormGroup>
              <Label for="phone">Phone</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                type="text"
                // value={formState.phone}
                name="phone"
                id="phone"
                // onChange={handleInput("SET_phone")}
              />
            </FormGroup>
          </Col>
          <Col lg={3} md={6} sm={12} className="px-3">
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                type="email"
                // value={formState.email}
                name="email"
                id="email"
                // onChange={handleInput("SET_email")}
              />
            </FormGroup>
          </Col>
          <Col lg={3} md={6} sm={12} className="px-3">
            <FormGroup>
              <Label for="stauts">Status</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                type="text"
                // value={formState.stauts}
                name="stauts"
                id="stauts"
                // onChange={handleInput("SET_stauts")}
              />
            </FormGroup>
          </Col>
          <Col lg={3} md={6} sm={12} className="px-3">
            <FormGroup>
              <Label for="credit">Credit</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                type="text"
                // value={formState.credit}
                name="credit"
                id="credit"
                // onChange={handleInput("SET_credit")}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="px-5">
          <Col lg={3} md={6} sm={12} className="px-3">
            <FormGroup>
              <Label for="city">City</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                type="text"
                // value={formState.city}
                name="city"
                id="city"
                // onChange={handleInput("SET_city")}
              />
            </FormGroup>
          </Col>
          <Col lg={3} md={6} sm={12} className="px-3">
            <FormGroup>
              <Label for="state">State</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                type="text"
                // value={formState.state}
                name="state"
                id="state"
                // onChange={handleInput("SET_state")}
              />
            </FormGroup>
          </Col>
          <Col lg={3} md={6} sm={12} className="px-3"></Col>
          <Col lg={3} md={6} sm={12} className="px-3">
            <FormGroup>
              <Label for="payTerms">Pay Terms</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                type="text"
                // value={formState.payTerms}
                name="payTerms"
                id="payTerms"
                // onChange={handleInput("SET_payTerms")}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="px-5">
          <Col lg={3} md={6} sm={12} className="px-3">
            <FormGroup>
              <Label for="zip">Zip</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                type="text"
                // value={formState.zip}
                name="zip"
                id="zip"
                // onChange={handleInput("SET_zip")}
              />
            </FormGroup>
          </Col>
          <Col lg={3} md={6} sm={12} className="px-3"></Col>
          <Col lg={3} md={6} sm={12} className="px-3"></Col>
          <Col lg={3} md={6} sm={12} className="px-3">
            <FormGroup>
              <Label for="avgDaysToPay">Avg. Days To Pay</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                type="text"
                // value={formState.avgDaysToPay}
                name="avgDaysToPay"
                id="avgDaysToPay"
                // onChange={handleInput("SET_avgDaysToPay")}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="px-5">
          <Col lg={3} md={6} sm={12} className="px-3">
            <FormGroup>
              <Label for="fid">FID/EIN</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                type="text"
                // value={formState.fid}
                name="fid"
                id="fid"
                // onChange={handleInput("SET_fid")}
              />
            </FormGroup>
          </Col>
          <Col lg={3} md={6} sm={12} className="px-3">
            <FormGroup>
              <Label for="mc">MC</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                type="text"
                // value={formState.mc}
                name="mc"
                id="mc"
                // onChange={handleInput("SET_mc")}
              />
            </FormGroup>
          </Col>
        </Row>
        <Row className="px-5">
          <Col lg={6} md={6} sm={12} className="px-3">
            <FormGroup>
              <Label for="notes">Notes</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                type="textarea"
                // value={formState.notes}
                name="notes"
                id="notes"
                // onChange={handleInput("SET_notes")}
              />
            </FormGroup>
          </Col>
          <Col lg={6} md={6} sm={12} className="px-3">
            <FormGroup
              className="d-flex justify-content-end align-self-center mt-5"
              style={{ bottom: "0", right: "0" }}
            >
              <Button className="me-3 save-button" size="sm">
                <BiCheck fontSize={"16px"} />
                Save
              </Button>
              {fromCustomer ? (
                <Button
                  size="sm"
                  className="cancel-button"
                  onClick={handleCancleButton}
                >
                  <RxCross2 fontSize={"16px"} color="red" /> Cancel
                </Button>
              ) : (
                <Button size="sm" className="cancel-button" onClick={toggle}>
                  <RxCross2 fontSize={"16px"} color="red" />
                  Close
                </Button>
              )}
            </FormGroup>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default CreateNewCustomerForm;
