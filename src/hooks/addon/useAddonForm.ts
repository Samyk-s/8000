"use client";
import { useEffect } from "react";
import { Form, message } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux-store/store/store";
import { createAddon, updateAddon } from "@/redux-store/slices/addonSlice";
import { useParams } from "next/navigation";
import { AddOnItem, AddOnPayload } from "@/types/addOns";

export const useAddOnForm = (addon?: AddOnItem | null, onClose?: () => void) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();

  // Prefill form if editing
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
        await dispatch(
          updateAddon({
            packageId: Number(id),
            addonId: addon.id,
            data: payload,
          }),
        ).unwrap();
      } else {
        // Create new addon
        await dispatch(
          createAddon({
            packageId: Number(id),
            data: payload,
          }),
        ).unwrap();
      }

      form.resetFields();
      onClose?.();
    } catch (error) {
      message.error("Failed to save addon");
    }
  };

  return { form, onFinish };
};
