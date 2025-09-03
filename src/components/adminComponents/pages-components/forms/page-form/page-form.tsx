"use client";
import React, { Suspense, useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Upload,
  Select,
  Checkbox,
  Card,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import { generateSlug } from "@/lib/utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux-store/store/store";
import { fetchPages } from "@/redux-store/slices/pageSlice";
import { PageItem } from "@/types/page";

const TextEditor = dynamic(() => import("../../text-editor/text-editor"));
const { Option } = Select;

const PageForm = ({ page }: { page: PageItem }) => {
  const [form] = Form.useForm();
  const { items } = useSelector((state: RootState) => state.pages);
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  useEffect(() => {
    dispatch(fetchPages({ page: 1, limit: 10 }));
  }, [dispatch]);

  return (
    <Card className="h-full p-4">
      <Form
        form={form}
        name="create-package"
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={16}>
          {/* TITLE */}
          <Col xs={24} md={12}>
            <Form.Item
              label="TITLE"
              name="title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input
                onChange={(e) => {
                  const value = e.target.value;
                  form.setFieldsValue({
                    title: value,
                    slug: generateSlug(value),
                  });
                }}
              />
            </Form.Item>
          </Col>

          {/* SLUG */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Slug"
              name="slug"
              rules={[{ required: true, message: "Slug is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          {/* IMAGE */}
          <Col xs={24} md={8}>
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

          {/* COVER IMAGE */}
          <Col xs={24} md={8}>
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

          {/* ORDER NO */}
          <Col xs={24} md={8}>
            <Form.Item
              label="ORDER NO."
              name="order"
              rules={[{ required: true, message: "Order is required" }]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>

          {/* TEMPLATE */}
          <Col xs={24} md={12}>
            <Form.Item
              label="TEMPLATE"
              name="grade"
              rules={[{ required: true, message: "Grade is required" }]}
            >
              <Select placeholder="Select a template">
                {items?.map((item) => (
                  <Option value={item?.id} key={item?.id}>
                    {item?.title}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* SHORT TITLE */}
          <Col xs={24} md={12}>
            <Form.Item
              label="SHORT TITLE"
              name="shortTitle"
              rules={[{ required: true, message: "Short title is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          {/* SHORT DESCRIPTION */}
          <Col span={24}>
            <Form.Item
              label="SHORT DESCRIPTION"
              name="shortDescription"
              rules={[
                { required: true, message: "Short description is required" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>

          {/* DESCRIPTION */}
          <Col span={24}>
            <Form.Item
              label="DESCRIPTION"
              name="description"
              rules={[{ required: true, message: "Description is required" }]}
            >
              <Suspense fallback={null}>
                <TextEditor />
              </Suspense>
            </Form.Item>
          </Col>

          {/* CHECKBOXES */}
          <Col xs={12} md={6} lg={4}>
            <Form.Item label="Status" name="status" valuePropName="checked">
              <Checkbox />
            </Form.Item>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Form.Item label="Is Menu" name="isMenu" valuePropName="checked">
              <Checkbox />
            </Form.Item>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Form.Item
              label="Is Main Menu"
              name="isMainMenu"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Form.Item
              label="Is Footer Menu"
              name="isFooterMenu"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>

          {/* SUBMIT */}
          <Col span={24}>
            <Form.Item>
              <Button
                className="text-white hover:bg-black"
                htmlType="submit"
                type="primary"
              >
                SAVE
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Card>
  );
};

export default PageForm;
