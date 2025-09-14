"use client";

import React, { useEffect, useState } from "react";
import { message, Transfer } from "antd";
import type { TransferItem } from "antd/es/transfer";
import type { Key } from "react";
import type { TransferDirection } from "antd/es/transfer";
import pageApi from "@/lib/api/pageApi";

interface PagePathItem {
  pathIds: number[];
  path: string;
  fullPath: string;
  isIndividual: boolean;
}

interface CreatePackageTransferProps {
  value?: number[];
  onChange?: (value: number[]) => void;
}

const CreatePackageTransfer: React.FC<CreatePackageTransferProps> = ({
  value = [],
  onChange,
}) => {
  const [dataSource, setDataSource] = useState<TransferItem[]>([]);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const res: PagePathItem[] = await pageApi.getParentPagePath();

        const mapped: TransferItem[] = res
          .filter((p) => p.isIndividual) // only selectable items
          .map((p) => ({
            key: p.pathIds[p.pathIds.length - 1].toString(), // last id
            title: p.fullPath, // show hierarchy
          }));

        setDataSource(mapped);
      } catch (err: any) {
        message.error(err.message);
        // console.error("Failed to fetch pages", err);
      }
    };
    fetchPages();
  }, []);

  const handleChange = (
    targetKeys: Key[],
    _direction: TransferDirection,
    _moveKeys: Key[],
  ) => {
    const ids = targetKeys.map((k) => Number(k));
    onChange?.(ids);
  };

  return (
    <Transfer<TransferItem>
      className="custom-transfer"
      dataSource={dataSource}
      titles={["Available Pages", "Selected Pages"]}
      targetKeys={value.map((id) => id.toString())}
      onChange={handleChange}
      showSearch
      filterOption={(inputValue, item) =>
        (item.title as string).toLowerCase().includes(inputValue.toLowerCase())
      }
      render={(item) => item.title as string}
      listStyle={{ width: "45%", height: 300 }}
    />
  );
};

export default CreatePackageTransfer;
