// lib/utils/bookingUtils.ts

import { BookingStatus } from '@/types/enum/enum';

/**
 * Format a date string to "MMM DD, YYYY" format.
 */
export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Get CSS classes for a booking status badge.
 */
export const getStatusBadgeClasses = (status: BookingStatus): string => {
  const statusClasses: Record<BookingStatus, string> = {
    pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    confirmed: 'bg-green-100 text-green-800 border-green-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
    completed: 'bg-blue-100 text-blue-800 border-blue-200',
  };

  return statusClasses[status];
};

/**
 * Get CSS classes for viewed/unviewed badge.
 * @param isViewed - 0 (unviewed) or 1 (viewed)
 */
export const getViewedBadgeClasses = (isViewed: 0 | 1): string => {
  return isViewed
    ? 'bg-blue-100 text-blue-800 border-blue-200'
    : 'bg-gray-100 text-gray-800 border-gray-200';
};

/**
 * Get text for viewed/unviewed badge.
 */
export const getViewedBadgeText = (isViewed: 0 | 1): string => {
  return isViewed ? 'Viewed' : 'New';
};

/**
 * Capitalize first letter of a string.
 */
export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
