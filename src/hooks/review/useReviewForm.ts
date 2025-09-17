"use client";
import { useState } from "react";
import { Form, message } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux-store/store/store";
import { createReview } from "@/redux-store/slices/reviewSlice";
import { useParams, useRouter } from "next/navigation";
import resourceApi from "@/lib/api/resourceApi";
import { MediaFile } from "@/types/utils-type";

export const useReviewForm = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [file, setFile] = useState<MediaFile | null>(null);
  const [fileList, setFileList] = useState<any[]>([]);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (rawFile: File) => {
    const formData = new FormData();
    formData.append("file", rawFile);

    try {
      setUploading(true);
      const res: MediaFile = await resourceApi.createResource(formData);
      setUploading(false);

      if (res) {
        setFile(res);
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
    } catch (error) {
      setUploading(false);
      message.error("File upload failed");
    }
  };

  const onFinish = async (values: any) => {
    if (!file) {
      message.error("Please upload an image before submitting");
      return;
    }

    const payload = {
      fullName: values.fullName,
      email: values.email,
      country: values.country,
      rating: Number(values.rating),
      image: {
        uid: file.uid,
        name: file.name,
        url: file.url,
        alt: file.alt,
        type: file.type,
        size: file.size,
      },
      shortTitle: values.shortTitle,
      review: values.review,
    };

    dispatch(
      createReview({
        id: Number(id),
        data: payload,
      }),
    )
      .unwrap()
      .then(() => {
        router.back();
      });
    form.resetFields();
  };

  return {
    form,
    file,
    fileList,
    uploading,
    setFileList,
    handleFileUpload,
    onFinish,
  };
};
