import React, { useState, useEffect } from "react";
//import sidebarItems from "./sidebarData.json";
import { Link, useLocation } from "react-router-dom";
import ReactIcon from "./react-icon";
import { useListContext } from "../../services/reducer/list.reducer";
import { ISideMenuObject } from "../../services/tms-objects/side-menu.types";

type SideBarProps = {
  isSidebarOpen: boolean;
  activePageId?: number;
};

const SideBar = ({ isSidebarOpen, activePageId }: SideBarProps) => {
  const { getMenuList, menuList} = useListContext();
  const [activeMenu, setActiveMenu] = useState(activePageId);
  const [sideBarItems, setSideBarItems] = useState<ISideMenuObject[]>([]);
  const location = useLocation();
useEffect(() => {
  getMenuList();
}, []);

useEffect(()=>{
  if(menuList){
     setSideBarItems(menuList);     
    activePageId = getActiveMenu(location.pathname,menuList);
    setActiveMenu(activePageId);
  }
},[menuList])

const renderSubmenu = (submenuItems:any,parentId:number) => {
    return submenuItems.map((item:any) => (
      <li key={item.id} className={`nav-item ${item.hasSubmenu ? "has-submenu" : ""}`} >
        {item.hasSubmenu ? (
          <>
            <Link to="/" className={`nav-link ${item.label.toLowerCase()} ${activeMenu==item.id || checkItemExistsInNestedArray(activeMenu,item.submenuItems) ? "active" : "" }`}
              onClick={(event) =>{ event.preventDefault(); handleMenu(item.id,parentId,false,activeMenu==item.id || checkItemExistsInNestedArray(activeMenu,item.submenuItems));}}
            >
              {item.label}
            </Link>
            <ul className={`submenu list-unstyled collapse ${activeMenu==item.id || checkItemExistsInNestedArray(activeMenu,item.submenuItems) ? "show" : "" }`} >
              {renderSubmenu(item.submenuItems,item.id)}
            </ul>
          </>
        ) : (
          <Link to={item.link || ""} className={`nav-link ${activeMenu==item.id ? "active" : "" }`}
          onClick={()=>{handleMenu(item.id,parentId,true,activeMenu==item.id)}}>
            {item.label}
          </Link>
        )}
      </li>
    ));
  };

  const renderSidebarItems = () => {      
    return sideBarItems.map((item:any) => (
        <li key={item.id} className={`nav-item main-menu ${item.hasSubmenu ? "has-submenu" : ""}`} >
          {item.hasSubmenu ? (
            <>              
              <Link to="/" id={`link-${item.id}`}
                className={`nav-link ${item.label.toLowerCase()} ${activeMenu==item.id || checkItemExistsInNestedArray(activeMenu,item.submenuItems) ? "active" : "" }`}
                onClick={(event) =>{ event.preventDefault(); handleMenu(item.id,0,false,activeMenu==item.id || checkItemExistsInNestedArray(activeMenu,item.submenuItems));}}
              >
                <ReactIcon name={item.icon} />&nbsp;&nbsp;&nbsp;{item.label}
              </Link>
              <ul className={`submenu list-unstyled collapse ${activeMenu==item.id || checkItemExistsInNestedArray(activeMenu,item.submenuItems) ? "show" : "" }`} >
                {renderSubmenu(item.submenuItems,item.id)}
              </ul>
            </>
          ) : (
            <Link to={item.link || ""} id={`link-${item.id}`} 
              className={`nav-link ${activeMenu === item.id ? "active" : ""}`} onClick={()=>{handleMenu(item.id,0,true,activeMenu === item.id)}}>                
              <ReactIcon name={item.icon} />&nbsp;&nbsp;&nbsp;{item.label}
            </Link>
          )}
        </li>
      ));    
  };

  function checkItemExistsInNestedArray(item:any, nestedArray:ISideMenuObject[]) {
    // Base case: If the nested array is empty, return false
    if (nestedArray.length === 0) {
      return false;
    }  
    // Iterate through each item in the nested array
    for (const element of nestedArray) {
      if (element.id == item) {
        return true; // If the item matches the current element, return true
      }
      // If the current element is an array, recursively check it
      else if (element.hasSubmenu) {
        if (checkItemExistsInNestedArray(item, element.submenuItems)) {
          return true; // If found in the nested array, return true
        }
      } 
    }  
    // If the item is not found in the entire nested array, return false
    return false;
  }

   const getActiveMenu=(path:string, nestedArray:ISideMenuObject[]):any =>{
    // Base case: If the nested array is empty, return false
    if (nestedArray.length === 0) {
      return 0;
    }  
    // Iterate through each item in the nested array
    for (const element of nestedArray) {      
      // If the current element is an array, recursively check it
      if (element.hasSubmenu) {
        const menu = getActiveMenu(path, element.submenuItems);
        if(menu>0){
          return menu;
        }
      } 
      else if (element.link != '' && path.includes(element.link)) {
        return element.id; // If the item matches the current element, return true
      }
    }  
    // If the item is not found in the entire nested array, return false
    return 0;
  }

  const handleMenu = (id:number,parentId:number,mainMenu:boolean,isActive:boolean)=>{    
    if((activeMenu == id || isActive) && !mainMenu){ id = parentId; }
    setActiveMenu(id);
  }
  
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
