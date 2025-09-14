import * as Icons from "../icons";
import { ComponentType } from "react";

// Type for a single navigation item
export interface NavItem {
  title: string;
  url?: string; // optional because some items might not have direct url
  icon: ComponentType<any>;
  items: NavItem[]; // subitems for nested menus
}

// Type for a section containing multiple items
export interface NavSection {
  label: string;
  items: NavItem[];
}

// Fully typed NAV_DATA
export const NAV_DATA: NavSection[] = [
  {
    label: " ",
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
    label: "Inquiry Mangement",
    items: [
      {
        title: "Package Bookings",
        url: "/admin/bookings",
        icon: Icons.BookingIcon,
        items: [],
      },
      {
        title: "Package Inquiries",
        url: "/admin/inquiries",
        icon: Icons.InquiryIcon,
        items: [],
      },
      {
        title: "Trip Plan Request",
        url: "/admin/tri-plans",
        icon: Icons.TripPlanIcon,
        items: [],
      },
      {
        title: "Testimonial",
        url: "/admin/testimonials",
        icon: Icons.TestimonialIcon,
        items: [],
      },
      {
        title: "Contact Us",
        url: "/admin/contact-us",
        icon: Icons.ContactIcon,
        items: [],
      },
    ],
  },
  {
    label: "Package Management",
    items: [
      {
        title: "Destinations",
        url: "/admin/destinations",
        icon: Icons.DestinationIcon,
        items: [],
      },
      {
        title: "Activities",
        url: "/admin/activities",
        icon: Icons.ActivityIcon,
        items: [],
      },
      {
        title: "Packages",
        url: "/admin/packages",
        icon: Icons.PackageIcon,
        items: [],
      },
      {
        title: "Summitter",
        url: "/admin/summitters",
        icon: Icons.GearIcon,
        items: [],
      },
      {
        title: "Reviews",
        url: "/admin/reviews",
        icon: Icons.ReviewIcon,
        items: [],
      },
    ],
  },
  {
    label: "Site Management",
    items: [
      {
        title: "Slider",
        url: "/admin/sliders",
        icon: Icons.GalleryIcon,
        items: [],
      },
      {
        title: "Pages",
        url: "/admin/pages",
        icon: Icons.PageIcon,
        items: [],
      },
      {
        title: "Blogs",
        url: "/admin/blogs",
        icon: Icons.BlogsIcon,
        items: [],
      },
      {
        title: "Team",
        url: "/admin/teams",
        icon: Icons.TeamIcon,
        items: [],
      },
      {
        title: "Affiliation",
        url: "/admin/affiliations",
        icon: Icons.AffiliationIcon,
        items: [],
      },
      {
        title: "Company Fact",
        url: "/admin/company-facts",
        icon: Icons.FactIcon,
        items: [],
      },
      {
        title: "Why Choose Us",
        url: "/admin/why-choose-us",
        icon: Icons.WhyChooseIcon,
        items: [],
      },
      {
        title: "Features",
        url: "/admin/features",
        icon: Icons.FeatureIcon,
        items: [],
      },
      {
        title: "FAQs",
        url: "/admin/faqs",
        icon: Icons.FaqsIcon,
        items: [],
      },
      {
        title: "News Letter",
        url: "/admin/news-letter",
        icon: Icons.NewsLetterIcon,
        items: [],
      },
    ],
  },
  {
    label: "Site Settings",
    items: [
      {
        title: "Site Setting",
        url: "/admin/site-setting",
        icon: Icons.GearIcon,
        items: [],
      },
    ],
  },
];
