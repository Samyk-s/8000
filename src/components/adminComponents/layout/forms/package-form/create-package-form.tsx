"use client";

import React from "react";
import { Form, Input, Button, Space, Row, Col, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CreatePackageTransfer from "../../drag-drop/drag-drop";

const CreatePackageForm: React.FC = () => {
  const onFinish = (values: { title: string }) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="h-full">
      <Form name="create-package" autoComplete="off" className="h-full">
        <Row gutter={[16, 16]} className="min-500px">
          <Col span={12}>
            <Form.Item
              label="Title"
              layout="vertical"
              name="title"
              className="uppercase"
              rules={[{ required: true, message: "Slug is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Slug"
              layout="vertical"
              name="slug"
              className="uppercase"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Image"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              layout="vertical"
              rules={[{ required: true, message: "Image is required" }]}
              className="w-full uppercase"
            >
              <Upload
                beforeUpload={() => false}
                listType="picture"
                accept=".jpg,.jpeg,.png,.webp"
                className="w-full"
              >
                <Button className="w-full" icon={<UploadOutlined />}>
                  Click to Upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Cover Image"
              name="cover-image"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              layout="vertical"
              rules={[{ required: true, message: "Cover is required" }]}
              className="w-full uppercase"
            >
              <Upload
                beforeUpload={() => false}
                accept=".jpg,.jpeg,.png,.webp"
                listType="picture"
              >
                <Button className="w-full" icon={<UploadOutlined />}>
                  Click to Upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Route"
              name="route"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              layout="vertical"
              rules={[{ required: true, message: "Route is required" }]}
              className="w-full uppercase"
            >
              <Upload
                beforeUpload={() => false}
                accept=".jpg,.jpeg,.png,.webp"
                listType="picture"
              >
                <Button className="w-full" icon={<UploadOutlined />}>
                  Click to Upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Country"
              layout="vertical"
              name="country"
              className="uppercase"
              rules={[{ required: true, message: "Country is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Altitude"
              layout="vertical"
              name="altitude"
              className="uppercase"
              rules={[{ required: true, message: "Altitude is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Grade"
              layout="vertical"
              name="grade"
              className="uppercase"
              rules={[{ required: true, message: "Grade is required" }]}
            >
              <Select
                options={[
                  { value: "", label: <span>Select Garade</span> },
                  { value: "easy", label: <span>Easy</span> },
                  { value: "moderate", label: <span>Moderate</span> },
                  { value: "hard", label: <span>Hard</span> },
                  { value: "very hard", label: <span>Very Hard</span> },
                ]}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Group size"
              layout="vertical"
              name="group-size"
              className="uppercase"
              rules={[{ required: true, message: "Group size is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Package Days"
              layout="vertical"
              name="packge-days"
              className="uppercase"
              rules={[{ required: true, message: "Package day is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Best seasons"
              layout="vertical"
              name="best-seacsons"
              className="uppercase"
              rules={[{ required: true, message: "Best seasons is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Price"
              layout="vertical"
              name="price"
              className="uppercase"
              rules={[{ required: true, message: "Price season is required" }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Activity/Destination/Pages"
              className="w-full"
              name="page"
              layout="vertical"
              rules={[
                {
                  required: true,
                  message: "Activity/Destination/Pages required",
                },
              ]}
            >
              <CreatePackageTransfer />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreatePackageForm;
