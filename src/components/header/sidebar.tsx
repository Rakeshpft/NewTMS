import React, { useState } from "react";
import sidebarItems from "./sidebarData.json";
import { Link } from "react-router-dom";

type SideBarProps = {
  isSidebarOpen: boolean;
  activePageId: number;
};

const SideBar = ({ isSidebarOpen, activePageId }: SideBarProps) => {
  const [openSubmenuId, setOpenSubmenuId] = useState(activePageId);
  const [openSubmenuId2, setOpenSubmenuId2] = useState(0);

  // const location = useLocation();
  // const searchParams = new URLSearchParams(location.search);
  // const pathname = location.pathname; // Get the path name
  // const filter = searchParams.get("filter"); // Get the 'filter' parameter
  // console.log(window.location.href);
  const renderSubmenu = (submenuItems: any) => {
    return submenuItems.map((item: any) => (
      <li
        key={item.id}
        className={`nav-item ${item.hasSubmenu ? "has-submenu" : ""}`}
      >
        {item.hasSubmenu ? (
          <>
            <Link
              to="#"
              className={`nav-link ${item.label.toLowerCase()} ${
                openSubmenuId2 === item.id ? "active" : ""
              }`}
              onClick={() => toggleSubmenu2(item.id)}
            >
              {item.label}
            </Link>
            <ul
              className={`submenu list-unstyled collapse ${
                openSubmenuId2 === item.id ? "show" : ""
              }`}
            >
              {renderSubmenu(item.submenuItems)}
            </ul>
          </>
        ) : (
          <Link
            to={item.link || ""}
            className={`nav-link ${
              window.location.href.includes(item.link) && "active"
            }`}
          >
            {item.label}
          </Link>
        )}
      </li>
    ));
  };

  const renderSidebarItems = () => {
    return sidebarItems.data.map((item) => (
      <li
        key={item.id}
        className={`nav-item ${item.hasSubmenu ? "has-submenu" : ""}`}
      >
        {item.hasSubmenu ? (
          <>
            <Link
              to="#"
              className={`nav-link ps-4 ${item.label.toLowerCase()} ${
                openSubmenuId === item.id ? "active" : ""
              }`}
              onClick={() => toggleSubmenu(item.id)}
            >
              {item.label}
            </Link>
            <ul
              className={`submenu list-unstyled collapse ${
                openSubmenuId === item.id ? "show" : ""
              }`}
            >
              {renderSubmenu(item.submenuItems)}
            </ul>
          </>
        ) : (
          <Link to={item.link || ""} className="nav-link ps-4">
            {item.label}
          </Link>
        )}
      </li>
    ));
  };

  const toggleSubmenu = (id: any) => {
    setOpenSubmenuId((prevId) => (prevId === id ? null : id));
  };
  const toggleSubmenu2 = (id: any) => {
    setOpenSubmenuId2((prevId) => (prevId === id ? null : id));
  };
  return (
    isSidebarOpen && (
      <nav className=" Sidebar open pt-3 border-end border-info">
        <ul className="nav flex-column">{renderSidebarItems()}</ul>
      </nav>
    )
  );
};

export default SideBar;
