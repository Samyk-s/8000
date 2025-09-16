import React, { FC } from "react";
import { Pagination as AntPagination } from "antd";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
  onPageChange: (page: number, pageSize: number) => void;
  className?: string;
}

const Pagination: FC<PaginationProps> = ({
  currentPage,
  totalPages,
  itemsPerPage,
  totalItems,
  onPageChange,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-between px-6 py-4 sm:flex-row ${className} border-t`}
    >
      {/* Info text */}
      <div className="mb-2 text-sm text-gray-700 dark:text-white sm:mb-0">
        Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
        entries
      </div>

      {/* Ant Design Pagination */}
      <AntPagination
        current={currentPage}
        total={totalItems}
        pageSize={itemsPerPage}
        onChange={onPageChange}
        showSizeChanger={false}
        // showQuickJumper
        showLessItems
      />
    </div>
  );
};

export default Pagination;
