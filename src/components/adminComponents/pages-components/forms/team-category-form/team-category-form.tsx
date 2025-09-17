"use client";
import React from "react";
import { Form, Input, Button, Row, Col } from "antd";
import dynamic from "next/dynamic";
import Loader from "../../loader/loader";
import { TeamCatgoryItem } from "@/types/teams";
import { useTeamCategoryForm } from "@/hooks/teams/useTeamCategoryForm";

const TextEditor = dynamic(() => import("../../text-editor/text-editor"), {
  ssr: false,
});

interface TeamCategoryFormProps {
  teamCategory?: TeamCatgoryItem;
}

const TeamCategoryForm: React.FC<TeamCategoryFormProps> = ({
  teamCategory,
}) => {
  const { form, loading, onFinish } = useTeamCategoryForm(teamCategory);

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
          <Form.Item
            label="Description"
            name="description"
            rules={[
              { required: true, message: "Description name is required" },
            ]}
          >
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
