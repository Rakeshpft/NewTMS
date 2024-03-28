// import { Form, useNavigate } from "react-router-dom";
// import { routes } from "../routes/routes";
import React from "react";
import {
  // Form,
  // Row,
 
  TabPane,
} from "reactstrap";


import TabPage from "../../driver-page/tab-page";

import CommonLayOut from "../../../layout";
import CustomerDetails from "./customer_detail/customerDetails";
import CustomerDocuments from "./customer_documents/customerDocuments";
import { ICustomerManagementProps } from "../../../services/tms-objects/customer.types";


// import { ICustomerManagementProps } from "../../../services/tms-objects/customer.types";



  // const navigate = useNavigate();

  // {
  //   navigate(routes.driverpageAll);
  const CreateNewCustomerForm = ( props : ICustomerManagementProps)=>{
    const{
      CustomerNewDetails,
      handleSaveCustomer,
      handleInputChange,
      setcustomerNewDetails,
      handleClose,
      selectedCustomer,
      title,
      
      // handleFileUpload,
      handleCheckBoxShipper,
      handleCheckBoxBroker,
      handleDirectBillingRadio,
      handleFactoringRadio,
    
    }= props;
  
 
   
  
  
    
  // }

  return (
    <>
    <CommonLayOut>
      {/* <div> */}
        
      {/* <Form onSubmit={handleSaveCustomer}>
        <Row className="page-title">
        
          <h5>
            {title ? "New Customer " : "Edit Customer"}</h5>
        </Row> */}
        <TabPage tabTitles={["Details", "Documents"]}>
          {/* <TabPane tabId={1} className="Details">
            
            <Row className="Customer-basic-details my-3">
              <Row className="page-subtitle">
                <h6>Basic Details</h6>
              </Row>

              <Row className="page-content align-items-center">
                <Col md={3} className="d-flex align-items-center">
                  <FormGroup >
                    <Label for="fullName">Customer Type</Label>
                    <div className="d-flex justify-content-between">
                    <FormGroup check className="checkbox-inline me-3">
                      <Input type="checkbox" id="is_broker" 
                      value={CustomerNewDetails.is_broker}
                      onChange={handleInputChange("is_broker")} />
                      <Label for="brokerCheckbox" check className="checkbox-label">
                        Broker
                      </Label>
                    </FormGroup>
                    <FormGroup check className="checkbox-inline">
                      <Input type="checkbox" id="is_shipper_receiver"
                       value={CustomerNewDetails.is_shipper_receiver}
                       onChange={handleInputChange("is_shipper_receiver")} />
                      <Label
                        for="shipperReceiverCheckbox"
                        check
                        className="checkbox-label"
                       
                      >
                        Shipper/Receiver
                      </Label>
                    </FormGroup>
                    </div>
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label for="first Name">First Name</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      id="first_name"
                      name="first_name"
                      value={CustomerNewDetails.first_name}
                       onChange={handleInputChange("first_name")} 
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="last Name">Last Name</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      id="last_name"
                      name="last_name"
                      value={CustomerNewDetails.last_name}
                      onChange={handleInputChange("last_name")} 
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="Email">Email</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      id="email"
                      name="email"
                      value={CustomerNewDetails.email}
                      onChange={handleInputChange("email")} 
                    />
                  </FormGroup>
                </Col>

              </Row>
              <Row className="page-content align-items-center">
                <Col md={3}>
                  <FormGroup>
                    <Label for="Phone">Phone</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      id="phone"
                      name="phone"
                      value={CustomerNewDetails.phone}
                      onChange={handleInputChange("phone")} 
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="Suit No.">Suit No.</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      id="suite_number"
                      name="suite_number"
                      value={CustomerNewDetails.suite_number}
                      onChange={handleInputChange("suite_number")} 
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="Street No">Street No.</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      id="street_number"
                      name="street_number"
                      value={CustomerNewDetails.street_number}
                      onChange={handleInputChange("street_number")} 
                    />
                  </FormGroup>
                </Col>

                <Col md={3}>
                  <FormGroup>
                    <Label for="City">City</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      id="city"
                      name="city"
                      value={CustomerNewDetails.city}
                      onChange={handleInputChange("city")} 
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="page-content align-items-center">       
               <Col md={3}>
                <FormGroup>
                  <Label for="State">State</Label>
                  <Input
                    bsSize="sm"
                    className="form-control form-control-sm"
                    type="select"
                    id="state_id"
                    name="state_id"
                    value={CustomerNewDetails.state_id}
                    onChange={handleInputChange("state_id")} 
                  />
                </FormGroup>
              </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="Zip code">ZIP</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      id="zipcode"
                      name="zipcode"
                      value={CustomerNewDetails.zipcode}
                      onChange={handleInputChange("zipcode")} 
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="unit">Description</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      id="description"
                      name="description"
                      value={CustomerNewDetails.description}
                      onChange={handleInputChange("description")} 
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
              <FormGroup>
                <Label for="Status">Status</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="select"
                  id="status_id"
                  name="status_id"
                  value={CustomerNewDetails.status_id}
                  onChange={handleInputChange("status_id")} 
                />
              </FormGroup>
            </Col>


              </Row>
            </Row>

            <Row className="Customer-Company-details">
              <Row className="page-subtitle">
                <h6>Company Details</h6>
              </Row>

              <Row className="page-content align-items-center">
                <Col md={3}>
                  <FormGroup>
                    <Label for="CompanyName">Company Name</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      id="company_name"
                      name="company_name"
                      value={CustomerNewDetails.company_name}
                      onChange={handleInputChange("company_name")} 
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="FID/EID">FID/EID</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      id="fid_ein"
                      name="fid_ein"
                      value={CustomerNewDetails.fid_ein}
                      onChange={handleInputChange("fid_ein")} 
                    />
                  </FormGroup>
                </Col>
                <Col md={3}>
                  <FormGroup>
                    <Label for="MC">MC
                    </Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      id="mc_number"
                      name="mc_number"
                      value={CustomerNewDetails.mc_number}
                      onChange={handleInputChange("mc_number")} 
                    />
                  </FormGroup>
                </Col>
                
              </Row>
            </Row>

            <Row className="Customer-basic-details">
          <Row className="page-subtitle">
            <h6>Billing</h6>
          </Row>

          <Row className="page-content align-items-center">
            <Col md={3} className="d-flex align-items-center">
              <FormGroup check className="checkbox-inline me-3">
                <Input
                  type="radio"
                  id="directBillingRadio"
                  checked={CustomerNewDetails.billing_type_id === true}
                    onChange={() => handleBillingTypeChange()}
                />
                <Label for="directBillingRadio" check className="radio-label">
                  Direct Billing
                </Label>
              </FormGroup>
              <FormGroup check className="checkbox-inline">
                <Input
                  type="radio"
                  id="factoringRadio"
                  checked={CustomerNewDetails.billing_type_id}
                
                  onChange={handleBillingTypeChange}
                />
                <Label
                  for="FactoringRadio"
                  check
                  className="radio-label"
                >
                  Factoring
                </Label>
              </FormGroup>
            </Col>

            <Col md={3}>
              {CustomerNewDetails.billing_type_id  && (
                <FormGroup>
                  <Label for="Factoring">Factoring</Label>
                  <Input
                    bsSize="sm"
                    className="form-control form-control-sm"
                    type="select"
                    id="factor_id"
                    name="factor_id"
                    value={CustomerNewDetails.factor_id}
                    onChange={handleInputChange("factor_id")} 
                  />
                </FormGroup>
              )}
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="Quick Pay">QuickPay</Label>
                <Input
                disabled
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                  id="quick_pay_fee"
                  name="quick_pay_fee"
                  value={CustomerNewDetails.quick_pay_fee}
                  onChange={handleInputChange("quick_pay_fee")} 
                />
              </FormGroup>
            </Col>
            
          </Row>
          <Row className="page-content align-items-center">
            <Col md={3}>
              <FormGroup>
                <Label for="Credit">Credit</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="select"
                  id="credit_id"
                  name="credit_id"
                  value={CustomerNewDetails.credit_id}
                  onChange={handleInputChange("credit_id")} 
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="Pay Terms">Pay Terms</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                  id="pay_terms"
                  name="pay_terms"
                  value={CustomerNewDetails.pay_terms}
                  onChange={handleInputChange("pay_terms")} 
                />
              </FormGroup>
            </Col>
            <Col md={3}>
              <FormGroup>
                <Label for="Avg. Days to Pay">Avg. Days to Pay</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                  id="avg_days_to_pay"
                  name="avg_days_to_pay"
                  value={CustomerNewDetails.avg_days_to_pay}
                  onChange={handleInputChange("avg_days_to_pay")} 
                />
              </FormGroup>
            </Col>
          </Row>
        <div className="d-flex justify-content-end">
          <Col
            md={3}
            className=" d-flex justify-content-end align-items-end pb-3"
          >
            
            <Button
              color="primary"
              size="sm"
              className="me-3 save-button"
              onClick={() => { handleSaveCustomer}}
              type="submit"
            >
              
              Save
            </Button>
            <Button className="cancel-button" size="sm" 
            color="danger" outline={true} onClick={ handleClose}
            >
             
              Close
            </Button>
          </Col>
          </div>
        </Row>
          </TabPane> */}
          <TabPane tabId={1} className="Details">
            <CustomerDetails
              CustomerNewDetails={CustomerNewDetails}
              setCustomerDetails={setcustomerNewDetails}
              handleInputChange={handleInputChange}
              selectedCustomer={selectedCustomer}
              handleSaveCustomer={handleSaveCustomer}
             
              title={title}
              handleClose={handleClose} 
              handleCheckBoxShipper={handleCheckBoxShipper}
              handleCheckBoxBroker={handleCheckBoxBroker}
              setcustomerNewDetails={setcustomerNewDetails} 
              handleDirectBillingRadio={handleDirectBillingRadio}
          handleFactoringRadio={handleFactoringRadio} 
                       />
          </TabPane>
          <TabPane tabId={2} className="Documents">
          {/* <div className="d-flex justify-content-end m-3">
          <Col
            md={3}
            className=" d-flex justify-content-end align-items-end pb-3"
          >
           
      <label className="page-subtitle">
        <Button onClick={
        handleFileUpload}>
          Upload
        </Button>
      </label>
            
          </Col>
          </div> */}
          <CustomerDocuments/>
            </TabPane>
        </TabPage>
      {/* </Form >
      </div> */}
      </CommonLayOut>
    </>
  );
};

export default CreateNewCustomerForm;
