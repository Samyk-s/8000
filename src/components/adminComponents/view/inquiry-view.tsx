"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { getInquiry } from "@/redux-store/slices/inquirySlice";
import { Col, Row, Typography } from "antd";

interface InquiryViewProps {
  id: number;
}

const InquiryView: React.FC<InquiryViewProps> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { inquiry } = useSelector((state: RootState) => state.inquiries);
  useEffect(() => {
    if (id) {
      dispatch(getInquiry(id));
    }
  }, [id, dispatch]);

  if (!inquiry) {
    return <Typography.Text type="warning">No inquiry found.</Typography.Text>;
  }

  return (
    <div>
      <Row gutter={[16, 16]}>
        <Col xs={24} md={12}>
          <strong className="block text-gray-600">Name</strong>
          <span className="text-gray-500">{inquiry?.name}</span>
        </Col>
        <Col xs={24} md={12}>
          <strong className="block text-gray-600">Email</strong>
          <span className="text-gray-500">{inquiry?.email}</span>
        </Col>
        <Col xs={24} md={12}>
          <strong className="block text-gray-600">Phone</strong>
          <span className="text-gray-500">{inquiry?.phoneNumber}</span>
        </Col>
        <Col xs={24} md={12}>
          <strong className="block text-gray-600">Date of Inquiry</strong>
          <span className="text-gray-500">
            {new Date(inquiry?.createdAt).toLocaleString()}
          </span>
        </Col>
        <Col xs={24}>
          <strong className="block text-gray-600">Message</strong>
          <p className="text-gray-500">{inquiry.message}</p>
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(InquiryView);
