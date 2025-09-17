"use client";
import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import dynamic from "next/dynamic";
import Loader from "../../loader/loader";
import { ItineraryItem } from "@/types/itinerary";
import { useItineraryForm } from "@/hooks/itinererary/useItineraryForm";

const TextEditor = dynamic(() => import("../../text-editor/text-editor"), {
  ssr: false,
});

const ItineraryForm = ({
  setIsModalOpen,
  itinerary,
}: {
  setIsModalOpen: (val: boolean) => void;
  itinerary?: ItineraryItem | null;
}) => {
  const { form, loading, onFinish } = useItineraryForm(
    setIsModalOpen,
    itinerary,
  );

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
          <Col xs={24} md={4}>
            <Form.Item
              label={<span className="uppercase dark:text-white">Day</span>}
              name="day"
              rules={[{ required: true, message: "Day is required" }]}
            >
              <Input className="bg-transparent" placeholder="Eg. 1 or 1-2" />
            </Form.Item>
          </Col>

          <Col xs={24} md={16}>
            <Form.Item
              label={<span className="uppercase dark:text-white">Title</span>}
              name="title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input className="bg-transparent" />
            </Form.Item>
          </Col>

          <Col xs={24} md={4}>
            <Form.Item
              label={<span className="uppercase dark:text-white">Order</span>}
              name="order"
              rules={[{ required: true, message: "Order is required" }]}
            >
              <Input className="bg-transparent" type="number" min={1} />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label={
                <span className="uppercase dark:text-white">Max Altitude</span>
              }
              name="maxAltitude"
              rules={[{ required: true, message: "Max Altitude is required" }]}
            >
              <Input className="bg-transparent" type="number" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label={<span className="uppercase dark:text-white">Meal</span>}
              name="meal"
              rules={[{ required: true, message: "Meal is required" }]}
            >
              <Input className="bg-transparent" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label={
                <span className="uppercase dark:text-white">Accommodation</span>
              }
              name="accommodation"
              rules={[{ required: true, message: "Accommodation is required" }]}
            >
              <Input className="bg-transparent" />
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
                {itinerary ? "Update" : "Save"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ItineraryForm;
