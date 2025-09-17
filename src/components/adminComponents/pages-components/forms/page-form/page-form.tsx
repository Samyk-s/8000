"use client";

import React from "react";
import { Form, Input, Button, Row, Col, Upload, Select, Checkbox } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import { PageItem } from "@/types/page";
import { PageTemplate, PageType } from "@/types/enum/enum";
import { usePageForm } from "@/hooks/page/usePageForm";

const TextEditor = dynamic(() => import("../../text-editor/text-editor"), {
  ssr: false,
});

interface PageFormProps {
  page?: PageItem | null;
}

const PageForm: React.FC<PageFormProps> = ({ page }) => {
  const {
    form,
    isClient,
    imageList,
    coverImageList,
    uploadingImage,
    uploadingCover,
    parentPages,
    setImageFile,
    setImageList,
    setCoverImageFile,
    setCoverImageList,
    makeBeforeUpload,
    onFinish,
  } = usePageForm(page);

  if (!isClient) return null;

  return (
    <div className="h-full dark:bg-[#020D1A]">
      <Form form={form} name="page-form" layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          {/* TITLE */}
          <Col xs={24}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          {/* SHORT TITLE */}
          <Col xs={24}>
            <Form.Item label="Short Title" name="shortTitle">
              <Input />
            </Form.Item>
          </Col>

          {/* IMAGE */}
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
                <Button
                  icon={<UploadOutlined />}
                  loading={uploadingImage}
                  disabled={uploadingImage}
                >
                  {uploadingImage ? "Uploading..." : "Click to Upload"}
                </Button>
              </Upload>
            </Form.Item>
          </Col>

          {/* COVER IMAGE */}
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
                <Button
                  icon={<UploadOutlined />}
                  loading={uploadingCover}
                  disabled={uploadingCover}
                >
                  {uploadingCover ? "Uploading..." : "Click to Upload"}
                </Button>
              </Upload>
            </Form.Item>
          </Col>

          {/* ORDER */}
          <Col xs={24} md={8}>
            <Form.Item
              label="Order"
              name="order"
              rules={[{ required: true, message: "Order is required" }]}
            >
              <Input type="number" min={0} />
            </Form.Item>
          </Col>

          {/* PAGE TYPE (create only) */}
          {!page && (
            <Col xs={24} md={12}>
              <Form.Item
                label="Page Type"
                name="type"
                rules={[{ required: true }]}
              >
                <Select allowClear placeholder="Select page type">
                  {Object.values(PageType).map((t) => (
                    <Select.Option key={t} value={t}>
                      {t}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          )}

          {/* PARENT PAGE */}
          <Col xs={24} md={12}>
            <Form.Item label="Parent Page" name="parentId">
              <Select allowClear placeholder="Select parent page">
                {parentPages?.map((p) => (
                  <Select.Option value={p.id} key={p.id}>
                    {p.title}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* TEMPLATE */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Template"
              name="page_template"
              rules={[{ required: true, message: "Template is required" }]}
            >
              <Select allowClear placeholder="Select template">
                {Object.values(PageTemplate).map((t) => (
                  <Select.Option key={t} value={t}>
                    {t}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* DESCRIPTION */}
          <Col xs={24}>
            <Form.Item label="Description" name="description">
              <TextEditor
                value={form.getFieldValue("description") || ""}
                onChange={(val) => form.setFieldsValue({ description: val })}
              />
            </Form.Item>
          </Col>

          {/* CHECKBOXES */}
          <Col xs={12} md={6} lg={4}>
            <Form.Item name="isMenu" label="Is Menu" valuePropName="checked">
              <Checkbox />
            </Form.Item>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Form.Item
              name="isMainMenu"
              label="Is Main Menu"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>
          <Col xs={12} md={6} lg={4}>
            <Form.Item
              name="isFooterMenu"
              label="Is Footer Menu"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>

          {/* SUBMIT */}
          <Col span={24}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-black text-white hover:!bg-black hover:!text-white"
              >
                {page ? "Update Page" : "Create Page"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default PageForm;
