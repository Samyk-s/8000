"use client";

import React from "react";
import { Form, Input, Button, Row, Col, Upload, Select, Checkbox } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import CreatePackageTransfer from "../../drag-drop/drag-drop";
import TextEditor from "../../text-editor/text-editor";
import { Grade, Season } from "@/types/enum/enum";
import { PackageItem } from "@/types/package";
import { usePackageForm } from "@/hooks/package/usePackageForm";

const { Option } = Select;

interface PackageFormProps {
  currentPackage?: PackageItem;
}

const PackageForm: React.FC<PackageFormProps> = ({ currentPackage }) => {
  const {
    form,
    imageList,
    coverImageList,
    routeList,
    uploadingImage,
    uploadingCover,
    uploadingRoute,
    setImageFile,
    setImageList,
    setCoverImageFile,
    setCoverImageList,
    setRouteFile,
    setRouteList,
    makeBeforeUpload,
    onFinish,
  } = usePackageForm(currentPackage);

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Row gutter={[16, 10]}>
        {/* Title & Country */}
        <Col xs={24} md={12}>
          <Form.Item
            label="Title"
            name="title"
            rules={[{ required: true, message: "Title is required" }]}
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

        {/* File Uploads */}
        <Col xs={24} md={8}>
          <Form.Item label="Image" required>
            <Upload
              beforeUpload={makeBeforeUpload("image")}
              listType="picture"
              maxCount={1}
              fileList={imageList}
              onRemove={() => {
                setImageFile(null);
                setImageList([]);
              }}
            >
              <Button icon={<UploadOutlined />} loading={uploadingImage}>
                {uploadingImage ? "Uploading..." : "Click to Upload"}
              </Button>
            </Upload>
          </Form.Item>
        </Col>

        <Col xs={24} md={8}>
          <Form.Item label="Cover Image" required>
            <Upload
              beforeUpload={makeBeforeUpload("cover")}
              listType="picture"
              maxCount={1}
              fileList={coverImageList}
              onRemove={() => {
                setCoverImageFile(null);
                setCoverImageList([]);
              }}
            >
              <Button icon={<UploadOutlined />} loading={uploadingCover}>
                {uploadingCover ? "Uploading..." : "Click to Upload"}
              </Button>
            </Upload>
          </Form.Item>
        </Col>

        <Col xs={24} md={8}>
          <Form.Item label="Route Map" required>
            <Upload
              beforeUpload={makeBeforeUpload("route")}
              listType="picture"
              maxCount={1}
              fileList={routeList}
              onRemove={() => {
                setRouteFile(null);
                setRouteList([]);
              }}
            >
              <Button icon={<UploadOutlined />} loading={uploadingRoute}>
                {uploadingRoute ? "Uploading..." : "Click to Upload"}
              </Button>
            </Upload>
          </Form.Item>
        </Col>

        {/* Numeric and Select Fields */}
        <Col xs={24} md={8}>
          <Form.Item
            label="Altitude"
            name="altitude"
            rules={[{ required: true, message: "Altitude is required" }]}
          >
            <Input type="number" min={0} />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Grade"
            name="grade"
            rules={[{ required: true, message: "Grade is required" }]}
          >
            <Select placeholder="Select Grade">
              {Object.values(Grade).map((grade) => (
                <Option key={grade} value={grade}>
                  {grade}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Group Size"
            name="groupSize"
            rules={[{ required: true, message: "Group is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Package Days"
            name="packageDays"
            rules={[{ required: true, message: "Package day is required" }]}
          >
            <Input type="number" min={1} />
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Best Season"
            name="season"
            rules={[{ required: true, message: "Season is required" }]}
          >
            <Select placeholder="Select Season">
              {Object.values(Season).map((season) => (
                <Option key={season} value={season}>
                  {season}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} md={8}>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Price is required" }]}
          >
            <Input type="number" min={0} />
          </Form.Item>
        </Col>

        {/* Parent Pages */}
        <Col span={24}>
          <Form.Item
            label="Activity/Destination/Pages"
            name="parentPageIds"
            rules={[{ required: true, message: "Parent page is required" }]}
          >
            <CreatePackageTransfer />
          </Form.Item>
        </Col>

        {/* Text Editors */}
        <Col span={24}>
          <Form.Item label="Description" name="description">
            <TextEditor />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item
            label="Includes"
            name="includes"
            rules={[{ required: true, message: "Includes is required" }]}
          >
            <TextEditor />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item
            label="Excludes"
            name="excludes"
            rules={[{ required: true, message: "Excludes is required" }]}
          >
            <TextEditor />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            label="Trip Notes"
            name="tripNotes"
            rules={[{ required: true, message: "Trip note is required" }]}
          >
            <TextEditor />
          </Form.Item>
        </Col>

        {/* Order & Flags */}
        <Col xs={12} lg={8}>
          <Form.Item
            label="Order No."
            name="order"
            rules={[{ required: true, message: "Order is required" }]}
          >
            <Input type="number" min={1} />
          </Form.Item>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Form.Item label="Status" name="status" valuePropName="checked">
            <Checkbox />
          </Form.Item>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Form.Item
            label="Booking Open"
            name="isBooking"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
        </Col>
        <Col xs={12} md={6} lg={4}>
          <Form.Item
            label="Is Upcoming"
            name="isUpcoming"
            valuePropName="checked"
          >
            <Checkbox />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="bg-black text-white hover:!bg-black hover:!text-white"
        >
          {currentPackage ? "Update Package" : "Create Package"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PackageForm;
