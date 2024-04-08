import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  InputGroupText,
  Row,
} from "reactstrap";
import CompanyLogo from "../company-logo";
import { useRegContext } from "../../services/reducer/auth.reducer";
import { every } from "lodash";
import { AiOutlineEyeInvisible } from "react-icons/ai";

export interface IResetPassword {
  password: string;
  confirmPassword: string;
}

export interface IResetPassword {
  password: string;
  confirmPassword: string;
}
const ResetPassword = () => {

  const initialVerifyPass = {
    password: "",
    confirmPassword: "",
  };

  const { rePass, verifyFirstPass } = useRegContext();
  const navigate = useNavigate();
  const [apiResponseMsg, setApiResponseMsg] = useState("");
  const [showRegistrationMessage, setShowRegistrationMessage] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);
  const [emailMessage, setEmailMessage] = useState("");

  const [verifyPass, setVerifyPass] =
    useState<IResetPassword>(initialVerifyPass);

  const params = useParams();

  const company_guid = params.id;
 
  const handleVerifyInput =
    (prop: keyof IResetPassword) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setVerifyPass({ ...verifyPass, [prop]: event.target.value });
    };

  useEffect(() => {
   

    rePass(company_guid).then((data) => {
      console.log("showEmail", data);
      data && setEmailStatus(data.success);
      data && setEmailMessage(data.message);
    });
   

    
  }, [company_guid]);
  const handleVerifyPassword = (event: { preventDefault: () => void }) => {
    
    event.preventDefault();

    verifyFirstPass(verifyPass, company_guid).then((data) => {
      
      setVerifyPass(initialVerifyPass);
      setShowRegistrationMessage(true);
      setApiResponseMsg(`${data.message}`);
      console.log("verifyPass from resetpage", data);
    });
  };
  const navigateToLogin = () => {
    navigate("/");
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
                {showRegistrationMessage ? (
                  <div className="text-center">
                    <h5 className="text-success text-center my-3">
                      {apiResponseMsg}
                    </h5>

                    <Link
                      to={"/"}
                      className="btn btn-outline-primary text-decoration-none mx-3 text-center"
                      type="button"
                    >
                      Back to Login
                    </Link>
                  </div>
                ) : (
                  <>
                    <Row>
                      <Col sm={10} className="mx-auto">
                        {!emailStatus ? (
                          <>
                            <div className="text-center my-4">
                              <p className="fw-bold">{emailMessage}</p>
                            </div>
                            <FormGroup className="text-center">
                            <Button
                            color="primary"
                            className="px-4 py-2 shadow save-button mx-3"
                            onClick={navigateToLogin}
                          >
                            Back to Login
                          </Button>
                            </FormGroup>
                          </>
                        ) : (
                          <Form
                            className="mt-5"
                            onSubmit={handleVerifyPassword}
                          >
                            <FormGroup>
                              <InputGroup>
                                <InputGroupText className="d-block d-sm-inline fw-bold resetPassword">
                                  Password
                                </InputGroupText>
                                <Input
                                  type="password"
                                  required
                                  name="verifyPass.password"
                                  value={verifyPass.password}
                                  onChange={handleVerifyInput("password")}
                                  placeholder="Enter Your Password"
                                  autoComplete="off"
                                  // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                                >
                                  <AiOutlineEyeInvisible />
                                </Input>

                                <FormText color="danger"></FormText>
                              </InputGroup>
                            </FormGroup>
                            <FormGroup>
                              <InputGroup>
                                <InputGroupText className="d-block d-sm-inline fw-bold ">
                                  Confirm Password&nbsp;
                                </InputGroupText>
                                <Input
                                  type="password"
                                  required
                                  name="confirm password"
                                  value={verifyPass.confirmPassword}
                                  onChange={handleVerifyInput(
                                    "confirmPassword"
                                  )}
                                  placeholder="Enter Your Confirm Password"
                                />
                              </InputGroup>
                            </FormGroup>

                            <FormGroup className="text-center">
                              <Button
                                color="primary"
                                className="px-4 py-2 shadow save-button"
                                type="submit"
                                disabled={
                                  !every(
                                    verifyPass,
                                    (data) =>
                                      data !== "" &&
                                      data === verifyPass.confirmPassword
                                  )
                                }
                              >
                                Save Password
                              </Button>
                            </FormGroup>
                            <FormGroup className="text-center">
                              <Link
                                to={"/"}
                                className="px-0 btn btn-link text-decoration-none fw-bold "
                              >
                                Back to Login
                              </Link>
                            </FormGroup>
                          </Form>
                        )}
                      </Col>
                    </Row>
                  </>
                )}
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};

export default ResetPassword;
