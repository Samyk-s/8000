"use client";

import { useState, useEffect } from "react";
import { Form, UploadFile, message, Upload } from "antd";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import resourceApi from "@/lib/api/resourceApi";
import { AppDispatch } from "@/redux-store/store/store";
import {
  createPackage,
  updatePackage,
} from "@/redux-store/slices/packageSlice";
import { PackageItem, PackagePayload } from "@/types/package";
import { MediaFile } from "@/types/utils-type";

export const usePackageForm = (currentPackage?: PackageItem) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [imageFile, setImageFile] = useState<MediaFile | null>(null);
  const [coverImageFile, setCoverImageFile] = useState<MediaFile | null>(null);
  const [routeFile, setRouteFile] = useState<MediaFile | null>(null);

  const [imageList, setImageList] = useState<UploadFile[]>([]);
  const [coverImageList, setCoverImageList] = useState<UploadFile[]>([]);
  const [routeList, setRouteList] = useState<UploadFile[]>([]);

  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingRoute, setUploadingRoute] = useState(false);

  // Prefill form when editing
  useEffect(() => {
    if (currentPackage) {
      const ids = currentPackage?.parentPages?.map((p) => p.id) ?? [];

      form.setFieldsValue({
        title: currentPackage.title,
        country: currentPackage.country,
        altitude: currentPackage.altitude,
        grade: currentPackage.grade,
        season: currentPackage.season,
        groupSize: currentPackage.groupSize,
        packageDays: currentPackage.packageDays,
        price: currentPackage.price,
        order: currentPackage.order,
        status: !!currentPackage.status,
        isUpcoming: !!currentPackage.isUpcoming,
        isBooking: !!currentPackage.isBooking,
        description: currentPackage.description,
        includes: currentPackage.includes,
        excludes: currentPackage.excludes,
        tripNotes: currentPackage.tripNotes,
        parentPageIds: ids,
      });

      if (currentPackage.image) {
        setImageFile(currentPackage.image);
        setImageList([
          {
            uid: currentPackage.image.uid,
            name: currentPackage.image.name,
            status: "done",
            url: currentPackage.image.url,
          },
        ]);
      }

      if (currentPackage.cover_image) {
        setCoverImageFile(currentPackage.cover_image);
        setCoverImageList([
          {
            uid: currentPackage.cover_image.uid,
            name: currentPackage.cover_image.name,
            status: "done",
            url: currentPackage.cover_image.url,
          },
        ]);
      }

      if (currentPackage.route_map) {
        setRouteFile(currentPackage.route_map);
        setRouteList([
          {
            uid: currentPackage.route_map.uid,
            name: currentPackage.route_map.name,
            status: "done",
            url: currentPackage.route_map.url,
          },
        ]);
      }
    }
  }, [currentPackage, form]);

  const handleFileUpload = async (
    rawFile: File,
    type: "image" | "cover" | "route",
  ) => {
    const formData = new FormData();
    formData.append("file", rawFile);

    try {
      if (type === "image") setUploadingImage(true);
      if (type === "cover") setUploadingCover(true);
      if (type === "route") setUploadingRoute(true);

      const res: MediaFile = await resourceApi.createResource(formData);

      const uploadObj: UploadFile = {
        uid: res.uid,
        name: res.name,
        status: "done",
        url: res.url,
      };

      if (type === "image") {
        setImageFile(res);
        setImageList([uploadObj]);
      } else if (type === "cover") {
        setCoverImageFile(res);
        setCoverImageList([uploadObj]);
      } else {
        setRouteFile(res);
        setRouteList([uploadObj]);
      }

      message.success(
        `${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully!`,
      );
    } catch {
      message.error(
        `${type.charAt(0).toUpperCase() + type.slice(1)} upload failed`,
      );
    } finally {
      if (type === "image") setUploadingImage(false);
      if (type === "cover") setUploadingCover(false);
      if (type === "route") setUploadingRoute(false);
    }
  };

  const makeBeforeUpload =
    (type: "image" | "cover" | "route") =>
      async (file: File): Promise<string | void> => {
        const isValidType = [
          "image/jpeg",
          "image/png",
          "image/jpg",
          "image/webp",
        ].includes(file.type);
        if (!isValidType) {
          message.error("You can only upload JPG, JPEG, PNG, or WEBP files!");
          return Upload.LIST_IGNORE;
        }
        await handleFileUpload(file, type);
        return Upload.LIST_IGNORE;
      };

  const onFinish = (values: PackagePayload) => {
    if (!currentPackage && (!imageFile || !coverImageFile || !routeFile)) {
      message.error("Image, Cover Image, and Route Map are required!");
      return;
    }

    const payload: PackagePayload = {
      ...values,
      parentPageIds: values?.parentPageIds,
      altitude: Number(values.altitude),
      packageDays: Number(values.packageDays),
      price: Number(values.price),
      order: Number(values.order),
      status: values.status ? 1 : 0,
      isUpcoming: values.isUpcoming ? 1 : 0,
      isBooking: values.isBooking ? 1 : 0,
    };

    if (
      imageFile &&
      (!currentPackage || currentPackage.image?.uid !== imageFile.uid)
    ) {
      payload.image = imageFile;
    }
    if (
      coverImageFile &&
      (!currentPackage ||
        currentPackage.cover_image?.uid !== coverImageFile.uid)
    ) {
      payload.cover_image = coverImageFile;
    }
    if (
      routeFile &&
      (!currentPackage || currentPackage.route_map?.uid !== routeFile.uid)
    ) {
      payload.route_map = routeFile;
    }

    if (currentPackage) {
      dispatch(updatePackage({ id: currentPackage.id, data: payload }))
        .unwrap()
        .then(() => router.back());
    } else {
      dispatch(createPackage(payload))
        .unwrap()
        .then(() => router.back());
    }
  };

  return {
    form,
    imageList,
    coverImageList,
    routeList,
    uploadingImage,
    uploadingCover,
    uploadingRoute,
    setImageFile,
    setImageList,
    setCoverImageFile,
    setCoverImageList,
    setRouteFile,
    setRouteList,
    makeBeforeUpload,
    onFinish,
  };
};
