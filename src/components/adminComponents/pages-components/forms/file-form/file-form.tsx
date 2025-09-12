"use client";

import React, { useState } from "react";
import { Form, Button, Row, Col, message, Upload, Input } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { useParams } from "next/navigation";
import Loader from "../../loader/loader";
import { createFile } from "@/redux-store/slices/fileSlice";
import resourceApi from "@/lib/api/resourceApi";
import { FileType, PageTemplate } from "@/types/enum/enum";
import { FilePayload } from "@/types/file";
import { FileParams, MediaFile } from "@/types/utils-type";

const FileForm = ({
  setIsModalOpen,
}: {
  setIsModalOpen: (val: boolean) => void;
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { loading } = useSelector((state: RootState) => state.itineraries);
  const [fileList, setFileList] = useState<any[]>([]);
  const [file, setFile] = useState<MediaFile | null>(null);
  const [uploading, setUploading] = useState(false);

  // Handle file upload
  const handleFileUpload = async (rawFile: File) => {
    const formData = new FormData();
    formData.append("file", rawFile);

    try {
      setUploading(true);
      const res = await resourceApi.createResource(formData);
      // console.log("res", res);
      setUploading(false);

      if (res) {
        setFile(res);
        setFileList([
          {
            uid: res.uid,
            name: res?.name,
            status: "done",
            url: res?.url,
          },
        ]);

        message.success("File uploaded successfully!");
      } else {
        message.error("File upload failed");
      }
    } catch (error) {
      console.error(error);
      setUploading(false);
      message.error("File upload failed");
    }
  };

  // Handle form submission
  const onFinish = async (values: any) => {
    // Require file
    if (!file) {
      message.error("Please upload a file before submitting");
      return;
    }

    const payload: FilePayload = {
      file: {
        uid: file.uid,
        name: file.name,
        url: file.url,
        alt: values.alt,
        type: file.type,
        size: file.size,
      },
      order: Number(values.order) || 0,
      status: 1,
      alt: values.alt,
    };

    const params: FileParams = {
      type: FileType.GALLERY,
      related_id: Number(id),
      file_of: PageTemplate.PACKAGE,
    };

    try {
      await dispatch(createFile({ params, data: payload })).unwrap();
      setIsModalOpen(false);
      form.resetFields();
      setFileList([]);
      setFile(null);
      message.success("File saved successfully!");
    } catch (error) {
      console.error("Failed to save file:", error);
      message.error("Failed to save file");
    }
  };

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
          {/* Image Upload */}
          <Col span={8}>
            <Form.Item
              label="IMAGE"
              name="file"
              rules={[{ required: true, message: "Cover image is required" }]}
            >
              <Upload
                beforeUpload={(file) => {
                  handleFileUpload(file);
                  return false; // prevent default upload
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

          {/* Alt Text */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label={<span className="uppercase dark:text-white">alt</span>}
              name="alt"
              rules={[{ required: true, message: "Alt text is required" }]}
            >
              <Input className="bg-transparent" />
            </Form.Item>
          </Col>

          {/* Order */}
          <Col xs={24} md={12} lg={6}>
            <Form.Item
              label={<span className="uppercase dark:text-white">order</span>}
              name="order"
              rules={[{ required: true, message: "Order is required" }]}
            >
              <Input className="bg-transparent" type="number" min={1} />
            </Form.Item>
          </Col>

          {/* Submit Button */}
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
