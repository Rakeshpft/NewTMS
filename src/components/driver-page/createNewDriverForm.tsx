import React, { useState } from "react";
import {
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  TabPane,
  Button,
} from "reactstrap";
import {
  IDriverObject,
  initialStateDriver,
} from "../context/Driver/driver.types";
import { useDriverContext } from "../context/Driver/driver.reducer";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import TabPage from "./tab-page";
import { useNavigate } from "react-router-dom";
import { routes } from "../routes/routes";

interface ICreateNewDriverForm {
  toggle: () => void;
  isDriverFormOpen: boolean;
}
const CreateNewDriverForm = ({ toggle , isDriverFormOpen }: ICreateNewDriverForm) => {

  const { saveDriver } = useDriverContext();

  const navigate = useNavigate();
  const [addNewDriver, setAddNewDriver] = useState<IDriverObject>(initialStateDriver);
  

  const handleAddDriverInput =
    (prop: keyof IDriverObject) =>
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setAddNewDriver({ ...addNewDriver, [prop]: event.target.value });

  const handleDriverSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveDriver(addNewDriver);
    console.log(addNewDriver);
  };

  const handleCancleButton = () => {
    // {
    //   history.location.pathname === routes.dashboard
    //     ? history.push(routes.driverpageAll)
    //     : history.goBack();
    // }
    {
      navigate(routes.driverpageAll);
    }
  };

  return (
    <>
      <Form className="load-item container p-4">
        <Row>
          <Col md={4} lg={3} sm={6}>
            <FormGroup>
              <Label for="examplefName">FirstName</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                type="text"
                value={addNewDriver.first_name}
                name="firstName"
                id="examplefName"
                onChange={handleAddDriverInput("first_name")}
              />
            </FormGroup>
          </Col>
          <Col md={4} lg={3} sm={6}>
            {/* {selectedImage ? (
                    <img
                      src={selectedImage as string}
                      alt="Profile"
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                      className="mt-2"
                    />
                  ) : (
                    <img
                      src={require("../../../../public/images/user-avatar.png")}
                      style={{
                        width: "50px",
                        height: "50px",
                        borderRadius: "50%",
                      }}
                      className="mt-2"
                    />
                  )} */}
            <Label
              htmlFor="exampleFileFile"
              className="custom-file-upload-label"
            >
              <span className="custom-file-upload">Upload Photo</span>
              <Input
                type="file"
                id="exampleFileFile"
                name="file"
                accept="image/*"
                // onChange={handleImageChange}
                className="d-none"
              />
            </Label>
          </Col>
          <Col md={4} lg={3} sm={6}>
            <FormGroup>
              <Label for="examplestauts">Status</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                id="examplestauts"
                name="stauts"
                type="text"
                //  value={addNewDriver.status_id}
                //  onChange={handleInput("SET_Stauts")}
              />
            </FormGroup>
          </Col>
          <Col md={4} lg={3} sm={6} className="mt-4">
            <FormGroup check>
              <Input
                type="checkbox"
                name="createNewPartner"
                // checked={state.createNewPartner}
                // onChange={handleCheckboxChange("SET_createNewPartner")}
              />
              <Label check>Create New Partner</Label>
            </FormGroup>
          </Col>
          <Col md={4} lg={3} sm={6}>
            <FormGroup>
              <Label for="examplelName">LastName</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                id="examplelName"
                name="lastName"
                type="text"
                // value={state.lastName}
                // onChange={handleInput("SET_lastName")}
              />
            </FormGroup>
          </Col>

          <Col md={4} lg={3} sm={6}>
            <FormGroup>
              <Label for="exampledob">D.O.B</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                id="exampledob"
                name="dob"
                type="date"
                // value={state.dob}
                // onChange={handleInput("SET_dob")}
              />
            </FormGroup>
          </Col>
          <Col md={4} lg={3} sm={6}>
            <FormGroup>
              <Label for="exampleappdate">Application Date</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                id="exampleappdate"
                name="appDate"
                type="date"
                value={addNewDriver.application_date}
                onChange={handleAddDriverInput("application_date")}
              />
            </FormGroup>
          </Col>
          <Col md={4} lg={3} sm={6}>
            <FormGroup>
              <Label for="examplepay">Pay To</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                id="examplepay"
                name="payTo"
                type="text"
                value={addNewDriver.pay_to_id}
                onChange={handleAddDriverInput("pay_to_id")}
              />
            </FormGroup>
          </Col>
          <Col md={4} lg={3} sm={6}>
            <FormGroup>
              <Label for="examplephone">Phone</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                id="examplephone"
                name="phone"
                type="text"
                value={addNewDriver.phone}
                onChange={handleAddDriverInput("phone")}
              />
            </FormGroup>
          </Col>
          <Col md={4} lg={3} sm={6}>
            <FormGroup>
              <Label for="exampleemail">Email</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                id="exampleemail"
                name="email"
                type="email"
                value={addNewDriver.email}
                onChange={handleAddDriverInput("email")}
              />
            </FormGroup>
          </Col>
          <Col md={4} lg={3} sm={6}>
            <FormGroup>
              <Label for="examplehiredate">Hire Date</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                id="examplehiredate"
                name="hireDate"
                type="date"
                value={addNewDriver.hire_date}
                onChange={handleAddDriverInput("hire_date")}
              />
            </FormGroup>
          </Col>
          <Col md={4} lg={3} sm={6}>
            <FormGroup>
              <Label for="examplecoDriver">Co-Driver</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                id="examplecoDriver"
                name="coDriver"
                type="text"
                value={addNewDriver.codriver_name}
                onChange={handleAddDriverInput("codriver_name")}
              />
            </FormGroup>
          </Col>
          <Col md={4} lg={6} sm={6}>
            <FormGroup>
              <Label for="exampleaddressLine1">Address Line 1</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                id="exampleaddressLine1"
                name="addressline1"
                type="text"
                value={addNewDriver.address_line1}
                onChange={handleAddDriverInput("address_line1")}
              />
            </FormGroup>
          </Col>
          <Col md={4} lg={3} sm={6}>
            <FormGroup>
              <Label for="examplefuleCard">Fuel Card #</Label>
              {/* <Input
                     bsSize="sm"
                     className="form-control form-control-sm"
                     id="exampletruck"
                     name="truck"
                     type="text"
                     value={state.fuelCard}
                     onChange={(e) => {
                       dispatch({
                         type: "SET_fuelCard",
                         payload: e.target.value,
                       });
                     }}
                   /> */}
            </FormGroup>
          </Col>
          <Col md={4} lg={3} sm={6}>
            <FormGroup>
              <Label for="exampletruck">Truck</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                id="exampletruck"
                name="truck"
                type="text"
                value={addNewDriver.truck_id}
                onChange={handleAddDriverInput("truck_id")}
              />
            </FormGroup>
          </Col>
          <Col md={4} lg={3} sm={6}>
            <FormGroup>
              <Label for="exampleaddressLine1">Address Line 2</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                id="exampleaddressLine2"
                name="addressline2"
                type="text"
                value={addNewDriver.address_line2}
                onChange={handleAddDriverInput("address_line2")}
              />
            </FormGroup>
          </Col>
          <Col md={4} lg={3} sm={6}>
            <FormGroup>
              <Label for="examplecity">City</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                id="examplecity"
                name="city"
                type="text"
                value={addNewDriver.city}
                onChange={handleAddDriverInput("city")}
              />
            </FormGroup>
          </Col>
          <Col md={4} lg={3} sm={6}></Col>
          <Col md={4} lg={3} sm={6}>
            <FormGroup>
              <Label for="exampletrailer">Trailer</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                id="exampletrailer"
                name="trailer"
                type="text"
                value={addNewDriver.trailer_id}
                onChange={handleAddDriverInput("trailer_id")}
              />
            </FormGroup>
          </Col>

          <Col md={4} lg={3} sm={6}>
            <FormGroup>
              <Label for="examplestate">State</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                id="examplestate"
                name="state"
                type="text"
                // value={state.state}
                // onChange={handleInput("SET_state")}
              />
            </FormGroup>
          </Col>
          <Col md={4} lg={3} sm={6}>
            <FormGroup>
              <Label for="examplezip">Zip</Label>
              <Input
                bsSize="sm"
                className="form-control form-control-sm"
                id="examplezip"
                name="zip"
                type="text"
                value={addNewDriver.zipcode}
                onChange={handleAddDriverInput("zipcode")}
              />
            </FormGroup>
          </Col>
          <Col md={4} lg={3} sm={6}></Col>
          <Col md={4} lg={3} sm={6} className="mt-4">
            <FormGroup check>
              <Input
                type="checkbox"
                // checked={state.ifta}
                name="ifta"
                // onChange={handleCheckboxChange("SET_ifta")}
              />
              <Label check>IFTA Handled by Company</Label>
            </FormGroup>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={8}>
            <TabPage
              tabTitles={[
                "Pay Rates",
                "Sechedule Payments/Deductions",
                "Additional Payee",
                "Notes",
              ]}
            >
              <TabPane tabId={1}>
                <Row className="mt-3 px-4">
                  <Col>
                    <Row>
                      <Col sm={6} lg={3}>
                        <FormGroup check>
                          <Input
                            name="radio2"
                            type="radio"
                            value="Company Driver"
                            // checked={
                            //    state.radiovalue1 === "Company Driver"
                            // }
                            // onChange={handleInput("SET_radiovalue1")}
                          />
                          <Label check>Company Driver</Label>
                        </FormGroup>
                      </Col>
                      <Col sm={6} lg={3}>
                        <FormGroup check>
                          <Input
                            name="radio2"
                            type="radio"
                            value={"Owner Operator"}
                            // checked={
                            //   state.radiovalue1 === "Owner Operator"
                            // }
                            // onChange={handleInput("SET_radiovalue1")}
                          />
                          <Label check>Owner Operator</Label>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col sm={6} lg={3}>
                        <FormGroup check>
                          <Input
                            name="radio1"
                            type="radio"
                            value={"Per Mile"}
                            // checked={state.radiovalue2 === "Per Mile"}
                            // onChange={handleInput("SET_radiovalue2")}
                          />
                          <Label check>Per Mile</Label>
                        </FormGroup>
                      </Col>
                      <Col sm={6} lg={3}>
                        <FormGroup check>
                          <Input
                            name="radio1"
                            type="radio"
                            value={"Freight %"}
                            // checked={state.radiovalue2 === "Freight %"}
                            // onChange={handleInput("SET_radiovalue2")}
                          />
                          <Label check>Freight %</Label>
                        </FormGroup>
                      </Col>
                      <Col sm={6} lg={3}>
                        <FormGroup check>
                          <Input
                            name="radio1"
                            type="radio"
                            value={"Flat Pay"}
                            // checked={state.radiovalue2 === "Flat Pay"}
                            // onChange={handleInput("SET_radiovalue2")}
                          />
                          <Label check>Flat Pay</Label>
                        </FormGroup>
                      </Col>
                      <Col sm={6} lg={3}>
                        <FormGroup check>
                          <Input
                            name="radio1"
                            type="radio"
                            value={"Hourly"}
                            //  checked={state.radiovalue2 === "Hourly"}
                            //  onChange={handleInput("SET_radiovalue2")}
                          />
                          <Label check>Hourly</Label>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col sm={6} lg={3}>
                        <FormGroup>
                          <Label for="exampleperMile">Per Mile</Label>
                          <Input
                            bsSize="sm"
                            id="exampleperMile"
                            name="permiles"
                            type="text"
                            //value={state.permiles}
                            //onChange={handleInput("SET_permiles")}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm={6} lg={3}>
                        <FormGroup>
                          <Label for="exampleperExtraStop">
                            Per Extra Stop
                          </Label>
                          <Input
                            bsSize="sm"
                            id="exampleperExtraStop"
                            name="perExtraStop"
                            type="text"
                            // value={state.perExtraStop}
                            // onChange={handleInput("SET_perExtraStop")}
                          />
                        </FormGroup>
                      </Col>
                      <Col sm={6} lg={3}>
                        <FormGroup>
                          <Label for="exampleperEmptyMile">
                            Per Empty Mile
                          </Label>
                          <Input
                            bsSize="sm"
                            id="exampleperEmptyMile"
                            name="perEmptyMiles"
                            type="text"
                            //  value={state.perEmptyMiles}
                            //  onChange={handleInput("SET_perEmptyMiles")}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </TabPane>
            </TabPage>
          </Col>
          <Col md={4} className="d-flex justify-content-end align-items-end">
            <Button
              color="info"
              size="sm"
              className="me-3 save-button"
              onClick={handleDriverSubmit}
              type="submit"
            >
              <BiCheck fontSize={"16px"} />
              Save
            </Button>
            { isDriverFormOpen ? (
            <Button
              size="sm"
              className="cancel-button"
              onClick={handleCancleButton}
            >
              <RxCross2 fontSize={"16px"} color="red" /> cancel
            </Button>
            ) : (
            <Button size="sm" className="cancel-button" onClick={toggle}>
              <RxCross2 fontSize={"16px"} color="red" />
              Close
            </Button>
            )}

          </Col>
        </Row>
      </Form>
    </>
  );
};

export default CreateNewDriverForm;
