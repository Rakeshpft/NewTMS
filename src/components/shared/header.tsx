import React from "react";
import { Link,  useLocation } from "react-router-dom";
//import { useNavigate } from 'react-router-dom';
import CompanyLogo from "../company-logo";
import { GiHamburgerMenu } from "react-icons/gi";
import { FiArrowLeft } from "react-icons/fi";

interface HeaderProps {
  sidebarToggle: () => void;
  showHambuger?: boolean;
}
const Header = ({ sidebarToggle, showHambuger = true }: HeaderProps) => {
  //const navigate = useNavigate();
  const { pathname } = useLocation();
  
  // const history = useHistory();

  // const handleBack = () => {
  //   navigate(-1);
  // };

  if (
    pathname === "/" ||
    pathname === "/registration-form" ||
    pathname === "/forgetpassword" ||
    pathname === "/dashboard"
  ) {
    return null;
  }

  return (
     <div className="fs-2 toggle-button d-flex align-items-center justify-content-between gap-3 px-3" onClick={() => sidebarToggle()} >
            <Link to="/dashboard">
              <CompanyLogo height={50} />
            </Link>
            {showHambuger ? (<GiHamburgerMenu className="hamburger-menu" />) :(<FiArrowLeft className="hamburger-menu" />) }
      </div>
  );
};

export default Header;
