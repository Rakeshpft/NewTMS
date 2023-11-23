import React, { useReducer } from "react";
import {
  initialTrailerState,
  trailersTypes,
} from "../../tms-object/equipmenrs";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import {
  Container,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";

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

interface TrailerModalPageProps {
  isTrailerOpen: boolean;
  toggle: () => void;
}
const TrailerModalPage = ({ isTrailerOpen, toggle }: TrailerModalPageProps) => {
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

  const handleTrailerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);
  };
  return (
    <>
      <Modal isOpen={isTrailerOpen} toggle={toggle} size="xl" backdrop="static">
        <ModalHeader toggle={toggle} className="py-2">
          <h6 className="fw-bold mb-0">New Trailer</h6>
        </ModalHeader>
        <ModalBody>
          <Container>
            <Form className="newTrailerForm">
              <Row>
                <Col md={6} lg={3} className="px-4">
                  <FormGroup>
                    <Label for="exampleunit">Unit</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      name="unit"
                      value={state.unit}
                      onChange={handleInput("SET_unit")}
                    />
                  </FormGroup>
                </Col>
                <Col md={6} lg={3} className="px-4">
                  <FormGroup>
                    <Label>VIN</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="text"
                      name="vin"
                      value={state.vin}
                      onChange={handleInput("SET_vin")}
                    />
                  </FormGroup>
                </Col>
                <Col md={6} lg={3} className="px-4">
                  <FormGroup tag="fieldset">
                    <h6 className="fw-bold">OwnerShip</h6>
                    <div className="d-flex">
                      <FormGroup check>
                        <Input
                          name="radio1"
                          type="radio"
                          value={"owned"}
                          onChange={handleInput("SET_ownership")}
                          checked={state.ownership === "owned"}
                        />
                        <Label check className="me-2">
                          Owned
                        </Label>
                      </FormGroup>
                      <FormGroup check>
                        <Input
                          name="radio1"
                          type="radio"
                          value={"Leased"}
                          onChange={handleInput("SET_ownership")}
                          checked={state.ownership === "Leased"}
                        />
                        <Label check>Leased</Label>
                      </FormGroup>
                    </div>
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6} lg={3} className="px-4">
                  <FormGroup>
                    <Label for="exampleyear">Year</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      id="exampleyear"
                      name="year"
                      type="text"
                      value={state.year}
                      onChange={handleInput("SET_year")}
                    />
                  </FormGroup>
                </Col>
                <Col md={6} lg={3} className="px-4">
                  <FormGroup>
                    <Label for="examplemake">Make</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      id="examplemake"
                      name="make"
                      type="text"
                      value={state.make}
                      onChange={handleInput("SET_make")}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6} lg={3} className="px-4">
                  <FormGroup>
                    <Label for="examplemodal">Modal</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      id="examplemodal"
                      name="modal"
                      type="text"
                      value={state.modal}
                      onChange={handleInput("SET_modal")}
                    />
                  </FormGroup>
                </Col>
                <Col md={6} lg={3} className="px-4"></Col>
                <Col md={6} lg={3} className="px-4"></Col>
              </Row>
              <Row>
                <Col md={6} lg={3} className="px-4">
                  <FormGroup>
                    <Label for="exampledriver">Driver</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      id="exampledriver"
                      name="driver"
                      type="text"
                      value={state.driver}
                      onChange={handleInput("SET_driver")}
                    />
                  </FormGroup>
                </Col>
                <Col md={6} lg={3} className="px-4">
                  <FormGroup>
                    <Label>Plate</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      type="select"
                      id="exampleSelect"
                      name="plate"
                      value={state.plate}
                      onChange={handleInput("SET_plate")}
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>3</option>
                      <option>5</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={6} lg={3} className="px-4">
                  <FormGroup>
                    <Label for="examplepurchaseDate">Purchase Date</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      id="examplepurchaseDate"
                      name="purchaseDate"
                      type="date"
                      value={state.purchaseDate}
                      onChange={handleInput("SET_purchaseDate")}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6} lg={3} className="px-4">
                  <FormGroup>
                    <Label for="exampleplateState">Plate State</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      id="exampleplateState"
                      name="plateState"
                      type="text"
                      value={state.plateState}
                      onChange={handleInput("SET_plateState")}
                    />
                  </FormGroup>
                </Col>
                <Col md={6} lg={3} className="px-4"></Col>
                <Col md={6} lg={3} className="px-4">
                  <FormGroup>
                    <Label for="examplepurchaseprice">Purchase Price</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      id="examplepurchaseprice"
                      name="purchasePrice"
                      type="text"
                      value={state.purchasePrice}
                      onChange={handleInput("SET_purchasePrice")}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col md={6} className="px-4">
                  <FormGroup>
                    <Label for="examplenotes">Notes</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      id="examplenotes"
                      name="notes"
                      type="textarea"
                      rows="3"
                      value={state.notes}
                      onChange={handleInput("SET_notes")}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col md={6} className="px-4">
                  <FormGroup>
                    <Label for="examplehistory">History</Label>
                    <Input
                      bsSize="sm"
                      className="form-control form-control-sm"
                      id="examplehistory"
                      name="history"
                      type="textarea"
                      rows="3"
                      value={state.history}
                      onChange={handleInput("SET_history")}
                    />
                  </FormGroup>
                </Col>
                <Col
                  md={3}
                  className="px-4 d-flex justify-content-end align-items-end"
                >
                  <Button
                    color="primary"
                    size="sm"
                    className="me-3 save-button"
                    onClick={handleTrailerSubmit}
                    type="submit"
                  >
                    <BiCheck fontSize={"16px"} />
                    Save
                  </Button>
                  <Button size="sm" className="cancel-button" onClick={toggle}>
                    <RxCross2 fontSize={"16px"} color="red" />
                    Close
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </ModalBody>
      </Modal>
    </>
  );
};

export default TrailerModalPage;
