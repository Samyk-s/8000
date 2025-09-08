"use client";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import TestimonialsTable from "@/components/adminComponents/pages-components/tables/testimonials-table";
import { useParams } from "next/navigation";
import React from "react";

const TestimonialsPage = () => {
  const { id } = useParams<{ id: string }>();
  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Testimonials", href: "/admin/testimonials" },
        ]}
        separator="/"
      />
      <TestimonialsTable />
    </>
  );
};

export default TestimonialsPage;
