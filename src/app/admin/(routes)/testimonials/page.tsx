"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import TestimonialsTable from "@/components/adminComponents/pages-components/tables/testimonials-table";
import React from "react";

const TestimonialsPage = () => {
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Testimonials", href: "/admin/testimonials" },
        ]}
        separator="/"
      />
      <TestimonialsTable />
    </div>
  );
};

export default TestimonialsPage;
