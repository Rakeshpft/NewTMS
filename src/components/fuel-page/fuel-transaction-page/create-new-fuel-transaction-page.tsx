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
  fuelTransaction,
  initialFuelTransactionState,
} from "../../tms-object/fuelpage";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { routes } from "../../routes/routes";

type FormAction =
  | { type: "SET_driver"; payload: string }
  | { type: "SET_addnew"; payload: string }
  | { type: "SET_additionalPayee"; payload: string }
  | { type: "SET_fuelCard"; payload: string }
  | { type: "SET_date"; payload: string }
  | { type: "SET_amount"; payload: string }
  | { type: "SET_ifta"; payload: boolean }
  | { type: "SET_city"; payload: string }
  | { type: "SET_state"; payload: string }
  | { type: "SET_unitGallons"; payload: string }
  | { type: "SET_productCode"; payload: string }
  | { type: "SET_zip"; payload: string }
  | { type: "SET_truck"; payload: string }
  | { type: "SET_trailer"; payload: string }
  | { type: "SET_notes"; payload: string };

const formReducer = (
  state: fuelTransaction,
  action: FormAction
): fuelTransaction => {
  switch (action.type) {
    case "SET_driver":
      return { ...state, driver: action.payload };
    case "SET_addnew":
      return { ...state, addnew: action.payload };
    case "SET_additionalPayee":
      return { ...state, additionalPayee: action.payload };
    case "SET_fuelCard":
      return { ...state, fuelCard: action.payload };
    case "SET_date":
      return { ...state, date: action.payload };
    case "SET_amount":
      return { ...state, amount: action.payload };
    case "SET_ifta":
      return { ...state, ifta: !state.ifta };
    case "SET_city":
      return { ...state, city: action.payload };
    case "SET_state":
      return { ...state, state: action.payload };
    case "SET_unitGallons":
      return { ...state, unitGallons: action.payload };
    case "SET_productCode":
      return { ...state, productCode: action.payload };
    case "SET_zip":
      return { ...state, zip: action.payload };
    case "SET_truck":
      return { ...state, truck: action.payload };
    case "SET_trailer":
      return { ...state, trailer: action.payload };
    case "SET_notes":
      return { ...state, notes: action.payload };
    default:
      return state;
  }
};

const CreateNewFuelTransactionPage = () => {
  // const history = useHistory();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [state, dispatch] = useReducer(
    formReducer,
    initialFuelTransactionState
  );

  const handleInput =
    (type: FormAction["type"]) =>
    (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      dispatch({ type, payload: event.target.value } as FormAction);
    };

  const handleCheckboxChange =
    (type: FormAction["type"]) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type,
        payload: event.target.checked,
      } as FormAction);
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);
  };

  const handleCancleButton = () => {
    // {
    //   history.location.pathname === routes.dashboard
    //     ? history.push(routes.fuelTransaction)
    //     : history.goBack();
    // }
    {
      navigate(routes.fuelTransaction);
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
        <NavbarBrand className="fw-bold px-4">New Fuel Transaction</NavbarBrand>
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
                <Label for="driver">Driver</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                  name="driver"
                  id="driver"
                  value={state.driver}
                  onChange={handleInput("SET_driver")}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3"></Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="addnew">Additional Payee</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                  name="addnew"
                  id="addnew"
                  value={state.addnew}
                  onChange={handleInput("SET_addnew")}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="fuelCard">Fuel Card</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  type="text"
                  name="fuelCard"
                  id="fuelCard"
                  value={state.fuelCard}
                  onChange={handleInput("SET_fuelCard")}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-5">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="date">Date</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  id="date"
                  name="date"
                  type="date"
                  value={state.date}
                  onChange={handleInput("SET_date")}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="amount">Amount, $</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  id="amount"
                  name="amount"
                  type="text"
                  value={state.amount}
                  onChange={handleInput("SET_amount")}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3"></Col>
            <Col lg={3} md={6} sm={12} className="px-3 mt-4">
              <FormGroup check>
                <Input
                  type="checkbox"
                  checked={state.ifta}
                  onChange={handleCheckboxChange("SET_ifta")}
                />
                <Label check>IFTA Handled by Company</Label>
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-5">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="city">City</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  id="city"
                  name="city"
                  type="text"
                  value={state.city}
                  onChange={handleInput("SET_city")}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="state">State</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  id="state"
                  name="state"
                  type="text"
                  value={state.state}
                  onChange={handleInput("SET_state")}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="unitGallons">Unit, Gallons</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  id="unitGallons"
                  name="unitGallons"
                  type="text"
                  value={state.unitGallons}
                  onChange={handleInput("SET_unitGallons")}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="productCode">Product Code</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  id="productCode"
                  name="productCode"
                  type="text"
                  value={state.productCode}
                  onchange={handleInput("SET_productCode")}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-5">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="zip">Zip</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  id="zip"
                  name="zip"
                  type="text"
                  value={state.zip}
                  onChange={handleInput("SET_zip")}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-5">
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="truck">Truck</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  id="truck"
                  name="truck"
                  type="text"
                  value={state.truck}
                  onChange={handleInput("SET_truck")}
                />
              </FormGroup>
            </Col>
            <Col lg={3} md={6} sm={12} className="px-3">
              <FormGroup>
                <Label for="trailer">Trailer</Label>
                <Input
                  bsSize="sm"
                  className="form-control form-control-sm"
                  id="trailer"
                  name="trailer"
                  type="text"
                  value={state.trailer}
                  onChange={handleInput("SET_trailer")}
                />
              </FormGroup>
            </Col>
          </Row>
          <Row className="px-5">
            <Col lg={6} md={6} sm={12} className="px-3">
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
            <Col className="d-flex justify-content-end mt-4">
              <Button className="me-3 save-button" size="sm">
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
    </>
  );
};

export default CreateNewFuelTransactionPage;
