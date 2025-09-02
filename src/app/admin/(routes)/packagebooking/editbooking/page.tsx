"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { LoaderIcon } from "@/components/icons/icnos";

interface BookingFormData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  noOfTravellers: number;
  arrivalDate: string;
  departureDate: string;
  packageId: number;
  addonIds: number[];
  status: string;
  package?: { title: string };
}

interface PackageItem {
  id: number;
  title: string;
}

interface AddonItem {
  id: number;
  title: string;
  price: string;
  description: string;
  order: number;
  status: number;
  createdAt: string;
  updatedAt: string;
}

const STATUS_OPTIONS = [
  { value: "pending", label: "Pending" },
  { value: "confirmed", label: "Confirmed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "completed", label: "Completed" },
];

// Status badge styling function
const getStatusBadgeClass = (status: string) => {
  const baseClass = "inline-block px-2 py-1 rounded text-xs font-medium";
  switch (status) {
    case "pending":
      return `${baseClass} bg-yellow-100 text-yellow-800`;
    case "confirmed":
      return `${baseClass} bg-blue-100 text-blue-800`;
    case "cancelled":
      return `${baseClass} bg-red-100 text-red-800`;
    case "completed":
      return `${baseClass} bg-green-100 text-green-800`;
    default:
      return `${baseClass} bg-gray-100 text-gray-800`;
  }
};

export default function EditBookingPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id");

  const [loading, setLoading] = useState(true);
  const [loadingAddons, setLoadingAddons] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [packages, setPackages] = useState<PackageItem[]>([]);
  const [addons, setAddons] = useState<AddonItem[]>([]);
  const [formData, setFormData] = useState<BookingFormData>({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerAddress: "",
    noOfTravellers: 1,
    arrivalDate: "",
    departureDate: "",
    packageId: 0,
    addonIds: [],
    status: "pending",
  });

  // Fetch add-ons based on selected package
  const fetchPackageAddons = async (packageId: number) => {
    if (!packageId || packageId === 0) {
      setAddons([]);
      return;
    }

    setLoadingAddons(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/packages/${packageId}/addon/active-addOns`,
      );
      if (!res.ok) {
        console.error(
          `Failed to fetch addons for package ${packageId}. Status: ${res.status}`,
        );
        setAddons([]);
        return;
      }
      const data = await res.json();
      setAddons(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch package addons:", err);
      setAddons([]);
    } finally {
      setLoadingAddons(false);
    }
  };

  useEffect(() => {
    if (!bookingId) {
      setError("No booking ID provided in URL");
      setLoading(false);
      return;
    }

    const fetchBooking = async () => {
      try {
        console.log("Fetching booking with ID:", bookingId);
        console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

        // Fixed: Remove duplicate ID query parameter
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookingId}`,
        );

        console.log("Fetch booking response status:", res.status);

        if (!res.ok) {
          const errorText = await res.text();
          console.error("Fetch booking error response:", errorText);
          throw new Error(
            `Failed to fetch booking. Status: ${res.status} - ${errorText}`,
          );
        }

        const booking = await res.json();
        console.log("Fetched booking data:", booking);

        const bookingData = {
          customerName: booking.customerName || "",
          customerEmail: booking.customerEmail || "",
          customerPhone: booking.customerPhone || "",
          customerAddress: booking.customerAddress || "",
          noOfTravellers: booking.noOfTravellers || 1,
          arrivalDate: booking.arrivalDate?.split("T")[0] || "",
          departureDate: booking.departureDate?.split("T")[0] || "",
          packageId: booking.packageId || 0,
          addonIds: booking.addons?.map((a: any) => a.id) || [],
          status: booking.status || "pending",
          package: booking.package || undefined,
        };

        console.log("Processed booking data:", bookingData);
        setFormData(bookingData);

        // Fetch addons for the current package after setting form data
        if (bookingData.packageId && bookingData.packageId !== 0) {
          await fetchPackageAddons(bookingData.packageId);
        }
      } catch (err) {
        console.error("Error fetching booking:", err);
        setError(err instanceof Error ? err.message : "Failed to load booking");
      } finally {
        setLoading(false);
      }
    };

    const fetchPackages = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/packages/active-packages`,
        );
        if (!res.ok) {
          console.error("Failed to fetch packages:", res.status);
          return;
        }
        const data = await res.json();
        console.log("Fetched packages:", data);
        setPackages(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch packages:", err);
      }
    };

    fetchBooking();
    fetchPackages();
  }, [bookingId]);

  // Handle package selection change
  const handlePackageChange = (packageId: number) => {
    setFormData({
      ...formData,
      packageId,
      addonIds: [], // Clear selected addons when package changes
    });
    fetchPackageAddons(packageId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (!bookingId) {
      setError("No booking ID found");
      setSubmitting(false);
      return;
    }

    if (!formData.packageId || formData.packageId === 0) {
      alert("Please select a valid package.");
      setSubmitting(false);
      return;
    }

    if (!formData.status) {
      alert("Please select a valid status.");
      setSubmitting(false);
      return;
    }

    // Validate required fields
    if (!formData.customerName.trim()) {
      alert("Customer name is required.");
      setSubmitting(false);
      return;
    }

    if (!formData.customerEmail.trim()) {
      alert("Customer email is required.");
      setSubmitting(false);
      return;
    }

    if (!formData.customerPhone.trim()) {
      alert("Customer phone is required.");
      setSubmitting(false);
      return;
    }

    // Validate dates if provided
    if (formData.arrivalDate && formData.departureDate) {
      const arrival = new Date(formData.arrivalDate);
      const departure = new Date(formData.departureDate);
      if (departure <= arrival) {
        alert("Departure date must be after arrival date.");
        setSubmitting(false);
        return;
      }
    }

    try {
      // Format the data to match API expectations
      const requestData = {
        customerName: formData.customerName.trim(),
        customerEmail: formData.customerEmail.trim(),
        customerPhone: formData.customerPhone.trim(),
        customerAddress: formData.customerAddress.trim(),
        noOfTravellers: formData.noOfTravellers,
        arrivalDate: formData.arrivalDate || null,
        departureDate: formData.departureDate || null,
        packageId: formData.packageId,
        addonIds: formData.addonIds,
        status: formData.status,
      };

      console.log(
        "Sending PATCH request to:",
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookingId}`,
      );
      console.log("Request data:", requestData);

      // Fixed: Remove the duplicate ID query parameter
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/bookings/${bookingId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        },
      );

      console.log("PATCH response status:", res.status);
      console.log(
        "PATCH response headers:",
        Object.fromEntries(res.headers.entries()),
      );

      if (!res.ok) {
        const errorText = await res.text();
        console.error("PATCH error response:", errorText);

        let errorMessage;
        try {
          const errData = JSON.parse(errorText);
          errorMessage =
            errData.message ||
            errData.error ||
            `HTTP ${res.status}: ${res.statusText}`;
        } catch {
          errorMessage = `HTTP ${res.status}: ${res.statusText} - ${errorText}`;
        }

        throw new Error(errorMessage);
      }

      const result = await res.json();
      console.log("PATCH success response:", result);

      alert("Booking updated successfully!");
      router.push("/admin/packagebooking");
    } catch (err) {
      console.error("Update error:", err);
      const errorMessage =
        err instanceof Error ? err.message : "Error updating booking";
      setError(errorMessage);
      alert(`Error: ${errorMessage}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <LoaderIcon />
        <span className="ml-2">Loading booking #{bookingId}...</span>
      </div>
    );
  }

  if (error && !formData.customerName) {
    return (
      <div className="p-8 text-red-600">
        <h2 className="mb-2 text-xl font-bold">Error</h2>
        <p>{error}</p>
        <button
          onClick={() => router.push("/admin/packagebooking")}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          Back to Bookings
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl rounded bg-white p-8 shadow-md">
      <div className="mb-4">
        <nav className="text-sm text-gray-500">
          <ol className="list-reset flex">
            <li>
              <a
                href="/admin/dashboard"
                className="text-blue-600 hover:underline"
              >
                Dashboard
              </a>
            </li>
            <li>
              <span className="mx-2">{">"}</span>
            </li>
            <li>
              <a
                href="/admin/packagebooking"
                className="text-blue-600 hover:underline"
              >
                Bookings
              </a>
            </li>
            <li>
              <span className="mx-2">{">"}</span>
            </li>
            <li className="text-gray-700">Edit</li>
          </ol>
        </nav>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Edit Booking #{bookingId}</h1>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Current Status:</span>
          <span className={getStatusBadgeClass(formData.status)}>
            {STATUS_OPTIONS.find((s) => s.value === formData.status)?.label ||
              formData.status}
          </span>
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-4">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block font-medium">Customer Name *</label>
            <input
              type="text"
              value={formData.customerName}
              onChange={(e) =>
                setFormData({ ...formData, customerName: e.target.value })
              }
              className="w-full rounded border p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              required
              disabled={submitting}
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Customer Email *</label>
            <input
              type="email"
              value={formData.customerEmail}
              onChange={(e) =>
                setFormData({ ...formData, customerEmail: e.target.value })
              }
              className="w-full rounded border p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              required
              disabled={submitting}
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Customer Phone *</label>
            <input
              type="tel"
              value={formData.customerPhone}
              onChange={(e) =>
                setFormData({ ...formData, customerPhone: e.target.value })
              }
              className="w-full rounded border p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              required
              disabled={submitting}
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Booking Status *</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
              className="w-full rounded border p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              required
              disabled={submitting}
            >
              {STATUS_OPTIONS.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block font-medium">
              Number of Travellers
            </label>
            <input
              type="number"
              min={1}
              value={formData.noOfTravellers}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  noOfTravellers: parseInt(e.target.value) || 1,
                })
              }
              className="w-full rounded border p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              disabled={submitting}
            />
          </div>
          <div>
            <label className="mb-1 block font-medium">Customer Address</label>
            <input
              type="text"
              value={formData.customerAddress}
              onChange={(e) =>
                setFormData({ ...formData, customerAddress: e.target.value })
              }
              className="w-full rounded border p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              required
              disabled={submitting}
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="mb-1 block font-medium">Arrival Date</label>
            <input
              type="date"
              value={formData.arrivalDate}
              onChange={(e) =>
                setFormData({ ...formData, arrivalDate: e.target.value })
              }
              className="w-full rounded border p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              disabled={submitting}
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Departure Date</label>
            <input
              type="date"
              value={formData.departureDate}
              onChange={(e) =>
                setFormData({ ...formData, departureDate: e.target.value })
              }
              className="w-full rounded border p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              disabled={submitting}
            />
          </div>

          <div>
            <label className="mb-1 block font-medium">Select Package *</label>
            <select
              value={formData.packageId}
              onChange={(e) => handlePackageChange(parseInt(e.target.value))}
              className="w-full rounded border p-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              required
              disabled={submitting}
            >
              <option value={0}>Select a package...</option>

              {/* If the selected package isn't in the active list, still show it */}
              {formData.package &&
                !packages.find((p) => p.id === formData.packageId) &&
                formData.packageId !== 0 && (
                  <option key={formData.packageId} value={formData.packageId}>
                    {formData.package.title} (Current)
                  </option>
                )}

              {/* Show all active packages */}
              {packages.map((pkg) => (
                <option key={pkg.id} value={pkg.id}>
                  {pkg.title}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block font-medium">Select Add-ons</label>
            {loadingAddons ? (
              <div className="flex items-center space-x-2 p-4 text-gray-500">
                <LoaderIcon />
                <span>Loading add-ons...</span>
              </div>
            ) : addons.length === 0 ? (
              <p className="p-4 text-gray-500">
                No add-ons available for this package.
              </p>
            ) : (
              <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                {addons.map((addon) => (
                  <label
                    key={addon.id}
                    className="flex items-center space-x-2 rounded border p-2 hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={formData.addonIds.includes(addon.id)}
                      onChange={(e) => {
                        const updatedAddons = e.target.checked
                          ? [...formData.addonIds, addon.id]
                          : formData.addonIds.filter((id) => id !== addon.id);
                        setFormData({ ...formData, addonIds: updatedAddons });
                      }}
                      disabled={submitting}
                    />
                    <div className="flex-1">
                      <span className="font-medium">{addon.title}</span>
                      <div className="text-sm text-gray-600">
                        Price: ${addon.price}
                      </div>
                      {addon.description && (
                        <div className="mt-1 text-xs text-gray-500">
                          {addon.description}
                        </div>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex space-x-4 pt-6">
          <button
            type="button"
            onClick={() => router.push("/admin/packagebooking")}
            className="rounded border px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
            disabled={submitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex items-center space-x-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={submitting || loadingAddons}
          >
            {submitting && <LoaderIcon />}
            <span>{submitting ? "Saving..." : "Save Changes"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
