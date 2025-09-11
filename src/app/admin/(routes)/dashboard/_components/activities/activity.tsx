"use client";
import { ActivityIcon } from "@/components/Layouts/sidebar/icons";
import { Card, Collapse, List, Typography } from "antd";
import Link from "next/link";
import React from "react";

const Activity = () => {
  const activities = [
    {
      key: "trekking",
      label: "Trekking",
      packages: [
        {
          id: "pkg-1",
          title: "Package name",
          count: 1,
          url: "/admin/dashboard",
        },
      ],
    },
    {
      key: "rafting",
      label: "Rafting",
      packages: [
        {
          id: "pkg-2",
          title: "Water Adventure",
          count: 3,
          url: "/admin/rafting",
        },
      ],
    },
  ];

  return (
    <Card>
      <div className="flex flex-col gap-3">
        {/* Header link */}
        <div className="flex items-center justify-between rounded bg-blue-600 p-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-orange-200 text-orange-500">
              <ActivityIcon />
            </div>
            <Typography.Title level={4} className="!text-md !text-white">
              Activities
            </Typography.Title>
          </div>
          <div className="lg:text-md text-sm font-semibold text-white">20</div>
        </div>

        {/* Collapse for categories */}
        <div className="flex flex-col gap-2 p-2">
          <Collapse
            items={activities.map((activity) => ({
              key: activity.key,
              label: activity.label,
              children: (
                <List
                  dataSource={activity.packages}
                  renderItem={(item) => (
                    <List.Item key={item.id} style={{ padding: 3 }}>
                      <Link href={item.url} className="block w-full">
                        <div className="b flex w-full justify-between font-semibold text-gray-400">
                          <span>{item.title}</span>
                          <span>{item.count}</span>
                        </div>
                      </Link>
                    </List.Item>
                  )}
                />
              ),
            }))}
            defaultActiveKey={[activities[0]?.key]} // open first by default
          />
          <div className="flex justify-end">
            <Link
              href={"/admin/activities"}
              className="w-fit font-semibold text-blue-400"
            >
              View All
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default Activity;
