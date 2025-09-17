"use client";
import { useEffect } from "react";
import { Form, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { useParams } from "next/navigation";
import {
  createItinerary,
  updateItinerary,
} from "@/redux-store/slices/itinerarySlice";
import { ItineraryItem } from "@/types/itinerary";

export const useItineraryForm = (
  setIsModalOpen: (val: boolean) => void,
  itinerary?: ItineraryItem | null,
) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const { loading } = useSelector((state: RootState) => state.itineraries);

  // Prefill or reset form when editing/creating
  useEffect(() => {
    if (itinerary) {
      form.setFieldsValue(itinerary);
    } else {
      form.resetFields();
    }
  }, [itinerary, form]);

  const onFinish = async (values: ItineraryItem) => {
    try {
      const payload = {
        ...values,
        order: Number(values?.order),
        maxAltitude: Number(values?.maxAltitude),
      };

      if (itinerary) {
        // Update
        await dispatch(
          updateItinerary({
            packageId: Number(id),
            itineraryId: Number(itinerary.id),
            data: payload,
          }),
        );
        message.success("Itinerary updated successfully!");
      } else {
        // Create
        await dispatch(
          createItinerary({
            id: Number(id),
            data: payload,
          }),
        );
        message.success("Itinerary created successfully!");
      }

      setIsModalOpen(false);
      form.resetFields();
    } catch (error) {
      // console.error("Failed to save itinerary:", error);
      message.error("Failed to save itinerary");
    }
  };

  return { form, loading, onFinish };
};
