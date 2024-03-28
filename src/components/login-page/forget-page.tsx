import React, { useState } from "react";
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
import { useRegContext } from "../../services/reducer/auth.reducer";
export interface IForgetPassword {
  email: string;
}
const ForgetPassword = () => {
  const initialForgetPasswordState = {
    email: "",
  };
  const { getForgotPass } = useRegContext();

  const [forgetPassword, setForgetPassword] = useState<IForgetPassword>(
    initialForgetPasswordState
  );
  const [forgetApiResponse , setForgetApiResponse] = useState("")

  const handleForgetInput =
    (prop: keyof IForgetPassword) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setForgetPassword({ ...forgetPassword, [prop]: event.target.value });
    };
  const handleForgetSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    getForgotPass(forgetPassword.email).then((data) => {
    data &&  setForgetApiResponse(data.message)
      setForgetPassword(initialForgetPasswordState);
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
                    <p className="text-center text-danger mt-3">{forgetApiResponse}</p>
                    <Form className="mt-5" onSubmit={handleForgetSubmit}>
                      <FormGroup>
                        <Label for="email" className="d-block d-sm-none">
                          Email
                        </Label>
                        <InputGroup>
                          <Input
                            type="email"
                            name="email"
                            value={forgetPassword.email}
                            onChange={handleForgetInput("email")}
                            placeholder="Email Address"
                            required
                          />
                        </InputGroup>
                      </FormGroup>
                      <FormGroup className="text-end">
                        <Link
                          to={"/"}
                          className="btn btn-link text-decoration-none"
                        >
                          Back To Login
                        </Link>
                      </FormGroup>

                      <FormGroup className=" text-center">
                        <Button color="primary save-button" type="submit">
                          Forget Password
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
