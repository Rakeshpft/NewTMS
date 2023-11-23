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
      <Navbar color="light" className="py-0">
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        />
        <NavbarBrand className="fw-bold px-4">Fuel Import</NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-3">
          <Profile />
        </div>
      </Navbar>
      <div className="content d-flex">
        <SideBar isSidebarOpen={!isSidebarOpen} activePageId={5} />

        <Container>
          <Form className="m-2">
            <Row>
              <Col md={6} lg={3}>
                <FormGroup>
                  <Label>Select Template</Label>
                  <Input
                    className="form-control form-control-sm"
                    type="select"
                    bsSize="sm"
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
              <Col md={6} lg={5} className="py-4">
                <FormGroup>
                  <Input
                    type="file"
                    placeholder="No File Selected"
                    bsSize="sm"
                  />
                </FormGroup>
              </Col>
              <Col md={6} lg={4} className="py-4">
                <Button
                  onSubmit={handleSubmit}
                  className="border border-info rounded"
                  size="sm"
                  color="success"
                >
                  Upload
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </>
  );
};

export default FuelImport;
