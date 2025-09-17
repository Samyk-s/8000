"use client";
import React from "react";
import { Form, Button, Row, Col, Upload, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import Loader from "../../loader/loader";
import { useSelector } from "react-redux";
import { RootState } from "@/redux-store/store/store";
import { useFileForm } from "@/hooks/gallery/useGalleryFom";

const FileForm = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (val: boolean) => void;
}) => {
  const { form, fileList, uploading, handleFileUpload, setFileList, onFinish } =
    useFileForm(setIsModalOpen);

  const { loading } = useSelector((state: RootState) => state.itineraries);

  if (loading || uploading) return <Loader />;

  return (
    <div className="h-full dark:bg-[#020D1A]">
      <Form
        form={form}
        name="file-form"
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="IMAGE"
              name="file"
              rules={[{ required: true, message: "Cover image is required" }]}
            >
              <Upload
                beforeUpload={(file) => {
                  handleFileUpload(file);
                  return false;
                }}
                listType="picture"
                accept=".jpg,.jpeg,.png,.webp"
                maxCount={1}
                fileList={fileList}
                onChange={({ fileList }) => setFileList(fileList)}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label={<span className="uppercase dark:text-white">alt</span>}
              name="alt"
              rules={[{ required: true, message: "Alt text is required" }]}
            >
              <Input className="bg-transparent" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12} lg={6}>
            <Form.Item
              label={<span className="uppercase dark:text-white">order</span>}
              name="order"
              rules={[{ required: true, message: "Order is required" }]}
            >
              <Input className="bg-transparent" type="number" min={1} />
            </Form.Item>
          </Col>

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

export default FileForm;
