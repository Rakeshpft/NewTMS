import React from "react";
import { SidebarData } from "./sidebardata";
import SubMenu from "./submenu";

interface SideBarProps {
  isOpen: void | boolean;
}
const SideBar = ({ isOpen }: SideBarProps) => {
  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""} border-end`}>
        <div className="sidebar-content">
          {SidebarData.map((item, index) => {
            return <SubMenu item={item} key={index} />;
          })}
        </div>
      </div>
    </>
  );
};

export default SideBar;
