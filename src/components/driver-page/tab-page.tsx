import React, { useEffect, useState } from "react";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

interface TabPageProps {
  tabTitles: string[];
  children?: any[] | JSX.Element | JSX.Element[];
  onclick?: React.Dispatch<React.SetStateAction<number>>;
}
const TabPage = ({ tabTitles, children, onclick }: TabPageProps) => {
  children = React.Children.toArray(children);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (onclick) onclick(activeTab);
  }, [activeTab]);

  return (
    <>
      <Nav tabs>
        {tabTitles.map((tabTitle, index) => (
          <NavItem key={index}>
            <NavLink
              style={{ fontSize: "small" }}
              className={`text-dark py-4 cursor-pointer ${
                activeTab === index ? "active fw-bold" : "fw-semibold"
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tabTitle}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={activeTab}>
        {children.map((child: any, index: any) => {
          return (
            <TabPane key={index} tabId={index}>
              {child}
            </TabPane>
          );
        })}
      </TabContent>
    </>
  );
};

export default TabPage;
