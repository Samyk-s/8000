"use client";

import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { fetchBookingById } from "@/redux-store/slices/bookinSlice";

const BookingView = ({ id }: { id: number }) => {
  const { booking } = useSelector((state: RootState) => state.bookings);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchBookingById(id));
  }, [id]);

  return (
    <div className="w-full max-w-6xl overflow-y-auto rounded-lg bg-white">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Personal Information */}
        <div>
          <h3 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-800">
            Personal Information
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b">
                  <td className="bg-gray-50 px-2 py-3 font-medium text-gray-600">
                    Name
                  </td>
                  <td className="px-2 py-3">
                    {booking?.customerName || "N/A"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="bg-gray-50 px-2 py-3 font-medium text-gray-600">
                    Email
                  </td>
                  <td className="px-2 py-3">
                    {booking?.customerEmail || "N/A"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="bg-gray-50 px-2 py-3 font-medium text-gray-600">
                    Phone
                  </td>
                  <td className="px-2 py-3">
                    {booking?.customerPhone || "N/A"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="bg-gray-50 px-2 py-3 font-medium text-gray-600">
                    Address
                  </td>
                  <td className="px-2 py-3">
                    {booking?.customerAddress || "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Trip Information */}
        <div>
          <h3 className="mb-4 border-b pb-2 text-lg font-semibold text-gray-800">
            Trip Information
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <tbody>
                <tr className="border-b">
                  <td className="bg-gray-50 px-2 py-3 font-medium text-gray-600">
                    Number of Travellers
                  </td>
                  <td className="px-2 py-3">
                    {booking?.noOfTravellers || "N/A"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="bg-gray-50 px-2 py-3 font-medium text-gray-600">
                    Arrival Date
                  </td>
                  <td className="px-2 py-3">
                    {booking?.arrivalDate
                      ? new Date(booking?.arrivalDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="bg-gray-50 px-2 py-3 font-medium text-gray-600">
                    Departure Date
                  </td>
                  <td className="px-2 py-3">
                    {booking?.departureDate
                      ? new Date(booking?.departureDate).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="bg-gray-50 px-2 py-3 font-medium text-gray-600">
                    Package
                  </td>
                  <td className="px-2 py-3">
                    {booking?.package?.title || "N/A"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="bg-gray-50 px-2 py-3 font-medium text-gray-600">
                    Add-ons
                  </td>
                  <td className="px-2 py-3">
                    {(booking?.addons?.length as number) > 0
                      ? booking?.addons?.map((addon: any, index: number) => (
                          <span
                            key={index}
                            className="mb-1 mr-1 inline-block rounded bg-blue-100 px-2 py-1 text-xs text-blue-800"
                          >
                            {addon?.title || addon?.name || "Add-on"}
                          </span>
                        ))
                      : "No add-ons"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="bg-gray-50 px-2 py-3 font-medium text-gray-600">
                    Assigned Team Member
                  </td>
                  <td className="px-2 py-3">
                    {booking?.assignedTeamMember?.name || "Not assigned"}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="bg-gray-50 px-2 py-3 font-medium text-gray-600">
                    Status
                  </td>
                  <td className="px-2 py-3">
                    <span
                      className={`inline-block rounded px-2 py-1 text-xs font-medium capitalize ${
                        booking?.status === "confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking?.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : booking?.status === "cancelled"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {booking?.status}
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="bg-gray-50 px-2 py-3 font-medium text-gray-600">
                    Total Price
                  </td>
                  <td className="px-2 py-3 text-lg font-semibold text-green-600">
                    {booking?.totalPrice
                      ? `$ ${Number.parseFloat(
                          booking?.totalPrice,
                        ).toLocaleString("en-US", {
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
    </div>
  );
};

export default React.memo(BookingView);
