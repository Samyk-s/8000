"use client";
import { fetchBooking } from "@/redux-store/slices/bookinSlice";
import { fetchInquiries } from "@/redux-store/slices/inquirySlice";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { Card, List, Typography } from "antd";
import Link from "next/link";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const BookingContact = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    meta: { totalItems: totalBooking },
  } = useSelector((state: RootState) => state.bookings);
  const {
    meta: { totalItems: totalInquiries },
  } = useSelector((state: RootState) => state.bookings);
  useEffect(() => {
    dispatch(
      fetchBooking({
        params: {},
      }),
    );
    dispatch(
      fetchInquiries({
        params: {
          search: "general",
        },
      }),
    );
  }, [dispatch]);
  return (
    <Card>
      <div className="flex flex-col gap-3">
        {/* Header link */}
        <div className="flex items-center justify-between rounded bg-red-700 p-2">
          <Typography.Title level={4} className="!text-md !text-white">
            Bookings & Contacts
          </Typography.Title>
          <span className="text-sm font-semibold text-white">
            Bookigs, Inquiries
          </span>
        </div>
        <div>
          <List
            dataSource={[
              {
                id: "1",
                label: "Total Booking",
                total: totalBooking || 0,
                url: "/admin/bookings",
              },
              {
                id: "2",
                label: "Total Inquiries",
                total: totalInquiries || 0,
                url: "/admin/inquires?type=general",
              },
            ]}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <Link href={item.url} className="block w-full">
                  <div className="b flex w-full justify-between font-semibold text-gray-400">
                    <span>{item?.label}</span>
                    <span>{item?.total}</span>
                  </div>
                </Link>
              </List.Item>
            )}
          />
        </div>
      </div>
    </Card>
  );
};

export default BookingContact;
