"use client";
import React from "react";
import { Form, Input, Button, Row, Col, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import TextEditor from "../../text-editor/text-editor";
import Loader from "../../loader/loader";
import { StoryItem } from "@/types/summitter";
import { useSummiterStoryForm } from "@/hooks/summiter-story/useSummitterForm";

interface SummiterStoryFormProps {
  story?: StoryItem | null;
}

const SummiterStoryForm: React.FC<SummiterStoryFormProps> = ({ story }) => {
  const {
    form,
    loading,
    imageList,
    coverImageList,
    uploadingImage,
    uploadingCover,
    makeBeforeUpload,
    setImageFile,
    setImageList,
    setCoverImageFile,
    setCoverImageList,
    onFinish,
  } = useSummiterStoryForm(story);

  if (loading) return <Loader />;

  return (
    <div className="flex flex-col gap-3">
      <Form
        form={form}
        name="summiter-story-form"
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={[16, 10]}>
          {/* Title */}
          <Col xs={24}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          {/* Image */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Image" required>
              <Upload
                beforeUpload={makeBeforeUpload("image")}
                listType="picture"
                maxCount={1}
                fileList={imageList}
                onRemove={() => {
                  setImageFile(null);
                  setImageList([]);
                }}
              >
                <Button
                  icon={<UploadOutlined />}
                  loading={uploadingImage}
                  disabled={uploadingImage}
                >
                  {uploadingImage ? "Uploading..." : "Click to Upload"}
                </Button>
              </Upload>
            </Form.Item>
          </Col>

          {/* Cover Image */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Cover Image" required>
              <Upload
                beforeUpload={makeBeforeUpload("cover")}
                listType="picture"
                maxCount={1}
                fileList={coverImageList}
                onRemove={() => {
                  setCoverImageFile(null);
                  setCoverImageList([]);
                }}
              >
                <Button
                  icon={<UploadOutlined />}
                  loading={uploadingCover}
                  disabled={uploadingCover}
                >
                  {uploadingCover ? "Uploading..." : "Click to Upload"}
                </Button>
              </Upload>
            </Form.Item>
          </Col>

          {/* Description */}
          <Col span={24}>
            <Form.Item
              label="Description"
              name="description"
              rules={[{ required: true, message: "Description is required" }]}
            >
              <TextEditor />
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
            {story ? "Update" : "Save"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SummiterStoryForm;
