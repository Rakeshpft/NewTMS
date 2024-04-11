import React, { useState, useEffect } from "react";
//import sidebarItems from "./sidebarData.json";
import { Link } from "react-router-dom";
import ReactIcon from "./react-icon";
import { useListContext } from "../../services/reducer/list.reducer";
import { ISideMenuObject } from "../../services/tms-objects/side-menu.types";


type SideBarProps = {
  isSidebarOpen: boolean;
  activePageId?: number;
};

const SideBar = ({ isSidebarOpen, activePageId }: SideBarProps) => {
  const { getMenuList, menuList} = useListContext();
  const [activeMenuId, setActiveMenuId] = useState(activePageId);
  const [activeSubMenuId, setActiveSubMenuId] = useState(0);
  const [sideBarItems, setSideBarItems] = useState<ISideMenuObject[]>([]);

useEffect(() => {
  getMenuList();
}, []);

useEffect(()=>{
  menuList && setSideBarItems(menuList);
},[menuList])

const renderSubmenu = (submenuItems:any) => {
    return submenuItems.map((item:any) => (
      <li
        key={item.id}
        className={`nav-item ${item.hasSubmenu ? "has-submenu" : ""}`}
      >
        {item.hasSubmenu ? (
          <>
            <Link
              to="javascript:void(0)"
              className={`nav-link ${item.label.toLowerCase()} ${
                activeSubMenuId === item.id ? "active" : ""
              }`}
              onClick={() => toggleSubMenu(item.id)}
            >
              {item.label}
            </Link>
            <ul
              className={`submenu list-unstyled collapse ${
                activeSubMenuId === item.id ? "show" : ""
              }`}
            >
              {renderSubmenu(item.submenuItems)}
            </ul>
          </>
        ) : (
          <Link
            to={item.link || "javascript:void(0)"}
            className={`nav-link ${
              activeSubMenuId==item.id ? "active" : ""
            }`}
          >
            {item.label}
          </Link>
        )}
      </li>
    ));
  };

  const renderSidebarItems = () => {      
    return sideBarItems.map((item:any) => (
        <li
          key={item.id}
          className={`nav-item main-menu ${item.hasSubmenu ? "has-submenu" : ""}`}
        >
          {item.hasSubmenu ? (
            <>              
              <Link
                to="javascript:void(0)" id={`link-${item.id}`}
                className={`nav-link ${item.label.toLowerCase()} ${
                  activeMenuId === item.id ? "active" : ""
                }`}
                onClick={() => toggleMenu(item.id)}
              >
                <ReactIcon name={item.icon} />&nbsp;&nbsp;&nbsp;{item.label}
              </Link>
              <ul
                className={`submenu list-unstyled collapse ${
                  activeMenuId === item.id ? "show" : ""
                }`}
              >
                {renderSubmenu(item.submenuItems)}
              </ul>
            </>
          ) : (
            <Link to={item.link || "javascript:void(0)"} id={`link-${item.id}`} 
            className={`nav-link ${
              activeMenuId === item.id ? "active" : ""
            }`}>
              <ReactIcon name={item.icon} />&nbsp;&nbsp;&nbsp;{item.label}
            </Link>
          )}
        </li>
      ));    
  };

  const toggleMenu = (id: any) => {
    setActiveMenuId((prevId) => (prevId === id ? null : id));
    let sidebars = sideBarItems.map((item:ISideMenuObject)=> (item.id==id ? {...item, isOpen:(item.hasSubmenu?!item.isOpen:item.isOpen), active:true}: item));
    setSideBarItems(sidebars);
  };  
  const toggleSubMenu = (id: any) => {
    setActiveSubMenuId((prevId) => (prevId === id ? null : id));
  };
  return (
    isSidebarOpen && (
      <div className="sidebar-container">
      <nav className="sidebar open">
        <ul className="nav flex-column">{renderSidebarItems()}</ul>
      </nav>
      </div>
    )
  );
};

export default SideBar;
