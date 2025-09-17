"use client";
import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import dynamic from "next/dynamic";
import Loader from "../../loader/loader";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-store/store/store";
import { useAddOnForm } from "@/hooks/addon/useAddonForm";
import { AddOnItem } from "@/types/addOns";

const TextEditor = dynamic(() => import("../../text-editor/text-editor"), {
  ssr: false,
});

const AddOnForm = ({
  onClose,
  addon,
}: {
  onClose: () => void;
  addon?: AddOnItem | null;
}) => {
  const { form, onFinish } = useAddOnForm(addon, onClose);
  const { loading } = useSelector((state: RootState) => state.addons);

  if (loading) return <Loader />;

  return (
    <div className="h-full dark:bg-[#020D1A]">
      <Form
        form={form}
        name="addon-form"
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col xs={24}>
            <Form.Item
              label={<span className="uppercase dark:text-white">Title</span>}
              name="title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input className="bg-transparent" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label={<span className="uppercase dark:text-white">Price</span>}
              name="price"
              rules={[{ required: true, message: "Price is required" }]}
            >
              <Input className="bg-transparent" type="number" min={1} />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label={<span className="uppercase dark:text-white">Order</span>}
              name="order"
              rules={[{ required: true, message: "Order is required" }]}
            >
              <Input className="bg-transparent" type="number" min={1} />
            </Form.Item>
          </Col>

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

          <Col span={24}>
            <Form.Item>
              <Button
                htmlType="submit"
                type="default"
                className="!bg-black !text-white hover:!bg-black hover:!text-white dark:!bg-white dark:!text-black"
              >
                {addon ? "Update" : "Save"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddOnForm;
