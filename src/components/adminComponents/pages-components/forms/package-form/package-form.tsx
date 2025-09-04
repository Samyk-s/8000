"use client";

import React from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Upload,
  Select,
  Typography,
  Space,
  Checkbox,
  Card,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CreatePackageTransfer from "../../drag-drop/drag-drop";
import TextEditor from "../../text-editor/text-editor";

const { Option } = Select;

const PackageForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div>
      <Form
        name="create-package"
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={[16, 10]}>
          <Col span={12}>
            <Form.Item
              label="TITLE"
              name="title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Slug"
              name="slug"
              rules={[{ required: true, message: "Slug is required" }]}
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
              rules={[{ required: true, message: "Image is required" }]}
            >
              <Upload
                beforeUpload={() => false}
                listType="picture"
                accept=".jpg,.jpeg,.png,.webp"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="COVER IMAGE"
              name="cover_image"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              rules={[{ required: true, message: "Cover image is required" }]}
            >
              <Upload
                beforeUpload={() => false}
                listType="picture"
                accept=".jpg,.jpeg,.png,.webp"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="ROUTE MAP"
              name="route_map"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              rules={[{ required: true, message: "Route is required" }]}
            >
              <Upload
                beforeUpload={() => false}
                listType="picture"
                accept=".jpg,.jpeg,.png,.webp"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="COUNTRY"
              name="country"
              rules={[{ required: true, message: "Country is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="ALTITUDE"
              name="altitude"
              rules={[{ required: true, message: "Altitude is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="GRADE"
              name="grade"
              rules={[{ required: true, message: "Grade is required" }]}
            >
              <Select placeholder="Select Grade">
                <Option value="easy">Easy</Option>
                <Option value="moderate">Moderate</Option>
                <Option value="hard">Hard</Option>
                <Option value="very hard">Very Hard</Option>
              </Select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="GROUP SIZE"
              name="groupSize"
              rules={[{ required: true, message: "Group size is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="PACKAGES DAYS"
              name="packageDays"
              rules={[{ required: true, message: "Package days are required" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="BEST SEASON"
              name="season"
              rules={[{ required: true, message: "Best seasons are required" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Price is required" }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Activity/Destination/Pages"
              name="page_id"
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
          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Description is required",
                },
              ]}
              className="uppercase"
            >
              <TextEditor />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item
              label="Includes"
              name="includes"
              rules={[
                {
                  required: true,
                  message: "Includes is required",
                },
              ]}
              className="uppercase"
            >
              <TextEditor />
            </Form.Item>
          </Col>
          <Col xs={24} lg={12}>
            <Form.Item
              label="Excludes"
              name="excludes"
              rules={[
                {
                  required: true,
                  message: "Excludes is required",
                },
              ]}
              className="uppercase"
            >
              <TextEditor />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Space direction="vertical" className="w-full">
              <Typography.Title level={4} className="font-semibold">
                Gear Infromation
              </Typography.Title>
              <Form.Item
                label="Gear List"
                layout="vertical"
                name="gear-list"
                rules={[{ required: false }]}
                className="uppercase"
              >
                <TextEditor />
              </Form.Item>
            </Space>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Order No."
              name="order"
              layout="vertical"
              rules={[
                {
                  required: true,
                  message: "Order no. is required",
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="Status"
              name="status"
              layout="vertical"
              valuePropName="checked"
            >
              <Checkbox type="checkbox" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="Is Featured"
              name="isFeatured"
              layout="vertical"
              valuePropName="checked"
            >
              <Checkbox type="checkbox" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="Booking Open"
              name="booking-open"
              layout="vertical"
              valuePropName="checked"
            >
              <Checkbox type="checkbox" />
            </Form.Item>
          </Col>
          <Col span={4}>
            <Form.Item
              label="is popular"
              name="isPopular"
              layout="vertical"
              valuePropName="checked"
            >
              <Checkbox type="checkbox" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item>
              <Button
                className="hover: bg-black text-white hover:bg-black"
                htmlType="submit"
              >
                {true ? "LOADING..." : "SAVE"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PackageForm;
