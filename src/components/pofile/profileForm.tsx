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
  const { profileResetPass, getProfileDetails, postProfileDetails } =
    useProfileContext();
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
  const [imageFile, setImageFile] = useState<string >(editProfileDetails.image_url || "/images/user-avatar.png");

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setEditProfileDetails({
        ...editProfileDetails,
        image_name: URL.createObjectURL(event.target.files[0]),
      });
       setImageFile(URL.createObjectURL(event.target.files[0]));
    }
  // event.target.files  setImageFile(URL.createObjectURL(event.target.files[0]));

     console.log( "imageFile", event.target.files);
  };

  useEffect(() => {
    getProfileDetails().then(
      
      (data) =>{
        console.log("getdata",data)
    
        data?.value &&
        data?.value.length == 1 &&
        setEditProfileDetails({
          ...editProfileDetails,
          first_name: data.value[0].first_name,
          last_name: data.value[0].last_name,
          email: data.value[0].email,
          contact_number: data.value[0].contact_number,
          image_name: data.value[0].image_name,
          image_url: data.value[0].image_url
        })}
    );
  }, []);

  // useEffect(() => {
  //   if (!profileLoading && profileDetails) {
  //     setEditProfileDetails({
  //       ...profileDetails,
  //       first_name: profileDetails.first_name,
  //       last_name: profileDetails.last_name,
  //       email: profileDetails.email,
  //       contact_number: profileDetails.contact_number,
  //       image_name: profileDetails.image_name,
  //       image_url: profileDetails.image_url,
  //     });
  //   }
  // }, [profileDetails]);
  // console.log( 'proffile' ,profileDetails)

  // useEffect(() => {
  //   if (!userInfoLoading && personalDetails) {
  //     setUserDetails({
  //       user_id: personalDetails.user_id,
  //       salutation_id: personalDetails.salutation_id.toString(),
  //       first_name: personalDetails.first_name,
  //       last_name: personalDetails.last_name,
  //       title: personalDetails.title,
  //       department: personalDetails.department,
  //       pers_email: personalDetails.pers_email,
  //       pers_home_ph: personalDetails.pers_home_ph,
  //       pers_fax: personalDetails.pers_fax,
  //       pers_mobile: personalDetails.pers_mobile,
  //     });
  //   }
  // }, [personalDetails]);

  // const [file, setFile] = useState();
  //   function handleChange(e) {
  //       console.log(e.target.files);
  //       setFile(URL.createObjectURL(e.target.files[0]));
  //   }

  //   return (
  //       <div className="App">
  //           <h2>Add Image:</h2>
  //           <input type="file" onChange={handleChange} />
  //           <img src={file} />
  //       </div>
  //   );

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
  console.log('postdata' , editProfileDetails )
  
  const handlePasswordSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    profileResetPass(resetPasswordData);
    setResetPasswordData(initialIProfilePassword);
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
          {/* <Button color="primary" onClick={() => setModalState(true)}>
                Invite User
                <AiOutlinePlus />
              </Button> */}
          <Profile />
        </div>
      </Navbar>
      <div className="content d-flex ">
        <SideBar isSidebarOpen={!isSidebarOpen} />

        <div className="aria-content ps-4 ">
          <h3 className=" settingTittle mb-3"> General </h3>
          <Form onSubmit={handleProfileSubmit}>
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
                      src={imageFile}
                    />
                  </div>
                  <FormGroup>
                    <Input
                      type="file"
                      name="file"
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
                  {/* <BiCheck fontSize={"16px"} /> */}
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
