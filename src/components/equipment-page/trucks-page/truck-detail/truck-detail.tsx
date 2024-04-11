import React, { useContext, useEffect, useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { useListContext } from '../../../../services/reducer/list.reducer';
import { toastify } from '../../../../features/notification/toastify';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes/routes';
import { useTruckContext } from '../../../../services/reducer/truck.reducer';
import { ITruckObject, initialStateTruck } from '../../../../services/tms-objects/truck.types';
import { LoadingContext } from '../../../../services/context/loading.context';
import ReactDatePicker from 'react-datepicker';
import { Convert, Dictionary } from '../../../../features/validation/general-helper';

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

    useEffect(()=>{
        if(stateList && stateList.length>0 && (editTruckDetail.plate_state_id==0 || editTruckDetail.lease_state_id==0)){            
            setEditTruckDetail({
                ...editTruckDetail,
                plate_state_id: (editTruckDetail.plate_state_id==0?stateList[0].state_id:editTruckDetail.plate_state_id),
                lease_state_id: (editTruckDetail.lease_state_id==0?stateList[0].state_id:editTruckDetail.lease_state_id),
            })
        }
    },[stateList])
    useEffect(()=>{
        if(eldProviderList && eldProviderList.length>0 && editTruckDetail.eld_provider_id==0){
            setEditTruckDetail({
                ...editTruckDetail,
                eld_provider_id: eldProviderList[0].eld_provider_id,
            })
        }
    },[eldProviderList])
    useEffect(()=>{
        if(ownershipTypeList && ownershipTypeList.length>0 && editTruckDetail.ownership_type_id==0){
            setEditTruckDetail({
                ...editTruckDetail,
                ownership_type_id: ownershipTypeList[0].ownership_type_id,
            })
        }
    },[ownershipTypeList])
    useEffect(()=>{
        if(driverList && driverList.length>0 && editTruckDetail.driver_id==0){
            setEditTruckDetail({
                ...editTruckDetail,
                driver_id: driverList[0].driver_id,
            })
        }
    },[driverList])
    
    useEffect(() => {
        if (selectedTruck && truck_id > 0) {
            setEditTruckDetail(selectedTruck);
        }
    }, [selectedTruck]);

    const handleInputChange =
        (prop: keyof ITruckObject, is_numeric: boolean = false) =>
            (event: React.ChangeEvent<HTMLInputElement>) => {
                let value = is_numeric && event.target.value == " " ? 0 : event.target.value;
                setEditTruckDetail({ ...editTruckDetail, [prop]: value });
            };
    const handleSaveTruck = async (event: { preventDefault: () => void }) => {       
        event.preventDefault();
            if(editTruckDetail.plate_state_id==0 ||  editTruckDetail.eld_provider_id==0 || editTruckDetail.driver_id==0){
                toastify({ message: "Please select Driver , State and ELD Provider ", type: "error" });
            }
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
                                    required
                                    >

                                </Input>
                            </FormGroup>
                        </Col>

                        <Col md={3}>
                            <FormGroup>
                                <Label for="vin_number">VIN</Label>
                                <Input bsSize="sm" className="form-control" type="text" id="vin_number" name="vin_number"
                                    value={editTruckDetail.vin_number} onChange={handleInputChange("vin_number")}
                                    required />
                            </FormGroup>
                        </Col>

                        <Col md={3}>
                            <FormGroup>
                                <Label for="driver_id">Driver</Label>
                                <Input bsSize="sm" className="form-control" type="select" id="driver_id" name="driver_id"
                                    value={editTruckDetail.driver_id} onChange={handleInputChange("driver_id")} 
                                    >
                                     {driverList && driverList.map((item) => (
                                        <option key={item.driver_id} value={item.driver_id}>{item.driver_name}</option>
                                    ))}
                                    </Input>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="year">Year</Label>
                                <Input bsSize="sm" className="form-control" type="text" id="year" name="year"
                                    value={editTruckDetail.year} onChange={handleInputChange("year")}
                                    pattern='\d{4}'
                                    required />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="make">Make</Label>
                                <Input bsSize="sm" className="form-control" type="text" id="make" name="make"
                                    value={editTruckDetail.make} onChange={handleInputChange("make")}
                                    required />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="model">Model</Label>
                                <Input bsSize="sm" className="form-control" type="text" id="model" name="model"
                                    value={editTruckDetail.model} onChange={handleInputChange("model")}
                                    required />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="plate_number">Plate</Label>
                                <Input bsSize="sm" className="form-control" type="text" id="plate_number" name="plate_number"
                                    value={editTruckDetail.plate_number == 0 ? "" : editTruckDetail.plate_number} onChange={handleInputChange("plate_number", true)}
                                    required />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="plate_state_id">Plate State</Label>
                                <Input bsSize="sm" className="form-control" type="select" id="plate_state_id" name="plate_state_id"
                                    value={editTruckDetail.plate_state_id} onChange={handleInputChange("plate_state_id")}
                                    >
                                    {stateList &&  stateList.map((item) => (
                                        <option key={item.state_id} value={item.state_id}>{item.state_name}</option>
                                    ))}
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input bsSize="sm" className="form-control" type="text" id="description" name="description"
                                    value={editTruckDetail.description} onChange={handleInputChange("description")} />
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <Label for="is_active" className='ml-3'>Active</Label>
                            <FormGroup switch>
                                <Input type="switch" checked={editTruckDetail.is_active} onChange={handleStatus} />
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
                                    value={editTruckDetail.eld_provider_id} onChange={handleInputChange("eld_provider_id")}
                                     required title='please select ELD Provider'>
                                       {eldProviderList  && eldProviderList.map((item) => (
                                        <option key={item.eld_provider_id} value={item.eld_provider_id}>{item.eld_provider_name}</option>
                                    ))} 
                                </Input>
                            </FormGroup>
                        </Col>

                        <Col md={3}>
                            <FormGroup>
                                <Label for="eld_id">ELD ID</Label>
                                <Input bsSize="sm" className="form-control" type="text" id="eld_id" name="eld_id"
                                    value={editTruckDetail.eld_id == 0 ? "" : editTruckDetail.eld_id} onChange={handleInputChange("eld_id", true)}
                                    required />
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
                                        value={editTruckDetail.ownership_type_id} onChange={handleInputChange("ownership_type_id")}>
                                        {ownershipTypeList && ownershipTypeList.length > 0 && ownershipTypeList.map((item) => (
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
                                     <ReactDatePicker showYearDropdown showMonthDropdown placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="purchase_date" className="form-control form-control-sm" onChange={(date)=>{setEditTruckDetail({...editTruckDetail, purchase_date: Convert.ToISODate(date) })}} selected={Convert.ToDate(editTruckDetail.purchase_date)} 
                                       required = {editTruckDetail.ownership_type_id == 1} />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="purchase_price">Purchase Price</Label>
                                        <Input bsSize="sm" className="form-control" type="text" id="purchase_price" name="purchase_price"
                                            value={editTruckDetail.purchase_price == 0 ? "" : editTruckDetail.purchase_price} onChange={handleInputChange("purchase_price", true)} 
                                            pattern="^\d+(\.\d{1,2})?$" 
                                            required = {editTruckDetail.ownership_type_id == 1}/>
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
                                        <Label for="lease_lessor_name">Lesser Name</Label>
                                        <Input bsSize="sm" className="form-control" type="text" id="lease_lessor_name" name="lease_lessor_name"
                                            value={editTruckDetail.lease_lessor_name} onChange={handleInputChange("lease_lessor_name")}
                                            required={editTruckDetail.ownership_type_id == 2} />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_date">Lesser Date</Label>
                                        {/* <Input bsSize="sm" className="form-control" type="date" id="lease_date" name="lease_date" */}
                                            {/* value={editTruckDetail.lease_date} onChange={handleInputChange("lease_date")}  */}
                                            <ReactDatePicker showYearDropdown showMonthDropdown placeholderText={Dictionary.UserDateFormat.toUpperCase()} dateFormat={Dictionary.UserDateFormat} name="lease_date" className="form-control form-control-sm" onChange={(date)=>{setEditTruckDetail({...editTruckDetail, lease_date: Convert.ToISODate(date) })}} selected={Convert.ToDate(editTruckDetail.lease_date)} 
                                            required={editTruckDetail.ownership_type_id == 2} />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_fid">FID#</Label>
                                        <Input bsSize="sm" className="form-control" type="text" id="lease_fid" name="lease_fid"
                                            value={editTruckDetail.lease_fid} onChange={handleInputChange("lease_fid")}
                                            required={editTruckDetail.ownership_type_id == 2} />

                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_phone">Phone</Label>
                                        <Input bsSize="sm" className="form-control" type="text" id="lease_phone" name="lease_phone"
                                            value={editTruckDetail.lease_phone} onChange={handleInputChange("lease_phone")} 
                                            pattern="[0-9]{10}" 
                                            required={editTruckDetail.ownership_type_id == 2}/>
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="page-content align-items-center">
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_suite_number">Suite No.</Label>
                                        <Input bsSize="sm" className="form-control" type="text" id="lease_suite_number" name="lease_suite_number"
                                            value={editTruckDetail.lease_suite_number} onChange={handleInputChange("lease_suite_number")}
                                            required={editTruckDetail.ownership_type_id == 2} />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_street">Street No.</Label>
                                        <Input bsSize="sm" className="form-control" type="text" id="lease_street" name="lease_street"
                                            value={editTruckDetail.lease_street} onChange={handleInputChange("lease_street")} 
                                            required={editTruckDetail.ownership_type_id == 2}/>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_city">City</Label>
                                        <Input bsSize="sm" className="form-control" type="text" id="lease_city" name="lease_city"
                                            value={editTruckDetail.lease_city} onChange={handleInputChange("lease_city")} 
                                            required={editTruckDetail.ownership_type_id == 2}/>
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_state_id"> State</Label>
                                        <Input bsSize="sm" className="form-control" type="select" id="lease_state_id" name="lease_state_id"
                                            value={editTruckDetail.lease_state_id} onChange={handleInputChange("lease_state_id")}
                                            required={editTruckDetail.ownership_type_id == 2} title='please select state'>
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
                                            required={editTruckDetail.ownership_type_id == 2} />
                                    </FormGroup>
                                </Col>
                            </Row>
                        </div>
                    )}
                    <Row className="d-flex justify-content-end">
                        <Col md={3} className=" d-flex justify-content-end align-items-end pb-3" >
                            <Button color="primary" size="sm" className="me-3" onClick={() => { handleSaveTruck }} type="submit">Save</Button>
                            <Button size="sm" color="danger" outline={true} onClick={handleClose}>Close</Button>
                        </Col>
                    </Row>

                </Form>

            </div>

        </>
    );
};

export default TruckDetails;