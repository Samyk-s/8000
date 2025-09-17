import { useEffect } from "react";
import { FormInstance } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { fetchPackages } from "@/redux-store/slices/packageSlice";
import { fetchBookingById, updateBooking } from "@/redux-store/slices/bookinSlice";
import { BookingPayload } from "@/types/booking";

export const useBookingForm = (form: FormInstance, id: number, onSuccess: () => void) => {
  const dispatch = useDispatch<AppDispatch>();

  const { items: packages, loading: loadingPackages } = useSelector(
    (state: RootState) => state.packges
  );

  const { booking, loading: loadingBooking } = useSelector(
    (state: RootState) => state.bookings
  );

  const loading = loadingPackages || loadingBooking;

  /** Fetch packages and booking details */
  useEffect(() => {
    dispatch(fetchPackages());
    dispatch(fetchBookingById(id));
  }, [dispatch, id]);

  /** Set initial form values when booking is loaded */
  useEffect(() => {
    if (booking) {
      form.setFieldsValue({
        ...booking,
        packageId: booking?.package?.id,
        addonIds: booking?.addons?.map((a: any) => a.id),
      });
    }
  }, [booking, form]);

  /** Form submit handler */
  const onFinish = (values: BookingPayload) => {
    dispatch(updateBooking({ id, data: values }))
      .unwrap()
      .then(() => {
        onSuccess();
      });
  };

  /** Form submit failed handler */
  const onFinishFailed = (errorInfo: any) => {
    console.error("Form submission failed:", errorInfo);
  };

  return {
    packages,
    booking,
    loading,
    onFinish,
    onFinishFailed,
  };
};
