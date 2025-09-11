"use client";

import { Card, List, Typography } from "antd";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Packages = () => {
  return (
    <Card>
      <div className="flex flex-col gap-3">
        {/* Header link */}
        <div className="flex items-center justify-between rounded bg-yellow-700 p-2">
          <Typography.Title level={4} className="!text-md !text-white">
            Bookings & Contacts
          </Typography.Title>
          <span className="text-sm font-semibold text-white">
            Highest booking package
          </span>
        </div>
        <div>
          <List
            dataSource={[
              {
                id: "1",
                label: "Pacakge Name",
                total: 10,
                url: "/admin/bookings",
                image: "/images/broken/broken.png",
              },
              {
                id: "2",
                label: "Pacakge Name",
                total: 20,
                url: "/admin/inquires/type",
                image: "/images/broken/broken.png",
              },
            ]}
            renderItem={(item) => (
              <List.Item key={item.id}>
                <Link href={item.url} className="block w-full">
                  <div>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 overflow-hidden rounded">
                        <Image
                          src={item?.image as string}
                          alt={item?.label}
                          width={1080}
                          height={720}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 items-center justify-between gap-3">
                        <div>
                          <div className="text-[12px] font-semibold text-gray-600">
                            {item?.label}
                          </div>
                          <div className="font-semibold text-gray-600">
                            Total Booking
                          </div>
                        </div>
                        <div className="font-semibold text-gray-600">
                          {item?.total}
                        </div>
                      </div>
                    </div>
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

export default Packages;
