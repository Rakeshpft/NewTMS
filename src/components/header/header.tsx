import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
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
      <div className="header_nav">
        {showHambuger ? (
          <div
            className="fs-2 toggle-button d-flex align-items-center gap-2"
            onClick={() => sidebarToggle()}
          >
            <Link to="/dashboard">
              <CompanyLogo height={50} />
            </Link>
            <GiHamburgerMenu color="#1B56AE" />
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
      </div>
    </>
  );
};

export default Header;
