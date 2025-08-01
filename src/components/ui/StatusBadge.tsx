// components/ui/StatusBadge.tsx

import React from 'react';
import { BookingStatus, ViewedStatus } from '@/types/booking';
import { 
  getStatusBadgeClasses, 
  getViewedBadgeClasses, 
  getViewedBadgeText, 
  capitalizeFirstLetter 
} from '@/utils/bookingUtils';

interface StatusBadgeProps {
  status: BookingStatus;
}

interface ViewedBadgeProps {
  isViewed: ViewedStatus;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadgeClasses(status)}`}>
    {capitalizeFirstLetter(status)}
  </span>
);

export const ViewedBadge: React.FC<ViewedBadgeProps> = ({ isViewed }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getViewedBadgeClasses(isViewed)}`}>
    {getViewedBadgeText(isViewed)}
  </span>
);