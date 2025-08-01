"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { X } from "lucide-react"

interface BookingDetailsProps {
  bookingId: number
  onClose: () => void
}

export const BookingDetailsModal: React.FC<BookingDetailsProps> = ({ bookingId, onClose }) => {
  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookingId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch booking details")
        return res.json()
      })
      .then((data) => setBooking(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [bookingId])

  return (
    <div
      className="fixed z-[999] inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4"
      onClick={onClose} // click outside triggers close
    >
      <div
        className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >

        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Booking Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-2">Loading...</span>
            </div>
          )}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          {booking && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Personal Information</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-2 font-medium text-gray-600 bg-gray-50">Name</td>
                        <td className="py-3 px-2">{booking.customerName || "N/A"}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-2 font-medium text-gray-600 bg-gray-50">Email</td>
                        <td className="py-3 px-2">{booking.customerEmail || "N/A"}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-2 font-medium text-gray-600 bg-gray-50">Phone</td>
                        <td className="py-3 px-2">{booking.customerPhone || "N/A"}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-2 font-medium text-gray-600 bg-gray-50">Address</td>
                        <td className="py-3 px-2">{booking.customerAddress || "N/A"}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Trip Information */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-800 border-b pb-2">Trip Information</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-2 font-medium text-gray-600 bg-gray-50">Number of Travellers</td>
                        <td className="py-3 px-2">{booking.noOfTravellers || "N/A"}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-2 font-medium text-gray-600 bg-gray-50">Arrival Date</td>
                        <td className="py-3 px-2">
                          {booking.arrivalDate ? new Date(booking.arrivalDate).toLocaleDateString() : "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-2 font-medium text-gray-600 bg-gray-50">Departure Date</td>
                        <td className="py-3 px-2">
                          {booking.departureDate ? new Date(booking.departureDate).toLocaleDateString() : "N/A"}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-2 font-medium text-gray-600 bg-gray-50">Package</td>
                        <td className="py-3 px-2">{booking.package?.title || "N/A"}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-2 font-medium text-gray-600 bg-gray-50">Add-ons</td>
                        <td className="py-3 px-2">
                          {booking.addons?.length > 0
                            ? booking.addons.map((addon: any, index: number) => (
                              <span
                                key={index}
                                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1"
                              >
                                {addon?.title || addon?.name || "Add-on"}
                              </span>
                            ))
                            : "No add-ons"}
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-2 font-medium text-gray-600 bg-gray-50">Assigned Team Member</td>
                        <td className="py-3 px-2">{booking.assignedTeamMember?.name || "Not assigned"}</td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-2 font-medium text-gray-600 bg-gray-50">Status</td>
                        <td className="py-3 px-2">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs font-medium ${booking.status === "confirmed"
                                ? "bg-green-100 text-green-800"
                                : booking.status === "pending"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : booking.status === "cancelled"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-gray-100 text-gray-800"
                              }`}
                          >
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-2 font-medium text-gray-600 bg-gray-50">Total Price</td>
                        <td className="py-3 px-2 font-semibold text-lg text-green-600">
                          {booking.totalPrice
                            ? `$ ${Number.parseFloat(booking.totalPrice).toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}`
                            : "N/A"}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
