"use client";
import { useEffect, useState } from "react";
import { Form, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import {
  createTestimonial,
  updateTestimonial,
} from "@/redux-store/slices/testimonialSlice";
import resourceApi from "@/lib/api/resourceApi";
import { MediaFile } from "@/types/utils-type";
import { TestimonialItem, TestimonialPayload } from "@/types/testimonials";
import { useRouter } from "next/navigation";

export const useTestimonialForm = (testimonial?: TestimonialItem) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading } = useSelector((state: RootState) => state.testimonials);

  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState<MediaFile | null>(
    testimonial?.image || null
  );

  useEffect(() => {
    if (testimonial) {
      form.setFieldsValue({
        name: testimonial.name,
        country: testimonial.country,
        order: testimonial.order,
        description: testimonial.description,
        image: testimonial.image,
      });
      if (testimonial?.image) setImage(testimonial.image);
    }
  }, [testimonial, form]);

  const handleFileUpload = async (
    rawFile: File,
    setter: (file: MediaFile) => void
  ) => {
    const formData = new FormData();
    formData.append("file", rawFile);

    try {
      setUploading(true);
      const res = await resourceApi.createResource(formData);
      setUploading(false);
      if (res) {
        setter(res);
        message.success("File uploaded successfully!");
      } else {
        message.error("File upload failed");
      }
    } catch {
      setUploading(false);
      message.error("File upload failed");
    }
    return false; // prevent auto upload
  };

  const onFinish = async (values: TestimonialPayload) => {
    if (!testimonial && !image) {
      message.error("Please upload an image before submitting");
      return;
    }

    const payload: TestimonialPayload = {
      ...values,
      order: Number(values.order) || 0,
    };

    // Include image only if it's new or changed
    if (image && (!testimonial || testimonial.image?.uid !== image.uid)) {
      payload.image = image;
    } else {
      // Remove image field if not changed

      delete payload?.image;
    }

    try {
      if (testimonial?.id) {
        await dispatch(updateTestimonial({ id: testimonial.id, values: payload })).unwrap();
      } else {
        await dispatch(createTestimonial({ values: payload })).unwrap();
      }
      router.push("/admin/testimonials");
    } catch {
      message.error("Failed to save testimonial");
    }
  };


  return {
    form,
    image,
    setImage,
    uploading,
    loading,
    handleFileUpload,
    onFinish,
  };
};
