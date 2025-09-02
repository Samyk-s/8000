import * as Icons from "../icons";
export const NAV_DATA = [
  {
    label: "Main",
    items: [
      {
        title: "Visit Website",
        url: "/",
        icon: Icons.WebsiteIcon,
        items: [],
      },

      {
        title: "Dashboard",
        url: "/admin/dashboard",
        icon: Icons.HomeIcon,
        items: [],
      },

    ],
  },
  {
    label: "Management",
    items: [

      {
        title: "Packages",
        url: "/admin/packages",
        icon: Icons.PackageIcon,
        items: [],
      },
      {
        title: "Packages Bookings",
        url: "/admin/packagebooking",
        icon: Icons.Calendar,
        items: [],
      },
      {
        title: "Reviews",
        url: "/admin/reviews",
        icon: Icons.Calendar,
        items: [],
      },
      {
        title: "Profile",
        url: "/admin/profile",
        icon: Icons.User,
        items: [],
      },
      {
        title: "Forms",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Form Elements",
            url: "/admin/forms/form-elements",
          },
          {
            title: "Form Layout",
            url: "/admin/forms/form-layout",
          },
        ],
      },
      {
        title: "Tables",
        url: "/admin/tables",
        icon: Icons.Table,
        items: [
          {
            title: "Tables",
            url: "/admin/tables",
          },
        ],
      },
      {
        title: "Pages",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Settings",
            url: "/admin//pages/settings",
          },
        ],
      },
    ],
  },
  {
    label: "OTHERS",
    items: [
      {
        title: "Charts",
        icon: Icons.PieChart,
        items: [
          {
            title: "Basic Chart",
            url: "/admin/charts/basic-chart",
          },
        ],
      },
      {
        title: "UI Elements",
        icon: Icons.FourCircle,
        items: [
          {
            title: "Alerts",
            url: "/admin/ui-elements/alerts",
          },
          {
            title: "Buttons",
            url: "/admin/ui-elements/buttons",
          },
        ],
      },

    ],
  },
];
