import React, { useState } from 'react'
import { BiCheck } from 'react-icons/bi';
import { RxCross2 } from 'react-icons/rx';
import {
    
    Button,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
  } from "reactstrap";
import { routes } from '../../routes/routes';
import { useNavigate } from 'react-router-dom';
import { ITruckObject, initialStateTruck,  } from '../../../services/tms-objects/truck.types';

interface ICreateNewTruckFormProps {
    isFromTruckPage: boolean
    toggle : () => void
}
const CreateNewTruckForm = ({ isFromTruckPage, toggle} : ICreateNewTruckFormProps ) => {

    const navigate = useNavigate();


    const [ addNewTrucker , setAddNewtrcuker] = useState<ITruckObject>(initialStateTruck )

    const handleInputNewTrucker = ( prop : keyof ITruckObject ) => (e : React.ChangeEvent<HTMLInputElement>) => {
        setAddNewtrcuker({
            ...addNewTrucker, [ prop ] : e.target.value 
            })
    }
    const handleCancleButton = ( ) => {
        // {
        //   history.location.pathname === routes.dashboard
        //     ? history.push(routes.trucks)
        //     : history.goBack();
        // }
        {
          navigate(routes.trucks);
        }
      };
    
  return (
    <Form  className="load-item container p-4">
          <Row className="px-5">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="unit">Unit</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                  id="unit"
                  name="unit"
                   value={addNewTrucker.unit}
                   onChange={handleInputNewTrucker("unit")}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="vin">VIN</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                  id="vin"
                  name="vin"
                  value={addNewTrucker.vin_number}
                  onChange={handleInputNewTrucker("vin_number")}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="ELDprovider">ELD Provider</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="select"
                  id="ELDprovider"
                  name="ELDprovider"
                  value={addNewTrucker.eld_provider_id}
                  onChange={handleInputNewTrucker("eld_provider_id")}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="ELDid">ELD ID</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                  name="ELDid"
                  id="ELDid"
                  value={addNewTrucker.eld_id}
                  onChange={handleInputNewTrucker("eld_id")}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-5">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="year">Year</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  id="year"
                  name="year"
                  type="text"
                  value={addNewTrucker.year}
                  onChange={handleInputNewTrucker("year")}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="make">Make</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  id="make"
                  name="make"
                  type="text"
                  value={addNewTrucker.make}
                  onChange={handleInputNewTrucker("make")}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="ownership">OwnerShip</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="select"
                  id="ownership"
                  name="ownership"
                  value={addNewTrucker.ownership_type_id}
                  onChange={handleInputNewTrucker("ownership_type_id")}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3"></Col>
          </Row>
          <Row className="px-5">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="modal">Model</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  id="modal"
                  name="modal"
                  type="text"
                  value={addNewTrucker.modal}
                  onChange={handleInputNewTrucker("modal")}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3"></Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="purchaseDate">Purchase Date</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  id="purchaseDate"
                  name="purchaseDate"
                  type="date"
                 
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="purchaseprice">Purchase Price</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  id="purchaseprice"
                  name="purchaseprice"
                  type="text"
                  value={addNewTrucker.purchase_price}
                  onChange={handleInputNewTrucker("purchase_price")}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-5">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="driver">Driver</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  id="driver"
                  name="driver"
                  type="text"
                 
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="plate">Plate</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="select"
                  id="plate"
                  name="plate"
                  value={addNewTrucker.plate_state_id}
                  onChange={handleInputNewTrucker("plate_state_id")}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-5">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="plateState">Plate State</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  id="plateState"
                  name="plateState"
                  type="text"
                  value={addNewTrucker.plate_state_id}
                  onChange={handleInputNewTrucker("plate_state_id")}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-5">
            <Col lg={6} md={6} sm={12}>
              <FormGroup>
                <Label for="notes">Notes</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  id="notes"
                  name="notes"
                  type="textarea"
                  rows="3"
                //   value={state.notes}
                //   onChange={handleInput("SET_notes")}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-5">
            <Col lg={6} md={6} sm={12}>
              <FormGroup>
                <Label for="notes">History</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  id="notes"
                  name="history"
                  type="textarea"
                  rows="3"
                //   value={state.history}
                //   onChange={handleInput("SET_history")}
                />
              </FormGroup>
            </Col>
            <Col
              lg={6}
              md={6}
              sm={12}
              className="d-flex justify-content-end align-items-end"
            >
              <Button size="sm" className="me-3 save-button">
                <BiCheck fontSize={"16px"} />
                Save
              </Button>
              { isFromTruckPage ? (
                <Button
                size="sm"
                className="cancel-button"
                onClick={() => {
                  handleCancleButton();
                }}
              >
                <RxCross2 fontSize={"16px"} color="red" /> Cancel
              </Button>) : (
              <Button size="sm" className="cancel-button" onClick={toggle}>
              <RxCross2 fontSize={"16px"} color="red" />
              Close
            </Button>
              )
              }
              
            </Col>
          </Row>
        </Form>
    
  )
}

export default CreateNewTruckForm