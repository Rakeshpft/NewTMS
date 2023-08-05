import React, { useReducer } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { truckType } from "../../tms-object/equipmenrs";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";

type FormAction =
  | { type: "SET_unit"; payload: string }
  | { type: "SET_vin"; payload: string }
  | { type: "SET_ELDprovider"; payload: string }
  | { type: "SET_ELDid"; payload: string }
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

const formReducer = (state: truckType, action: FormAction): truckType => {
  switch (action.type) {
    case "SET_unit":
      return { ...state, unit: action.payload };
    case "SET_vin":
      return { ...state, vin: action.payload };
    case "SET_ELDprovider":
      return { ...state, ELDprovider: action.payload };
    case "SET_ELDid":
      return { ...state, ELDid: action.payload };
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

const initialState: truckType = {
  unit: "",
  vin: "",
  ELDprovider: "",
  ELDid: "",
  year: "",
  make: "",
  ownership: "",
  modal: "",
  purchaseDate: "",
  purchasePrice: "",
  driver: "",
  plate: "",
  plateState: "",
  notes: "",
  history: "",
};

interface TruckModalPageProps {
  isTruckOpen: boolean;
  toggle: () => void;
}

const TruckModalPage = ({ isTruckOpen, toggle }: TruckModalPageProps) => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <>
      <Modal isOpen={isTruckOpen} toggle={toggle} size="lg">
        <ModalHeader toggle={toggle} style={{ backgroundColor: "#E9F3FB" }}>
          New Truck
        </ModalHeader>
        <ModalBody>
          <Container>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Row>
                    <Col sm={3}>
                      <FormGroup>
                        <Label
                          for="exampleunit"
                          style={{ marginBottom: "0", fontSize: "small" }}
                        >
                          Unit
                        </Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          type="text"
                          value={state.unit}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_unit",
                              payload: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={3}>
                      <FormGroup>
                        <Label style={{ marginBottom: "0", fontSize: "small" }}>
                          VIN
                        </Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          type="text"
                          value={state.vin}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_vin",
                              payload: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={3}>
                      <FormGroup>
                        <Label
                          for="exampleSelect"
                          style={{ marginBottom: "0", fontSize: "small" }}
                        >
                          ELD Provider
                        </Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          type="select"
                          id="exampleSelect"
                          name="select"
                          value={state.ELDprovider}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_ELDprovider",
                              payload: e.target.value,
                            });
                          }}
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col sm={3}>
                      <FormGroup>
                        <Label style={{ marginBottom: "0", fontSize: "small" }}>
                          ELD ID
                        </Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          type="text"
                          value={state.ELDid}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_ELDid",
                              payload: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={3}>
                      <FormGroup>
                        <Label
                          style={{ marginBottom: "0", fontSize: "small" }}
                          for="exampleyear"
                        >
                          Year
                        </Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          id="exampleyear"
                          name="year"
                          type="text"
                          value={state.year}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_year",
                              payload: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={3}>
                      <FormGroup>
                        <Label
                          style={{ marginBottom: "0", fontSize: "small" }}
                          for="examplemake"
                        >
                          Make
                        </Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          id="examplemake"
                          name="make"
                          type="text"
                          value={state.make}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_make",
                              payload: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={3}>
                      <FormGroup>
                        <Label
                          for="exampleSelect"
                          style={{ marginBottom: "0", fontSize: "small" }}
                        >
                          OwnerShip
                        </Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          type="select"
                          id="exampleSelect"
                          name="select"
                          value={state.ownership}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_ownership",
                              payload: e.target.value,
                            });
                          }}
                        >
                          <option>1</option>
                          <option>2</option>
                          <option>3</option>
                          <option>4</option>
                          <option>5</option>
                        </Input>
                      </FormGroup>
                    </Col>
                    <Col sm={3}></Col>
                  </Row>
                  <Row>
                    <Col sm={3}>
                      <FormGroup>
                        <Label
                          for="examplemodal"
                          style={{ marginBottom: "0", fontSize: "small" }}
                        >
                          Modal
                        </Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          id="examplemodal"
                          name="modal"
                          type="text"
                          value={state.modal}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_modal",
                              payload: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={3}></Col>
                    <Col sm={3}>
                      <FormGroup>
                        <Label
                          for="examplepurchaseDate"
                          style={{ marginBottom: "0", fontSize: "small" }}
                        >
                          Purchase Date
                        </Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          id="examplepurchaseDate"
                          name="purchaseDate"
                          type="date"
                          value={state.purchaseDate}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_purchaseDate",
                              payload: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={3}>
                      <FormGroup>
                        <Label
                          for="examplepurchaseprice"
                          style={{ marginBottom: "0", fontSize: "small" }}
                        >
                          Purchase Price
                        </Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          id="examplepurchaseprice"
                          name="purchaseprice"
                          type="text"
                          value={state.purchasePrice}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_purchasePrice",
                              payload: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={3}>
                      <FormGroup>
                        <Label
                          for="exampledriver"
                          style={{ marginBottom: "0", fontSize: "small" }}
                        >
                          Driver
                        </Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          id="exampledriver"
                          name="driver"
                          type="text"
                          value={state.driver}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_driver",
                              payload: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                    <Col sm={3}>
                      <FormGroup>
                        <Label
                          for="exampleSelect"
                          style={{ marginBottom: "0", fontSize: "small" }}
                        >
                          Plate
                        </Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          type="select"
                          id="exampleSelect"
                          name="select"
                          value={state.plate}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_plate",
                              payload: e.target.value,
                            });
                          }}
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
                  <Row>
                    <Col sm={3}>
                      <FormGroup>
                        <Label
                          for="exampleplateState"
                          style={{ marginBottom: "0", fontSize: "small" }}
                        >
                          Plate State
                        </Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          id="exampleplateState"
                          name="plateState"
                          type="text"
                          value={state.plateState}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_plateState",
                              payload: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label
                          for="examplenotes"
                          style={{ marginBottom: "0", fontSize: "small" }}
                        >
                          Notes
                        </Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          id="examplenotes"
                          name="notes"
                          type="textarea"
                          rows="3"
                          value={state.notes}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_notes",
                              payload: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={6}>
                      <FormGroup>
                        <Label
                          for="examplehistory"
                          style={{ marginBottom: "0px", fontSize: "small" }}
                        >
                          Histoy
                        </Label>
                        <Input
                          bsSize="sm"
                          style={{
                            color: "black",
                            border: "1px solid #418ECB",
                          }}
                          id="examplehistory"
                          name="history"
                          type="textarea"
                          rows="3"
                          value={state.history}
                          onChange={(e) => {
                            dispatch({
                              type: "SET_history",
                              payload: e.target.value,
                            });
                          }}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button
            color="primary"
            size="sm"
            className="me-3"
            style={{
              color: "black",
              border: "1px solid #1E5367",
              backgroundColor: "#418ECB",
            }}
          >
            <BiCheck fontSize={"16px"} />
            Save
          </Button>
          <Button
            size="sm"
            style={{
              color: "red",
              border: "1px solid red",
              backgroundColor: "white",
            }}
            onClick={toggle}
          >
            <RxCross2 fontSize={"16px"} color="red" />
            Close
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default TruckModalPage;
