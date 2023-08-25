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
        path: "/loadpage",
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
        title: "TONU",
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
        title: "Closed",
        path: "/load/closed",
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
        path: "/driverpage",
      },
      {
        title: "Applicant",
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
            path: "/partners/customers",
          },
          {
            title: "Approve",
            path: "/partners/customers/approve",
          },
          {
            title: "Pending",
            path: "/partners/customers/pending",
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
            path: "/partners/vendors",
          },
          {
            title: "Dispatcher",
            path: "/partners/vendors/dispatcher",
          },
          {
            title: "Equipment Owner",
            path: "/partners/vendors/equipmentowner",
          },
          {
            title: "Repair Shop",
            path: "/partners/vendors/repairshop",
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
            path: "/equipments/trucks",
          },
          {
            title: "Active",
            path: "/equipments/trucks/active",
          },
          {
            title: "Inactive",
            path: "/equipments/trucks/inactive",
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
            path: "/equipments/trailers",
          },
          {
            title: "Active",
            path: "/equipments/trailers/active",
          },
          {
            title: "Inactive",
            path: "/equipments/trailers/inactive",
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
            path: "/fuel/fuelcard",
          },
          {
            title: "Active",
            path: "/fuel/fuelcard/active",
          },
          {
            title: "Inactive",
            path: "/fuel/fuelcard/inactive",
          },
        ],
      },
      {
        title: "Fuel Transactions",
        path: "/fuel/fueltransaction",
      },
      {
        title: "Fuel Import",
        path: "/fuel/fuelimport",
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
        path: "/driverpayroll",
      },
      {
        title: "Preparing ",
        path: "/driverpayroll/preparing ",
      },
      {
        title: "Ready for Payment",
        path: "/driverpayroll/readyforpayment",
      },
      {
        title: "Paid",
        path: "/driverpayroll/paid",
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
            path: "/accounts/billing",
          },
          {
            title: "New",
            path: "/accounts/billing/new",
          },
          {
            title: "Applied",
            path: "/accounts/billing/applied",
          },
        ],
      },
      {
        title: "Vendor Balances",
        path: "/accounts/vendorbalance",
      },
      {
        title: "Addition/Deduction",
        iconClosed: <RiArrowDownSFill />,
        iconOpen: <RiArrowUpSFill />,
        children: [
          {
            title: "All",
            path: "/accounts/additions",
          },
          {
            title: "Additions",
            path: "/accounts/additions/additions",
          },
          {
            title: "Deductions",
            path: "/accounts/additions/deductions",
          },
        ],
      },
      {
        title: "Scheduled Payments",
        iconClosed: <RiArrowDownSFill />,
        iconOpen: <RiArrowUpSFill />,
        children: [
          {
            title: "All",
            path: "/accounts/scheduledpage",
          },
          {
            title: "Additions",
            path: "/accounts/scheduledpayments/additions",
          },
          {
            title: "Deductions",
            path: "/accounts/scheduledpayments/deductions",
          },
          {
            title: "Driver Loan",
            path: "/accounts/scheduledpayments/driverloan",
          },
          {
            title: "Escrow",
            path: "accounts/scheduledpayments/escrow",
          },
        ],
      },
      {
        title: "Chart of Accounts",
        iconClosed: <RiArrowDownSFill />,
        iconOpen: <RiArrowUpSFill />,
        children: [
          {
            title: "All",
            path: "/accounts/chartofaccounts",
          },
          {
            title: "Active",
            path: "/accounts/scheduledpayments/additions",
          },
        ],
      },
      {
        title: "Expenses",
        iconClosed: <RiArrowDownSFill />,
        iconOpen: <RiArrowUpSFill />,
        children: [
          {
            title: "All",
            path: "/accounts/expensespage",
          },
          {
            title: "Active",
            path: "/accounts/scheduledpayments/additions",
          },
        ],
      },
      {
        title: "Factoring Report",
        iconClosed: <RiArrowDownSFill />,
        iconOpen: <RiArrowUpSFill />,
        children: [
          {
            title: "All",
            path: "/accounts/factoringreport",
          },
          {
            title: "Active",
            path: "/accounts/scheduledpayments/additions",
          },
        ],
      },
      {
        title: "Payment",
        iconClosed: <RiArrowDownSFill />,
        iconOpen: <RiArrowUpSFill />,
        children: [
          {
            title: "All",
            path: "/accounts/paymentspage",
          },
          {
            title: "Active",
            path: "/accounts/scheduledpayments/additions",
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
        isOpen ? "active" : ""
      } ${item.children ? "has-child" : ""}`}
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
        <ul className="sidebar-submenu list-unstyled ">
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
        <div className="Sidebar open border-end border-info pt-3">
          <ul className="sidebar-menu list-unstyled">
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
