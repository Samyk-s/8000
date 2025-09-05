"use client";
import React, { useEffect } from "react";
import { Form, Input, Button, Row, Col, message, Upload } from "antd";
import Loader from "../../loader/loader";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import {
  createItinerary,
  updateItinerary,
} from "@/redux-store/slices/itinerarySlice";
import { useParams } from "next/navigation";
import { ItineraryItem } from "@/types/itinerary";
import { UploadOutlined } from "@ant-design/icons";
import TextArea from "antd/es/input/TextArea";

const ReviewForm = ({
  setIsModalOpen,
  itinerary,
}: {
  setIsModalOpen: (val: boolean) => void;
  itinerary?: ItineraryItem | null;
}) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { loading } = useSelector((state: RootState) => state.itineraries);

  // Prefill or reset form when editing/creating
  useEffect(() => {
    if (itinerary) {
      form.setFieldsValue(itinerary);
    } else {
      form.resetFields();
    }
  }, [itinerary, form]);

  const onFinish = async (values: ItineraryItem) => {
    try {
      const payload = {
        ...values,
        order: Number(values?.order),
        maxAltitude: Number(values?.maxAltitude),
      };

      if (itinerary) {
        // Update
        await dispatch(
          updateItinerary({
            packageId: Number(id),
            itineraryId: Number(itinerary.id),
            data: payload,
          }),
        );
        message.success("Itinerary updated successfully!");
      } else {
        // Create
        await dispatch(
          createItinerary({
            id: Number(id),
            data: payload,
          }),
        );
        message.success("Itinerary created successfully!");
      }

      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      console.error("Failed to save itinerary:", error);
      message.error("Failed to save itinerary");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="h-full dark:bg-[#020D1A]">
      <Form
        form={form}
        name="itinerary-form"
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
      >
        <Row gutter={16}>
          {/* Full Name*/}
          <Col xs={24} md={12}>
            <Form.Item
              label={<span className="uppercase dark:text-white">Day</span>}
              name="fullName"
              rules={[{ required: true, message: "Fullname is required" }]}
            >
              <Input className="bg-transparent" />
            </Form.Item>
          </Col>

          {/* TITLE */}
          <Col xs={24} md={12}>
            <Form.Item
              label={
                <span className="uppercase dark:text-white">short Title</span>
              }
              name="shortTitle"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input className="bg-transparent" />
            </Form.Item>
          </Col>
          {/* Image Upload */}
          <Col xs={24} md={12} lg={6}>
            <Form.Item
              label="IMAGE"
              name="file"
              rules={[{ required: true, message: "Cover image is required" }]}
            >
              <Upload
                beforeUpload={(file) => {
                  // handleFileUpload(file);
                  return false; // prevent default upload
                }}
                listType="picture"
                accept=".jpg,.jpeg,.png,.webp"
                maxCount={1}
                // fileList={fileList}
                // onChange={({ fileList }) => setFileList(fileList)}
              >
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
          {/* rating */}
          <Col xs={24} md={12} lg={9}>
            <Form.Item
              label={<span className="uppercase dark:text-white">rating</span>}
              name="raitng"
              rules={[{ required: true, message: "Rating is required" }]}
            >
              <Input className="bg-transparent" type="number" />
            </Form.Item>
          </Col>

          {/* ORDER */}
          <Col xs={24} md={12} lg={9}>
            <Form.Item
              label={<span className="uppercase dark:text-white">Order</span>}
              name="order"
              rules={[{ required: true, message: "Order is required" }]}
            >
              <Input className="bg-transparent" type="number" />
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

          {/* SUBMIT */}
          <Col span={24}>
            <Form.Item>
              <Button
                htmlType="submit"
                type="default"
                className="!bg-black !text-white hover:!bg-black hover:!text-white dark:!bg-white dark:!text-black"
              >
                {itinerary ? "Update" : "Save"}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default ReviewForm;
