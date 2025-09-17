"use client";
import { useState } from "react";
import { Form, message } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux-store/store/store";
import { useParams } from "next/navigation";
import { createFile } from "@/redux-store/slices/fileSlice";
import resourceApi from "@/lib/api/resourceApi";
import { FileParams, MediaFile } from "@/types/utils-type";
import { FileType, PageTemplate } from "@/types/enum/enum";
import { FilePayload } from "@/types/file";

export const useFileForm = (setIsModalOpen: (val: boolean) => void) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const { id } = useParams<{ id: string }>();
  const [fileList, setFileList] = useState<any[]>([]);
  const [file, setFile] = useState<MediaFile | null>(null);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (rawFile: File) => {
    const formData = new FormData();
    formData.append("file", rawFile);

    try {
      setUploading(true);
      const res = await resourceApi.createResource(formData);
      setUploading(false);

      if (res) {
        setFile(res);
        setFileList([
          {
            uid: res.uid,
            name: res?.name,
            status: "done",
            url: res?.url,
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
      message.error("Please upload a file before submitting");
      return;
    }

    const payload: FilePayload = {
      file: {
        uid: file.uid,
        name: file.name,
        url: file.url,
        alt: values.alt,
        type: file.type,
        size: file.size,
      },
      order: Number(values.order) || 0,
      status: 1,
      alt: values.alt,
    };

    const params: FileParams = {
      type: FileType.GALLERY,
      related_id: Number(id),
      file_of: PageTemplate.PACKAGE,
    };

    try {
      await dispatch(createFile({ params, data: payload })).unwrap();
      setIsModalOpen(false);
      form.resetFields();
      setFileList([]);
      setFile(null);
      message.success("File saved successfully!");
    } catch (error) {
      console.error("Failed to save file:", error);
      message.error("Failed to save file");
    }
  };

  return {
    form,
    fileList,
    uploading,
    file,
    setFileList,
    handleFileUpload,
    onFinish,
  };
};
