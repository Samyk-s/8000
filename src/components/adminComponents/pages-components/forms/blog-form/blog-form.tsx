"use client";
import React from "react";
import { Form, Input, Button, Row, Col, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import { BlogItem } from "@/types/blog";
import { BlogCategory } from "@/types/enum/enum";
import { useBlogForm } from "@/hooks/blogs/useBlogForm";

const TextEditor = dynamic(() => import("../../text-editor/text-editor"), {
  ssr: false,
});

interface BlogFormProps {
  blog?: BlogItem;
}

const BlogForm: React.FC<BlogFormProps> = ({ blog }) => {
  const {
    form,

    fileList,
    uploading,
    description,
    setDescription,
    beforeUpload,
    setUploadedFile,
    setFileList,
    onFinish,
  } = useBlogForm(blog);

  return (
    <div className="flex flex-col gap-3">
      <Form
        form={form}
        name="blog-form"
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
      >
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

          <Col xs={24} md={12}>
            <Form.Item
              label="Order"
              name="order"
              rules={[{ required: true, message: "Order is required" }]}
            >
              <Input type="number" min={1} />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Category is required" }]}
            >
              <Select placeholder="Select a category">
                {Object.values(BlogCategory).map((cat) => (
                  <Select.Option key={cat} value={cat}>
                    {cat}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Image" required>
              <Upload
                beforeUpload={beforeUpload}
                listType="picture"
                maxCount={1}
                fileList={fileList}
                onRemove={() => {
                  setUploadedFile(null);
                  setFileList([]);
                }}
              >
                <Button
                  icon={<UploadOutlined />}
                  loading={uploading}
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Click to Upload"}
                </Button>
              </Upload>
            </Form.Item>
          </Col>

          <Col xs={24}>
            <Form.Item
              label="Description"
              rules={[{ required: true, message: "Description is required" }]}
            >
              <TextEditor value={description} onChange={setDescription} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-fit bg-black text-white hover:!bg-black hover:!text-white"
          >
            {blog ? "Update Blog" : "Create Blog"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default BlogForm;
