import React from "react";
import {
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  NavItem,
  Navbar,
  Row,
  UncontrolledButtonDropdown,
} from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { handleLogout } from "../auth";
import { BsBell, BsGear } from "react-icons/bs";
import { BiMessageDetail } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import CompanyLogo from "../company-logo/company-logo";
import lscache from "lscache";
const NavigationBar = () => {
  const { pathname } = useLocation();

  if (
    pathname === "/" ||
    pathname === "/registration-form" ||
    pathname === "/forgetpassword"
  ) {
    return null;
  }
//  const { auth} =  useRegContext()
//  console.log( 'auth value ',auth )
const username = lscache.get('auth').data.user_name
console.log('username',username)
  
  return (
    <div className="header-section">
      <Navbar className="px-md-3 px-0 border-bottom">
        <Nav>
          <NavItem>
            <Link to={"/dashboard"} className="fs-2 pe-2 link-light">
              <CompanyLogo height={64} shrinkOnSmallScreen />
            </Link>
          </NavItem>
        </Nav>
        <Row>
          <UncontrolledButtonDropdown>
            <DropdownToggle
              caret
              id="userProfileDropdown"
              color="transparent"
              className="user-dropdown__icon d-flex align-items-center"
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
                  <div className="d-lg-block d-none text-start small">
                    <div className="fw-bold">TMS User</div>
                    <div>{username}</div>
                  </div>
                </Col>
              </Row>
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem className="border-bottom">
                <div className="d-flex justify-content-between text-align-center">
                  <span className="text-dark">Profile</span>
                </div>
              </DropdownItem>
              <DropdownItem className="border-bottom" onClick={handleLogout}>
                <div className="d-flex justify-content-between text-align-center">
                  <span className="text-dark">Logout</span>
                  <FiLogOut style={{ fontSize: "1rem" }} />
                </div>
              </DropdownItem>
            </DropdownMenu>
            <Col className="d-sm-flex d-none user-dropdown-greeting">
              <div className="px-2">
                <BiMessageDetail className="fs-4 " />
              </div>
              <div className="px-2">
                <BsBell className="fs-4 " />
              </div>
              <div className="px-2">
                <BsGear className="fs-4 " />
              </div>
            </Col>
          </UncontrolledButtonDropdown>
        </Row>
      </Navbar>
    </div>
  );
};

export default NavigationBar;
