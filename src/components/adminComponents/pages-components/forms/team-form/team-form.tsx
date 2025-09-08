"use client";
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Upload,
  message,
  Select,
  Checkbox,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dynamic from "next/dynamic";
import resourceApi from "@/lib/api/resourceApi";
import { MediaFile } from "@/types/utils-type";
import Loader from "../../loader/loader";
import { PageTemplate } from "@/types/page-template";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { createTeam } from "@/redux-store/slices/teamSlice";
import { TeamCatgoryItem, TeamPayload } from "@/types/teams";
import { fetchTeamsCategories } from "@/redux-store/slices/teamCategorySlice";

const TextEditor = dynamic(() => import("../../text-editor/text-editor"), {
  ssr: false,
});

const TeamForm = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // Separate states for each file
  const [image, setImage] = useState<MediaFile | null>(null);
  const [coverImage, setCoverImage] = useState<MediaFile | null>(null);
  const [bioData, setBioData] = useState<MediaFile | null>(null);

  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const { items, meta } = useSelector(
    (state: RootState) => state?.teamsCategory,
  );
  // ================= Handle file upload =================
  const handleFileUpload = async (
    rawFile: File,
    setter: (file: MediaFile) => void,
  ) => {
    const formData = new FormData();
    formData.append("file", rawFile);

    try {
      setUploading(true);
      const res = await resourceApi.createResource(formData);
      setUploading(false);

      if (res) {
        setter(res);
        message.success("File uploaded successfully!");
      } else {
        message.error("File upload failed");
      }
    } catch (error) {
      console.error(error);
      setUploading(false);
      message.error("File upload failed");
    }
    return false; // prevent auto upload
  };

  // ================= Submit =================
  const onFinish = async (values: any) => {
    const payload: TeamPayload = {
      name: values.name,
      categoryId: values.page_id,
      post: values.post,
      image: image as MediaFile,
      coverImage: coverImage as MediaFile,
      bioData: bioData as MediaFile,
      description: values.description,
      email: values.email,
      phoneNo: values.phoneNo,
      fbLink: values.fbLink,
      instagramLink: values.instagramLink,
      twitter: values.twitter,
      linkedIn: values.linkedIn,
      youtube: values.youtube,
      order: Number(values.order),
      status: values.status ? 1 : 0,
    };

    dispatch(createTeam({ values: payload }));
  };

  useEffect(() => {
    dispatch(fetchTeamsCategories({}));
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <div className="h-full dark:bg-[#020D1A]">
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
              label={
                <span className="uppercase dark:text-white">Full Name</span>
              }
              name="name"
              rules={[{ required: true, message: "Fullname is required" }]}
            >
              <Input className="bg-transparent" />
            </Form.Item>
          </Col>
          {/* POST */}
          <Col xs={24} md={12}>
            <Form.Item
              label={<span className="uppercase dark:text-white">Post</span>}
              name="post"
              rules={[{ required: true, message: "Post is required" }]}
            >
              <Input className="bg-transparent" />
            </Form.Item>
          </Col>

          {/* IMAGE */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label={<span className="uppercase dark:text-white">Image</span>}
              name="image"
              rules={[{ required: true, message: "Image is required" }]}
            >
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
              >
                <Button
                  className="bg-transparent dark:text-white"
                  icon={<UploadOutlined />}
                  loading={uploading}
                >
                  Upload Image
                </Button>
              </Upload>
            </Form.Item>
          </Col>

          {/* COVER IMAGE */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label={
                <span className="uppercase dark:text-white">Cover Image</span>
              }
              name="coverImage"
              rules={[{ required: true, message: "Cover image is required" }]}
            >
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
              >
                <Button
                  className="bg-transparent dark:text-white"
                  icon={<UploadOutlined />}
                  loading={uploading}
                >
                  Upload Cover
                </Button>
              </Upload>
            </Form.Item>
          </Col>

          {/* BIO DATA */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label={
                <span className="uppercase dark:text-white">Bio Data</span>
              }
              name="bioData"
              rules={[{ required: true, message: "Bio data is required" }]}
            >
              <Upload
                beforeUpload={(file) => {
                  // reject video files
                  if (file.type.startsWith("video/")) {
                    message.error("Video files are not allowed");
                    return Upload.LIST_IGNORE;
                  }
                  return handleFileUpload(file, setBioData);
                }}
                maxCount={1}
                fileList={
                  bioData
                    ? [
                        {
                          uid: bioData.uid,
                          name: bioData.name,
                          url: bioData.url,
                        },
                      ]
                    : []
                }
              >
                <Button
                  className="bg-transparent dark:text-white"
                  icon={<UploadOutlined />}
                  loading={uploading}
                >
                  Upload Bio Data
                </Button>
              </Upload>
            </Form.Item>
          </Col>

          {/* CATEGORY */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label={
                <span className="uppercase dark:text-white">Category</span>
              }
              name="page_id"
              rules={[{ required: true, message: "Template is required" }]}
            >
              <Select
                placeholder="Select a template"
                allowClear
                className="!bg-transparent"
              >
                {items?.map((item: TeamCatgoryItem) => (
                  <Select.Option value={item?.id}>{item?.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>

          {/* EMAIL */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label={<span className="uppercase dark:text-white">Email</span>}
              name="email"
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input className="bg-transparent" type="email" />
            </Form.Item>
          </Col>

          {/* PHONE */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label={<span className="uppercase dark:text-white">Phone</span>}
              name="phoneNo"
              rules={[{ required: true, message: "Phone is required" }]}
            >
              <Input className="bg-transparent" />
            </Form.Item>
          </Col>

          {/* SOCIAL LINKS */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Facebook" name="fbLink">
              <Input className="bg-transparent" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Instagram" name="instagramLink">
              <Input className="bg-transparent" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="Twitter" name="twitter">
              <Input className="bg-transparent" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="LinkedIn" name="linkedIn">
              <Input className="bg-transparent" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12} lg={8}>
            <Form.Item label="YouTube" name="youtube">
              <Input className="bg-transparent" />
            </Form.Item>
          </Col>

          {/* ORDER */}
          <Col xs={24} md={12} lg={8}>
            <Form.Item
              label="Order"
              name="order"
              rules={[{ required: true, message: "Order is required" }]}
            >
              <Input className="bg-transparent" type="number" />
            </Form.Item>
          </Col>

          {/* DESCRIPTION */}
          <Col span={24}>
            <Form.Item
              label={
                <span className="uppercase dark:text-white">Description</span>
              }
              name="description"
              rules={[{ required: true, message: "Description is required" }]}
            >
              <TextEditor />
            </Form.Item>
          </Col>

          {/* STATUS */}
          <Col span={8}>
            <Form.Item
              label="Status"
              name="status"
              valuePropName="checked"
              rules={[{ required: true, message: "Status is required" }]}
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
                SAVE
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default TeamForm;
