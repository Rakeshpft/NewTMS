import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { ICustomerDetails, TCustomerProps, initialStateCustomer, } from '../../../../services/tms-objects/customer.types';
import { useListContext } from '../../../../services/reducer/list.reducer';
import { useCustomerContext } from '../../../../services/reducer/customer.reducer';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes/routes';
import { toastify } from '../../../../features/notification/toastify';
import { LoadingContext } from '../../../../services/context/loading.context';
import { IMaskInput } from 'react-imask';
import { Validate, mask } from '../../../../features/shared/validate';

const CustomerDetails = (props: TCustomerProps) => {
    const {
        handleSubmit = undefined,
        customer_id = 0,
    } = props
    const { setLoader } = useContext(LoadingContext);
    const { getStateList, stateList, getCustomerStatusList, getBillingTypeList, billingTypeList, customerStatusList, getCreditList, creditList, getFactorList, factorList } = useListContext()
    const { getIdividualCustomerDetails, selectedCustomer, saveCustomer } = useCustomerContext();
    const [customerNewDetails, setcustomerNewDetails] = useState<ICustomerDetails>(initialStateCustomer);
    const navigate = useNavigate();

    useEffect(() => {
        if (customer_id > 0) {
            getIdividualCustomerDetails(customer_id)
        }
        else{
            setcustomerNewDetails(initialStateCustomer);
        }
        getStateList();
        getCustomerStatusList();
        getCreditList();
        getFactorList();
        getBillingTypeList();
    }, [customer_id]);
    
    useEffect(() => {
        if (selectedCustomer && customer_id > 0) {
            setcustomerNewDetails(selectedCustomer);
        }
    }, [selectedCustomer]);

    const handleInputChange =
        (prop: keyof ICustomerDetails) =>
            (event: React.ChangeEvent<HTMLInputElement>) => {
                setcustomerNewDetails({ ...customerNewDetails, [prop]: event.target.value });
            };

    const handleInputMaskChange =
        (prop: keyof ICustomerDetails,unMasked:string) => {
                setcustomerNewDetails({ ...customerNewDetails, [prop]: unMasked });
            };


    const handleSaveCustomer = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        let customerDetail : ICustomerDetails = {...customerNewDetails};
        customerDetail.status_id = customerStatusList && customerStatusList.length > 0 && customerDetail?.status_id==0 ? customerStatusList[0].customer_status_id : customerDetail.status_id;
        setLoader(true);
        await saveCustomer(customerDetail).then((response) => {
            if (response) {
                toastify({ message: response.message, type: (response.success ? "success" : "error") });
                if (response.success) {
                    if (handleSubmit) {
                        setTimeout(function () {
                            setLoader(false);
                            handleSubmit(response.value);
                        }, 2000);                        
                    }
                    else {
                        setcustomerNewDetails({ ...customerNewDetails, customer_id: response.value });
                        getIdividualCustomerDetails(response?.value);
                        setTimeout(function () {
                            setLoader(false);
                            navigate(`${routes.createNewCustomer}/${response.value}`)
                        }, 2000);
                    }
                }
                else { setLoader(false);}
            }
            else { setLoader(false); }
        });
    }

    const handleCustomerType =(prop: keyof ICustomerDetails) => (event: React.ChangeEvent<HTMLInputElement>) => {
        if (prop == "is_broker" && !event.target.checked && !customerNewDetails.is_shipper_receiver) {
            setcustomerNewDetails({ ...customerNewDetails, is_shipper_receiver : true, is_broker:false });
        } else if (prop == "is_shipper_receiver" && !event.target.checked && !customerNewDetails.is_broker) {
            setcustomerNewDetails({ ...customerNewDetails, is_broker : true, is_shipper_receiver:false });
        } else {
            setcustomerNewDetails({ ...customerNewDetails, [prop]: event.target.checked });
        }
    };

    const handleBillingType =(prop: keyof ICustomerDetails) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setcustomerNewDetails({ ...customerNewDetails, [prop]: event.target.value });        
    };

    const handleClose = () => {
        navigate(routes.customersAll);
    }

    return (
        <Form onSubmit={handleSaveCustomer}>
            <Row className="Customer-basic-details">
                <Row>
                    <Col className="page-subtitle">Basic Details</Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="fullName">Customer Type</Label>
                            <div className="d-flex justify-content-between">
                                <FormGroup check className="checkbox-inline me-3">
                                    <Input type="checkbox" id="is_broker" checked={customerNewDetails.is_broker} onChange={handleCustomerType("is_broker")} />
                                    <Label for="brokerCheckbox" check className="checkbox-label">Broker</Label>
                                </FormGroup>
                                <FormGroup check className="checkbox-inline">
                                    <Input type="checkbox" id="is_shipper_receiver" checked={customerNewDetails.is_shipper_receiver} onChange={handleCustomerType("is_shipper_receiver")} />
                                    <Label for="shipperReceiverCheckbox" check className="checkbox-label">Shipper/Receiver</Label>
                                </FormGroup>
                            </div>
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="first Name">First Name</Label>
                            <Input bsSize="sm" className="form-control" type="text" id="first_name" name="first_name" value={customerNewDetails.first_name} onChange={handleInputChange("first_name")} pattern='^[a-zA-Z]+$' title="Only alphabets are allowed" onKeyDownCapture={Validate} validation="chars" length="50" required autoComplete="off"/>
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="last Name">Last Name</Label>
                            <Input bsSize="sm" className="form-control" type="text" id="last_name" name="last_name" value={customerNewDetails.last_name} onChange={handleInputChange("last_name")} pattern='^[a-zA-Z]+$' title="Only alphabets are allowed" onKeyDownCapture={Validate} validation="chars" length="50" required autoComplete="off" />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="Email">Email</Label>
                            <Input bsSize="sm" className="form-control" type="email" id="email" name="email" value={customerNewDetails.email} onChange={handleInputChange("email")}  pattern='[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' title="Please enter valid email" required autoComplete="off" />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="Phone">Phone</Label>
                            {/* <Input bsSize="sm" className="form-control" type="text" id="phone" name="phone" value={customerNewDetails.phone} onChange={handleInputChange("phone")} pattern='[0-9]{10}' title="Please enter valid phone number" required /> */}
                            <IMaskInput mask={mask.phone} placeholder='___ ___-__-__' id="phone" name="phone" className="form-control form-control-sm" value={customerNewDetails.phone} unmask={true} onAccept={(unmasked)=>{handleInputMaskChange('phone',unmasked)}} required autoComplete="off" ></IMaskInput>
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="Suit No.">Suit No.</Label>
                            <Input bsSize="sm" className="form-control" type="text" id="suite_number" name="suite_number" value={customerNewDetails.suite_number} onChange={handleInputChange("suite_number")} autoComplete="off" />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="Street No">Street No.</Label>
                            <Input bsSize="sm" className="form-control" type="text" id="street_number" name="street_number" value={customerNewDetails.street} onChange={handleInputChange("street")}  autoComplete="off" />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="City">City</Label>
                            <Input bsSize="sm" className="form-control" type="text" id="city" name="city" value={customerNewDetails.city} onChange={handleInputChange("city")}  autoComplete="off"/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="State">State</Label>
                            <Input bsSize="sm" className="form-control" type="select" id="state_id" name="state_id" value={customerNewDetails.state_id} onChange={handleInputChange("state_id")} autoComplete="off">
                                <option key={0} value="0">Please Select</option>
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
                            <Input bsSize="sm" className="form-control" type="text" id="zipcode" name="zipcode" value={customerNewDetails.zipcode} onChange={handleInputChange("zipcode")} pattern='^(\+\d{1,3}[- ]?)?\d{10}$' title="Please enter valid zipcode"  onKeyDownCapture={Validate} validation="alphanumeric" length="7" autoComplete="off" />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="unit">Description</Label>
                            <Input bsSize="sm" className="form-control" type="text" id="description" name="description" value={customerNewDetails.description} onChange={handleInputChange("description")}  autoComplete="off"/>
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="Status">Status</Label>
                            <Input bsSize="sm" className="form-control form-control-sm" type="select" id="status_id" name="status_id" value={customerNewDetails.status_id} onChange={handleInputChange("status_id")} required autoComplete="off">
                                <option key={0} value="">Please Select</option>
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
                <Row>
                    <Col className="page-subtitle">Company Details</Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="CompanyName">Company Name</Label>
                            <Input bsSize="sm" className="form-control" type="text" id="company_name" name="company_name" value={customerNewDetails.company_name} onChange={handleInputChange("company_name")} required title='Comapany name is required'  onKeyDownCapture={Validate} validation="chars" length="50"  autoComplete="off"/>
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="FID/EIN">FID/EIN</Label>
                            <Input bsSize="sm" className="form-control" type="text" id="fid_ein" name="fid_ein" value={customerNewDetails.fid_ein} onChange={handleInputChange("fid_ein")} pattern='^[a-zA-Z0-9]+$' title="Please enter valid FID/EIN" required  onKeyDownCapture={Validate} validation="numeric" length="9"  autoComplete="off"/>
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="MC">MC</Label>
                            <Input bsSize="sm" className="form-control" type="text" id="mc_number" name="mc_number" value={customerNewDetails.mc_number} onChange={handleInputChange("mc_number")} pattern='^[a-zA-Z0-9]+$' title="Please enter valid MC" required  onKeyDownCapture={Validate} validation="numeric" length="9" autoComplete="off"/>
                        </FormGroup>
                    </Col>
                </Row>
            </Row>

            <Row className="Customer-basic-details">
                <Row>
                    <Col  className="page-subtitle">Billing</Col>
                </Row>
                <Row>
                    <Col md={3} className="d-flex align-items-center">
                        {billingTypeList && billingTypeList.map((item)=>(
                            <FormGroup check className="checkbox-inline me-3">
                            <Input type="radio" name="billing_type_id" checked={customerNewDetails.billing_type_id == item.billing_type_id} value={item.billing_type_id} onChange={handleBillingType("billing_type_id")} autoComplete="off" />
                            <Label for="billing_type_id" check className="radio-label">{item.billing_type_name}</Label>
                        </FormGroup>
                        ))}                        
                    </Col>
                    <Col md={3}>
                        {customerNewDetails.billing_type_id == 2 && (
                            <FormGroup>
                                <Label for="Factoring">Factoring</Label>
                                <Input bsSize="sm" className="form-control" type="select" id="factor_id" name="factor_id" value={customerNewDetails.factor_id} onChange={handleInputChange("factor_id")} autoComplete="off" >
                                    <option key={0} value={0}>Please Select</option>
                                    {factorList && factorList.map((item) => (
                                    <option key={item.factor_id} value={item.factor_id}>
                                        {item.factor_name}
                                    </option>
                                ))}
                                </Input>
                            </FormGroup>
                        )}
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="Quick Pay">QuickPay Fee%(e.g 2.5%)</Label>
                            <Input bsSize="sm" className="form-control form-control-sm" type="text" id="quick_pay_fee" name="quick_pay_fee" value={customerNewDetails.quick_pay_fee === 0 ? "" : customerNewDetails.quick_pay_fee} onChange={handleInputChange("quick_pay_fee")} pattern='^[0-9]+$' title="Please enter valid quick pay fee" onKeyDownCapture={Validate} validation="decimal" length="5"  autoComplete="off"/>
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="Credit">Credit</Label>
                            <Input bsSize="sm" className="form-control" type="select" id="credit_id" name="credit_id" value={customerNewDetails.credit_id} onChange={handleInputChange("credit_id")}  autoComplete="off">
                                <option key={0} value={0}>Please Select</option>
                                {creditList && creditList.map((item) => (
                                <option key={item.credit_id} value={item.credit_id}>
                                    {item.credit_name}
                                </option>
                            ))}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={3} className='d-none'>
                        <FormGroup>
                            <Label for="Pay Terms">Pay Terms</Label>
                            <Input bsSize="sm" className="form-control" type="text" id="pay_terms" name="pay_terms" value={customerNewDetails.pay_terms} onChange={handleInputChange("pay_terms")} pattern='^[0-9]+$' title="Please enter valid pay terms" onKeyDownCapture={Validate} validation="numeric" length="3" autoComplete="off" />
                        </FormGroup>
                    </Col>
                    <Col md={3} className='d-none'>
                        <FormGroup>
                            <Label for="Avg. Days to Pay">Avg. Days to Pay</Label>
                            <Input bsSize="sm" className="form-control" type="text" id="avg_days_to_pay" name="avg_days_to_pay" value={customerNewDetails.avg_days_to_pay} onChange={handleInputChange("avg_days_to_pay")} pattern='^[0-9]+$' title="Please enter valid avg days to pay" onKeyDownCapture={Validate} validation="numeric" length="3" autoComplete="off" />
                        </FormGroup>
                    </Col>
                </Row>
                <div className="d-flex justify-content-end">
                    <Col md={3} className=" d-flex justify-content-end align-items-end">
                        <Button color="primary" size="sm" className="me-3" type="submit">Save</Button>
                        <Button size="sm" color="danger" outline={true} onClick={handleClose}>Close</Button>
                    </Col>
                </div>
            </Row>
        </Form>
    )
}

export default CustomerDetails