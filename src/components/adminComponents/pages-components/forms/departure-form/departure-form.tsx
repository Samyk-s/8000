"use client";
import React from "react";
import { Form, Button, Row, Col } from "antd";
import Loader from "../../loader/loader";
import dynamic from "next/dynamic";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-store/store/store";
import { useDepartureForm } from "@/hooks/departure/useDepartureForm";

// Dynamically import DatePicker to prevent SSR issues
const DatePicker = dynamic(() => import("antd").then((mod) => mod.DatePicker), {
  ssr: false,
});

const DepartureForm = ({ onClose }: { onClose: () => void }) => {
  const { form, onFinish, disablePastDates } = useDepartureForm(onClose);
  const { loading } = useSelector((state: RootState) => state.itineraries);

  if (loading) return <Loader />;

  return (
    <div className="h-full dark:bg-[#020D1A]">
      <Form
        form={form}
        name="departure-form"
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form.Item
              label={
                <span className="uppercase dark:text-white">Start Date</span>
              }
              name="startDate"
              rules={[{ required: true, message: "Start date is required" }]}
            >
              <DatePicker className="w-full" disabledDate={disablePastDates} />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label={
                <span className="uppercase dark:text-white">End Date</span>
              }
              name="endDate"
              dependencies={["startDate"]}
              rules={[
                { required: true, message: "End date is required" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || value.isAfter(getFieldValue("startDate"))) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("End date must be after start date"),
                    );
                  },
                }),
              ]}
            >
              <DatePicker className="w-full" disabledDate={disablePastDates} />
            </Form.Item>
          </Col>

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

export default DepartureForm;
