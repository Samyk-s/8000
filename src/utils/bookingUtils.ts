// lib/utils/bookingUtils.ts

import { BookingStatus, ViewedStatus } from '@/types/booking';

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const getStatusBadgeClasses = (status: BookingStatus): string => {
  const statusClasses: Record<BookingStatus, string> = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    confirmed: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200'
  };
  
  return statusClasses[status];
};

export const getViewedBadgeClasses = (isViewed: ViewedStatus): string => {
  return isViewed 
    ? 'bg-blue-100 text-blue-800 border-blue-200' 
    : 'bg-gray-100 text-gray-800 border-gray-200';
};

export const getViewedBadgeText = (isViewed: ViewedStatus): string => {
  return isViewed ? 'Viewed' : 'New';
};

export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};