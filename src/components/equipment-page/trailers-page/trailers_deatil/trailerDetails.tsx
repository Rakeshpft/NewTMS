import React, { useEffect, useState } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { useTrailerContext } from '../../../../services/reducer/trailer.reducer';
import { ITrailerObject, trailerInitialState } from '../../../../services/tms-objects/trailer.types';
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
    const [editTrailerDetail, setEditTrailerDetail] = useState<ITrailerObject>(trailerInitialState);
    const { getTrailerDetail, trailerDetail, isLoading } = useTrailerContext();
    const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setEditTrailerDetail({
            ...editTrailerDetail,
            trailer_id: 1,
        })
        handleSubmit && handleSubmit(editTrailerDetail);
    };

    useEffect(() => {
        debugger;
        if (!isLoading && trailerDetail) {
            setEditTrailerDetail(trailerDetail);
        }
    }, [trailerDetail])
    useEffect(() => {
        debugger;
        if (trailer_id > 0) {
            getTrailerDetail(trailer_id);
        }
    }, []);

    const handleInput =
        (prop: keyof ITrailerObject) =>
            (event: React.ChangeEvent<HTMLInputElement>) => {
                setEditTrailerDetail({
                    ...editTrailerDetail,
                    [prop]: event.target.value,
                });
            };
    const handleStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditTrailerDetail({ ...editTrailerDetail, status_id: event.target.checked });
    };
    return (
        <>
            <div className="page-title">{editTrailerDetail.trailer_id == 0 ? "Create" : "Edit"} Trailer</div>
            <div className="page-content">
                <Form onSubmit={handleFormSubmission}>
                    <Row>
                        <Col lg={4} md={6} sm={12}>
                            <FormGroup switch>
                                <Input type="switch" checked={editTrailerDetail.status_id} onChange={handleStatus} /><Label for="Active" className='ml-3'>Active</Label>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className='mt-3'>
                        <Col lg={3} md={6} sm={12} >
                            <FormGroup className="px-3">
                                <Label for="Unit">Unit</Label>
                                <Input bsSize="sm" className="form-control" type="text" name="unit" id="unit" value={editTrailerDetail.unit} onChange={handleInput("unit")} />
                            </FormGroup>
                        </Col>

                        <Col lg={3} md={6} sm={12} >
                            <FormGroup className="px-3">
                                <Label for="type_id">Type</Label>
                                <Input bsSize="sm" className="form-control" type="text" name="type_id" id="type_id" value={editTrailerDetail.type_id} onChange={handleInput("type_id")} />
                            </FormGroup>
                        </Col>


                        <Col lg={3} md={6} sm={12} className="px-3">
                            <FormGroup>
                                <Label for="vin_number">VIN</Label>
                                <Input bsSize="sm" className="form-control" type="text" name="vin_number" id="vin_number" value={editTrailerDetail.vin_number} onChange={handleInput("vin_number")} />
                            </FormGroup>
                        </Col>
                        <Col lg={3} md={6} sm={12}>
                            <FormGroup>
                                <Label for="driver_id">Driver</Label>
                                <Input bsSize="sm" className="form-control" type="text" rows="3" name="driver_id" id="driver_id" value={editTrailerDetail.driver_id} onChange={handleInput("driver_id")} />
                            </FormGroup>
                        </Col>

                    </Row>
                    <Row >
                        <Col lg={3} md={6} sm={12} >
                            <FormGroup className="px-3">
                                <Label for="Unit">Year</Label>
                                <Input bsSize="sm" className="form-control" type="text" name="unit" id="unit" value={editTrailerDetail.unit} onChange={handleInput("unit")} />
                            </FormGroup>
                        </Col>

                        <Col lg={3} md={6} sm={12} >
                            <FormGroup className="px-3">
                                <Label for="type_id">Make</Label>
                                <Input bsSize="sm" className="form-control" type="text" name="type_id" id="type_id" value={editTrailerDetail.type_id} onChange={handleInput("type_id")} />
                            </FormGroup>
                        </Col>


                        <Col lg={3} md={6} sm={12} className="px-3">
                            <FormGroup>
                                <Label for="vin_number">Model</Label>
                                <Input bsSize="sm" className="form-control" type="text" name="vin_number" id="vin_number" value={editTrailerDetail.vin_number} onChange={handleInput("vin_number")} />
                            </FormGroup>
                        </Col>
                        <Col lg={3} md={6} sm={12}>
                            <FormGroup>
                                <Label for="driver_id">Plate</Label>
                                <Input bsSize="sm" className="form-control" type="text" rows="3" name="driver_id" id="driver_id" value={editTrailerDetail.driver_id} onChange={handleInput("driver_id")} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row >
                        <Col lg={3} md={6} sm={12} >
                            <FormGroup className="px-3">
                                <Label for="plate_state_id">Plate State</Label>
                                <Input bsSize="sm" className="form-control" type="text" name="plate_state_id" id="plate_state_id" value={editTrailerDetail.plate_state_id} onChange={handleInput("unit")} />
                            </FormGroup>
                        </Col>

                        <Col lg={3} md={6} sm={12} >
                            <FormGroup className="px-3">
                                <Label for="type_id">Description</Label>
                                <Input bsSize="sm" className="form-control" type="text" name="type_id" id="type_id" value={editTrailerDetail.type_id} onChange={handleInput("type_id")} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="page-subtitle">
                        <FormGroup className="px-3">
                            <Col>Ownership Details</Col>
                        </FormGroup>
                    </Row>
                    <Row >
                        <Col lg={3} md={6} sm={12} >
                            <FormGroup className="px-3">
                                <Label for="plate_state_id">Ownership</Label>
                                <Input bsSize="sm" className="form-control" type="text" name="plate_state_id" id="plate_state_id" value={editTrailerDetail.plate_state_id} onChange={handleInput("unit")} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row >
                        <Col lg={3} md={6} sm={12} >
                            <FormGroup className="px-3">
                                <Label for="plate_state_id">Purchase Date</Label>
                                <Input bsSize="sm" className="form-control" type="text" name="plate_state_id" id="plate_state_id" value={editTrailerDetail.plate_state_id} onChange={handleInput("unit")} />
                            </FormGroup>
                        </Col>

                        <Col lg={3} md={6} sm={12} >
                            <FormGroup className="px-3">
                                <Label for="type_id">Purchase Price</Label>
                                <Input bsSize="sm" className="form-control" type="text" name="type_id" id="type_id" value={editTrailerDetail.type_id} onChange={handleInput("type_id")} />
                            </FormGroup>
                        </Col>
                    </Row>

                    <Row >
                        <Col lg={3} md={6} sm={12} >
                            <FormGroup className="px-3">
                                <Label for="Unit">Lesser Name</Label>
                                <Input bsSize="sm" className="form-control" type="text" name="unit" id="unit" value={editTrailerDetail.unit} onChange={handleInput("unit")} />
                            </FormGroup>
                        </Col>

                        <Col lg={3} md={6} sm={12} >
                            <FormGroup className="px-3">
                                <Label for="type_id">Lesser Date</Label>
                                <Input bsSize="sm" className="form-control" type="text" name="type_id" id="type_id" value={editTrailerDetail.type_id} onChange={handleInput("type_id")} />
                            </FormGroup>
                        </Col>


                        <Col lg={3} md={6} sm={12} className="px-3">
                            <FormGroup>
                                <Label for="vin_number">FID</Label>
                                <Input bsSize="sm" className="form-control" type="text" name="vin_number" id="vin_number" value={editTrailerDetail.vin_number} onChange={handleInput("vin_number")} />
                            </FormGroup>
                        </Col>
                        <Col lg={3} md={6} sm={12}>
                            <FormGroup>
                                <Label for="driver_id">Phone</Label>
                                <Input bsSize="sm" className="form-control" type="text" rows="3" name="driver_id" id="driver_id" value={editTrailerDetail.driver_id} onChange={handleInput("driver_id")} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row >
                        <Col lg={3} md={6} sm={12} >
                            <FormGroup className="px-3">
                                <Label for="Unit">Suite No.</Label>
                                <Input bsSize="sm" className="form-control" type="text" name="unit" id="unit" value={editTrailerDetail.unit} onChange={handleInput("unit")} />
                            </FormGroup>
                        </Col>

                        <Col lg={3} md={6} sm={12} >
                            <FormGroup className="px-3">
                                <Label for="type_id">Street No.</Label>
                                <Input bsSize="sm" className="form-control" type="text" name="type_id" id="type_id" value={editTrailerDetail.type_id} onChange={handleInput("type_id")} />
                            </FormGroup>
                        </Col>


                        <Col lg={3} md={6} sm={12} className="px-3">
                            <FormGroup>
                                <Label for="vin_number">City</Label>
                                <Input bsSize="sm" className="form-control" type="text" name="vin_number" id="vin_number" value={editTrailerDetail.vin_number} onChange={handleInput("vin_number")} />
                            </FormGroup>
                        </Col>
                        <Col lg={3} md={6} sm={12}>
                            <FormGroup>
                                <Label for="driver_id">State</Label>
                                <Input bsSize="sm" className="form-control" type="text" rows="3" name="driver_id" id="driver_id" value={editTrailerDetail.driver_id} onChange={handleInput("driver_id")} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row >
                        <Col lg={3} md={6} sm={12} >
                            <FormGroup className="px-3">
                                <Label for="Unit">ZIP</Label>
                                <Input bsSize="sm" className="form-control" type="text" name="unit" id="unit" value={editTrailerDetail.unit} onChange={handleInput("unit")} />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <Button type="submit" size="sm" color="primary">Save</Button>
                            <Button size="sm" color="danger" className="ms-2" outline={true}>Cancel</Button>
                        </Col>
                    </Row>
                    {editTrailerDetail.trailer_id > 0 && (
                        <>
                            <Row className="mt-4">
                                <Col>
                                    <span className="page-subtitle">Driver</span>
                                    <Button size="sm" color="primary" className="float-end" >Assign Card</Button>
                                </Col>
                            </Row>
                            <Row>
                                <Col sm={12}>
                                </Col>
                            </Row>
                        </>
                    )
                    }
                </Form>
            </div>
        </>
    );
};

export default TrailerDetails;