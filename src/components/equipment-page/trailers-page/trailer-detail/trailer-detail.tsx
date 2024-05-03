import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import { useTrailerContext } from '../../../../services/reducer/trailer.reducer';
import { ITrailerObject, trailerInitialState } from '../../../../services/tms-objects/trailer.types';
import { useListContext } from '../../../../services/reducer/list.reducer';
import { toastify } from '../../../../features/notification/toastify';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes/routes';
import { LoadingContext } from '../../../../services/context/loading.context';
import ReactDatePicker from 'react-datepicker';
import { Convert, Dictionary } from '../../../../features/shared/helper';
import { Validate, mask } from '../../../../features/shared/validate';
import { IMaskInput } from 'react-imask';

export type ITrailerProps = {
    trailer_id?: number,
    handleSubmit?: (obj: any) => void,
}
const TrailerDetails = (prop: ITrailerProps) => {
    const {
        trailer_id = 0,
        handleSubmit = undefined,
    } = prop;
    const { setLoader } = useContext(LoadingContext);
    const { getStateList, stateList, getTrailerTypeList, trailerTypeList, getOwnershipTypeList, ownershipTypeList, getDriverList, driverList } = useListContext();
    const [editTrailerDetail, setEditTrailerDetail] = useState<ITrailerObject>(trailerInitialState);
    const { getTrailerDetail, trailerDetail, saveTrailer } = useTrailerContext();
    const [assignDriverId, setAssignDriverId] = useState<number>(0);
    const [assignDriverModal,setAssignDriverModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (trailer_id > 0) {
            getTrailerDetail(trailer_id);
        }
        else {
            setEditTrailerDetail(trailerInitialState);
        }
        getStateList();
        getTrailerTypeList();
        getOwnershipTypeList();
        getDriverList();
    }, [trailer_id]);

    useEffect(() => {
        if (trailerDetail && trailer_id > 0) {
            setEditTrailerDetail(trailerDetail);
        }
    }, [trailerDetail]);

    const handleInputChange =
        (prop: keyof ITrailerObject) =>
            (event: React.ChangeEvent<HTMLInputElement>) => {
                if(prop=="driver_id"){
                    let driver = driverList?.find(l=>l.driver_id==parseInt(event.target.value));
                    let selected_trailer_id = driver ? driver.trailer_id :0;
                    if(selected_trailer_id > 0  && selected_trailer_id != trailer_id){
                        setAssignDriverId(parseInt(event.target.value));
                        setAssignDriverModal(true);
                        return;
                    }
                }
                setEditTrailerDetail({ ...editTrailerDetail, [prop]: event.target.value });
            };
            const handlerAssignDriver =()=>{
                setEditTrailerDetail({ ...editTrailerDetail, driver_id: assignDriverId });
                setAssignDriverId(0);
                setAssignDriverModal(false);
            }
    const handleSaveTrailer = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        setLoader(true);
        await saveTrailer(editTrailerDetail).then((response) => {
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
                        setEditTrailerDetail({ ...editTrailerDetail, trailer_id: response.value });
                        getTrailerDetail(response.value);
                        setTimeout(function () {
                            setLoader(false);
                            navigate(`${routes.createNewTailers}/${response.value}`)
                        }, 2000);
                    }
                }
                else { setLoader(false); }
            }
            else { setLoader(false); }
        });
    };

    const handleClose = () => {
        setEditTrailerDetail(trailerInitialState);
        navigate(routes.trailers);
    }

    const handleStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditTrailerDetail({ ...editTrailerDetail, is_active: event.target.checked });
    };

    const handleInputMaskChange =
        (prop: keyof ITrailerObject, unMasked: string) => {
            setEditTrailerDetail({ ...editTrailerDetail, [prop]: unMasked });
        };


    return (
        <>
            {/* <div className="page-title">{editTrailerDetail.trailer_id == 0 ? "Create" : "Edit"} Trailer</div> */}
            <div className="page-content">
                <Form onSubmit={handleSaveTrailer}>
                    <Row className="page-subtitle">
                        <h6>Basic Details</h6>
                    </Row>
                    <Row className="my-3">
                        <Row className="page-content align-items-center">
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="unit">Unit</Label>
                                    <Input bsSize="sm" className="form-control" type="text" id="unit" name="unit"
                                        value={editTrailerDetail.unit} onChange={handleInputChange("unit")} required autoComplete="off" >
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="trailer_type_id">Type</Label>
                                    <Input bsSize="sm" className="form-control" type="select" id="trailer_type_id" name="trailer_type_id"
                                        value={editTrailerDetail.trailer_type_id} onChange={handleInputChange("trailer_type_id")} required autoComplete="off">
                                        <option key={0} value="">Please Select</option>
                                        {trailerTypeList && trailerTypeList.map((item) => (
                                            <option key={item.trailer_type_id} value={item.trailer_type_id}>{item.trailer_type_name}</option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="vin_number">VIN</Label>
                                    <Input bsSize="sm" className="form-control" type="text" id="vin_number" name="vin_number"
                                        value={editTrailerDetail.vin_number} onChange={handleInputChange("vin_number")} required pattern=".{10,17}"
                                        title="VIN must be between 10 to 17 characters" autoComplete="off"/>
                                </FormGroup>
                            </Col>

                            <Col md={3}>
                                <FormGroup>
                                    <Label for="driver_id">Driver</Label>
                                    <Input bsSize="sm" className="form-control" type="select" id="driver_id" name="driver_id"
                                        value={editTrailerDetail.driver_id} onChange={handleInputChange("driver_id")} autoComplete="off" >
                                        <option key={0} value={0}>Please Select</option>
                                        {driverList && driverList.map((item) => (
                                            <option key={item.driver_id} value={item.driver_id}>{item.driver_name}</option>
                                        ))}
                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                {/* <FormGroup>
                                    <Input bsSize="sm" className="form-control" type="text" id="year" name="year"
                                        value={editTrailerDetail.year} onChange={handleInputChange("year")} pattern='\d{4}'
                                       title='Enter valid Year In 4 numeric digit' required />
                                </FormGroup> */}
                                {<FormGroup>
                                    <Label for="year">Year</Label>
                                    <ReactDatePicker showYearPicker showIcon fixedHeight isClearable onKeyDown={(event) => { event.preventDefault() }} placeholderText="YYYY" dateFormat="yyyy" name="year" className="form-control form-control-sm" onChange={(date) => { setEditTrailerDetail({ ...editTrailerDetail, year: Convert.ToYear(date) }) }} selected={Convert.YearToDate(editTrailerDetail.year)} value={editTrailerDetail.year} minDate={new Date()} autoComplete="off" required={true} />
                                </FormGroup>}
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="make">Make</Label>
                                    <Input bsSize="sm" className="form-control" type="text" id="make" name="make"
                                        value={editTrailerDetail.make} onChange={handleInputChange("make")} autoComplete="off" />
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="model">Model</Label>
                                    <Input bsSize="sm" className="form-control" type="text" id="model" name="model"
                                        value={editTrailerDetail.model} onChange={handleInputChange("model")} autoComplete="off"/>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="plate_number">Plate</Label>
                                    <Input bsSize="sm" className="form-control" type="text" id="plate_number" name="plate_number"
                                        value={editTrailerDetail.plate_number} onChange={handleInputChange("plate_number")} pattern='^(\+\d{1,3}[- ]?)?\d{10}$' title="Please enter a valid alphanumeric plate number" onKeyDownCapture={Validate} validation="alphanumeric" length="10"
                                        required autoComplete="off"/>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="plate_state_id">Plate State</Label>
                                    <Input bsSize="sm" className="form-control" type="select" id="plate_state_id" name="plate_state_id"
                                        value={editTrailerDetail.plate_state_id} onChange={handleInputChange("plate_state_id")} required autoComplete="off">
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
                                        value={editTrailerDetail.description} onChange={handleInputChange("description")} autoComplete="off" />
                                </FormGroup>
                            </Col>

                            <Col md={3}>
                                <Label for="is_active" className='ml-3' style={{ marginBottom: '6px' }}>Active</Label>
                                <FormGroup switch>
                                    <Input type="switch" style={{ marginBottom: '15px' }} checked={editTrailerDetail.is_active} onChange={handleStatus} />
                                </FormGroup>
                            </Col>
                        </Row>
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
                                        value={editTrailerDetail.ownership_type_id} onChange={handleInputChange("ownership_type_id")} autoComplete="off" required>
                                        <option key={0} value="">Please Select</option>
                                        {ownershipTypeList && ownershipTypeList.map((item) => (
                                            <option key={item.ownership_type_id} value={item.ownership_type_id}>{item.ownership_type_name}</option>))}
                                    </Input>
                                </FormGroup>
                            </Col>
                        </Row>
                    </Row>
                    {editTrailerDetail.ownership_type_id == 1 && (
                        <div>
                            <Row className="page-content align-items-center">
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="purchase_date">Purchase Date</Label>
                                        <ReactDatePicker showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event) => { event.preventDefault() }} placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="purchase_date" className="form-control form-control-sm" onChange={(date) => { setEditTrailerDetail({ ...editTrailerDetail, purchase_date: Convert.ToISODate(date) }) }} selected={Convert.ToDate(editTrailerDetail.purchase_date)} required autoComplete="off"></ReactDatePicker>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="purchase_price">Purchase Price</Label>
                                        <Input bsSize="sm" className="form-control" type="text" id="purchase_price" name="purchase_price"
                                            value={editTrailerDetail.purchase_price} onChange={handleInputChange("purchase_price")} pattern="^\d+(\.\d{1,2})?$" title="Please enter numeric or decimal" onKeyDownCapture={Validate} validation="decimal" length="10" required  autoComplete="off"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                    )}
                    {editTrailerDetail.ownership_type_id == 2 && (
                        <div>
                            <Row className="page-content align-items-center">
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_lessor_name">Lessor Name</Label>
                                        <Input bsSize="sm" className="form-control" type="text" id="lease_lessor_name" name="lease_lessor_name"
                                            value={editTrailerDetail.lease_lessor_name} onChange={handleInputChange("lease_lessor_name")} pattern='^[a-zA-Z]+$' title="Only alphabets are allowed" onKeyDownCapture={Validate} validation="chars" length="50" required />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_date">Lease  Date</Label>

                                        {/* <Input bsSize="sm" className="form-control" type="text" id="lease_date" name="lease_date"
                                            value={editTrailerDetail.lease_date} onChange={handleInputChange("lease_date")} /> */}
                                        <ReactDatePicker showYearDropdown showMonthDropdown showIcon fixedHeight isClearable onKeyDown={(event) => { event.preventDefault() }} placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="lease_date" className="form-control form-control-sm" onChange={(date) => { setEditTrailerDetail({ ...editTrailerDetail, lease_date: Convert.ToISODate(date) }) }} selected={Convert.ToDate(editTrailerDetail.lease_date)} required autoComplete="off" ></ReactDatePicker>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_fid">FID#</Label>
                                        <Input bsSize="sm" className="form-control" type="text" id="lease_fid" name="lease_fid"
                                            value={editTrailerDetail.lease_fid} onChange={handleInputChange("lease_fid")} pattern='^[a-zA-Z0-9]+$' title="Please enter valid FID/EIN" required onKeyDownCapture={Validate} validation="numeric" length="9" autoComplete="off" />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_phone">Phone</Label>
                                        {/* <Input bsSize="sm" className="form-control" type="text" id="lease_phone" name="lease_phone"
                                            value={editTrailerDetail.lease_phone} onChange={handleInputChange("lease_phone")} pattern="[0-9]{10}"
                                            title="Please enter a 10-digit phone number" onKeyDownCapture={Validate} validation="numeric" length="10"
                                            required /> */}
                                        <IMaskInput mask={mask.phone} placeholder='___ ___-__-__' id="phone" name="phone" className="form-control form-control-sm" value={editTrailerDetail.lease_phone} unmask={true} onAccept={(unmasked) => { handleInputMaskChange('lease_phone', unmasked) }} required autoComplete="off"></IMaskInput>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="page-content align-items-center">
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_suite_number">Suite No.</Label>
                                        <Input bsSize="sm" className="form-control" type="text" id="lease_suite_number" name="lease_suite_number"
                                            value={editTrailerDetail.lease_suite_number} onChange={handleInputChange("lease_suite_number")} autoComplete="off"/>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_street">Street No.</Label>
                                        <Input bsSize="sm" className="form-control" type="text" id="lease_street" name="lease_street"
                                            value={editTrailerDetail.lease_street} onChange={handleInputChange("lease_street")} autoComplete="off" />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_city">City</Label>
                                        <Input bsSize="sm" className="form-control" type="text" id="lease_city" name="lease_city"
                                            value={editTrailerDetail.lease_city} onChange={handleInputChange("lease_city")}autoComplete="off" />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_state_id"> State</Label>
                                        <Input bsSize="sm" className="form-control" type="select" id="lease_state_id" name="lease_state_id"
                                            value={editTrailerDetail.lease_state_id} onChange={handleInputChange("lease_state_id")} autoComplete="off">
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
                                            value={editTrailerDetail.lease_zipcode} onChange={handleInputChange("lease_zipcode")} pattern='^(\+\d{1,3}[- ]?)?\d{10}$' title="Please enter valid zipcode" onKeyDownCapture={Validate} validation="alphanumeric" length="7" autoComplete="off"/>
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                    )}
                    <Row className="d-flex justify-content-end">
                        <Col md={3} className=" d-flex justify-content-end align-items-end pb-3" >
                            <Button color="primary" size="sm" className="me-3" onClick={() => { handleSaveTrailer }} type="submit">Save</Button>
                            <Button size="sm" color="danger" outline={true} onClick={handleClose}>Close</Button>
                        </Col>
                    </Row>

                </Form>
                
                <Modal isOpen={assignDriverModal} onClose={()=>{setAssignDriverModal(false)}}>
                <ModalHeader><h6 className="mb-0 fw-bold">Confirmation</h6></ModalHeader>
                <ModalBody>
                    <FormGroup>
                        Driver already linked with another trailer. Do you want to unassign this trailer from previous driver and assign it to selected driver?
                    </FormGroup>
                    <FormGroup className=" d-flex justify-content-end mt-3 column-gap-2 ">
                        <Button color="primary" className="px-4 mr-3" onClick={() => setAssignDriverModal(false)}>Cancel</Button>
                        <Button color="primary" className="px-4" onClick={() => handlerAssignDriver()}>Ok</Button>
                    </FormGroup>
                </ModalBody>
            </Modal>
            </div>

        </>
    );
};

export default TrailerDetails;