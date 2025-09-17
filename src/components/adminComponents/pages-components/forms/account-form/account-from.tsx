"use client";
import React from "react";
import { Form, Input, Button, Row, Col } from "antd";

const AccountForm = () => {
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {};

  return (
    <div className="flex flex-col gap-3">
      <Form
        form={form}
        name="setting-form"
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={16}>
          {/* All input fields remain */}
          <Col xs={24} md={12}>
            <Form.Item label="Name" name="Name" rules={[{ required: true }]}>
              <Input placeholder="Enter site name" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email" },
                {
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              ]}
            >
              <Input placeholder="example@mail.com" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item
              label="Phone Number"
              name="phone"
              rules={[
                { required: true, message: "Phone number is required" },
                {
                  pattern: /^\+?[0-9]{7,15}$/,
                  message: "Please enter a valid phone number (+9779800000000)",
                },
              ]}
            >
              <Input placeholder="+977 9812345678" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Password" name="password">
              <Input.Password placeholder="Enter password" visibilityToggle />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-fit bg-black text-white hover:!bg-black hover:!text-white"
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AccountForm;
