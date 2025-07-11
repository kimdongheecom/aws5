interface MenuItem {
  title: string;
  path?: string;
  submenu?: MenuItem[];
}

const menuData: MenuItem[] = [
  {
    title: "Contact",
    path: "/contact",
  },
  {
    title: "ESG Report",
    path: "/esg-performance",
    submenu: [
      {
        title: "Environmental",
        path: "/esg-performance/environmental",
      },
      {
        title: "Social",
        path: "/esg-performance/social",
      },
      {
        title: "Governance",
        path: "/esg-performance/governance",
      },
    ],
  },
  {
    title: "Stock Price",
    path: "/stock-price",
  },
  {
    title: "Watchdog",
    path: "/watchdog",
  },
  {
    title: "GRI",
    path: "/gri",
  },
  {
    title: "Thesis",
    path: "/thesis",
  },
];

export default menuData;
