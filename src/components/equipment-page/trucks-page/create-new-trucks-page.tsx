import React, { useReducer, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { Header } from "../../header";
import Profile from "../../pofile";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import { initialTruckState, truckType } from "../../tms-object/equipmenrs";
import { useHistory } from "react-router-dom";
import { routes } from "../../routes/routes";

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

const CreateNewTruckPage = () => {
  const history = useHistory();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [state, dispatch] = useReducer(formReducer, initialTruckState);

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
    {
      history.location.pathname === routes.dashboard
        ? history.push(routes.trucks)
        : history.goBack();
    }
  };

  return (
    <>
      <Navbar color="light" className="formpagenavbar">
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
          showHambuger={false}
        />
        <NavbarBrand className="fw-bold px-4">New Truck</NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-3">
          <Profile />
        </div>
      </Navbar>
      <div className="m-2 load-itemmain">
        <Form onSubmit={handleSubmit} className="load-item container p-4">
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
                  value={state.unit}
                  onChange={handleInput("SET_unit")}
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
                  value={state.vin}
                  onChange={handleInput("SET_vin")}
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
                  value={state.ELDprovider}
                  onChange={handleInput("SET_ELDprovider")}
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
                  value={state.ELDid}
                  onChange={handleInput("SET_ELDid")}
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
                  value={state.year}
                  onChange={handleInput("SET_year")}
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
                  value={state.make}
                  onChange={handleInput("SET_make")}
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
                  value={state.ownership}
                  onChange={handleInput("SET_ownership")}
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
                  value={state.modal}
                  onChange={handleInput("SET_modal")}
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
                  value={state.purchaseDate}
                  onChange={handleInput("SET_purchaseDate")}
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
                  value={state.purchasePrice}
                  onChange={handleInput("SET_purchasePrice")}
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
                  value={state.driver}
                  onChange={handleInput("SET_driver")}
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
                  value={state.plate}
                  onChange={handleInput("SET_plate")}
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
                  value={state.plateState}
                  onChange={handleInput("SET_plateState")}
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
                  value={state.notes}
                  onChange={handleInput("SET_notes")}
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
                  value={state.history}
                  onChange={handleInput("SET_history")}
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
              <Button
                size="sm"
                className="cancel-button"
                onClick={() => {
                  handleCancleButton();
                }}
              >
                <RxCross2 fontSize={"16px"} color="red" /> Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default CreateNewTruckPage;
