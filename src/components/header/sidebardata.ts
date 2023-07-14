export const SidebarData = [
  {
    title: "Dashboard",
    path: "/Dashboard",
  },
  {
    title: "Loads",
    subNav: [
      {
        title: "All",
        path: "/Loads/users",
      },
      {
        title: "New",
        path: "/Loads/revenue",
      },
      {
        title: "Canceled",
        path: "/Loads/canceled",
      },
      {
        title: "TOUN",
        path: "/Loads/toun",
      },
      {
        title: "Dispatched",
        path: "/Loads/dispatched",
      },
      {
        title: "En-Route",
        path: "/Loads/enroute",
      },
      {
        title: "Picked-up",
        path: "/Loads/pickedup",
      },
      {
        title: "Delivered",
        path: "/Loads/delivered",
      },
      {
        title: "Close",
        path: "/Loads/close",
      },
    ],
  },
  {
    title: "Drivers",
    subNav: [
      {
        title: "All",
        path: "/Drivers/all",
      },
      {
        title: "New",
        path: "/Drivers/new",
      },
      {
        title: "Hired",
        path: "/Drivers/hired",
      },
      {
        title: "Terminated",
        path: "/Drivers/terminated",
      },
      {
        title: "Closed",
        path: "/Drivers/closed",
      },
    ],
  },
  {
    title: "Partners",
    subNav: [
      {
        title: "Customers",
        path: "/Partners/customers",
        subNav: [
          {
            title: "All",
            path: "/Partners/customers/all",
          },
          {
            title: "New",
            path: "/Partners/customers/new",
          },
        ],
      },
      {
        title: "Vendors",
        path: "/Partners/vendors",
        subNav: [
          {
            title: "All",
            path: "/Partners/vendors/all",
          },
          {
            title: "New",
            path: "/Partners/vendors/new",
          },
        ],
      },
    ],
  },
];
