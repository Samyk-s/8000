"use client";
import { Card, Col, Row } from "antd";
import React, { useEffect } from "react";
import Activity from "./_components/activities/activity";
import BookingContact from "./_components/bookin-contact/booking-cotact";
import Packages from "./_components/packages/packages";
import {
  BlogsIcon,
  PackageIcon,
  TeamIcon,
} from "@/components/Layouts/sidebar/icons";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { fetchPackages } from "@/redux-store/slices/packageSlice";
import { fetchTeams } from "@/redux-store/slices/teamSlice";
import RecentBookingTable from "@/components/adminComponents/pages-components/tables/recent-booking-table";

const DashboardPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    meta: { totalItems: totalPackages },
  } = useSelector((state: RootState) => state.packges);
  const {
    meta: { totalItems: totalTeams },
  } = useSelector((state: RootState) => state.teams);
  useEffect(() => {
    dispatch(fetchPackages());
    dispatch(fetchTeams({}));
  }, [dispatch]);
  return (
    <div>
      <Row gutter={13}>
        <Col xs={24} md={12} lg={8}>
          <div className="flex flex-col gap-3">
            <Activity />
            <Card>
              <Link href={"/admin/packages"} className="block">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-green-200 text-green-500">
                      <PackageIcon />
                    </div>
                    <span className="font-semibold text-gray-600">
                      Total Packages
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">
                      {totalPackages || 0}
                    </span>
                  </div>
                </div>
              </Link>
            </Card>
            <Card>
              <Link href={"/admin/teams"} className="block">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-purple-200 text-purple-500">
                      <TeamIcon />
                    </div>
                    <span className="font-semibold text-gray-600">
                      Total Teams
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">
                      {totalTeams || 0}
                    </span>
                  </div>
                </div>
              </Link>
            </Card>
            <Card>
              <Link href={"/admin/blogs"} className="block">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded bg-orange-200 text-orange-500">
                      <BlogsIcon />
                    </div>
                    <span className="font-semibold text-gray-600">
                      Total Blogs
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-600">20</span>
                  </div>
                </div>
              </Link>
            </Card>
          </div>
        </Col>
        <Col xs={24} md={12} lg={16}>
          <Row gutter={13}>
            <Col xs={24} md={12}>
              <BookingContact />
            </Col>
            <Col xs={24} md={12}>
              <Packages />
            </Col>
            <Col xs={24}>
              <RecentBookingTable />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardPage;
