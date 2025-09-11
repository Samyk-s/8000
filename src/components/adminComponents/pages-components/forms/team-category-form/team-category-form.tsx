"use client";
import React, { useEffect } from "react";
import { Form, Input, Button, Row, Col } from "antd";
import dynamic from "next/dynamic";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import {
  createTeamCategory,
  updateTeamCategory,
} from "@/redux-store/slices/teamCategorySlice";
import { TeamCategoryPayload, TeamCatgoryItem } from "@/types/teams";
import { useRouter } from "next/navigation";
import Loader from "../../loader/loader";

const TextEditor = dynamic(() => import("../../text-editor/text-editor"), {
  ssr: false,
});

interface TeamCategoryFormProps {
  teamCategory?: TeamCatgoryItem; // Optional for edit mode
}

const TeamCategoryForm: React.FC<TeamCategoryFormProps> = ({
  teamCategory,
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { loading } = useSelector((state: RootState) => state.teamsCategory);
  console.log(teamCategory, "sddsfskf");
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

    if (teamCategory?.id) {
      // UPDATE
      await dispatch(
        updateTeamCategory({ id: teamCategory.id, values: payload }),
      );
      router.back();
    } else {
      // CREATE
      await dispatch(createTeamCategory({ values: payload }));
      router.back();
    }

    router.push("/admin/teams/categories"); // redirect after submit
  };

  if (loading) return <Loader />;

  return (
    <Form
      form={form}
      name="team-category-form"
      autoComplete="off"
      layout="vertical"
      onFinish={onFinish}
    >
      <Row gutter={16}>
        {/* NAME */}
        <Col xs={24} md={12}>
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Category name is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        {/* ORDER */}
        <Col xs={24} md={12}>
          <Form.Item
            label="Order"
            name="order"
            rules={[{ required: true, message: "Order is required" }]}
          >
            <Input type="number" min={1} />
          </Form.Item>
        </Col>

        {/* DESCRIPTION */}
        <Col span={24}>
          <Form.Item label="Description" name="description">
            <TextEditor />
          </Form.Item>
        </Col>

        {/* SUBMIT */}
        <Col span={24}>
          <Form.Item>
            <Button
              type="primary"
              className="bg-black text-white hover:!bg-black hover:!text-white"
              htmlType="submit"
            >
              {teamCategory ? "Update" : "Save"}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default TeamCategoryForm;
