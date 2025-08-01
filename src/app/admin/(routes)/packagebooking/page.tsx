'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookingItem } from '@/types/booking';
import { useBookings } from '@/hooks/useBookings';
import { formatDate } from '@/utils/bookingUtils';
import { StatusBadge, ViewedBadge } from '@/components/ui/StatusBadge';
import {
  EyeIcon,
  EditIcon,
  TrashIcon,
  SearchIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  LoaderIcon
} from '@/components/icons/BookingIcons';
import { BookingDetailsModal } from './view/page';

const BookingTable: React.FC = () => {
  const router = useRouter();
  const {
    data,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    currentPage,
    itemsPerPage,
    handlePageChange,
    handleItemsPerPageChange,
    fetchBookings,
    deleteBooking,
  } = useBookings();

  const [viewingBookingId, setViewingBookingId] = useState<number | null>(null);

  const handleEdit = (id: number): void => {
    router.push(`/admin/packagebooking/editbooking?id=${id}`);
  };

  const handleDelete = async (id: number): Promise<void> => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      await deleteBooking(id);
      fetchBookings(currentPage, itemsPerPage, searchTerm);
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Error deleting booking');
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="flex items-center justify-center">
            <LoaderIcon />
            <span className="ml-2 text-gray-600">Loading bookings...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-red-600 text-center">
            <p className="text-lg font-semibold mb-2">Error Loading Bookings</p>
            <p className="text-sm">{error}</p>
            <button
              onClick={() => fetchBookings(currentPage, itemsPerPage, searchTerm)}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="p-1 min-h-screen">
        {/* Breadcrumb */}
        <div className="px-6 mb-4">
          <nav className="text-sm text-gray-500">
            <ol className="list-reset flex">
              <li>
                <a href="/admin/dashboard" className="text-blue-600 hover:underline">Dashboard</a>
              </li>
              <li><span className="mx-2">{'>'}</span></li>
              <li className="text-gray-700">Bookings</li>
            </ol>
          </nav>
        </div>

        <div className="bg-white rounded-lg shadow-sm ">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Management</h1>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Show</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                  className="border border-gray-300 rounded px-2 py-1 text-sm"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
                <span className="text-sm text-gray-700">entries</span>
              </div>
              <div className="w-full max-w-md flex items-center gap-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border focus:border-blue-300 px-3" role='search' tabIndex={0} aria-activedescendant='search-input'>
                <div className="text-gray-400">
                  <SearchIcon />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, phone, package, or status..."
                  className="w-full px-4 py-2 border-none outline-none focus:border-none focus:ring-0"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead
                style={{ backgroundColor: 'oklch(37.9% 0.146 265.522)' }}
                className="text-white"
              >
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Customer Name</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Package</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Created Date</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Viewed</th>
                  <th className="px-6 py-3 text-left text-sm font-medium uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {data.items && data.items.length > 0 ? (
                  data.items.map((item: BookingItem) => (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-base font-medium text-gray-900">{item.customerName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900">{item.customerPhone}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-base font-medium text-gray-900">{item.package?.title || 'N/A'}</div>
                        <div className="text-base text-gray-500">{item.noOfTravellers} travelers</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-base text-gray-900">{formatDate(item.createdAt)}</td>
                      <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={item.status} /></td>
                      <td className="px-6 py-4 whitespace-nowrap"><ViewedBadge isViewed={item.isViewd} /></td>
                      <td className="px-6 py-4 whitespace-nowrap text-base font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setViewingBookingId(item.id)}
                            className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
                            title="View Details"
                          >
                            <EyeIcon />
                          </button>
                          <button
                            onClick={() => handleEdit(item.id)}
                            className="text-green-600 hover:text-green-900 p-1 hover:bg-green-50 rounded"
                            title="Edit Booking"
                          >
                            <EditIcon />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                            title="Delete Booking"
                          >
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-base text-gray-500">
                      No bookings found matching your search criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing {((data.meta?.currentPage || 1) - 1) * (data.meta?.itemsPerPage || itemsPerPage) + 1} to{' '}
              {Math.min((data.meta?.currentPage || 1) * (data.meta?.itemsPerPage || itemsPerPage), data.meta?.totalItems || 0)} of{' '}
              {data.meta?.totalItems || 0} entries
            </div>
            <div className="flex items-center space-x-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <ChevronLeftIcon />
                <span className="ml-1">Previous</span>
              </button>
              {Array.from({ length: data.meta?.totalPages || 1 }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 border rounded text-sm ${currentPage === page
                    ? 'bg-blue-500 text-white border-blue-500'
                    : 'border-gray-300 hover:bg-gray-50'
                    }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === (data.meta?.totalPages || 1)}
                className="px-3 py-1 border border-gray-300 rounded text-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <span className="mr-1">Next</span>
                <ChevronRightIcon />
              </button>
            </div>
          </div>
        </div>

        {viewingBookingId && (
          <BookingDetailsModal
            bookingId={viewingBookingId}
            onClose={() => setViewingBookingId(null)}
          />
        )}
      </div>
    </>
  );
};

export default BookingTable;
