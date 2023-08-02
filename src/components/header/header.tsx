import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Navbar } from "reactstrap";
import CompanyLogo from "../company-logo";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiArrowLeft } from "react-icons/fi";

interface HeaderProps {
  sidebarToggle: () => void;
  showHambuger?: boolean;
}
const Header = ({ sidebarToggle, showHambuger = true }: HeaderProps) => {
  const { pathname } = useLocation();
  const history = useHistory();

  const handleBack = () => {
    history.goBack();
  };

  if (
    pathname === "/" ||
    pathname === "/registration-form" ||
    pathname === "/forgetpassword" ||
    pathname === "/dashboard"
  ) {
    return null;
  }

  return (
    <>
      <Navbar color="light">
        {showHambuger ? (
          <div
            className="fs-2 toggle-button d-flex align-items-center gap-2"
            onClick={() => sidebarToggle()}
          >
            <GiHamburgerMenu />
            <Link to="/dashboard">
              <CompanyLogo height={50} />
            </Link>
          </div>
        ) : (
          <div
            className="fs-2 toggle-button d-flex align-items-center gap-2"
            onClick={() => handleBack()}
          >
            <FiArrowLeft />
            <Link to="/dashboard">
              <CompanyLogo height={50} />
            </Link>
          </div>
        )}
      </Navbar>
    </>
  );
};

export default Header;
