// components/ui/StatusBadge.tsx

import React from "react";
import { BookingStatus } from "@/types/enum/enum";
import {
  getStatusBadgeClasses,
  getViewedBadgeClasses,
  getViewedBadgeText,
  capitalizeFirstLetter,
} from "@/utils/bookingUtils";

interface StatusBadgeProps {
  status: BookingStatus;
}

interface ViewedBadgeProps {
  isViewed: 0 | 1;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => (
  <span
    className={`rounded-full border px-2 py-1 text-xs font-medium ${getStatusBadgeClasses(status)}`}
  >
    {capitalizeFirstLetter(status)}
  </span>
);

export const ViewedBadge: React.FC<ViewedBadgeProps> = ({
  isViewed,
}: {
  isViewed: 0 | 1;
}) => (
  <span
    className={`rounded-full border px-2 py-1 text-xs font-medium ${getViewedBadgeClasses(isViewed)}`}
  >
    {getViewedBadgeText(isViewed)}
  </span>
);
