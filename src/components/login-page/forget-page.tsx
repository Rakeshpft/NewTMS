import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  Label,
  Row,
} from "reactstrap";
import CompanyLogo from "../company-logo";
const reducer = (state: any, action: any) => {
  switch (action.type) {
    case "setFormData":
      return {
        ...state,
        formdata: action.payload,
      };
    case "setErrorData":
      return {
        ...state,
        errordata: action.payload,
      };
    case "setSpinnerData":
      return {
        ...state,
        spinner: action.payload,
      };
  }
};
const ForgetPassword = () => {
  const [state, dispatch] = useReducer(reducer, {
    errordata: { email: "" },
    formdata: { email: "" },
    spinner: false,
  });

  const handleForgetPassword = (event: any) => {
    event.preventDefault();
    if (state.formdata.email) {
      dispatch({ type: "setSpinnerData", payload: true });
    } else {
      dispatch({
        type: "setErrorData",
        payload: {
          email: "Invalid Credentials",
        },
      });
    }
    dispatch({ type: "setSpinnerData", payload: false });
  };

  return (
    <>
      <div className="login">
        <Container>
          <Row>
            <Col
              xl={5}
              lg={6}
              md={8}
              sm={12}
              className="vh-100 mx-auto d-flex align-items-center"
            >
              <Container className="login-form py-4 shadow rounded">
                <Row>
                  <Col className="border-bottom">
                    <div className="logo-section text-center my-3 ">
                      <CompanyLogo height={90} />
                    </div>
                  </Col>
                </Row>
                <Row>
                  <Col sm={10} className="mx-auto">
                    <div className="text-center my-4">
                      <h3 className="fw-bold">Welcome</h3>
                      <p className="small text-black-50 fw-semibold ">
                        Reset Password
                      </p>
                    </div>

                    <Form className="mt-5">
                      <FormGroup>
                        <Label for="email" className="d-block d-sm-none">
                          Email
                        </Label>
                        <InputGroup>
                          <Input
                            type="email"
                            name="email"
                            value={state.formdata.email}
                            onChange={(e) =>
                              dispatch({
                                type: "setFormData",
                                payload: e.target.value,
                              })
                            }
                            placeholder="EmailAddress"
                            required
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className="text-end">
                        <Link
                          to={"/"}
                          className="btn btn-link text-decoration-none"
                        >
                          Return To Login
                        </Link>
                      </FormGroup>

                      <FormGroup className=" text-center">
                        <Button color="primary" onClick={handleForgetPassword}>
                          Reset Password
                        </Button>
                      </FormGroup>
                    </Form>
                  </Col>
                </Row>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ForgetPassword;
