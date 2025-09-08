import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import TestimonialForm from "@/components/adminComponents/pages-components/forms/testimonial-form/testimonial-form";
import { Card } from "antd";
import React from "react";

const CreateTestimonialPage = () => {
  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          {
            label: "Dashboard",
            href: "/admin/dashboard",
          },
          {
            label: "Testimonials",
            href: "/admin/testimonials",
          },
          {
            label: "Create Testimonial",
            href: "/admin/testimonials/create",
          },
        ]}
        separator="/"
      />
      <Card>
        <TestimonialForm />
      </Card>
    </div>
  );
};

export default CreateTestimonialPage;
