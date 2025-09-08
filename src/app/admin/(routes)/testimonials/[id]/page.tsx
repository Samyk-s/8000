"use client";
import React, { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { Card } from "antd";
import Breadcrumbs from "@/components/adminComponents/beadcrumb/bedcrumb";
import TestimonialForm from "@/components/adminComponents/pages-components/forms/testimonial-form/testimonial-form";
import { getTestimonialById } from "@/redux-store/slices/testimonialSlice";
import Loader from "@/components/adminComponents/pages-components/loader/loader";
import { TestimonialItem } from "@/types/testimonials";

const EditTestimonialPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const { testimonial, loading } = useSelector(
    (state: RootState) => state.testimonials,
  );

  useEffect(() => {
    if (id) dispatch(getTestimonialById(Number(id)));
  }, [id, dispatch]);

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
