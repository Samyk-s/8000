"use client";
import React from "react";
import { Form, Input, Button, Row, Col, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import { TestimonialItem } from "@/types/testimonials";
import { useTestimonialForm } from "@/hooks/testimonial/useTestimonialForm";

const TextEditor = dynamic(() => import("../../text-editor/text-editor"), {
  ssr: false,
});

interface TestimonialFormProps {
  testimonial?: TestimonialItem;
}

const TestimonialForm: React.FC<TestimonialFormProps> = ({ testimonial }) => {
  const {
    form,
    image,
    setImage,
    uploading,
    loading,
    handleFileUpload,
    onFinish,
  } = useTestimonialForm(testimonial);

  if (loading) return null;

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
                  ? [{ uid: image.uid, name: image.name, url: image.url }]
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
