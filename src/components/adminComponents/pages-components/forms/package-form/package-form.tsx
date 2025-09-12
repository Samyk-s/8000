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
import resourceApi from "@/lib/api/resourceApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux-store/store/store";
import { createPackage } from "@/redux-store/slices/packageSlice";

const { Option } = Select;

const PackageForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState<any>(null);
  const [coverFile, setCoverFile] = useState<any>(null);
  const [routeFile, setRouteFile] = useState<any>(null);
  const [parentPageIds, setParentPageIds] = useState<number[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const beforeUpload = (file: any) => {
    const isValidType = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
    ].includes(file.type);
    if (!isValidType)
      message.error("Only JPG, JPEG, PNG, WEBP files are allowed!");
    return isValidType ? true : Upload.LIST_IGNORE;
  };

  const handleFileUpload = async (file: any, setFile: any) => {
    try {
      const formData = new FormData();
      formData.append("file", file.originFileObj);
      const res = await resourceApi.createResource(formData);
      setFile(res);
      message.success("File uploaded successfully!");
    } catch (err) {
      console.error(err);
      message.error("File upload failed!");
    }
  };

  const onFinish = (values: any) => {
    if (!imageFile || !coverFile || !routeFile) {
      message.error("All three images must be uploaded!");
      return;
    }

    if (parentPageIds.length === 0) {
      message.error("Please select at least one page!");
      return;
    }

    const payload = {
      title: values.title,
      image: imageFile,
      cover_image: coverFile,
      route_map: routeFile,
      altitude: Number(values.altitude),
      grade: values.grade,
      season: values.season,
      groupSize: values.groupSize,
      packageDays: Number(values.packageDays),
      price: Number(values.price),
      country: values.country,
      order: Number(values.order),
      description: values.description,
      includes: values.includes,
      excludes: values.excludes,
      tripNotes: values.tripNotes,
      parentPageIds, // selected page ids from drag-drop
      status: values.status ? 1 : 0,
      isUpcoming: values.isUpcoming ? 1 : 0,
      isBooking: values.isBooking ? 1 : 0,
    };

    dispatch(createPackage(payload));
  };

  return (
    <Form name="create-package" layout="vertical" onFinish={onFinish}>
      <Row gutter={[16, 10]}>
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

        {/* Image Upload */}
        <Col xs={24} md={8}>
          <Form.Item label="Image" rules={[{ required: true }]}>
            <Upload
              listType="picture"
              maxCount={1}
              beforeUpload={beforeUpload}
              onChange={(info) =>
                info.file.originFileObj &&
                handleFileUpload(info.file, setImageFile)
              }
            >
              <Button icon={<UploadOutlined />}>Upload Image</Button>
            </Upload>
          </Form.Item>
        </Col>

        {/* Cover Image Upload */}
        <Col xs={24} md={8}>
          <Form.Item label="Cover Image" rules={[{ required: true }]}>
            <Upload
              listType="picture"
              maxCount={1}
              beforeUpload={beforeUpload}
              onChange={(info) =>
                info.file.originFileObj &&
                handleFileUpload(info.file, setCoverFile)
              }
            >
              <Button icon={<UploadOutlined />}>Upload Cover Image</Button>
            </Upload>
          </Form.Item>
        </Col>

        {/* Route Map Upload */}
        <Col xs={24} md={8}>
          <Form.Item label="Route Map" rules={[{ required: true }]}>
            <Upload
              listType="picture"
              maxCount={1}
              beforeUpload={beforeUpload}
              onChange={(info) =>
                info.file.originFileObj &&
                handleFileUpload(info.file, setRouteFile)
              }
            >
              <Button icon={<UploadOutlined />}>Upload Route Map</Button>
            </Upload>
          </Form.Item>
        </Col>

        {/* Altitude */}
        <Col xs={24} md={8}>
          <Form.Item
            label="Altitude"
            name="altitude"
            rules={[{ required: true, message: "Altitude is required" }]}
          >
            <Input type="number" min={1} />
          </Form.Item>
        </Col>

        {/* Grade */}
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

        {/* Group Size */}
        <Col xs={24} md={8}>
          <Form.Item
            label="Group Size"
            name="groupSize"
            rules={[{ required: true, message: "Group size is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        {/* Package Days */}
        <Col xs={24} md={8}>
          <Form.Item
            label="Package Days"
            name="packageDays"
            rules={[{ required: true, message: "Pacage day is required" }]}
          >
            <Input type="number" min={1} />
          </Form.Item>
        </Col>

        {/* Season */}
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

        {/* Price */}
        <Col xs={24} md={8}>
          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Price is required" }]}
          >
            <Input type="number" min={0} />
          </Form.Item>
        </Col>

        {/* Parent Pages Drag-Drop */}
        <Col span={24}>
          <Form.Item label="Activity/Destination/Pages" required>
            <CreatePackageTransfer onChange={setParentPageIds} />
          </Form.Item>
        </Col>

        {/* Description, Includes, Excludes, Trip Notes */}
        <Col span={24}>
          <Form.Item label="Description" name="description">
            <TextEditor />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item label="Includes" name="includes">
            <TextEditor />
          </Form.Item>
        </Col>
        <Col xs={24} lg={12}>
          <Form.Item label="Excludes" name="excludes">
            <TextEditor />
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item label="Trip Notes" name="tripNotes">
            <TextEditor />
          </Form.Item>
        </Col>

        {/* Order */}
        <Col xs={12} lg={8}>
          <Form.Item
            label="Order No."
            name="order"
            rules={[{ required: true, message: "Order is required" }]}
          >
            <Input type="number" min={1} />
          </Form.Item>
        </Col>

        {/* Status, Booking, Upcoming */}
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
          loading={loading}
          className="bg-black text-white hover:!bg-black hover:!text-white"
        >
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default PackageForm;
