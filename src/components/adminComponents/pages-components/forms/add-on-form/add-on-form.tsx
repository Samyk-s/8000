"use client";
import React, { useEffect } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import dynamic from "next/dynamic";
import Loader from "../../loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import {
  createItinerary,
  updateItinerary,
} from "@/redux-store/slices/itinerarySlice";
import { useParams } from "next/navigation";
import { ItineraryItem } from "@/types/itinerary";
import { AddOnPayload } from "@/types/addOns";
import { createAddon } from "@/redux-store/slices/addonSlice";

const TextEditor = dynamic(() => import("../../text-editor/text-editor"), {
  ssr: false,
});

const AddOnForm = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (val: boolean) => void;
  itinerary?: ItineraryItem | null;
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { loading } = useSelector((state: RootState) => state.itineraries);

  const onFinish = async (values: AddOnPayload) => {
    try {
      const payload = {
        ...values,
        order: Number(values?.order),
        price: Number(values?.price),
      };

      setIsModalOpen(false);
      dispatch(
        createAddon({
          packageId: Number(id),
          data: payload,
        }),
      );
      form.resetFields();
    } catch (error) {
      console.error("Failed to save itinerary:", error);
      message.error("Failed to save itinerary");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="h-full dark:bg-[#020D1A]">
      <Form
        form={form}
        name="itinerary-form"
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

          {/* ORDER */}
          <Col xs={24} md={12}>
            <Form.Item
              label={<span className="uppercase dark:text-white">Price</span>}
              name="price"
              rules={[{ required: true, message: "Price is required" }]}
            >
              <Input className="bg-transparent" type="number" />
            </Form.Item>
          </Col>
          {/* ORDER */}
          <Col xs={24} md={12}>
            <Form.Item
              label={<span className="uppercase dark:text-white">Order</span>}
              name="order"
              rules={[{ required: true, message: "Order is required" }]}
            >
              <Input className="bg-transparent" type="number" />
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
                Save
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default AddOnForm;
