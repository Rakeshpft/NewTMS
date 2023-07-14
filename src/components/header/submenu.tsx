import React, { useState } from "react";
import { Link } from "react-router-dom";

interface SubMenuProps {
  item?: any;
}
const SubMenu = ({ item }: SubMenuProps) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);
  return (
    <>
      <div className="sidebarlink" onClick={item.subNav && showSubnav}>
        <div className="sidebarlabel">{item.title}</div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </div>
      {subnav &&
        item.subNav.map(
          (
            item: { path: string; icon: string; title: string },
            index: string
          ) => {
            return (
              <Link to={`${item.path}`} className="dropdownLink" key={index}>
                {item.icon}
                <div className="sidebarlabel">{item.title}</div>
              </Link>
            );
          }
        )}
    </>
  );
};

export default SubMenu;
