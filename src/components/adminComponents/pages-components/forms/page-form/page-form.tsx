"use client";

import React, { useEffect } from "react";
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
import dynamic from "next/dynamic";
import { generateSlug } from "@/lib/utils";
import { PageItem, PagePayload } from "@/types/page";
import { PageTemplate } from "@/types/page-template";

const TextEditor = dynamic(() => import("../../text-editor/text-editor"), {
  ssr: false,
});

const PageForm = () => {
  const [form] = Form.useForm();
  const onFinish = async (values: PagePayload) => {};

  return (
    <div className="h-full dark:bg-[#020D1A]">
      <Form
        form={form}
        name="page-form"
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          status: true,
          isMenu: false,
          isMainMenu: false,
          isFooterMenu: false,
        }}
      >
        <Row gutter={16}>
          {/* TITLE */}
          <Col xs={24}>
            <Form.Item
              label={<span className="uppercase dark:text-white">title</span>}
              name="title"
              rules={[{ required: true, message: "Title is required" }]}
              className="dark:!text-white"
            >
              <Input
                onChange={(e) => {
                  const value = e.target.value;
                  form.setFieldsValue({
                    slug: generateSlug(value),
                  });
                }}
                className="bg-transparent"
              />
            </Form.Item>
          </Col>

          {/* IMAGE */}
          <Col xs={24} md={8}>
            <Form.Item
              label={<span className="uppercase dark:text-white">image</span>}
              name="image"
              valuePropName="fileList"
              rules={[
                {
                  required: true,
                  message: "Image is required",
                },
              ]}
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            >
              <Upload
                beforeUpload={() => false}
                listType="picture"
                accept=".jpg,.jpeg,.png,.webp"
                maxCount={1}
                className="!bg-transparent"
              >
                <Button
                  className="bg-transparent dark:text-white"
                  icon={<UploadOutlined />}
                >
                  Click to Upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>

          {/* COVER IMAGE */}
          <Col xs={24} md={8}>
            <Form.Item
              label={
                <span className="uppercase dark:text-white">cover image</span>
              }
              rules={[
                {
                  required: true,
                  message: "Image is required",
                },
              ]}
              name="cover_image"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
            >
              <Upload
                beforeUpload={() => false}
                listType="picture"
                accept=".jpg,.jpeg,.png,.webp"
                maxCount={1}
                className="!bg-transparent"
              >
                <Button
                  className="bg-transparent dark:text-white"
                  icon={<UploadOutlined />}
                >
                  Click to Upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>

          {/* ORDER NO */}
          <Col xs={24} md={8}>
            <Form.Item
              label={
                <span className="uppercase dark:text-white">order no.</span>
              }
              name="order"
            >
              <Input
                type="number"
                className="!bg-transparent dark:placeholder:text-white"
                min={1}
              />
            </Form.Item>
          </Col>

          {/* TEMPLATE */}
          <Col xs={24} md={12}>
            <Form.Item
              label={
                <span className="uppercase dark:text-white">template</span>
              }
              name="page_id"
              rules={[
                {
                  required: true,
                  message: "Template is required",
                },
              ]}
            >
              <Select
                placeholder="Select a template"
                allowClear
                className="!bg-transparent"
              >
                {Object.values(PageTemplate).map((template) => (
                  <Select.Option key={template} value={template}>
                    {template}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* SHORT TITLE */}
          <Col xs={24} md={12}>
            <Form.Item
              label={
                <span className="uppercase dark:text-white">short title</span>
              }
              name="shortTitle"
            >
              <Input className="!bg-transparent" />
            </Form.Item>
          </Col>

          {/* SHORT DESCRIPTION */}
          <Col span={24}>
            <Form.Item
              label={
                <span className="uppercase dark:text-white">
                  short description
                </span>
              }
              name="shortDescription"
            >
              <Input className="!bg-transparent" />
            </Form.Item>
          </Col>

          {/* DESCRIPTION */}
          <Col span={24}>
            <Form.Item
              label={
                <span className="uppercase dark:text-white">description</span>
              }
              name="description"
            >
              <TextEditor />
            </Form.Item>
          </Col>

          {/* CHECKBOXES */}
          <Col xs={12} md={6} lg={4}>
            <Form.Item
              label={<span className="dark:text-white">Status</span>}
              name="status"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>

          <Col xs={12} md={6} lg={4}>
            <Form.Item
              label={<span className="dark:text-white">Is Menu</span>}
              name="isMenu"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>

          <Col xs={12} md={6} lg={4}>
            <Form.Item
              label={<span className="dark:text-white">Is Main Menu</span>}
              name="isMainMenu"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>

          <Col xs={12} md={6} lg={4}>
            <Form.Item
              label={<span className="dark:text-white">Is Footer Menu</span>}
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

export default PageForm;
