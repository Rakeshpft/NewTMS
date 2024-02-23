import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
// import { useLocation } from "react-router-dom";
import { useRegContext } from "../context/Auth/auth.reducer";
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
  const [showEmail, setShowEmail] = useState("");
  const [apiResponseMsg, setApiResponseMsg] = useState("");
  const [showRegistrationMessage, setShowPasswordMessage] = useState(false);

  const [verifyPass, setVerifyPass] =
    useState<IResetPassword>(initialVerifyPass);

  const params = useParams();
  console.log("params", params);
  const company_guid = params.id;
  console.log("para", company_guid);

  console.log("id value", company_guid);

  const handleVerifyInput =
    (prop: keyof IResetPassword) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setVerifyPass({ ...verifyPass, [prop]: event.target.value });
    };

  useEffect(() => {
    rePass(company_guid).then((data: any) => console.log(data));

    rePass(company_guid).then((data) => {
      setShowEmail(`${data[0].email}`);
    });
    //         console.log(data)

    //   .then((data) => {
    //     console.log("data", data);
    //     {
    //       Object.keys(data).map((key) => {
    //         console.log("obj data", data[key]);
    //         console.log("obj key", key);
    //       });
    //     }
    //   });
  }, [company_guid]);
  const handleVerifyPassword = (event: { preventDefault: () => void }) => {
    //  history.push("/login");
    event.preventDefault();

    verifyFirstPass(verifyPass, company_guid).then((data) => {
      console.log("data", data);
      setVerifyPass(initialVerifyPass);
      setApiResponseMsg(`${data}`);
      setShowPasswordMessage(true);
    });
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
                    <h5 className="text-success text-center mb-3">
                      {apiResponseMsg}
                    </h5>
                    {/* <Notification
                              type="info"
                              message="Contact Updated"
                              closeAlert={() => setShowPasswordMessage(false)}
                            /> */}
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
                        <div className="text-center my-4">
                          <p>
                            Email <span className=" fw-bold">{showEmail}</span>{" "}
                            is verified succesfully. Please set password to
                            continue.
                          </p>
                        </div>
                        <Form className="mt-5" onSubmit={handleVerifyPassword}>
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

                              <FormText color="danger">
                                Password must be at least 8 characters
                              </FormText>
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
                                onChange={handleVerifyInput("confirmPassword")}
                                placeholder="Enter Your Confirm Password"
                              />
                            </InputGroup>
                          </FormGroup>

                          <FormGroup className="text-center">
                            <Button
                              color="primary"
                              className="px-3 py-2  mt-3 shadow"
                              type="submit"
                              //   disabled={verifyPass.password ===  verifyPass.confirmPassword ? true : false}
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
