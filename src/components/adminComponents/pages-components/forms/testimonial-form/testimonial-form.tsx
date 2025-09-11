"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import resourceApi from "@/lib/api/resourceApi";
import { MediaFile } from "@/types/utils-type";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { useRouter } from "next/navigation";
import Loader from "../../loader/loader";
import {
  createTestimonial,
  updateTestimonial,
} from "@/redux-store/slices/testimonialSlice";
import { TestimonialPayload, TestimonialItem } from "@/types/testimonials";

const TextEditor = dynamic(() => import("../../text-editor/text-editor"), {
  ssr: false,
});

interface TestimonialFormProps {
  testimonial?: TestimonialItem;
}

const TestimonialForm: React.FC<TestimonialFormProps> = ({ testimonial }) => {
  const [form] = Form.useForm();
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState<MediaFile | null>(
    testimonial?.image || null,
  );

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading } = useSelector((state: RootState) => state.testimonials);

  // Pre-fill form on edit
  useEffect(() => {
    if (testimonial) {
      form.setFieldsValue({
        name: testimonial.name,
        country: testimonial.country,
        order: testimonial.order,
        description: testimonial.description,
        image: testimonial.image,
      });
      setImage(testimonial.image || null);
    }
  }, [testimonial, form]);

  // Upload handler
  const handleFileUpload = async (
    rawFile: File,
    setter: (file: MediaFile) => void,
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
    } catch (error) {
      setUploading(false);
      message.error("File upload failed");
    }
    return false; // prevent auto upload
  };

  // Submit handler
  const onFinish = (values: TestimonialPayload) => {
    if (!image) {
      message.error("Please upload an image");
      return;
    }

    const payload: TestimonialPayload = {
      ...values,
      order: Number(values.order),
      image,
    };

    if (testimonial?.id) {
      // Update
      dispatch(updateTestimonial({ id: testimonial.id, values: payload })).then(
        () => {
          router.push("/admin/testimonials");
        },
      );
    } else {
      // Create
      dispatch(createTestimonial({ values: payload })).then(() => {
        router.push("/admin/testimonials");
      });
    }
  };

  if (loading) return <Loader />;

  return (
    <Form
      form={form}
      name="testimonial-form"
      autoComplete="off"
      layout="vertical"
      onFinish={onFinish}
    >
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Fullname is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Country"
            name="country"
            rules={[{ required: true, message: "Country is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Image"
            name="image"
            rules={[{ required: true, message: "Image is required" }]}
          >
            <Upload
              beforeUpload={(file) => handleFileUpload(file, setImage)}
              listType="picture"
              accept=".jpg,.jpeg,.png,.webp"
              maxCount={1}
              fileList={
                image
                  ? [
                      {
                        uid: image.uid,
                        name: image.name,
                        url: image.url,
                      },
                    ]
                  : []
              }
              onRemove={() => setImage(null)}
            >
              <Button icon={<UploadOutlined />} loading={uploading}>
                Upload Image
              </Button>
            </Upload>
          </Form.Item>
        </Col>

        <Col xs={24} md={12}>
          <Form.Item
            label="Order"
            name="order"
            rules={[{ required: true, message: "Order is required" }]}
          >
            <Input type="number" min={1} />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: "Description is required" }]}
          >
            <TextEditor />
          </Form.Item>
        </Col>

        <Col span={24}>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="bg-black text-white hover:!bg-black hover:!text-white"
            >
              Save
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default TestimonialForm;
