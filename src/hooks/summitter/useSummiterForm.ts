"use client";
import { useEffect, useState } from "react";
import { Form, message, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux-store/store/store";
import { fetchTeams } from "@/redux-store/slices/teamSlice";
import resourceApi from "@/lib/api/resourceApi";
import { MediaFile } from "@/types/utils-type";
import {
  createSummiter,
  updateSummiter,
} from "@/redux-store/slices/summiterSlice";
import { SummitterItem } from "@/types/summitter";
import { useRouter } from "next/navigation";

export const useSummiterForm = (summitter?: SummitterItem) => {
  const { items, loading } = useSelector((state: RootState) => state.teams);
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();
  const [uploadedFile, setUploadedFile] = useState<MediaFile | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchTeams({ params: {} }));

    if (summitter) {
      form.setFieldsValue({
        name: summitter.name,
        nationality: summitter.nationality,
        summittedDate: summitter.summittedDate,
        peak: summitter.peak,
        summitterEmail: summitter.summitterEmail,
        order: summitter.order,
        led_by_id: summitter.ledBy?.id,
      });

      if (summitter.image) {
        setUploadedFile(summitter.image);
        setFileList([
          {
            uid: summitter.image.uid,
            name: summitter.image.name,
            status: "done",
            url: summitter.image.url,
          },
        ]);
      }
    }
  }, [dispatch, summitter, form]);

  const handleFileUpload = async (rawFile: File) => {
    const formData = new FormData();
    formData.append("file", rawFile);

    try {
      setUploading(true);
      const res = await resourceApi.createResource(formData);
      setUploading(false);

      if (res) {
        setUploadedFile(res);
        setFileList([
          {
            uid: res.uid,
            name: res.name,
            status: "done",
            url: res.url,
          },
        ]);
        message.success("File uploaded successfully!");
      } else {
        message.error("File upload failed");
      }
    } catch {
      setUploading(false);
      message.error("File upload failed");
    }
  };

  const beforeUpload = async (file: File) => {
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

    await handleFileUpload(file);
    return Upload.LIST_IGNORE;
  };

  const onFinish = (values: any) => {
    if (!summitter && !uploadedFile) {
      message.error("Please upload an image before submitting");
      return;
    }

    const payload: any = {
      ...values,
      order: Number(values.order),
    };

    if (uploadedFile && (!summitter || summitter.image?.uid !== uploadedFile.uid)) {
      payload.image = uploadedFile;
    }

    if (summitter) {
      dispatch(updateSummiter({ id: summitter.id, payload }))
        .unwrap()
        .then(() => {
          router.back();
        });

    } else {
      dispatch(createSummiter(payload))
        .unwrap()
        .then(() => {
          router.back();
        });
    }
  };

  const onFinishFailed = () => {
    message.error("Please fill all required fields.");
  };

  return {
    form,
    items,
    loading,
    fileList,
    uploading,
    beforeUpload,
    setUploadedFile,
    setFileList,
    onFinish,
    onFinishFailed,
  };
};
