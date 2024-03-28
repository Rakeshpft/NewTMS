import React, { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import CompanyLogo from "../company-logo";
import { useNavigate } from "react-router-dom";
import {
  IRegistration,
  initialRegistrationState,
  salutationOptions,
} from "../../services/tms-objects/auth.types";
import { useRegContext } from "../../services/reducer/auth.reducer";
//  import { Notification } from "../../services/notification/Notification";
import {  ToastContainer,  } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastify } from "../../features/notification/toastify";

const RagistrationPage = () => {
  const { regist  } = useRegContext();

  const navigate = useNavigate();
  const [regDetails, setregDetails] = useState<IRegistration>(
    initialRegistrationState
  );
  // const [apiResponseMsg, setApiResponseMsg] = useState("");
  // const [showRegistrationMessage, setShowPasswordMessage] = useState(false);

  const handleInputChange =
    (prop: keyof IRegistration) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setregDetails({ ...regDetails, [prop]: event.target.value });
    };
  const handleRegistration = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    regist(regDetails).then((response) => {
      response &&   toastify({ message: response.message, type: (response.success ? "success" : "error") });
      
    }); 
     setregDetails(initialRegistrationState);
  };
  // console.log("api res", apiResponseMsg);
  // const handleCloseAlert = () => {
  //   setShowPasswordMessage(false);
  // }

  const navigateToLogin = () => {
    navigate("/");
  };

  return (
    <>
      <div className="login">
        <Container>
          <Row>
            <Col className="vh-100 mx-auto d-flex align-items-center" md={8}>
              <Container className="login-form py-4 shadow rounded my-5">
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
                      <h3 className="fw-bold ">Registration Form</h3>
                    </div>

                    {/* <div className="text-center">
                      <h5 className="text-success text-center mb-3">
                        {apiResponseMsg}
                      </h5>

                      <Button
                        color="primary"
                        className="px-4 py-2 shadow save-button mx-3"
                        onClick={navigateToLogin}
                      >
                        Back to Login
                      </Button>
                    </div> */}

                    {  <ToastContainer position="top-center" />}
                    <Form className="mt-5" onSubmit={handleRegistration}>
                      <Row>
                        <Col md={4}>
                          <FormGroup>
                            <Label
                              for="title"
                              className="d-block d-sm-inline fw-bold"
                            >
                              Title
                            </Label>
                            <Input
                              type="select"
                              id="title"
                              name="text"
                              value={regDetails.salutation_id}
                              onChange={handleInputChange("salutation_id")}
                            >
                              {salutationOptions.map((item) => (
                                <option
                                  key={item.salutation_id}
                                  value={item.salutation_id.toString()}
                                >
                                  {item.salutation_name}
                                </option>
                              ))}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label
                              for="first_name"
                              className="d-block d-sm-inline fw-bold"
                            >
                              First Name
                            </Label>
                            <Input
                              type="text"
                              id="first_name"
                              name="text"
                              value={regDetails.first_name}
                              onChange={handleInputChange("first_name")}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={4}>
                          <FormGroup>
                            <Label
                              for="last_name"
                              className="d-block d-sm-inline fw-bold"
                            >
                              Last Name
                            </Label>
                            <Input
                              type="text"
                              id="last_name"
                              name="text"
                              value={regDetails.last_name}
                              onChange={handleInputChange("last_name")}
                              placeholder="Enter Your Last Name"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <Label
                              for="mc_number"
                              className="d-block d-sm-inline fw-bold"
                            >
                              MC Number<span className="text-danger">*</span>
                            </Label>
                            <Input
                              type="text"
                              name="text"
                              id="mc_number"
                              required
                              value={regDetails.mc_number}
                              onChange={handleInputChange("mc_number")}
                              placeholder="Enter Your Mc Number"
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label
                              for="company_name"
                              className="d-block d-sm-inline fw-bold"
                            >
                              Company<span className="text-danger">*</span>
                            </Label>
                            <Input
                              type="text"
                              name="text"
                              id="company_name"
                              required
                              value={regDetails.company_name}
                              onChange={handleInputChange("company_name")}
                              placeholder="Enter Your Company"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <Label
                              for="email"
                              className="d-block d-sm-inline fw-bold"
                            >
                              Email<span className="text-danger">*</span>
                            </Label>
                            <Input
                              type="email"
                              required
                              name="email"
                              id="email"
                              value={regDetails.email}
                              onChange={handleInputChange("email")}
                              placeholder="Enter Your Email"
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label
                              for="mobile"
                              className="d-block d-sm-inline fw-bold"
                            >
                              Contact Number<span className="text-danger">*</span>
                            </Label>
                            <Input
                              type="text"
                              name="text"
                              id="mobile"
                              onKeyDown={(event) => {
                                return event.key >= "0" && event.key <= "9";
                              }}
                              value={regDetails.mobile}
                              onChange={handleInputChange("mobile")}
                              placeholder="Enter Your Mobile"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <Label
                              for="website"
                              className="d-block d-sm-inline fw-bold"
                            >
                              Website
                            </Label>
                            <Input
                              type="text"
                              name="text"
                              id="website"
                              value={regDetails.website}
                              onChange={handleInputChange("website")}
                              placeholder="Enter Your Website"
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <FormGroup className="text-center mt-3 align-items-center">
                        <Button
                          color="primary"
                          className="px-4 py-2 shadow save-button mx-3"
                          onClick={navigateToLogin}
                        >
                          Back to Login
                        </Button>
                        <Button
                          color="primary"
                          className="px-4 py-2 shadow save-button "
                          type="submit"
                          // disabled={
                          //   !every(
                          //     [
                          //       regDetails.company_name,
                          //       regDetails.email,
                          //       regDetails.mc_number,
                          //     ],
                          //     Boolean
                          //   )
                          // }
                        >
                          Register
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

export default RagistrationPage;
