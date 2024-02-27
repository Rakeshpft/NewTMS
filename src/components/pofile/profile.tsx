import React from "react";
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledButtonDropdown,
} from "reactstrap";
import { handleLogout } from "../auth";
// import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
 import { routes } from "../routes/routes";

const Profile = () => {

  const navigate = useNavigate()

const navigateToProfile = () => {
   navigate(routes.profileForm)
}

  return (
    <>
      <UncontrolledButtonDropdown direction="down" className="float-right">
        <DropdownToggle
          id="userProfileDropdown"
          color="transparent"
          className="user-dropdown__icon"
        >
          <Row>
            <Col className="user-dropdown-greeting">
              <div className="user-avatar me-2">
                <img
                  loading="lazy"
                  width="40"
                  height="40"
                  className="rounded-circle"
                  src={require("../../../public/images/user-avatar.png")}
                />
              </div>
            </Col>
          </Row>
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem className="border-bottom">
            <div className="d-flex justify-content-between text-align-center">
              <span className="text-dark" onClick={ () =>navigateToProfile()}  >Profile</span>
            </div>
          </DropdownItem>
          <DropdownItem className="border-bottom">
            <div className="d-flex justify-content-between text-align-center">
              <span className="text-dark">Setting</span>
            </div>
          </DropdownItem>
          
          <DropdownItem className="border-bottom" onClick={handleLogout}>
            <div className="d-flex justify-content-between text-align-center">
              <span className="text-dark">Logout</span>
              <FiLogOut style={{ fontSize: "1rem" }} />
            </div>
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledButtonDropdown>
    </>
  );
};

export default Profile;
