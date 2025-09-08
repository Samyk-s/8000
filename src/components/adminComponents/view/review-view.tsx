"use client";
import { fetchReview } from "@/redux-store/slices/reviewSlice";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { Col, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../pages-components/loader/loader";

const ReviewView = ({ reviewId }: { reviewId: number }) => {
  const { loading, review } = useSelector(
    (state: RootState) => state.packgeReviews,
  );
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (reviewId) {
      dispatch(
        fetchReview({
          reviewId,
        }),
      );
    }
  }, [reviewId, dispatch]);
  if (loading) return <Loader />;
  return (
    <Row gutter={13}>
      <Col xs={24} md={12}>
        <strong className="block text-gray-600">Name</strong>
        <span className="text-gray-500">{review?.fullName}</span>
      </Col>
      <Col xs={24} md={12}>
        <strong className="block text-gray-600">Address</strong>
        <span className="text-gray-500">{review?.country}</span>
      </Col>
      <Col xs={24}>
        <strong className="block text-gray-600">Review</strong>
        <div className="block text-gray-500">{review?.review}</div>
      </Col>
    </Row>
  );
};

export default ReviewView;
