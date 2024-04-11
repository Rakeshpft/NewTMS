import React, { useContext, useEffect, useState } from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { ICustomerDetails, TCustomerProps, initialStateCustomer, } from '../../../../services/tms-objects/customer.types';
import { useListContext } from '../../../../services/reducer/list.reducer';
import { useCustomerContext } from '../../../../services/reducer/customer.reducer';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes/routes';
import { toastify } from '../../../../features/notification/toastify';
import { LoadingContext } from '../../../../services/context/loading.context';


const CustomerDetails = (props: TCustomerProps) => {
    const {
        handleSubmit = undefined,
        customer_id = 0,
    } = props
    const { setLoader } = useContext(LoadingContext);
    const { getStateList, stateList, getCustomerStatusList, customerStatusList, getCreditList, creditList, getFactorList, factorList } = useListContext()
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
    }, [customer_id]);

    useEffect(() => {
        if (stateList && stateList.length > 0 && selectedCustomer?.state_id==0) {
            setcustomerNewDetails({...selectedCustomer, state_id:stateList[0].state_id});
        }
    }, [stateList]);
    useEffect(() => {
        if (customerStatusList && customerStatusList.length > 0 && selectedCustomer?.status_id==0) {
            setcustomerNewDetails({...selectedCustomer, status_id:customerStatusList[0].customer_status_id});
        }
    }, [customerStatusList]);
    useEffect(() => {
        if (creditList && creditList.length > 0 && selectedCustomer?.credit_id==0) {
            setcustomerNewDetails({...selectedCustomer, credit_id:creditList[0].credit_id});
        }
    }, [creditList]);
    useEffect(() => {
        if (factorList && factorList.length > 0 && selectedCustomer?.factor_id==0) {
            setcustomerNewDetails({...selectedCustomer, factor_id:factorList[0].factor_id});
        }
    }, [factorList]);

    useEffect(() => {
        if (selectedCustomer && customer_id > 0) {
            setcustomerNewDetails(selectedCustomer);
        }
    }, [selectedCustomer]);

    const handleInputChange =
        (prop: keyof ICustomerDetails, is_numeric: boolean = false) =>
            (event: React.ChangeEvent<HTMLInputElement>) => {
                let value = is_numeric && event.target.value == "" ? 0 : event.target.value;
                setcustomerNewDetails({ ...customerNewDetails, [prop]: value });
            };

    const handleSaveCustomer = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setLoader(true);
        await saveCustomer(customerNewDetails).then((response) => {
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

    const handleCheckBoxBroker = () => {
        if (!customerNewDetails.is_shipper_receiver) {
            setcustomerNewDetails({ ...customerNewDetails, is_broker: true });
        } else {
            setcustomerNewDetails({ ...customerNewDetails, is_broker: !customerNewDetails.is_broker });
        }
    };

    const handleCheckBoxShipper = () => {
        if (!customerNewDetails.is_broker) {
            setcustomerNewDetails({ ...customerNewDetails, is_shipper_receiver: true });
        } else {
            setcustomerNewDetails({ ...customerNewDetails, is_shipper_receiver: !customerNewDetails.is_shipper_receiver });
        }
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
            <Row className="Customer-basic-details">
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
                                pattern='^[a-zA-Z]+$' title="Only alphabets are allowed"
                                required
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
                                pattern='^[a-zA-Z]+$' title="Only alphabets are allowed"
                                required
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
                                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" title='Please enter valid email address'
                                required
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
                                pattern='[0-9]{10}' title="Please enter valid phone number"
                                required

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
                                value={customerNewDetails.street}
                                onChange={handleInputChange("street")}
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
                                pattern='^(\+\d{1,3}[- ]?)?\d{10}$' title="Please enter valid zipcode"
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
                                required title='Comapany name is required'
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
                                pattern='^[a-zA-Z0-9]+$' title="Please enter valid FID/EID"
                                required
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
                                pattern='^[a-zA-Z0-9]+$' title="Please enter valid MC"
                                required
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
                                >
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
                            <Input
                                color='d'
                                bsSize="sm"
                                className="form-control form-control-sm"
                                type="text"
                                id="quick_pay_fee"
                                name="quick_pay_fee"
                                value={customerNewDetails.quick_pay_fee === 0 ? "" : customerNewDetails.quick_pay_fee}
                                onChange={handleInputChange("quick_pay_fee", true)}
                                pattern='^[0-9]+$' title="Please enter valid quick pay fee"
                                required
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
                                value={customerNewDetails.pay_terms == 0 ? "" : customerNewDetails.pay_terms}
                                onChange={handleInputChange("pay_terms", true)}
                                pattern='^[0-9]+$' title="Please enter valid pay terms"
                                required
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
                                value={customerNewDetails.avg_days_to_pay == 0 ? "" : customerNewDetails.avg_days_to_pay}
                                onChange={handleInputChange("avg_days_to_pay", true)}
                                pattern='^[0-9]+$' title="Please enter valid avg days to pay"
                                required
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