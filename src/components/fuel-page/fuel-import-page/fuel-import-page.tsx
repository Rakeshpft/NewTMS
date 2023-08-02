import React, { useReducer, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  Form,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  Container,
  Button,
} from "reactstrap";
import { Header, SideBar } from "../../header";
import Profile from "../../pofile";

type FormState = {
  template: string;
};

type FormAction = {
  type: "SET_template";
  payload: string;
};

const formReducer = (state: FormState, action: FormAction) => {
  switch (action.type) {
    case "SET_template":
      return { ...state, template: action.payload };
    default:
      return state;
  }
};

const initialState: FormState = {
  template: "",
};

const FuelImport = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(state);
  };

  return (
    <>
      <Navbar
        style={{ border: "1px solid #1B56AE" }}
        color="light"
        className="py-0"
      >
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        />
        <NavbarBrand>Fuel Import</NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-3">
          <Profile />
        </div>
      </Navbar>
      <div className="content d-flex">
        <SideBar isSidebarOpen={!isSidebarOpen} />
        <div>
          <Container className="m-4">
            <Form>
              <Row>
                <Col md={4}>
                  <FormGroup>
                    <Label for="exampleSelect">Select Template</Label>
                    <Input
                      style={{ color: "black", border: "1px solid #418ECB" }}
                      type="select"
                      value={state.template}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_template",
                          payload: e.target.value,
                        })
                      }
                    >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </Input>
                  </FormGroup>
                </Col>
                <Col md={4} className="py-4">
                  <FormGroup>
                    <Input type="file" placeholder="No File Selected" />
                  </FormGroup>
                </Col>
                <Col md={4} className="py-4">
                  <Button
                    onSubmit={handleSubmit}
                    className="border border-inf0 rounded"
                    style={{ backgroundColor: "#8FF086", color: "#000000" }}
                  >
                    Upload
                  </Button>
                </Col>
              </Row>
            </Form>
          </Container>
        </div>
      </div>
    </>
  );
};

export default FuelImport;
