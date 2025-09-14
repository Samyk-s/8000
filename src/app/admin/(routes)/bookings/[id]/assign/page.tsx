"use client";

import React, { useEffect } from "react";
import { Form, Button, Row, Col, Select, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { assignBooking } from "@/redux-store/slices/bookinSlice";
import { useParams, useRouter } from "next/navigation";
import Loader from "@/components/adminComponents/pages-components/loader/loader";
import { fetchTeams } from "@/redux-store/slices/teamSlice";

const { Option } = Select;

const AssignPage = () => {
  const [form] = Form.useForm();
  const { items, loading } = useSelector((state: RootState) => state.teams);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams();

  const onFinish = (values: { teamId: number }) => {
    dispatch(
      assignBooking({
        bookingId: Number(id),
        teamId: Number(values?.teamId),
      }),
    );
    router.push("/admin/bookings");
  };

  const onFinishFailed = (errorInfo: any) => {
    // console.log("Failed:", errorInfo);
    message.error("Please fill all required fields.");
  };

  useEffect(() => {
    dispatch(
      fetchTeams({
        params: {},
      }),
    );
  }, [id, dispatch]);

  if (loading) return <Loader />;

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
          <Col xs={24}>
            <Form.Item
              label="Assign Team Member"
              name="teamId"
              rules={[{ required: true, message: "Team member is required" }]}
            >
              <Select placeholder="Select Team Member">
                {items?.map((item) => (
                  <Option value={item?.id} key={item?.id}>
                    {item?.name}
                  </Option>
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
            Assign
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AssignPage;
