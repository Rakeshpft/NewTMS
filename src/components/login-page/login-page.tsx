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
  InputGroupText,
  Row,
  
} from "reactstrap";
import CompanyLogo from "../company-logo";
import { useRegContext } from "../context/Auth/auth.reducer";
// import { Notification } from "../../services/notification/Notification";

// import { routes } from "../routes/routes";

//  interface LoginPageProps {
//    loginStatus: (data: boolean) => void;
//  }
// interface LoginStatusProp {

//      loginStatus : (data : boolean) => void
// }
// const reducer = (state: any, action: any) => {
//   switch (action.type) {
//     case "setFormData":
//       return {
//         ...state,
//         formdata: action.payload,
//       };
//     case "setErrorData":
//       return {
//         ...state,
//         errordata: action.payload,
//       };
//     case "setSpinnerData":
//       return {
//         ...state,
//         spinner: action.payload,
//       };
//     default:
//       return state;
//   }
// };

export interface LoginFormSate {
 email: string;
 password: string;
}



const LoginPage = (  ) => {
  
 
const initialFormState = {
  email: "",
  password:"",
}

const { login ,auth  } = useRegContext();

const [ logInData , setLogInData] = useState<LoginFormSate>(initialFormState)


  
  const handleLoginInput = (prop : keyof LoginFormSate) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogInData( {...logInData, [prop]: event.target.value})
  }

  console.log( 'email data' , auth)
  
  const handleLogin = (event: { preventDefault: () => void }) => {
    
    event.preventDefault();
    login(logInData)

    
    // loginStatus(true);
    // if (state.formdata.email && state.formdata.password) {
    //   
    //   dispatch({ type: "setSpinnerData", payload: true });
    // } else {
    //   dispatch({
    //     type: "setErrorData",
    //     payload: {
    //       email: "Invalid Credentials",
    //       password: "Invalid Credentials",
    //     },
    //   });
    //   dispatch({ type: "setSpinnerData", payload: false });
    // }
    
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
                 { !auth.status && <p className="text-center text-danger">{auth.massage}</p>} 
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
                            required
                           value={logInData.email}
                           onChange={handleLoginInput("email")}
                            placeholder="Enter Your Email"
                          />
                        </InputGroup>
                       
                      
                      </FormGroup>
                      <FormGroup>
                        <InputGroup>
                          <InputGroupText className="d-block d-sm-inline fw-bold">
                            Password&nbsp;
                          </InputGroupText>
                          <Input
                            type="password"
                            name="password"
                            required
                            value={logInData.password}
                            onChange={handleLoginInput("password")}
                            placeholder="Enter Your Password"
                          />
                        </InputGroup>
                        
                       
                      </FormGroup>
                      <FormGroup className="text-end">
                        <Link
                          to={"/forgetpassword"}
                          className="px-0 btn btn-link text-decoration-none"
                        >
                          Forgot Password
                        </Link>
                      </FormGroup>
                      <FormGroup className="text-center">
                        <Button
                          color="primary"
                          className="px-5 py-2 shadow save-button"
                          type="submit"
                          // disabled={state.spinner}
                        >
                          {/* <Notification type="success" message="Login Success" closeAlert={() => {}}} /> */}
                          {/* {state.spinner ? (
                            <>
                              <Spinner size="sm">Loading...</Spinner>
                              Logging In
                            </>
                          ) : (
                            "Login"
                          )} */}
                       
                          LOGIN
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
