import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { useTrailerContext } from '../../../../services/reducer/trailer.reducer';
import { ITrailerObject, trailerInitialState } from '../../../../services/tms-objects/trailer.types';
import { useListContext } from '../../../../services/reducer/list.reducer';
import { toastify } from '../../../../features/notification/toastify';
import { useNavigate } from 'react-router-dom';
import { routes } from '../../../routes/routes';
//import { ITrailerDetails, ITrailerManagementProps } from '../../../../services/tms-objects/trailer.types';

export type ITrailerProps = {
    trailer_id?: number,
    handleSubmit?: (obj: any) => void,
}

const TrailerDetails = (prop: ITrailerProps) => {
    const {
        trailer_id = 0,
        handleSubmit = undefined,
    } = prop;
    const { getStateList, stateList, getTrailerTypeList, trailerTypeList, getOwnershipTypeList, ownershipTypeList } = useListContext();
    const [editTrailerDetail, setEditTrailerDetail] = useState<ITrailerObject>(trailerInitialState);
    const { getTrailerDetail, selectedTrailer, saveTrailer, isLoading } = useTrailerContext();
    const navigate = useNavigate();   

    useEffect(() => {
        console.log("trailer", trailer_id);
        if (trailer_id > 0) {
            getTrailerDetail(trailer_id);
        }
        else {
            setEditTrailerDetail(trailerInitialState);
            setEditTrailerDetail({
                ...editTrailerDetail,
                trailer_type_id:1,
                ownership_type_id:1
            })
        }
        getStateList();
        getTrailerTypeList();
        getOwnershipTypeList();
    }, []);
    useEffect(() => {
        if (!isLoading && selectedTrailer && trailer_id > 0) {
            setEditTrailerDetail(selectedTrailer);
        }
    }, [selectedTrailer]);

    const handleInputChange =
        (prop: keyof ITrailerObject) =>
            (event: React.ChangeEvent<HTMLInputElement>) => {
                setEditTrailerDetail({ ...editTrailerDetail, [prop]: event.target.value });
            };
    const handleSaveTrailer = async (event: { preventDefault: () => void }) => {
        debugger;
        event.preventDefault();
        await saveTrailer(editTrailerDetail).then((response) => {
            response?.success && handleSubmit && handleSubmit(response.value);
            //getTrailerDetail(trailer_id);
            response && toastify({ message: response.message, type: (response.success ? "success" : "error") });
        });

    };

    const handleClose = () => {
        setEditTrailerDetail(trailerInitialState);
        navigate(routes.trailers);
    }

    const handleStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditTrailerDetail({ ...editTrailerDetail, is_active: event.target.checked });
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
                                        value={editTrailerDetail.unit} onChange={handleInputChange("unit")} >

                                    </Input>
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="trailer_type_id">Type</Label>
                                    <Input bsSize="sm" className="form-control" type="select" id="trailer_type_id" name="trailer_type_id"
                                        value={editTrailerDetail.trailer_type_id} onChange={handleInputChange("trailer_type_id")} >
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
                                        value={editTrailerDetail.vin_number} onChange={handleInputChange("vin_number")} />
                                </FormGroup>
                            </Col>

                            <Col md={3}>
                                <FormGroup>
                                    <Label for="driver_id">Driver</Label>
                                    <Input bsSize="sm" className="form-control" type="text" id="driver_id" name="driver_id"
                                        value={editTrailerDetail.driver_id} onChange={handleInputChange("driver_id")} />
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="year">Year</Label>
                                    <Input bsSize="sm" className="form-control" type="text" id="year" name="year"
                                        value={editTrailerDetail.year} onChange={handleInputChange("year")} />
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="make">Make.</Label>
                                    <Input bsSize="sm" className="form-control" type="text" id="make" name="make"
                                        value={editTrailerDetail.make} onChange={handleInputChange("make")} />
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="model">Model</Label>
                                    <Input bsSize="sm" className="form-control" type="text" id="model" name="model"
                                        value={editTrailerDetail.model} onChange={handleInputChange("model")} />
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="plate_number">Plate</Label>
                                    <Input bsSize="sm" className="form-control" type="text" id="plate_number" name="plate_number"
                                        value={editTrailerDetail.plate_number} onChange={handleInputChange("plate_number")} />
                                </FormGroup>
                            </Col>
                            <Col md={3}>
                                <FormGroup>
                                    <Label for="plate_state_id">Plate State</Label>
                                    <Input bsSize="sm" className="form-control" type="select" id="plate_state_id" name="plate_state_id"
                                        value={editTrailerDetail.plate_state_id} onChange={handleInputChange("plate_state_id")}>
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
                                        value={editTrailerDetail.description} onChange={handleInputChange("description")} />
                                </FormGroup>
                            </Col>

                            <Col md={3}>
                            <Label for="is_active" className='ml-3'>Active</Label>
                                <FormGroup switch>
                                    <Input type="switch" checked={editTrailerDetail.is_active} onChange={handleStatus} />
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
                                        value={editTrailerDetail.ownership_type_id} onChange={handleInputChange("ownership_type_id")}>
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
                                        <Input bsSize="sm" className="form-control" type="date" id="purchase_date" name="purchase_date"
                                            value={editTrailerDetail.purchase_date} onChange={handleInputChange("purchase_date")} />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="purchase_price">Purchase Price</Label>
                                        <Input bsSize="sm" className="form-control" type="text" id="purchase_price" name="purchase_price"
                                            value={editTrailerDetail.purchase_price} onChange={handleInputChange("purchase_price")} />
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
                                        <Label for="lease_lessor_name">Lesser Name</Label>
                                        <Input bsSize="sm" className="form-control" type="text" id="lease_lessor_name" name="lease_lessor_name"
                                            value={editTrailerDetail.lease_lessor_name} onChange={handleInputChange("lease_lessor_name")} />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_date">Lesser Date</Label>
                                        <Input bsSize="sm" className="form-control" type="text" id="lease_date" name="lease_date"
                                            value={editTrailerDetail.lease_date} onChange={handleInputChange("lease_date")} />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_fid">FID#</Label>
                                        <Input bsSize="sm" className="form-control" type="text" id="lease_fid" name="lease_fid"
                                            value={editTrailerDetail.lease_fid} onChange={handleInputChange("lease_fid")} />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_phone">Phone</Label>
                                        <Input bsSize="sm" className="form-control" type="text" id="lease_phone" name="lease_phone"
                                            value={editTrailerDetail.lease_phone} onChange={handleInputChange("lease_phone")} />
                                    </FormGroup>
                                </Col>
                            </Row>
                            <Row className="page-content align-items-center">
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_suite_number">Suite No.</Label>
                                        <Input bsSize="sm" className="form-control" type="text" id="lease_suite_number" name="lease_suite_number"
                                            value={editTrailerDetail.lease_suite_number} onChange={handleInputChange("lease_suite_number")} />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_street">Street No.</Label>
                                        <Input bsSize="sm" className="form-control" type="text" id="lease_street" name="lease_street"
                                            value={editTrailerDetail.lease_street} onChange={handleInputChange("lease_street")} />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_city">City</Label>
                                        <Input bsSize="sm" className="form-control" type="text" id="lease_city" name="lease_city"
                                            value={editTrailerDetail.lease_city} onChange={handleInputChange("lease_city")} />
                                    </FormGroup>
                                </Col>
                                <Col md={3}>
                                    <FormGroup>
                                        <Label for="lease_state_id"> State</Label>
                                        <Input bsSize="sm" className="form-control" type="select" id="lease_state_id" name="lease_state_id"
                                            value={editTrailerDetail.lease_state_id} onChange={handleInputChange("lease_state_id")}>
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
                                            value={editTrailerDetail.lease_zipcode} onChange={handleInputChange("lease_zipcode")} />
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

            </div>

        </>
    );
};

export default TrailerDetails;