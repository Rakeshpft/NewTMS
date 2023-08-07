import React, { useReducer } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupText,
  Row,
  Spinner,
} from "reactstrap";
import CompanyLogo from "../company-logo";

interface LoginPageProps {
  loginStatus: (data: boolean) => void;
}
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
    default:
      return state;
  }
};
const LoginPage = ({ loginStatus }: LoginPageProps) => {
  const [state, dispatch] = useReducer(reducer, {
    errordata: { email: "", password: "" },
    formdata: { email: "tms@gmail.com", password: "1234" },
    spinner: false,
  });

  const history = useHistory();
  const handleLogin = (event: any) => {
    history.push("/dashboard");
    event.preventDefault();
    if (state.formdata.email && state.formdata.password) {
      loginStatus(true);
      dispatch({ type: "setSpinnerData", payload: true });
    } else {
      dispatch({
        type: "setErrorData",
        payload: {
          email: "Invalid Credentials",
          password: "Invalid Credentials",
        },
      });
      dispatch({ type: "setSpinnerData", payload: false });
    }
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
                        Please Sign In Your Account
                      </p>
                    </div>
                    <Form className="mt-5" onSubmit={handleLogin}>
                      <FormGroup>
                        <InputGroup>
                          <InputGroupText className="d-block d-sm-inline fw-bold">
                            Username
                          </InputGroupText>
                          <Input
                            type="email"
                            name="email"
                            value={state.formdata.email}
                            onChange={(e) =>
                              dispatch({
                                type: "setFormData",
                                payload: {
                                  ...state.formdata,
                                  email: e.target.value,
                                },
                              })
                            }
                            placeholder="Enter Your Email"
                          />
                        </InputGroup>
                        {state.errordata.email && (
                          <label className="error">
                            {state.errordata.email}
                          </label>
                        )}
                      </FormGroup>
                      <FormGroup>
                        <InputGroup>
                          <InputGroupText className="d-block d-sm-inline fw-bold">
                            Password&nbsp;
                          </InputGroupText>
                          <Input
                            type="password"
                            name="password"
                            value={state.formdata.password}
                            onChange={(e) =>
                              dispatch({
                                type: "setFormData",
                                payload: {
                                  ...state.formdata,
                                  password: e.target.value,
                                },
                              })
                            }
                            placeholder="Enter Your Password"
                          />
                        </InputGroup>
                        {state.errordata.password && (
                          <label className="error">
                            {state.errordata.password}
                          </label>
                        )}
                      </FormGroup>
                      <FormGroup className="text-end">
                        <Link
                          to={"/forgetpassword"}
                          className="px-0 btn btn-link text-decoration-none"
                        >
                          Forget Password
                        </Link>
                      </FormGroup>
                      <FormGroup className="text-center">
                        <Button
                          color="primary"
                          className="px-5 py-2 shadow"
                          type="submit"
                          disabled={state.spinner}
                        >
                          {state.spinner ? (
                            <>
                              <Spinner size="sm">Loading...</Spinner>
                              Logging In
                            </>
                          ) : (
                            "Login"
                          )}
                        </Button>
                      </FormGroup>
                      <FormGroup className="d-flex justify-content-center">
                        <p className="message">Don't have an account?</p>
                        <Link
                          to={"/registration-form"}
                          className="btn btn-link text-decoration-none p-0 message ms-2"
                        >
                          Sign up
                        </Link>
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

export default LoginPage;
