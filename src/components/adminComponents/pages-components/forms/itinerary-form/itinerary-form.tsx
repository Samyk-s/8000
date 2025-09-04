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

const ItineraryForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Fetch SEO data by ID
  useEffect(() => {}, [form]);

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
          {/* DAY */}
          <Col xs={24} md={4}>
            <Form.Item
              label={<span className="uppercase dark:text-white">Day</span>}
              name="day"
              rules={[{ required: true, message: "Day is required" }]}
            >
              <Input className="bg-transparent" placeholder="Eg. 1 or 1-2" />
            </Form.Item>
          </Col>
          {/* TITLE */}
          <Col xs={24} md={16}>
            <Form.Item
              label={<span className="uppercase dark:text-white">Title</span>}
              name="title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input className="bg-transparent" />
            </Form.Item>
          </Col>
          {/* Order */}
          <Col xs={24} md={4}>
            <Form.Item
              label={<span className="uppercase dark:text-white">order</span>}
              name="order"
              rules={[{ required: true, message: "Order is required" }]}
            >
              <Input className="bg-transparent" type="number" />
            </Form.Item>
          </Col>
          {/* max altitude */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label={
                <span className="uppercase dark:text-white">max Altitude</span>
              }
              name="maxAltitude"
              rules={[{ required: true, message: "Keywords are required" }]}
            >
              <Input className="bg-transparent" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label={<span className="uppercase dark:text-white">meal</span>}
              name="meal"
              rules={[{ required: true, message: "Keywords are required" }]}
            >
              <Input className="bg-transparent" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label={
                <span className="uppercase dark:text-white">accommodation</span>
              }
              name="accommodation"
              rules={[{ required: true, message: "Keywords are required" }]}
            >
              <Input className="bg-transparent" />
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

export default ItineraryForm;
