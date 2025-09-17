"use client";
import React from "react";
import { Form, Input, Button, Row, Col, Upload, Select } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Loader from "../../loader/loader";
import SummitterTabs from "@/components/adminComponents/tabs/summitter-tabs";
import { SummitterItem } from "@/types/summitter";
import { useSummiterForm } from "@/hooks/summitter/useSummiterForm";

const { Option } = Select;

interface SummiterFormProps {
  summitter?: SummitterItem;
}

const SummiterForm: React.FC<SummiterFormProps> = ({ summitter }) => {
  const {
    form,
    items,
    loading,
    fileList,
    uploading,
    beforeUpload,
    setUploadedFile,
    setFileList,
    onFinish,
    onFinishFailed,
  } = useSummiterForm(summitter);

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col gap-3">
      <SummitterTabs />
      <Form
        form={form}
        name="summiter-form"
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={[16, 10]}>
          {/* Name */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Name is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          {/* Nationality */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Nationality"
              name="nationality"
              rules={[{ required: true, message: "Nationality is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          {/* Summitted Date */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Summitted Date"
              name="summittedDate"
              rules={[
                { required: true, message: "Summitted date is required" },
              ]}
            >
              <Input type="date" />
            </Form.Item>
          </Col>

          {/* Peak */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Peak"
              name="peak"
              rules={[{ required: true, message: "Peak is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          {/* Email */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Summitter Email"
              name="summitterEmail"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Please enter a valid email" },
              ]}
            >
              <Input type="email" />
            </Form.Item>
          </Col>

          {/* Order */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Order"
              name="order"
              rules={[{ required: true, message: "Order is required" }]}
            >
              <Input type="number" min={1} />
            </Form.Item>
          </Col>

          {/* Lead by */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Lead"
              name="led_by_id"
              rules={[{ required: true, message: "Leader is required" }]}
            >
              <Select
                placeholder="Select Lead"
                defaultValue={summitter?.ledBy?.name || ""}
              >
                {items?.map((item) => (
                  <Option key={item?.id} value={item?.id}>
                    {item?.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* Image */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Image" required>
              <Upload
                beforeUpload={beforeUpload}
                listType="picture"
                maxCount={1}
                fileList={fileList}
                onRemove={() => {
                  setUploadedFile(null);
                  setFileList([]);
                }}
              >
                <Button
                  icon={<UploadOutlined />}
                  loading={uploading}
                  disabled={uploading}
                >
                  {uploading ? "Uploading..." : "Click to Upload"}
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-fit bg-black text-white hover:!bg-black hover:!text-white"
          >
            {summitter ? "Update" : "Submit"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SummiterForm;
