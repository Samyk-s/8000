"use client";
import React, { useState } from "react";
import { Form, Input, Button, Row, Col, message, Upload } from "antd";
import Loader from "../../loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { createReview } from "@/redux-store/slices/reviewSlice";
import { useParams, useRouter } from "next/navigation";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";
import resourceApi from "@/lib/api/resourceApi";
import { MediaFile } from "@/types/utils-type";

const ReviewForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { loading } = useSelector((state: RootState) => state.itineraries);

  const [fileList, setFileList] = useState<any[]>([]);
  const [file, setFile] = useState<MediaFile | null>(null);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  // Handle file upload
  const handleFileUpload = async (rawFile: File) => {
    const formData = new FormData();
    formData.append("file", rawFile);

    try {
      setUploading(true);
      const res: MediaFile = await resourceApi.createResource(formData);
      setUploading(false);

      if (res) {
        setFile(res);
        setFileList([
          {
            uid: res.uid,
            name: res.name,
            status: "done",
            url: res.url,
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

  const onFinish = async (values: any) => {
    if (!file) {
      message.error("Please upload an image before submitting");
      return;
    }

    const payload = {
      fullName: values.fullName,
      email: values.email,
      country: values.country,
      rating: Number(values.rating),
      image: {
        uid: file.uid,
        name: file.name,
        url: file.url,
        alt: file.alt,
        type: file.type,
        size: file.size,
      },
      shortTitle: values.shortTitle,
      review: values.review,
    };

    dispatch(
      createReview({
        id: Number(id),
        data: payload,
      }),
    );
    form.resetFields();
    router.back();
  };

  if (loading) return <Loader />;

  return (
    <div className="h-full dark:bg-[#020D1A]">
      <Form
        form={form}
        name="review-form"
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={16}>
          {/* Full Name */}
          <Col xs={24} md={12}>
            <Form.Item
              label={
                <span className="uppercase dark:text-white">Full Name</span>
              }
              name="fullName"
              rules={[{ required: true, message: "Fullname is required" }]}
            >
              <Input className="bg-transparent" />
            </Form.Item>
          </Col>

          {/* Email */}
          <Col xs={24} md={12}>
            <Form.Item
              label={<span className="uppercase dark:text-white">Email</span>}
              name="email"
              rules={[{ required: true, message: "Email is required" }]}
            >
              <Input type="email" className="bg-transparent" />
            </Form.Item>
          </Col>

          {/* Country */}
          <Col xs={24} md={12}>
            <Form.Item
              label={<span className="uppercase dark:text-white">Country</span>}
              name="country"
              rules={[{ required: true, message: "Country is required" }]}
            >
              <Input className="bg-transparent" />
            </Form.Item>
          </Col>

          {/* Short Title */}
          <Col xs={24} md={12}>
            <Form.Item
              label={
                <span className="uppercase dark:text-white">Short Title</span>
              }
              name="shortTitle"
              rules={[{ required: true, message: "Short Title is required" }]}
            >
              <Input className="bg-transparent" />
            </Form.Item>
          </Col>

          {/* Image Upload */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Image"
              name="image"
              rules={[{ required: true, message: "Image is required" }]}
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
                <Button icon={<UploadOutlined />} loading={uploading}>
                  Click to Upload
                </Button>
              </Upload>
            </Form.Item>
          </Col>

          {/* Rating */}
          <Col xs={24} md={12}>
            <Form.Item
              label={<span className="uppercase dark:text-white">Rating</span>}
              name="rating"
              rules={[{ required: true, message: "Rating is required" }]}
            >
              <Input className="bg-transparent" type="number" min={1} max={5} />
            </Form.Item>
          </Col>

          {/* Review */}
          <Col xs={24}>
            <Form.Item
              label={<span className="uppercase dark:text-white">Review</span>}
              name="review"
              rules={[{ required: true, message: "Review is required" }]}
            >
              <TextArea rows={5} className="bg-transparent" />
            </Form.Item>
          </Col>

          {/* Submit */}
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

export default ReviewForm;
