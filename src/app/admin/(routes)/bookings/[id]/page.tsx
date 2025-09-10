"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import BookingForm from "@/components/adminComponents/pages-components/forms/booking-form/booking-from";
import { Card } from "antd";
import { useParams } from "next/navigation";
import React from "react";

const BookingPage = () => {
  const { id } = useParams();
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          {
            label: "Dashboard",
            href: "/admin/dashboard",
          },
          {
            label: "Edit Bookings",
            href: `/admin/bookins/${id}`,
          },
        ]}
        separator="/"
      />
      <Card>
        <BookingForm id={Number(id)} />
      </Card>
    </div>
  );
};

export default BookingPage;
