import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import BookingTable from "@/components/adminComponents/pages-components/tables/booking-table";
import React from "react";

const BookingPage = () => {
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          {
            label: "Dashboard",
            href: "/admin/dashboard",
          },
          {
            label: "Bookings",
            href: "/admin/bookins",
          },
        ]}
        separator="/"
      />
      <BookingTable />
    </div>
  );
};

export default BookingPage;
