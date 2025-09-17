"use client";
import React from "react";
import { Form, Input, Button, Row, Col, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import Loader from "../../loader/loader";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-store/store/store";
import { useReviewForm } from "@/hooks/review/useReviewForm";

const ReviewForm = () => {
  const { form, fileList, uploading, setFileList, handleFileUpload, onFinish } =
    useReviewForm();
  const { loading } = useSelector((state: RootState) => state.itineraries);

  if (loading) return <Loader />;

  return (
    <div className="h-full dark:bg-[#020D1A]">
      <Form
        form={form}
        name="review-form"
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label={
                <span className="uppercase dark:text-white">Full Name</span>
              }
              name="fullName"
              rules={[{ required: true, message: "Fullname is required" }]}
            >
              <Input className="bg-transparent" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label={<span className="uppercase dark:text-white">Email</span>}
              name="email"
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input type="email" className="bg-transparent" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label={<span className="uppercase dark:text-white">Country</span>}
              name="country"
              rules={[{ required: true, message: "Country is required" }]}
            >
              <Input className="bg-transparent" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label={
                <span className="uppercase dark:text-white">Short Title</span>
              }
              name="shortTitle"
              rules={[{ required: true, message: "Short Title is required" }]}
            >
              <Input className="bg-transparent" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: "Image is required" }]}
            >
              <Upload
                beforeUpload={(file) => {
                  handleFileUpload(file);
                  return false;
                }}
                listType="picture"
                accept=".jpg,.jpeg,.png,.webp"
                maxCount={1}
                fileList={fileList}
                onChange={({ fileList }) => setFileList(fileList)}
              >
                <Button icon={<UploadOutlined />} loading={uploading}>
                  Click to Upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label={<span className="uppercase dark:text-white">Rating</span>}
              name="rating"
              rules={[{ required: true, message: "Rating is required" }]}
            >
              <Input className="bg-transparent" type="number" min={1} max={5} />
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              label={<span className="uppercase dark:text-white">Review</span>}
              name="review"
              rules={[{ required: true, message: "Review is required" }]}
            >
              <TextArea rows={5} className="bg-transparent" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item>
              <Button
                htmlType="submit"
                type="default"
                className="!bg-black !text-white hover:!bg-black hover:!text-white dark:!bg-white dark:!text-black"
              >
                Save
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ReviewForm;
