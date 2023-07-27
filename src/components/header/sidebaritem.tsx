import React, { useState } from "react";

interface SidebarItemProps {
  title: string;
  children?: React.ReactNode;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div onClick={handleToggle} style={{ cursor: "pointer" }}>
        {title}
      </div>
      {isOpen && children}
    </div>
  );
};

export default SidebarItem;
