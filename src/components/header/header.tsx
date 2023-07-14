import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Nav, Button, Navbar, NavbarBrand, NavItem } from "reactstrap";
import SearchPage from "../search-page";
import CompanyLogo from "../company-logo";
import { GiHamburgerMenu } from "react-icons/gi";

interface HeaderProps {
  title: string;
  link?: string;
  name: string;
  stitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, name, stitle }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [modal, setModal] = useState(false);
  const { pathname } = useLocation();
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggle = () => setModal(!modal);

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
      <Navbar className="border-bottom" color="light">
        <div
          className="fs-2 toggle-button d-flex align-items-center gap-2"
          onClick={toggleSidebar}
        >
          <GiHamburgerMenu />
          <CompanyLogo height={53} />
        </div>
        <NavbarBrand>{title}</NavbarBrand>
        <Nav className="me-auto" navbar>
          <NavItem>{name}</NavItem>
        </Nav>
        <div className="d-flex align-items-center gap-5">
          <SearchPage />
          <Button
            onClick={toggle}
            data-bs-toggle="modal"
            data-bs-target={`#modal_${stitle}`}
          >
            {stitle}
          </Button>
        </div>
      </Navbar>
    </>
  );
};

export default Header;
