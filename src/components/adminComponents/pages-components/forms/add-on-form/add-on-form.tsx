"use client";
import React, { useEffect } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import dynamic from "next/dynamic";
import Loader from "../../loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { createAddon, updateAddon } from "@/redux-store/slices/addonSlice";
import { useParams, useRouter } from "next/navigation";
import { AddOnItem, AddOnPayload } from "@/types/addOns";

const TextEditor = dynamic(() => import("../../text-editor/text-editor"), {
  ssr: false,
});

const AddOnForm = ({
  setIsModalOpen,
  addon,
}: {
  setIsModalOpen: (val: boolean) => void;
  addon?: AddOnItem | null;
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { loading } = useSelector((state: RootState) => state.addons);
  const router = useRouter();

  // Pre-fill form if editing
  useEffect(() => {
    if (addon) {
      form.setFieldsValue({
        title: addon.title,
        price: addon.price,
        order: addon.order,
        description: addon.description,
      });
    }
  }, [addon, form]);

  const onFinish = async (values: AddOnPayload) => {
    try {
      const payload = {
        ...values,
        price: Number(values.price),
        order: Number(values.order),
      };

      if (addon) {
        // Update existing addon
        dispatch(
          updateAddon({
            packageId: Number(id),
            addonId: addon.id,
            data: payload,
          }),
        );
      } else {
        // Create new addon
        dispatch(
          createAddon({
            packageId: Number(id),
            data: payload,
          }),
        );
      }

      form.resetFields();
      setIsModalOpen(false);
    } catch (error) {
      // console.error("Failed to save addon:", error);
      message.error("Failed to save addon");
    }
  };

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

          {/* PRICE */}
          <Col xs={24} md={12}>
            <Form.Item
              label={<span className="uppercase dark:text-white">Price</span>}
              name="price"
              rules={[{ required: true, message: "Price is required" }]}
            >
              <Input className="bg-transparent" type="number" min={1} />
            </Form.Item>
          </Col>

          {/* ORDER */}
          <Col xs={24} md={12}>
            <Form.Item
              label={<span className="uppercase dark:text-white">Order</span>}
              name="order"
              rules={[{ required: true, message: "Order is required" }]}
            >
              <Input className="bg-transparent" type="number" min={1} />
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
