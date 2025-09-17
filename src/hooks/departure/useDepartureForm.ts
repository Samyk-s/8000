"use client";
import { useState } from "react";
import { Form, message } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux-store/store/store";
import { useParams } from "next/navigation";
import dayjs from "dayjs";
import { createDeparture } from "@/redux-store/slices/departureSlice";
import { DepartureItem } from "@/types/departure";

export const useDepartureForm = (onClose: () => void) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

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

      form.resetFields();
      onClose();
      message.success("Departure saved successfully!");
    } catch (error) {
      message.error("Failed to save departure");
    }
  };

  return {
    form,
    onFinish,
    disablePastDates,
  };
};
