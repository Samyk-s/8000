"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import seoApi from "@/lib/api/seoApi";
import { MediaFile } from "@/types/utils-type";
import Loader from "../../loader/loader";
import resourceApi from "@/lib/api/resourceApi";

const TextEditor = dynamic(() => import("../../text-editor/text-editor"), {
  ssr: false,
});

const SeoForm = ({ id, type }: { id: string; type: string }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const [file, setFile] = useState<MediaFile | null>(null);
  const [uploading, setUploading] = useState(false);
  const [seoId, setSeoId] = useState<Number | null>();

  // ================= Handle file upload =================
  const handleFileUpload = async (rawFile: File) => {
    const formData = new FormData();
    formData.append("file", rawFile);

    try {
      setUploading(true);
      const res = await resourceApi.createResource(formData);
      setUploading(false);

      if (res) {
        setFile(res);
        setFileList([
          {
            uid: res.uid,
            name: res?.name,
            status: "done",
            url: res?.url,
          },
        ]);
        message.success("File uploaded successfully!");
      } else {
        message.error("File upload failed");
      }
    } catch (error) {
      console.error(error);
      setUploading(false);
      message.error("File upload failed");
    }
  };

  // ================= Fetch SEO by ID =================
  useEffect(() => {
    async function fetchSeoById() {
      setLoading(true);
      try {
        const res = await seoApi.getSeo(type, Number(id));
        setSeoId(res?.id);
        // message.success(res?.id);

        form.setFieldsValue({
          title: res.title,
          keywords: res.keywords,
          description: res.description,
          image: res.image
            ? [
                {
                  uid: res.image.uid,
                  name: res.image.name,
                  url: res.image.url,
                  status: "done",
                },
              ]
            : [],
        });

        // Keep old image in fileList state
        if (res.image) {
          setFileList([
            {
              uid: res.image.uid,
              name: res.image.name,
              url: res.image.url,
              status: "done",
            },
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch SEO:", error);
        message.error("Failed to load SEO data");
      } finally {
        setLoading(false);
      }
    }
    fetchSeoById();
  }, [id, type, form]);

  // ================= Submit =================
  const onFinish = async (values: any) => {
    try {
      // Decide which image to use: new upload or old one
      const selectedImage = file
        ? {
            uid: file?.uid,
            name: file?.name,
            url: file?.url,
            alt: values?.alt || file?.name,
            type: "image",
            size: file?.size,
          }
        : values?.image && values?.image?.length > 0
          ? {
              uid: values.image[0]?.uid,
              name: values.image[0]?.name,
              url: values.image[0]?.url,
              alt: values.alt || values?.image[0]?.name,
              type: "image",
              size: "0",
            }
          : null;

      if (!selectedImage) {
        message.error("Image is required");
        return;
      }

      // ✅ Final payload
      const payload = {
        title: values.title,
        keywords: values.keywords,
        description: values.description,
        image: selectedImage,
      };

      console.log("Final SEO Payload:", payload);
      await seoApi.updateSeo(Number(seoId), payload);
      message.success("SEO updated successfully");
    } catch (error) {
      console.error("Failed to update SEO:", error);
      message.error("Failed to update SEO");
    }
  };

  // ================= Render =================
  if (loading) {
    return <Loader />;
  }

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
                    (value && value.length > 0) || file
                      ? Promise.resolve()
                      : Promise.reject(new Error("Image is required")),
                },
              ]}
            >
              <Upload
                beforeUpload={(file) => {
                  handleFileUpload(file);
                  return false; // prevent default upload
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
