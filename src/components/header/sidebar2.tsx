import React, { useState } from "react";
import sidebarItems from "./sidebarData.json";
import { Link, useLocation } from "react-router-dom";
const Sidebar2 = ({ isSidebarOpen }: { isSidebarOpen: boolean }) => {
  const [openSubmenuId, setOpenSubmenuId] = useState(null);
  const [openSubmenuId2, setOpenSubmenuId2] = useState(null);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const filter = searchParams.get("filter"); // Get the 'filter' parameter
  console.log(filter);
  const renderSubmenu = (submenuItems: any) => {
    return submenuItems.map((item: any) => (
      <li
        key={item.id}
        className={`nav-item ${item.hasSubmenu ? "has-submenu" : ""}`}
      >
        {item.hasSubmenu ? (
          <>
            <a
              href="#"
              className={`nav-link ${
                openSubmenuId2 === item.id ? "active" : ""
              }`}
              onClick={() => toggleSubmenu2(item.id)}
            >
              {item.label}
            </a>
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
              item.label.toLowerCase() == filter ? "active" : ""
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
            <a
              href="#"
              className={`nav-link ps-4 ${
                openSubmenuId === item.id ? "active" : ""
              }`}
              onClick={() => toggleSubmenu(item.id)}
            >
              {item.label}
            </a>
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

export default Sidebar2;
