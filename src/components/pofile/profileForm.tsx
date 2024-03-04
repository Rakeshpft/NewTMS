import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Nav,
  Navbar,
  NavbarBrand,
  Row,
} from "reactstrap";
import { Header, SideBar } from "../header";
import Profile from "./profile";
import { BiCheck } from "react-icons/bi";
import { useProfileContext } from "../context/Profile/profile.Reducer";
import { IProfileUpdate, initialProfileUpdateState } from "./profileType";

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

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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

  const handleProfileSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    await postProfileDetails(editProfileDetails);
  };
  console.log("postdata", editProfileDetails);

  const handlePasswordSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    profileResetPass(resetPasswordData);
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
    <>
      <Navbar color="light" className="py-0">
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        />
        <NavbarBrand className="fw-bold px-4">Profile</NavbarBrand>
        <Nav className="me-auto" navbar></Nav>
        <div className="d-flex align-items-center gap-3">
          <Profile />
        </div>
      </Navbar>
      <div className="content d-flex ">
        <SideBar isSidebarOpen={!isSidebarOpen} />

        <div className="aria-content ps-4 ">
          <h3 className=" settingTittle mb-3"> General </h3>
          <Form onSubmit={handleProfileSubmit} encType="multipart/form-data">
            <Row>
              <Col md={3}>
                <FormGroup>
                  <Label for="firstName" className="mb-0">
                    First Name{" "}
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="form-control form-control-sm"
                    value={editProfileDetails.first_name}
                    onChange={handleProfileInput("first_name")}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="email" className="mb-0">
                    Email
                  </Label>
                  <Input
                    id="email"
                    disabled
                    name="email"
                    type="email"
                    className="form-control form-control-sm"
                    value={editProfileDetails.email}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="lastname" className="mb-0">
                    Last Name{" "}
                  </Label>
                  <Input
                    id="lastname"
                    name="lastname"
                    type="text"
                    className="form-control form-control-sm"
                    value={editProfileDetails.last_name}
                    onChange={handleProfileInput("last_name")}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="phone" className="mb-0">
                    Phone{" "}
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="text"
                    className="form-control form-control-sm"
                    value={editProfileDetails.contact_number}
                    onChange={handleProfileInput("contact_number")}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <Label> Set profile picture</Label>
                <div className="d-flex align-items-center">
                  <div className="user-avatar me-2">
                    <img
                      width="120"
                      height="120"
                      className="rounded-circle"
                      src={editProfileDetails.image_url}
                    />
                  </div>
                  <FormGroup>
                    <Input
                      type="file"
                      name="file"
                      id="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </FormGroup>
                </div>
              </Col>
            </Row>

            <Row>
              <Col
                sm={4}
                className="user-dropdown-greeting mb-3 d-flex justify-content-between mt-4"
              >
                <div>
                  <Button className="me-3 save-button" size="sm" type="submit">
                    <BiCheck fontSize={"16px"} />
                    Update
                  </Button>
                </div>
              </Col>
            </Row>
            <hr />
          </Form>
          <Form onSubmit={handlePasswordSubmit}>
            <Row>
              <Col>
                <h3 className=" settingTittle mb-3 "> Reset Password </h3>
                <Row>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="password" className="mb-0">
                        Password
                      </Label>
                      <Input
                        id="password"
                        name="password"
                        type="password"
                        className="form-control form-control-sm"
                        value={resetPasswordData.password}
                        onChange={handleProfilePasswordInput("password")}
                      ></Input>
                    </FormGroup>
                  </Col>
                  <Col md={3}>
                    <FormGroup>
                      <Label for="confirmPassword" className="mb-0">
                        Confirm Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        className="form-control form-control-sm"
                        value={resetPasswordData.confirmPassword}
                        onChange={handleProfilePasswordInput("confirmPassword")}
                      ></Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Button size="sm" className="me-3 save-button mt-4">
                  Reset Password
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ProfileForm;
