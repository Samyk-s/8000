import React, { FC } from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  separator?: string;
  className?: string;
}

const Breadcrumbs: FC<BreadcrumbsProps> = ({
  items,
  separator = ">",
  className = "",
}) => {
  return (
    <nav
      className={`text-sm text-gray-500 ${className}`}
      aria-label="breadcrumb"
    >
      <ol className="list-reset flex">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center">
              {isLast ? (
                <span className="text-gray-700 dark:text-white">
                  {item.label}
                </span>
              ) : (
                <a href={item.href} className="text-blue-600 hover:underline">
                  {item.label}
                </a>
              )}
              {!isLast && (
                <span className="mx-2 dark:text-white">{separator}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
