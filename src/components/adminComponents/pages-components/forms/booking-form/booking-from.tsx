"use client";

import React, { useEffect } from "react";
import { Form, Input, Button, Row, Col, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { PackageItem } from "@/types/package";
import { fetchPackages } from "@/redux-store/slices/packageSlice";
import {
  fetchBookingById,
  updateBooking,
} from "@/redux-store/slices/bookinSlice";
import { BookingPayload } from "@/types/booking";
import { useRouter } from "next/navigation";
import Loader from "../../loader/loader";
import { BookingStatus } from "@/types/enum/enum";

const { Option } = Select;

const BookingForm = ({ id }: { id: number }) => {
  const [form] = Form.useForm();
  const { items, loading } = useSelector((state: RootState) => state.packges);
  const { booking, loading: loading1 } = useSelector(
    (state: RootState) => state.bookings,
  );
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const onFinish = (values: BookingPayload) => {
    dispatch(
      updateBooking({
        id: Number(id),
        data: values,
      }),
    );
    router.push("/admin/bookings");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    message.error("Please fill all required fields.");
  };

  useEffect(() => {
    dispatch(fetchPackages());
    dispatch(fetchBookingById(id));
  }, [id, dispatch]);

  // set initial form values when booking is loaded
  useEffect(() => {
    if (booking) {
      form.setFieldsValue({
        ...booking,
        packageId: booking?.package?.id,
        addonIds: booking?.addons?.map((a: any) => a.id),
      });
    }
  }, [booking, form]);

  if (loading || loading1) return <Loader />;

  return (
    <div>
      <Form
        form={form}
        name="update-booking"
        autoComplete="off"
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={[16, 10]}>
          {/* customer name */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Customer Name"
              name="customerName"
              rules={[{ required: true, message: "Customer name is required" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          {/* Customer email */}
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

          {/* Customer phone number */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Customer Phone"
              name="customerPhone"
              rules={[
                { required: true, message: "Customer phone is required" },
                {
                  pattern: /^\+?[0-9]{7,15}$/,
                  message: "Please enter a valid phone number (+9779800000000)",
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

          {/* No. of Travellers */}
          <Col xs={24} md={12}>
            <Form.Item
              label="No. of Travellers"
              name="noOfTravellers"
              rules={[
                { required: true, message: "No. of travellers is required" },
              ]}
            >
              <Input type="number" />
            </Form.Item>
          </Col>

          {/* arrivalDate */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Arrival Date"
              name="arrivalDate"
              rules={[{ required: true, message: "Arrival date is required" }]}
            >
              <Input type="date" />
            </Form.Item>
          </Col>

          {/* departureDate */}
          <Col xs={24} md={12}>
            <Form.Item
              label="Departure Date"
              name="departureDate"
              rules={[
                { required: true, message: "Departure date is required" },
              ]}
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
                {items?.map((item: PackageItem) => (
                  <Option key={item?.id} value={item?.id}>
                    {item?.title}
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
                  <Option value={addon?.id}>{addon?.title}</Option>
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
                <Option value={BookingStatus.PEDNDING}>
                  {BookingStatus.PEDNDING}
                </Option>
                <Option value={BookingStatus.CONFIRMED}>
                  {BookingStatus.CONFIRMED}
                </Option>
                <Option value={BookingStatus.COMPLETED}>
                  {BookingStatus.COMPLETED}
                </Option>
                <Option value={BookingStatus.CANCELLED}>
                  {BookingStatus.CANCELLED}
                </Option>
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
    </div>
  );
};

export default BookingForm;
