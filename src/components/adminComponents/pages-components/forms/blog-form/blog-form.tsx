"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Upload, message, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux-store/store/store";
import resourceApi from "@/lib/api/resourceApi";
import { MediaFile } from "@/types/utils-type";
import { createBlog, updateBlog } from "@/redux-store/slices/blogSlice";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { BlogItem } from "@/types/blog";
import { BlogCategory } from "@/types/enum/enum";

const TextEditor = dynamic(() => import("../../text-editor/text-editor"), {
  ssr: false,
});

interface BlogFormProps {
  blog?: BlogItem;
}

const BlogForm: React.FC<BlogFormProps> = ({ blog }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const [uploadedFile, setUploadedFile] = useState<MediaFile | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const [description, setDescription] = useState<string>("");
  const router = useRouter();

  // Prefill form if editing
  useEffect(() => {
    if (blog) {
      form.setFieldsValue({
        title: blog.title,
        country: blog.country,
        order: blog.order,
        category: blog.category,
      });
      setDescription(blog.description || "");
      if (blog.image) {
        setUploadedFile(blog.image);
        setFileList([
          {
            uid: blog.image?.uid,
            name: blog.image.name,
            status: "done",
            url: blog.image.url,
          },
        ]);
      }
    }
  }, [blog, form]);

  const handleFileUpload = async (rawFile: File) => {
    const formData = new FormData();
    formData.append("file", rawFile);

    try {
      setUploading(true);
      const res = await resourceApi.createResource(formData);
      setUploading(false);

      if (res) {
        setUploadedFile(res);
        setFileList([
          {
            uid: res.uid,
            name: res.name,
            status: "done",
            url: res.url,
          },
        ]);
        message.success("File uploaded successfully!");
      } else {
        message.error("File upload failed");
      }
    } catch (error) {
      // console.error(error);
      setUploading(false);
      message.error("File upload failed");
    }
  };

  const beforeUpload = async (file: File) => {
    const isValidType = [
      "image/jpeg",
      "image/png",
      "image/jpg",
      "image/webp",
    ].includes(file.type);
    if (!isValidType) {
      message.error("You can only upload JPG, JPEG, PNG, or WEBP files!");
      return Upload.LIST_IGNORE;
    }

    await handleFileUpload(file);
    return Upload.LIST_IGNORE;
  };

  const onFinish = (values: any) => {
    // CREATE: require image
    if (!blog && !uploadedFile) {
      message.error("Please upload an image before submitting");
      return;
    }

    const payload: any = {
      ...values,
      order: Number(values.order) || 0,
      description,
    };

    // Only include image if new or changed
    if (uploadedFile && (!blog || blog.image?.uid !== uploadedFile.uid)) {
      payload.image = uploadedFile;
    }

    if (blog?.id) {
      // UPDATE: include category in update payload
      dispatch(updateBlog({ blogId: blog.id, data: payload }));
      router.back();
    } else {
      // CREATE: extract category for creation
      const { category, ...rest } = payload;
      dispatch(createBlog({ type: category, data: rest }));
      router.back();
    }
  };

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
