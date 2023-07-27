import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Navbar } from "reactstrap";
import CompanyLogo from "../company-logo";
import { GiHamburgerMenu } from "react-icons/gi";

interface HeaderProps {
  sidebarToggle: () => void;
}
const Header = ({ sidebarToggle }: HeaderProps) => {
  const { pathname } = useLocation();

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
        <div
          className="fs-2 toggle-button d-flex align-items-center gap-2"
          onClick={() => sidebarToggle()}
        >
          <GiHamburgerMenu />
          <Link to="/dashboard">
            <CompanyLogo height={50} />
          </Link>
        </div>
      </Navbar>
    </>
  );
};

export default Header;
