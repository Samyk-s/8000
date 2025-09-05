"use client";

import React from "react";
import { Form, Button, Row, Col, message } from "antd";
import Loader from "../../loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import { createDeparture } from "@/redux-store/slices/departureSlice";
import { DepartureItem } from "@/types/departure";
import dynamic from "next/dynamic";

// Dynamically import DatePicker to prevent SSR issues
const DatePicker = dynamic(() => import("antd").then((mod) => mod.DatePicker), {
  ssr: false,
});

const DepartureForm = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (val: boolean) => void;
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { loading } = useSelector((state: RootState) => state.itineraries);

  // Disable past dates
  const disablePastDates = (current: dayjs.Dayjs) => {
    return current && current < dayjs().startOf("day");
  };

  const onFinish = async (values: any) => {
    try {
      const payload = {
        startDate: values.startDate
          ? dayjs(values.startDate).format("YYYY-MM-DD")
          : null,
        endDate: values.endDate
          ? dayjs(values.endDate).format("YYYY-MM-DD")
          : null,
      };

      await dispatch(
        createDeparture({ id: Number(id), data: payload as DepartureItem }),
      );

      setIsModalOpen(false);
      form.resetFields();
      message.success("Departure saved successfully!");
    } catch (error) {
      console.error("Failed to save departure:", error);
      message.error("Failed to save departure");
    }
  };

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
          {/* START DATE */}
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

          {/* END DATE */}
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

export default DepartureForm;
