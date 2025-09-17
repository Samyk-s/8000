"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { Card } from "antd";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import TestimonialForm from "@/components/adminComponents/pages-components/forms/testimonial-form/testimonial-form";
import Loader from "@/components/adminComponents/pages-components/loader/loader";
import { TestimonialItem } from "@/types/testimonials";
import { useTestimonials } from "@/hooks/testimonial/useTestimonial";

const EditTestimonialPage = () => {
  const { id } = useParams();
  const { testimonial, loading, getTestimonial } = useTestimonials();

  useEffect(() => {
    if (id) getTestimonial(Number(id));
  }, [id]);

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col gap-3">
      <Breadcrumbs
        items={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Testimonials", href: "/admin/testimonials" },
          { label: "Edit Testimonial", href: `/admin/testimonials/${id}` },
        ]}
        separator="/"
      />
      <Card>
        <TestimonialForm testimonial={testimonial as TestimonialItem} />
      </Card>
    </div>
  );
};

export default EditTestimonialPage;
