"use client";
import { useEffect } from "react";
import { Form, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import {
  createTeamCategory,
  updateTeamCategory,
} from "@/redux-store/slices/teamCategorySlice";
import { TeamCategoryPayload, TeamCatgoryItem } from "@/types/teams";
import { useRouter } from "next/navigation";

export const useTeamCategoryForm = (teamCategory?: TeamCatgoryItem) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading } = useSelector((state: RootState) => state.teamsCategory);

  // Prefill form on edit
  useEffect(() => {
    if (teamCategory) {
      form.setFieldsValue({
        ...teamCategory,
        order: teamCategory.order?.toString(),
      });
    }
  }, [teamCategory, form]);

  const onFinish = async (values: TeamCategoryPayload) => {
    const payload = { ...values, order: Number(values?.order) };

    try {
      if (teamCategory?.id) {
        await dispatch(updateTeamCategory({ id: teamCategory.id, values: payload })).unwrap();
        message.success("Team Category updated successfully!");
      } else {
        await dispatch(createTeamCategory({ values: payload })).unwrap();
        message.success("Team Category created successfully!");
      }
      router.back();
    } catch {
      message.error("Failed to save team category");
    }
  };

  return {
    form,
    loading,
    onFinish,
  };
};
