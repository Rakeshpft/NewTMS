import React, { useState } from "react";
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

// import { routes } from "../routes/routes";
// import { useNavigate } from "react-router-dom";

const ProfileForm = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // const navigate = useNavigate();
  // const handleCancleButton = () => {
  //   // {
  //   //   history.location.pathname === routes.dashboard
  //   //     ? history.push(routes.loadpageAll)
  //   //     : history.goBack();
  //   // }
  //   {
  //     navigate(routes.loadpageAll);
  //   }
  // };
  return (
    <>
      <Navbar color="light" className="py-0">
        <Header
          sidebarToggle={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
        />
        <NavbarBrand className="fw-bold px-4">Profile</NavbarBrand>
        <Nav className="me-auto" navbar>
          <div className="d-flex gap-1 align-items-center">
            {/* <div className="x-small fw-bold">Period</div> */}
            {/* <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
                  <DropdownToggle
                    variant="secondary"
                    size="sm"
                    className="border-0 p-0 px-2 d-flex column-gap-2 align-items-center"
                  >
                    All ▼
                  </DropdownToggle>
                  <DropdownMenu>
                    <DropdownItem>This Year</DropdownItem>
                    <DropdownItem>This Month</DropdownItem>
                    <DropdownItem>This Week</DropdownItem>
                  </DropdownMenu>
                </Dropdown> */}
          </div>
        </Nav>
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
          <Form>
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
                    value={""}
                    onChange={() => {}}
                  ></Input>
                </FormGroup>
                <FormGroup>
                  <Label for="email" className="mb-0">
                    Email{" "}
                  </Label>
                  <Input
                    id="email"
                    readOnly
                    name="email"
                    type="email"
                    className="form-control form-control-sm"
                    value={""}
                    onChange={() => {}}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Label for="firstName" className="mb-0">
                    Last Name{" "}
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    className="form-control form-control-sm"
                    value={""}
                    onChange={() => {}}
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
                    value={""}
                    onChange={() => {}}
                  ></Input>
                </FormGroup>
              </Col>
              <Col md={6}>
                <Label> Set profile picture</Label>
                <div className="d-flex align-items-center">
                  <div className="user-avatar me-2">
                    <img
                      loading="lazy"
                      width="120"
                      height="120"
                      className="rounded-circle"
                      src={require("../../../public/images/user-avatar.png")}
                    />
                  </div>
                  <FormGroup>
                    <Input type="file" name="file" id="file" bsSize="sm" />
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
          <Form>
            <Row>
              <Col>
                <h3 className=" settingTittle mb-3 "> Password </h3>
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
                        value={""}
                        onChange={() => {}}
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
                        value={""}
                        onChange={() => {}}
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

// import React, { useState } from "react";
// import {
//   Button,
//   Input,
//   InputGroup,
//   InputGroupText,
//   Nav,
//   Navbar,
//   NavbarBrand,
// } from "reactstrap";
// import { Header, SideBar } from "../header";
// import { BsSearch } from "react-icons/bs";
// import { AiOutlinePlus } from "react-icons/ai";
// import Profile from "../pofile";
// import { PiGearDuotone } from "react-icons/pi";
// import GenericTable from "../table/custom-table";
// import InviteUserModal from "./inviteusermodal";

// const columns = [
//   "#",
//   "Name",
//   "Email",
//   "Phone",
//   "Status",
//   "Actions",
//   <PiGearDuotone />,
// ];

// const Tabledata = [
//   {
//     '#': 1001,
//     Name: "07/14/23",
//     Email: "abc@mGmail.com",
//     Phone: "002063564 ONTARIO",
//     Status: "Active",
//     Actions: "Lumper",
//   },
//   {
//     '#': 1002,
//     Name: "07/14/23",
//     Email: "abc@mGmail.com",
//     Phone: "002063564 ONTARIO",
//     Status: "Active",
//     Actions: "Lumper",
//   },
//   {
//     '#': 1003,
//     Name: "07/14/23",
//     Email: "abc@mGmail.com",
//     Phone: "002063564 ONTARIO",
//     Status: "InActive",
//     Actions: "Lumper",
//   },
// ];
// const UserPage = () => {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [filteredData, setFilteredData] = useState(Tabledata);
//   const [modalState, setModalState] = useState(false);
//   // const [isOpen, setIsOpen] = useState(false);
//   const [filter, setFilter] = useState("");

//   // const toggle = () => setDropdownOpen((prevState) => !prevState);

//   const handleSearchFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.toLowerCase();
//     const filteredData = Tabledata.filter((item) => {
//       return columns.some((column) =>
//         String(item[column as keyof object])
//           .toLowerCase()
//           .includes(value)
//       );
//     });
//     setFilter(value);
//     setFilteredData(filteredData);
//   };

//   // const searchToggle = (): void => {
//   //   setIsOpen((isOpen) => !isOpen);
//   // };

//   return (
//     <>
//       <Navbar color="light" className="py-0">
//         <Header
//           sidebarToggle={() => {
//             setIsSidebarOpen(!isSidebarOpen);
//           }}
//         />
//         <NavbarBrand className="fw-bold px-4">Users</NavbarBrand>
//         <Nav className="me-auto" navbar>
//           <div className="d-flex gap-1 align-items-center">
//             {/* <div className="x-small fw-bold">Period</div> */}
//             {/* <Dropdown isOpen={dropdownOpen} toggle={toggle} direction="down">
//               <DropdownToggle
//                 variant="secondary"
//                 size="sm"
//                 className="border-0 p-0 px-2 d-flex column-gap-2 align-items-center"
//               >
//                 All ▼
//               </DropdownToggle>
//               <DropdownMenu>
//                 <DropdownItem>This Year</DropdownItem>
//                 <DropdownItem>This Month</DropdownItem>
//                 <DropdownItem>This Week</DropdownItem>
//               </DropdownMenu>
//             </Dropdown> */}
//           </div>
//         </Nav>
//         <div className="d-flex align-items-center gap-3">
//           <div className="d-flex justify-content-end ms-auto align-items-center column-gap-2">
//             <InputGroup className="shadow-sm border-secondary">
//               <InputGroupText className="bg-white">
//                 <BsSearch size={16} />
//               </InputGroupText>
//               <Input
//                 placeholder="Search"
//                 className="border-start-0 border-end-0 search"
//                 value={filter}
//                 onChange={handleSearchFilterChange}
//               />
//               {/* <InputGroupText className="bg-white">
//                 <Button
//                   color="link"
//                   size="sm"
//                   className="p-0"
//                   onClick={() => searchToggle()}
//                 >
//                   <BsSliders2 size={16} />
//                 </Button>
//               </InputGroupText> */}
//             </InputGroup>
//           </div>
//           <InviteUserModal
//             isOpen={modalState}
//             toggle={() => setModalState(false)}
//           />
//           <Button color="primary" onClick={() => setModalState(true)}>
//             Invite User
//             <AiOutlinePlus />
//           </Button>
//           <Profile />
//         </div>
//       </Navbar>
//       <div className="content d-flex">
//         <SideBar isSidebarOpen={!isSidebarOpen}  />
//         <div className="aria-content">
//         <GenericTable
//           tableData={filteredData}
//           tableHeaders={columns}
//           defaultSortColumn="Name"

//         />
//         </div>

//       </div>
//     </>
//   );
// };

// export default UserPage;
