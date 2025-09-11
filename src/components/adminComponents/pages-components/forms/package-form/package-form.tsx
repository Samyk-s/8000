"use client";

import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Upload,
  Select,
  Checkbox,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CreatePackageTransfer from "../../drag-drop/drag-drop";
import TextEditor from "../../text-editor/text-editor";
import { Grade, Season } from "@/types/enum/enum";

const { Option } = Select;

const PackageForm: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values: any) => {
    console.log("Form Values:", values);
    message.success("Form submitted successfully!");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    message.error("Please fill all required fields.");
  };

  const beforeUpload = (file: any) => {
    const isValidType =
      file.type === "image/jpeg" ||
      file.type === "image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/webp";

    if (!isValidType) {
      message.error("You can only upload JPG, JPEG, PNG, or WEBP files!");
    }

    return isValidType ? true : Upload.LIST_IGNORE;
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
          {/* Title */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          {/* Country */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Country"
              name="country"
              rules={[{ required: true, message: "Country is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          {/* Image */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Image"
              name="image"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              rules={[{ required: true, message: "Image is required" }]}
            >
              <Upload
                beforeUpload={beforeUpload}
                listType="picture"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Col>

          {/* Cover Image */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Cover Image"
              name="cover_image"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              rules={[{ required: true, message: "Cover image is required" }]}
            >
              <Upload
                beforeUpload={beforeUpload}
                listType="picture"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Col>

          {/* Route Map */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Route Map"
              name="route_map"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              rules={[{ required: true, message: "Route map is required" }]}
            >
              <Upload
                beforeUpload={beforeUpload}
                listType="picture"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Col>

          {/* Altitude */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Altitude"
              name="altitude"
              rules={[{ required: true, message: "Altitude is required" }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>

          {/* Grade */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Grade"
              name="grade"
              rules={[{ required: true, message: "Grade is required" }]}
            >
              <Select placeholder="Select Grade">
                {Object.values(Grade).map((grade) => (
                  <Select.Option key={grade} value={grade}>
                    {grade}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Group Size */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Group Size"
              name="groupSize"
              rules={[{ required: true, message: "Group size is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          {/* Package Days */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Package Days"
              name="packageDays"
              rules={[{ required: true, message: "Package days are required" }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>

          {/* Best Season */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Best Season"
              name="season"
              rules={[{ required: true, message: "Season is required" }]}
            >
              <Select placeholder="Select Season">
                {Object.values(Season).map((season) => (
                  <Select.Option key={season} value={season}>
                    {season}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Price */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Price"
              name="price"
              rules={[{ required: true, message: "Price is required" }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>

          {/* Parent Pages / Activities */}
          <Col span={24}>
            <Form.Item
              label="Activity/Destination/Pages"
              name="parentPageIds"
              rules={[{ required: true, message: "Select at least one page" }]}
            >
              <CreatePackageTransfer />
            </Form.Item>
          </Col>

          {/* Description */}
          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Description is required" }]}
            >
              <TextEditor />
            </Form.Item>
          </Col>

          {/* Includes */}
          <Col xs={24} lg={12}>
            <Form.Item
              label="Includes"
              name="includes"
              rules={[{ required: true, message: "Includes is required" }]}
            >
              <TextEditor />
            </Form.Item>
          </Col>
          {/* Excludes */}
          <Col xs={24} lg={12}>
            <Form.Item
              label="Excludes"
              name="excludes"
              rules={[{ required: true, message: "Excludes is required" }]}
            >
              <TextEditor />
            </Form.Item>
          </Col>

          {/* Trip Notes */}
          <Col span={24}>
            <Form.Item
              label="Trip Notes"
              name="tripNotes"
              rules={[{ required: true, message: "Trip notes are required" }]}
            >
              <TextEditor />
            </Form.Item>
          </Col>

          {/* Order */}
          <Col xs={12} lg={8}>
            <Form.Item
              label="Order No."
              name="order"
              rules={[{ required: true, message: "Order number is required" }]}
            >
              <Input type="number" min={1} />
            </Form.Item>
          </Col>

          {/* Status */}
          <Col xs={12} lg={8}>
            <Form.Item
              label="Status"
              name="status"
              valuePropName="checked"
              rules={[{ required: true }]}
            >
              <Checkbox />
            </Form.Item>
          </Col>

          {/* Is Upcoming / Booking */}
          <Col xs={12} lg={8}>
            <Form.Item
              label="Booking Open"
              name="isBooking"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>

          <Col xs={12} lg={8}>
            <Form.Item
              label="Is Upcoming"
              name="isUpcoming"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>
        </Row>
        {/* Submit Button */}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-fit bg-black text-white hover:!bg-black hover:!text-white"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PackageForm;
