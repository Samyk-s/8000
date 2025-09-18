"use client";
import React from "react";
import { Form, Input, Button, Row, Col, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import Loader from "../../loader/loader";
import { useSeo } from "@/hooks/useSeo";

const TextEditor = dynamic(() => import("../../text-editor/text-editor"), {
  ssr: false,
});

const SeoForm = ({ id, type }: { id: string; type: string }) => {
  const {
    form,
    loading,
    fileList,
    uploading,
    setFileList,
    handleFileUpload,
    onFinish,
  } = useSeo(id, type);

  if (loading) return <Loader />;

  return (
    <div className="h-full dark:bg-[#020D1A]">
      <Form
        form={form}
        name="seo-form"
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={16}>
          {/* TITLE */}
          <Col xs={24}>
            <Form.Item
              label={<span className="uppercase dark:text-white">Title</span>}
              name="title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input className="bg-transparent" />
            </Form.Item>
          </Col>

          {/* KEYWORDS */}
          <Col xs={24}>
            <Form.Item
              label={
                <span className="uppercase dark:text-white">Keywords</span>
              }
              name="keywords"
              rules={[{ required: true, message: "Keywords are required" }]}
            >
              <Input className="bg-transparent" />
            </Form.Item>
          </Col>

          {/* IMAGE */}
          <Col xs={24} md={8}>
            <Form.Item
              label={<span className="uppercase dark:text-white">Image</span>}
              name="image"
              valuePropName="fileList"
              getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              rules={[
                {
                  validator: (_, value) =>
                    (value && value.length > 0) || fileList.length > 0
                      ? Promise.resolve()
                      : Promise.reject(new Error("Image is required")),
                },
              ]}
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
                <Button
                  className="bg-transparent dark:text-white"
                  icon={<UploadOutlined />}
                  loading={uploading}
                >
                  Click to Upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>

          {/* DESCRIPTION */}
          <Col span={24}>
            <Form.Item
              label={
                <span className="uppercase dark:text-white">Description</span>
              }
              name="description"
              rules={[{ required: true, message: "Description is required" }]}
              valuePropName="value"
            >
              <TextEditor />
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
                SAVE
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default SeoForm;
