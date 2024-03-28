import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { useProfileContext } from "../../services/reducer/profile.Reducer";
import { IProfileUpdate, initialProfileUpdateState } from "./profileType";
import { Bounce, ToastContainer, toast } from "react-toastify";
import CommonLayOut from "../../layout";
// import { Bounce, ToastContainer, toast } from "react-toastify";

export interface IProfilePassword {
  password: string;
  confirmPassword: string;
}

const ProfileForm = () => {
  const {
    profileResetPass,
    getProfileDetails,
    postProfileDetails,
    postProfileImage,

  } = useProfileContext();
  const initialIProfilePassword = {
    password: "",
    confirmPassword: "",
  };

  const [resetPasswordData, setResetPasswordData] = useState<IProfilePassword>(
    initialIProfilePassword
  );
  const [editProfileDetails, setEditProfileDetails] = useState<IProfileUpdate>(
    initialProfileUpdateState
  );

  useEffect(() => {
    getProfileDetails().then((data) => {
      console.log("getdata", data);
      data?.value &&
        data?.value.length == 1 &&
        setEditProfileDetails({
          ...editProfileDetails,
          first_name: data.value[0].first_name,
          last_name: data.value[0].last_name,
          email: data.value[0].email,
          contact_number: data.value[0].contact_number,
          image_name: data.value[0].image_name,
          image_url: data.value[0].image_url,
        });
    });
  }, []);

  const handleProfileInput =
    (prop: keyof IProfileUpdate) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setEditProfileDetails({
          ...editProfileDetails,
          [prop]: event.target.value,
        });
      };
  const handleProfilePasswordInput =
    (prop: keyof IProfilePassword) =>
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setResetPasswordData({
          ...resetPasswordData,
          [prop]: event.target.value,
        });
      };

  const handleProfileSubmit = (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    postProfileDetails(editProfileDetails)?.then((data) => {
      toast(data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });

    });

  };
  console.log("postdata", editProfileDetails);

  const handlePasswordSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    profileResetPass(resetPasswordData)?.then((data) => {
      toast(data.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
        transition: Bounce,
      });
    })


    setResetPasswordData(initialIProfilePassword);
  };

  const handleImageChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    event.preventDefault();
    if (event.target.files) {
      await postProfileImage(event.target.files[0]).then((data) => {
        console.log("getdata", data);
        data?.value &&
          setEditProfileDetails({
            ...editProfileDetails,
            image_url: data.value,
          });
      });
    }

    console.log("imageFile", event.target.files);
  };

  return (
    <CommonLayOut>
      <Form onSubmit={handleProfileSubmit} encType="multipart/form-data">
        <Row className="page-title"><Col md={12}>General</Col></Row>
        <Row className="page-content">
          <Col lg={6} md={9} sm={12}>
            <Row>
              <Col md={6} sm={12}>
                <FormGroup>
                  <Label for="firstName">First Name</Label>
                  <Input id="firstName" name="firstName" type="text" className="form-control form-control-sm" value={editProfileDetails.first_name} onChange={handleProfileInput("first_name")} />
                </FormGroup>
              </Col>
              <Col md={6} sm={12}>
                <FormGroup>
                  <Label for="lastname">Last Name</Label>
                  <Input id="lastname" name="lastname" type="text" className="form-control form-control-sm" value={editProfileDetails.last_name} onChange={handleProfileInput("last_name")}></Input>
                </FormGroup>
              </Col>
              <Col md={6} sm={12}>
                <FormGroup>
                  <Label for="email">Email</Label>
                  <Input id="email" disabled name="email" type="email" className="form-control form-control-sm" value={editProfileDetails.email}></Input>
                </FormGroup>
              </Col>
              <Col md={6} sm={12}>
                <FormGroup>
                  <Label for="phone">Phone</Label>
                  <Input id="phone" name="phone" type="text" className="form-control form-control-sm" value={editProfileDetails.contact_number} onChange={handleProfileInput("contact_number")} ></Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col sm={12}>
                <Button className="btn btn-primary" size="sm" type="submit">Update</Button>
              </Col>
            </Row>
          </Col>
          <Col lg={6} md={3} sm={12} className="align-items-center text-center">
            <div>
              <div className="user-avatar">
                <img width="120" height="120" className="rounded-circle" src={editProfileDetails.image_url} />
              </div>
              <Input type="file" name="file" id="file" accept="image/*" onChange={handleImageChange} />
              <Label className="page-subtitle">Set Profile Picture</Label>
            </div>
          </Col>
        </Row>
      </Form>
      <hr />
      <Form onSubmit={handlePasswordSubmit}>
        <Row className="page-title">
          <Col md={12}>Reset Password</Col>
        </Row>
        <Row className="page-content">
          <Col lg={6} md={9} sm={12}>
            <Row>
              <Col md={6}>
                <FormGroup>
                  <Label for="password">New Password</Label>
                  <Input id="password" name="password" type="password" className="form-control form-control-sm" value={resetPasswordData.password} onChange={handleProfilePasswordInput("password")}></Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="confirmPassword">Confirm Password</Label>
                  <Input id="confirmPassword" name="confirmPassword" type="password" className="form-control form-control-sm" value={resetPasswordData.confirmPassword} onChange={handleProfilePasswordInput("confirmPassword")}></Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg={9} md={9} sm={12}>
              <Button size="sm" className="btn btn-primary">Reset Password</Button>
              </Col>
            </Row>            
          </Col>
        </Row>
      </Form>
      {<ToastContainer position="top-center" />}
    </CommonLayOut>
  );
};

export default ProfileForm;
