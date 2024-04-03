import React, { useEffect, useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'

import { ICustomerDetails, TCustomerProps, initialStateCustomer,  } from '../../../../services/tms-objects/customer.types';
import { useListContext } from '../../../../services/reducer/list.reducer';
import { useCustomerContext } from '../../../../services/reducer/customer.reducer';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes/routes';
import { toastify } from '../../../../features/notification/toastify';


const CustomerDetails = (props: TCustomerProps) => {
    const {
        handleSubmit = undefined,
        customer_id =0,
        } = props

    const {getStateList,stateList,getCustomerStatusList,customerStatusList,getCreditList,creditList}= useListContext()
        const{getIdividualCustomerDetails,selectedCustomer,customerLoading,saveCustomer}=useCustomerContext();
       const [customerNewDetails, setcustomerNewDetails] = useState<ICustomerDetails>(initialStateCustomer);
       const navigate = useNavigate();

    useEffect(()=>{
        if(customer_id >0){
            getIdividualCustomerDetails(customer_id)
        }
        getStateList();
        getCustomerStatusList();
        getCreditList();
    }, []);

    useEffect(() => {
        if(!customerLoading && selectedCustomer && customer_id>0) {
            setcustomerNewDetails(selectedCustomer);
        }
    }, [customerLoading, selectedCustomer]);
   
    const handleInputChange =
    (prop: keyof ICustomerDetails) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setcustomerNewDetails({ ...customerNewDetails, [prop]: event.target.value });
      };

      const handleSaveCustomer = async (event: { preventDefault: () => void }) => {
          event.preventDefault();
       await saveCustomer(customerNewDetails).then((response) => {
            response?.success&& handleSubmit && handleSubmit(response.value);
            getIdividualCustomerDetails(response?.value.customer_id);
        //   handleClose();
          response && toastify({ message: response.message, type: (response.success ? "success" : "error") });
        });
    }

     const handleCheckBoxBroker = () => {
    setcustomerNewDetails({ ...customerNewDetails, is_broker: !customerNewDetails.is_broker });

  };
  const handleCheckBoxShipper = () => {
    setcustomerNewDetails({ ...customerNewDetails, is_shipper_receiver: !customerNewDetails.is_shipper_receiver });
  };

  const handleDirectBillingRadio = () => {
    setcustomerNewDetails({ ...customerNewDetails, billing_type_id: 1 });
  };

  const handleFactoringRadio = () => {
    setcustomerNewDetails({ ...customerNewDetails, billing_type_id: 2 });
  };

    const handleClose = () => {
        navigate(routes.customersAll);
    }
    
    return (
        <Form onSubmit={handleSaveCustomer}>
        
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
                                        checked={customerNewDetails.is_broker}
                                        onChange={handleCheckBoxBroker} />
                                    <Label for="brokerCheckbox" check className="checkbox-label">
                                        Broker
                                    </Label>
                                </FormGroup>
                                <FormGroup check className="checkbox-inline">
                                    <Input type="checkbox" id="is_shipper_receiver"
                                        checked={customerNewDetails.is_shipper_receiver}
                                        onChange={handleCheckBoxShipper} />
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
                                value={customerNewDetails.first_name}
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
                                value={customerNewDetails.last_name}
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
                                value={customerNewDetails.email}
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
                                value={customerNewDetails.phone}
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
                                value={customerNewDetails.suite_number}
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
                                value={customerNewDetails.street_number}
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
                                value={customerNewDetails.city}
                                onChange={handleInputChange("city")}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="page-content align-items-center">
                    <Col md={3}>
                        <FormGroup>
                            <Label for="State">State</Label>
                            <Input bsSize="sm" className="form-control form-control-sm"
                                type="select"
                                id="state_id"
                                name="state_id"
                                value={customerNewDetails.state_id}
                                onChange={handleInputChange("state_id")}>
                                  {stateList && stateList.map((item) => (
                                    <option key={item.state_id} value={item.state_id}>
                                        {item.state_name}
                                    </option>
                                ))}
                            </Input>
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
                                value={customerNewDetails.zipcode}
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
                                value={customerNewDetails.description}
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
                                value={customerNewDetails.status_id}
                                onChange={handleInputChange("status_id")}
                            >
                                {customerStatusList && customerStatusList.map((item) => (
                                    <option key={item.customer_status_id} value={item.customer_status_id}>
                                        {item.customer_status_name}
                                    </option>
                                ))}
                                
                            </Input>
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
                                value={customerNewDetails.company_name}
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
                                value={customerNewDetails.fid_ein}
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
                                value={customerNewDetails.mc_number}
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
        checked={customerNewDetails.billing_type_id === 1}
        onChange={handleDirectBillingRadio}
    />
    <Label for="directBillingRadio" check className="radio-label">
        Direct Billing
    </Label>
</FormGroup>
<FormGroup check className="checkbox-inline">
    <Input
        type="radio"
        id="factoringRadio"
        checked={customerNewDetails.billing_type_id === 2}
        onChange={handleFactoringRadio}
    />
    <Label
        for="factoringRadio"
        check
        className="radio-label"
    >
        Factoring
    </Label>
</FormGroup>
</Col>

                    <Col md={3}>
                        {customerNewDetails.billing_type_id === 2 && (
                            <FormGroup>
                                <Label for="Factoring">Factoring</Label>
                                <Input
                                    bsSize="sm"
                                    className="form-control form-control-sm"
                                    type="select"
                                    id="factor_id"
                                    name="factor_id"
                                    value={customerNewDetails.factor_id}
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
                                value={customerNewDetails.quick_pay_fee}
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
                                value={customerNewDetails.credit_id}
                                onChange={handleInputChange("credit_id")}
                            >  {creditList && creditList.map((item) => (
                                <option key={item.credit_id} value={item.credit_id}>
                                    {item.credit_name}
                                </option>
                            ))}
                            </Input>
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
                                value={customerNewDetails.pay_terms}
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
                                value={customerNewDetails.avg_days_to_pay}
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
                            onClick={() => { handleSaveCustomer }}
                            type="submit"
                        >

                            Save
                        </Button>
                        <Button className="cancel-button" size="sm"
                            color="danger" outline={true} onClick={handleClose}
                        >

                            Close
                        </Button>
                    </Col>
                </div>
            </Row>

        </Form>
    )
}

export default CustomerDetails