import React, { useState } from "react";
import { IconContext } from "react-icons/lib";
import { Link } from "react-router-dom";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";

interface SidebarProps {
  isSidebarOpen: boolean;
}

interface SidebarItem {
  title: string;
  path?: string;
  iconClosed?: React.ReactNode;
  iconOpen?: React.ReactNode;
  children?: SidebarItem[];
}

const sidebarData: SidebarItem[] = [
  {
    title: "Dashboard",
    path: "/dashboard",
  },
  {
    title: "Loads",
    iconClosed: <RiArrowDownSFill />,
    iconOpen: <RiArrowUpSFill />,
    children: [
      {
        title: "All",
        path: "/loadpage/all",
      },
      {
        title: "New",
        path: "/load/revenue",
      },
      {
        title: "Canceled",
        path: "/load/canceled",
      },
      {
        title: "TOUN",
        path: "/load/toun",
      },
      {
        title: "Dispatched",
        path: "/load/dispatched",
      },
      {
        title: "En-Route",
        path: "/load/enroute",
      },
      {
        title: "Picked-up",
        path: "/load/pickedup",
      },
      {
        title: "Delivered",
        path: "/load/delivered",
      },
      {
        title: "Close",
        path: "/load/close",
      },
    ],
  },
  {
    title: "Drivers",
    iconClosed: <RiArrowDownSFill />,
    iconOpen: <RiArrowUpSFill />,
    children: [
      {
        title: "All",
        path: "/driverpage/all",
      },
      {
        title: "New",
        path: "/driver/new",
      },
      {
        title: "Hired",
        path: "/driver/hired",
      },
      {
        title: "Terminated",
        path: "/driver/terminated",
      },
      {
        title: "Closed",
        path: "/driver/closed",
      },
    ],
  },
  {
    title: "Partners",
    iconClosed: <RiArrowDownSFill />,
    iconOpen: <RiArrowUpSFill />,
    children: [
      {
        title: "Customers",
        iconClosed: <RiArrowDownSFill />,
        iconOpen: <RiArrowUpSFill />,
        children: [
          {
            title: "All",
            path: "/partners/customers/all",
          },
          {
            title: "New",
            path: "/partners/customers/new",
          },
        ],
      },
      {
        title: "Vendors",
        iconClosed: <RiArrowDownSFill />,
        iconOpen: <RiArrowUpSFill />,
        children: [
          {
            title: "All",
            path: "/partners/vendors/all",
          },
          {
            title: "New",
            path: "/partners/vendors/new",
          },
        ],
      },
    ],
  },
  {
    title: "Equipments",
    iconClosed: <RiArrowDownSFill />,
    iconOpen: <RiArrowUpSFill />,
    children: [
      {
        title: "Trucks",
        iconClosed: <RiArrowDownSFill />,
        iconOpen: <RiArrowUpSFill />,
        children: [
          {
            title: "All",
            path: "/equipments/trucks/all",
          },
          {
            title: "Active",
            path: "/equipments/trucks/active",
          },
          {
            title: "Inactive",
            path: "/equipments/trucks/inactive",
          },
          {
            title: "Closed",
            path: "/equipments/trucks/closed",
          },
          {
            title: "Blocked",
            path: "/equipments/trucks/blocked",
          },
        ],
      },
      {
        title: "Trailers",
        iconClosed: <RiArrowDownSFill />,
        iconOpen: <RiArrowUpSFill />,
        children: [
          {
            title: "All",
            path: "/equipments/trailers/all",
          },
          {
            title: "Active",
            path: "/equipments/trailers/active",
          },
          {
            title: "Inactive",
            path: "/equipments/trailers/inactive",
          },
          {
            title: "In-Transit",
            path: "/equipments/trailers/intransit",
          },
          {
            title: "Unavaliable",
            path: "/equipments/trailers/unavaliable",
          },
        ],
      },
    ],
  },
  {
    title: "Fuel",
    iconClosed: <RiArrowDownSFill />,
    iconOpen: <RiArrowUpSFill />,
    children: [
      {
        title: "Fuel Cards",
        iconClosed: <RiArrowDownSFill />,
        iconOpen: <RiArrowUpSFill />,
        children: [
          {
            title: "All",
            path: "/fuel/fuelcard/all",
          },
          {
            title: "Active",
            path: "/fuel/fuelcard/active",
          },
          {
            title: "Inactive",
            path: "/fuel/fuelcard/inactive",
          },
          {
            title: "Closed",
            path: "/fuel/fuelcard/closed",
          },
          {
            title: "Blocked",
            path: "/fuel/fuelcard/blocked",
          },
        ],
      },
      {
        title: "Fuel Transactions",
        iconClosed: <RiArrowDownSFill />,
        iconOpen: <RiArrowUpSFill />,
        children: [
          {
            title: "All",
            path: "/fuel/fueltransaction/all",
          },
          {
            title: "Active",
            path: "/fuel/fueltransaction/active",
          },
          {
            title: "Inactive",
            path: "/fuel/fueltransaction/inactive",
          },
        ],
      },
      {
        title: "Fuel Import",
        iconClosed: <RiArrowDownSFill />,
        iconOpen: <RiArrowUpSFill />,
        children: [
          {
            title: "All",
            path: "/fuel/fuelimport/all",
          },
          {
            title: "Active",
            path: "/fuel/fuelimport/active",
          },
          {
            title: "Inactive",
            path: "/fuel/fuelimport/inactive",
          },
        ],
      },
    ],
  },
  {
    title: "Driver Payroll",
    iconClosed: <RiArrowDownSFill />,
    iconOpen: <RiArrowUpSFill />,
    children: [
      {
        title: "All",
        path: "/driverpayroll/all",
      },
      {
        title: "Active",
        path: "/driverpayroll/active",
      },
      {
        title: "Inactive",
        path: "/driverpayroll/inactive",
      },
      {
        title: "In-Transit",
        path: "/driverpayroll/intransit",
      },
      {
        title: "Unavaliable",
        path: "/driverpayroll/unavaliable",
      },
      {
        title: "N/A",
        path: "/driverpayroll/na",
      },
    ],
  },
  {
    title: "Accounts",
    iconClosed: <RiArrowDownSFill />,
    iconOpen: <RiArrowUpSFill />,
    children: [
      {
        title: "Billing Entries",
        iconClosed: <RiArrowDownSFill />,
        iconOpen: <RiArrowUpSFill />,
        children: [
          {
            title: "All",
            path: "/accounts/billing/all",
          },
          {
            title: "Active",
            path: "/accounts/billing/active",
          },
          {
            title: "Inactive",
            path: "/accounts/billing/inactive",
          },
        ],
      },
      {
        title: "Vendor Balances",
        iconClosed: <RiArrowDownSFill />,
        iconOpen: <RiArrowUpSFill />,
        children: [
          {
            title: "All",
            path: "/accounts/vendor/all",
          },
          {
            title: "Active",
            path: "/accounts/vendor/active",
          },
          {
            title: "Inactive",
            path: "/accounts/vendor/inactive",
          },
        ],
      },
    ],
  },
];

const SidebarItem: React.FC<{ item: SidebarItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        className={`sidebar-item ps-4 text-start border-0 rounded-0 d-flex align-items-center
      btn btn-outline-secondary w-100 text-decoration-none py-2 ${
        isOpen && "active"
      }`}
        onClick={handleToggle}
      >
        {item.path ? (
          <Link to={item.path} style={{ textDecoration: "none" }}>
            {item.title}
          </Link>
        ) : (
          item.title
        )}
        <div>
          {item.children && isOpen
            ? item.iconOpen
            : item.children
            ? item.iconClosed
            : null}
        </div>
      </div>
      {isOpen && item.children && (
        <ul className="sidebar-submenu list-unstyled">
          {item.children.map((child, index) => (
            <li key={index}>
              <SidebarItem item={child} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

const Sidebar = ({ isSidebarOpen }: SidebarProps) => {
  return (
    <IconContext.Provider value={{ color: "black", size: "20px" }}>
      {isSidebarOpen && (
        <div className="Sidebar open py-3 border-end border-info">
          <ul className="sidebar-menu active list-unstyled">
            {sidebarData.map((item, index) => (
              <li key={index}>
                <SidebarItem item={item} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </IconContext.Provider>
  );
};

export default Sidebar;
