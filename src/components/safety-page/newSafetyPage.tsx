import React, { useReducer } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";

import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from 'react-router-dom';

import { initialTrailerState, trailersTypes } from "../tms-object/equipmenrs";
import { routes } from "../routes/routes";

interface SafetyModalProps {
  isSafetyOpen: boolean;
  toggle: () => void;
}

type FormAction =
  | { type: "SET_unit"; payload: string }
  | { type: "SET_vin"; payload: string }
  | { type: "SET_year"; payload: string }
  | { type: "SET_make"; payload: string }
  | { type: "SET_ownership"; payload: string }
  | { type: "SET_modal"; payload: string }
  | { type: "SET_purchaseDate"; payload: string }
  | { type: "SET_purchasePrice"; payload: string }
  | { type: "SET_driver"; payload: string }
  | { type: "SET_plate"; payload: string }
  | { type: "SET_plateState"; payload: string }
  | { type: "SET_notes"; payload: string }
  | { type: "SET_history"; payload: string };

const formReducer = (
  state: trailersTypes,
  action: FormAction
): trailersTypes => {
  switch (action.type) {
    case "SET_unit":
      return { ...state, unit: action.payload };
    case "SET_vin":
      return { ...state, vin: action.payload };
    case "SET_year":
      return { ...state, year: action.payload };
    case "SET_make":
      return { ...state, make: action.payload };
    case "SET_ownership":
      return { ...state, ownership: action.payload };
    case "SET_modal":
      return { ...state, modal: action.payload };
    case "SET_purchaseDate":
      return { ...state, purchaseDate: action.payload };
    case "SET_purchasePrice":
      return { ...state, purchasePrice: action.payload };
    case "SET_driver":
      return { ...state, driver: action.payload };
    case "SET_plate":
      return { ...state, plate: action.payload };
    case "SET_plateState":
      return { ...state, plateState: action.payload };
    case "SET_notes":
      return { ...state, notes: action.payload };
    case "SET_history":
      return { ...state, history: action.payload };
    default:
      return state;
  }
};

const NewSafetyPage = ({ isSafetyOpen, toggle }: SafetyModalProps) => {
    const navigate = useNavigate();
  const [state, dispatch] = useReducer(formReducer, initialTrailerState);

  const handleInput =
    (type: FormAction["type"]) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      dispatch({ type, payload: event.target.value });
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);
  };

  const handleCancleButton = () => {
    // {
    //   history.location.pathname === routes.dashboard
    //     ? history.push(routes.trailers)
    //     : history.goBack();
    // }
     {
        navigate(routes.trailers)
     }
       
  };

  const closeBtn = (
    <button className="border-0 bg-transparent" onClick={toggle} type="button">
      <RxCross2 />
    </button>
  );

  return (
    <div>
      <Modal isOpen={isSafetyOpen} toggle={toggle} size="lg">
        <ModalHeader close={closeBtn} className="modalColor">
          <h6 className="mb-0 fw-bold "> New/Edit Claim </h6>
        </ModalHeader>
        <ModalBody>
          <Container>
            <div className="m-2 load-itemmain">
              <Form onSubmit={handleSubmit} className="load-item container p-4">
                
                  
                    <Row className="px-5">
                      <Col lg={4} sm={12} className="px-3">
                        <FormGroup>
                          <Label for="plate">Status</Label>
                          <Input
                            bsSize="sm"
                            className="form-control form-control-sm"
                            type="select"
                            id="plate"
                            name="plate"
                            value={state.make}
                            onChange={handleInput("SET_plate")}
                          >
                            <option>Active</option>
                            <option>Inactive</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col lg={4} sm={12} className="px-3">
                        <FormGroup>
                          <Label> Date </Label>
                          <Input
                            bsSize="sm"
                            id="exampleSelect"
                            name="select"
                            type="date"
                            className="form-control form-control-sm"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="px-5">
                      <Col lg={4} sm={12} className="px-3">
                      <FormGroup>
                          <Label for="plate">Type</Label>
                          <Input
                            bsSize="sm"
                            className="form-control form-control-sm"
                            type="select"
                            id="plate"
                            name="plate"
                            value={state.plate}
                            onChange={handleInput("SET_plate")}
                          >
                            <option>Active</option>
                            <option>Inactive</option>
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col lg={4} sm={12} className="px-3">
                        <FormGroup>
                          <Label for="make">Amount</Label>
                          <Input
                            bsSize="sm"
                            className="form-control form-control-sm"
                            id="make"
                            name="make"
                            type="text"
                            value={state.make}
                            onChange={handleInput("SET_make")}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    
                    <Row className="px-5">
                      <Col lg={4} sm={12} className="px-3">
                        <FormGroup>
                          <Label for="driver">Driver</Label>
                          <Input
                            bsSize="sm"
                            className="form-control form-control-sm"
                            id="driver"
                            name="driver"
                            type="text"
                            value={state.driver}
                            onChange={handleInput("SET_driver")}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg={4} sm={12} className="px-3">
                        <FormGroup>
                          <Label for="plate">Truck</Label>
                          <Input
                            bsSize="sm"
                            className="form-control form-control-sm"
                            type="text"
                            id="plate"
                            name="plate"
                            value={state.plate}
                            onChange={handleInput("SET_plate")}
                          >
                            
                          </Input>
                        </FormGroup>
                      </Col>
                      <Col lg={4} sm={12} className="px-3" >
                          <FormGroup>
                            <Label for="purchaseprice">Trailer</Label>
                            <Input
                              bsSize="sm"
                              className="form-control form-control-sm"
                              id="purchaseprice"
                              name="purchaseprice"
                              type="text"
                              value={state.purchasePrice}
                              onChange={handleInput("SET_purchasePrice")}
                            />
                          </FormGroup>
                        </Col>
                    </Row>
                    
                    <Row className="px-5">
                      <Col lg={8} md={12} sm={12} className="px-3">
                        <FormGroup>
                          <Label for="notes">Short Description </Label>
                          <Input
                            bsSize="sm"
                            className="form-control form-control-sm"
                            id="notes"
                            name="notes"
                            type="textarea"
                            rows="3"
                            value={state.notes}
                            onChange={handleInput("SET_notes")}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row className="px-5">
                      <Col lg={8} md={12} sm={12} className="px-3">
                        <FormGroup>
                          <Label for="history">Full Description</Label>
                          <Input
                            bsSize="sm"
                            className="form-control form-control-sm"
                            id="history"
                            name="history"
                            type="textarea"
                            rows="3"
                            value={state.history}
                            onChange={handleInput("SET_history")}
                          />
                        </FormGroup>
                      </Col>
                      <Col md={4} className="px-3 d-flex justify-content-end align-items-end pb-2">
                        <Button
                          size="sm"
                          className="me-3 save-button ps-3 pe-3"
                        >
                          <BiCheck fontSize={"16px"} />
                          Save
                        </Button>
                        <Button
                          size="sm"
                          className="cancel-button"
                          onClick={handleCancleButton}
                        >
                          <RxCross2 fontSize={"16px"} color="red" /> Cancel
                        </Button>
                      </Col>

                    </Row>
                 
                  
                  

                    
                  
                
              </Form>
            </div>
          </Container>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default NewSafetyPage;
