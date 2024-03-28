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
import { Header } from "../../shared";
import Profile from "../../pofile";
import { BiCheck } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
import {
  initialTrailerState,
  trailersTypes,
} from "../../tms-object/equipmenrs";
// import { useHistory } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { routes } from "../../routes/routes";

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

const CreateNewTrailerPage = () => {
  // const history = useHistory();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
      navigate(routes.trailers);
    }
  };

  return (
    <>
      <Navbar className="formpagenavbar" color="light">
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
          showHambuger={false}
        />
        <NavbarBrand className="fw-bold px-4">New Trailer</NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-3">
          <Profile />
        </div>
      </Navbar>
      <div className="m-2 load-itemmain">
        <Form onSubmit={handleSubmit} className="load-item container p-4">
          <Row>
            <Col md="6">
              <Row className="px-5">
                <Col lg={6} sm={12} className="px-3">
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
                <Col lg={6} sm={12} className="px-3">
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
              </Row>
              <Row className="px-5">
                <Col lg={6} sm={12} className="px-3">
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
                <Col lg={6} sm={12} className="px-3">
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
              </Row>
              <Row className="px-5">
                <Col lg={6} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="modal">Modal</Label>
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
              </Row>
              <Row className="px-5">
                <Col lg={6} sm={12} className="px-3">
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
                <Col lg={6} sm={12} className="px-3">
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
                      <option>3</option>
                      <option>5</option>
                    </Input>
                  </FormGroup>
                </Col>
              </Row>
              <Row className="px-5">
                <Col lg={6} sm={12} className="px-3">
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
                <Col lg={12} md={12} sm={12} className="px-3">
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
                <Col lg={12} md={12} sm={12} className="px-3">
                  <FormGroup>
                    <Label for="history">History</Label>
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
              </Row>
            </Col>
            <Col md="6" className="d-flex flex-column justify-content-between">
              <Row>
                <Row>
                  <Col lg={3} sm={12} className="px-3">
                    <h6 className="fw-bold">OwnerShip</h6>
                    <div className="d-flex mb-2">
                      <FormGroup check>
                        <Input
                          name="radio1"
                          type="radio"
                          value={"Owned"}
                          onChange={handleInput("SET_ownership")}
                          checked={state.ownership === "Owned"}
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
                  </Col>
                </Row>

                <Row style={{ marginTop: "3.9rem !important" }}>
                  <Col lg={6} sm={12} className="px-3">
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
                </Row>
                <Row>
                  <Col lg={6} sm={12} className="px-3">
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
              </Row>

              <Row className="px-5">
                <Col sm={12} className="px-3 d-flex justify-content-end">
                  <Button size="sm" className="me-3 save-button ps-3 pe-3">
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
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default CreateNewTrailerPage;
