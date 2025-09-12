"use client";

import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Upload,
  Select,
  Checkbox,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import { generateSlug } from "@/lib/utils";
import { PagePayload } from "@/types/page";
import { PageTemplate } from "@/types/enum/enum";
import { MediaFile } from "@/types/utils-type";
import resourceApi from "@/lib/api/resourceApi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux-store/store/store";
import { createPage } from "@/redux-store/slices/pageSlice";
import { PageType } from "@/types/enum/enum";

const TextEditor = dynamic(() => import("../../text-editor/text-editor"), {
  ssr: false,
});

const PageForm = () => {
  const [form] = Form.useForm();
  const [imageFile, setImageFile] = useState<MediaFile | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<MediaFile | null>(null);
  const [imageList, setImageList] = useState<any[]>([]);
  const [coverImageList, setCoverImageList] = useState<any[]>([]);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  /** handle file upload */
  const handleFileUpload = async (
    rawFile: File,
    type: "image" | "cover",
  ): Promise<void> => {
    const formData = new FormData();
    formData.append("file", rawFile);

    try {
      if (type === "image") setUploadingImage(true);
      if (type === "cover") setUploadingCover(true);

      const res = await resourceApi.createResource(formData);

      if (res) {
        if (type === "image") {
          setImageFile(res);
          setImageList([
            { uid: res.uid, name: res.name, status: "done", url: res.url },
          ]);
        } else {
          setCoverImageFile(res);
          setCoverImageList([
            { uid: res.uid, name: res.name, status: "done", url: res.url },
          ]);
        }
        message.success(
          `${type === "image" ? "Image" : "Cover image"} uploaded successfully!`,
        );
      } else {
        message.error(`${type} upload failed`);
      }
    } catch (error) {
      console.error(error);
      message.error("File upload failed");
    } finally {
      if (type === "image") setUploadingImage(false);
      if (type === "cover") setUploadingCover(false);
    }
  };

  /** beforeUpload factory */
  const makeBeforeUpload =
    (type: "image" | "cover") =>
    async (file: File): Promise<string | void> => {
      const isValidType = [
        "image/jpeg",
        "image/png",
        "image/jpg",
        "image/webp",
      ].includes(file.type);

      if (!isValidType) {
        message.error("You can only upload JPG, JPEG, PNG, or WEBP files!");
        return Upload.LIST_IGNORE;
      }

      await handleFileUpload(file, type);
      return Upload.LIST_IGNORE;
    };

  /** form submit */
  const onFinish = (values: any) => {
    if (!imageFile || !coverImageFile) {
      message.error(
        "Please upload both Image and Cover Image before submitting",
      );
      return;
    }

    const payload: PagePayload = {
      title: values.title,
      shortTitle: values?.shortTitle || "",
      description: values.description || "",
      parentId: values?.parentId ? Number(values.parentId) : 0,
      image: imageFile,
      cover_image: coverImageFile,
      order: values?.order ? Number(values.order) : 0,
      isMenu: values?.isMenu ? 1 : 0,
      isMainMenu: values?.isMainMenu ? 1 : 0,
      isFooterMenu: values?.isFooterMenu ? 1 : 0,
      page_template: values?.page_template,
    };
    console.log("payload", payload);

    dispatch(
      createPage({
        type: values?.type,
        data: payload,
      }),
    );
  };

  return (
    <div className="h-full dark:bg-[#020D1A]">
      <Form
        form={form}
        name="page-form"
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          status: true,
          isMenu: false,
          isMainMenu: false,
          isFooterMenu: false,
          parentId: 0,
        }}
      >
        <Row gutter={16}>
          {/* TITLE */}
          <Col xs={24}>
            <Form.Item
              label={<span className="uppercase dark:text-white">title</span>}
              name="title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input
                onChange={(e) => {
                  const value = e.target.value;
                  form.setFieldsValue({
                    slug: generateSlug(value),
                  });
                }}
                className="bg-transparent"
              />
            </Form.Item>
          </Col>

          {/* IMAGE */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="IMAGE" required>
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

          {/* COVER IMAGE */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="COVER IMAGE" required>
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
          {/* ORDER */}
          <Col xs={24} md={8}>
            <Form.Item
              label={
                <span className="uppercase dark:text-white">order no.</span>
              }
              name="order"
            >
              <Input type="number" min={1} className="!bg-transparent" />
            </Form.Item>
          </Col>

          {/* TEMPLATE */}
          <Col xs={24} md={12}>
            <Form.Item
              label={
                <span className="uppercase dark:text-white">template</span>
              }
              name="page_template"
              rules={[{ required: true, message: "Template is required" }]}
            >
              <Select placeholder="Select a template" allowClear>
                {Object.values(PageTemplate).map((template) => (
                  <Select.Option key={template} value={template}>
                    {template}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* SHORT TITLE */}
          <Col xs={24} md={12}>
            <Form.Item
              label={
                <span className="uppercase dark:text-white">short title</span>
              }
              name="shortTitle"
            >
              <Input className="!bg-transparent" />
            </Form.Item>
          </Col>

          {/* PARENT PAGE */}
          <Col xs={24} md={12}>
            <Form.Item
              label={
                <span className="uppercase dark:text-white">parent page</span>
              }
              name="parentId"
            >
              <Select placeholder="Select parent page" allowClear>
                <Select.Option value={0}>No Parent</Select.Option>
                {/* You can fetch pages dynamically and map them here */}
              </Select>
            </Form.Item>
          </Col>
          {/*  PAGE TYPE*/}
          <Col xs={24} md={12}>
            <Form.Item
              label={
                <span className="uppercase dark:text-white">Page Type</span>
              }
              name="type"
            >
              <Select placeholder="Select page" allowClear>
                {Object.values(PageType).map((type) => (
                  <Select.Option key={type} value={type}>
                    {type}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* SHORT DESCRIPTION */}
          <Col span={24}>
            <Form.Item
              label={
                <span className="uppercase dark:text-white">
                  short description
                </span>
              }
              name="shortDescription"
            >
              <Input className="!bg-transparent" />
            </Form.Item>
          </Col>

          {/* DESCRIPTION */}
          <Col span={24}>
            <Form.Item
              label={
                <span className="uppercase dark:text-white">description</span>
              }
              name="description"
            >
              <TextEditor />
            </Form.Item>
          </Col>

          {/* CHECKBOXES */}
          <Col xs={12} md={6} lg={4}>
            <Form.Item
              label={<span className="dark:text-white">Status</span>}
              name="status"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>

          <Col xs={12} md={6} lg={4}>
            <Form.Item
              label={<span className="dark:text-white">Is Menu</span>}
              name="isMenu"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>

          <Col xs={12} md={6} lg={4}>
            <Form.Item
              label={<span className="dark:text-white">Is Main Menu</span>}
              name="isMainMenu"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>

          <Col xs={12} md={6} lg={4}>
            <Form.Item
              label={<span className="dark:text-white">Is Footer Menu</span>}
              name="isFooterMenu"
              valuePropName="checked"
            >
              <Checkbox />
            </Form.Item>
          </Col>

          {/* SUBMIT */}
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

export default PageForm;
