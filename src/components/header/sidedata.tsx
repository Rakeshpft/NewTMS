import React from "react";
import SidebarItem from "./sidebaritem";

interface SidebarData {
  title: string;
  children?: SidebarData[];
}

interface SidebarProps {
  data: SidebarData[];
}

const SidebarData: React.FC<SidebarProps> = ({ data }) => {
  return (
    <ul>
      {data.map((item, index) => (
        <li key={index}>
          <SidebarItem title={item.title}>
            {item.children && <SidebarData data={item.children} />}
          </SidebarItem>
        </li>
      ))}
    </ul>
  );
};

export default SidebarData;
