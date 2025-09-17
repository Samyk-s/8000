"use client";
import React from "react";
import { Form, Input, Button, Row, Col, Upload, Select, Checkbox } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import { TeamItem } from "@/types/teams";
import { useTeamForm } from "@/hooks/teams/useTeamForm";

const TextEditor = dynamic(() => import("../../text-editor/text-editor"), {
  ssr: false,
});

interface TeamFormProps {
  team?: TeamItem;
}

const TeamForm: React.FC<TeamFormProps> = ({ team }) => {
  const {
    form,
    uploading,
    isClient,
    image,
    setImage,
    coverImage,
    setCoverImage,
    bioData,
    setBioData,
    categories,
    handleFileUpload,
    onFinish,
  } = useTeamForm(team);

  if (!isClient) return null;

  return (
    <Form
      form={form}
      name="team-form"
      autoComplete="off"
      layout="vertical"
      onFinish={onFinish}
    >
      <Row gutter={16}>
        {/* NAME */}
        <Col xs={24} md={12}>
          <Form.Item
            label="Full Name"
            name="name"
            rules={[{ required: true, message: "Fullname is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        {/* POST */}
        <Col xs={24} md={12}>
          <Form.Item
            label="Post"
            name="post"
            rules={[{ required: true, message: "Post is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        {/* EMAIL */}
        <Col xs={24} md={12}>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input type="email" />
          </Form.Item>
        </Col>

        {/* PHONE */}
        <Col xs={24} md={12}>
          <Form.Item
            label="Phone"
            name="phoneNo"
            rules={[{ required: true, message: "Phone is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        {/* SOCIAL LINKS */}
        <Col xs={24} md={12}>
          <Form.Item label="Facebook" name="fbLink">
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Instagram" name="instagramLink">
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="Twitter" name="twitter">
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="LinkedIn" name="linkedIn">
            <Input />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item label="YouTube" name="youtube">
            <Input />
          </Form.Item>
        </Col>

        {/* CATEGORY */}
        <Col xs={24} md={12}>
          <Form.Item
            label="Category"
            name="categoryId"
            rules={[{ required: true, message: "Category is required" }]}
          >
            <Select placeholder="Select category" allowClear>
              {categories?.map((item) => (
                <Select.Option key={item?.id} value={item?.id}>
                  {item?.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        {/* IMAGE */}
        <Col xs={24} md={12} lg={8}>
          <Form.Item label="Image" name="image">
            <Upload
              beforeUpload={(file) => handleFileUpload(file, setImage)}
              listType="picture"
              accept=".jpg,.jpeg,.png,.webp"
              maxCount={1}
              fileList={
                image
                  ? [{ uid: image.uid, name: image.name, url: image.url }]
                  : []
              }
              onRemove={() => setImage(null)}
            >
              <Button icon={<UploadOutlined />} loading={uploading}>
                Upload Image
              </Button>
            </Upload>
          </Form.Item>
        </Col>

        {/* COVER IMAGE */}
        <Col xs={24} md={12} lg={8}>
          <Form.Item label="Cover Image" name="coverImage">
            <Upload
              beforeUpload={(file) => handleFileUpload(file, setCoverImage)}
              listType="picture"
              accept=".jpg,.jpeg,.png,.webp"
              maxCount={1}
              fileList={
                coverImage
                  ? [
                      {
                        uid: coverImage.uid,
                        name: coverImage.name,
                        url: coverImage.url,
                      },
                    ]
                  : []
              }
              onRemove={() => setCoverImage(null)}
            >
              <Button icon={<UploadOutlined />} loading={uploading}>
                Upload Cover
              </Button>
            </Upload>
          </Form.Item>
        </Col>

        {/* BIO DATA */}
        <Col xs={24} md={12} lg={8}>
          <Form.Item label="Bio Data" name="bioData">
            <Upload
              beforeUpload={(file) => handleFileUpload(file, setBioData)}
              listType="picture"
              maxCount={1}
              fileList={
                bioData
                  ? [{ uid: bioData.uid, name: bioData.name, url: bioData.url }]
                  : []
              }
              onRemove={() => setBioData(null)}
            >
              <Button icon={<UploadOutlined />} loading={uploading}>
                Upload Bio Data
              </Button>
            </Upload>
          </Form.Item>
        </Col>

        {/* ORDER */}
        <Col xs={24} md={12} lg={8}>
          <Form.Item
            label="Order"
            name="order"
            rules={[{ required: true, message: "Order is required" }]}
          >
            <Input type="number" min={1} />
          </Form.Item>
        </Col>

        {/* STATUS */}
        <Col xs={24} md={12} lg={8}>
          <Form.Item label="Status" name="status" valuePropName="checked">
            <Checkbox />
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
              {team?.id ? "Update Team" : "Create Team"}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default TeamForm;
