import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { useListContext } from '../../../../services/reducer/list.reducer';
import { toastify } from '../../../../features/notification/toastify';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes/routes';
import { useTruckContext } from '../../../../services/reducer/truck.reducer';
import { ITruckObject, initialStateTruck } from '../../../../services/tms-objects/truck.types';
import { LoadingContext } from '../../../../services/context/loading.context';
import ReactDatePicker from 'react-datepicker';
import { Convert, Dictionary } from '../../../../features/shared/helper';
import { IMaskInput } from 'react-imask';
import { Validate, mask } from '../../../../features/shared/validate';
import { trim } from 'lodash';

export type ITruckProps = {
    truck_id?: number,
    handleSubmit?: (obj: any) => void,
}

const TruckDetails = (prop: ITruckProps) => {
    const {
        truck_id = 0,
        handleSubmit = undefined,
    } = prop;

    const { selectedTruck, saveTruck, getIndividualtruck } = useTruckContext();
    const { setLoader } = useContext(LoadingContext);
    const { getStateList, stateList, getOwnershipTypeList, ownershipTypeList, getELDProviderList, eldProviderList, getDriverList, driverList } = useListContext();
    const [editTruckDetail, setEditTruckDetail] = useState<ITruckObject>(initialStateTruck);
    const [assignDriverId, setAssignDriverId] = useState<number>(0);
    const [assignDriverModal,setAssignDriverModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (truck_id > 0) {
            getIndividualtruck(truck_id);
        }
        else {
            setEditTruckDetail(initialStateTruck);
        }
        getStateList();
        getDriverList();
        getELDProviderList();
        getOwnershipTypeList();
    }, [truck_id]);

    useEffect(() => {
        if (selectedTruck && truck_id > 0) {
            setEditTruckDetail(selectedTruck);
        }
    }, [selectedTruck]);

    const handleInputChange =
        (prop: keyof ITruckObject, is_numeric: boolean = false) =>
            (event: React.ChangeEvent<HTMLInputElement>) => {
                if(prop=="driver_id"){
                    let driver = driverList?.find(l=>l.driver_id==parseInt(event.target.value));
                    let selected_truck_id = driver ? driver.truck_id :0;
                    if(selected_truck_id > 0  && selected_truck_id != truck_id){
                        setAssignDriverId(parseInt(event.target.value));
                        setAssignDriverModal(true);
                        return;
                    }
                }
                let value = is_numeric && trim(event.target.value) == "" ? 0 : event.target.value;
                setEditTruckDetail({ ...editTruckDetail, [prop]: value });
            };

    const handlerAssignDriver =()=>{
        setEditTruckDetail({ ...editTruckDetail, driver_id: assignDriverId });
        setAssignDriverId(0);
        setAssignDriverModal(false);
    }
    const handleSaveTruck = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setLoader(true);
        await saveTruck(editTruckDetail).then((response) => {
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
                        setEditTruckDetail({ ...editTruckDetail, truck_id: response.value });
                        getIndividualtruck(response.value);
                        setTimeout(function () {
                            setLoader(false);
                            navigate(`${routes.createNewTruck}/${response.value}`)
                        }, 2000);
                    }
                }
                else { setLoader(false); }
            }
            else { setLoader(false); }
        });
    };

    const handleClose = () => {
        setEditTruckDetail(initialStateTruck);
        navigate(routes.trucksAll);
    }
    const handleStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditTruckDetail({ ...editTruckDetail, is_active: event.target.checked });
    };

    const handleInputMaskChange =
        (prop: keyof ITruckObject, unMasked: string) => {
            setEditTruckDetail({ ...editTruckDetail, [prop]: unMasked });
        };


    return (
        <>
            {/* <div className="page-title">{editTruckDetail.Truck_id == 0 ? "Create" : "Edit"} Truck</div> */}
            <div className="page-content">
                <Form onSubmit={handleSaveTruck}>
                    <Row className="page-subtitle">
                        <h6>Basic Details</h6>
                    </Row>
                    <Row className="page-content align-items-center">
                        <Col md={3}>
                            <FormGroup>
                                <Label for="unit">Unit</Label>
                                <Input bsSize="sm" className="form-control" type="text" id="unit" name="unit"
                                    value={editTruckDetail.unit} onChange={handleInputChange("unit")}
                                    onKeyDownCapture={Validate} validation="alphanumeric"
                                    pattern='^(\+\d{1,3}[- ]?)?\d{10}$'
                                   
                                    required autoComplete="off"
                                >
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="vin_number">VIN</Label>
                                <Input bsSize="sm" className="form-control" type="text" id="vin_number" name="vin_number"
                                    value={editTruckDetail.vin_number} onChange={handleInputChange("vin_number")}
                                    pattern=".{10,17}" title="Please enter valid VIN" required  maxLength={17} onKeyDownCapture={Validate} validation="numeric"   autoComplete="off"
                                   />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="driver_id">Driver</Label>
                                <Input bsSize="sm" className="form-control" type="select" id="driver_id" name="driver_id"
                                    value={editTruckDetail.driver_id} onChange={handleInputChange("driver_id")} required autoComplete="off"
                                >
                                    <option key={0} value="">Please Select</option>
                                    {driverList && driverList.map((item) => (
                                        <option key={item.driver_id} value={item.driver_id}>{item.driver_name}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            {<FormGroup>
                                <Label for="year">Year</Label>
                                <ReactDatePicker showYearPicker showIcon fixedHeight isClearable onKeyDown={(event) => { event.preventDefault() }} placeholderText="YYYY" dateFormat="yyyy" name="year" className="form-control form-control-sm" onChange={(date) => { setEditTruckDetail({ ...editTruckDetail, year: Convert.ToYear(date) }) }} selected={Convert.YearToDate(editTruckDetail.year)} value={editTruckDetail.year} minDate={new Date()} autoComplete="off" required={true} />
                            </FormGroup>}
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="make">Make</Label>
                                <Input bsSize="sm" className="form-control" type="text" id="make" name="make"
                                    value={editTruckDetail.make} onChange={handleInputChange("make")}
                                      autoComplete="off"/>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="model">Model</Label>
                                <Input bsSize="sm" className="form-control" type="text" id="model" name="model"
                                    value={editTruckDetail.model} onChange={handleInputChange("model")}
                                     autoComplete="off"/>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="plate_number">Plate</Label>
                                <Input bsSize="sm" className="form-control" type="text" id="plate_number" name="plate_number"
                                    value={editTruckDetail.plate_number == 0 ? "" : editTruckDetail.plate_number} onChange={handleInputChange("plate_number", true)} pattern='^(\+\d{1,3}[- ]?)?\d{10}$' title="Please enter a valid alphanumeric plate number" onKeyDownCapture={Validate} validation="alphanumeric" length="10" autoComplete="off"
                                     />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="plate_state_id">Plate State</Label>
                                <Input bsSize="sm" className="form-control" type="select" id="plate_state_id" name="plate_state_id"
                                    value={editTruckDetail.plate_state_id} onChange={handleInputChange("plate_state_id")} required autoComplete="off">
                                    <option key={0} value="">Please Select</option>
                                    {stateList && stateList.map((item) => (
                                        <option key={item.state_id} value={item.state_id}>{item.state_name}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input bsSize="sm" className="form-control" type="text" id="description" name="description"
                                    value={editTruckDetail.description} onChange={handleInputChange("description")} autoComplete="off"/>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="is_active">Active</Label>
                                <FormGroup switch>
                                    <Input type="switch" checked={editTruckDetail.is_active} onChange={handleStatus} />
                                </FormGroup>
                            </FormGroup>
                        </Col>


                    </Row>
                    <Row className="page-subtitle">
                        <h6>ELD Details</h6>

                    </Row>
                    <Row className="page-content align-items-center">
                        <Col md={3}>
                            <FormGroup>
                                <Label for="eld_provider_id">ELD Provider</Label>
                                <Input bsSize="sm" className="form-control" type="select" id="eld_provider_id" name="eld_provider_id"
                                    value={editTruckDetail.eld_provider_id} onChange={handleInputChange("eld_provider_id")} autoComplete="off"
                                >
                                    <option key={0} value="">Please Select</option>
                                    {eldProviderList && eldProviderList.map((item) => (
                                        <option key={item.eld_provider_id} value={item.eld_provider_id}>{item.eld_provider_name}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Col>

                        <Col md={3}>
                            <FormGroup>
                                <Label for="eld_id">ELD ID</Label>
                                <Input bsSize="sm" className="form-control" type="text" id="eld_id" name="eld_id"
                                    value={editTruckDetail.eld_id} onChange={handleInputChange("eld_id") }
                                    autoComplete="off"/>
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row>
                        <Row className="page-subtitle">
                            <h6>Ownership Details</h6>
                        </Row>
                        <Row className="page-content align-items-center">
                            <Label for="ownership_id">Ownership</Label>
                            <Col md={3}>
                                <FormGroup>
                                    <Input bsSize="sm" className="form-control" type="select" id="ownership_type_id" name="ownership_type_id"
                                        value={editTruckDetail.ownership_type_id} onChange={handleInputChange("ownership_type_id")} autoComplete="off" required>
                                            <option key={0} value="">Please Select</option>                                        {ownershipTypeList && ownershipTypeList.length > 0 && ownershipTypeList.map((item) => (
                                            <option key={item.ownership_type_id} value={item.ownership_type_id}>{item.ownership_type_name}</option>))}
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Row>
                    {editTruckDetail.ownership_type_id == 1 && (
                        <div>
                            <Row className="page-content align-items-center">
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="purchase_date">Purchase Date</Label>
                                        {/* <Input bsSize="sm" className="form-control" type="date" id="purchase_date" name="purchase_date"
                                            value={editTruckDetail.purchase_date} onChange={handleInputChange("purchase_date")} */}
                                        <ReactDatePicker showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event) => { event.preventDefault() }} placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="purchase_date" className="form-control form-control-sm" onChange={(date) => { setEditTruckDetail({ ...editTruckDetail, purchase_date: Convert.ToISODate(date) }) }} selected={Convert.ToDate(editTruckDetail.purchase_date)}
                                            required={editTruckDetail.ownership_type_id == 1} autoComplete="off" />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="purchase_price">Purchase Price</Label>
                                        <Input bsSize="sm" className="form-control" type="text" id="purchase_price" name="purchase_price"
                                            value={editTruckDetail.purchase_price == 0 ? "" : editTruckDetail.purchase_price} onChange={handleInputChange("purchase_price", true)}
                                            pattern="^\d+(\.\d{1,2})?$"
                                            title="Please enter numeric or decimal" onKeyDownCapture={Validate} validation="decimal" length="10" required  autoComplete="off"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                    )}
                    {editTruckDetail.ownership_type_id == 2 && (
                        <div>
                            <Row className="page-content align-items-center">
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_lessor_name">Lessor Name</Label>
                                        <Input bsSize="sm" className="form-control" type="text" id="lease_lessor_name" name="lease_lessor_name"
                                            value={editTruckDetail.lease_lessor_name} onChange={handleInputChange("lease_lessor_name")}
                                            pattern='^[a-zA-Z]+$' title="Only alphabets are allowed" onKeyDownCapture={Validate} validation="chars" length="50" required/>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_date">Lease Date</Label>
                                        {/* <Input bsSize="sm" className="form-control" type="date" id="lease_date" name="lease_date" */}
                                        {/* value={editTruckDetail.lease_date} onChange={handleInputChange("lease_date")}  */}
                                        <ReactDatePicker showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event) => { event.preventDefault() }} placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="lease_date" className="form-control form-control-sm" onChange={(date) => { setEditTruckDetail({ ...editTruckDetail, lease_date: Convert.ToISODate(date) }) }} selected={Convert.ToDate(editTruckDetail.lease_date)}
                                            required={editTruckDetail.ownership_type_id == 2}autoComplete="off" />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_fid">FID#</Label>
                                        <Input bsSize="sm" className="form-control" type="text" id="lease_fid" name="lease_fid"
                                            value={editTruckDetail.lease_fid} onChange={handleInputChange("lease_fid")}
                                            pattern='^[a-zA-Z0-9]+$' title="Please enter valid FID/EIN" required onKeyDownCapture={Validate} validation="numeric" length="9" autoComplete="off"/>

                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_phone">Phone</Label>
                                        <IMaskInput mask={mask.phone} placeholder='___ ___-__-__' id="phone" name="phone" className="form-control form-control-sm" value={editTruckDetail.lease_phone} unmask={true} onAccept={(unmasked) => { handleInputMaskChange('lease_phone', unmasked) }} required={editTruckDetail.ownership_type_id == 2} autoComplete="off" ></IMaskInput>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="page-content align-items-center">
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_suite_number">Suite No.</Label>
                                        <Input bsSize="sm" className="form-control" type="text" id="lease_suite_number" name="lease_suite_number"
                                            value={editTruckDetail.lease_suite_number} onChange={handleInputChange("lease_suite_number")}
                                            required={editTruckDetail.ownership_type_id == 2} autoComplete="off" />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_street">Street No.</Label>
                                        <Input bsSize="sm" className="form-control" type="text" id="lease_street" name="lease_street"
                                            value={editTruckDetail.lease_street} onChange={handleInputChange("lease_street")}
                                            required={editTruckDetail.ownership_type_id == 2} autoComplete="off" />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_city">City</Label>
                                        <Input bsSize="sm" className="form-control" type="text" id="lease_city" name="lease_city"
                                            value={editTruckDetail.lease_city} onChange={handleInputChange("lease_city")}
                                            required={editTruckDetail.ownership_type_id == 2} autoComplete="off"/>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_state_id"> State</Label>
                                        <Input bsSize="sm" className="form-control" type="select" id="lease_state_id" name="lease_state_id"
                                            value={editTruckDetail.lease_state_id} onChange={handleInputChange("lease_state_id")}
                                            required={editTruckDetail.ownership_type_id == 2} autoComplete="off">
                                            <option key={0} value="">Please Select</option>
                                            {stateList && stateList.map((item) => (
                                                <option key={item.state_id} value={item.state_id}>{item.state_name}</option>
                                            ))}
                                        </Input>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_zipcode">Zip</Label>
                                        <Input bsSize="sm" className="form-control" type="text" id="lease_zipcode" name="lease_zipcode"
                                            value={editTruckDetail.lease_zipcode} onChange={handleInputChange("lease_zipcode")}
                                          pattern='^(\+\d{1,3}[- ]?)?\d{10}$' title="Please enter valid zipcode" onKeyDownCapture={Validate} validation="alphanumeric" length="7" autoComplete="off"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                    )}
                    <Row className="d-flex justify-content-end">
                        <Col md={3} className=" d-flex justify-content-end align-items-end pb-3" >
                            <Button color="primary" size="sm" className="me-3" type="submit">Save</Button>
                            <Button size="sm" color="danger" outline={true} onClick={handleClose}>Close</Button>
                        </Col>
                    </Row>
                </Form>

            </div>
            <Modal isOpen={assignDriverModal} onClose={()=>{setAssignDriverModal(false)}}>
                <ModalHeader><h6 className="mb-0 fw-bold">Confirmation</h6></ModalHeader>
                <ModalBody>
                    <FormGroup>
                        Driver already linked with another truck. Do you want to unassign this truck from previous driver and assign it to selected driver?
                    </FormGroup>
                    <FormGroup className=" d-flex justify-content-end mt-3 column-gap-2 ">
                        <Button color="primary" className="px-4 mr-3" onClick={() => setAssignDriverModal(false)}>Cancel</Button>
                        <Button color="primary" className="px-4" onClick={() => handlerAssignDriver()}>Ok</Button>
                    </FormGroup>
                </ModalBody>
            </Modal>
        </>
    );
};

export default TruckDetails;