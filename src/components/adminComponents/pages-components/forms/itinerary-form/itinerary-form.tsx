"use client";
import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import dynamic from "next/dynamic";
import Loader from "../../loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { createItinerary } from "@/redux-store/slices/itinerarySlice";
import { useParams } from "next/navigation";
import { ItineraryItem } from "@/types/itinerary";

const TextEditor = dynamic(() => import("../../text-editor/text-editor"), {
  ssr: false,
});

const ItineraryForm = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (val: boolean) => void;
}) => {
  const [form] = Form.useForm();

  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { loading } = useSelector((state: RootState) => state.itineraries);

  // Fetch SEO data by ID
  useEffect(() => {}, [form]);

  const onFinish = async (values: ItineraryItem) => {
    try {
      const payload = {
        ...values,
        order: Number(values?.order),
        maxAltitude: Number(values?.maxAltitude),
      };
      console.log("created payload:", payload);
      dispatch(
        createItinerary({
          id: Number(id),
          data: {
            ...payload,
            order: Number(values?.order),
            maxAltitude: Number(values?.maxAltitude),
          },
        }),
      );
      setIsModalOpen(false);
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
              <Input className="bg-transparent" type="number" />
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
