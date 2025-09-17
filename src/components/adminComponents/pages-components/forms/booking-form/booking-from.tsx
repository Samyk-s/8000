"use client";
import React from "react";
import { Form, Input, Button, Row, Col, Select } from "antd";
import Loader from "../../loader/loader";
import { useRouter } from "next/navigation";
import { useBookingForm } from "@/hooks/booking/useBookingForm";
import { BookingStatus } from "@/types/enum/enum";

const { Option } = Select;

const BookingForm = ({ id }: { id: number }) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const { packages, booking, loading, onFinish, onFinishFailed } =
    useBookingForm(form, id, () => router.back());

  if (loading) return <Loader />;

  return (
    <Form
      form={form}
      name="update-booking"
      autoComplete="off"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Row gutter={[16, 10]}>
        {/* Customer Name */}
        <Col xs={24} md={12}>
          <Form.Item
            label="Customer Name"
            name="customerName"
            rules={[{ required: true, message: "Customer name is required" }]}
          >
            <Input />
          </Form.Item>
        </Col>

        {/* Customer Email */}
        <Col xs={24} md={12}>
          <Form.Item
            label="Customer Email"
            name="customerEmail"
            rules={[
              { required: true, message: "Customer email is required" },
              {
                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Please enter a valid email address",
              },
            ]}
          >
            <Input type="email" />
          </Form.Item>
        </Col>

        {/* Customer Phone */}
        <Col xs={24} md={12}>
          <Form.Item
            label="Customer Phone"
            name="customerPhone"
            rules={[
              { required: true, message: "Customer phone is required" },
              {
                pattern: /^\+?[0-9]{7,15}$/,
                message: "Please enter a valid phone number",
              },
            ]}
          >
            <Input type="text" />
          </Form.Item>
        </Col>

        {/* Customer Address */}
        <Col xs={24} md={12}>
          <Form.Item
            label="Customer Address"
            name="customerAddress"
            rules={[
              { required: true, message: "Customer address is required" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>

        {/* Number of Travellers */}
        <Col xs={24} md={12}>
          <Form.Item
            label="No. of Travellers"
            name="noOfTravellers"
            rules={[
              { required: true, message: "No. of travellers is required" },
            ]}
          >
            <Input type="number" min={1} />
          </Form.Item>
        </Col>

        {/* Arrival Date */}
        <Col xs={24} md={12}>
          <Form.Item
            label="Arrival Date"
            name="arrivalDate"
            rules={[{ required: true, message: "Arrival date is required" }]}
          >
            <Input type="date" />
          </Form.Item>
        </Col>

        {/* Departure Date */}
        <Col xs={24} md={12}>
          <Form.Item
            label="Departure Date"
            name="departureDate"
            rules={[{ required: true, message: "Departure date is required" }]}
          >
            <Input type="date" />
          </Form.Item>
        </Col>

        {/* Package */}
        <Col xs={24} md={12}>
          <Form.Item
            label="Package"
            name="packageId"
            rules={[{ required: true, message: "Package is required" }]}
          >
            <Select
              placeholder="Select a Package"
              allowClear
              className="!bg-transparent"
            >
              {packages?.map((pkg) => (
                <Option key={pkg.id} value={pkg.id}>
                  {pkg.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        {/* Addons */}
        <Col xs={24} md={12}>
          <Form.Item label="Add Ons" name="addonIds">
            <Select
              mode="multiple"
              placeholder="Select Addons"
              allowClear
              className="!bg-transparent"
            >
              {booking?.addons?.map((addon) => (
                <Option value={addon.id} key={addon.id}>
                  {addon.title}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>

        {/* Status */}
        <Col xs={24} md={12}>
          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Status is required" }]}
          >
            <Select placeholder="Select status">
              {Object.values(BookingStatus).map((status) => (
                <Select.Option key={status} value={status}>
                  {status}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      {/* Submit Button */}
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="w-fit bg-black text-white hover:!bg-black hover:!text-white"
        >
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BookingForm;
