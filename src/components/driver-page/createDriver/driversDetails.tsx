import React, { useState } from "react";
import {
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Form,
} from "reactstrap";
import { IDriverManagenetProps } from "../../../services/tms-objects/driver.types";

const DriversDetails = ( prop : IDriverManagenetProps) => {

  const { 
    newDriver ,
    handleInputChange ,
    handleCloseForm ,
    driverType ,
    driverStatus ,
    handleCheckboxChange,
    SaveDriverIndividual,
    vendorList,
    truckListStatus,
    trailerListStatus,
    driverPayRates,
    handleInputDriverPayRates,
    handleImageChange
   } = prop

    const [activeRowTab, setActiveRowTab] = useState(0);

  return(
    <Form onSubmit={SaveDriverIndividual} encType="multipart/form-data">
    <Row className="page-content">
            <Row className="page-subtitle">
              <Col>Basic Details</Col>
            </Row>
            <Row>
              <Col md={9}>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="first_name">First Name</Label>
                      <Input bsSize="sm" className="form-control form-control-sm" type="text" id="first_name" value={newDriver.first_name}onChange={handleInputChange("first_name")} />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="last_name">Last Name</Label>
                      <Input bsSize="sm" className="form-control form-control-sm"  type="text" id="last_name" value={newDriver.last_name} onChange={handleInputChange("last_name")} /> 
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for=" birth">D.O.B</Label>
                      <Input bsSize="sm"  className="form-control form-control-sm"  type="date" id="birth" value={newDriver.dob.toString()}  onChange={handleInputChange("dob")} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="email">E-mail</Label>
                      <Input bsSize="sm" className="form-control form-control-sm" type="text" id="email"  value={newDriver.email} onChange={handleInputChange("email")} />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="phone">Phone</Label>
                      <Input bsSize="sm" className="form-control form-control-sm" type="text" id="phone" value={newDriver.contact_number} onChange={handleInputChange("contact_number")}
                        
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="address">Address</Label>
                      <Input bsSize="sm" className="form-control form-control-sm" type="text"  id="address"    value={newDriver.street_number} onChange={handleInputChange("street_number")}   
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="location">Loacation</Label>
                      <Input bsSize="sm" className="form-control form-control-sm" type="text" id="location"  value={newDriver.suite_number} onChange={handleInputChange("suite_number")}
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="unit">State</Label>
                      <Input bsSize="sm" className="form-control form-control-sm" type="select" id="unit"  
                      />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="zipcode">ZIP</Label>
                      <Input bsSize="sm" className="form-control form-control-sm" type="text" id="zipcode" value={newDriver.zipcode} onChange={handleInputChange("zipcode")}   
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </Col>
              <Col md={3} className="mt-4">
                <div className="align-items-center text-center">
                  <div className="user-avatar me-2">
                    <img width="120" height="120" className="rounded-circle" src={newDriver.driver_images}/>
                  </div>
                 
                    <Input type="file" name="file" id="file" accept="image/*" onChange={handleImageChange} />
                 
                  <Label className="page-subtitle">Upload Photo</Label>
                </div>
              </Col>
            </Row>
            <Row className="page-subtitle">
              <Col>Employement Details</Col>
            </Row>
            <Row>
              <Col md={9}>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="ELDprovider">Driver Type</Label>
                      <Input  bsSize="sm" className="form-control form-control-sm" type="select" value={newDriver.driver_type_id} onChange={handleInputChange("driver_type_id")}>
                        <option value = {0}> Select Driver type </option>
                        { driverType && driverType.map((driver) => (

                          <option key={driver.driver_type_id} value={driver.driver_type_id}>
                            {driver.driver_type_name}
                          </option>
                        ))}
                      </Input>
                    </FormGroup>
                  </Col>
                 
                  <Col md={4}>
                  { driverType && driverType.map((driver) => (

                        driver.driver_type_name === "Vendor/Driver" && (
                          
                          <FormGroup>
                      <Label for="vendor">Vendor</Label>
                      <Input bsSize="sm" className="form-control form-control-sm" type="select" id="vendor" value={newDriver.vendor_id}   onChange={handleInputChange("vendor_id")} >
                        <option value={0}> Select Vendor </option>
                        {
                          vendorList && vendorList.map((vendor) => (
                            <option key={vendor.vendor_id} value={vendor.vendor_id}>
                              {vendor.first_name}
                            </option>
                          ))
                        }
                      </Input>
                    </FormGroup>
                        )
                     
                      ))}
                    
                  </Col>
                  <Col md={4}>
                    <FormGroup check>
                      <Label for="ifta">IFTA Handled by Company </Label>
                      <Input  bsSize="sm" className="form-control form-control-sm" type="checkbox"  checked = {newDriver.is_IFTA_handled_by_company} onChange={handleCheckboxChange} />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="status">Status</Label>
                      <Input bsSize="sm" className="form-control form-control-sm"  type="select" id="status"  value={newDriver.driver_status_id}  onChange={handleInputChange("driver_status_id")} >
                        <option value={0}> Select Status </option>
                        {
                          driverStatus && driverStatus.map((status) => (
                            <option key={status.driver_status_id} value={status.driver_status_id}>
                              {status.driver_status_name}
                            </option>
                          ))
                        }
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="application">Application Date</Label>
                      <Input bsSize="sm" className="form-control form-control-sm" type="date" id="application" />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="date">Hire Date</Label>
                      <Input  bsSize="sm"  className="form-control form-control-sm"  type="date" id="date"  />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="truck">Truck</Label>
                      <Input bsSize="sm" className="form-control form-control-sm" type="select" id="truck" value={newDriver.truck_id} onChange={handleInputChange("truck_id")} >
                       {
                         truckListStatus && truckListStatus.map((truck) => (
                           <option key={truck.truck_id} value={truck.truck_id}>
                             { truck.lease_lessor_name }
                           </option>
                         ))
                       } 
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="trailer">Trailer</Label>
                      <Input bsSize="sm" className="form-control form-control-sm" type="select"  id="trailer" value={newDriver.trailer_id} onChange={handleInputChange("trailer_id")}    
                      >
                        <option value={0}> Select Trailer </option>
                        {
                          trailerListStatus && trailerListStatus.map((trailer) => (
                            <option key={trailer.trailer_id} value={trailer.trailer_id}>
                              { trailer.lease_lessor_name }
                            </option>
                          ))
                        }
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="fuelcard">Fuel Card #</Label>
                      <Input bsSize="sm" className="form-control form-control-sm" type="select"  id="fuelcard"  >  
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
              </Col>

              <Col md={3}></Col>
            </Row>
            <Row className="page-subtitle">
              <Col>Pay Rates</Col>
            </Row>
            <Row>
              <Col md={9}>
                <Row className="driver-basic-details ps-3 ">
                  <Col className="d-flex gap-2 mt-2">
                    <FormGroup check>
                      <Input name="radio2" type="radio" onClick={() => setActiveRowTab(1)}/>
                      <Label check>Per Mile</Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input name="radio2" type="radio" onClick={() => setActiveRowTab(2)}/>
                      <Label check>Freight Percentage </Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input name="radio2" type="radio" onClick={() => setActiveRowTab(3)} />
                      <Label check>Flat Pay</Label>
                    </FormGroup>
                    <FormGroup check>
                      <Input name="radio2" type="radio" onClick={() => setActiveRowTab(4)} />
                      <Label check>Hourly </Label>
                    </FormGroup>
                  </Col>
                </Row>
                {activeRowTab === 1 && (
                  <Row>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="unit">Per Mile </Label>
                        <Input bsSize="sm" className="form-control form-control-sm" type="text" value={driverPayRates.per_mile} onChange={handleInputDriverPayRates("per_mile")} />
                       </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="extrastop">Per Extra Stop</Label>
                        <Input bsSize="sm" className="form-control form-control-sm"  type="text"  id="extrastop"   value={driverPayRates.per_extra_stop} onChange={handleInputDriverPayRates("per_extra_stop")}
                        />
                      </FormGroup>
                    </Col>
                    <Col md={4}>
                      <FormGroup>
                        <Label for="emptymile">Per Empty Mile </Label>
                        <Input bsSize="sm" className="form-control form-control-sm" type="text" id="emptymile" value={driverPayRates.per_empty_mile} onChange={handleInputDriverPayRates("per_empty_mile")}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                )}
                {activeRowTab === 2 && 
               ( <Row>
                <Col md={4}>
                  <FormGroup>
                    <Label for="percentage">Percentage (e.g.80%) </Label>
                    <Input bsSize="sm" className="form-control form-control-sm" type="text" id="percentage" value={driverPayRates.amount} onChange={handleInputDriverPayRates("amount")} />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="unit">Per Extra Stop</Label>
                    <Input bsSize="sm" className="form-control form-control-sm" type="text" id="unit" value={driverPayRates.per_extra_stop} onChange={handleInputDriverPayRates("per_extra_stop")} />
                  </FormGroup>
                </Col>
                
              </Row>
              )}
                {activeRowTab === 3 && (
                  <Row>
                    <Col>
                  <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="period">Period </Label>
                      <Input bsSize="sm" className="form-control form-control-sm" type="select" id="period" value={driverPayRates.period} onChange={handleInputDriverPayRates("period")} />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="amount">Amount</Label>
                      <Input bsSize="sm" className="form-control form-control-sm" type="text" id="amount" value={driverPayRates.amount} onChange={handleInputDriverPayRates("amount")} />
                    </FormGroup>
                  </Col>
                  
                </Row>
                <Row>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="startingon"> Starting On </Label> <Input bsSize="sm" className="form-control form-control-sm" type="date" id="startingon" value={driverPayRates.starting_on} onChange={handleInputDriverPayRates("starting_on")} />
                    </FormGroup>
                  </Col>
                  <Col md={4}>
                    <FormGroup>
                      <Label for="extrastop">Per Extra Stop</Label>
                      <Input  bsSize="sm" className="form-control form-control-sm"  type="text"  id="extrastop"  value={driverPayRates.per_extra_stop} onChange={handleInputDriverPayRates("per_extra_stop")} />
                    </FormGroup>
                  </Col>
                </Row>
                </Col>
                </Row>
                )}
              
              {activeRowTab === 4 && 
               ( <Row>
                <Col md={4}>
                  <FormGroup>
                    <Label for="perhour">Per Hour</Label>
                    <Input
                      bsSize="sm" className="form-control form-control-sm"  type="text"  id="perhour" value={driverPayRates.per_hour}  onChange={handleInputDriverPayRates("per_hour")}  />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label for="extrastop">Per Extra Stop</Label>
                    <Input bsSize="sm" className="form-control form-control-sm" type="text" id="extrastop" value={driverPayRates.per_extra_stop} onChange={handleInputDriverPayRates("per_extra_stop")}  />
                  </FormGroup>
                </Col>
                
              </Row>
              )}
              </Col>
              <Col
                md={3}
                className=" d-flex justify-content-end align-items-end pb-3"
              >
                <Button
                  color="primary" size="sm" className="me-3 save-button" type="submit"
                >    
                Save
                </Button>

                <Button className="cancel-button" size="sm" onClick={handleCloseForm}>
                  Close
                </Button>
              </Col>
            </Row>
          </Row>
          </Form>
  )
};

export default DriversDetails;
