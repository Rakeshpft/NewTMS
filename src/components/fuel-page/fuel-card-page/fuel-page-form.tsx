import React, { useEffect, useState } from "react";
import {
  Form,
  Col,
  Row,
  FormGroup,
  Label,
  Button,
  Input,
} from "reactstrap";
import CommonLayOut from "../../../layout";
import { IFuelCardObject, fuelCardInitialState } from "../../../services/tms-objects/fuel-card.types";
import { useFuelCardContext } from "../../../services/reducer/fuel-card.reducer";

export type IFuelCardProp = {
  fuel_card_id?: number;
  handleSubmit?: (obj: any) => void;
}

const CreateFuelCardPage = (prop: IFuelCardProp) => {
  const {
    fuel_card_id = 0,
    handleSubmit = undefined
  } = prop;

  const [editFuelCardDetail, setEditFuelCardDetail] = useState<IFuelCardObject>(fuelCardInitialState);
  const { getFuelCardDetail, fuelCardDetail, isLoading } = useFuelCardContext();
  const handleFormSubmission = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEditFuelCardDetail({
      ...editFuelCardDetail,
      fuel_card_id: 1,
    })
    handleSubmit && handleSubmit(editFuelCardDetail);
  };

  useEffect(() => {
    debugger;
    if (!isLoading && fuelCardDetail) {
      setEditFuelCardDetail(fuelCardDetail);
    }
  }, [fuelCardDetail])
  useEffect(() => {
    debugger;
    if (fuel_card_id > 0) {
      getFuelCardDetail(fuel_card_id);
    }
  }, []);

  const handleInput =
    (prop: keyof IFuelCardObject) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditFuelCardDetail({
          ...editFuelCardDetail,
          [prop]: event.target.value,
        });
      };
  const handleStatus = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditFuelCardDetail({ ...editFuelCardDetail, is_active: event.target.checked });
  };
  return (
    <CommonLayOut>
      <div className="page-title">{editFuelCardDetail.fuel_card_id == 0 ? "Create" : "Edit"} Fuel Card</div>
      <div className="page-content">
        <Form onSubmit={handleFormSubmission}>
          <Row>
            <Col lg={3} md={6} sm={12}>
              <FormGroup>
                <Label for="cardNumber">Card Number</Label>
                <Input bsSize="sm" className="form-control" type="text" name="card_number" id="cardNumber" value={editFuelCardDetail.card_number} onChange={handleInput("card_number")} />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="expirationDate">Expiration Date</Label>
                <Input bsSize="sm" className="form-control" type="date" name="expiration_date" id="expirationDate" value={editFuelCardDetail.expiration_date} onChange={handleInput("expiration_date")} />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12}>
              <Label for="Active">Active</Label>
              <FormGroup switch>
                <Input type="switch" checked={editFuelCardDetail.is_active} onChange={handleStatus} />
              </FormGroup>
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={6} sm={12}>
              <FormGroup>
                <Label for="notes">Notes</Label>
                <Input bsSize="sm" className="form-control" type="textarea" rows="3" name="notes" id="notes" value={editFuelCardDetail.notes} onChange={handleInput("notes")} />
              </FormGroup>
            </Col>
          </Row>
          <Row className="d-flex justify-content-end">
            <Col md={3} className=" d-flex justify-content-end align-items-end pb-3" >
              <Button color="primary" size="sm" className="me-3" type="submit">Save</Button>
              <Button size="sm" color="danger" outline={true} >Close</Button>
            </Col>
          </Row>
          {editFuelCardDetail.fuel_card_id > 0 && (
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
    </CommonLayOut>
  );
};

export default CreateFuelCardPage;
