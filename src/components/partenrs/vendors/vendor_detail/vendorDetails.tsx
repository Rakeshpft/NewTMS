import React, { useContext, useEffect, useState } from 'react'

import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { IVendorDetails, TVendorProps, initialStateVendor } from '../../../../services/tms-objects/vendor.types';
import { useVendorContext } from '../../../../services/reducer/vendor.reducer';
import { useListContext } from '../../../../services/reducer/list.reducer';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes/routes';
import { toastify } from '../../../../features/notification/toastify';
import { LoadingContext } from '../../../../services/context/loading.context';
import { Validate } from '../../../../features/shared/validate';
import { IMaskInput } from 'react-imask';


const VendorDetails = (props: TVendorProps) => {
    const {
        vendor_id = 0,
        handleSubmit = undefined
    } = props;
    const { setLoader } = useContext(LoadingContext);
    const { getStateList, stateList } = useListContext();
    const { getIdividualVendorDetails, selectedVendor, saveVendor } = useVendorContext();
    const [vendorNewDetails, setvendorNewDetails] = useState<IVendorDetails>(initialStateVendor);
    const navigate = useNavigate();

    useEffect(() => {
        debugger;
        if (vendor_id > 0) {
            getIdividualVendorDetails(vendor_id);
        }
        else {
            setvendorNewDetails(initialStateVendor);
        }
        getStateList();
    }, [vendor_id]);


    useEffect(() => {
        if (selectedVendor && vendor_id > 0) {
            setvendorNewDetails(selectedVendor);
        }
    }, [selectedVendor]);


    const handleInputChange =
        (prop: keyof IVendorDetails) =>
            (event: React.ChangeEvent<HTMLInputElement>) => {
                setvendorNewDetails({ ...vendorNewDetails, [prop]: event.target.value });
                console.log(vendorNewDetails.phone);
            };

    const handleSaveVendor = async (event: { preventDefault: () => void }) => {
        debugger;
        event.preventDefault();

        setLoader(true);
        await saveVendor(vendorNewDetails).then((response) => {
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
                        setvendorNewDetails({ ...vendorNewDetails, vendor_id: response.value });
                        getIdividualVendorDetails(response.value);
                        setTimeout(function () {
                            setLoader(false);
                            navigate(`${routes.createNewVendor}/${response.value}`)
                        }, 2000);
                    }
                }
                else { setLoader(false); }
            }
            else { setLoader(false); }
        });
    };

    const handleClose = () => {
        navigate(routes.vendorsAll);
    }

    const handleInputMaskChange =
        (prop: keyof IVendorDetails,unMasked:string) => {
            setvendorNewDetails({ ...vendorNewDetails, [prop]: unMasked });
            };


    return (
        <Form onSubmit={handleSaveVendor}>
            <Row className="my-3">
                <Row className="page-subtitle">
                    <h6>Basic Details</h6>
                </Row>
                <Row className="page-content align-items-center">
                    <Col md={3} className='d-none'>
                        <FormGroup>
                            <Label for="Status">Vendor Type</Label>
                            <Input bsSize="sm" className="form-control" type="select" id="vendor_type_id" name="vendor_type_id"
                                value={vendorNewDetails.vendor_type_id} onChange={handleInputChange("vendor_type_id")} >
                                <option key={0} value={0}>Select Vendor Type</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="First Name">First Name</Label>
                            <Input bsSize="sm" className="form-control" type="text" id="first_name" name="first_name"
                                value={vendorNewDetails.first_name} onChange={handleInputChange("first_name")} pattern='^[a-zA-Z]+$' title="Only alphabets are allowed" onKeyDownCapture={Validate} validation="chars" length="50" required  />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="Last Name">Last Name</Label>
                            <Input bsSize="sm" className="form-control" type="text" id="last_name" name="last_name"
                                value={vendorNewDetails.last_name} onChange={handleInputChange("last_name")} pattern='^[a-zA-Z]+$' title="Only alphabets are allowed" onKeyDownCapture={Validate} validation="chars" length="50" required  />
                        </FormGroup>
                    </Col>

                    <Col md={3}>
                        <FormGroup>
                            <Label for="Email">Email</Label>
                            <Input bsSize="sm" className="form-control" type="text" id="email" name="email"
                                value={vendorNewDetails.email} onChange={handleInputChange("email")} pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}" title='Please enter valid email address' required />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="Phone">Phone</Label>
                            {/* <Input bsSize="sm" className="form-control" type="text" id="phone" name="phone"
                                value={vendorNewDetails.phone} onChange={handleInputChange("phone")} required /> */}
                                <IMaskInput mask="(000)000-00-00" placeholder='___ ___-__-__' id="phone" name="phone" className="form-control form-control-sm" value={vendorNewDetails.phone} unmask={true} onAccept={(unmasked)=>{handleInputMaskChange('phone',unmasked)}} required ></IMaskInput>
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="Suite No.">Suite No.</Label>
                            <Input bsSize="sm" className="form-control" type="text" id="suite_number" name="suite_number"
                                value={vendorNewDetails.suite_number} onChange={handleInputChange("suite_number")}  />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="Street No.">Street No.</Label>
                            <Input bsSize="sm" className="form-control" type="text" id="street_number" name="street_number"
                                value={vendorNewDetails.street} onChange={handleInputChange("street")}  />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="City">City</Label>
                            <Input bsSize="sm" className="form-control" type="text" id="city" name="city"
                                value={vendorNewDetails.city} onChange={handleInputChange("city")}  />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="State">State</Label>
                            <Input bsSize="sm" className="form-control" type="select" id="state_id" name="state_id"
                                value={vendorNewDetails.state_id} onChange={handleInputChange("state_id")} >
                                <option key={0} value="">Please Select</option>
                                {stateList && stateList.map((item) => (
                                    <option key={item.state_id} value={item.state_id}>{item.state_name}</option>
                                ))}
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="Zip code">ZIP</Label>
                            <Input bsSize="sm" className="form-control" type="text" id="zipcode" name="zipcode"
                                value={vendorNewDetails.zipcode} onChange={handleInputChange("zipcode")} pattern='^(\+\d{1,3}[- ]?)?\d{10}$' title="Please enter valid zipcode"  onKeyDownCapture={Validate} validation="alphanumeric" length="7"  />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="unit">Description</Label>
                            <Input bsSize="sm" className="form-control" type="text" id="description" name="description"
                                value={vendorNewDetails.description} onChange={handleInputChange("description")}  />
                        </FormGroup>
                    </Col>
                </Row>
            </Row>
            <Row>
                <Row className="page-subtitle">
                    <h6>Company Details</h6>
                </Row>
                <Row className="page-content align-items-center">
                    <Col md={3}>
                        <FormGroup>
                            <Label for="CompanyName">Company Name</Label>
                            <Input bsSize="sm" className="form-control" type="text" id="company_name" name="company_name"
                                value={vendorNewDetails.company_name} onChange={handleInputChange("company_name")} required title='Comapany name is required'  onKeyDownCapture={Validate} validation="chars" length="50" />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="FID/EIN">FID/EIN</Label>
                            <Input bsSize="sm" className="form-control" type="text" id="fid_ein" name="fid_ein"
                                value={vendorNewDetails.fid_ein} onChange={handleInputChange("fid_ein")} pattern='^[a-zA-Z0-9]+$' title="Please enter valid FID/EIN" required  onKeyDownCapture={Validate} validation="numeric" length="9" />
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="MC">MC </Label>
                            <Input bsSize="sm" className="form-control" type="text" id="mc_number" name="mc_number"
                                value={vendorNewDetails.mc_number} onChange={handleInputChange("mc_number")} pattern='^[a-zA-Z0-9]+$' title="Please enter valid MC" required  onKeyDownCapture={Validate} validation="numeric" length="9" />
                        </FormGroup>
                    </Col>
                </Row>
            </Row>
            <Row className="d-flex justify-content-end">
                <Col md={3} className=" d-flex justify-content-end align-items-end pb-3" >
                    <Button color="primary" size="sm" className="me-3" onClick={() => { handleSaveVendor }} type="submit">Save</Button>
                    <Button size="sm" color="danger" outline={true} onClick={handleClose}>Close</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default VendorDetails