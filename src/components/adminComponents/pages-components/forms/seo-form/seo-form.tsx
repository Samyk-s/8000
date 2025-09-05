"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import seoApi from "@/lib/api/seoApi";
import { MediaFile } from "@/types/utils-type";
import Loader from "../../loader/loader";

const TextEditor = dynamic(() => import("../../text-editor/text-editor"), {
  ssr: false,
});

const SeoForm = ({ id, type }: { id: string; type: string }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Fetch SEO data by ID
  useEffect(() => {
    async function fetchSeoById() {
      setLoading(true);
      try {
        const res = await seoApi.getSeo(type, Number(id));
        form.setFieldsValue({
          title: res.title,
          keywords: res.keywords,
          description: res.description,
          status: res.status ?? true,
          isMenu: res.isMenu ?? false,
          isMainMenu: res.isMainMenu ?? false,
          isFooterMenu: res.isFooterMenu ?? false,
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
      } catch (error) {
        console.error("Failed to fetch SEO:", error);
        message.error("Failed to load SEO data");
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }
    fetchSeoById();
  }, [id, form]);

  const onFinish = async (values: any) => {
    try {
      // Validate image
      if (!values.image || values.image.length === 0) {
        message.error("Image is required");
        return;
      }

      // Convert image to MediaFile format
      const image: MediaFile = {
        uid: values.image[0].uid,
        name: values.image[0].name,
        url: values.image[0].url || "",
        alt: values.image[0].name,
        type: "image",
        size: "0", // set actual size if available
      };

      const payload = { ...values, image };
      console.log("Updated SEO Payload:", payload);

      // Call API to update SEO
      // await seoApi.updateSeo("page", Number(id), payload);
      message.success("SEO updated successfully");
    } catch (error) {
      console.error("Failed to update SEO:", error);
      message.error("Failed to update SEO");
    }
  };

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
                    value && value.length > 0
                      ? Promise.resolve()
                      : Promise.reject(new Error("Image is required")),
                },
              ]}
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
