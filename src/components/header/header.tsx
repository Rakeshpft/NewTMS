import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {  Nav, Navbar, NavbarBrand, NavItem } from "reactstrap";
import SearchPage from "../search-page";
import CompanyLogo from "../company-logo";
import { GiHamburgerMenu } from "react-icons/gi";
import NewDriverPage from "../driver-page/new-driver-page";

interface HeaderProps {
  title: string;
  link?: string;
  name: string;
  // stitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, name }) => {
  const [isOpen, setIsOpen] = useState(true);
  // const [modal, setModal] = useState(false);
  const { pathname } = useLocation();
  // const [modalName, setModalName] = useState<string>();

  // const onModalChange = (titleName: string) => {
  //   setModalName(titleName);
  // };
  // alert(modalName);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // const toggle = () => setModal(!modal);

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
          <Link to="/dashboard">
            <CompanyLogo height={53} />
          </Link>
        </div>
        <NavbarBrand>{title}</NavbarBrand>
        <Nav className="me-auto" navbar>
          <NavItem>{name}</NavItem>
        </Nav>
        <div className="d-flex align-items-center gap-5">
          <SearchPage />
          {/* <Button
            onClick={toggle}
            data-bs-toggle="modal"
            data-bs-target={`#modal_${stitle}`}
            // modalName={onModalChange}
          >
            {stitle}
          </Button> */}
          <NewDriverPage />
        </div>
      </Navbar>
    </>
  );
};

export default Header;
