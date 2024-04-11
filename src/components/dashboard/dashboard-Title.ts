export const dashboardTiles = {
  mainTiles: [
    {
      title: "Loads",
      data: {
        New: 12,
        "En-Route": 15,
        Delivered: 21,
      },
      icon: require("../../../public/icons/conveyor-belt.png"),
      options: [
        {
          title: null,
          icon: null,
          options: [
            {
              title: "Create A Load",
              icon: require("../../../public/icons//create-a-load.png"),
              link: "/createnewload",
            },
            {
              title: "View Existing Loads",
              icon: require("../../../public/icons//view-existing-loads.png"),
              link: "/loadpage",
            },
          ],
        },
      ],
    },
    {
      title: "Drivers",
      data: {
        Hired: 83,
        Terminated: 21,
      },
      icon: require("../../../public/icons/truck-driver.png"),
      options: [
        {
          title: null,
          icon: null,
          options: [
            {
              title: "Create a Profile",
              icon: require("../../../public/icons/create-a-load.png"),
              link: "/createnewdriver",
            },
            {
              title: "View Drivers",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/driverpage",
            },
          ],
        },
      ],
    },
    {
      title: "Partners",
      data: {
        Customers: 12,
        Vendors: 15,
      },
      icon: require("../../../public/icons/partner-exchange-rounded.png"),
      options: [
        {
          title: "Customers",
          icon: require("../../../public/icons/users.png"),
          options: [
            {
              title: "Add New Customer",
              icon: require("../../../public/icons/create-a-load.png"),
              link: "/partners/customer-detail",
            },
            {
              title: "View All Customers",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/partners/customers",
            },
          ],
        },
        {
          title: "Vendors",
          icon: require("../../../public/icons/partners-vendors.png"),
          options: [
            {
              title: "Add New Vendor",
              icon: require("../../../public/icons/create.png"),
              link: "/partners/vendor-detail",
            },
            {
              title: "View All Vendors",
              icon: require("../../../public/icons/view-existing-vendors.png"),
              link: "/partners/vendors",
            },
          ],
        },
      ],
    },
    {
      title: "Equipments",
      data: {
        Trucks: 19,
        Trailers: 24,
      },
      icon: require("../../../public/icons/mdi_tools.png"),
      options: [
        {
          title: "Trucks",
          icon: require("../../../public/icons/equipments-trucks.png"),
          options: [
            {
              title: "Add New Truck",
              icon: require("../../../public/icons/create-a-load.png"),
              link: "/equipments/truck-detail",
            },
            {
              title: "View All Trucks",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/equipments/trucks",
            },
          ],
        },
        {
          title: "Trailers",
          icon: require("../../../public/icons/equipments-trailers.png"),
          options: [
            {
              title: "Add New Trailer",
              icon: require("../../../public/icons/create.png"),
              link: "/equipments/trailer-detail",
            },
            {
              title: "View All Trailers",
              icon: require("../../../public/icons/view-existing-vendors.png"),
              link: "/equipments/trailers",
            },
          ],
        },
      ],
    },
  ],
  mediumTiles: [
    {
      title: "Driver Payroll",
      icon: require("../../../public/icons/driver-payroll.png"),
      options: [
        {
          title: null,
          icon: null,
          options: [
            {
              title: "Add New Driver Payroll",
              icon: require("../../../public/icons/create-a-load.png"),
              link: "/createnewdriverpayroll",
            },
            {
              title: "View All Driver Payroll",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/driverpayroll",
            },
          ],
        },
      ],
    },
  ],

  reportTiles: [
    {
      title: "Reports",
      icon: require("../../../public/icons/reports.png"),
      options: [
        {
          title: "Driver Payments",
          icon: require("../../../public/icons/view-existing-loads.png"),
          options: [
            {
              title: "View All Driver Payments",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/reports/driverpaymentspage",
            },
          ],
        },
        {
          title: "Revenue by Dispatcher",
          icon: require("../../../public/icons/view-existing-loads.png"),
          options: [
            {
              title: "View All Revenue by Dispatcher",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/reports/revenuedispatcherpage",
            },
          ],
        },
        {
          title: "Gross Profit Report",
          icon: require("../../../public/icons/view-existing-loads.png"),
          options: [
            {
              title: "View All Gross Profit Report",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/reports/grossprofitreportpage",
            },
          ],
        },
        {
          title: "Gross Profit Per Load",
          icon: require("../../../public/icons/view-existing-loads.png"),
          options: [
            {
              title: "View All Gross Profit Per Load",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/reports/grossprofitloadpage",
            },
          ],
        },
        {
          title: "Profit and Loss Report",
          icon: require("../../../public/icons/view-existing-loads.png"),
          options: [
            {
              title: "View All Profit and Loss Report",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/reports/profitlossreportpage",
            },
          ],
        },
        {
          title: "Rate per Mile Report",
          icon: require("../../../public/icons/view-existing-loads.png"),
          options: [
            {
              title: "View All Rate per Mile Report",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/reports/ratemilereportpage",
            },
          ],
        },
        {
          title: "Expenses Report",
          icon: require("../../../public/icons/view-existing-loads.png"),
          options: [
            {
              title: "View All Expenses Report",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/reports/expensesreportpage",
            },
          ],
        },
        {
          title: "Total Revenue",
          icon: require("../../../public/icons/view-existing-loads.png"),
          options: [
            {
              title: "View All Total Revenue",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/reports/totalrevenuepage",
            },
          ],
        },
      ],
    },
  ],

  fuelTiles: [
    {
      title: "Fuel",
      icon: require("../../../public/icons/fuel.png"),
      options: [
        {
          title: "Fuel Card",
          icon: require("../../../public/icons/create-a-load.png"),
          options: [
            {
              title: "Add New Fuel Card",
              icon: require("../../../public/icons/create-a-load.png"),
              link: "/fuel/fuel-card-detail",
            },
            {
              title: "View All Fuel Card",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/fuel/fuel-cards",
            },
          ],
        },
        {
          title: "Fuel Transactions",
          icon: require("../../../public/icons/create-a-load.png"),
          options: [
            {
              title: "Add New Fuel Txn",
              icon: require("../../../public/icons/create-a-load.png"),
              link: "/createnewfueltransaction",
            },
            {
              title: "View All Fuel Txn",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/fuel/fueltransaction",
            },
          ],
        },
        {
          title: "Fuel Import",
          icon: require("../../../public/icons/create-a-load.png"),
          options: [
            {
              title: "View All Fuel Import",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/fuel/fuelimport",
            },
          ],
        },
      ],
    },
  ],
  accountTiles: [
    {
      title: "Accounts",
      icon: require("../../../public/icons/accounts.png"),
      options: [
        {
          title: "Billing Entries",
          icon: require("../../../public/icons/create-a-load.png"),
          options: [
            {
              title: "New Billing Entry",
              icon: require("../../../public/icons/create-a-load.png"),
              link: "/createnewbillingpage",
            },
            {
              title: "View All Billing Entry",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/accounts/billing",
            },
          ],
        },
        {
          title: "Additions / Deductions",
          icon: require("../../../public/icons/accounts.png"),
          options: [
            {
              title: "New Entry",
              icon: require("../../../public/icons/create-a-load.png"),
              link: "/createnewadditions",
            },
            {
              title: "View All Additions / Deductions",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/accounts/additions",
            },
          ],
        },
        {
          title: "Charts of Accounts",
          icon: require("../../../public/icons/accounts.png"),
          options: [
            {
              title: "New Chart of Account",
              icon: require("../../../public/icons/create-a-load.png"),
              link: "/createnewchartofaccounts",
            },
            {
              title: "View All Chart of Accounts",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/accounts/chartofaccounts",
            },
          ],
        },
        {
          title: "Factoring Report",
          icon: require("../../../public/icons/accounts.png"),
          options: [
            {
              title: "New Factoring Report",
              icon: require("../../../public/icons/create-a-load.png"),
              link: "/createnewfactoringreport",
            },
            {
              title: "View All Factoring Reports",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/accounts/factoringreport",
            },
          ],
        },
        {
          title: "Vendor Balances",
          icon: require("../../../public/icons/view-existing-loads.png"),
          options: [
            {
              title: "View All Vendor Balance",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/accounts/vendorbalance",
            },
          ],
        },
        {
          title: "Schedule Payments/Dedutions",
          icon: require("../../../public/icons/accounts.png"),
          options: [
            {
              title: "New Schedule Pay./Ded...",
              icon: require("../../../public/icons/create-a-load.png"),
              link: "/createnewscheduledpage",
            },
            {
              title: "View All Schedule Paym./Ded...",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/accounts/scheduledpage",
            },
          ],
        },
        {
          title: "Expenses",
          icon: require("../../../public/icons/view-existing-loads.png"),
          options: [
            {
              title: "View All Expenses",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/accounts/expensespage",
            },
          ],
        },
        {
          title: "Payment",
          icon: require("../../../public/icons/accounts.png"),
          options: [
            {
              title: "New Payment",
              icon: require("../../../public/icons/create-a-load.png"),
              link: "/createnewpaymentspage",
            },
            {
              title: "View All Payments",
              icon: require("../../../public/icons/view-existing-loads.png"),
              link: "/accounts/paymentspage",
            },
          ],
        },
      ],
    },
  ],

  smallTiles: [
    {
      name: "Users",
      icon: require("../../../public/icons//users.png"),
      link: "/UserPage",
    },
    {
      name: "Data Library",
      icon: require("../../../public/icons//data-library.png"),
      link: "/DataLibrary",
    },
    {
      name: "Doc Exchange",
      icon: require("../../../public/icons//docs-exchange.png"),
      link: "/DocExchange",
    },
    {
      name: "IFTA",
      icon: require("../../../public/icons//agreement.png"),
      link: "/ReportPage",
    },
  ],
};
